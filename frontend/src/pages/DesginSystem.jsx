import { useState } from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Label from '../components/ui/Label';
import Select from '../components/ui/Select';
import Form from '../components/layouts/Form';
import Table from '../components/layouts/Table';
import { Logo } from '../components/ui/Logo';
import clsx from 'clsx';

// Iconos de Lucide React
import { 
  Palette, 
  Type, 
  LayoutGrid, 
  FileInput, 
  Table as TableIcon, 
  CreditCard, 
  Image
} from 'lucide-react';

// Importar constantes
import { designColors } from '../constants/designSystem';
import { roleOptions } from '../constants/roles';
import { tableData } from '../constants/mockData';

const DesignSystem = () => {
  const [activeTab, setActiveTab] = useState('botones');

  const tabs = [
    { id: 'botones', label: 'Botones', icon: Palette },
    { id: 'tipografias', label: 'Tipografías', icon: Type },
    { id: 'colores', label: 'Colores', icon: LayoutGrid },
    { id: 'formularios', label: 'Formularios', icon: FileInput },
    { id: 'tablas', label: 'Tablas', icon: TableIcon },
    { id: 'tarjetas', label: 'Tarjetas', icon: CreditCard },
    { id: 'logos', label: 'Logos', icon: Image }
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-heading mb-6">Sistema de Diseño EduExtra</h1>
      
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 mb-6">
        {tabs.map((tab) => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                'px-4 py-2 font-medium text-sm transition-colors flex items-center gap-2',
                activeTab === tab.id
                  ? 'text-blue-ribbon-600 border-b-2 border-blue-ribbon-500'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              <TabIcon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
      
      {/* Content */}
      <div className="space-y-8">
        {/* Botones */}
        {activeTab === 'botones' && (
          <section>
            <h2 className="text-2xl font-heading mb-4">Variantes de botones</h2>
            {["primary", "secondary", "warning", "danger"].map((variant) => (
              <div key={variant} className="space-y-2 mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Variante: {variant}</h3>
                <div className="space-x-4 mb-3">
                  <Button variant={variant} size="sm">{variant} sm</Button>
                  <Button variant={variant} size="md">{variant} md</Button>
                  <Button variant={variant} size="lg">{variant} lg</Button>
                  <Button variant={variant} size="md" ghost>{variant} ghost</Button>
                </div>
              </div>
            ))}
            
            <h3 className="text-lg font-medium text-gray-700 mt-6 mb-2">Botones con width 100%</h3>
            <div className="space-y-2 max-w-md">
              <Button variant="primary" fullWidth>Botón ancho completo</Button>
              <Button variant="secondary" ghost fullWidth>Botón ghost ancho completo</Button>
            </div>
          </section>
        )}
        
        {/* Tipografías */}
        {activeTab === 'tipografias' && (
          <section>
            <h2 className="text-2xl font-heading mb-4">Sistema de tipografías</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Font Sans (Inter)</h3>
                <p className="text-xs font-sans text-gray-600">Texto muy pequeño (xs)</p>
                <p className="text-sm font-sans text-gray-600">Texto pequeño (sm)</p>
                <p className="text-base font-sans text-gray-700">Texto base (base)</p>
                <p className="text-lg font-sans text-gray-800">Texto grande (lg)</p>
                <p className="text-xl font-sans text-gray-900">Texto extra grande (xl)</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Font Heading (Poppins)</h3>
                <p className="text-xl font-heading text-dark">Título h1 (xl)</p>
                <p className="text-2xl font-heading text-dark">Título h2 (2xl)</p>
                <p className="text-3xl font-heading text-dark">Título h3 (3xl)</p>
                <p className="text-4xl font-heading text-dark">Título h4 (4xl)</p>
              </div>
            </div>
          </section>
        )}
        
        {/* Colores */}
        {activeTab === 'colores' && (
          <section>
            <h2 className="text-2xl font-heading mb-4">Paleta de colores</h2>
            
            {Object.keys(designColors).map((colorName) => (
              <div key={colorName} className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-2">{colorName}</h3>
                <div className="flex flex-wrap gap-2">
                  {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => {
                    // Determinar el texto claro u oscuro basado en el shade
                    console.log(`Color: ${colorName}, Shade: ${shade}`);
                    const textColor = shade > 400 ? 'text-white' : 'text-gray-800';
                    const bgClass = `bg-${colorName}-${shade}`;
                    
                    return (
                      <div
                        key={`${colorName}-${shade}`}
                        className={clsx(
                          'w-20 h-20 rounded flex flex-col items-center justify-center',
                          bgClass,
                          textColor
                        )}
                      >
                        <span>{shade}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </section>
        )}
        
        {/* Formularios */}
        {activeTab === 'formularios' && (
          <section>
            <h2 className="text-2xl font-heading mb-4">Componentes de formulario</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Inputs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                <div>
                  <Label htmlFor="example1">Input estándar</Label>
                  <Input id="example1" placeholder="Texto de ejemplo" />
                </div>
                
                <div>
                  <Label htmlFor="example2" required>Input requerido</Label>
                  <Input id="example2" placeholder="Campo requerido" required />
                </div>
                
                <div>
                  <Label htmlFor="example3">Input con error</Label>
                  <Input id="example3" placeholder="Error" error="Este campo tiene un error" />
                </div>
                
                <div>
                  <Label htmlFor="example4">Input deshabilitado</Label>
                  <Input id="example4" placeholder="No puedes editar esto" disabled />
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Selects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                <div>
                  <Label htmlFor="select1">Select estándar</Label>
                  <Select id="select1" options={roleOptions} placeholder="Selecciona un rol" />
                </div>
                
                <div>
                  <Label htmlFor="select2" required>Select requerido</Label>
                  <Select id="select2" options={roleOptions} placeholder="Selecciona un rol" required />
                </div>
                
                <div>
                  <Label htmlFor="select3">Select con error</Label>
                  <Select id="select3" options={roleOptions} placeholder="Selecciona un rol" error="Este campo tiene un error" />
                </div>
                
                <div>
                  <Label htmlFor="select4">Select deshabilitado</Label>
                  <Select id="select4" options={roleOptions} placeholder="Selecciona un rol" disabled />
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Formulario de una columna</h3>
              <Card title="Formulario de ejemplo" subtitle="Una columna">
                <Form columns={1} submitText="Enviar" resetText="Cancelar">
                  <div className="mb-4">
                    <Label htmlFor="name1" required>Nombre</Label>
                    <Input id="name1" placeholder="Tu nombre" required />
                  </div>
                  
                  <div className="mb-4">
                    <Label htmlFor="email1" required>Email</Label>
                    <Input id="email1" type="email" placeholder="tu@email.com" required />
                  </div>
                  
                  <div className="mb-4">
                    <Label htmlFor="role1">Rol</Label>
                    <Select id="role1" options={roleOptions} placeholder="Selecciona un rol" />
                  </div>
                </Form>
              </Card>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">Formulario de dos columnas</h3>
              <Card title="Formulario de ejemplo" subtitle="Dos columnas">
                <Form columns={2} submitText="Enviar" resetText="Cancelar">
                  <div className="mb-4">
                    <Label htmlFor="name2" required>Nombre</Label>
                    <Input id="name2" placeholder="Tu nombre" required />
                  </div>
                  
                  <div className="mb-4">
                    <Label htmlFor="lastname2" required>Apellido</Label>
                    <Input id="lastname2" placeholder="Tu apellido" required />
                  </div>
                  
                  <div className="mb-4">
                    <Label htmlFor="email2" required>Email</Label>
                    <Input id="email2" type="email" placeholder="tu@email.com" required />
                  </div>
                  
                  <div className="mb-4">
                    <Label htmlFor="role2">Rol</Label>
                    <Select id="role2" options={roleOptions} placeholder="Selecciona un rol" />
                  </div>
                </Form>
              </Card>
            </div>
          </section>
        )}
        
        {/* Tablas */}
        {activeTab === 'tablas' && (
          <section>
            <h2 className="text-2xl font-heading mb-4">Tablas</h2>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Tabla Pequeña (sm)</h3>
              <Table size="sm" bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Tabla Media (md)</h3>
              <Table size="md" bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">Tabla Zebra</h3>
              <Table size="md" bordered zebra>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </section>
        )}
        
        {/* Tarjetas */}
        {activeTab === 'tarjetas' && (
          <section>
            <h2 className="text-2xl font-heading mb-4">Tarjetas</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card title="Tarjeta básica" subtitle="Con título y subtítulo">
                <p>Contenido de la tarjeta. Las tarjetas pueden contener texto, imágenes, botones y otros elementos.</p>
              </Card>
              
              <Card>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Tarjeta sin título</h3>
                  <p>Esta tarjeta no tiene un título o subtítulo definido directamente en el componente Card.</p>
                  <Button variant="primary">Acción</Button>
                </div>
              </Card>
              
              <Card 
                title="Tarjeta con footer"
                subtitle="Esta tarjeta tiene un pie de página"
                footer={
                  <div className="flex justify-end space-x-2">
                    <Button variant="secondary" ghost size="sm">Cancelar</Button>
                    <Button variant="primary" size="sm">Aceptar</Button>
                  </div>
                }
              >
                <p>Las tarjetas con footer son útiles para formularios y diálogos de confirmación.</p>
              </Card>
            </div>
          </section>
        )}
        
        {/* Logos */}
        {activeTab === 'logos' && (
          <section>
            <h2 className="text-2xl font-heading mb-4">Variantes del Logo</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card title="Logo claro">
                <div className="p-4 bg-blue-ribbon-500">
                  <Logo variant="light" />
                </div>
              </Card>
              
              <Card title="Logo oscuro">
                <div className="p-4 bg-white">
                  <Logo variant="dark" />
                </div>
              </Card>
              
              <Card title="Logo neutral">
                <div className="p-4 bg-gray-100">
                  <Logo variant="neutral" />
                </div>
              </Card>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default DesignSystem;
