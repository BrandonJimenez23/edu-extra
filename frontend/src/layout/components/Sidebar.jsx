import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  ClipboardList, 
  Palette,
  FileEdit,
  Layout,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Logo } from '../../components/ui/Logo';

const navigationItems = [
  { href: '/', label: 'Dashboard', icon: BarChart3 },
  { href: '/users', label: 'Users', icon: Users },
  { href: '/activities', label: 'Activities', icon: ClipboardList },
  { href: '/components', label: 'Component Library', icon: Layout },
];

export default function Sidebar({ isCollapsed = false, onToggle, isMobile = false }) {
  const location = useLocation();

  const isActive = (href) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <>
      {/* Overlay para móvil */}
      {isMobile && !isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={onToggle}
        />
      )}

      <aside className={`
        fixed left-0 top-0 h-screen bg-blue-ribbon-500 text-white transition-all duration-300 z-40
        ${isCollapsed ? (isMobile ? '-translate-x-full' : 'w-24') : 'w-64'}
        shadow-lg
      `}>
        {/* Header */}
        <header className="p-4 border-b border-blue-ribbon-400">
          <div className="flex items-center justify-between">
            <div className={`transition-opacity duration-300 ${isCollapsed && !isMobile ? 'opacity-0 w-0' : 'opacity-100'}`}>
              <Logo variant="light" />
            </div>
            
            {/* Toggle Button */}
            <button
              onClick={onToggle}
              className="p-2 rounded-lg hover:bg-white/20 transition-colors border border-transparent hover:border-white/30"
              aria-label={isCollapsed ? 'Expandir sidebar' : 'Contraer sidebar'}
            >
              {isCollapsed ? 
                <ChevronRight size={20} className="text-sunglow-300 drop-shadow-sm" /> : 
                <ChevronLeft size={20} className="text-sunglow-300 drop-shadow-sm" />
              }
            </button>
          </div>
        </header>

        {/* Navigation */}
        <nav aria-label="Main Navigation" className="p-4 space-y-2">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`
                  group flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                  ${active 
                    ? 'bg-white/25 text-white shadow-lg ring-1 ring-white/20' 
                    : 'hover:bg-white/15 text-white/90 hover:text-white'
                  }
                  ${isCollapsed && !isMobile ? 'justify-center' : 'justify-start'}
                `}
                title={isCollapsed && !isMobile ? item.label : undefined}
              >
                <IconComponent 
                  size={20} 
                  className={`transition-colors duration-200 ${active 
                    ? 'text-sunglow-300 drop-shadow-sm' 
                    : 'text-emerald-300 group-hover:text-sunglow-300'
                  }`}
                />
                <span className={`
                  font-medium transition-all duration-300
                  ${isCollapsed && !isMobile ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}
                  ${active ? 'text-white' : 'text-white/90 group-hover:text-white'}
                `}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <div className={`
            p-3 bg-blue-ribbon-400/30 rounded-lg text-center
            ${isCollapsed && !isMobile ? 'px-2' : 'px-3'}
          `}>
            <div className={`text-xs text-blue-100 ${isCollapsed && !isMobile ? 'hidden' : 'block'}`}>
              EduExtra v1.0
            </div>
            {isCollapsed && !isMobile && (
              <div className="text-xs text-blue-100">v1.0</div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
