import { useMemo, useState } from 'react';

const money = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

function num(v: string): number {
  const n = parseFloat(v);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function Field({ id, label, value, onChange, suffix }: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm text-slate-300">
        {label} {suffix && <span className="text-slate-500">({suffix})</span>}
      </label>
      <input
        id={id}
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="field"
      />
    </div>
  );
}

export function SavingsGoalCalculator() {
  const [target, setTarget] = useState('10000');
  const [current, setCurrent] = useState('1000');
  const [monthly, setMonthly] = useState('300');
  const [rate, setRate] = useState('3');

  const result = useMemo(() => {
    const t = num(target);
    let bal = num(current);
    const m = num(monthly);
    const r = num(rate) / 100 / 12;
    if (bal >= t) return { months: 0 };
    if (m <= 0 && r <= 0) return { months: null };
    for (let i = 1; i <= 1200; i++) {
      bal = bal * (1 + r) + m;
      if (bal >= t) return { months: i };
    }
    return { months: null };
  }, [target, current, monthly, rate]);

  return (
    <section className="card" aria-labelledby="savings-title">
      <h3 id="savings-title" className="text-xl font-semibold">Savings goal calculator</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field id="sg-target" label="Savings goal" suffix="$" value={target} onChange={setTarget} />
        <Field id="sg-current" label="Already saved" suffix="$" value={current} onChange={setCurrent} />
        <Field id="sg-monthly" label="Monthly contribution" suffix="$" value={monthly} onChange={setMonthly} />
        <Field id="sg-rate" label="Assumed annual growth" suffix="%" value={rate} onChange={setRate} />
      </div>
      <p className="mt-5 text-lg text-white" aria-live="polite">
        {result.months === null
          ? 'With these inputs the goal is not reached within 100 years.'
          : result.months === 0
            ? 'You have already reached this goal.'
            : `About ${result.months} months (${(result.months / 12).toFixed(1)} years) to reach ${money(num(target))}.`}
      </p>
      <p className="mt-2 text-xs text-slate-400">
        Illustration only. Assumes a constant rate and monthly compounding. Real results vary.
      </p>
    </section>
  );
}

export function DebtPayoffCalculator() {
  const [balance, setBalance] = useState('5000');
  const [apr, setApr] = useState('18');
  const [payment, setPayment] = useState('200');

  const result = useMemo(() => {
    let bal = num(balance);
    const r = num(apr) / 100 / 12;
    const pay = num(payment);
    if (bal <= 0) return { months: 0, interest: 0 };
    if (pay <= bal * r) return null;
    let interest = 0;
    let months = 0;
    while (bal > 0 && months < 1200) {
      const i = bal * r;
      interest += i;
      bal = bal + i - pay;
      months++;
    }
    return { months, interest };
  }, [balance, apr, payment]);

  return (
    <section className="card" aria-labelledby="debt-title">
      <h3 id="debt-title" className="text-xl font-semibold">Debt payoff scenario</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <Field id="dp-balance" label="Balance" suffix="$" value={balance} onChange={setBalance} />
        <Field id="dp-apr" label="Interest rate (APR)" suffix="%" value={apr} onChange={setApr} />
        <Field id="dp-payment" label="Monthly payment" suffix="$" value={payment} onChange={setPayment} />
      </div>
      <p className="mt-5 text-lg text-white" aria-live="polite">
        {result === null
          ? 'This payment does not cover monthly interest, so the balance would not shrink.'
          : `About ${result.months} months to pay off, with roughly ${money(result.interest)} in interest.`}
      </p>
      <p className="mt-2 text-xs text-slate-400">
        Illustration only. Assumes a fixed rate and no new charges or fees.
      </p>
    </section>
  );
}
