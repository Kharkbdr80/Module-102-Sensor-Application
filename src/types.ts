import { 
  Cpu, 
  Activity, 
  Zap, 
  Thermometer, 
  Lightbulb, 
  Waves, 
  Volume2, 
  Flame, 
  Wind, 
  Droplets, 
  Compass, 
  Maximize, 
  Move, 
  ArrowRightLeft, 
  Eye, 
  RefreshCcw, 
  Grid3X3, 
  Heart, 
  Navigation,
  Disc,
  CircleDot
} from 'lucide-react';

export interface Slide {
  title: string;
  content: string;
  image?: string;
  fact?: string;
}

export interface MCQ {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface SensorData {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  category: string;
  slides: Slide[];
  quiz: MCQ[];
  game: {
    title: string;
    description: string;
    prompt: string;
  };
}

export interface BoardData {
  id: string;
  name: string;
  description: string;
  pins: string;
  usb: string;
  difficulty: "Easy" | "Medium" | "Advanced";
  image: string;
  details: {
    whatIsIt: string;
    parts: string[];
    projects: string[];
  };
  slides: Slide[];
  quiz: MCQ[];
  game: {
    title: string;
    description: string;
  };
}

export type ViewType = 'welcome' | 'dashboard' | 'sensor-library' | 'board-dashboard' | 'sensor-detail' | 'board-detail' | 'game' | 'quiz' | 'compare';
