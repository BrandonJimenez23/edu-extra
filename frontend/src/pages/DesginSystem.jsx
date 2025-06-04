import Button from '../components/ui/Button';
import clsx from 'clsx';

const DesignSystem = () => {

  const colorClasses = {
    'blue-ribbon': 'bg-blue-ribbon-500',
    emerald: 'bg-emerald-500',
    sunglow: 'bg-sunglow-500',
    'coral-red': 'bg-coral-red-500',
  };

  return (
    <div className="p-6 space-y-10">
      <section>
        <h2 className="text-3xl font-heading mb-4">🎨 Botones</h2>
        {["primary", "secondary", "warning", "danger"].map((variant) => (
          <div key={variant} className="space-x-4 mb-3">
            <Button variant={variant} size="sm">{variant} sm</Button>
            <Button variant={variant} size="md">{variant} md</Button>
            <Button variant={variant} size="lg">{variant} lg</Button>
            <Button variant={variant} size="md" ghost>{variant} ghost</Button>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-3xl font-heading mb-4">🔤 Tipografías</h2>
        <p className="text-sm font-sans text-gray-600">Texto pequeño</p>
        <p className="text-base font-sans text-gray-700">Texto base</p>
        <p className="text-lg font-sans text-gray-800">Texto grande</p>
        <p className="text-xl font-heading text-dark">Título h1</p>
        <p className="text-2xl font-heading text-dark">Título h2</p>
      </section>

      <section>
        <h2 className="text-3xl font-heading mb-4">🃏 Colores</h2>
        <div className="flex flex-wrap gap-4">
          {['blue-ribbon', 'emerald', 'sunglow', 'coral-red'].map((color) => (

            <div
              key={color}
              className={clsx(
                'w-24 h-12 rounded shadow text-white flex items-center justify-center',
                colorClasses[color]
              )}
            >
              {color}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DesignSystem;
