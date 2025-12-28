'use client';

import { useState, useEffect } from 'react';
import { runPingTest, runDownloadTest, runUploadTest, CONFIG } from '@/lib/speedTest';
import { getNetworkInfo, NetworkInfo } from '@/lib/networkInfo';
import CircularGauge from './CircularGauge';
import ProgressBar from './ProgressBar';
import ResultCard from './ResultCard';

interface TestState {
  isRunning: boolean;
  progress: number;
  status: string;
  statusValue: string;
  showGauge: boolean;
  gaugeValue: number;
  gaugeLabel: string;
  error: string | null;
  results: {
    ping: number;
    download: number;
    upload: number;
  } | null;
  networkInfo: NetworkInfo | null;
  testTime: string | null;
}

export default function SpeedTest() {
  const [state, setState] = useState<TestState>({
    isRunning: false,
    progress: 0,
    status: 'Ready to test your connection',
    statusValue: '',
    showGauge: false,
    gaugeValue: 0,
    gaugeLabel: 'Mbps',
    error: null,
    results: null,
    networkInfo: null,
    testTime: null,
  });

  useEffect(() => {
    // Load network info on mount
    getNetworkInfo().then((info) => {
      setState((prev) => ({ ...prev, networkInfo: info }));
    });
  }, []);

  const updateStatus = (text: string, value: string = '') => {
    setState((prev) => ({
      ...prev,
      status: text,
      statusValue: value,
    }));
  };

  const updateProgress = (percentage: number) => {
    setState((prev) => ({ ...prev, progress: percentage }));
  };

  const updateGauge = (value: number, label: string = 'Mbps') => {
    setState((prev) => ({
      ...prev,
      showGauge: true,
      gaugeValue: value,
      gaugeLabel: label,
    }));
  };

  const showError = (message: string) => {
    setState((prev) => ({ ...prev, error: message }));
    setTimeout(() => {
      setState((prev) => ({ ...prev, error: null }));
    }, 5000);
  };

  const startSpeedTest = async () => {
    if (state.isRunning) return;

    setState({
      isRunning: true,
      progress: 0,
      status: 'Starting test...',
      statusValue: '',
      showGauge: false,
      gaugeValue: 0,
      gaugeLabel: 'Mbps',
      error: null,
      results: null,
      testTime: null,
    });

    try {
      // Ping Test
      updateStatus('Testing Ping...', '');
      updateProgress(10);
      const ping = await runPingTest((latency) => {
        updateGauge(latency, 'ms');
      });
      updateGauge(ping, 'ms');

      // Download Test
      updateStatus('Testing Download Speed...', '');
      updateProgress(40);
      const download = await runDownloadTest((speed) => {
        updateStatus('Downloading...', `${speed.toFixed(1)} Mbps`);
        updateGauge(Math.min(speed, CONFIG.MAX_GAUGE_VALUE), 'Mbps');
        updateProgress(40 + (speed / CONFIG.MAX_GAUGE_VALUE) * 30);
      });
      updateGauge(Math.min(download, CONFIG.MAX_GAUGE_VALUE), 'Mbps');

      // Upload Test
      updateStatus('Testing Upload Speed...', '');
      updateProgress(70);
      const upload = await runUploadTest((speed) => {
        updateGauge(Math.min(speed, CONFIG.MAX_GAUGE_VALUE), 'Mbps');
      });
      updateGauge(Math.min(upload, CONFIG.MAX_GAUGE_VALUE), 'Mbps');

      updateProgress(100);
      updateStatus('Test Complete!', '');

      setState((prev) => ({
        ...prev,
        showGauge: false,
        results: { ping, download, upload },
        testTime: new Date().toLocaleString(),
      }));

      // Refresh network info
      const networkInfo = await getNetworkInfo();
      setState((prev) => ({ ...prev, networkInfo }));
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An error occurred during the test. Please try again.';
      showError(errorMessage);
      updateStatus('Test Failed', '');
      setState((prev) => ({ ...prev, showGauge: false }));
    } finally {
      setState((prev) => ({ ...prev, isRunning: false }));
    }
  };

  return (
    <div className="bg-white rounded-[32px] p-8 md:p-12 lg:p-16 shadow-lg border border-gray-200 relative">
      {/* Start Button */}
      <button
        onClick={startSpeedTest}
        disabled={state.isRunning}
        className="w-48 h-48 md:w-52 md:h-52 mx-auto my-8 rounded-full bg-gradient-primary text-white text-xl font-bold cursor-pointer relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
        aria-label="Start speed test"
        aria-describedby="statusText"
      >
        <span id="buttonText">{state.isRunning ? 'Testing...' : 'Start'}</span>
      </button>

      {/* Status Display */}
      <div
        className="text-center min-h-[180px] flex flex-col justify-center items-center my-8"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <div
          id="statusText"
          className="text-lg text-gray-600 font-medium mb-4 uppercase tracking-wider"
        >
          {state.status}
        </div>
        {state.statusValue && (
          <div className="text-6xl font-extrabold text-primary leading-none">
            {state.statusValue}
          </div>
        )}
        {state.isRunning && (
          <ProgressBar progress={state.progress} className="mt-4" />
        )}
      </div>

      {/* Circular Gauge */}
      {state.showGauge && (
        <CircularGauge
          value={state.gaugeValue}
          maxValue={state.gaugeLabel === 'ms' ? 200 : CONFIG.MAX_GAUGE_VALUE}
          label={state.gaugeLabel}
        />
      )}

      {/* Error Message */}
      {state.error && (
        <div
          className="bg-red-50 border-2 border-red-200 text-red-600 p-5 rounded-2xl my-4 text-center font-semibold"
          role="alert"
        >
          {state.error}
        </div>
      )}

      {/* Results Section */}
      {state.results && (
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <ResultCard
              label="Ping"
              value={state.results.ping}
              unit="ms"
              type="ping"
              delay={100}
            />
            <ResultCard
              label="Download"
              value={state.results.download}
              unit="Mbps"
              type="speed"
              delay={200}
            />
            <ResultCard
              label="Upload"
              value={state.results.upload}
              unit="Mbps"
              type="speed"
              delay={300}
            />
          </div>

          {/* Network Info */}
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 mt-8">
            <div className="flex justify-between items-center py-5 border-b border-gray-200 last:border-0">
              <span className="font-semibold text-gray-600 text-sm">Public IP Address</span>
              <span className="font-bold text-gray-900">
                {state.networkInfo?.ip || (
                  <span className="inline-block w-5 h-5 border-2 border-gray-300 border-t-primary rounded-full animate-spin" />
                )}
              </span>
            </div>
            <div className="flex justify-between items-center py-5 border-b border-gray-200 last:border-0">
              <span className="font-semibold text-gray-600 text-sm">Server Location</span>
              <span className="font-bold text-gray-900">
                {state.networkInfo?.server || (
                  <span className="inline-block w-5 h-5 border-2 border-gray-300 border-t-primary rounded-full animate-spin" />
                )}
              </span>
            </div>
            <div className="flex justify-between items-center py-5 border-b border-gray-200 last:border-0">
              <span className="font-semibold text-gray-600 text-sm">Test Time</span>
              <span className="font-bold text-gray-900">{state.testTime || '-'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
