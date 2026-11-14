import {
  ArrowRight,
  BookOpen,
  Brain,
  ChefHat,
  Compass,
  GraduationCap,
  Hammer,
  HeartPulse,
  Landmark,
  Rocket,
  ShieldCheck,
  Sparkles,
  Sprout,
  TrendingUp,
  Plane,
  Palette,
  Wallet,
  Wrench,
  FlaskConical,
  Users,
  type LucideIcon,
} from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  ArrowRight,
  BookOpen,
  Brain,
  ChefHat,
  Compass,
  GraduationCap,
  Hammer,
  HeartPulse,
  Landmark,
  Rocket,
  ShieldCheck,
  Sparkles,
  Sprout,
  TrendingUp,
  Plane,
  Palette,
  Wallet,
  Wrench,
  FlaskConical,
  Users,
};

interface Props {
  name: string;
  className?: string;
}

export default function Icon({ name, className = 'h-6 w-6' }: Props) {
  const Cmp = icons[name] ?? Sparkles;
  return <Cmp className={className} aria-hidden="true" />;
}
