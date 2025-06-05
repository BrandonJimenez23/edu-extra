export default function MainContent({ children, className = "" }) {
  return (
    <main 
      className={`
        flex-1 overflow-y-auto bg-gray-50 
        ${className}
      `}
      role="main"
    >
      <div className="p-6">
        {children}
      </div>
    </main>
  );
}
