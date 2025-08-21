import { useState } from 'react';
import { Calendar, Clock, MapPin, User, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const scheduleData = {
  '2024-03-18': [
    {
      id: 1,
      time: '08:00 - 09:30',
      subject: 'Electrical Safety Analysis',
      course: 'KM-01',
      instructor: 'Prof. Smith',
      location: 'Workshop A',
      type: 'lecture'
    },
    {
      id: 2,
      time: '10:00 - 11:30',
      subject: 'Circuit Analysis Lab',
      course: 'KM-03',
      instructor: 'Dr. Johnson',
      location: 'Lab 101',
      type: 'practical'
    },
    {
      id: 3,
      time: '14:00 - 15:30',
      subject: 'Motor Control Systems',
      course: 'KM-06',
      instructor: 'Eng. Davis',
      location: 'Workshop B',
      type: 'practical'
    }
  ],
  '2024-03-19': [
    {
      id: 4,
      time: '09:00 - 10:30',
      subject: 'Power Systems Theory',
      course: 'KM-07',
      instructor: 'Prof. Wilson',
      location: 'Lecture Hall 1',
      type: 'lecture'
    },
    {
      id: 5,
      time: '11:00 - 12:30',
      subject: 'Renewable Energy Workshop',
      course: 'KM-08',
      instructor: 'Dr. Brown',
      location: 'Green Lab',
      type: 'workshop'
    },
    {
      id: 6,
      time: '13:30 - 15:00',
      subject: 'Assessment: Circuit Analysis',
      course: 'KM-03',
      instructor: 'Dr. Johnson',
      location: 'Computer Lab',
      type: 'assessment'
    }
  ],
  '2024-03-20': [
    {
      id: 7,
      time: '08:30 - 10:00',
      subject: 'Electrical Materials Study',
      course: 'KM-02',
      instructor: 'Eng. Taylor',
      location: 'Materials Lab',
      type: 'practical'
    },
    {
      id: 8,
      time: '10:30 - 12:00',
      subject: 'Building Management Systems',
      course: 'KM-09',
      instructor: 'Prof. Anderson',
      location: 'Smart Building Lab',
      type: 'demonstration'
    },
    {
      id: 9,
      time: '14:00 - 16:00',
      subject: 'Portfolio Review Session',
      course: 'All',
      instructor: 'Academic Team',
      location: 'Conference Room',
      type: 'review'
    }
  ],
  '2024-03-21': [
    {
      id: 10,
      time: '09:00 - 10:30',
      subject: 'Safety Protocols Training',
      course: 'KM-01',
      instructor: 'Safety Officer',
      location: 'Training Center',
      type: 'training'
    },
    {
      id: 11,
      time: '11:00 - 12:30',
      subject: 'Electrical Calculations',
      course: 'KM-03',
      instructor: 'Prof. Smith',
      location: 'Classroom 2',
      type: 'lecture'
    }
  ],
  '2024-03-22': [
    {
      id: 12,
      time: '08:00 - 09:30',
      subject: 'Weekly Progress Review',
      course: 'All',
      instructor: 'Course Coordinator',
      location: 'Main Hall',
      type: 'review'
    },
    {
      id: 13,
      time: '10:00 - 12:00',
      subject: 'Industry Visit Preparation',
      course: 'KM-04',
      instructor: 'Career Counselor',
      location: 'Career Center',
      type: 'preparation'
    }
  ]
};

const typeConfig = {
  lecture: { label: 'Lecture', color: 'bg-blue-100 text-blue-700', icon: '📚' },
  practical: { label: 'Practical', color: 'bg-green-100 text-green-700', icon: '🔧' },
  workshop: { label: 'Workshop', color: 'bg-purple-100 text-purple-700', icon: '⚡' },
  assessment: { label: 'Assessment', color: 'bg-red-100 text-red-700', icon: '📝' },
  demonstration: { label: 'Demo', color: 'bg-yellow-100 text-yellow-700', icon: '👁️' },
  review: { label: 'Review', color: 'bg-gray-100 text-gray-700', icon: '🔍' },
  training: { label: 'Training', color: 'bg-orange-100 text-orange-700', icon: '🎯' },
  preparation: { label: 'Prep', color: 'bg-indigo-100 text-indigo-700', icon: '📋' }
};

export default function Schedule() {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [typeFilter, setTypeFilter] = useState('all');
  
  const getWeekDates = (weekOffset: number) => {
    const today = new Date('2024-03-18'); // Base Monday
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + (weekOffset * 7));
    
    const dates = [];
    for (let i = 0; i < 5; i++) { // Monday to Friday
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates(selectedWeek);
  
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getWeekRange = () => {
    const start = weekDates[0];
    const end = weekDates[4];
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  const filteredSchedule = (daySchedule: any[]) => {
    if (typeFilter === 'all') return daySchedule;
    return daySchedule.filter(item => item.type === typeFilter);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Class Schedule</h1>
            <p className="text-slate-600">View your weekly timetable and upcoming classes</p>
          </div>
          
          {/* Week Navigation */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedWeek(prev => prev - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="text-center">
              <div className="text-sm font-medium text-slate-900">{getWeekRange()}</div>
              <div className="text-xs text-slate-500">
                {selectedWeek === 0 ? 'Current Week' : 
                 selectedWeek > 0 ? `${selectedWeek} week${selectedWeek > 1 ? 's' : ''} ahead` :
                 `${Math.abs(selectedWeek)} week${Math.abs(selectedWeek) > 1 ? 's' : ''} ago`}
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedWeek(prev => prev + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-700">Filter by type:</span>
          </div>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {Object.entries(typeConfig).map(([key, config]) => (
                <SelectItem key={key} value={key}>
                  {config.icon} {config.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {weekDates.map((date, index) => {
          const dateKey = formatDate(date);
          const daySchedule = scheduleData[dateKey] || [];
          const filteredDaySchedule = filteredSchedule(daySchedule);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
          const isToday = dateKey === '2024-03-18'; // Mock "today"

          return (
            <Card key={dateKey} className={`${isToday ? 'ring-2 ring-[#0B1220]' : ''}`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">
                  <div className={`text-center ${isToday ? 'text-[#0B1220]' : 'text-slate-900'}`}>
                    <div className="font-semibold">{dayName}</div>
                    <div className="text-sm font-normal text-slate-500">
                      {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-0">
                {filteredDaySchedule.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm text-slate-500">No classes scheduled</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredDaySchedule.map((item) => {
                      const typeInfo = typeConfig[item.type as keyof typeof typeConfig];
                      
                      return (
                        <div
                          key={item.id}
                          className="p-3 rounded-lg border border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <Badge className={`text-xs ${typeInfo.color}`}>
                              {typeInfo.icon} {typeInfo.label}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {item.course}
                            </Badge>
                          </div>
                          
                          <h4 className="font-medium text-slate-900 text-sm mb-2 line-clamp-2">
                            {item.subject}
                          </h4>
                          
                          <div className="space-y-1 text-xs text-slate-500">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{item.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{item.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span>{item.instructor}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <Calendar className="h-8 w-8 text-[#0B1220] mx-auto mb-3" />
            <h3 className="font-medium text-slate-900 mb-1">Today's Classes</h3>
            <p className="text-2xl font-bold text-[#0B1220]">
              {scheduleData['2024-03-18']?.length || 0}
            </p>
            <p className="text-sm text-slate-500">scheduled sessions</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <Clock className="h-8 w-8 text-[#0B1220] mx-auto mb-3" />
            <h3 className="font-medium text-slate-900 mb-1">Next Class</h3>
            <p className="text-sm font-semibold text-[#0B1220]">08:00 Tomorrow</p>
            <p className="text-sm text-slate-500">Electrical Safety</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <User className="h-8 w-8 text-[#0B1220] mx-auto mb-3" />
            <h3 className="font-medium text-slate-900 mb-1">This Week</h3>
            <p className="text-2xl font-bold text-[#0B1220]">
              {Object.values(scheduleData).flat().length}
            </p>
            <p className="text-sm text-slate-500">total sessions</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}