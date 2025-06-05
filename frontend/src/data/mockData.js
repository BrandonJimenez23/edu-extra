// Datos de ejemplo para desarrollo y testing
export const mockUsers = [
  {
    id: 1,
    fullName: 'Juan Pérez',
    email: 'juan@eduextra.com',
    role: 'STUDENT',
    isActive: true,
    avatarUrl: 'https://unavatar.io/juan',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    fullName: 'María García',
    email: 'maria@eduextra.com',
    role: 'MONITOR',
    isActive: true,
    avatarUrl: 'https://unavatar.io/maria',
    createdAt: '2024-01-10'
  },
  {
    id: 3,
    fullName: 'Carlos López',
    email: 'carlos@eduextra.com',
    role: 'COORDINATOR',
    isActive: false,
    avatarUrl: 'https://unavatar.io/carlos',
    createdAt: '2024-01-05'
  },
  {
    id: 4,
    fullName: 'Lucía Gómez',
    email: 'lucia.gomez@eduextra.com',
    role: 'COORDINATOR',
    isActive: true,
    avatarUrl: 'https://unavatar.io/lucia',
    createdAt: '2024-01-12'
  },
  {
    id: 5,
    fullName: 'Marco Salas',
    email: 'marco.salas@eduextra.com',
    role: 'ADMIN',
    isActive: true,
    avatarUrl: 'https://unavatar.io/marco',
    createdAt: '2024-01-08'
  }
];

export const mockActivities = [
  {
    id: 1,
    title: 'Taller de Matemáticas',
    description: 'Refuerzo escolar en matemáticas para estudiantes de primaria',
    startDate: '2024-02-01',
    endDate: '2024-02-28',
    status: 'ACTIVE',
    participants: 25,
    coordinator: 'María García'
  },
  {
    id: 2,
    title: 'Club de Lectura',
    description: 'Actividad de promoción de lectura para niños y jóvenes',
    startDate: '2024-01-15',
    endDate: '2024-03-15',
    status: 'ACTIVE',
    participants: 18,
    coordinator: 'Carlos López'
  }
];

export const mockStats = {
  totalUsers: 124,
  activeUsers: 98,
  totalActivities: 12,
  activeActivities: 8,
  monthlyGrowth: 15.2
};
