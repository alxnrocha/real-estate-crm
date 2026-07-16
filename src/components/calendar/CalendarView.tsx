import React from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

const mockAppointments = [
  { id: 1, date: 12, title: 'Visita Villa Moderna', time: '10:00 AM', type: 'Viewing' },
  { id: 2, date: 15, title: 'Firma Contrato Ático', time: '02:30 PM', type: 'Meeting' },
  { id: 3, date: 20, title: 'Evaluación Casa Familiar', time: '11:00 AM', type: 'Appraisal' },
  { id: 4, date: 20, title: 'Llamada Cliente Nuevo', time: '04:00 PM', type: 'Call' },
];

export const CalendarView: React.FC = () => {
  const daysInMonth = Array.from({ length: 35 }, (_, i) => i + 1 - 4); 

  const getTypeVariant = (type: string) => {
    switch (type) {
      case 'Viewing': return 'info';
      case 'Meeting': return 'success';
      case 'Appraisal': return 'warning';
      case 'Call': return 'default';
      default: return 'default';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col xl:flex-row">
      <div className="flex-1 p-6 border-r border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Julio 2026</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 px-2"><ChevronLeft size={18} /></Button>
            <Button variant="outline" size="sm" className="h-8">Hoy</Button>
            <Button variant="outline" size="sm" className="h-8 px-2"><ChevronRight size={18} /></Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
            <div key={day} className="bg-gray-50 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              {day}
            </div>
          ))}
          
          {daysInMonth.map((day, idx) => {
            const isCurrentMonth = day > 0 && day <= 31;
            const appointmentsForDay = mockAppointments.filter(app => app.date === day);
            const isToday = day === 15;

            return (
              <div 
                key={idx} 
                className={`bg-white min-h-[100px] p-2 transition-colors hover:bg-gray-50 
                  ${!isCurrentMonth ? 'bg-gray-50/50 text-gray-400' : 'text-gray-900'}
                  ${isToday ? 'bg-indigo-50/30' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full
                    ${isToday ? 'bg-indigo-600 text-white' : ''}`}>
                    {day > 0 ? (day > 31 ? day - 31 : day) : 30 + day}
                  </span>
                  {appointmentsForDay.length > 0 && (
                    <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full font-medium">
                      {appointmentsForDay.length}
                    </span>
                  )}
                </div>
                
                <div className="mt-2 flex flex-col gap-1">
                  {appointmentsForDay.map(app => (
                    <div key={app.id} className="text-xs truncate px-1.5 py-1 bg-indigo-50 text-indigo-700 rounded border border-indigo-100 font-medium">
                      {app.time} - {app.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full xl:w-96 p-6 bg-gray-50 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Próximas Citas</h3>
        <div className="flex flex-col gap-3 flex-1">
          {mockAppointments.map(app => (
            <div key={app.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-indigo-200 transition-colors cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <Badge variant={getTypeVariant(app.type)}>{app.type}</Badge>
                <span className="text-xs font-medium text-gray-500">{app.date} Jul</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">{app.title}</h4>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1.5"><Clock size={14} /> {app.time}</span>
                <span className="flex items-center gap-1.5"><MapPin size={14} /> Presencial</span>
              </div>
            </div>
          ))}
        </div>
        <Button variant="primary" className="mt-4 w-full">Agendar Nueva Cita</Button>
      </div>
    </div>
  );
};
