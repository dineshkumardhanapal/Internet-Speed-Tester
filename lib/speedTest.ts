export interface SpeedTestConfig {
  PING_COUNT: number;
  PING_URL: string;
  DOWNLOAD_SIZE_MB: number;
  UPLOAD_SIZE_MB: number;
  DOWNLOAD_URL: string;
  UPLOAD_URL: string;
  PING_DELAY: number;
  MAX_GAUGE_VALUE: number;
}

export interface TestResult {
  ping: number;
  download: number;
  upload: number;
}

export interface NetworkInfo {
  ip: string;
  server: string;
}

export const CONFIG: SpeedTestConfig = {
  PING_COUNT: 5,
  PING_URL: 'https://speed.cloudflare.com/',
  DOWNLOAD_SIZE_MB: 10,
  UPLOAD_SIZE_MB: 5,
  DOWNLOAD_URL: 'https://speed.cloudflare.com/__down?bytes=',
  UPLOAD_URL: 'https://speed.cloudflare.com/__up',
  PING_DELAY: 100,
  MAX_GAUGE_VALUE: 200,
};

export async function runPingTest(
  onProgress?: (latency: number) => void
): Promise<number> {
  const latencies: number[] = [];
  
  for (let i = 0; i < CONFIG.PING_COUNT; i++) {
    try {
      const startTime = performance.now();
      await fetch(`${CONFIG.PING_URL}?_cachebust=${Date.now() + i}`, {
        method: 'HEAD',
        cache: 'no-store',
      });
      const endTime = performance.now();
      const latency = endTime - startTime;
      latencies.push(latency);
      if (onProgress) onProgress(latency);
    } catch (error) {
      console.warn('Ping attempt failed:', error);
      latencies.push(500);
    }
    await new Promise((resolve) => setTimeout(resolve, CONFIG.PING_DELAY));
  }

  const averageLatency = Math.round(
    latencies.reduce((sum, val) => sum + val, 0) / latencies.length
  );
  return averageLatency;
}

export async function runDownloadTest(
  onProgress?: (speed: number) => void
): Promise<number> {
  try {
    const fileSizeBytes = CONFIG.DOWNLOAD_SIZE_MB * 1024 * 1024;
    const url = `${CONFIG.DOWNLOAD_URL}${fileSizeBytes}&_cachebust=${Date.now()}`;
    
    const startTime = performance.now();
    const response = await fetch(url, { cache: 'no-store' });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Response body is not readable');
    }

    let receivedBytes = 0;
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      receivedBytes += value.length;
      
      const elapsed = (performance.now() - startTime) / 1000;
      if (elapsed > 0 && onProgress) {
        const speedMbps = (receivedBytes * 8) / (elapsed * 1000000);
        onProgress(speedMbps);
      }
    }

    const endTime = performance.now();
    const durationSeconds = (endTime - startTime) / 1000;
    const speedMbps = (fileSizeBytes * 8) / (durationSeconds * 1000000);
    
    return parseFloat(speedMbps.toFixed(2));
  } catch (error) {
    console.error('Download test failed:', error);
    throw new Error('Download test failed. Please check your connection.');
  }
}

export async function runUploadTest(
  onProgress?: (speed: number) => void
): Promise<number> {
  try {
    const fileSizeBytes = CONFIG.UPLOAD_SIZE_MB * 1024 * 1024;
    const testData = new Uint8Array(fileSizeBytes);
    
    const startTime = performance.now();
    const response = await fetch(CONFIG.UPLOAD_URL, {
      method: 'POST',
      body: testData,
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    await response.text();
    const endTime = performance.now();
    const durationSeconds = (endTime - startTime) / 1000;
    const speedMbps = (fileSizeBytes * 8) / (durationSeconds * 1000000);
    
    if (onProgress) {
      onProgress(speedMbps);
    }
    
    return parseFloat(speedMbps.toFixed(2));
  } catch (error) {
    console.error('Upload test failed:', error);
    // Fallback to alternative method
    try {
      const blob = new Blob([new ArrayBuffer(CONFIG.UPLOAD_SIZE_MB * 1024 * 1024)]);
      const startTime = performance.now();
      const response = await fetch(CONFIG.UPLOAD_URL, {
        method: 'POST',
        body: blob,
      });
      const endTime = performance.now();
      const durationSeconds = (endTime - startTime) / 1000;
      const speedMbps = (CONFIG.UPLOAD_SIZE_MB * 8) / durationSeconds;
      return parseFloat(speedMbps.toFixed(2));
    } catch (fallbackError) {
      throw new Error('Upload test failed. Please check your connection.');
    }
  }
}
