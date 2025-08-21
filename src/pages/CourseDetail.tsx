import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, FileText, Download, Clock, CheckCircle, Circle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const courseData = {
  'KM-04': {
    title: 'The Electricians world of work',
    subtitle: 'KT0101: The Electricians world of work',
    description: 'Introduction to the world of work and the electrician trade',
    fullDescription: 'This comprehensive module provides students with a thorough understanding of the electrical trade, covering fundamental concepts, safety protocols, and practical applications. Students will gain insights into career opportunities, professional responsibilities, and industry standards.',
    image: '/lovable-uploads/anton-dmitriev-kBKOaghy8mU-unsplash.jpg',
    progress: 20,
    completedTopics: 1,
    totalTopics: 5,
    topics: [
      { id: 'KT0101', title: 'The Electricians world of work', completed: true },
      { id: 'KT0102', title: 'Career opportunities of qualified Electricians', completed: false },
      { id: 'KT0103', title: 'The Electrician\'s responsibilities and duties', completed: false },
      { id: 'KT0104', title: 'Legislation relating to apprentices in the Electrical trade', completed: false },
      { id: 'KT0105', title: 'Trade test requirements', completed: false },
    ],
    learningObjectives: [
      'Understand the role and responsibilities of an electrician',
      'Identify career pathways and opportunities in the electrical trade',
      'Learn about legislation and regulations affecting apprentices',
      'Prepare for trade test requirements and assessments'
    ]
  },
  'KM-01': {
    title: 'Safety, Health, and Environmental',
    subtitle: 'KT0201: Safety, Health, and Environmental',
    description: 'Safety, health, environment, risk and quality assurance in the workplace',
    fullDescription: 'This critical module focuses on workplace safety, health protocols, and environmental considerations essential for electrical work. Students will learn comprehensive risk assessment, quality assurance procedures, and emergency response protocols to ensure safe working practices.',
    image: '/lovable-uploads/nareeta-martin-ajz8X6Wtfmo-unsplash.jpg',
    progress: 0,
    completedTopics: 0,
    totalTopics: 6,
    topics: [
      { id: 'KT0201', title: 'Workplace safety fundamentals', completed: false },
      { id: 'KT0202', title: 'Health hazards in electrical work', completed: false },
      { id: 'KT0203', title: 'Environmental considerations', completed: false },
      { id: 'KT0204', title: 'Risk assessment and management', completed: false },
      { id: 'KT0205', title: 'Quality assurance procedures', completed: false },
      { id: 'KT0206', title: 'Emergency response protocols', completed: false },
    ],
    learningObjectives: [
      'Identify and mitigate workplace safety hazards',
      'Understand health risks associated with electrical work',
      'Apply environmental protection principles',
      'Conduct comprehensive risk assessments',
      'Implement quality assurance procedures',
      'Execute emergency response protocols effectively'
    ]
  },
  'KM-03': {
    title: 'Fundamentals of Electricity',
    subtitle: 'KT0301: Fundamentals of Electricity',
    description: 'Basic electrical theory and fundamentals',
    fullDescription: 'This foundational module covers essential electrical theory, from basic concepts to complex circuit analysis. Students will master Ohm\'s Law, understand AC/DC systems, and develop skills in electrical calculations and measurement techniques crucial for all electrical work.',
    image: '/lovable-uploads/deon-fosu-j1SJaphyi5I-unsplash.jpg',
    progress: 0,
    completedTopics: 0,
    totalTopics: 7,
    topics: [
      { id: 'KT0301', title: 'Electrical fundamentals and basic concepts', completed: false },
      { id: 'KT0302', title: 'Ohm\'s Law and electrical calculations', completed: false },
      { id: 'KT0303', title: 'AC and DC electrical systems', completed: false },
      { id: 'KT0304', title: 'Electrical power and energy', completed: false },
      { id: 'KT0305', title: 'Magnetism and electromagnetism', completed: false },
      { id: 'KT0306', title: 'Electrical measuring instruments', completed: false },
      { id: 'KT0307', title: 'Basic electrical circuit analysis', completed: false },
    ],
    learningObjectives: [
      'Master fundamental electrical concepts and terminology',
      'Apply Ohm\'s Law and perform electrical calculations',
      'Differentiate between AC and DC electrical systems',
      'Calculate electrical power and energy consumption',
      'Understand magnetism and electromagnetic principles',
      'Use electrical measuring instruments accurately',
      'Analyze basic electrical circuits effectively'
    ]
  },
  'KM-02': {
    title: 'Electrical Installation Materials',
    subtitle: 'KT0401: Electrical Installation Materials',
    description: 'Understanding electrical materials and components',
    fullDescription: 'This practical module introduces students to the wide range of electrical materials, components, and tools used in installations. Students will learn material specifications, selection criteria, and proper application of cables, accessories, and protection devices.',
    image: '/lovable-uploads/simone-impei-eZaKj3xAzTE-unsplash.jpg',
    progress: 0,
    completedTopics: 0,
    totalTopics: 6,
    topics: [
      { id: 'KT0401', title: 'Electrical cables and conductors', completed: false },
      { id: 'KT0402', title: 'Electrical accessories and fittings', completed: false },
      { id: 'KT0403', title: 'Switching and control devices', completed: false },
      { id: 'KT0404', title: 'Protection devices and components', completed: false },
      { id: 'KT0405', title: 'Installation tools and equipment', completed: false },
      { id: 'KT0406', title: 'Material selection and specifications', completed: false },
    ],
    learningObjectives: [
      'Identify various types of electrical cables and conductors',
      'Select appropriate electrical accessories and fittings',
      'Understand switching and control device applications',
      'Choose correct protection devices for installations',
      'Use installation tools and equipment safely',
      'Make informed material selection decisions'
    ]
  },
  'KM-05': {
    title: 'Electrical Circuit Analysis',
    subtitle: 'KT0501: Electrical Circuit Analysis',
    description: 'Advanced circuit analysis and troubleshooting',
    fullDescription: 'This advanced module develops students\' analytical skills for complex electrical circuits. Covering series/parallel configurations, three-phase systems, and comprehensive troubleshooting techniques, students will master circuit analysis and fault-finding methodologies.',
    image: '/lovable-uploads/jarvik-joshi-yjgE1xjyv60-unsplash.jpg',
    progress: 0,
    completedTopics: 0,
    totalTopics: 8,
    topics: [
      { id: 'KT0501', title: 'Series and parallel circuits', completed: false },
      { id: 'KT0502', title: 'Complex circuit analysis techniques', completed: false },
      { id: 'KT0503', title: 'Three-phase electrical systems', completed: false },
      { id: 'KT0504', title: 'Circuit protection and safety devices', completed: false },
      { id: 'KT0505', title: 'Fault finding and troubleshooting', completed: false },
      { id: 'KT0506', title: 'Circuit testing and verification', completed: false },
      { id: 'KT0507', title: 'Load calculations and balancing', completed: false },
      { id: 'KT0508', title: 'Power factor correction', completed: false },
    ],
    learningObjectives: [
      'Analyze series and parallel circuit configurations',
      'Apply advanced circuit analysis techniques',
      'Understand three-phase electrical system principles',
      'Select appropriate circuit protection devices',
      'Develop systematic fault-finding approaches',
      'Perform accurate circuit testing and verification',
      'Calculate and balance electrical loads',
      'Implement power factor correction solutions'
    ]
  },
  'KM-06': {
    title: 'Motor Control Systems',
    subtitle: 'KT0601: Motor Control Systems',
    description: 'Industrial motor control and automation',
    fullDescription: 'This specialized module focuses on industrial motor control systems and automation technologies. Students will learn motor characteristics, control methods, protection systems, and modern automation techniques including variable frequency drives and programmable logic controllers.',
    image: '/lovable-uploads/md-shamin-XJJ5oAZmnlI-unsplash.jpg',
    progress: 0,
    completedTopics: 0,
    totalTopics: 7,
    topics: [
      { id: 'KT0601', title: 'Motor types and characteristics', completed: false },
      { id: 'KT0602', title: 'Motor starting methods', completed: false },
      { id: 'KT0603', title: 'Motor control circuits', completed: false },
      { id: 'KT0604', title: 'Variable frequency drives (VFDs)', completed: false },
      { id: 'KT0605', title: 'Motor protection systems', completed: false },
      { id: 'KT0606', title: 'Industrial automation basics', completed: false },
      { id: 'KT0607', title: 'Motor maintenance and troubleshooting', completed: false },
    ],
    learningObjectives: [
      'Identify different motor types and their characteristics',
      'Select appropriate motor starting methods',
      'Design and implement motor control circuits',
      'Configure and operate variable frequency drives',
      'Install comprehensive motor protection systems',
      'Understand industrial automation principles',
      'Perform motor maintenance and troubleshooting'
    ]
  },
  'KM-07': {
    title: 'Power Systems and Distribution',
    subtitle: 'KT0701: Power Systems and Distribution',
    description: 'Electrical power generation and distribution systems',
    fullDescription: 'This comprehensive module covers large-scale power systems from generation to distribution. Students will understand transmission networks, substation operations, protection systems, and modern smart grid technologies essential for power system engineering.',
    image: '/lovable-uploads/michael-pointner-fP5LU1iD5p4-unsplash.jpg',
    progress: 0,
    completedTopics: 0,
    totalTopics: 8,
    topics: [
      { id: 'KT0701', title: 'Power generation fundamentals', completed: false },
      { id: 'KT0702', title: 'Transmission and distribution networks', completed: false },
      { id: 'KT0703', title: 'Substation equipment and operation', completed: false },
      { id: 'KT0704', title: 'Power system protection', completed: false },
      { id: 'KT0705', title: 'Load management and demand response', completed: false },
      { id: 'KT0706', title: 'Power quality and harmonics', completed: false },
      { id: 'KT0707', title: 'Grid interconnection standards', completed: false },
      { id: 'KT0708', title: 'Smart grid technologies', completed: false },
    ],
    learningObjectives: [
      'Understand power generation principles and methods',
      'Analyze transmission and distribution network operations',
      'Operate and maintain substation equipment',
      'Implement power system protection schemes',
      'Manage electrical loads and demand response',
      'Address power quality issues and harmonics',
      'Apply grid interconnection standards and requirements',
      'Integrate smart grid technologies and systems'
    ]
  },
  'KM-08': {
    title: 'Renewable Energy Systems',
    subtitle: 'KT0801: Renewable Energy Systems',
    description: 'Solar, wind and renewable energy technologies',
    fullDescription: 'This forward-looking module explores renewable energy technologies and their integration into modern power systems. Students will learn about solar PV, wind systems, energy storage, and grid integration techniques essential for sustainable energy solutions.',
    image: '/lovable-uploads/bill-mead-wmaP3Tl80ww-unsplash.jpg',
    progress: 0,
    completedTopics: 0,
    totalTopics: 6,
    topics: [
      { id: 'KT0801', title: 'Solar photovoltaic systems', completed: false },
      { id: 'KT0802', title: 'Wind energy systems', completed: false },
      { id: 'KT0803', title: 'Battery storage systems', completed: false },
      { id: 'KT0804', title: 'Grid-tied renewable systems', completed: false },
      { id: 'KT0805', title: 'Energy efficiency and conservation', completed: false },
      { id: 'KT0806', title: 'Renewable energy regulations', completed: false },
    ],
    learningObjectives: [
      'Design and install solar photovoltaic systems',
      'Understand wind energy generation principles',
      'Configure battery storage and management systems',
      'Integrate renewable systems with electrical grids',
      'Implement energy efficiency and conservation measures',
      'Navigate renewable energy regulations and standards'
    ]
  },
  'KM-09': {
    title: 'Building Management Systems',
    subtitle: 'KT0901: Building Management Systems',
    description: 'Smart building automation and control',
    fullDescription: 'This modern module focuses on intelligent building systems and automation technologies. Students will learn about HVAC controls, lighting management, security systems, and communication protocols that create efficient, comfortable, and secure building environments.',
    image: '/lovable-uploads/danist-soh-8Gg2Ne_uTcM-unsplash.jpg',
    progress: 0,
    completedTopics: 0,
    totalTopics: 7,
    topics: [
      { id: 'KT0901', title: 'Building automation fundamentals', completed: false },
      { id: 'KT0902', title: 'HVAC control systems', completed: false },
      { id: 'KT0903', title: 'Lighting control and management', completed: false },
      { id: 'KT0904', title: 'Security and access control', completed: false },
      { id: 'KT0905', title: 'Fire safety and alarm systems', completed: false },
      { id: 'KT0906', title: 'Communication protocols and networks', completed: false },
      { id: 'KT0907', title: 'System integration and maintenance', completed: false },
    ],
    learningObjectives: [
      'Understand building automation system architecture',
      'Design and implement HVAC control strategies',
      'Configure intelligent lighting control systems',
      'Install security and access control systems',
      'Integrate fire safety and alarm systems',
      'Work with building communication protocols',
      'Perform system integration and ongoing maintenance'
    ]
  }
};

export default function CourseDetail() {
  const { courseId } = useParams();
  const course = courseData[courseId as keyof typeof courseData];

  if (!course) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Course not found</h1>
        <Link to="/courses">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>
        </Link>
      </div>
    );
  }

  const handleTopicClick = (topicId: string) => {
    // Navigate to document viewer (for now, just show alert)
    window.open(`/courses/${courseId}/topics/${topicId}`, '_blank');
  };

  const handleDownloadDocument = (topicId: string) => {
    // Simulate document download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${topicId}_document.docx`;
    link.click();
  };

  const getNextIncompleteTopicIndex = () => {
    return course.topics.findIndex(topic => !topic.completed);
  };

  const nextTopicIndex = getNextIncompleteTopicIndex();
  const nextTopic = nextTopicIndex !== -1 ? course.topics[nextTopicIndex] : course.topics[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link to="/courses">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Tracker Sidebar */}
        <div className="lg:col-span-1">
          <Card className="bg-[#0B1220] text-white border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg text-white">Progress tracker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress Bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-white/80">Overall Progress</span>
                  <span className="text-sm font-medium text-white">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2 bg-white/20" />
                <p className="text-xs text-white/60 mt-1">
                  {course.completedTopics} of {course.totalTopics} topics have been completed
                </p>
              </div>

              <Separator className="bg-white/20" />

              {/* Topics List */}
              <div>
                <h3 className="text-sm font-medium text-white mb-3">Topics</h3>
                <div className="space-y-2">
                  {course.topics.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => handleTopicClick(topic.id)}
                      className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors text-left"
                    >
                      {topic.completed ? (
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                      ) : (
                        <Circle className="h-4 w-4 text-white/40 flex-shrink-0" />
                      )}
                      <span className="text-sm text-white/90 flex-1">
                        {topic.title}
                      </span>
                      <ChevronRight className="h-4 w-4 text-white/40" />
                    </button>
                  ))}
                </div>
              </div>

              <Separator className="bg-white/20" />

              {/* Assessment Button */}
              <Link to={`/assessment/${courseId}`}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Play className="mr-2 h-4 w-4" />
                  Assessments
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <div className="relative">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <Badge className="mb-2 bg-[#0B1220] hover:bg-[#0B1220]/90">
                  {courseId}
                </Badge>
                <h1 className="text-2xl font-bold">{course.title}</h1>
                <p className="text-lg text-white/90">{course.subtitle}</p>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Course Description */}
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 mb-3">Course Overview</h2>
                  <p className="text-slate-600 leading-relaxed">
                    {course.fullDescription}
                  </p>
                </div>

                {/* Learning Objectives */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Learning Objectives</h3>
                  <ul className="space-y-2 text-slate-600">
                    {course.learningObjectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Continue Button */}
                <div className="pt-4">
                  <Button 
                    size="lg" 
                    className="bg-[#0B1220] hover:bg-[#0B1220]/90 text-white"
                    onClick={() => handleTopicClick(nextTopic.id)}
                  >
                    <Play className="mr-2 h-5 w-5" />
                    {course.progress === 0 ? 'Start Learning' : 'Continue Learning'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}