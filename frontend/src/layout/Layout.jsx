export default function Layout({ children }) {
    return (
        <div className="grid grid-rows-[auto_auto_1fr_auto] min-h-screen">
            {/* Header */}
            <header className="flex items-center justify-center ">
                <img
                    className="w-24 sm:w-48 md:w-128 h-auto"
                    src="/EduExtraLogoSlim.png"
                    alt="Logo"
                />

            </header>

            {/* Navigation */}
            <nav className="bg-blue-ribbon-400 py-2">
                <ul className="flex justify-center space-x-6">
                    <li><a href="/" className="text-white font-heading hover:text-blue-ribbon-700">Home</a></li>
                    <li><a href="/users" className="text-white font-heading hover:text-blue-ribbon-700">Users</a></li>
                    <li><a href="/about" className="text-white font-heading hover:text-blue-ribbon-700">About</a></li>
                </ul>
            </nav>

            {/* Main Content */}
            <main className="p-4">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-200 text-center py-4 text-sm text-gray-600">
                © {new Date().getFullYear()} EDU EXTRA. All rights reserved.
            </footer>
        </div>
    );
}