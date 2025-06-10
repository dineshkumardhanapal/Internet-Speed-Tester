// script.js

// DOM Elements
const publicIpSpan = document.getElementById('publicIp');
const networkProviderSpan = document.getElementById('networkProvider');
const speedValueDisplay = document.getElementById('speedValue');
const speedNeedle = document.getElementById('speedNeedle');
const speedUnitDisplay = document.getElementById('speedUnit');
const testStatusDisplay = document.getElementById('testStatus');
const pingResultDisplay = document.getElementById('pingResult');
const jitterResultDisplay = document.getElementById('jitterResult');
const downloadResultDisplay = document.getElementById('downloadResult');
const uploadResultDisplay = document.getElementById('uploadResult');
const startButton = document.getElementById('startButton');

// Test Parameters
const TEST_DURATION_SECONDS = 10; // How long each test (download/upload) runs
const PING_COUNT = 10; // Number of pings to perform
const DOWNLOAD_CHUNK_SIZE_MB = 1; // Size of each chunk to download (in MB)
const UPLOAD_CHUNK_SIZE_MB = 1; // Size of each chunk to upload (in MB) for more realistic simulation

// Cloudflare's speed test endpoints for better accuracy
const DOWNLOAD_URL = 'https://speed.cloudflare.com/__down?bytes=';
const UPLOAD_URL = 'https://speed.cloudflare.com/__up';

// Internal State
let testRunning = false;
let animationFrameId; // To manage speed dial animation

// --- Helper Functions ---

/**
 * Displays a message in the status area.
 * @param {string} message - The message to display.
 * @param {string} colorClass - Tailwind CSS text color class (e.g., 'text-blue-300', 'text-green-400').
 */
function updateStatus(message, colorClass = 'text-blue-300') {
    testStatusDisplay.textContent = message;
    testStatusDisplay.className = `text-xl md:text-2xl font-semibold mb-4 ${colorClass}`;
}

/**
 * Updates the speed dial needle rotation and displayed value.
 * @param {number} speed - The speed in Mbps.
 */
function updateSpeedDial(speed) {
    // Map speed to a rotation angle (-135deg to 135deg)
    // Assuming max speed on dial is ~200 Mbps for visual representation
    const maxDialSpeed = 200;
    const angleRange = 270; // From -135deg (start) to +135deg (end) covers 270 degrees
    const angle = (speed / maxDialSpeed) * angleRange - (angleRange / 2); // Calculate angle, centered
    speedNeedle.style.transform = `translateX(-50%) rotate(${angle}deg)`;
    speedValueDisplay.textContent = speed.toFixed(speed < 10 ? 1 : 0);
}

/**
 * Resets all displayed results to initial state.
 */
function resetResults() {
    pingResultDisplay.textContent = '0 ms';
    jitterResultDisplay.textContent = '0 ms';
    downloadResultDisplay.textContent = '0 Mbps';
    uploadResultDisplay.textContent = '0 Mbps';
    speedValueDisplay.textContent = '0';
    speedNeedle.style.transform = 'translateX(-50%) rotate(-135deg)'; // Reset needle to start position
    updateStatus('Click "Start Test" to begin.');
}

/**
 * Fetches public IP and Network Provider information.
 * Uses ip-api.com. Note: This might be blocked by CORS policies in some iframe environments.
 */
async function fetchIpAndProvider() {
    try {
        const response = await fetch('https://ip-api.com/json/');
        const data = await response.json();
        if (data.status === 'success') {
            publicIpSpan.textContent = data.query || 'N/A';
            networkProviderSpan.textContent = data.isp || 'N/A';
        } else {
            publicIpSpan.textContent = 'Failed to load IP';
            networkProviderSpan.textContent = 'Failed to load Provider';
            console.error('IP-API error:', data.message);
        }
    } catch (error) {
        publicIpSpan.textContent = 'Error';
        networkProviderSpan.textContent = 'Error';
        console.error('Error fetching IP/Provider:', error);
    }
}

/**
 * Performs ping test.
 * @returns {Promise<object>} Object containing average ping and jitter.
 */
async function runPingTest() {
    updateStatus('Running Ping Test...');
    let latencies = [];
    let prevLatency = 0;
    let jitterSum = 0;

    for (let i = 0; i < PING_COUNT; i++) {
        const start = performance.now();
        try {
            // Ping a small, accessible resource on Cloudflare's network
            await fetch('https://speed.cloudflare.com/cdn-cgi/trace', { mode: 'no-cors', cache: 'no-store' });
            const end = performance.now();
            const latency = end - start;
            latencies.push(latency);

            // Calculate jitter (difference from previous latency)
            if (i > 0) {
                jitterSum += Math.abs(latency - prevLatency);
            }
            prevLatency = latency;

            pingResultDisplay.textContent = `${latency.toFixed(0)} ms`; // Show current ping
        } catch (error) {
            console.warn(`Ping failed on attempt ${i + 1}:`, error);
            pingResultDisplay.textContent = `Error`;
            latencies.push(NaN); // Mark as failed
        }
        await new Promise(resolve => setTimeout(resolve, 200)); // Small delay between pings
    }

    const validLatencies = latencies.filter(l => !isNaN(l));
    const averagePing = validLatencies.length ? validLatencies.reduce((sum, l) => sum + l, 0) / validLatencies.length : 0;
    const averageJitter = validLatencies.length > 1 ? jitterSum / (validLatencies.length - 1) : 0;

    pingResultDisplay.textContent = `${averagePing.toFixed(0)} ms`;
    jitterResultDisplay.textContent = `${averageJitter.toFixed(1)} ms`;

    return { ping: averagePing, jitter: averageJitter };
}

/**
 * Performs download speed test.
 * @returns {Promise<number>} Download speed in Mbps.
 */
async function runDownloadTest() {
    updateStatus('Running Download Test...');
    let totalBytesDownloaded = 0;
    let startTime = performance.now();

    return new Promise(resolve => {
        const interval = setInterval(async () => {
            if (!testRunning) { // Allow stopping mid-test
                clearInterval(interval);
                resolve(0);
                return;
            }

            // If duration exceeds, stop the interval and resolve
            const totalTimeElapsed = (performance.now() - startTime) / 1000;
            if (totalTimeElapsed >= TEST_DURATION_SECONDS) {
                clearInterval(interval);
                const finalSpeedMbps = (totalBytesDownloaded * 8) / (TEST_DURATION_SECONDS * 1000 * 1000);
                downloadResultDisplay.textContent = `${finalSpeedMbps.toFixed(1)} Mbps`;
                resolve(finalSpeedMbps);
                return;
            }

            const downloadStart = performance.now();
            try {
                const response = await fetch(`${DOWNLOAD_URL}${DOWNLOAD_CHUNK_SIZE_MB * 1024 * 1024}`, { cache: 'no-store' });
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const blob = await response.blob(); // Get as blob to measure actual size
                const bytes = blob.size;
                totalBytesDownloaded += bytes;

                // Calculate current average speed based on overall test duration
                const currentAverageSpeedMbps = (totalBytesDownloaded * 8) / (totalTimeElapsed * 1000 * 1000);

                downloadResultDisplay.textContent = `${currentAverageSpeedMbps.toFixed(1)} Mbps`;
                updateSpeedDial(currentAverageSpeedMbps);
            } catch (error) {
                console.error('Download test error:', error);
                // Optionally show error on UI instead of just console
            }
        }, 500); // Check every 0.5 seconds
    });
}

/**
 * Performs upload speed test.
 * @returns {Promise<number>} Upload speed in Mbps.
 */
async function runUploadTest() {
    updateStatus('Running Upload Test...');
    let totalBytesUploaded = 0;
    // Create a Blob of random data to send
    const dataToSend = new Blob([new Uint8Array(UPLOAD_CHUNK_SIZE_MB * 1024 * 1024)], { type: 'application/octet-stream' });
    let startTime = performance.now();

    return new Promise(resolve => {
        const interval = setInterval(async () => {
            if (!testRunning) { // Allow stopping mid-test
                clearInterval(interval);
                resolve(0);
                return;
            }

            // If duration exceeds, stop the interval and resolve
            const totalTimeElapsed = (performance.now() - startTime) / 1000;
            if (totalTimeElapsed >= TEST_DURATION_SECONDS) {
                clearInterval(interval);
                const finalSpeedMbps = (totalBytesUploaded * 8) / (TEST_DURATION_SECONDS * 1000 * 1000);
                uploadResultDisplay.textContent = `${finalSpeedMbps.toFixed(1)} Mbps`;
                resolve(finalSpeedMbps);
                return;
            }

            const uploadStart = performance.now();
            try {
                // Send the data Blob to Cloudflare's upload endpoint
                const response = await fetch(UPLOAD_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/octet-stream' },
                    body: dataToSend,
                    // Use keepalive to potentially avoid issues with fetch request being terminated early
                    keepalive: true
                });
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                const bytesSentThisChunk = dataToSend.size; // Get actual size of blob sent
                totalBytesUploaded += bytesSentThisChunk;

                // Calculate current average speed based on overall test duration
                const currentAverageSpeedMbps = (totalBytesUploaded * 8) / (totalTimeElapsed * 1000 * 1000);

                uploadResultDisplay.textContent = `${currentAverageSpeedMbps.toFixed(1)} Mbps`;
                updateSpeedDial(currentAverageSpeedMbps); // Update dial with upload speed
            } catch (error) {
                console.error('Upload test error:', error);
                // Optionally show error on UI instead of just console
            }
        }, 500); // Try to send a chunk every 0.5 seconds
    });
}


// --- Main Test Flow ---

async function startSpeedTest() {
    if (testRunning) {
        testRunning = false; // Stop the test
        startButton.textContent = 'Start Test';
        startButton.classList.remove('bg-red-600', 'hover:bg-red-700');
        startButton.classList.add('bg-blue-600', 'hover:bg-blue-700');
        updateStatus('Test Stopped.');
        cancelAnimationFrame(animationFrameId); // Stop animation
        return;
    }

    testRunning = true;
    startButton.textContent = 'Stop Test';
    startButton.classList.remove('bg-blue-600', 'hover:bg-blue-700');
    startButton.classList.add('bg-red-600', 'hover:bg-red-700');
    resetResults();
    updateSpeedDial(0); // Reset dial position

    try {
        // Step 1: Ping Test
        await runPingTest();
        if (!testRunning) return; // Check if stopped

        // Step 2: Download Test
        await runDownloadTest();
        if (!testRunning) return; // Check if stopped

        // Step 3: Upload Test
        await runUploadTest();
        if (!testRunning) return; // Check if stopped

        updateStatus('Test Complete!', 'text-green-400');
        updateSpeedDial(0); // Reset needle after test
    } catch (error) {
        console.error('Speed test failed:', error);
        updateStatus('Test Failed. Please try again.', 'text-red-500');
        updateSpeedDial(0);
    } finally {
        testRunning = false;
        startButton.textContent = 'Start Test';
        startButton.classList.remove('bg-red-600', 'hover:bg-red-700');
        startButton.classList.add('bg-blue-600', 'hover:bg-blue-700');
    }
}

// --- Event Listeners and Initial Load ---
window.onload = function() {
    fetchIpAndProvider(); // Fetch IP and ISP on page load
    startButton.addEventListener('click', startSpeedTest);
};
