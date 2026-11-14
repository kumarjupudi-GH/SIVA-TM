interface Props {
  eyebrow?: string;
  title: string;
  text?: string;
  center?: boolean;
}

export default function SectionHeader({ eyebrow, title, text, center }: Props) {
  return (
    <div className={`mb-10 max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-cyan-accent">{eyebrow}</p>
      )}
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-lg text-slate-300">{text}</p>}
    </div>
  );
}
