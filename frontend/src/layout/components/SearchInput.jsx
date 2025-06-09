import { useState, useRef, useEffect } from 'react';
import { Search, Command } from 'lucide-react';

export default function SearchInput({ 
  value, 
  onChange, 
  onSearch, 
  placeholder = "Buscar...",
  className = ""
}) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() && onSearch) {
      onSearch(value.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      inputRef.current?.blur();
      onChange('');
    }
  };

  // Shortcut Ctrl+K para enfocar la búsqueda
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className={`
        relative flex items-center transition-all duration-200
        ${isFocused ? 'w-80' : 'w-64'}
      `}>
        {/* Icono de búsqueda */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Input de búsqueda */}
        <input
          ref={inputRef}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`
            w-full pl-10 pr-12 py-2 text-sm
            border border-gray-300 rounded-lg
            bg-gray-50 focus:bg-white
            focus:border-blue-500 focus:ring-2 focus:ring-blue-200
            transition-all duration-200
            placeholder-gray-400
          `}
          aria-label="Buscar"
        />

        {/* Shortcut hint */}
        <div className={`
          absolute right-3 top-1/2 transform -translate-y-1/2
          text-xs text-gray-400 pointer-events-none
          ${isFocused ? 'opacity-0' : 'opacity-100'}
          transition-opacity duration-200
        `}>
          <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">⌘K</kbd>
        </div>

        {/* Clear button */}
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Limpiar búsqueda"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
}
