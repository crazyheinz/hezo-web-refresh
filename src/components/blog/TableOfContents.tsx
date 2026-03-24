import { List } from "lucide-react";

interface TableOfContentsProps {
  headings: { id: string; label: string }[];
}

const TableOfContents = ({ headings }: TableOfContentsProps) => {
  if (headings.length === 0) return null;

  return (
    <nav className="p-6 bg-gradient-to-br from-secondary/5 to-light-blue/10 border border-secondary/15 rounded-2xl">
      <div className="w-10 h-1 bg-secondary rounded-full mb-4" />
      <h2 className="flex items-center gap-2 text-lg font-semibold text-primary mb-5">
        <List className="h-5 w-5 text-secondary" />
        Op deze pagina
      </h2>
      <ul className="space-y-0 divide-y divide-border/60">
        {headings.map((h, i) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className="flex items-start gap-3 py-3 text-muted-foreground hover:text-secondary transition-colors text-[14px] leading-snug group"
            >
              <span className="shrink-0 w-5 h-5 rounded-full bg-secondary/10 text-secondary text-[11px] font-semibold flex items-center justify-center mt-0.5 group-hover:bg-secondary/20 transition-colors">
                {i + 1}
              </span>
              <span>{h.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
