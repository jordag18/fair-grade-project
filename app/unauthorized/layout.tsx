export default function RootLayout({
    children,
  }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body className="flex flex-col min-h-screen p-28">
              {children}
        </body>
      </html>
    );
  }