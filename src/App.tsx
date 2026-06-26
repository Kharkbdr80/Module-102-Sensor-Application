import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Library, 
  Cpu, 
  Gamepad2, 
  Layout, 
  HelpCircle, 
  ArrowLeft,
  ChevronRight,
  Trophy,
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
  ArrowRightLeft,
  Zap,
  Activity,
  Check,
  Minus
} from 'lucide-react';
import { SENSORS } from './data/sensors';
import { BOARDS } from './data/boards';
import { ViewType, SensorData, BoardData } from './types';
import { useProgress } from './hooks/useProgress';
import { ModuleViewer } from './components/ModuleViewer';

import { Card, Button } from './components/UI';

// --- Page Components ---

const ComparisonView = ({ onBack }: { onBack: () => void }) => {
  const features = [
    { name: 'Size', uno: 'Large (Standard)', nano: 'Tiny (Breadboard)', mega: 'Extra Large (Heavy Duty)' },
    { name: 'Digital Pins', uno: '14 (6 PWM)', nano: '14 (6 PWM)', mega: '54 (15 PWM)' },
    { name: 'Analog Pins', uno: '6 Inputs', nano: '8 Inputs', mega: '16 Inputs' },
    { name: 'USB Port', uno: 'USB Type-B', nano: 'Mini-USB', mega: 'USB Type-B' },
    { name: 'Breadboard Friendly', uno: 'No (Needs wires)', nano: 'Yes (Plugs in)', mega: 'No (Too massive)' },
    { name: 'Best Use', uno: 'First Projects', nano: 'Tiny Robots', mega: '3D Printers & Scale Automation' },
    { name: 'Difficulty', uno: 'Very Easy', nano: 'Easy', mega: 'Medium-Hard' }
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <header className="h-20 bg-white border-b-4 border-[#E2E8F0] px-8 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-6">
          <motion.button 
            whileHover={{ x: -5 }} 
            onClick={onBack}
            className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border-2 border-gray-100 button-pop"
          >
            <ArrowLeft strokeWidth={3} />
          </motion.button>
          <h1 className="text-xl md:text-2xl font-black text-[#1A1A1A] tracking-tight uppercase">Uno vs Nano vs Mega 2560</h1>
        </div>
      </header>

      <div className="p-8 flex-1 space-y-12 pb-32">
        <div className="bg-white rounded-[40px] shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)] overflow-hidden border-4 border-black/10 overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-gray-100 border-b-4 border-black/5">
                <th className="p-8 text-left text-gray-400 font-black uppercase text-xs tracking-widest">Feature</th>
                <th className="p-8 text-center text-primary font-black text-2xl uppercase tracking-tighter">Uno</th>
                <th className="p-8 text-center text-success font-black text-2xl uppercase tracking-tighter">Nano</th>
                <th className="p-8 text-center text-purple-600 font-black text-2xl uppercase tracking-tighter">Mega 2560</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {features.map((f, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-6 text-left font-black text-dark uppercase text-xs tracking-widest">{f.name}</td>
                  <td className="p-6 text-center text-gray-600 font-bold uppercase text-xs">{f.uno}</td>
                  <td className="p-6 text-center text-gray-600 font-bold uppercase text-xs">{f.nano}</td>
                  <td className="p-6 text-center text-gray-600 font-bold uppercase text-xs">{f.mega}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card shadow="primary" className="p-10 space-y-4">
             <h4 className="text-primary font-black text-2xl uppercase tracking-tighter">Choose Uno if...</h4>
             <ul className="space-y-4">
               {['It is your very first time', 'You have big hands', 'You want more help online'].map(t => (
                 <li key={t} className="flex items-center gap-4 font-bold text-gray-600 uppercase text-xs tracking-tight">
                   <div className="w-6 h-6 bg-primary text-white rounded-lg flex items-center justify-center shrink-0">
                     <Check size={14} strokeWidth={4} />
                   </div>
                   {t}
                 </li>
               ))}
             </ul>
          </Card>
          <Card shadow="success" className="p-10 space-y-4">
             <h4 className="text-success font-black text-2xl uppercase tracking-tighter">Choose Nano if...</h4>
             <ul className="space-y-4">
               {['Space is very tight', 'You use a breadboard', 'You are building a drone'].map(t => (
                 <li key={t} className="flex items-center gap-4 font-bold text-gray-600 uppercase text-xs tracking-tight">
                   <div className="w-6 h-6 bg-success text-white rounded-lg flex items-center justify-center shrink-0">
                     <Check size={14} strokeWidth={4} />
                   </div>
                   {t}
                 </li>
               ))}
             </ul>
          </Card>
          <Card shadow="dark" className="p-10 space-y-4">
             <h4 className="text-purple-600 font-black text-2xl uppercase tracking-tighter">Choose Mega if...</h4>
             <ul className="space-y-4">
               {['You need dozens of ports', 'Building multi-axis CNC/3D printer', 'Complex multi-device UARTS'].map(t => (
                 <li key={t} className="flex items-center gap-4 font-bold text-gray-600 uppercase text-xs tracking-tight">
                   <div className="w-6 h-6 bg-purple-600 text-white rounded-lg flex items-center justify-center shrink-0">
                     <Check size={14} strokeWidth={4} />
                   </div>
                   {t}
                 </li>
               ))}
             </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

const BhutanRoboticsLogo = ({ size = 160 }: { size?: number }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 240 240" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_12px_24px_rgba(0,0,0,0.25)] select-none"
    >
      <defs>
        {/* Tartan/plaid pattern for traditional Bhutanese Gho dress */}
        <pattern id="ghoPlaid" width="12" height="12" patternUnits="userSpaceOnUse">
          <rect width="12" height="12" fill="#B91C1C" />
          <rect x="0" y="0" width="12" height="3" fill="#111827" opacity="0.35" />
          <rect x="0" y="0" width="3" height="12" fill="#111827" opacity="0.35" />
          <rect x="0" y="5" width="12" height="1" fill="#FBBF24" opacity="0.45" />
          <rect x="5" y="0" width="1" height="12" fill="#FBBF24" opacity="0.45" />
        </pattern>

        {/* Outer Ring Navy Gradient */}
        <linearGradient id="outerNavy" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0B3050" />
          <stop offset="50%" stopColor="#0D3B62" />
          <stop offset="100%" stopColor="#061F34" />
        </linearGradient>

        {/* Inner Circle Steel/Sky Blue Gradient */}
        <linearGradient id="innerBlue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2D7EB8" />
          <stop offset="100%" stopColor="#1E5C8A" />
        </linearGradient>

        {/* Chrome Metallic Gradients */}
        <linearGradient id="metalChrome" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F9FAFB" />
          <stop offset="35%" stopColor="#E5E7EB" />
          <stop offset="70%" stopColor="#D1D5DB" />
          <stop offset="100%" stopColor="#9CA3AF" />
        </linearGradient>

        {/* Dark Metallic/Chassis Gradient */}
        <linearGradient id="chassisDark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4D5562" />
          <stop offset="100%" stopColor="#111827" />
        </linearGradient>

        {/* Soft Cloud Gradient */}
        <linearGradient id="cloudWhite" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F3F4F6" />
        </linearGradient>

        {/* Goggles Lens Glass Reflection */}
        <linearGradient id="gogglesReflection" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* Yellow-Gold Metallic */}
        <linearGradient id="goldHighlight" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="50%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        {/* Bhutan Flag Orange-Red */}
        <linearGradient id="bhutanOrange" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>

        {/* Curved text paths */}
        <path id="topCircleTextPath" d="M 23,120 A 97,97 0 1,1 217,120" fill="none" />
        <path id="bottomCircleTextPath" d="M 26,120 A 94,94 0 0,0 214,120" fill="none" />
      </defs>

      {/* 1. OUTERMOST LIGHT CHROME/WHITE CIRCULAR RIM */}
      <circle cx="120" cy="120" r="117" fill="#E2ECE9" stroke="#94A3B8" strokeWidth="1" />
      
      {/* 2. MAIN NAVY BLUE TEXT RING */}
      <circle cx="120" cy="120" r="113" fill="url(#outerNavy)" />

      {/* 3. INNER WHITE CONCENTRIC SEPARATOR STRIP */}
      <circle cx="120" cy="120" r="85" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />

      {/* 4. TEXT ON PATHS (UPPERCASE MAIN TITLE & SUBTITLE) */}
      <text fill="#ffffff" fontSize="10.8px" fontWeight="900" fontFamily='system-ui, -apple-system, sans-serif' letterSpacing="0.4">
        <textPath href="#topCircleTextPath" startOffset="50%" textAnchor="middle">
          ROBOTIC & IOT TRAINING INSTITUTE, BHUTAN
        </textPath>
      </text>

      <text fill="#fef08a" fontSize="9.8px" fontWeight="900" fontFamily='system-ui, -apple-system, sans-serif' letterSpacing="0.3">
        <textPath href="#bottomCircleTextPath" startOffset="50%" textAnchor="middle">
          WHERE INNOVATION MEETS TRADITION
        </textPath>
      </text>

      {/* 5. SPLENDID 3D GEAR SEPARATORS ON CIRCLE FLANK */}
      {/* Left Gear */}
      <g transform="translate(25, 146) scale(0.75)" fill="#FBBF24" stroke="#D97706" strokeWidth="0.5">
         <circle cx="0" cy="0" r="6" />
         <path d="M -2,-8 L 2,-8 L 3,-5 L -3,-5 Z" />
         <path d="M -2,-8 L 2,-8 L 3,-5 L -3,-5 Z" transform="rotate(45)" />
         <path d="M -2,-8 L 2,-8 L 3,-5 L -3,-5 Z" transform="rotate(90)" />
         <path d="M -2,-8 L 2,-8 L 3,-5 L -3,-5 Z" transform="rotate(135)" />
         <path d="M -2,-8 L 2,-8 L 3,-5 L -3,-5 Z" transform="rotate(180)" />
         <path d="M -2,-8 L 2,-8 L 3,-5 L -3,-5 Z" transform="rotate(225)" />
         <path d="M -2,-8 L 2,-8 L 3,-5 L -3,-5 Z" transform="rotate(270)" />
         <path d="M -2,-8 L 2,-8 L 3,-5 L -3,-5 Z" transform="rotate(315)" />
         <circle cx="0" cy="0" r="2.5" fill="#0B3050" />
      </g>

      {/* Right Gear */}
      <g transform="translate(215, 146) scale(0.75)" fill="#FBBF24" stroke="#D97706" strokeWidth="0.5">
         <circle cx="0" cy="0" r="6" />
         <path d="M -2,-8 L 2,-8 L 3,-5 L -3,-5 Z" />
         <path d="M -2,-8 L 2,-8 L 3,-5 L -3,-5 Z" transform="rotate(45)" />
         <path d="M -2,-8 L 2,-8 L 3,-5 L -3,-5 Z" transform="rotate(90)" />
         <path d="M -2,-8 L 2,-8 L 3,-5 L -3,-5 Z" transform="rotate(135)" />
         <path d="M -2,-8 L 2,-8 L 3,-5 L -3,-5 Z" transform="rotate(180)" />
         <path d="M -2,-8 L 2,-8 L 3,-5 L -3,-5 Z" transform="rotate(225)" />
         <path d="M -2,-8 L 2,-8 L 3,-5 L -3,-5 Z" transform="rotate(270)" />
         <path d="M -2,-8 L 2,-8 L 3,-5 L -3,-5 Z" transform="rotate(315)" />
         <circle cx="0" cy="0" r="2.5" fill="#0B3050" />
      </g>

      {/* 6. MEDIUM BLUE INNER CIRCULAR CANVAS */}
      <circle cx="120" cy="120" r="82.5" fill="url(#innerBlue)" />

      {/* 7. CLOUD & WIRELESS SMART IOT DATA STACKS ABOVE HEAD */}
      {/* Wireless signal waves (radiating towards top-right) */}
      <path d="M 125,48 A 12,12 0 0,1 137,60" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M 127,42 A 18,18 0 0,1 145,60" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M 129,36 A 24,24 0 0,1 153,60" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Fluffy white smart cloud */}
      <path d="M 106,73 C 103,73 100,70 100,67 C 100,63 104,61 108,61 C 110,55 116,50 122,50 C 128,50 133,54 135,60 C 139,60 142,63 142,67 C 142,71 139,73 135,73 Z" fill="url(#cloudWhite)" stroke="#D1D5DB" strokeWidth="0.5" />
      
      {/* 3 stacked server cylinders on top of cloud */}
      <g>
        {/* Yellow (top) */}
        <rect x="114" y="58" width="12" height="3" rx="1" fill="#FBBF24" stroke="#D97706" strokeWidth="0.3" />
        <circle cx="116.5" cy="59.5" r="0.4" fill="#047857" />
        <circle cx="123.5" cy="59.5" r="0.4" fill="#047857" />
        
        {/* Green (middle) */}
        <rect x="114" y="62" width="12" height="3" rx="1" fill="#10B981" stroke="#047857" strokeWidth="0.3" />
        <circle cx="116.5" cy="63.5" r="0.4" fill="#FFF" />
        <circle cx="123.5" cy="63.5" r="0.4" fill="#FFF" />
        
        {/* Orange (bottom) */}
        <rect x="114" y="66" width="12" height="3" rx="1" fill="#F97316" stroke="#C2410C" strokeWidth="0.3" />
        <circle cx="116.5" cy="67.5" r="0.4" fill="#FFF" />
        <circle cx="123.5" cy="67.5" r="0.4" fill="#FFF" />
      </g>

      {/* 8. ROBOT HEAD */}
      <g>
        {/* Head Shell Body (Metallic Grey capsule) */}
        <rect x="85" y="93" width="70" height="34" rx="17" fill="url(#metalChrome)" stroke="#4B5563" strokeWidth="1" />
        <rect x="88" y="95" width="64" height="15" rx="7.5" fill="#FFFFFF" opacity="0.3" /> {/* Top Highlight */}

        {/* Left ear cap (with yellow glowing indicator light) */}
        <rect x="79" y="101" width="6" height="18" rx="2" fill="url(#chassisDark)" />
        <rect x="76" y="104" width="3" height="12" rx="0.5" fill="#FBBF24" />

        {/* Right ear cap (with yellow glowing indicator light) */}
        <rect x="155" y="101" width="6" height="18" rx="2" fill="url(#chassisDark)" />
        <rect x="159" y="104" width="3" height="12" rx="0.5" fill="#FBBF24" />

        {/* Big high-contrast goggles goggles display */}
        <rect x="94" y="98" width="52" height="24" rx="12" fill="#1E293B" stroke="#64748B" strokeWidth="1" />
        
        {/* Inner high-contrast dark center area (bezel) */}
        <path d="M 97,110 C 97,105 101,102 120,103 C 139,102 143,105 143,110 C 143,115 139,118 120,117 C 101,118 97,115 97,110 Z" fill="#090E17" />

        {/* Adorable custom glowing LED "smile" eyes (made of multiple dot paths) */}
        <g stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" opacity="0.95">
          {/* Left Smiley eye */}
          <path d="M 103.5,112.5 Q 107.5,108.5 111.5,112.5" strokeDasharray="0.1 2.2" />
          
          {/* Right Smiley eye */}
          <path d="M 128.5,112.5 Q 132.5,108.5 136.5,112.5" strokeDasharray="0.1 2.2" />
        </g>

        {/* Glass gloss/reflection */}
        <path d="M 96,104 Q 120,108 144,104" stroke="url(#gogglesReflection)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      </g>

      {/* 9. THE NECK SUPPORT STRUCTURE */}
      <rect x="113" y="127" width="14" height="6" rx="1" fill="url(#chassisDark)" />

      {/* 10. TRADITIONAL BHUTANESE GHO CHECKERED DRESS */}
      <g>
        {/* Main Torso */}
        <path d="M 106,133 L 134,133 L 140,169 L 100,169 Z" fill="url(#ghoPlaid)" stroke="#111827" strokeWidth="1" />

        {/* Traditional folded crossover white collar */}
        <path d="M 113,133 L 120,147 L 127,133 Z" fill="#FFFFFF" />
        {/* Outer red fold boundary of collar */}
        <path d="M 111,133 L 120,149 L 129,133" stroke="#DC2626" strokeWidth="1" fill="none" />

        {/* Custom yellow baseline edge at waist */}
        <rect x="99" y="169" width="42" height="3.5" rx="1" fill="#FBBF24" />

        {/* Conical supporting metal base bracket (under the Gho) */}
        <path d="M 105,172.5 L 135,172.5 L 127,189 L 113,189 Z" fill="url(#metalChrome)" stroke="#4B5563" strokeWidth="0.5" />
      </g>

      {/* 11. MECHANICAL ARMS AND THE GLORIOUS BHUTAN FLAG */}
      {/* Right Waving Metal Arm (Viewer Left) */}
      <g>
        {/* Shoulder Joint */}
        <circle cx="99" cy="144" r="5" fill="url(#chassisDark)" stroke="#94A3B8" strokeWidth="0.5" />
        {/* Upper Arm Segment */}
        <path d="M 99,144 L 84,142" stroke="url(#metalChrome)" strokeWidth="6" strokeLinecap="round" />
        {/* Elbow Joint */}
        <circle cx="84" cy="142" r="4.5" fill="url(#chassisDark)" />
        {/* Forearm bending upwards */}
        <path d="M 84,142 L 72.5,123.5" stroke="url(#metalChrome)" strokeWidth="5" strokeLinecap="round" />
        
        {/* Waving Dark Hand/Claw */}
        <circle cx="72.5" cy="123.5" r="4.5" fill="#334155" />
        {/* 3 Cute fingers waving */}
        <path d="M 72.5,123.5 L 61,120.5" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
        <path d="M 72.5,123.5 L 62.5,130" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
        <path d="M 72.5,123.5 L 70,135" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Left Standing Metal Arm Holding Flag (Viewer Right) */}
      <g>
        {/* Shoulder Joint */}
        <circle cx="141" cy="144" r="5" fill="url(#chassisDark)" stroke="#94A3B8" strokeWidth="0.5" />
        {/* Upper Arm */}
        <path d="M 141,144 L 152,148" stroke="url(#metalChrome)" strokeWidth="6" strokeLinecap="round" />
        {/* Elbow Joint */}
        <circle cx="152" cy="148" r="4.5" fill="url(#chassisDark)" />
        {/* Forearm reaching down to hold flag */}
        <path d="M 152,148 L 161.5,161.5" stroke="url(#metalChrome)" strokeWidth="5" strokeLinecap="round" />
        {/* Hand/Claw holding pole */}
        <circle cx="161.5" cy="161.5" r="4.5" fill="#334155" />
      </g>

      {/* Flagpole & Bhutan Flag */}
      <g>
        {/* Small metal flag pole held in hand */}
        <path d="M 161.5,175 L 161.5,128" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
        {/* Little golden round tip on top of pole */}
        <circle cx="161.5" cy="127" r="1.5" fill="url(#goldHighlight)" />

        {/* Sizable waving Bhutanese Flag */}
        {/* Flag fabric waving path */}
        <path 
          d="M 161.5,129 C 170,126 178,131 187.5,129 L 187.5,147 C 178,149 170,144 161.5,147 Z" 
          fill="#FFFFFF" 
          stroke="#1E293B" 
          strokeWidth="0.5" 
          id="bhutanFlagBase"
        />

        {/* Sliced colors of flag: Top-left Yellow, Bottom-right Orange */}
        <g>
          <path d="M 161.5,129 C 170,126 178,131 187.5,129 L 161.5,147 Z" fill="url(#goldHighlight)" />
          <path d="M 187.5,129 L 187.5,147 C 178,149 170,144 161.5,147 L 187.5,129 Z" fill="url(#bhutanOrange)" fillRule="evenodd" />
        </g>

        {/* Simplified stunning white dragon (Druk) in the center of flag */}
        <path 
          d="M 169,141 Q 173,135 178,139 Q 182,143 176,140" 
          stroke="#FFFFFF" 
          strokeWidth="1.6" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          fill="none" 
          className="drop-shadow-sm"
        />
        {/* Dragon claws/tail detail */}
        <circle cx="178" cy="139" r="0.6" fill="#FFFFFF" />
        <circle cx="169" cy="141" r="0.6" fill="#FFFFFF" />
      </g>
    </svg>
  );
};

const Welcome = ({ onStart }: { onStart: () => void }) => (
  <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-12 bg-[#F0F4F8] font-sans">
    <div className="relative">
      <motion.div 
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center justify-center"
      >
        <BhutanRoboticsLogo size={280} />
      </motion.div>
    </div>
    
    <div className="space-y-4 max-w-3xl">
      <h1 className="text-6xl md:text-7xl font-black text-dark tracking-tighter leading-none uppercase">
        Module 103
      </h1>
      <h2 className="text-3xl md:text-5xl font-black text-primary opacity-90 uppercase tracking-tight">
        Sensor Application
      </h2>
      <p className="text-xl text-gray-500 font-bold uppercase tracking-wide">
        Learn electronics through games and fun!
      </p>
    </div>

    <Button onClick={onStart} icon={Zap} variant="secondary">Get Started →</Button>
  </div>
);

const Dashboard = ({ setView }: { setView: (v: ViewType) => void }) => {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Top Header */}
      <header className="h-20 bg-white border-b-4 border-[#E2E8F0] px-8 flex items-center justify-between sticky top-0 z-20">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-[#1A1A1A] tracking-tight uppercase">Dashboard</h1>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Robotics & IoT Training Institute, Bhutan</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full border-4 border-[#4D96FF] shadow-sm overflow-hidden">
             <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=student" alt="User" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="p-8 flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto w-full pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full bg-white rounded-[40px] border-4 border-black/10 overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,0.05)] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,0.08)] transition-all duration-300"
        >
          {/* Visual Showcase */}
          <div className="relative aspect-[16/10.5] w-full overflow-hidden select-none bg-slate-900">
            <img 
              src="/src/assets/images/arduino_robot_workbench_1781075431742.png" 
              alt="Interactive Robotics & IoT Prototyping Station" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Ambient visual overlay at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            
            {/* Overlap Text Badge */}
            <div className="absolute top-6 left-6 bg-secondary text-dark px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
              Live Classroom
            </div>
          </div>

          {/* Details Bar below the Image */}
          <div className="p-8 bg-white flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-dark tracking-tight uppercase leading-none">
                Interactive Learning Hub
              </h3>
              <p className="text-sm text-gray-500 font-bold uppercase tracking-wide">
                Where innovation meets tradition in the kingdom of Bhutan
              </p>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={() => setView('sensor-library')}
                className="bg-primary hover:bg-primary-hover text-white font-black text-xs uppercase px-6 py-4 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] active:translate-y-[2px] active:shadow-none transition-all tracking-wider"
              >
                Learn Sensors
              </button>
              <button 
                onClick={() => setView('board-dashboard')}
                className="bg-secondary hover:bg-secondary-hover text-dark font-black text-xs uppercase px-6 py-4 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] active:translate-y-[2px] active:shadow-none transition-all tracking-wider"
              >
                Arduino Lab
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'sensor-library', label: 'Sensor Lab' },
  { id: 'board-dashboard', label: 'Arduino Lab' }
];

const Navigation = ({ currentView, setView }: { currentView: ViewType, setView: (v: ViewType) => void }) => {
  const { progress } = useProgress();

  return (
    <aside className="w-64 bg-primary flex flex-col p-6 text-white border-r-4 border-black/10 sticky top-0 h-screen hidden lg:flex shrink-0">
      <div className="flex flex-col items-center mb-8">
        <div className="mb-4">
          <BhutanRoboticsLogo size={130} />
        </div>
        <h2 className="font-black text-lg text-center leading-none uppercase tracking-tighter">Module 103</h2>
        <span className="bg-secondary text-dark px-3 py-1 rounded-full text-[8px] font-black mt-2 uppercase tracking-widest shadow-sm">Sensor Application</span>
      </div>

      <nav className="space-y-3">
        {NAV_ITEMS.map((item) => (
          <button 
            key={item.id}
            onClick={() => setView(item.id as ViewType)}
            className={`w-full py-3 px-4 rounded-xl flex items-center justify-center font-black uppercase text-[10px] tracking-widest transition-all ${
              currentView === item.id 
                ? 'bg-secondary text-dark border-b-4 border-black/20 translate-y-[2px]' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

const SensorLibrary = ({ setView, setSelectedSensor }: any) => (
  <div className="flex-1 flex flex-col min-h-screen">
    <header className="h-20 bg-white border-b-4 border-[#E2E8F0] px-8 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-6">
        <motion.button 
          whileHover={{ x: -5 }} 
          onClick={() => setView('dashboard')}
          className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border-2 border-gray-100 button-pop"
        >
          <ArrowLeft strokeWidth={3} />
        </motion.button>
        <h1 className="text-xl md:text-2xl font-black text-[#1A1A1A] tracking-tight uppercase">Sensor Lab</h1>
      </div>
    </header>

    <div className="p-8 flex-1 space-y-8 pb-32">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {SENSORS.map((sensor) => (
          <Card 
            key={sensor.id} 
            onClick={() => { setSelectedSensor(sensor); setView('sensor-detail'); }}
            className="flex flex-col items-center text-center space-y-4 py-8 group"
          >
            <div className={`w-20 h-20 rounded-3xl ${sensor.color} text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform`}>
              <sensor.icon size={40} strokeWidth={3} />
            </div>
            <h4 className="font-black text-lg text-dark uppercase tracking-tight">{sensor.name}</h4>
            <span className="text-[10px] font-black opacity-30 uppercase tracking-widest">{sensor.category}</span>
          </Card>
        ))}
      </div>
    </div>
  </div>
);

const BoardDashboard = ({ setView, setSelectedBoard }: any) => (
  <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
    <header className="h-20 bg-white border-b-4 border-[#E2E8F0] px-8 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-6">
        <motion.button 
          whileHover={{ x: -5 }} 
          onClick={() => setView('dashboard')}
          className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border-2 border-gray-100 button-pop"
        >
          <ArrowLeft strokeWidth={3} />
        </motion.button>
        <h1 className="text-xl md:text-2xl font-black text-[#1A1A1A] tracking-tight uppercase">Arduino Lab</h1>
      </div>
    </header>

    <div className="p-8 flex-1 space-y-12 pb-32">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BOARDS.map((board) => (
          <Card 
            key={board.id} 
            shadow={board.id === 'uno' ? "primary" : board.id === 'nano' ? "success" : "dark"} 
            className="p-0 overflow-hidden flex flex-col shadow-2xl min-h-[360px] h-full justify-between"
          >
            <div className="p-8 flex flex-col justify-between h-full bg-white">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    board.difficulty === 'Easy' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : board.difficulty === 'Medium' 
                      ? 'bg-amber-100 text-amber-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {board.difficulty}
                  </span>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{board.usb}</span>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter">{board.name}</h3>
                <p className="text-gray-500 leading-relaxed font-bold text-sm uppercase">{board.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {board.details.parts.slice(0, 3).map(p => (
                    <span key={p} className="bg-gray-100 px-3 py-1 rounded-lg text-[10px] font-black text-gray-400 uppercase tracking-widest">{p}</span>
                  ))}
                </div>
              </div>
              <div className="pt-6">
                <Button 
                  variant={board.id === 'uno' ? "primary" : board.id === 'nano' ? "accent" : "secondary"} 
                  onClick={() => { setSelectedBoard(board); setView('board-detail'); }} 
                  className="w-full"
                >
                  Learn Now →
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="bg-secondary rounded-[40px] p-10 flex flex-col md:flex-row items-center justify-between gap-8 border-4 border-black/10 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
        <div className="space-y-4 text-center md:text-left">
          <h3 className="text-4xl font-black text-dark uppercase tracking-tighter">Compare Boards</h3>
          <p className="text-dark/60 text-xl font-bold uppercase tracking-tight">Uno vs Nano vs Mega 2560: Which brain fits your robotics project?</p>
        </div>
        <Button variant="dark" onClick={() => setView('compare')} icon={ArrowRightLeft}>Start Comparison</Button>
      </div>
    </div>
  </div>
);

// --- Core App ---

export default function App() {
  const [view, setView] = useState<ViewType>('welcome');
  const [selectedSensor, setSelectedSensor] = useState<SensorData | null>(null);
  const [selectedBoard, setSelectedBoard] = useState<BoardData | null>(null);
  const { completeModule } = useProgress();

  const handleModuleFinish = (id: string, score: number) => {
    completeModule(id, score * 10);
    setView('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] text-dark font-sans selection:bg-primary/20 selection:text-primary">
      {view === 'welcome' ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Welcome onStart={() => setView('dashboard')} />
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className="flex flex-col lg:flex-row min-h-screen">
          <Navigation currentView={view} setView={setView} />
          
          <main className="flex-1 overflow-x-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                {view === 'dashboard' && <Dashboard setView={setView} />}
                
                {view === 'sensor-library' && (
                  <SensorLibrary setView={setView} setSelectedSensor={setSelectedSensor} />
                )}
                
                {view === 'board-dashboard' && (
                  <BoardDashboard setView={setView} setSelectedBoard={setSelectedBoard} />
                )}

                {view === 'sensor-detail' && selectedSensor && (
                  <div className="space-y-0 pb-32">
                    <header className="h-20 bg-white border-b-4 border-[#E2E8F0] px-8 flex items-center justify-between sticky top-0 z-20">
                      <div className="flex items-center gap-6">
                        <motion.button 
                          whileHover={{ x: -5 }} 
                          onClick={() => setView('sensor-library')}
                          className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border-2 border-gray-100 button-pop"
                        >
                          <ArrowLeft strokeWidth={3} />
                        </motion.button>
                        <h1 className="text-xl md:text-2xl font-black text-[#1A1A1A] tracking-tight uppercase">{selectedSensor.name}</h1>
                      </div>
                    </header>
                    <ModuleViewer 
                      module={selectedSensor} 
                      onFinish={(score) => handleModuleFinish(selectedSensor.id, score)} 
                    />
                  </div>
                )}

                {view === 'board-detail' && selectedBoard && (
                  <div className="space-y-0 pb-32">
                    <header className="h-20 bg-white border-b-4 border-[#E2E8F0] px-8 flex items-center justify-between sticky top-0 z-20">
                      <div className="flex items-center gap-6">
                        <motion.button 
                          whileHover={{ x: -5 }} 
                          onClick={() => setView('board-dashboard')}
                          className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border-2 border-gray-100 button-pop"
                        >
                          <ArrowLeft strokeWidth={3} />
                        </motion.button>
                        <h1 className="text-xl md:text-2xl font-black text-[#1A1A1A] tracking-tight uppercase">{selectedBoard.name}</h1>
                      </div>
                    </header>
                    <ModuleViewer 
                      module={selectedBoard} 
                      onFinish={(score) => handleModuleFinish(selectedBoard.id, score)} 
                      type="board"
                    />
                  </div>
                )}

                {view === 'compare' && <ComparisonView onBack={() => setView('board-dashboard')} />}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Moblie Bottom Nav */}
          <nav className="fixed bottom-0 left-0 right-0 bg-primary h-16 flex lg:hidden items-center justify-around z-50 border-t-4 border-black/10 px-4">
            {NAV_ITEMS.map((item) => (
              <button 
                key={item.id}
                onClick={() => setView(item.id as ViewType)}
                className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all ${
                  view === item.id ? 'bg-secondary text-dark hard-shadow-dark' : 'text-white'
                }`}
              >
                <span className="text-[10px] font-black uppercase tracking-widest">{item.label.split(' ')[0]}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}

function Header({ onBack, title }: { onBack: () => void, title: string }) {
  return (
    <div className="p-8 max-w-7xl mx-auto flex items-center gap-6">
      <motion.button 
        whileHover={{ x: -5 }} 
        onClick={onBack}
        className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100"
      >
        <ArrowLeft />
      </motion.button>
      <h2 className="text-3xl font-black">{title}</h2>
    </div>
  );
}

