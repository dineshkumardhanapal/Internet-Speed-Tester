export interface NetworkInfo {
  ip: string;
  server: string;
}

let cachedIpData: { ip: string } | null = null;

export async function fetchPublicIp(): Promise<{ ip: string }> {
  if (cachedIpData) return cachedIpData;

  try {
    const response = await fetch('https://api.ipify.org?format=json');
    if (!response.ok) throw new Error('Failed to fetch IP');
    const data = await response.json();
    cachedIpData = { ip: data.ip };
    return cachedIpData;
  } catch (error) {
    console.error('IP fetch error:', error);
    return { ip: 'Unknown' };
  }
}

export async function fetchServerInfo(ip: string): Promise<string> {
  try {
    const response = await fetch(`https://ipinfo.io/${ip}/json`);
    if (!response.ok) throw new Error('Failed to fetch server info');
    const data = await response.json();
    return data.org || data.isp || 'Global Server';
  } catch (error) {
    console.error('Server info error:', error);
    return 'Unknown';
  }
}

export async function getNetworkInfo(): Promise<NetworkInfo> {
  const ipData = await fetchPublicIp();
  const serverInfo = await fetchServerInfo(ipData.ip);
  return {
    ip: ipData.ip,
    server: serverInfo,
  };
}
