import { Sidebar, TopBar, MainContent } from './components';
import { useLayout } from './hooks/useLayout';

export default function AppLayout({ children, pageTitle }) {
    const { sidebarCollapsed, toggleSidebar, isMobile } = useLayout();

    return (
        <div className="h-screen flex overflow-hidden bg-gray-100">
            {/* Sidebar - Fixed */}
            <Sidebar 
                isCollapsed={sidebarCollapsed} 
                onToggle={toggleSidebar}
                isMobile={isMobile}
            />

            {/* Main Layout - Flexible */}
            <div className={`
                flex flex-col flex-1 transition-all duration-300
                ${isMobile 
                    ? 'ml-0' 
                    : sidebarCollapsed 
                        ? 'ml-24' 
                        : 'ml-64'
                }
            `}>
                {/* TopBar - Fixed */}
                <TopBar 
                    title={pageTitle} 
                    onMenuToggle={toggleSidebar}
                    showMenuButton={isMobile}
                />

                {/* Main Content - Scrollable */}
                <MainContent>
                    {children}
                </MainContent>
            </div>
        </div>
    );
}
