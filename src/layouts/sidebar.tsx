'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { name: 'Dashboard', path: '/', icon: '📊' },
  { name: 'Despesas', path: '/despesas', icon: '💰' },
  { name: 'Receitas', path: '/receitas', icon: '📈' },
  { name: 'Metas', path: '/metas', icon: '🎯' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col justify-between md:flex">
      <div className="p-6 space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white shadow-lg shadow-emerald-600/20">
            LC
          </div>
          <h2 className="text-lg font-bold text-white tracking-wide">Lucria</h2>
        </div>

        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-zinc-800/80 m-4 bg-zinc-950/40 rounded-xl">
        <p className="text-xs text-zinc-500 font-medium">Versão 1.0.0</p>
        <p className="text-xs text-emerald-500 mt-0.5">● Sistema Conectado</p>
      </div>
    </aside>
  );
}