import { ListChecks, CheckCircle } from 'lucide-react';

export function QuickOverview() {
  return (
    <div className="bg-secondary/50 border border-border/50 rounded-2xl p-6 my-8">
      <div className="flex items-center gap-3 mb-4">
        <ListChecks className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold font-headline">Quick Overview</h2>
      </div>
      <ul className="space-y-3 text-muted-foreground">
        <li className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 mt-1 shrink-0 text-primary/80" />
          <span>A brief look at the future of comfortable and efficient typing with ergonomic keyboards.</span>
        </li>
        <li className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 mt-1 shrink-0 text-primary/80" />
          <span>Discover why these designs are becoming a staple for professionals and enthusiasts alike.</span>
        </li>
        <li className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 mt-1 shrink-0 text-primary/80" />
          <span>We'll cover the key benefits, from reduced strain to improved posture and productivity.</span>
        </li>
      </ul>
    </div>
  );
}
