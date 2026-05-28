import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Settings, Image, FileText, MessageSquare, Newspaper,
  LogOut, Menu, X, ChevronRight, Home, Layers
} from "lucide-react";

const navItems = [
  { label: "Tableau de bord", href: "/admin", icon: LayoutDashboard },
  { label: "Contenu du site", href: "/admin/content", icon: Layers },
  { label: "Services", href: "/admin/services", icon: Settings },
  { label: "Galerie", href: "/admin/gallery", icon: Image },
  { label: "Témoignages", href: "/admin/testimonials", icon: MessageSquare },
  { label: "Articles", href: "/admin/articles", icon: Newspaper },
  { label: "Textes (avancé)", href: "/admin/texts", icon: FileText },
];

const AdminLayout = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar overlay mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="font-heading font-bold text-foreground text-lg">MTC Admin</h2>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-muted-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
                {active && <ChevronRight className="h-4 w-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border space-y-1">
          <a
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
          >
            <Home className="h-4 w-4" /> Voir le site
          </a>
          <button
            onClick={signOut}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-destructive hover:bg-destructive/10 transition-all w-full"
          >
            <LogOut className="h-4 w-4" /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border bg-card flex items-center px-4 gap-3">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden text-foreground">
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="font-heading font-semibold text-foreground text-sm">
            {navItems.find((n) => n.href === location.pathname)?.label || "Admin"}
          </h1>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
