# DailyFan – Expo + Embedded Web Chat

This repository contains a React Native Expo app with a Friends tab that embeds a React web group chat (Next.js) inside a WebView.

- Mobile app: Expo (SDK 54) with Expo Router, Tamagui styling
- Web chat: Next.js (apps/web)
- The Friends → Chat tab loads the web chat URL automatically during development

## Prerequisites

- Node.js 18+
- iOS Simulator (Xcode) and/or Android Emulator (Android Studio), or a physical device with Expo Go

## Install dependencies (root + web)

```bash
# from repo root
npm install
cd apps/web && npm install && cd ../..
```

## Running locally (two terminals)

Terminal A – Expo app (iOS/Android/Web):

```bash
npm run ios          # or: npm run android
# alternatively: npm start
```

Terminal B – Next.js web chat:

```bash
cd apps/web
npm run dev     # starts Next.js on http://localhost:3000
```

Then open the Friends tab → Chat. The WebView should load the chat automatically.

## How the chat URL is resolved (dev)

The app computes the chat URL at runtime (see lib/resolveWebChatUrl.ts). Resolution priority:

1. expo.extra.chatWebUrl (explicit override in app.json) – optional, not committed
2. Dev auto-detect:
   - Derive the LAN host from Metro’s scriptURL (works in Expo Go)
   - Fallback to expoConfig.hostUri
3. Fallback: http://localhost:3000

This means each developer can run both servers locally and see their own web chat inside the app without editing code.

## Physical device on same Wi‑Fi

- Ensure the phone and laptop are on the same network.
- macOS may prompt to allow incoming connections for Node/Next on port 3000 – allow it.
- If auto-detection ever fails, you can add a temporary local override (do not commit):

```json
{
  "expo": {
    "extra": {
      "chatWebUrl": "http://YOUR_LAN_IP:3000"
    }
  }
}
```

- Test reachability by opening http://YOUR_LAN_IP:3000 in the phone browser.

## Simulator notes

- iOS Simulator: localhost works with Next.js dev server
- Android Emulator: use http://10.0.2.2:3000 (or rely on auto-detection/override)

## Troubleshooting

- Blank WebView: make sure apps/web is running and reachable.
- iOS device + HTTP: if you hit ATS restrictions, prefer using an HTTPS tunnel (ngrok/Cloudflare) or add a temporary ATS exception for development only.
- External links inside chat open in the system browser.

## Scripts

Root (Expo):

```bash
npm run ios
npm run android
npm run web
npm run lint
```

Web chat (apps/web):

```bash
npm run dev
npm run build
npm start
```

For more details on the embedded chat integration and URL resolution, see WARP.md.
