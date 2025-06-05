import Card from '../components/ui/Card';
import Button  from '../components/ui/Button';
import { BarChart3, Users, ClipboardList, TrendingUp } from 'lucide-react';
import { mockStats } from '../data/mockData';

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Usuarios',
      value: mockStats.totalUsers,
      icon: Users,
      change: '+12%',
      positive: true
    },
    {
      title: 'Usuarios Activos',
      value: mockStats.activeUsers,
      icon: TrendingUp,
      change: '+8%',
      positive: true
    },
    {
      title: 'Total Actividades',
      value: mockStats.totalActivities,
      icon: ClipboardList,
      change: '+5%',
      positive: true
    },
    {
      title: 'Crecimiento Mensual',
      value: `${mockStats.monthlyGrowth}%`,
      icon: BarChart3,
      change: '+2.1%',
      positive: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-ribbon-500 to-blue-ribbon-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-heading font-bold mb-2">
          Bienvenido a EduExtra
        </h1>
        <p className="text-blue-ribbon-100">
          Gestiona actividades extracurriculares de manera efectiva
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-heading font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className={`text-sm ${stat.positive ? 'text-emerald-600' : 'text-coral-red-600'}`}>
                    {stat.change} desde el mes pasado
                  </p>
                </div>
                <div className="p-3 bg-blue-ribbon-100 rounded-full">
                  <IconComponent className="h-6 w-6 text-blue-ribbon-600" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-heading font-semibold text-gray-900 mb-4">
            Acciones Rápidas
          </h3>
          <div className="space-y-3">
            <Button variant="primary" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Crear Nuevo Usuario
            </Button>
            <Button variant="secondary" className="w-full justify-start">
              <ClipboardList className="h-4 w-4 mr-2" />
              Nueva Actividad
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BarChart3 className="h-4 w-4 mr-2" />
              Ver Reportes
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-heading font-semibold text-gray-900 mb-4">
            Actividades Recientes
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 font-heading">Taller de Matemáticas</p>
                <p className="text-sm text-gray-600">25 participantes</p>
              </div>
              <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">
                Activo
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 font-heading">Club de Lectura</p>
                <p className="text-sm text-gray-600">18 participantes</p>
              </div>
              <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">
                Activo
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
