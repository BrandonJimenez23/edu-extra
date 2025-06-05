import { Link } from 'react-router-dom';
import { Logo } from '../components/ui/Logo';

export default function AppLayout({ children }) {
    return (
        <div className="grid grid-cols-[250px_1fr] grid-rows-[auto_1fr] min-h-screen">
            {/* Sidebar */}
            <aside className="col-span-1 row-span-2 bg-blue-ribbon-500 text-white">
                <header className="mb-8 shadow-md p-4">
                    <Logo variant="light" />
                </header>
                <nav aria-label="Main Navigation" className="space-y-4 p-4">
                    <a href="/dashboard" className="block hover:text-blue-200">Dashboard</a>
                    <a href="/users" className="block hover:text-blue-200">Usuarios</a>
                    <a href="/activities" className="block hover:text-blue-200">Actividades</a>
                    <Link to={"design-system"} className="block hover:text-blue-200">Diseño</Link>
                </nav>
            </aside>

            {/* Topbar */}
            <header className="bg-white shadow-md flex justify-between items-center h-16 px-0">
                <h1 className="text-lg font-heading font-semibold pl-4">Panel de administración</h1>
                <div className="flex items-center gap-4 pr-4">
                    <label htmlFor="search" className="sr-only">Buscar</label>
                    <input id="search" type="search" placeholder="Buscar..." className="border px-2 py-1 rounded" />
                    <img
                      src="https://unavatar.io/Kronnoz16"
                      alt="Avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                </div>
            </header>

            {/* Main content */}
            <main className="bg-gray-50 p-6" role="main">
                {children}
            </main>
        </div>
    );
}
