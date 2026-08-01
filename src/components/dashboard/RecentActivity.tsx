import React from 'react';
import { ShieldCheck, UserPlus, Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

const activities = [
  {
    id: 1,
    type: 'add',
    title: 'Nueva propiedad agregada',
    desc: 'Villa Moderna con Piscina',
    time: 'Hace 2 horas',
    icon: ShieldCheck,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10'
  },
  {
    id: 2,
    type: 'user',
    title: 'Cliente registrado',
    desc: 'Juan Pérez',
    time: 'Hace 4 horas',
    icon: UserPlus,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10'
  },
  {
    id: 3,
    type: 'meeting',
    title: 'Cita programada',
    desc: 'Visita a Ático en Passeig de Gràcia',
    time: 'Hace 6 horas',
    icon: CalendarIcon,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10'
  },
  {
    id: 4,
    type: 'success',
    title: 'Propiedad vendida',
    desc: 'Casa familiar tranquila',
    time: 'Hace 1 día',
    icon: CheckCircle2,
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10'
  }
];

export const RecentActivity: React.FC = () => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b-0 pb-2">
        <CardTitle className="text-base font-semibold">Actividad Reciente</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-6 pt-2">
        {activities.map((act) => (
          <div key={act.id} className="flex gap-4">
            <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${act.bg} ${act.color}`}>
              <act.icon size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold dark:text-gray-100 text-gray-900">{act.title}</span>
              <span className="text-xs dark:text-gray-400 text-gray-500 mt-0.5">{act.desc}</span>
              <span className="text-xs dark:text-gray-500 text-gray-400 mt-1">{act.time}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
