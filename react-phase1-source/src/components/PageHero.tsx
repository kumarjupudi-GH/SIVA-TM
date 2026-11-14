import type { ReactNode } from 'react';

interface Props {
  eyebrow: string;
  title: string;
  text: string;
  children?: ReactNode;
}

export default function PageHero({ eyebrow, title, text, children }: Props) {
  return (
    <header className="grid-bg border-b border-white/10 bg-navy-950 py-16 sm:py-24">
      <div className="container-page">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-cyan-accent">{eyebrow}</p>
        <h1 className="max-w-3xl text-4xl font-bold sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-slate-300">{text}</p>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </header>
  );
}
