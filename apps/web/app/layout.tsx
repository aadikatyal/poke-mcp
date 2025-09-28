import './globals.css';

export const metadata = {
  title: 'Group Chat',
  description: 'PrizePicks Group Chat (beta) powered by Cedar-style components',
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
