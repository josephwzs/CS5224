import {
  FileText,
  LayoutDashboard,
  History,
  BarChart3,
  Search,
  Sparkles,
  Upload,
  UserCircle,
  Users,
} from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

const pages = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Cases", href: "/cases", icon: FileText },
  { name: "Audit Log", href: "/audit-log", icon: History },
  { name: "Bulk Upload", href: "/bulk-upload", icon: Upload },
  { name: "AI Tools", href: "/ai-tools", icon: Sparkles },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Relationships", href: "/relationships", icon: Users },
  { name: "User Management", href: "/users", icon: UserCircle },
];

export function CommandPalette() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (href: string) => {
    setOpen(false);
    navigate(href);
  };

  return (
    <>
      <div className="relative w-full max-w-2xl" onClick={() => setOpen(true)}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Search pages... (Ctrl+K)"
          className="pl-9 pr-12 cursor-pointer"
          readOnly
        />
        <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-[10px] font-medium sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type to search pages..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {pages.map((page) => (
              <CommandItem
                key={page.href}
                onSelect={() => handleSelect(page.href)}
              >
                <page.icon className="mr-2 h-4 w-4" />
                <span>{page.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
