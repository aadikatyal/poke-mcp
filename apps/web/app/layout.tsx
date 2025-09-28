import './globals.css';

export const metadata = {
  title: 'Group Chat',
  description: 'PrizePicks Group Chat powered by Cedar-style components',
};

// Disable pinch-zoom and focus-zoom in mobile browsers / WebViews
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-pp-bg text-pp-text">
        {children}
      </body>
    </html>
  );
}
