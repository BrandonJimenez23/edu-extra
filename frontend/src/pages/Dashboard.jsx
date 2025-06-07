import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Switch } from '../components/ui';
import { BarChart3, Users, ClipboardList, TrendingUp, Database, TestTube, UserPlus } from 'lucide-react';
import { mockStats } from '../data/mockData';
import { useDataMode } from '../hooks/useDataMode';
import useUsersEnhanced from '../hooks/useUsersEnhanced';

export default function Dashboard() {
  const navigate = useNavigate();
  const { useMockData, toggleDataMode, currentMode } = useDataMode();
  const { getUserStats, fetchUsers } = useUsersEnhanced();
  const [realStats, setRealStats] = useState(null);

  // Load real statistics when not using mock data
  useEffect(() => {
    const loadRealStats = async () => {
      if (!useMockData) {
        try {
          await fetchUsers();
          const stats = getUserStats();
          setRealStats(stats);
        } catch (error) {
          console.error('Failed to load user statistics:', error);
        }
      }
    };

    loadRealStats();
  }, [useMockData, fetchUsers, getUserStats]);

  // Use appropriate data source
  const currentStats = useMockData ? {
    totalUsers: mockStats.totalUsers,
    activeUsers: mockStats.activeUsers,
    totalActivities: mockStats.totalActivities,
    monthlyGrowth: mockStats.monthlyGrowth
  } : {
    totalUsers: realStats?.total || 0,
    activeUsers: realStats?.active || 0,
    totalActivities: 0, // This would come from activities API
    monthlyGrowth: 0 // This would be calculated from real data
  };

  const stats = [
    {
      title: 'Total Usuarios',
      value: currentStats.totalUsers,
      icon: Users,
      change: '+12%',
      positive: true
    },
    {
      title: 'Usuarios Activos',
      value: currentStats.activeUsers,
      icon: TrendingUp,
      change: '+8%',
      positive: true
    },
    {
      title: 'Total Actividades',
      value: currentStats.totalActivities,
      icon: ClipboardList,
      change: '+5%',
      positive: true
    },
    {
      title: 'Crecimiento Mensual',
      value: `${currentStats.monthlyGrowth}%`,
      icon: BarChart3,
      change: '+2.1%',
      positive: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Data Mode Toggle */}
      <div className="flex justify-between items-start">
        <div className="bg-gradient-to-r from-blue-ribbon-500 to-blue-ribbon-600 rounded-lg p-6 text-white flex-1 mr-6">
          <h1 className="text-2xl font-heading font-bold mb-2">
            Bienvenido a EduExtra
          </h1>
          <p className="text-blue-ribbon-100">
            Gestiona actividades extracurriculares de manera efectiva
          </p>
        </div>

        {/* Data Mode Toggle */}
        <div className="flex items-center gap-3 p-3 bg-white rounded-lg border shadow-sm">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">API</span>
          </div>
          
          <Switch
            checked={useMockData}
            onCheckedChange={toggleDataMode}
            label=""
          />
          
          <div className="flex items-center gap-2">
            <TestTube className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Mock</span>
          </div>
        </div>
      </div>

      {/* Current Mode Indicator */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-2">
          {useMockData ? (
            <TestTube className="h-5 w-5 text-purple-600" />
          ) : (
            <Database className="h-5 w-5 text-blue-600" />
          )}
          <span className="font-medium text-gray-700">
            Dashboard usando datos: <span className="font-bold">{currentMode.toUpperCase()}</span>
          </span>
          {useMockData && (
            <span className="text-sm text-gray-600">
              (Modo desarrollo - datos simulados)
            </span>
          )}
        </div>
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
          {/* Quick Actions */}
          <div className="space-y-3">
            <Button 
              variant="primary" 
              className="w-full justify-start"
              onClick={() => navigate('/users/create')}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Crear Nuevo Usuario
            </Button>
            <Button 
              variant="secondary" 
              className="w-full justify-start"
              onClick={() => navigate('/users')}
            >
              <Users className="h-4 w-4 mr-2" />
              Ver Usuarios
            </Button>
            <Button variant="outline" className="w-full justify-start">
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
