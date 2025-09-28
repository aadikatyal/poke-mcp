import { Platform, NativeModules } from 'react-native';
import Constants from 'expo-constants';

/**
 * Resolve the base URL for the embedded web group chat.
 * Priority:
 * 1) expo.extra.chatWebUrl in app.json (explicit override)
 * 2) Derive LAN host from Metro bundler scriptURL (DEV)
 * 3) Derive host from expoConfig.hostUri (DEV fallback)
 * 4) Fallback to http://localhost:3000
 */
export function resolveWebChatUrl(): string {
  // 1) Explicit override via app.json -> expo.extra.chatWebUrl
  const explicit = (Constants?.expoConfig as any)?.extra?.chatWebUrl as string | undefined;
  if (explicit) return explicit;

  // Helper to extract host from various URI formats (http, https, exp, bare host:port)
  const extractHost = (u?: string): string | undefined => {
    if (!u || typeof u !== 'string') return undefined;
    // Normalize exp:// -> http:// for parsing
    const normalized = u.match(/^[a-z]+:\/\//i) ? u.replace(/^exp:\/\//i, 'http://') : (u.includes(':') ? `http://${u}` : `http://${u}`);
    try {
      const url = new URL(normalized);
      return url.hostname || undefined;
    } catch {
      const m = normalized.match(/^[a-z]+:\/\/([^:/?#]+)(?::\d+)?/i);
      return m?.[1];
    }
  };

  // 2) Derive from Metro scriptURL (works in Expo Go on device/simulator)
  try {
    const scriptURL: string | undefined = (NativeModules as any)?.SourceCode?.scriptURL;
    const host = extractHost(scriptURL);
    if (host) return `http://${host}:3000`;
  } catch {}

  // 3) Fallback to expoConfig.hostUri
  try {
    const hostUri = (Constants?.expoConfig as any)?.hostUri as string | undefined; // e.g. "192.168.1.10:8081"
    const host = extractHost(hostUri);
    if (host) return `http://${host}:3000`;
  } catch {}

  // 4) Last resort
  return 'http://localhost:3000';
}

