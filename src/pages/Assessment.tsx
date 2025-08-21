import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

const assessmentData = {
  'KM-04': {
    title: 'Formative Assessment 1',
    description: 'Test your knowledge on The Electricians world of work',
    duration: 15, // minutes
    questions: [
      {
        id: 1,
        question: 'You try to measure resistance across a component, but instead of a number, the multimeter screen displays a "1" on the far left. You pause to interpret what this reading means.',
        scenario: 'You are an apprentice electrician assisting on a small project in a training workshop. On the table is a digital multimeter (model DT-9205A), a test circuit built on a breadboard, and a series of connected components, including wires and what appears to be a relay module. Your supervisor asks you to help test the circuit and verify electrical values using the multimeter provided.',
        image: '/lovable-uploads/james-lee-3o7oeVnG5uc-unsplash.jpg',
        options: [
          { id: 'A', text: 'Circuit is shorted' },
          { id: 'B', text: 'Reading is incomplete' },
          { id: 'C', text: 'Overload or out-of-range measurement' },
          { id: 'D', text: 'Fully charged battery' }
        ],
        correct: 'C'
      },
      {
        id: 2,
        question: 'What is the primary responsibility of an electrician in ensuring workplace safety?',
        options: [
          { id: 'A', text: 'Installing electrical systems quickly' },
          { id: 'B', text: 'Following safety protocols and regulations' },
          { id: 'C', text: 'Using the cheapest materials available' },
          { id: 'D', text: 'Working without supervision' }
        ],
        correct: 'B'
      },
      {
        id: 3,
        question: 'Which qualification level is typically required for an apprentice electrician?',
        options: [
          { id: 'A', text: 'NQF Level 2' },
          { id: 'B', text: 'NQF Level 3' },
          { id: 'C', text: 'NQF Level 4' },
          { id: 'D', text: 'NQF Level 5' }
        ],
        correct: 'C'
      },
      {
        id: 4,
        question: 'You now connect the multimeter probes to the circuit using red and black wires that plug into the multimeter\'s ports. These are colour-coded and essential for accurate measurement. What are these red and black wires called?',
        scenario: 'You are an apprentice electrician assisting on a small project in a training workshop. On the table is a digital multimeter (model DT-9205A), a test circuit built on a breadboard, and a series of connected components, including wires and what appears to be a relay module. Your supervisor asks you to help test the circuit and verify electrical values using the multimeter provided.',
        image: '/lovable-uploads/ptti-edu-k9Dc5zT1Gq0-unsplash.jpg',
        options: [
          { id: 'A', text: 'Grounding rods' },
          { id: 'B', text: 'Insulation testers' },
          { id: 'C', text: 'Test probes or leads' },
          { id: 'D', text: 'Resistors' }
        ],
        correct: 'C'
      }
    ]
  },

  'KM-01': {
    title: 'Safety, Health & Environmental Assessment',
    description: 'Test your knowledge on workplace safety, health protocols, and environmental considerations',
    duration: 20, // minutes
    questions: [
      {
        id: 1,
        question: 'You notice a colleague working on a live electrical panel without proper PPE. The area has warning signs but no lockout/tagout procedures are in place. What is your immediate priority?',
        scenario: 'You are conducting a routine safety inspection at a manufacturing facility. While walking through the electrical maintenance area, you observe various safety situations that require assessment and potential intervention.',
        image: '/lovable-uploads/nareeta-martin-ajz8X6Wtfmo-unsplash.jpg',
        options: [
          { id: 'A', text: 'Continue with your inspection and report later' },
          { id: 'B', text: 'Immediately stop the work and ensure safety protocols are followed' },
          { id: 'C', text: 'Take photos for documentation first' },
          { id: 'D', text: 'Check if the colleague has proper authorization' }
        ],
        correct: 'B'
      },
      {
        id: 2,
        question: 'What is the minimum arc flash boundary distance for equipment rated 480V?',
        options: [
          { id: 'A', text: '1.2 meters' },
          { id: 'B', text: '1.8 meters' },
          { id: 'C', text: '2.4 meters' },
          { id: 'D', text: 'Depends on incident energy calculation' }
        ],
        correct: 'D'
      },
      {
        id: 3,
        question: 'Which environmental factor poses the greatest risk when working with electrical equipment outdoors?',
        options: [
          { id: 'A', text: 'Temperature variations' },
          { id: 'B', text: 'Moisture and humidity' },
          { id: 'C', text: 'Wind speed' },
          { id: 'D', text: 'UV radiation' }
        ],
        correct: 'B'
      },
      {
        id: 4,
        question: 'During a risk assessment, you identify multiple hazards in the work area. What is the correct hierarchy of risk control measures?',
        scenario: 'You are leading a team to install electrical equipment in a chemical processing plant. The area contains various hazards including chemical vapors, confined spaces, and high-voltage equipment.',
        image: '/lovable-uploads/ralph-ravi-kayden-mR1CIDduGLc-unsplash.jpg',
        options: [
          { id: 'A', text: 'PPE, Training, Engineering controls, Elimination' },
          { id: 'B', text: 'Elimination, Substitution, Engineering controls, Administrative controls, PPE' },
          { id: 'C', text: 'Training, PPE, Isolation, Engineering controls' },
          { id: 'D', text: 'Administrative controls, PPE, Elimination, Substitution' }
        ],
        correct: 'B'
      },
      {
        id: 5,
        question: 'What is the primary purpose of a Job Safety Analysis (JSA)?',
        options: [
          { id: 'A', text: 'To comply with legal requirements' },
          { id: 'B', text: 'To identify hazards and establish safe work procedures' },
          { id: 'C', text: 'To determine project timelines' },
          { id: 'D', text: 'To calculate insurance costs' }
        ],
        correct: 'B'
      }
    ]
  },

  'KM-03': {
    title: 'Fundamentals of Electricity Assessment',
    description: 'Test your knowledge on basic electrical theory, Ohm\'s Law, and circuit fundamentals',
    duration: 25, // minutes
    questions: [
      {
        id: 1,
        question: 'You are measuring voltage in this circuit and observe the reading on the display. Using Ohm\'s Law, if the current through a 100Ω resistor is 0.5A, what voltage should you expect to measure across it?',
        scenario: 'You are working in an electronics lab, testing various circuit configurations. Your task is to verify theoretical calculations using practical measurements with a digital multimeter.',
        image: '/lovable-uploads/deon-fosu-j1SJaphyi5I-unsplash.jpg',
        options: [
          { id: 'A', text: '25V' },
          { id: 'B', text: '50V' },
          { id: 'C', text: '75V' },
          { id: 'D', text: '200V' }
        ],
        correct: 'B'
      },
      {
        id: 2,
        question: 'In a series circuit with three resistors (10Ω, 20Ω, and 30Ω), what is the total resistance?',
        options: [
          { id: 'A', text: '20Ω' },
          { id: 'B', text: '60Ω' },
          { id: 'C', text: '5.45Ω' },
          { id: 'D', text: '15Ω' }
        ],
        correct: 'B'
      },
      {
        id: 3,
        question: 'What is the main difference between AC and DC electrical systems?',
        options: [
          { id: 'A', text: 'AC is safer than DC' },
          { id: 'B', text: 'DC current flows in one direction, AC current alternates direction' },
          { id: 'C', text: 'AC uses lower voltages than DC' },
          { id: 'D', text: 'DC is only used in batteries' }
        ],
        correct: 'B'
      },
      {
        id: 4,
        question: 'You are using this multimeter to measure power consumption. If a device operates at 120V and draws 5A of current, what is the power consumption?',
        scenario: 'You are conducting energy efficiency measurements in a commercial building, calculating power consumption of various electrical loads to optimize energy usage.',
        image: '/lovable-uploads/andrew-ruiz-348421-unsplash.jpg',
        options: [
          { id: 'A', text: '24W' },
          { id: 'B', text: '125W' },
          { id: 'C', text: '600W' },
          { id: 'D', text: '25A' }
        ],
        correct: 'C'
      },
      {
        id: 5,
        question: 'What happens to the strength of a magnetic field when the current through a conductor increases?',
        options: [
          { id: 'A', text: 'It decreases proportionally' },
          { id: 'B', text: 'It remains constant' },
          { id: 'C', text: 'It increases proportionally' },
          { id: 'D', text: 'It reverses direction' }
        ],
        correct: 'C'
      },
      {
        id: 6,
        question: 'Which instrument would be most appropriate for measuring very small currents (microamperes)?',
        options: [
          { id: 'A', text: 'Standard digital multimeter' },
          { id: 'B', text: 'Clamp meter' },
          { id: 'C', text: 'Precision microammeter' },
          { id: 'D', text: 'Oscilloscope' }
        ],
        correct: 'C'
      }
    ]
  },

  'KM-02': {
    title: 'Electrical Installation Materials Assessment',
    description: 'Test your knowledge on electrical materials, components, and proper selection criteria',
    duration: 20, // minutes
    questions: [
      {
        id: 1,
        question: 'You are examining these electrical components for a new installation. What type of cable would be most appropriate for outdoor underground installation?',
        scenario: 'You are planning materials for a residential electrical installation that includes both indoor wiring and outdoor lighting circuits. The outdoor portion requires underground cable runs to garden lighting fixtures.',
        image: '/lovable-uploads/simone-impei-eZaKj3xAzTE-unsplash.jpg',
        options: [
          { id: 'A', text: 'Standard PVC-insulated building wire' },
          { id: 'B', text: 'Direct burial rated cable with moisture barrier' },
          { id: 'C', text: 'Armored cable (BX)' },
          { id: 'D', text: 'Flexible conduit with THHN wire' }
        ],
        correct: 'B'
      },
      {
        id: 2,
        question: 'What is the primary function of a circuit breaker in an electrical installation?',
        options: [
          { id: 'A', text: 'To reduce voltage' },
          { id: 'B', text: 'To provide overcurrent protection' },
          { id: 'C', text: 'To improve power factor' },
          { id: 'D', text: 'To filter harmonics' }
        ],
        correct: 'B'
      },
      {
        id: 3,
        question: 'Which wire gauge would be appropriate for a 20-amp branch circuit?',
        options: [
          { id: 'A', text: '18 AWG' },
          { id: 'B', text: '14 AWG' },
          { id: 'C', text: '12 AWG' },
          { id: 'D', text: '10 AWG' }
        ],
        correct: 'C'
      },
      {
        id: 4,
        question: 'When selecting electrical accessories for a wet location, what rating should they have?',
        options: [
          { id: 'A', text: 'IP54' },
          { id: 'B', text: 'IP65' },
          { id: 'C', text: 'NEMA 3R' },
          { id: 'D', text: 'All of the above depending on specific application' }
        ],
        correct: 'D'
      },
      {
        id: 5,
        question: 'What is the main advantage of using AFCI (Arc Fault Circuit Interrupter) breakers?',
        options: [
          { id: 'A', text: 'They provide ground fault protection' },
          { id: 'B', text: 'They detect and interrupt dangerous arc faults' },
          { id: 'C', text: 'They reduce energy consumption' },
          { id: 'D', text: 'They eliminate electrical noise' }
        ],
        correct: 'B'
      }
    ]
  },

  'KM-05': {
    title: 'Electrical Circuit Analysis Assessment',
    description: 'Test your knowledge on advanced circuit analysis, troubleshooting, and three-phase systems',
    duration: 30, // minutes
    questions: [
      {
        id: 1,
        question: 'You are analyzing this complex circuit configuration. In a balanced three-phase system, if the line voltage is 480V, what is the phase voltage?',
        scenario: 'You are troubleshooting a three-phase motor installation in an industrial facility. The system uses a standard wye-connected configuration, and you need to verify proper voltage levels for system commissioning.',
        image: '/lovable-uploads/jarvik-joshi-yjgE1xjyv60-unsplash.jpg',
        options: [
          { id: 'A', text: '277V' },
          { id: 'B', text: '240V' },
          { id: 'C', text: '480V' },
          { id: 'D', text: '208V' }
        ],
        correct: 'A'
      },
      {
        id: 2,
        question: 'In a parallel circuit, what happens to the total current when an additional load is added?',
        options: [
          { id: 'A', text: 'It decreases' },
          { id: 'B', text: 'It increases' },
          { id: 'C', text: 'It remains constant' },
          { id: 'D', text: 'It depends on the load resistance' }
        ],
        correct: 'B'
      },
      {
        id: 3,
        question: 'What is the most systematic approach to troubleshooting an electrical circuit fault?',
        options: [
          { id: 'A', text: 'Replace components randomly until it works' },
          { id: 'B', text: 'Start from the power source and work toward the load' },
          { id: 'C', text: 'Check the most expensive component first' },
          { id: 'D', text: 'Replace all fuses and breakers' }
        ],
        correct: 'B'
      },
      {
        id: 4,
        question: 'In three-phase power calculations, what is the relationship between line current and phase current in a delta connection?',
        options: [
          { id: 'A', text: 'Line current equals phase current' },
          { id: 'B', text: 'Line current is √3 times phase current' },
          { id: 'C', text: 'Phase current is √3 times line current' },
          { id: 'D', text: 'There is no relationship' }
        ],
        correct: 'B'
      },
      {
        id: 5,
        question: 'What test would you perform to verify proper insulation in electrical equipment?',
        options: [
          { id: 'A', text: 'Continuity test' },
          { id: 'B', text: 'Voltage test' },
          { id: 'C', text: 'Insulation resistance (megger) test' },
          { id: 'D', text: 'Current measurement' }
        ],
        correct: 'C'
      },
      {
        id: 6,
        question: 'What causes a leading power factor in electrical systems?',
        options: [
          { id: 'A', text: 'Inductive loads' },
          { id: 'B', text: 'Capacitive loads' },
          { id: 'C', text: 'Resistive loads' },
          { id: 'D', text: 'Harmonic distortion' }
        ],
        correct: 'B'
      }
    ]
  },

  'KM-06': {
    title: 'Motor Control Systems Assessment',
    description: 'Test your knowledge on industrial motor control, automation, and drive systems',
    duration: 25, // minutes
    questions: [
      {
        id: 1,
        question: 'You are working with this industrial motor control setup. What is the primary advantage of using a Variable Frequency Drive (VFD) for motor control?',
        scenario: 'You are commissioning a new conveyor system in a manufacturing plant. The system requires precise speed control and energy efficiency optimization for various production speeds.',
        image: '/lovable-uploads/md-shamin-XJJ5oAZmnlI-unsplash.jpg',
        options: [
          { id: 'A', text: 'Reduced installation cost' },
          { id: 'B', text: 'Speed control and energy savings' },
          { id: 'C', text: 'Simplified wiring' },
          { id: 'D', text: 'Elimination of maintenance' }
        ],
        correct: 'B'
      },
      {
        id: 2,
        question: 'Which motor starting method produces the highest starting torque?',
        options: [
          { id: 'A', text: 'Direct-on-line (DOL)' },
          { id: 'B', text: 'Star-delta starting' },
          { id: 'C', text: 'Soft starter' },
          { id: 'D', text: 'Variable frequency drive' }
        ],
        correct: 'A'
      },
      {
        id: 3,
        question: 'What is the purpose of motor overload protection?',
        options: [
          { id: 'A', text: 'To protect against short circuits' },
          { id: 'B', text: 'To protect the motor from excessive current over time' },
          { id: 'C', text: 'To provide emergency stop function' },
          { id: 'D', text: 'To control motor speed' }
        ],
        correct: 'B'
      },
      {
        id: 4,
        question: 'In a three-phase induction motor, what determines the motor speed?',
        options: [
          { id: 'A', text: 'Applied voltage' },
          { id: 'B', text: 'Load torque' },
          { id: 'C', text: 'Supply frequency and number of poles' },
          { id: 'D', text: 'Motor current' }
        ],
        correct: 'C'
      },
      {
        id: 5,
        question: 'What is the most common cause of motor failure in industrial applications?',
        options: [
          { id: 'A', text: 'Mechanical wear' },
          { id: 'B', text: 'Electrical overload' },
          { id: 'C', text: 'Bearing failure' },
          { id: 'D', text: 'Insulation breakdown due to heat' }
        ],
        correct: 'D'
      }
    ]
  },

  'KM-07': {
    title: 'Power Systems and Distribution Assessment',
    description: 'Test your knowledge on power generation, transmission, distribution, and protection systems',
    duration: 30, // minutes
    questions: [
      {
        id: 1,
        question: 'You are inspecting this power distribution facility. What is the primary purpose of a substation in the electrical power system?',
        scenario: 'You are conducting a routine inspection at a regional electrical substation. The facility contains various high-voltage equipment, protection systems, and monitoring devices that are critical to power system operation.',
        image: '/lovable-uploads/michael-pointner-fP5LU1iD5p4-unsplash.jpg',
        options: [
          { id: 'A', text: 'Generate electrical power' },
          { id: 'B', text: 'Transform voltage levels and provide switching functions' },
          { id: 'C', text: 'Store electrical energy' },
          { id: 'D', text: 'Convert AC to DC power' }
        ],
        correct: 'B'
      },
      {
        id: 2,
        question: 'What is the typical transmission voltage level for long-distance power transmission?',
        options: [
          { id: 'A', text: '4.16 kV to 13.8 kV' },
          { id: 'B', text: '23 kV to 69 kV' },
          { id: 'C', text: '115 kV to 765 kV' },
          { id: 'D', text: '120V to 480V' }
        ],
        correct: 'C'
      },
      {
        id: 3,
        question: 'Which protective device is specifically designed to protect transmission lines from faults?',
        options: [
          { id: 'A', text: 'Fuse' },
          { id: 'B', text: 'Circuit breaker' },
          { id: 'C', text: 'Distance relay' },
          { id: 'D', text: 'Surge arrester' }
        ],
        correct: 'C'
      },
      {
        id: 4,
        question: 'What is the primary advantage of high-voltage transmission over low-voltage transmission?',
        options: [
          { id: 'A', text: 'Safer operation' },
          { id: 'B', text: 'Lower power losses over long distances' },
          { id: 'C', text: 'Cheaper equipment' },
          { id: 'D', text: 'Easier maintenance' }
        ],
        correct: 'B'
      },
      {
        id: 5,
        question: 'What causes power quality issues such as voltage sags and harmonics?',
        options: [
          { id: 'A', text: 'Only equipment failures' },
          { id: 'B', text: 'Weather conditions only' },
          { id: 'C', text: 'Non-linear loads and system disturbances' },
          { id: 'D', text: 'Transmission line length' }
        ],
        correct: 'C'
      },
      {
        id: 6,
        question: 'What is the function of a smart grid compared to a traditional power grid?',
        options: [
          { id: 'A', text: 'Only generates more power' },
          { id: 'B', text: 'Provides two-way communication and automated control' },
          { id: 'C', text: 'Uses only renewable energy' },
          { id: 'D', text: 'Eliminates the need for substations' }
        ],
        correct: 'B'
      }
    ]
  },

  'KM-08': {
    title: 'Renewable Energy Systems Assessment',
    description: 'Test your knowledge on solar, wind, and renewable energy technologies',
    duration: 25, // minutes
    questions: [
      {
        id: 1,
        question: 'You are evaluating this solar installation setup. What is the primary factor that affects solar panel efficiency?',
        scenario: 'You are conducting a site assessment for a commercial solar photovoltaic installation. The system will include multiple solar panels, inverters, and grid-tie equipment for optimal energy production.',
        image: '/lovable-uploads/bill-mead-wmaP3Tl80ww-unsplash.jpg',
        options: [
          { id: 'A', text: 'Panel color' },
          { id: 'B', text: 'Installation height' },
          { id: 'C', text: 'Solar irradiance and temperature' },
          { id: 'D', text: 'Panel weight' }
        ],
        correct: 'C'
      },
      {
        id: 2,
        question: 'What is the purpose of a solar inverter in a photovoltaic system?',
        options: [
          { id: 'A', text: 'To store energy in batteries' },
          { id: 'B', text: 'To convert DC power to AC power' },
          { id: 'C', text: 'To track the sun\'s movement' },
          { id: 'D', text: 'To clean the solar panels' }
        ],
        correct: 'B'
      },
      {
        id: 3,
        question: 'In wind energy systems, what determines the power output of a wind turbine?',
        options: [
          { id: 'A', text: 'Only wind speed' },
          { id: 'B', text: 'Wind speed, air density, and swept area' },
          { id: 'C', text: 'Only turbine height' },
          { id: 'D', text: 'Number of blades only' }
        ],
        correct: 'B'
      },
      {
        id: 4,
        question: 'What is the main challenge with integrating renewable energy into the electrical grid?',
        options: [
          { id: 'A', text: 'High cost only' },
          { id: 'B', text: 'Intermittent and variable power output' },
          { id: 'C', text: 'Too much power generation' },
          { id: 'D', text: 'Complex installation only' }
        ],
        correct: 'B'
      },
      {
        id: 5,
        question: 'Which battery technology is most commonly used in large-scale renewable energy storage?',
        options: [
          { id: 'A', text: 'Lead-acid batteries' },
          { id: 'B', text: 'Lithium-ion batteries' },
          { id: 'C', text: 'Nickel-cadmium batteries' },
          { id: 'D', text: 'Alkaline batteries' }
        ],
        correct: 'B'
      }
    ]
  },

  'KM-09': {
    title: 'Building Management Systems Assessment',
    description: 'Test your knowledge on smart building automation, control systems, and integration',
    duration: 20, // minutes
    questions: [
      {
        id: 1,
        question: 'You are configuring this building automation system interface. What is the primary benefit of implementing a Building Management System (BMS)?',
        scenario: 'You are commissioning a new smart building automation system for a commercial office complex. The system integrates HVAC, lighting, security, and fire safety systems for optimal building performance.',
        image: '/lovable-uploads/danist-soh-8Gg2Ne_uTcM-unsplash.jpg',
        options: [
          { id: 'A', text: 'Reduced construction costs' },
          { id: 'B', text: 'Energy efficiency and centralized control' },
          { id: 'C', text: 'Elimination of maintenance' },
          { id: 'D', text: 'Faster construction time' }
        ],
        correct: 'B'
      },
      {
        id: 2,
        question: 'Which communication protocol is commonly used in building automation systems?',
        options: [
          { id: 'A', text: 'HTTP only' },
          { id: 'B', text: 'BACnet or Modbus' },
          { id: 'C', text: 'Bluetooth only' },
          { id: 'D', text: 'WiFi only' }
        ],
        correct: 'B'
      },
      {
        id: 3,
        question: 'What is the main function of occupancy sensors in smart lighting systems?',
        options: [
          { id: 'A', text: 'To count people in the building' },
          { id: 'B', text: 'To automatically control lighting based on presence' },
          { id: 'C', text: 'To monitor air quality' },
          { id: 'D', text: 'To control temperature' }
        ],
        correct: 'B'
      },
      {
        id: 4,
        question: 'In HVAC control systems, what does VAV stand for?',
        options: [
          { id: 'A', text: 'Variable Air Volume' },
          { id: 'B', text: 'Ventilation Air Velocity' },
          { id: 'C', text: 'Voltage Air Valve' },
          { id: 'D', text: 'Variable Airflow Ventilation' }
        ],
        correct: 'A'
      },
      {
        id: 5,
        question: 'What is the purpose of system integration in building management systems?',
        options: [
          { id: 'A', text: 'To make systems more complex' },
          { id: 'B', text: 'To allow different systems to work together efficiently' },
          { id: 'C', text: 'To increase installation costs' },
          { id: 'D', text: 'To require more operators' }
        ],
        correct: 'B'
      }
    ]
  }
};

type AssessmentPhase = 'welcome' | 'password' | 'assessment' | 'confirm' | 'results';

export default function Assessment() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<AssessmentPhase>('welcome');
  const [password, setPassword] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  const assessment = assessmentData[courseId as keyof typeof assessmentData];

  useEffect(() => {
    if (timerActive && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setTimerActive(false);
            setPhase('results');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timerActive, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePasswordSubmit = () => {
    if (password === '123456') {
      setPhase('assessment');
      setTimeRemaining(assessment.duration * 60);
      setTimerActive(true);
    } else {
      alert('Incorrect password. Use: 123456');
    }
  };

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestion < assessment.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    setPhase('confirm');
  };

  const confirmSubmit = () => {
    setTimerActive(false);
    setPhase('results');
  };

  const calculateResults = () => {
    let correct = 0;
    assessment.questions.forEach(q => {
      if (answers[q.id] === q.correct) correct++;
    });
    return {
      correct,
      total: assessment.questions.length,
      percentage: Math.round((correct / assessment.questions.length) * 100)
    };
  };

  if (!assessment) {
    return <div>Assessment not found</div>;
  }

  // Welcome Phase
  if (phase === 'welcome') {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl text-[#0B1220]">
              Welcome Macy,
            </CardTitle>
            <p className="text-xl text-slate-700">
              Are you ready to take your Assessment?
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-slate-50 rounded-lg p-6 text-left">
              <h3 className="font-semibold text-slate-900 mb-2">{assessment.title}</h3>
              <p className="text-slate-600 mb-4">{assessment.description}</p>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{assessment.duration} minutes</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" />
                  <span>{assessment.questions.length} questions</span>
                </div>
              </div>
            </div>
            <Button 
              size="lg" 
              onClick={() => setPhase('password')}
              className="bg-[#0B1220] hover:bg-[#0B1220]/90 text-white"
            >
              Start Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Password Phase
  if (phase === 'password') {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl text-[#0B1220]">
              Welcome Macy,
            </CardTitle>
            <p className="text-xl text-slate-700 mb-6">
              Are you ready to take your Assessment?
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-slate-600">
              We have sent the password code to your email address check your email and enter the code below to continue your assessment
            </p>
            <div className="max-w-sm mx-auto">
              <Label htmlFor="password" className="sr-only">Password</Label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg text-center text-lg"
                onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
              />
            </div>
            <Button 
              size="lg" 
              onClick={handlePasswordSubmit}
              className="bg-[#0B1220] hover:bg-[#0B1220]/90 text-white"
            >
              Login
            </Button>
            <p className="text-xs text-slate-500">Demo password: 123456</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Assessment Phase
  if (phase === 'assessment') {
    const question = assessment.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / assessment.questions.length) * 100;

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between bg-white rounded-xl border border-slate-200 p-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">{assessment.title}</h1>
            <p className="text-slate-600">Answer the question below</p>
          </div>
          <div className="flex items-center gap-2 text-lg font-bold text-[#0B1220]">
            <Clock className="h-5 w-5" />
            Timer: {formatTime(timeRemaining)}Mins
          </div>
        </div>

        {/* Progress */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">
                Question {currentQuestion + 1} of {assessment.questions.length}
              </span>
              <span className="text-sm text-slate-600">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Question */}
        <Card>
          <CardContent className="pt-6 space-y-6">
            {question.scenario && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Scenario:</strong> {question.scenario}
                </AlertDescription>
              </Alert>
            )}

            {question.image && (
              <div className="rounded-lg overflow-hidden">
                <img 
                  src={question.image} 
                  alt="Question illustration"
                  className="w-full h-64 object-cover"
                />
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Question {currentQuestion + 1}/{assessment.questions.length}
              </h3>
              <p className="text-slate-700 mb-6">{question.question}</p>

              <div className="space-y-3">
                <h4 className="font-medium text-slate-900">Choose answer</h4>
                <RadioGroup 
                  value={answers[question.id] || ''} 
                  onValueChange={(value) => handleAnswerSelect(question.id, value)}
                >
                  {question.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id} className="text-slate-700 cursor-pointer">
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous Question
          </Button>
          
          {currentQuestion === assessment.questions.length - 1 ? (
            <Button 
              onClick={handleSubmit}
              className="bg-[#0B1220] hover:bg-[#0B1220]/90 text-white"
            >
              Submit Assessment
            </Button>
          ) : (
            <Button 
              onClick={handleNext}
              className="bg-[#0B1220] hover:bg-[#0B1220]/90 text-white"
            >
              Next Question
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Confirmation Phase
  if (phase === 'confirm') {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardContent className="pt-12 pb-12">
            <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl">?</span>
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-6">
              Are you Sure you want to submit Quiz?
            </h2>
            <div className="flex gap-4 justify-center">
              <Button 
                variant="outline" 
                onClick={() => setPhase('assessment')}
                className="px-8"
              >
                No
              </Button>
              <Button 
                onClick={confirmSubmit}
                className="bg-[#0B1220] hover:bg-[#0B1220]/90 text-white px-8"
              >
                Yes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Results Phase
  if (phase === 'results') {
    const results = calculateResults();
    
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-[#0B1220]">{assessment.title}</CardTitle>
            <div className="pt-4">
              <Badge variant={results.percentage >= 75 ? 'default' : 'destructive'} className="text-lg px-4 py-1">
                Mark: {results.percentage}%
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="border border-slate-300 p-3 text-left">Question</th>
                    <th className="border border-slate-300 p-3 text-center">Selected Answer</th>
                    <th className="border border-slate-300 p-3 text-center">Correct Answer</th>
                    <th className="border border-slate-300 p-3 text-center">Mark</th>
                  </tr>
                </thead>
                <tbody>
                  {assessment.questions.map((question, index) => {
                    const userAnswer = answers[question.id];
                    const isCorrect = userAnswer === question.correct;
                    return (
                      <tr key={question.id}>
                        <td className="border border-slate-300 p-3">Question {index + 1}</td>
                        <td className="border border-slate-300 p-3 text-center">{userAnswer || '-'}</td>
                        <td className="border border-slate-300 p-3 text-center">{question.correct}</td>
                        <td className="border border-slate-300 p-3 text-center">
                          {isCorrect ? '100%' : '0%'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-center mt-6">
              <Button 
                onClick={() => navigate('/courses')}
                className="bg-[#0B1220] hover:bg-[#0B1220]/90 text-white"
              >
                Back to Courses
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}