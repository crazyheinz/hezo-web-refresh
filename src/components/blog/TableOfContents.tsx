import { List } from "lucide-react";

interface TableOfContentsProps {
  headings: { id: string; label: string }[];
}

const TableOfContents = ({ headings }: TableOfContentsProps) => {
  if (headings.length === 0) return null;

  return (
    <nav className="p-6 bg-gradient-to-br from-secondary/5 to-light-blue/10 border border-secondary/15 rounded-2xl">
      <div className="w-10 h-1 bg-secondary rounded-full mb-4" />
      <h2 className="flex items-center gap-2 text-lg font-semibold text-primary mb-4">
        <List className="h-5 w-5 text-secondary" />
        Op deze pagina
      </h2>
      <ul className="space-y-2">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className="text-muted-foreground hover:text-secondary transition-colors text-[15px] leading-relaxed"
            >
              {h.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
