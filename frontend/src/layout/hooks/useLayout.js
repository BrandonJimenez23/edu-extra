import { useState, useEffect } from 'react';

export const useLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    // Recuperar estado del localStorage
    const saved = localStorage.getItem('edu-extra-sidebar-collapsed');
    return saved ? JSON.parse(saved) : false;
  });

  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // En móvil, el sidebar está colapsado (oculto) por defecto
      if (mobile) {
        setSidebarCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Guardar estado en localStorage solo para desktop
  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem('edu-extra-sidebar-collapsed', JSON.stringify(sidebarCollapsed));
    }
  }, [sidebarCollapsed, isMobile]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return {
    sidebarCollapsed,
    setSidebarCollapsed,
    toggleSidebar,
    isMobile
  };
};
