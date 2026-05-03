import { Link } from 'wouter';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, actionLabel, actionHref, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl border-4 border-dashed border-muted bg-background/50">
      {icon && <div className="mb-6 text-muted-foreground">{icon}</div>}
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-md mb-8 text-lg">{description}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button size="lg" className="rounded-full">{actionLabel}</Button>
        </Link>
      )}
    </div>
  );
}
