import NavbarWrapper from './Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarWrapper />
      <main className="flex-grow">{children}</main>
    </div>
  );
}