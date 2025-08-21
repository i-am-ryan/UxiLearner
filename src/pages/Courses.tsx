import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, BookOpen, Clock, Users, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const courses = [
  {
    id: 'KM-04',
    title: 'The Electricians world of work',
    description: 'Introduction to the world of work and the electrician trade',
    level: 'NQF Level 4',
    duration: '6 hours',
    students: '24',
    rating: 4.8,
    image: '/lovable-uploads/anton-dmitriev-kBKOaghy8mU-unsplash.jpg',
    category: 'Electrical',
    status: 'Active'
  },
  {
    id: 'KM-01',
    title: 'Safety, Health, and Environmental',
    description: 'Safety, health, environment, risk and quality assurance in the workplace',
    level: 'NQF Level 4',
    duration: '8 hours',
    students: '28',
    rating: 4.9,
    image: '/lovable-uploads/nareeta-martin-ajz8X6Wtfmo-unsplash.jpg',
    category: 'Safety',
    status: 'Active'
  },
  {
    id: 'KM-03',
    title: 'Fundamentals of Electricity',
    description: 'Basic electrical theory and fundamentals',
    level: 'NQF Level 4',
    duration: '12 hours',
    students: '26',
    rating: 4.7,
    image: '/lovable-uploads/deon-fosu-j1SJaphyi5I-unsplash.jpg',
    category: 'Electrical',
    status: 'Active'
  },
  {
    id: 'KM-02',
    title: 'Electrical Installation Materials',
    description: 'Understanding electrical materials and components',
    level: 'NQF Level 4',
    duration: '10 hours',
    students: '22',
    rating: 4.6,
    image: '/lovable-uploads/simone-impei-eZaKj3xAzTE-unsplash.jpg',
    category: 'Materials',
    status: 'Active'
  },
  {
    id: 'KM-05',
    title: 'Electrical Circuit Analysis',
    description: 'Advanced circuit analysis and troubleshooting',
    level: 'NQF Level 4',
    duration: '14 hours',
    students: '20',
    rating: 4.8,
    image: '/lovable-uploads/jarvik-joshi-yjgE1xjyv60-unsplash.jpg',
    category: 'Electrical',
    status: 'Active'
  },
  {
    id: 'KM-06',
    title: 'Motor Control Systems',
    description: 'Industrial motor control and automation',
    level: 'NQF Level 4',
    duration: '16 hours',
    students: '18',
    rating: 4.9,
    image: '/lovable-uploads/md-shamin-XJJ5oAZmnlI-unsplash.jpg',
    category: 'Industrial',
    status: 'Active'
  },
  {
    id: 'KM-07',
    title: 'Power Systems and Distribution',
    description: 'Electrical power generation and distribution systems',
    level: 'NQF Level 4',
    duration: '18 hours',
    students: '16',
    rating: 4.7,
    image: '/lovable-uploads/michael-pointner-fP5LU1iD5p4-unsplash.jpg',
    category: 'Power',
    status: 'Active'
  },
  {
    id: 'KM-08',
    title: 'Renewable Energy Systems',
    description: 'Solar, wind and renewable energy technologies',
    level: 'NQF Level 4',
    duration: '12 hours',
    students: '25',
    rating: 4.8,
    image: '/lovable-uploads/bill-mead-wmaP3Tl80ww-unsplash.jpg',
    category: 'Renewable',
    status: 'New'
  },
  {
    id: 'KM-09',
    title: 'Building Management Systems',
    description: 'Smart building automation and control',
    level: 'NQF Level 4',
    duration: '10 hours',
    students: '19',
    rating: 4.6,
    image: '/lovable-uploads/danist-soh-8Gg2Ne_uTcM-unsplash.jpg',
    category: 'Automation',
    status: 'Active'
  }
];

const categories = ['All', 'Electrical', 'Safety', 'Materials', 'Industrial', 'Power', 'Renewable', 'Automation'];

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('title');

  const filteredCourses = courses
    .filter(course => 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(course => selectedCategory === 'All' || course.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'students':
          return parseInt(b.students) - parseInt(a.students);
        case 'duration':
          return parseInt(b.duration) - parseInt(a.duration);
        default:
          return a.title.localeCompare(b.title);
      }
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Course Modules</h1>
        <p className="text-slate-600">Explore our comprehensive electrical engineering curriculum</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search modules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-[#0B1220] hover:bg-[#0B1220]/90" : ""}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="students">Students</SelectItem>
              <SelectItem value="duration">Duration</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <Link key={course.id} to={`/courses/${course.id}`}>
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="relative">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge 
                    variant={course.status === 'New' ? 'default' : 'secondary'}
                    className={course.status === 'New' ? 'bg-[#0B1220] hover:bg-[#0B1220]/90' : ''}
                  >
                    {course.id}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
                    {course.status}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-lg group-hover:text-[#0B1220] transition-colors">
                  {course.title}
                </CardTitle>
                <p className="text-sm text-slate-600 line-clamp-2">
                  {course.description}
                </p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-slate-500 mb-3">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{course.level}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students} students</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No courses found</h3>
          <p className="text-slate-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}