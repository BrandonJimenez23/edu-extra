import Card  from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Plus, Calendar, Users, MapPin } from 'lucide-react';
import { mockActivities } from '../data/mockData';

export default function Activities() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Actividades Extracurriculares
          </h1>
          <p className="text-gray-600">
            Gestiona y organiza las actividades del programa
          </p>
        </div>
        <Button variant="primary">
          <Plus className="h-4 w-4 mr-2" />
          Nueva Actividad
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Actividades
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {mockActivities.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Participantes
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {mockActivities.reduce((total, activity) => total + activity.participants, 0)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full mr-4">
              <MapPin className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                Actividades Activas
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {mockActivities.filter(activity => activity.status === 'ACTIVE').length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Activities List */}
      <Card>
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Lista de Actividades
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {mockActivities.map((activity) => (
            <div key={activity.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-medium text-gray-900">
                      {activity.title}
                    </h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      activity.status === 'ACTIVE' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {activity.status === 'ACTIVE' ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">
                    {activity.description}
                  </p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(activity.startDate).toLocaleDateString('es-ES')} - {new Date(activity.endDate).toLocaleDateString('es-ES')}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {activity.participants} participantes
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      Coordinador: {activity.coordinator}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button variant="secondary" size="sm">
                    Editar
                  </Button>
                  <Button variant="outline" size="sm">
                    Ver Detalles
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
