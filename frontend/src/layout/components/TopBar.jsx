import { useState } from 'react';
import { Menu, Bell } from 'lucide-react';
import SearchInput from './SearchInput';
import UserMenu from './UserMenu';

export default function TopBar({ 
  title = "Panel de administración", 
  onMenuToggle, 
  showMenuButton = false 
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Aquí puedes implementar la lógica de búsqueda
    console.log('Searching for:', query);
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-200 relative z-30">
      <div className="flex justify-between items-center h-16 px-6">
        {/* Lado izquierdo - Botón menú móvil + Título */}
        <div className="flex items-center gap-4 flex-1">
          {/* Botón de menú para móvil */}
          {showMenuButton && (
            <button
              onClick={onMenuToggle}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
              aria-label="Abrir menú"
            >
              <Menu size={24} />
            </button>
          )}

          {/* Título de la página */}
          <h1 className="text-xl font-heading font-semibold text-gray-800 truncate">
            {title}
          </h1>
        </div>

        {/* Acciones del header */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Búsqueda */}
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            placeholder="Buscar en EduExtra..."
          />

          {/* Notificaciones */}
          <button
            className="p-2 text-gray-500 hover:text-blue-ribbon-600 hover:bg-blue-ribbon-50 rounded-lg transition-colors"
            aria-label="Notificaciones"
          >
            <Bell size={20} />
          </button>

          {/* Menu de usuario */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
