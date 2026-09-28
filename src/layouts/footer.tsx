export function Footer() {
  return (
    <footer className="py-4 px-6 border-t border-zinc-800 bg-zinc-950 text-center text-xs text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-2">
      <p>© {new Date().getFullYear()} Lucria.</p>
      <div className="flex gap-4">
        <span className="hover:text-zinc-400 transition cursor-pointer">Termos</span>
        <span className="hover:text-zinc-400 transition cursor-pointer">Privacidade</span>
        <span className="hover:text-zinc-400 transition cursor-pointer">Suporte</span>
      </div>
    </footer>
  );
}