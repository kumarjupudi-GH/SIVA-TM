interface Step {
  title: string;
  text?: string;
}

export default function JourneyStepper({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
      {steps.map((step, i) => (
        <li key={step.title} className="relative rounded-xl border border-white/10 bg-navy-800/60 p-4">
          <span className="font-mono text-xs text-cyan-accent">{String(i + 1).padStart(2, '0')}</span>
          <p className="mt-1 font-display text-lg font-semibold text-white">{step.title}</p>
          {step.text && <p className="mt-1 text-sm text-slate-300">{step.text}</p>}
        </li>
      ))}
    </ol>
  );
}
