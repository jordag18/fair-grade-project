export default function TopBar() {
    return (
      <div className="relative flex h-14 w-full bg-slate-200 items-center drop-shadow-md">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight ml-5">Admin Dashboard</h3>
        <h3 className="absolute left-1/2 transform -translate-x-1/2 scroll-m-20 text-2xl font-semibold tracking-tight ml-5 mx-auto">Selected Course:</h3>
      </div>
    );
  }