export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#1c1011] flex flex-col items-center justify-center px-5">
      <h1 className="font-display text-6xl font-black text-[#ffb2ba]">404</h1>
      <p className="mt-4 font-display text-2xl text-[#f5ddde]">Page not found</p>
      <p className="mt-2 text-[#e0bec1]">The page you're looking for doesn't exist.</p>
      <a href="/" className="mt-8 px-6 py-3 bg-[#ffb2ba] text-[#400011] font-mono text-sm font-bold rounded-lg hover:bg-[#f55a77]">
        Back to home
      </a>
    </main>
  );
}
