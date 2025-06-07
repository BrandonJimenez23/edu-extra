import { useState, useRef, useEffect } from 'react';
import { User, Settings, HelpCircle, LogOut, ChevronDown } from 'lucide-react';

const mockUser = {
  name: 'Brandon Jiménez',
  email: 'brandon@eduextra.com',
  avatar: 'https://unavatar.io/Kronnoz16',
  role: 'Administrador'
};

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Cerrar menu al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Implementar lógica de logout
    console.log('Logging out...');
    setIsOpen(false);
  };

  const menuItems = [
    { label: 'Mi Perfil', icon: User, action: () => console.log('Profile') },
    { label: 'Configuración', icon: Settings, action: () => console.log('Settings') },
    { label: 'Ayuda', icon: HelpCircle, action: () => console.log('Help') },
    { label: 'Cerrar Sesión', icon: LogOut, action: handleLogout, danger: true }
  ];

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors group"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Avatar */}
        <div className="relative">
          <img
            src={mockUser.avatar}
            alt={`Avatar de ${mockUser.name}`}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-200 group-hover:ring-gray-300 transition-all"
          />
          {/* Status indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full ring-2 ring-white"></div>
        </div>

        {/* User info - hidden on mobile */}
        <div className="hidden sm:block text-left">
          <div className="text-sm font-medium text-gray-700 font-heading">
            {mockUser.name}
          </div>
          <div className="text-xs text-gray-500">
            {mockUser.role}
          </div>
        </div>

        {/* Dropdown arrow */}
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <img
                src={mockUser.avatar}
                alt={`Avatar de ${mockUser.name}`}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-medium text-gray-900 font-heading">{mockUser.name}</div>
                <div className="text-sm text-gray-500">{mockUser.email}</div>
                <div className="text-xs text-blue-ribbon-600 bg-blue-ribbon-50 px-2 py-0.5 rounded-full inline-block mt-1">
                  {mockUser.role}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={index}
                  onClick={item.action}
                  className={`
                    w-full flex items-center gap-3 px-4 py-2 text-left transition-colors
                    ${item.danger 
                      ? 'text-coral-red-600 hover:bg-coral-red-50' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <IconComponent size={16} />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
