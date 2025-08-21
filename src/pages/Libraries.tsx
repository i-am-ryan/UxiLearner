import { useState } from 'react';
import { Search, Book, Download, Eye, Filter, Star, Clock, FileText, Video, Headphones } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const libraryResources = [
  {
    id: 1,
    title: 'Electrical Installation Handbook',
    author: 'John Smith & Associates',
    type: 'book',
    format: 'PDF',
    size: '15.2 MB',
    course: 'KM-02',
    description: 'Comprehensive guide to electrical installation practices and safety standards.',
    rating: 4.8,
    downloads: 1247,
    addedDate: '2024-01-15',
    thumbnail: '/lovable-uploads/anton-dmitriev-kBKOaghy8mU-unsplash.jpg',
    tags: ['Installation', 'Safety', 'Standards']
  },
  {
    id: 2,
    title: 'Circuit Analysis Fundamentals',
    author: 'Dr. Emily Johnson',
    type: 'book',
    format: 'PDF',
    size: '23.7 MB',
    course: 'KM-03',
    description: 'In-depth coverage of AC and DC circuit analysis with practical examples.',
    rating: 4.9,
    downloads: 2156,
    addedDate: '2024-02-01',
    thumbnail: '/lovable-uploads/jarvik-joshi-yjgE1xjyv60-unsplash.jpg',
    tags: ['Circuits', 'Analysis', 'Theory']
  },
  {
    id: 3,
    title: 'Motor Control Systems Explained',
    author: 'Engineering Dynamics',
    type: 'video',
    format: 'MP4',
    size: '1.2 GB',
    course: 'KM-06',
    description: 'Video series covering industrial motor control systems and automation.',
    rating: 4.7,
    downloads: 856,
    addedDate: '2024-02-15',
    thumbnail: '/lovable-uploads/md-shamin-XJJ5oAZmnlI-unsplash.jpg',
    tags: ['Motors', 'Control', 'Automation']
  },
  {
    id: 4,
    title: 'Safety Protocols Audio Guide',
    author: 'Safety First Training',
    type: 'audio',
    format: 'MP3',
    size: '125 MB',
    course: 'KM-01',
    description: 'Audio course covering workplace safety and electrical safety protocols.',
    rating: 4.5,
    downloads: 432,
    addedDate: '2024-03-01',
    thumbnail: '/lovable-uploads/nareeta-martin-ajz8X6Wtfmo-unsplash.jpg',
    tags: ['Safety', 'Training', 'Audio']
  },
  {
    id: 5,
    title: 'Power Systems Engineering',
    author: 'Prof. Michael Wilson',
    type: 'book',
    format: 'PDF',
    size: '45.8 MB',
    course: 'KM-07',
    description: 'Advanced textbook on power generation, transmission, and distribution systems.',
    rating: 4.8,
    downloads: 1789,
    addedDate: '2024-01-20',
    thumbnail: '/lovable-uploads/deon-fosu-j1SJaphyi5I-unsplash.jpg',
    tags: ['Power', 'Systems', 'Engineering']
  },
  {
    id: 6,
    title: 'Renewable Energy Technologies',
    author: 'Green Energy Institute',
    type: 'document',
    format: 'DOCX',
    size: '8.4 MB',
    course: 'KM-08',
    description: 'Research papers and case studies on renewable energy implementations.',
    rating: 4.6,
    downloads: 967,
    addedDate: '2024-02-28',
    thumbnail: '/lovable-uploads/bill-mead-wmaP3Tl80ww-unsplash.jpg',
    tags: ['Renewable', 'Energy', 'Research']
  },
  {
    id: 7,
    title: 'Building Automation Systems',
    author: 'Smart Building Solutions',
    type: 'video',
    format: 'MP4',
    size: '890 MB',
    course: 'KM-09',
    description: 'Interactive video course on modern building management and automation.',
    rating: 4.7,
    downloads: 623,
    addedDate: '2024-03-10',
    thumbnail: '/lovable-uploads/ptti-edu-k9Dc5zT1Gq0-unsplash.jpg',
    tags: ['Automation', 'Buildings', 'Smart Systems']
  },
  {
    id: 8,
    title: 'Electrical Code Standards 2024',
    author: 'Standards Authority',
    type: 'document',
    format: 'PDF',
    size: '67.3 MB',
    course: 'All',
    description: 'Updated electrical code standards and regulations for 2024.',
    rating: 4.9,
    downloads: 3421,
    addedDate: '2024-01-01',
    thumbnail: '/lovable-uploads/septian-setiawan-iaeCoxlkwS0-unsplash.jpg',
    tags: ['Standards', 'Code', 'Regulations']
  }
];

const typeConfig = {
  book: { label: 'E-Book', icon: Book, color: 'bg-blue-100 text-blue-700' },
  video: { label: 'Video', icon: Video, color: 'bg-purple-100 text-purple-700' },
  audio: { label: 'Audio', icon: Headphones, color: 'bg-green-100 text-green-700' },
  document: { label: 'Document', icon: FileText, color: 'bg-orange-100 text-orange-700' }
};

export default function Libraries() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [selectedResource, setSelectedResource] = useState<number | null>(null);

  const filteredResources = libraryResources
    .filter(resource => 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(resource => typeFilter === 'all' || resource.type === typeFilter)
    .filter(resource => courseFilter === 'all' || resource.course === courseFilter || resource.course === 'All')
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.downloads - a.downloads;
        case 'rating':
          return b.rating - a.rating;
        case 'title':
          return a.title.localeCompare(b.title);
        default: // latest
          return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
      }
    });

  const handlePreview = (resourceId: number) => {
    setSelectedResource(resourceId);
  };

  const handleDownload = (resource: any) => {
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${resource.title}.${resource.format.toLowerCase()}`;
    link.click();
  };

  const courses = ['All', 'KM-01', 'KM-02', 'KM-03', 'KM-06', 'KM-07', 'KM-08', 'KM-09'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Digital Library</h1>
        <p className="text-slate-600">Access educational resources, e-books, videos, and documentation</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Resource Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="book">E-Books</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
              <SelectItem value="document">Documents</SelectItem>
            </SelectContent>
          </Select>

          <Select value={courseFilter} onValueChange={setCourseFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map(course => (
                <SelectItem key={course} value={course === 'All' ? 'all' : course}>
                  {course === 'All' ? 'All Courses' : course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="popular">Most Downloaded</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="title">Title A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resource List */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredResources.map(resource => {
              const typeInfo = typeConfig[resource.type as keyof typeof typeConfig];
              const TypeIcon = typeInfo.icon;

              return (
                <Card 
                  key={resource.id}
                  className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                    selectedResource === resource.id ? 'ring-2 ring-[#0B1220]' : ''
                  }`}
                  onClick={() => handlePreview(resource.id)}
                >
                  <div className="relative">
                    <img 
                      src={resource.thumbnail} 
                      alt={resource.title}
                      className="w-full h-32 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className={`text-xs ${typeInfo.color}`}>
                        <TypeIcon className="h-3 w-3 mr-1" />
                        {typeInfo.label}
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge variant="outline" className="bg-white/90 backdrop-blur-sm text-xs">
                        {resource.course}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-semibold text-slate-900 mb-1 line-clamp-2 group-hover:text-[#0B1220] transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-2">{resource.author}</p>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">{resource.description}</p>

                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{resource.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        <span>{resource.downloads}</span>
                      </div>
                    </div>

                    <div className="flex gap-1 mb-3">
                      {resource.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePreview(resource.id);
                        }}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Preview
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1 text-xs bg-[#0B1220] hover:bg-[#0B1220]/90 text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(resource);
                        }}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Resource Detail */}
        <div className="lg:col-span-1">
          {selectedResource ? (
            <div className="sticky top-6">
              {(() => {
                const resource = libraryResources.find(r => r.id === selectedResource)!;
                const typeInfo = typeConfig[resource.type as keyof typeof typeConfig];
                const TypeIcon = typeInfo.icon;

                return (
                  <Card>
                    <div className="relative">
                      <img 
                        src={resource.thumbnail} 
                        alt={resource.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-lg" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <Badge className={`mb-2 ${typeInfo.color}`}>
                          <TypeIcon className="h-3 w-3 mr-1" />
                          {typeInfo.label}
                        </Badge>
                        <h3 className="text-lg font-bold">{resource.title}</h3>
                        <p className="text-sm text-white/90">{resource.author}</p>
                      </div>
                    </div>

                    <CardContent className="p-6 space-y-4">
                      <div>
                        <h4 className="font-medium text-slate-900 mb-2">Description</h4>
                        <p className="text-sm text-slate-600">{resource.description}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-slate-900 mb-2">Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Course:</span>
                            <Badge variant="outline" className="text-xs">{resource.course}</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Format:</span>
                            <span className="text-slate-900">{resource.format}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Size:</span>
                            <span className="text-slate-900">{resource.size}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Rating:</span>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-slate-900">{resource.rating}</span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Downloads:</span>
                            <span className="text-slate-900">{resource.downloads}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Added:</span>
                            <span className="text-slate-900">
                              {new Date(resource.addedDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-slate-900 mb-2">Tags</h4>
                        <div className="flex flex-wrap gap-1">
                          {resource.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 space-y-2">
                        <Button 
                          className="w-full bg-[#0B1220] hover:bg-[#0B1220]/90 text-white"
                          onClick={() => handleDownload(resource)}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download Resource
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Star className="mr-2 h-4 w-4" />
                          Add to Favorites
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })()}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <Book className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">Select a resource to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <Book className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No resources found</h3>
          <p className="text-slate-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}