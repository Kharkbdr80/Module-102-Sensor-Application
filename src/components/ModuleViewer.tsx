import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
// @ts-ignore
import arduinoUnoImg from '../assets/images/arduino_uno_board_1779428605614.png';
import arduinoMegaImg from '../assets/images/arduino_mega_board_1779971928669.png';
import arduinoNanoBreadboardImg from '../assets/images/arduino_nano_breadboard_1780035302832.png';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Play, 
  Volume2, 
  Info,
  Trophy,
  RotateCcw,
  Cpu,
  Zap,
  Bot,
  Gamepad2,
  Wind,
  Check,
  Trash2,
  Sparkles,
  PenTool
} from 'lucide-react';
import { Slide, MCQ, SensorData, BoardData } from '../types';
import { CircuitMasterGame } from './CircuitMasterGame';

// --- MCQ Component ---
const QuizView = ({ questions, onComplete }: { questions: MCQ[], onComplete: (score: number) => void }) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const handleNext = () => {
    const isCorrect = selected === questions[current].correct;
    const nextScore = score + (isCorrect ? 1 : 0);
    
    if (isCorrect) setScore(nextScore);
    
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      onComplete(nextScore);
    }
  };

  if (!questions || questions.length === 0) return null;
  const currentQ = questions[current];
  const isCorrect = selected === currentQ?.correct;

  return (
    <div className="space-y-8 max-w-2xl mx-auto p-4 md:p-8">
      {/* Quiz Header Branded Area */}
      <div className="flex justify-between items-center bg-white/60 backdrop-blur-md p-4 rounded-3xl border border-slate-100 shadow-sm">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-100 shadow-sm">
              <Trophy size={18} />
            </div>
            <div>
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">PEDAGOGICAL CHALLENGE</h4>
               <p className="text-xs font-black text-slate-800 uppercase tracking-tight mt-0.5">Arduino Mastery Quiz</p>
            </div>
         </div>
         <div className="flex items-center gap-4">
			<span className="text-[9px] font-black text-gray-500 uppercase tracking-wider bg-slate-100 px-3 py-1.5 rounded-xl">Question {current + 1} / {questions.length}</span>
			<span className="text-xs font-black text-[#00979c] bg-[#e6fcfc] px-3.5 py-1.5 rounded-xl border border-[#9bf5f7] shadow-sm">XP: {score * 10}</span>
         </div>
      </div>
      
      <div className="bg-white rounded-[40px] p-6 md:p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.06)] border-4 border-black/5 space-y-6 md:space-y-8">
        <h3 className="text-xl md:text-2xl font-black leading-snug uppercase tracking-tight text-slate-800">{currentQ?.question}</h3>
        
        <div className="grid gap-3.5">
          {currentQ.options.map((opt, idx) => (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.98 }}
              onClick={() => !showExplanation && setSelected(idx)}
              className={`p-5 rounded-2xl border-2 text-left transition-all font-black uppercase tracking-tight text-xs md:text-sm ${
                selected === idx 
                  ? 'border-[#00979c] bg-[#e6fcfc]/40 text-[#008084]' 
                  : 'border-slate-100 hover:border-slate-350 bg-slate-50 text-slate-600'
              } ${showExplanation && idx === currentQ.correct ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : ''}`}
            >
              <span className="mr-3 opacity-40 text-xs">{String.fromCharCode(65 + idx)}.</span>
              {opt}
            </motion.button>
          ))}
        </div>

        {selected !== null && !showExplanation && (
          <button 
            onClick={() => setShowExplanation(true)}
            className="w-full py-4 bg-slate-900 border-2 border-slate-950 text-white hover:bg-slate-850 rounded-2xl font-black text-sm uppercase tracking-widest button-pop"
          >
            Check My Science Result ✨
          </button>
        )}

        {showExplanation && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="p-6 md:p-8 bg-slate-50 border border-slate-150 rounded-[32px] space-y-5"
          >
            {/* Guide speaking bubble inside explain box */}
            <div className="flex gap-4 items-start">
               <div className="text-2xl shrink-0 p-3 bg-white rounded-2xl border border-slate-100 shadow-sm animate-pulse flex items-center justify-center">
                  {isCorrect ? '✨' : '📝'}
               </div>
               <div className="space-y-1">
                  <p className={`font-black text-lg md:text-xl uppercase tracking-tighter ${isCorrect ? 'text-emerald-600' : 'text-orange-500'}`}>
                    {isCorrect ? '🎉 Brilliant answer!' : '💡 Conceptual Review!'}
                  </p>
                  <p className="text-[10px] font-black tracking-wider text-slate-400 uppercase">
                     {isCorrect ? "Verification: Succeeded" : "Verification: Educational Insight"}
                  </p>
                  <p className="text-slate-600 text-xs md:text-sm font-bold uppercase tracking-tight leading-relaxed">
                     "{currentQ.explanation}"
                  </p>
               </div>
            </div>

            <button 
              onClick={handleNext} 
              className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest button-pop text-xs  flex items-center justify-center gap-2"
            >
              {current === questions.length - 1 ? 'Finish Challenge ⭐' : 'Next Mission →'}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// --- Interactive Slide Visualizer Components for Students ---

const RobotEyesVisual = () => {
  const [x, setX] = useState(25);
  const [direction, setDirection] = useState<'right' | 'left'>('right');
  const [obstacleX, setObstacleX] = useState(80);
  const [isAvoiding, setIsAvoiding] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [beamColor, setBeamColor] = useState('teal');
  const trackRef = useRef<HTMLDivElement>(null);

  // Computed Real-time Sensor Distance
  const rawDist = Math.abs(obstacleX - x);
  const distance = Math.max(2, Math.round(rawDist * 1.8));

  // Determine if robot is facing the obstacle
  const isFacingObstacle = (direction === 'right' && obstacleX > x) || (direction === 'left' && obstacleX < x);

  useEffect(() => {
    if (speed === 0 || isAvoiding) return;

    const interval = setInterval(() => {
      setX((prevX) => {
        const step = 0.5 * speed;
        let nextX = direction === 'right' ? prevX + step : prevX - step;

        // Auto-turn boundaries if obstacle is missing or skipped
        if (nextX >= 90) {
          setDirection('left');
          return 90;
        }
        if (nextX <= 10) {
          setDirection('right');
          return 10;
        }

        return nextX;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [direction, speed, isAvoiding]);

  // Handle obstacle proximity & trigger avoidance
  useEffect(() => {
    if (isFacingObstacle && distance <= 24 && !isAvoiding) {
      setIsAvoiding(true);
      setBeamColor('red');
      
      const timer = setTimeout(() => {
        setDirection(prev => prev === 'right' ? 'left' : 'right');
        setIsAvoiding(false);
        setBeamColor('teal');
      }, 950);

      return () => clearTimeout(timer);
    }
  }, [x, obstacleX, distance, isFacingObstacle, isAvoiding]);

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clampedObstacle = Math.max(5, Math.min(95, clickX));
    setObstacleX(clampedObstacle);
  };

  return (
    <div className="relative w-full h-full min-h-[365px] flex flex-col items-stretch justify-between bg-zinc-950 overflow-hidden p-4 rounded-[28px] select-none text-center">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      {/* Header status bar */}
      <div className="w-full flex justify-between items-center bg-slate-900/90 px-3.5 py-1.5 rounded-xl border border-slate-800 backdrop-blur-sm z-10 text-[9px] font-mono mb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-[pulse_1.5s_infinite]" />
          <span className="tracking-widest text-[#14b8a6] font-black uppercase">ROBOCRAFT SIMULATOR - SLIDE 1</span>
        </div>
        <span className="text-zinc-400 font-bold tracking-wider">REF: MODEL #04</span>
      </div>

      {/* TRACK CANVAS ZONE */}
      <div 
        ref={trackRef}
        onClick={handleTrackClick}
        className="relative h-40 bg-zinc-900/65 rounded-2xl border-2 border-zinc-800/80 cursor-crosshair flex flex-col justify-end p-2 overflow-hidden mb-3 group"
      >
        <div className="absolute top-2 left-3 flex items-center gap-2 text-[8px] font-mono text-zinc-500 font-black tracking-widest uppercase z-10 pointer-events-none">
          <span>📍 CLICK TRACK TO PLUG OBSTACLE</span>
        </div>
        
        {/* Dynamic status HUD display overlay */}
        <div className="absolute top-2 right-3 bg-zinc-950/85 px-2.5 py-1 rounded-lg border border-zinc-800/80 z-20 font-mono text-[8.5px] leading-relaxed flex items-center gap-2.5 pointer-events-none">
          <div className="flex items-center gap-1">
            <span className="text-zinc-500">MODE:</span>
            <span className={`font-black ${isAvoiding ? 'text-red-500 animate-pulse' : 'text-teal-400'}`}>
              {isAvoiding ? '🛑 REVERSE_AVOID' : '⚡ CRUISE_AUTO'}
            </span>
          </div>
          <div className="w-px h-2.5 bg-zinc-800" />
          <div className="flex items-center gap-1">
            <span className="text-zinc-500">DIST:</span>
            <span className="font-black text-amber-400">{distance} cm</span>
          </div>
        </div>

        {/* The Safety Cones / Obstacle Block */}
        <div 
          style={{ left: `${obstacleX}%` }}
          className="absolute bottom-5 -translate-x-1/2 flex flex-col items-center z-15 transition-all duration-150"
        >
          {/* Laser measurement pointer beam shining from obstacle to deck */}
          <div className="absolute bottom-8 w-[1px] h-24 border-l border-dashed border-red-500/25 pointer-events-none" />
          
          <div className="relative flex flex-col items-center">
            {/* Cone structure */}
            <div className="w-6 h-[26px] bg-gradient-to-t from-amber-600 via-amber-500 to-amber-600 rounded-t-sm relative border-x border-t border-amber-400 flex flex-col items-center justify-between shadow-2xl">
              {/* White reflectors */}
              <div className="w-full h-1.5 bg-stone-100 border-y border-amber-600 mt-1" />
              <div className="w-[18px] h-1 bg-stone-100 border-y border-amber-600 mb-0.5" />
              {/* Flashing hazard light beacon on top */}
              <span className={`absolute -top-3 w-2 h-2 rounded-full border border-yellow-250 z-10 ${
                isAvoiding 
                  ? 'bg-red-500 animate-[ping_0.3s_infinite]' 
                  : 'bg-yellow-400 animate-[pulse_1s_infinite]'
              }`} />
            </div>
            {/* Cone base plate */}
            <div className="w-10 h-1 bg-amber-700/90 rounded-sm border-t border-amber-600 shadow-md md:w-11" />
            
            {/* Click helper flag text */}
            <span className="text-[6.5px] font-mono leading-none bg-stone-900 border border-stone-800 text-stone-300 font-extrabold px-1 rounded-sm mt-1 uppercase shadow-xs">
              OBSTACLE
            </span>
          </div>
        </div>

        {/* THE REALISTIC PHYSICAL AUTONOMOUS ROVER */}
        <motion.div
          style={{ left: `${x}%` }}
          animate={{ scaleX: direction === 'right' ? 1 : -1 }}
          transition={{ type: "spring", stiffness: 155 }}
          className="absolute bottom-5 -translate-x-1/2 flex flex-col items-center z-20"
        >
          {/* Front Sensing Echo Sonar Spray Beam Waves */}
          {isFacingObstacle && (
            <div className="absolute bottom-16 left-full flex items-center pointer-events-none pl-3 origin-left">
              {[...Array(4)].map((_, i) => {
                const animDelay = i * 0.18;
                return (
                  <motion.div
                    key={i}
                    animate={{
                      opacity: isAvoiding ? [0.1, 1, 0.1] : [0.03, 0.45, 0.03],
                      scaleY: isAvoiding ? [0.6, 1.45, 0.6] : [0.4, 0.9, 0.4],
                      x: isAvoiding ? [0, 8] : [0, 22]
                    }}
                    transition={{
                      duration: isAvoiding ? 0.35 : 1.1,
                      repeat: Infinity,
                      delay: animDelay
                    }}
                    className={`w-1 h-14 border-r-3 border-dashed rounded-full shrink-0 ${
                      isAvoiding ? 'border-red-500' : 'border-teal-400'
                    }`}
                  />
                );
              })}
            </div>
          )}

          {/* Core Steel-Gray Metallic Robot Model */}
          <div className="relative flex flex-col items-center">
            {/* 1. Antenna back post with flashing blue telemetry light */}
            <div className="absolute -top-5 -left-1 flex flex-col items-center">
              <div className="w-0.5 h-6 bg-zinc-650" />
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping absolute -top-1" />
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 absolute -top-1" />
            </div>

            {/* 2. Microscopic HC-SR04 Module (Robot Eyes/Head) */}
            <div className={`relative px-1.5 py-0.5 bg-gradient-to-r from-teal-950 via-teal-900 to-teal-950 border-2 rounded-lg flex items-center justify-center gap-1 shadow-xl z-10 transition-all ${
              isAvoiding ? 'border-red-500 shadow-red-500/10' : 'border-[#00878C]'
            }`}>
              {/* Solder pins base board connection */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-4 h-1.5 bg-amber-500/80 rounded-xs border-x border-amber-400" />
              
              {/* Speaker eye (TX) */}
              <div className="relative w-[18px] h-[18px] bg-zinc-950 rounded-full border border-stone-500 flex items-center justify-center shadow-inner">
                <div className="w-2.5 h-2.5 bg-stone-900 rounded-full border border-dashed border-emerald-400/50 flex items-center justify-center">
                  <span className="text-[4px] font-mono text-emerald-400 scale-[0.8]">TX</span>
                </div>
              </div>

              {/* Mic eye (RX) */}
              <div className="relative w-[18px] h-[18px] bg-zinc-950 rounded-full border border-stone-500 flex items-center justify-center shadow-inner">
                <div className="w-2.5 h-2.5 bg-stone-900 rounded-full border border-dashed border-cyan-400/50 flex items-center justify-center">
                  <span className="text-[4px] font-mono text-cyan-400 scale-[0.8]">RX</span>
                </div>
              </div>
            </div>

            {/* 3. Servo Bracket Gimbal Servo */}
            <div className="w-3 h-2 bg-stone-750 border border-stone-600 rounded-xs -mt-px shadow-xs" />

            {/* 4. Robotic Chassis Platform Frame */}
            <div className="w-16 h-[18px] bg-zinc-800 border-2 border-stone-600 rounded-lg flex items-center justify-between px-1.5 relative shadow-md">
              {/* Electric bus lines printed on side */}
              <div className="w-6 h-0.5 bg-[#facc15]/30 rounded-full" />
              <div className="w-4 h-0.5 bg-[#f59e0b]/35 rounded-full" />
              
              {/* Battery pack unit on deck */}
              <div className="absolute -top-2 right-2 w-5 h-2 bg-gradient-to-r from-red-600 to-red-700 rounded-xs border border-red-500/50 flex justify-around p-0.5 shadow-xs">
                <div className="w-px h-full bg-zinc-900" />
                <div className="w-px h-full bg-zinc-900" />
              </div>
            </div>

            {/* 5. Dual high-grip tires on bottom */}
            <div className="flex gap-4 -mt-1 w-14 justify-between z-10 px-0.5">
              {/* Wheel Left */}
              <div className="relative">
                <div className={`w-5 h-5 rounded-full bg-black border-2 border-stone-600 flex items-center justify-center shadow-md ${
                  !isAvoiding && speed > 0 ? 'animate-[spin_1.5s_linear_infinite]' : ''
                }`}>
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-700 border border-stone-600 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-stone-400" />
                  </div>
                  {/* Wheel thread ticks */}
                  <div className="absolute w-full h-[1px] bg-stone-550 top-1/2 left-0 -translate-y-1/2 opacity-35" />
                  <div className="absolute w-[1px] h-full bg-stone-550 left-1/2 top-0 -translate-x-1/2 opacity-35" />
                </div>
              </div>
              {/* Wheel Right */}
              <div className="relative">
                <div className={`w-5 h-5 rounded-full bg-black border-2 border-stone-600 flex items-center justify-center shadow-md ${
                  !isAvoiding && speed > 0 ? 'animate-[spin_1.5s_linear_infinite]' : ''
                }`}>
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-700 border border-stone-600 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-stone-400" />
                  </div>
                  {/* Wheel thread ticks */}
                  <div className="absolute w-full h-[1px] bg-stone-550 top-1/2 left-0 -translate-y-1/2 opacity-35" />
                  <div className="absolute w-[1px] h-full bg-stone-550 left-1/2 top-0 -translate-x-1/2 opacity-35" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Track bottom floor lane guard with distance markers */}
        <div className="w-full h-1 border-t-2 border-dashed border-zinc-700 flex justify-between px-4 text-[7px] font-mono text-zinc-500 font-extrabold select-none mt-2">
          <span>0 cm</span>
          <span>15 cm</span>
          <span>30 cm</span>
          <span>45 cm</span>
          <span>60 cm</span>
          <span>75 cm</span>
        </div>
      </div>

      {/* FOOTER DESCRIPTIVE PIN / SPEAKER BOARD GLANCE (DOES NOT OVERLAP CONES OR TRACKS) */}
      <div className="w-full bg-slate-900/90 border border-slate-800 px-3.5 py-2.5 rounded-2xl z-10 text-left space-y-2 mt-auto">
        <p className="text-[8px] font-black text-[#14b8a6] uppercase tracking-widest leading-none mb-1">
          💡 HOW ROBOT AVOIDANCE WORKS IN SLIDE 1
        </p>
        <div className="flex items-start gap-2.5">
          <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] flex items-center justify-center font-black shrink-0">1</div>
          <p className="text-[9.5px] text-zinc-300 font-bold uppercase tracking-tight leading-snug">
            <strong className="text-emerald-400">TX SONAR PULSE:</strong> Triggers ultrasonic speaker to "shout" high-frequency soundwaves forward in direction of travel.
          </p>
        </div>
        <div className="flex items-start gap-2.5">
          <div className="w-4 h-4 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[8px] flex items-center justify-center font-black shrink-0">2</div>
          <p className="text-[9.5px] text-zinc-300 font-bold uppercase tracking-tight leading-snug">
            <strong className="text-cyan-400">RX ECHO MEASUREMENT:</strong> Micro microphone lens captures rebounds, calculates elapsed travel time, triggers safety pivot instantly!
          </p>
        </div>
      </div>
    </div>
  );
};

const ElectronicRulerVisual = () => {
  return (
    <div className="relative w-full h-full min-h-[290px] flex flex-col items-center justify-between bg-zinc-950 overflow-hidden p-5 rounded-[28px] select-none text-center">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
      
      {/* Header status */}
      <div className="w-full flex justify-between items-center bg-slate-900/80 px-3.5 py-1.5 rounded-xl border border-slate-800 backdrop-blur-sm z-10 text-[9px] font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-sky-500 animate-[pulse_1.5s_infinite]" />
          <span className="tracking-widest text-[#0ea5e9] font-black uppercase">SPEED OF SOUND SPECS</span>
        </div>
        <span className="text-slate-400 font-bold tracking-wider">PHYSICS CORE</span>
      </div>

      {/* Elegant mathematical catalog grid layout representing measurements */}
      <div className="grid grid-cols-2 gap-2.5 w-full z-10 my-auto">
         <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-2xl text-left shadow-md flex flex-col justify-between">
            <span className="text-[7.5px] font-black uppercase tracking-widest text-zinc-400 block">SOUND SPEED (AIR)</span>
            <div className="mt-1">
               <span className="text-xl font-mono font-black text-sky-400">343 <span className="text-xs font-sans">m/s</span></span>
               <span className="text-[8px] text-zinc-500 font-bold block leading-normal mt-0.5 uppercase">Traveling 34.3 cm every single millisecond.</span>
            </div>
         </div>

         <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-2xl text-left shadow-md flex flex-col justify-between">
            <span className="text-[7.5px] font-black uppercase tracking-widest text-zinc-400 block">THE MATH SPLIT</span>
            <div className="mt-1">
               <span className="text-xl font-mono font-black text-[#f59e0b]">TIME / 2</span>
               <span className="text-[8px] text-zinc-500 font-bold block leading-normal mt-0.5 uppercase">Divide transit time by 2 to measure only ONE way trip!</span>
            </div>
         </div>
      </div>

      {/* Graphic representation of the equation */}
      <div className="w-full bg-slate-900/60 border border-slate-800 p-3 rounded-2xl z-10 text-left">
         <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5 text-center">THE SONIC CALCULATOR FORMULA</div>
         <div className="bg-zinc-950 border border-zinc-855 p-2.5 rounded-xl flex items-center justify-center font-mono text-zinc-100 text-[10px] tracking-wide font-black">
            <span className="text-[#10b981]">Distance</span>
            <span className="mx-1.5 text-zinc-500">=</span>
            <span className="text-sky-400">(Speed × Time)</span>
            <span className="mx-1.5 text-zinc-500">/</span>
            <span className="text-[#f59e0b]">2</span>
         </div>
      </div>
    </div>
  );
};

const HowItWorksVisual = () => {
  return (
    <div className="relative w-full h-full min-h-[290px] flex flex-col items-center justify-between bg-zinc-950 overflow-hidden p-5 rounded-[28px] select-none text-center">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
      
      {/* Header status */}
      <div className="w-full flex justify-between items-center bg-slate-900/80 px-3.5 py-1.5 rounded-xl border border-slate-800 backdrop-blur-sm z-10 text-[9px] font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-[pulse_1.5s_infinite]" />
          <span className="tracking-widest text-[#22c55e] font-black uppercase">THE 3-STEP PING JOURNEY</span>
        </div>
        <span className="text-zinc-500 font-bold tracking-wider">FLOW DIAGRAM</span>
      </div>

      {/* Main step-by-step sequential flowchart block */}
      <div className="w-full space-y-2 z-10 my-auto">
         <div className="flex gap-3 bg-zinc-900 border border-zinc-800 p-2.5 rounded-2xl text-left items-center">
            <div className="w-6 h-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-center text-emerald-400 text-[10px] font-black shrink-0">1</div>
            <div>
               <h6 className="text-[9px] font-black text-zinc-100 uppercase tracking-wider mb-0.5">Step 1: The Trigger Shout</h6>
               <p className="text-[8px] text-zinc-400 font-bold uppercase leading-relaxed text-zinc-400">Arduino triggers HC-SR04 to shout an ultrasonic sound wave pulse in the air.</p>
            </div>
         </div>

         <div className="flex gap-3 bg-zinc-900 border border-zinc-800 p-2.5 rounded-2xl text-left items-center">
            <div className="w-6 h-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl flex items-center justify-center text-yellow-550 text-[10px] font-black shrink-0 text-yellow-500">2</div>
            <div>
               <h6 className="text-[9px] font-black text-zinc-100 uppercase tracking-wider mb-0.5">Step 2: The Object Collision</h6>
               <p className="text-[8px] text-zinc-400 font-bold uppercase leading-relaxed text-zinc-400">The sonic wave travels outward, strikes an obstacle, and rebounds back like an echo.</p>
            </div>
         </div>

         <div className="flex gap-3 bg-zinc-900 border border-zinc-850 p-2.5 rounded-2xl text-left items-center">
            <div className="w-6 h-6 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex items-center justify-center text-cyan-404 text-[10px] font-black shrink-0 text-cyan-400">3</div>
            <div>
               <h6 className="text-[9px] font-black text-zinc-100 uppercase tracking-wider mb-0.5">Step 3: The Echo Capture</h6>
               <p className="text-[8px] text-zinc-400 font-bold uppercase leading-relaxed text-zinc-400">The receiver microphone catches the rebound wave and tells the Arduino chip immediately.</p>
            </div>
         </div>
      </div>
    </div>
  );
};

const RealLifeUsesVisual = () => {
  return (
    <div className="relative w-full h-full min-h-[290px] flex flex-col items-center justify-between bg-zinc-950 overflow-hidden p-5 rounded-[28px] select-none text-center">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
      
      {/* Header status */}
      <div className="w-full flex justify-between items-center bg-slate-900/80 px-3.5 py-1.5 rounded-xl border border-slate-800 backdrop-blur-sm z-10 text-[9px] font-mono">
        <div className="flex items-center gap-1.5 font-bold tracking-widest text-[#f43f5e]">
          <span className="w-2 h-2 rounded-full bg-[#f43f5e] animate-[pulse_1.5s_infinite]" />
          <span>REAL WORLD CONTROLS</span>
        </div>
        <span className="text-zinc-500 font-bold uppercase">APPLICATIONS</span>
      </div>

      {/* Main active representation */}
      <div className="w-full max-w-[340px] flex flex-col items-center gap-2 z-10 my-auto">
         {/* Grid displaying simulated items */}
         <div className="grid grid-cols-2 gap-2 w-full">
            <div className="bg-zinc-900 p-2.5 rounded-xl flex items-center gap-2 border border-zinc-805">
               <span className="text-xl">🚗</span>
               <div className="text-left font-sans">
                  <h6 className="text-[8px] font-black text-zinc-100 uppercase tracking-wider">PARKING ASSIST</h6>
                  <p className="text-[6.5px] text-zinc-400 font-bold uppercase leading-none mt-0.5">Detects walls behind cars.</p>
               </div>
            </div>

            <div className="bg-zinc-900 p-2.5 rounded-xl flex items-center gap-2 border border-zinc-805">
               <span className="text-xl">🧼</span>
               <div className="text-left font-sans">
                  <h6 className="text-[8px] font-black text-zinc-100 uppercase tracking-wider">SOAP VALVE</h6>
                  <p className="text-[6.5px] text-zinc-400 font-bold uppercase leading-none mt-0.5">Dispenses when hands stay near.</p>
               </div>
            </div>

            <div className="bg-zinc-900 p-2.5 rounded-xl flex items-center gap-2 border border-zinc-805">
               <span className="text-xl">🍶</span>
               <div className="text-left font-sans">
                  <h6 className="text-[8px] font-black text-zinc-100 uppercase tracking-wider">TANK HEIGHT</h6>
                  <p className="text-[6.5px] text-zinc-400 font-bold uppercase leading-none mt-0.5">Signals fluid level capacities.</p>
               </div>
            </div>

            <div className="bg-zinc-900 p-2.5 rounded-xl flex items-center gap-2 border border-zinc-805">
               <span className="text-xl">🤖</span>
               <div className="text-left font-sans">
                  <h6 className="text-[8px] font-black text-zinc-100 uppercase tracking-wider">AGV GUIDE</h6>
                  <p className="text-[6.5px] text-zinc-400 font-bold uppercase leading-none mt-0.5 text-emerald-400">Avoids corridor walls.</p>
               </div>
            </div>
         </div>
      </div>

      <div className="w-full text-center text-[8.5px] text-zinc-400 font-black uppercase tracking-widest bg-zinc-900 border border-zinc-850 p-2 rounded-xl z-10 animate-[pulse_1.5s_infinite]">
         ⚙️ Industry ultrasonic arrays operate on the exact same acoustic bounce principles!
      </div>
    </div>
  );
};

const EcholocationVisual = () => {
  return (
    <div className="relative w-full h-full min-h-[290px] flex flex-col items-center justify-between bg-zinc-950 overflow-hidden p-5 rounded-[28px] select-none text-center">
      <div className="absolute inset-0 bg-[radial-gradient(#a855f7_1px,transparent_1px)] bg-[size:16px_16px] opacity-10 pointer-events-none" />
      
      {/* Header status */}
      <div className="w-full flex justify-between items-center bg-slate-900/80 px-3.5 py-1.5 rounded-xl border border-slate-800 backdrop-blur-sm z-10 text-[9px] font-mono font-bold">
        <div className="flex items-center gap-1.5 uppercase tracking-widest text-[#a855f7]">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-[pulse_1.5s_infinite]" />
          <span>Biological Radar Detect</span>
        </div>
        <span className="text-zinc-400 font-bold uppercase">ECHOLOCATION</span>
      </div>

      {/* Main active representation representing the slide */}
      <div className="relative flex flex-col items-center justify-center my-auto py-2 z-10 w-full max-w-[280px]">
         <div className="w-full h-24 bg-zinc-900/80 rounded-2xl border border-zinc-850 flex items-center justify-around p-4 relative overflow-hidden">
            {/* Bat illustration side */}
            <div className="flex flex-col items-center text-center">
               <span className="text-3xl">🦇</span>
               <span className="text-[8px] font-black text-purple-400 uppercase tracking-widest mt-1">BAT SECTOR</span>
            </div>

            {/* Sound Wave vectors moving forward and backwards */}
            <div className="flex flex-col gap-1 items-center justify-center">
               <div className="flex gap-1.5 animate-pulse">
                  {[...Array(3)].map((_, i) => (
                    <span key={i} className="w-1 h-4 rounded-full bg-purple-500/60" />
                  ))}
               </div>
               <span className="text-[5px] font-mono tracking-widest text-zinc-400 uppercase">SONAR</span>
            </div>

            {/* Target prey insect moth */}
            <div className="flex flex-col items-center text-center animate-bounce">
               <span className="text-2xl">🦋</span>
               <span className="text-[8px] font-black text-[#fee2e2] uppercase mt-1.5 bg-red-950 px-1 rounded">FLY MOTH</span>
            </div>
         </div>
      </div>

      <div className="flex justify-around items-center w-full bg-zinc-900 border border-zinc-850 p-2 rounded-xl text-[8.5px] font-black text-zinc-400 uppercase tracking-widest z-10 font-bold">
        <div className="flex flex-col bg-slate-950 p-1 rounded">
          <span className="text-purple-400 font-extrabold text-purple-500">ECHO RECEPT 🦇</span>
          <span className="text-[6px] text-zinc-500 mt-0.5">TX (Speaker)</span>
        </div>
        <div className="flex flex-col bg-slate-950 p-1 rounded">
          <span className="text-[#10b981] font-bold">EARS 🎧</span>
          <span className="text-[6px] text-zinc-500 mt-0.5 font-bold">RX (Mic)</span>
        </div>
      </div>
    </div>
  );
};

const DefaultSensorDashboardVisual = ({ module }: { module: any }) => {
  const SensorIcon = module.icon || Cpu;
  const sensorColor = module.color || 'bg-slate-500';

  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-zinc-950 overflow-hidden p-5 rounded-[28px] select-none text-center">
      <div className="absolute inset-0 bg-slate-900/40 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:16px_16px] opacity-[0.05]" />
      
      <div className="w-full flex justify-between items-center bg-slate-900/60 px-4 py-2 rounded-xl border border-slate-800/80 backdrop-blur-sm z-10">
         <span className="font-mono text-[9px] tracking-widest text-[#22c55e] font-black uppercase">LIVE OBSERVATORY</span>
         <span className="text-[10px] font-mono text-zinc-500 uppercase font-black">{module.category || 'Arduino Component'}</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center my-4 relative">
        <motion.div 
          animate={{
             y: [-6, 6, -6],
             scale: [0.98, 1.02, 0.98],
             rotate: [0, 2, -2, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-20 h-20 rounded-full flex items-center justify-center border-4 border-slate-700/80 shadow-[0_0_20px_rgba(0,0,0,0.6)] bg-slate-900"
        >
          <div className="absolute inset-[-6px] border border-slate-800 rounded-full border-dashed animate-[spin_20s_linear_infinite]" />
          <div className="absolute inset-[-14px] border border-slate-800/60 rounded-full border-dashed animate-[spin_30s_linear_infinite_reverse]" />
          <div className="p-4 bg-slate-950 rounded-full border border-slate-800 font-bold">
             <SensorIcon className="w-8 h-8 text-white font-bold" />
          </div>
        </motion.div>
        
        <div className="mt-4 bg-slate-900 border border-slate-800 py-1.5 px-4 rounded-xl shadow w-full max-w-[200px]">
          <span className="text-xs font-black text-slate-200 block leading-none">{module.name}</span>
          <span className="text-[8px] text-zinc-500 font-bold block mt-1 uppercase tracking-wider">{module.category} MODULE</span>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-2 rounded-xl text-center">
         <span className="text-[9px] text-zinc-400 font-bold leading-normal block">
           Complete slides to unlock active sandbox & coding challenges for this {module.name}!
    </span>
      </div>
    </div>
  );
};

const ArduinoInteractiveSlideVisual = ({ moduleId, slideIndex }: { moduleId: string; slideIndex: number }) => {
  const isUno = moduleId === 'uno';
  const isNano = moduleId === 'nano';
  const isMega = moduleId === 'mega';
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  // Sync selectedPart with slideIndex when the user flips slides
  useEffect(() => {
    if (slideIndex === 0) {
      setSelectedPart('brain');
    } else if (slideIndex === 1) {
      setSelectedPart('digital');
    } else if (slideIndex === 2) {
      setSelectedPart('analog');
    } else if (slideIndex === 3) {
      setSelectedPart('power');
    } else {
      setSelectedPart(null);
    }
  }, [slideIndex]);

  // Determine active item to highlight and describe (supporting both manual click override and standard auto-slides)
  const activePart = selectedPart || (
    slideIndex === 0 ? 'brain' :
    slideIndex === 1 ? 'digital' :
    slideIndex === 2 ? 'analog' :
    slideIndex === 3 ? 'power' : null
  );

  const isBrainHighlighted = activePart === 'brain';
  const isDigitalHighlighted = activePart === 'digital';
  const isAnalogHighlighted = activePart === 'analog';
  const isPowerHighlighted = activePart === 'power';
  const isUsbHighlighted = activePart === 'usb';
  const isResetHighlighted = activePart === 'reset';
  const isPowerJackHighlighted = activePart === 'power_jack';
  const isSerialMcuHighlighted = activePart === 'serial_mcu';
  const isRegulatorHighlighted = activePart === 'regulator';
  const isCrystalHighlighted = activePart === 'crystal';
  const isIcspHighlighted = activePart === 'icsp';
  const isLedsHighlighted = activePart === 'leds';
  const isOopsHighlighted = isUno && slideIndex === 5;

  const getExplanation = () => {
    if (activePart === 'brain') {
      if (isMega) {
        return "🧠 [Label 1] ATmega2560 BRAIN CHIP: The prime high-performance microcontroller with 256 KB Flash and 8 KB SRAM executing firmware loop commands!";
      }
      return "🧠 MICROCONTROLLER CHIP (ATmega328P) ACTS AS THE BRAIN, EXECUTING PROGRAMMED CODE INSTRUCTIONS!";
    }
    if (activePart === 'digital') {
      if (isMega) {
        return "🔌 [Label 5] DIGITAL & PWM HEADERS: 54 configurable general-purpose I/O pins (0-53) and 15 hardware PWM channel controllers supporting scale robotics!";
      }
      return "🔌 DIGITAL PINS (0–13) SEND & RECEIVE BINARY ELECTRICITY (HIGH/5V OR LOW/0V) FOR SENSORS AND LEDS!";
    }
    if (activePart === 'analog') {
      if (isMega) {
        return "🎛️ [Label 6] ANALOG INPUT SOCKETS: 16 high-precision analog-to-digital measurement sockets (A0–A15) capturing variable sensor voltages.";
      }
      return "🎛️ ANALOG INPUT PINS (A0–A5) READ CONTINUOUS MULTI-LEVEL SIGNALS (0 TO 1023) LIKE TEMPERATURE OR LIGHT!";
    }
    if (activePart === 'power') {
      if (isMega) {
        return "⚡ [Label 7] POWER INTERFACE SOCKETS: Outputs stable regulated 3.3V/5V and GND supply rails, taking external power feeds via the Vin pin.";
      }
      return "⚡ POWER PINS SUPPLY STABLE 5V, 3.3V, AND GROUND (GND) CURRENT SO COMPONENTS WORK PROPERLY!";
    }
    if (activePart === 'usb') {
      if (isMega) {
        return "💻 [Label 2] USB TYPE-B PORT: Robust connection port supplying clean 5V USB power and handling computer-board UART serial communications.";
      }
      return "💻 USB PORT ENABLES COMMUNICATION PATHWAY FOR COMPUTER PROGRAM PLUGGING & CO-INTEGRATED POWER SUPPLY!";
    }
    if (activePart === 'reset') {
      if (isMega) {
        return "🔴 RESET BUTTON: Tactical micro-switch pulling the reset line to GND to restart CPU instructions from code line 1.";
      }
      return "🔴 RESET BUTTON REBOOTS THE MICROCONTROLLER CHIP'S MIND, STARTING THE CODE OVER FROM THE TOP LINE!";
    }
    if (activePart === 'power_jack') {
      return "🔋 [Label 3] DC POWER JACK: Coaxial socket accepting unregulated 7V–12V DC input adapter feeds to power independent projects wirelessly.";
    }
    if (activePart === 'serial_mcu') {
      return "⚡ [Label 4] ATmega16U2 SERIAL CONTROLLER: Secondary microcontroller converting physical computer USB signaling to UART TTL communication streams.";
    }
    if (activePart === 'regulator') {
      return "🛡️ [Label 8] 5V VOLTAGE REGULATOR: Steps down higher external input voltages (7V-12V) down to a stable 5V for electronic safety.";
    }
    if (activePart === 'crystal') {
      return "⏱️ [Label 9] 16 MHz CRYSTAL OSCILLATOR: The heartbeat generator, ticking exactly 16 million times per second to synchronize processing execution cycles.";
    }
    if (activePart === 'icsp') {
      return "🔌 [Label 10] ICSP PROGRAMMING HEADERS: Low-level bootloader standard pin headers used for direct ICSP chip flash programming.";
    }
    if (activePart === 'leds') {
      return "🚨 [Label 11] BUILT-IN STATUS LEDS: Diagnostic indicator lights mapping Pin 13 digital output (marked L) and active UART serial transfer lines (TX/RX).";
    }
    
    if (slideIndex === 4) {
      if (isMega) {
        return "🚀 DESIGN INDUSTRIAL SCALE MOTORISED CNC MACHINES, DENSE AUTOMATED HOUSES, AND COMPLEX 3D PRINTERS!";
      }
      return "🚀 BUILD AMAZING REAL-LIFE PROJECTS LIKE AUTOMATED MEDICAL STICKS AND PROXIMITY ALARMS!";
    }
    if (slideIndex === 5) return "🖱️ SLIPPED MOUSE GLITCH: A LEGENDARY DESIGNER MISTAKE LEFT ON PURPOSE FOR 15+ YEARS!";
    return "💡 CLICK ANY BOARD COMPONENT OR BUTTON TO DIRECTLY EXPLORE WHAT THEY DO!";
  };

  return (
    <div className="relative w-full h-full min-h-[460px] flex flex-col justify-center items-center bg-slate-50 border-4 border-slate-100 shadow-inner overflow-hidden rounded-[28px] p-4 text-center select-none font-sans">
        {/* Small instruction / indicator */}
        <div className="absolute top-4 inset-x-4 flex justify-between items-center bg-white border border-slate-200/60 px-3 py-1.5 rounded-xl shadow-sm z-30 font-bold">
           <span className="text-[7.5px] font-black uppercase tracking-widest text-[#00878C]">
             {isOopsHighlighted ? "⚠️ LEGENDARY PCB FAULT" : "INTERACTIVE DIAGRAM - CLICK PARTS!"}
           </span>
           <span className="text-[8px] font-bold text-slate-500 capitalize">
             {isUno ? 'Arduino Uno' : isMega ? 'Arduino Mega' : 'Arduino Nano'} Explorer
           </span>
        </div>

        {isOopsHighlighted ? (
          /* Slide 5: Accidental Slipped Mouse Concept Representation */
          <div className="w-full flex-1 flex flex-col justify-center items-center py-6 px-1 z-10 font-sans mt-6">
             <h4 className="text-xs font-black uppercase text-amber-500 tracking-wider mb-2">The Historic 2005 CAD Software Mishap!</h4>
             
             <div className="relative w-full max-w-sm h-48 bg-slate-900 border-2 border-[#00878C]/40 rounded-2xl p-4 flex flex-col justify-between items-center overflow-hidden shadow-2xl">
                <div className="absolute top-1/2 left-[50%] -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-rose-500/5 rounded-full animate-ping pointer-events-none" />
                
                {/* Slipped mouse cursor visualization */}
                <div className="absolute top-[32%] left-[44%] text-3xl select-none z-20 pointer-events-none animate-[bounce_1.5s_infinite]">
                   🖱️💥
                </div>

                <div className="w-full flex justify-between items-center relative mt-2 px-2">
                   <div className="flex flex-col items-center">
                      <span className="text-[5px] text-red-400 font-black tracking-widest uppercase bg-red-950 px-1 py-0.5 rounded mb-1">Row A Shifted Outward</span>
                      <div className="flex gap-1 bg-neutral-900 px-1.5 py-1 rounded border-2 border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.5)]">
                         {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-2 h-2 rounded-full bg-slate-400" />
                         ))}
                      </div>
                   </div>

                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                      <div className="text-[6px] font-black text-red-400 bg-red-950/80 px-1.5 py-1 rounded border border-rose-500 leading-none">SLIPPED ARROW</div>
                      <div className="h-4 w-[1px] bg-red-550 border-r border-dashed border-red-500 mx-auto" />
                   </div>

                   <div className="flex flex-col items-center">
                      <span className="text-[5px] text-emerald-400 font-black tracking-widest uppercase bg-neutral-950 px-1 py-0.5 rounded mb-1">Row B Aligned Grid</span>
                      <div className="flex gap-1 bg-neutral-900 px-1.5 py-1 rounded border border-white/10">
                         {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-2 h-2 rounded-full bg-emerald-400" />
                         ))}
                      </div>
                   </div>
                </div>

                <p className="text-[8.5px] text-neutral-300 bg-black/55 p-2 rounded-lg text-center max-w-xs leading-relaxed mt-4 border border-white/5">
                   Massimo Banzi admitted: <span className="italic">"We realized the pins were off-center while reviewing the files. But thousands of children loved the design, so we left it crooked forever!"</span>
                </p>
             </div>

             {/* Characters dialogue */}
             <div className="mt-3 bg-amber-950/25 border border-amber-800/20 px-3 py-2.5 rounded-2xl w-full text-left flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-xs shrink-0 font-bold">💡</div>
                <div>
                   <p className="text-[7.5px] font-black text-amber-400 uppercase tracking-widest leading-none mb-1">PEMA & TASHI REVELATION</p>
                   <p className="text-[8.5px] font-medium leading-relaxed text-amber-100">"This shows us that in engineering, mistakes sometimes become standard features that define a product's famous identity!"</p>
                </div>
             </div>
          </div>
        ) : (
          /* Standard PCB board layout with split digital headers and normal spacing */
          <div className="flex flex-col items-center w-full">
            <div className="relative mb-2 mt-12 bg-white rounded-3xl border border-slate-150 p-6 shadow-sm flex items-center justify-center w-full max-w-md mx-auto">
              {/* The main PCB body */}
              {isUno ? (
                <div className="relative w-[400px] h-[280px] bg-transparent overflow-hidden flex flex-col items-center justify-center transition-all hover:scale-[1.01]">
                  <img
                    src={arduinoUnoImg}
                    alt="Arduino Board Layout Reference"
                    className="w-full h-full object-contain opacity-100 transition-opacity pointer-events-none filter drop-shadow-md pb-1"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* INTERACTIVE HOTSPOTS (Clickable layers on the board to directly learn about pins & components) */}
                  
                  {/* 1. Digital Pins (top slot) */}
                  <button 
                    onClick={() => setSelectedPart('digital')}
                    title="Digital Pins (0-13)"
                    className="absolute top-[2%] left-[32%] w-[63%] h-[13%] rounded-md cursor-pointer border border-transparent hover:border-cyan-400/60 hover:bg-cyan-400/10 transition-all z-20 flex items-center justify-center"
                  >
                    <span className="hidden group-hover:block text-[6px] font-black text-cyan-600 bg-white/95 px-1 rounded shadow-xs">DIGITAL</span>
                  </button>

                  {/* 2. Analog Input Pins (bottom right) */}
                  <button 
                    onClick={() => setSelectedPart('analog')}
                    title="Analog Pins (A0-A5)"
                    className="absolute bottom-[2%] left-[73%] w-[22%] h-[13%] rounded-md cursor-pointer border border-transparent hover:border-cyan-400/60 hover:bg-cyan-400/10 transition-all z-20 flex items-center justify-center"
                  >
                    <span className="hidden group-hover:block text-[6px] font-black text-cyan-600 bg-white/95 px-1 rounded shadow-xs">ANALOG</span>
                  </button>

                  {/* 3. Power Pins (bottom middle) */}
                  <button 
                    onClick={() => setSelectedPart('power')}
                    title="Power Pins (5V, 3.3V, GND)"
                    className="absolute bottom-[2%] left-[43%] w-[28%] h-[13%] rounded-md cursor-pointer border border-transparent hover:border-amber-400/60 hover:bg-amber-400/10 transition-all z-20 flex items-center justify-center"
                  >
                    <span className="hidden group-hover:block text-[6px] font-black text-amber-600 bg-white/95 px-1 rounded shadow-xs">POWER</span>
                  </button>

                  {/* 4. USB Port (middle left) */}
                  <button 
                    onClick={() => setSelectedPart('usb')}
                    title="USB Port"
                    className="absolute top-[20%] left-[1vw] w-[22%] h-[38%] rounded-md cursor-pointer border border-transparent hover:border-blue-400/60 hover:bg-blue-400/10 transition-all z-20 flex items-center justify-center"
                  >
                    <span className="hidden group-hover:block text-[6px] font-black text-blue-600 bg-white/95 px-1 rounded shadow-xs">USB</span>
                  </button>

                  {/* 5. Reset Button (top left) */}
                  <button 
                    onClick={() => setSelectedPart('reset')}
                    title="Reset Button"
                    className="absolute top-[4%] left-[4%] w-[12%] h-[14%] rounded-md cursor-pointer border border-transparent hover:border-rose-450 hover:bg-rose-500/10 transition-all z-20 flex items-center justify-center"
                  >
                    <span className="hidden group-hover:block text-[6px] font-black text-red-600 bg-white/95 px-1 rounded shadow-xs">RESET</span>
                  </button>

                  {/* 6. Microcontroller Brain (lower middle-right) */}
                  <button 
                    onClick={() => setSelectedPart('brain')}
                    title="ATmega328P Microcontroller Brain"
                    className="absolute bottom-[17%] left-[45%] w-[48%] h-[18%] rounded-md cursor-pointer border border-transparent hover:border-emerald-400/60 hover:bg-emerald-400/10 transition-all z-20 flex items-center justify-center"
                  >
                    <span className="hidden group-hover:block text-[6px] font-black text-emerald-600 bg-white/95 px-1 rounded shadow-xs">BRAIN</span>
                  </button>

                  {/* --- Visually Glowing Selected Part Borders --- */}
                  {isBrainHighlighted && (
                    <div className="absolute bottom-[17%] left-[45%] w-[48%] h-[18%] rounded-md border-2 border-emerald-400 bg-emerald-400/20 shadow-[0_0_15px_rgba(52,211,153,0.5)] z-10 pointer-events-none animate-pulse" />
                  )}

                  {isDigitalHighlighted && (
                    <div className="absolute top-[2%] left-[32%] w-[63%] h-[13%] rounded-md border-2 border-cyan-400 bg-cyan-400/20 shadow-[0_0_15px_rgba(34,211,238,0.5)] z-10 pointer-events-none animate-pulse" />
                  )}

                  {isAnalogHighlighted && (
                    <div className="absolute bottom-[2%] left-[73%] w-[22%] h-[13%] rounded-md border-2 border-cyan-400 bg-cyan-400/20 shadow-[0_0_15px_rgba(34,211,238,0.5)] z-10 pointer-events-none animate-pulse" />
                  )}

                  {isPowerHighlighted && (
                    <div className="absolute bottom-[2%] left-[43%] w-[28%] h-[13%] rounded-md border-2 border-amber-400 bg-amber-400/20 shadow-[0_0_15px_rgba(245,158,11,0.5)] z-10 pointer-events-none animate-pulse" />
                  )}

                  {isUsbHighlighted && (
                    <div className="absolute top-[20%] left-[1vw] w-[22%] h-[38%] rounded-md border-2 border-blue-400 bg-blue-400/20 shadow-[0_0_15px_rgba(59,130,246,0.5)] z-10 pointer-events-none animate-pulse" />
                  )}

                  {isResetHighlighted && (
                    <div className="absolute top-[4%] left-[4%] w-[12%] h-[14%] rounded-md border-2 border-rose-500 bg-rose-500/20 shadow-[0_0_15px_rgba(239,68,68,0.5)] z-10 pointer-events-none animate-pulse" />
                  )}
                </div>
              ) : isMega ? (
                /* 100% exact replica of the user-uploaded Arduino Mega 2560, with interactive labels */
                <div className="relative w-full max-w-[420px] h-[210px] bg-transparent overflow-hidden flex flex-col items-center justify-center transition-all hover:scale-[1.01] select-none">
                  <img
                    src={arduinoMegaImg}
                    alt="Arduino Mega 2560 Board Layout (Numbered)"
                    className="w-full h-full object-contain opacity-100 transition-opacity pointer-events-none filter drop-shadow-md"
                    referrerPolicy="no-referrer"
                  />

                  {/* Hotspots for each of the numbered components */}
                  {/* Pin 1: ATmega2560 Brain */}
                  <button
                    onClick={() => setSelectedPart('brain')}
                    title="[1] ATmega2560 Brain"
                    className={`absolute left-[45%] top-[30%] w-[15%] h-[32%] rounded-md cursor-pointer border-2 transition-all z-20 hover:bg-purple-400/20 ${
                      isBrainHighlighted ? 'border-purple-500 bg-purple-500/25 shadow-[0_0_12px_rgba(168,85,247,0.7)] animate-pulse' : 'border-transparent'
                    }`}
                  />

                  {/* Pin 2: USB Type-B Port */}
                  <button
                    onClick={() => setSelectedPart('usb')}
                    title="[2] USB Type-B Port"
                    className={`absolute left-[0%] top-[15%] w-[17%] h-[28%] rounded-md cursor-pointer border-2 transition-all z-20 hover:bg-blue-400/20 ${
                      isUsbHighlighted ? 'border-blue-500 bg-blue-500/25 shadow-[0_0_12px_rgba(59,130,246,0.7)] animate-pulse' : 'border-transparent'
                    }`}
                  />

                  {/* Pin 3: DC Power Jack */}
                  <button
                    onClick={() => setSelectedPart('power_jack')}
                    title="[3] DC Power Jack"
                    className={`absolute left-[4%] top-[72%] w-[15%] h-[24%] rounded-md cursor-pointer border-2 transition-all z-20 hover:bg-amber-400/20 ${
                      isPowerJackHighlighted ? 'border-amber-500 bg-amber-500/25 shadow-[0_0_12px_rgba(245,158,11,0.7)] animate-pulse' : 'border-transparent'
                    }`}
                  />

                  {/* Pin 4: ATmega16U2 Serial Chip */}
                  <button
                    onClick={() => setSelectedPart('serial_mcu')}
                    title="[4] ATmega16U2 Serial Controller"
                    className={`absolute left-[21%] top-[28%] w-[7%] h-[14%] rounded-md cursor-pointer border-2 transition-all z-20 hover:bg-emerald-400/20 ${
                      isSerialMcuHighlighted ? 'border-emerald-500 bg-emerald-500/25 shadow-[0_0_12px_rgba(52,211,153,0.7)] animate-pulse' : 'border-transparent'
                    }`}
                  />

                  {/* Pin 5: Digital Pin Headers (Combo click spots) */}
                  <button
                    onClick={() => setSelectedPart('digital')}
                    title="[5] Digital Pin Headers"
                    className={`absolute left-[22%] top-[0%] w-[66%] h-[12%] rounded-md cursor-pointer border-2 transition-all z-20 hover:bg-cyan-400/20 ${
                      isDigitalHighlighted ? 'border-cyan-500 bg-cyan-500/25 shadow-[0_0_12px_rgba(34,211,238,0.7)] animate-pulse' : 'border-transparent'
                    }`}
                  />
                  <button
                    onClick={() => setSelectedPart('digital')}
                    title="[5] Digital Pin Headers (Right)"
                    className={`absolute left-[91%] top-[0%] w-[9%] h-[87%] rounded-md cursor-pointer border-2 transition-all z-20 hover:bg-cyan-400/20 ${
                      isDigitalHighlighted ? 'border-cyan-500 bg-cyan-500/25 shadow-[0_0_12px_rgba(34,211,238,0.7)] animate-pulse' : 'border-transparent'
                    }`}
                  />

                  {/* Pin 6: Analog Input Sockets */}
                  <button
                    onClick={() => setSelectedPart('analog')}
                    title="[6] Analog Inputs (A0-A15)"
                    className={`absolute left-[51%] top-[90%] w-[41%] h-[10%] rounded-md cursor-pointer border-2 transition-all z-20 hover:bg-cyan-400/20 ${
                      isAnalogHighlighted ? 'border-cyan-500 bg-cyan-500/25 shadow-[0_0_12px_rgba(34,211,238,0.7)] animate-pulse' : 'border-transparent'
                    }`}
                  />

                  {/* Pin 7: Power Sockets */}
                  <button
                    onClick={() => setSelectedPart('power')}
                    title="[7] Power Interface Sockets"
                    className={`absolute left-[30%] top-[90%] w-[20%] h-[10%] rounded-md cursor-pointer border-2 transition-all z-20 hover:bg-amber-400/20 ${
                      isPowerHighlighted ? 'border-amber-500 bg-amber-500/25 shadow-[0_0_12px_rgba(245,158,11,0.7)] animate-pulse' : 'border-transparent'
                    }`}
                  />

                  {/* Pin 8: Voltage Regulator */}
                  <button
                    onClick={() => setSelectedPart('regulator')}
                    title="[8] Voltage Regulator"
                    className={`absolute left-[10%] top-[57%] w-[9%] h-[16%] rounded-md cursor-pointer border-2 transition-all z-20 hover:bg-rose-400/20 ${
                      isRegulatorHighlighted ? 'border-rose-500 bg-rose-500/25 shadow-[0_0_12px_rgba(244,63,94,0.7)] animate-pulse' : 'border-transparent'
                    }`}
                  />

                  {/* Pin 9: 16 MHz Crystal */}
                  <button
                    onClick={() => setSelectedPart('crystal')}
                    title="[9] 16 MHz Clock Crystal"
                    className={`absolute left-[70%] top-[36%] w-[9%] h-[20%] rounded-md cursor-pointer border-2 transition-all z-20 hover:bg-teal-400/20 ${
                      isCrystalHighlighted ? 'border-teal-500 bg-teal-500/25 shadow-[0_0_12px_rgba(20,184,166,0.7)] animate-pulse' : 'border-transparent'
                    }`}
                  />

                  {/* Pin 10: ICSP Header */}
                  <button
                    onClick={() => setSelectedPart('icsp')}
                    title="[10] ICSP SPI Header"
                    className={`absolute left-[19%] top-[7%] w-[9%] h-[13%] rounded-md cursor-pointer border-2 transition-all z-[22] hover:bg-orange-400/20 ${
                      isIcspHighlighted ? 'border-orange-500 bg-orange-500/25 shadow-[0_0_12px_rgba(249,115,22,0.7)] animate-pulse' : 'border-transparent'
                    }`}
                  />
                  <button
                    onClick={() => setSelectedPart('icsp')}
                    title="[10] ATmega2560 ICSP Header"
                    className={`absolute left-[62%] top-[38%] w-[7%] h-[18%] rounded-md cursor-pointer border-2 transition-all z-20 hover:bg-orange-400/20 ${
                      isIcspHighlighted ? 'border-orange-500 bg-orange-500/25 shadow-[0_0_12px_rgba(249,115,22,0.7)] animate-pulse' : 'border-transparent'
                    }`}
                  />

                  {/* Pin 11: Status LEDs */}
                  <button
                    onClick={() => setSelectedPart('leds')}
                    title="[11] Status LEDs"
                    className={`absolute left-[27%] top-[18%] w-[7%] h-[21%] rounded-md cursor-pointer border-2 transition-all z-20 hover:bg-yellow-400/20 ${
                      isLedsHighlighted ? 'border-yellow-500 bg-yellow-500/25 shadow-[0_0_12px_rgba(234,179,8,0.7)] animate-pulse' : 'border-transparent'
                    }`}
                  />
                </div>
              ) : (
                /* Beautiful interactive electronic schematic diagram of Arduino Nano (No static Uno image) */
                <div className="relative w-[180px] h-[300px] bg-[#005f63] border-[4px] border-slate-700/80 rounded-2xl flex flex-col items-center justify-between py-3 px-2 shadow-[0_12px_36px_rgba(0,0,0,0.2)] overflow-hidden transition-all duration-300 select-none">
                  {/* Tech Lines Backpattern */}
                  <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
                  
                  {/* Left row of pin headers (Digital Pins Focus) */}
                  <div className="absolute left-0.5 top-8 bottom-8 w-2.5 flex flex-col justify-between z-10">
                    {[...Array(15)].map((_, idx) => (
                      <div 
                        key={idx} 
                        className={`w-2 h-2 rounded-sm border border-slate-600 transition-all duration-200 ${
                          isDigitalHighlighted ? 'bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,1)]' : 'bg-amber-100/40'
                        }`} 
                        title={`Pin ${idx}`}
                      />
                    ))}
                  </div>

                  {/* Right row of pin headers (Analog + Power Pins Focus) */}
                  <div className="absolute right-0.5 top-8 bottom-8 w-2.5 flex flex-col justify-between z-10">
                    {[...Array(15)].map((_, idx) => {
                      const isAnalogRow = idx >= 4 && idx <= 11; // Middle area for Analog pins
                      const isPowerRow = idx < 4 || idx > 11; // Ends for GND, 5V, 3V3, VIN
                      let pinColorClass = 'bg-amber-100/40';
                      if (isAnalogRow && isAnalogHighlighted) {
                        pinColorClass = 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,1)]';
                      } else if (isPowerRow && isPowerHighlighted) {
                        pinColorClass = 'bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,1)]';
                      }
                      return (
                        <div 
                          key={idx} 
                          className={`w-2 h-2 rounded-sm border border-slate-600 transition-all duration-200 ${pinColorClass}`}
                          title={`Pin ${30 - idx}`}
                        />
                      );
                    })}
                  </div>

                  {/* MINI-USB port at the top */}
                  <button 
                    onClick={() => setSelectedPart('usb')}
                    className={`w-10 h-8 rounded-b-md border-b-2 border-x border-slate-500 bg-slate-300 hover:bg-slate-200 cursor-pointer flex items-center justify-center relative transition-all duration-300 z-20 ${
                      isUsbHighlighted ? 'ring-2 ring-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.7)]' : ''
                    }`}
                  >
                    <span className="text-[5px] font-mono text-zinc-950 font-black tracking-tight leading-none uppercase">MINI-USB</span>
                    {isUsbHighlighted && (
                      <div className="absolute inset-0 bg-cyan-400/20 animate-pulse pointer-events-none" />
                    )}
                  </button>

                  {/* Microcontroller ATmega328 Brain in the center */}
                  <button 
                    onClick={() => setSelectedPart('brain')}
                    className={`w-20 h-20 rounded-lg bg-neutral-900 border border-neutral-750 flex flex-col items-center justify-center p-1.5 cursor-pointer relative transition-all duration-300 z-20 hover:border-emerald-300 ${
                      isBrainHighlighted ? 'ring-2 ring-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)] scale-102' : ''
                    }`}
                  >
                    <span className="text-[6px] font-mono font-black text-rose-500 uppercase leading-none tracking-tight mb-1 animate-pulse">ATMEGA328</span>
                    <div className="w-12 h-10 border border-neutral-800 bg-neutral-950 rounded flex items-center justify-center text-center">
                      <span className="text-[8px] font-bold text-[#00878C]">16 MHz</span>
                    </div>
                    {isBrainHighlighted && (
                      <div className="absolute inset-0 border border-emerald-400 rounded-lg animate-pulse pointer-events-none" />
                    )}
                  </button>

                  {/* Small tactile RESET button near bottom / center */}
                  <button 
                    onClick={() => setSelectedPart('reset')}
                    className={`w-7 h-7 rounded-full bg-slate-800 border border-slate-650 flex items-center justify-center cursor-pointer transition-all duration-300 relative z-20 ${
                      isResetHighlighted ? 'bg-rose-950 border-rose-500 ring-2 ring-rose-400 shadow-[0_0_10px_rgba(239,68,68,0.6)]' : ''
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-full shadow-inner ${isResetHighlighted ? 'bg-rose-500' : 'bg-red-650'}`} />
                  </button>

                  {/* NANO Board visual label on board */}
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] font-mono font-black text-white/95 uppercase tracking-widest leading-none">NANO v3.0</span>
                    <span className="text-[5px] font-semibold text-white/50 uppercase tracking-widest leading-none mt-1">Arduino Micro-Class</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick-choice bar below board */}
            <div className="flex flex-wrap justify-center gap-1.5 mt-3 max-w-md mx-auto z-10">
               {[
                 { id: 'brain', label: '🧠 Brain (MCU)', color: 'border-emerald-200 text-emerald-800 hover:bg-emerald-50' },
                 { id: 'digital', label: '🔌 Digital Pins', color: 'border-cyan-200 text-cyan-800 hover:bg-cyan-50' },
                 { id: 'analog', label: '🎛️ Analog Pins', color: 'border-blue-200 text-blue-800 hover:bg-blue-50' },
                 { id: 'usb', label: '💻 USB Port', color: 'border-indigo-200 text-indigo-800 hover:bg-indigo-50' },
                 { id: 'reset', label: '🔴 Reset Button', color: 'border-rose-200 text-rose-800 hover:bg-rose-50' },
                 { id: 'power', label: '⚡ Power Pins', color: 'border-amber-200 text-amber-800 hover:bg-amber-50' }
               ].map((part) => (
                 <button
                   key={part.id}
                   onClick={() => setSelectedPart(part.id)}
                   className={`text-[8.5px] font-black tracking-tight uppercase px-2.5 py-1.5 rounded-xl border transition-all duration-200 bg-white ${part.color} ${
                     activePart === part.id 
                       ? 'ring-2 ring-slate-800 shadow-sm border-slate-400 font-extrabold scale-[1.03] bg-slate-100' 
                       : 'opacity-80 hover:opacity-100'
                   }`}
                 >
                   {part.label}
                 </button>
               ))}
            </div>
          </div>
        )}

        {/* Brief explanation description footer */}
        <div className="bg-slate-100 border border-slate-200/80 p-3 rounded-xl text-center w-full mt-3 min-h-[50px] flex items-center justify-center shadow-inner">
          <span className="text-[10px] font-bold tracking-tight uppercase leading-relaxed text-slate-700">
             {getExplanation()}
          </span>
        </div>
     </div>
  );
};

// --- Custom Visuals for Tilt Switch Module ---

const TiltMeetVisual = () => {
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (isShaking) {
      const timer = setTimeout(() => setIsShaking(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isShaking]);

  return (
    <div 
      className="relative w-full h-full min-h-[290px] flex flex-col items-center justify-between bg-zinc-950 overflow-hidden p-5 rounded-[28px] text-center select-none"
      onClick={() => setIsShaking(true)}
    >
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] bg-[size:16px_16px] opacity-10 pointer-events-none" />
      
      {/* Header status */}
      <div className="w-full flex justify-between items-center bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800 backdrop-blur-sm z-10 text-[9px] font-mono">
        <div className="flex items-center gap-1.5 font-bold uppercase tracking-widest text-[#3b82f6]">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-[pulse_1s_infinite]" />
          <span>Tilt Switch Hardware</span>
        </div>
        <span className="text-zinc-550 font-bold">MODE: SHAKE ACTIVE</span>
      </div>

      {/* Main interactive cylinder body */}
      <div className="relative flex flex-col items-center justify-center my-auto py-2 z-10 cursor-pointer group">
        <span className="text-[10px] uppercase font-black text-blue-400 tracking-wider mb-2 select-none opacity-80 group-hover:opacity-100">
          TAP SENSOR TO GENTLY SHAKE IT!
        </span>

        <motion.div
          animate={isShaking ? {
            x: [0, -12, 12, -8, 8, -4, 4, 0],
            y: [0, 4, -4, 3, -3, 2, -2, 0],
            rotate: [0, -10, 10, -5, 5, -2, 2, 0],
          } : {}}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="relative w-24 h-36 bg-gradient-to-b from-zinc-700 to-zinc-900 border-4 border-zinc-650 rounded-3xl flex flex-col items-center justify-between p-3.5 shadow-2xl transition hover:border-blue-500/50"
        >
          {/* Glass window visual revealing the gold/conductive ball inside cylinder */}
          <div className="w-full h-20 bg-zinc-950/80 rounded-xl border border-zinc-800 flex flex-col items-center p-2 relative overflow-hidden shadow-inner">
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            {/* The little metal pins at the bottom */}
            <div className="absolute bottom-0 w-8 h-4 flex justify-between px-1.5">
              <div className="w-1.5 h-full bg-slate-405 rounded-t-sm bg-amber-400" />
              <div className="w-1.5 h-full bg-slate-405 rounded-t-sm bg-amber-400" />
            </div>

            {/* Secret Tiny Treasure / conductive metal ball */}
            <motion.div
              animate={isShaking ? {
                y: [30, 5, 20, 10, 25, 30],
                x: [0, -6, 5, -3, 2, 0],
              } : { y: 30 }}
              transition={{ duration: 0.55 }}
              className="absolute w-6 h-6 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-600 border border-white/20 shadow-[0_4px_10px_rgba(245,158,11,0.6)] cursor-pointer"
            />
          </div>

          {/* Two gold terminal pins coming out of bottom of cylinder */}
          <div className="flex gap-4 shrink-0 -mb-8 mt-1">
            <div className="w-1 h-7 bg-gradient-to-b from-zinc-500 to-amber-500 rounded-b shadow" />
            <div className="w-1 h-7 bg-gradient-to-b from-zinc-500 to-amber-500 rounded-b shadow" />
          </div>
        </motion.div>

        {isShaking && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-3 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full text-[9px] text-blue-400 font-black tracking-widest uppercase animate-pulse flex items-center gap-1"
          >
            🔊 *Rattle! Rattle!* 📳
          </motion.div>
        )}
      </div>

      <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-tight bg-zinc-900 border border-zinc-850 p-2 rounded-xl w-full z-10 leading-relaxed">
        {isShaking ? "💡 Did you hear that? The conductive ball is rattling inside the cylinder!" : "Click or tap the sensor to shake and hear the tiny secret ball!"}
      </div>
    </div>
  );
};

const TiltDefinitionVisual = () => {
  const [isTilted, setIsTilted] = useState(false);

  return (
    <div className="relative w-full h-full min-h-[290px] flex flex-col items-center justify-between bg-zinc-950 overflow-hidden p-5 rounded-[28px] text-center select-none">
      <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] bg-[size:16px_16px] opacity-10 pointer-events-none" />
      
      {/* Header status */}
      <div className="w-full flex justify-between items-center bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800 backdrop-blur-sm z-10 text-[9px] font-mono">
        <div className="flex items-center gap-1.5 font-bold uppercase tracking-widest text-[#06b6d4]">
          <span className={`w-2 h-2 rounded-full ${isTilted ? 'bg-orange-500' : 'bg-cyan-500'} animate-pulse`} />
          <span>Gravity Detective Mode</span>
        </div>
        <span className="text-zinc-550 font-bold uppercase">{isTilted ? "TILTED (OFF)" : "UPRIGHT (ON)"}</span>
      </div>

      {/* Tilt switch compared to normal light switch */}
      <div className="w-full grid grid-cols-2 gap-4 my-auto z-10 max-w-[420px] items-center">
        {/* Left Side: Standard Switch (Fipped by finger) */}
        <div className="bg-zinc-900/80 p-3 rounded-2xl border border-zinc-850 flex flex-col items-center gap-2">
          <span className="text-[9px] font-black uppercase text-zinc-500 tracking-wider">Normal Switch</span>
          
          <div className="w-12 h-20 bg-zinc-800 rounded-xl border border-zinc-700 flex flex-col items-center justify-center p-2 relative shadow-lg">
             <div className="absolute top-1.5 w-1 h-1 rounded-full bg-zinc-950" />
             {/* Toggle lever */}
             <div className={`w-6 h-8 bg-zinc-100 rounded border border-zinc-300 shadow cursor-not-allowed transition-all ${
               isTilted ? 'translate-y-1.5 bg-slate-200' : '-translate-y-1.5 bg-white'
             }`} />
             <div className="absolute bottom-1.5 w-1 h-1 rounded-full bg-zinc-950" />
          </div>
          <p className="text-[8px] font-bold text-zinc-400 uppercase tracking-tight">Finger flip 👆</p>
        </div>

        {/* Right Side: Tilt Switch (Flipped by Gravity) */}
        <div 
          onClick={() => setIsTilted(!isTilted)} 
          className="bg-zinc-900/80 p-3 rounded-2xl border border-zinc-850 flex flex-col items-center gap-2 cursor-pointer transition duration-300 hover:border-cyan-500/40 relative group"
        >
          <div className="absolute top-1 right-2 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping opacity-75" />
          <span className="text-[9px] font-black uppercase text-cyan-400 tracking-wider group-hover:animate-pulse">Tilt (Tap!)</span>
          
          {/* Cylinder which tilts */}
          <motion.div
            animate={{ rotate: isTilted ? 90 : 0 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="w-12 h-20 bg-gradient-to-b from-cyan-600 to-cyan-800 border-2 border-cyan-500 rounded-xl flex flex-col items-center justify-around p-2 shadow-lg"
          >
             <div className="w-8 h-8 bg-zinc-950/90 rounded-full border border-cyan-500/30 flex items-center justify-center relative overflow-hidden">
                {/* Pins and ball */}
                <div className="absolute bottom-0 w-full h-1 bg-cyan-500/20" />
                <motion.div 
                  animate={isTilted ? { x: 8, y: 0 } : { x: 0, y: 6 }}
                  className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-white"
                />
             </div>
             
             {/* LED Signal Indicator */}
             <div className={`w-3 h-3 rounded-full border border-black/40 ${
               isTilted 
                 ? 'bg-zinc-800' 
                 : 'bg-emerald-400 shadow-[0_0_10px_#10b981] animate-pulse'
             }`} />
          </motion.div>
          <p className="text-[8px] font-bold text-zinc-400 uppercase tracking-tight">{isTilted ? "Tilted over" : "Upright"}</p>
        </div>
      </div>

      <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-tight bg-zinc-900 border border-zinc-850 p-2 rounded-xl w-full z-10 leading-relaxed">
         {isTilted 
           ? "🔴 Gravity flipped the ball! Circuit is interrupted (Sensor reads OFF)." 
           : "🟢 Standing straight! Gravity locks the ball on bottom pins (Sensor reads ON)."}
      </div>
    </div>
  );
};

const TiltHowItWorksVisual = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="relative w-full h-full min-h-[290px] flex flex-col items-center justify-between bg-zinc-950 overflow-hidden p-5 rounded-[28px] text-center select-none">
      <div className="absolute inset-0 bg-[radial-gradient(#a855f7_1px,transparent_1px)] bg-[size:16px_16px] opacity-10 pointer-events-none" />
      
      {/* Header status */}
      <div className="w-full flex justify-between items-center bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800 backdrop-blur-sm z-10 text-[9px] font-mono">
        <div className="flex items-center gap-1.5 font-bold uppercase tracking-widest text-[#a855f7]">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          <span>Physics Simulation</span>
        </div>
        <span className="text-zinc-550 font-bold uppercase">STEP {step} / 3</span>
      </div>

      {/* Main Schematic representation */}
      <div className="my-auto w-full max-w-[320px] flex flex-col items-center gap-4 z-10">
         {/* The stylized blueprint circuit representing the step */}
         <div className="w-full h-36 bg-zinc-900/90 rounded-2xl border-2 border-zinc-800 flex flex-col items-center justify-center p-3 relative overflow-hidden">
            {/* Solder tracks background */}
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:10px_10px]" />

            {step === 1 && (
              <div className="flex flex-col items-center justify-center space-y-1.5">
                 <div className="w-12 h-20 bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-2xl border border-zinc-650 p-1.5 relative flex flex-col items-center justify-between">
                    <div className="w-8 h-12 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center justify-center relative">
                       {/* Pins */}
                       <div className="absolute bottom-1 w-5 h-2 flex justify-between">
                          <div className="w-1 h-full bg-amber-500 rounded-sm" />
                          <div className="w-1 h-full bg-amber-500 rounded-sm" />
                       </div>
                       {/* Metallic Ball inside */}
                       <div className="absolute top-1.5 w-4.5 h-4.5 rounded-full bg-gradient-to-b from-yellow-300 to-yellow-600 border border-white" />
                    </div>
                 </div>
                 <p className="text-[8px] text-[#a855f7] uppercase font-black tracking-wider bg-purple-500/10 p-0.5 px-2 rounded border border-purple-900/40">Inside the Cylinder</p>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col items-center justify-center space-y-1 animate-fadeIn">
                 <div className="flex items-center gap-6">
                    <div className="w-14 h-18 bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-2xl border-2 border-emerald-500 p-1 relative flex flex-col items-center justify-between shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                       <div className="w-10 h-12 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center justify-center relative">
                          {/* Pins with electric spark lines */}
                          <div className="absolute bottom-0 w-5 h-2 flex justify-between">
                             <div className="w-1 h-full bg-emerald-400" />
                             <div className="w-1 h-full bg-emerald-400" />
                          </div>
                          {/* Metal ball resting on pins */}
                          <div className="absolute bottom-0 w-4 h-4 rounded-full bg-gradient-to-b from-emerald-300 to-emerald-500 border border-white shadow-[0_0_8px_#10b981]" />
                       </div>
                    </div>
                    
                    {/* Electronic LED schematic line */}
                    <div className="flex flex-col items-center gap-1">
                       <div className="w-7 h-7 rounded-full bg-emerald-400 shadow-[0_0_20px_#10b981] flex items-center justify-center text-[10px] border border-white font-extrabold text-[#064e3b]">ON</div>
                       <span className="text-[6px] text-emerald-400 font-bold uppercase tracking-widest leading-none bg-emerald-950/60 p-0.5 px-1.5 rounded">CLOSED GATE</span>
                    </div>
                 </div>
                 <p className="text-[8px] text-emerald-400 uppercase font-black tracking-wider bg-emerald-955/10 p-0.5 px-2 rounded border border-emerald-900/40 mt-1">Standing Straight (ON)</p>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col items-center justify-center space-y-1 animate-fadeIn">
                 <div className="flex items-center gap-6">
                    {/* Tilted cylinder */}
                    <div className="w-14 h-18 bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-2xl border border-zinc-655 p-1 relative flex flex-col items-center justify-between rotate-90 shadow-md">
                       <div className="w-10 h-12 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center justify-center relative">
                          {/* Idle pins */}
                          <div className="absolute bottom-0 w-5 h-1.5 flex justify-between">
                             <div className="w-1 h-full bg-zinc-650" />
                             <div className="w-1 h-full bg-zinc-650" />
                          </div>
                          {/* Metal ball rolled away to bottom/side */}
                          <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-gradient-to-b from-zinc-400 to-zinc-600 border border-zinc-700" />
                       </div>
                    </div>
                    
                    {/* Electronic LED schematic line */}
                    <div className="flex flex-col items-center gap-1">
                       <div className="w-7 h-7 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center text-[10px] font-black text-zinc-500">OFF</div>
                       <span className="text-[6px] text-zinc-400 font-bold uppercase tracking-widest leading-none bg-zinc-900 border border-zinc-850 p-0.5 px-1.5 rounded">OPEN GATE</span>
                    </div>
                 </div>
                 <p className="text-[8px] text-zinc-400 uppercase font-black tracking-wider bg-zinc-950/60 p-0.5 px-2 rounded border border-zinc-850 mt-1">Leaning Over (OFF)</p>
              </div>
            )}
         </div>

         {/* Steps tab Selector */}
         <div className="flex gap-2 justify-center w-full">
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                onClick={() => setStep(num)}
                className={`px-2.5 py-1 rounded-lg font-black uppercase text-[9px] tracking-wider transition-all ${
                  step === num 
                    ? 'bg-purple-600 text-white shadow-md' 
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
                }`}
              >
                Part {num}
              </button>
            ))}
         </div>
      </div>

      <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-tight bg-zinc-900 border border-zinc-850 p-2 rounded-xl w-full z-10 leading-relaxed">
         {step === 1 && "📌 Step 1: Inside the non-conductive tube sits the tiny ball and two contact header pins."}
         {step === 2 && "📌 Step 2: Under upright gravity, the ball descends and connects the pins. Current flows (ON)."}
         {step === 3 && "📌 Step 3: Direct tilt causes the ball to roll away. Pins are disconnected. Current stops (OFF)."}
      </div>
    </div>
  );
};

const TiltRealLifeUsesVisual = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="relative w-full h-full min-h-[290px] flex flex-col items-center justify-between bg-zinc-950 overflow-hidden p-5 rounded-[28px] text-center select-none animate-fadeIn">
      <div className="absolute inset-0 bg-[radial-gradient(#e11d48_1px,transparent_1px)] bg-[size:16px_16px] opacity-10 pointer-events-none" />
      
      {/* Header status */}
      <div className="w-full flex justify-between items-center bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800 backdrop-blur-sm z-10 text-[9px] font-mono">
        <div className="flex items-center gap-1.5 font-bold uppercase tracking-widest text-[#e11d48]">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span>Automated Industry Uses</span>
        </div>
        <span className="text-zinc-550 font-bold uppercase">TACTICAL SCENARIO</span>
      </div>

      {/* Real-time application display panel */}
      <div className="my-auto w-full max-w-[340px] flex flex-col items-center gap-3 z-10">
         {/* Screen simulation of safety heater, steering wheel or crane */}
         <div className="w-full h-32 bg-zinc-900/95 rounded-2xl border border-zinc-800 flex items-center justify-center p-3 relative overflow-hidden transition-all duration-300">
            
            {activeTab === 1 && (
               <div className="flex flex-col items-center justify-center space-y-1 text-center animate-fadeIn">
                  <div className="relative">
                     <span className="text-3xl">🔥</span>
                     {/* Safe shield symbol */}
                     <span className="absolute -top-1.5 -right-1.5 text-[9px] bg-emerald-500 border border-white text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">✓</span>
                  </div>
                  <h5 className="text-zinc-200 text-xs font-black uppercase tracking-wider">Portable Room Heater</h5>
                  <p className="text-[8px] text-[#f43f5e] font-black uppercase tracking-wider bg-rose-955/65">PET DANGER SAFEGUARD SHUTDOWN ACTIVATED</p>
               </div>
            )}

            {activeTab === 2 && (
               <div className="flex flex-col items-center justify-center space-y-1.5 text-center">
                  {/* Rotating steering wheel */}
                  <motion.div 
                    animate={{ rotate: [-30, 30, -30] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-10 h-10 rounded-full border-4 border-dashed border-cyan-400 flex items-center justify-center text-lg font-bold"
                  >
                     🏎️
                  </motion.div>
                  <h5 className="text-zinc-200 text-xs font-black uppercase tracking-wider">Video Game Steer Controls</h5>
                  <p className="text-[8px] text-cyan-400 font-black uppercase tracking-tight leading-none bg-cyan-950/60 p-1 rounded border border-cyan-900">LEAN FEEDBACK VECTOR Active</p>
               </div>
            )}

            {activeTab === 3 && (
               <div className="flex flex-col items-center justify-center space-y-1 text-center">
                  <div className="relative">
                     <span className="text-3xl animate-bounce">🏗️</span>
                     <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                  </div>
                  <h5 className="text-zinc-200 text-xs font-black uppercase tracking-wider">Construction Crane Warning</h5>
                  <p className="text-[8px] text-amber-500 font-black uppercase tracking-wider bg-amber-955/20 p-0.5 px-2 rounded border border-amber-900/40">PREVENTS TIPPING OVERLOAD</p>
               </div>
            )}

         </div>

         {/* Bento selectors tabs */}
         <div className="grid grid-cols-3 gap-1.5 w-full">
            <button
               onClick={() => setActiveTab(1)}
               className={`py-1.5 rounded-xl text-[8px] font-black uppercase tracking-wider border transition-all ${
                 activeTab === 1 
                   ? 'bg-rose-650 border-rose-500 text-white shadow shadow-rose-900/20' 
                   : 'bg-zinc-900 border-zinc-800 text-zinc-405 hover:bg-zinc-850'
               }`}
            >
               1. Space Heater
            </button>
            <button
               onClick={() => setActiveTab(2)}
               className={`py-1.5 rounded-xl text-[8px] font-black uppercase tracking-wider border transition-all ${
                 activeTab === 2 
                   ? 'bg-rose-650 border-rose-500 text-white shadow shadow-rose-900/20' 
                   : 'bg-zinc-900 border-zinc-800 text-zinc-405 hover:bg-zinc-850'
               }`}
            >
               2. Games
            </button>
            <button
               onClick={() => setActiveTab(3)}
               className={`py-1.5 rounded-xl text-[8px] font-black uppercase tracking-wider border transition-all ${
                 activeTab === 3 
                   ? 'bg-rose-650 border-rose-500 text-white shadow shadow-rose-900/20' 
                   : 'bg-zinc-900 border-zinc-800 text-zinc-405 hover:bg-zinc-850'
               }`}
            >
               3. Heavy Crane
            </button>
         </div>
      </div>

      <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-tight bg-zinc-900 border border-zinc-850 p-2 rounded-xl w-full z-10 leading-relaxed">
         {activeTab === 1 && "💡 Safe Space Heaters instantly disconnect power if tipped or knocked over!"}
         {activeTab === 2 && "💡 Game steering wheels translate physical tilt angles to steer vehicles on racing tracks!"}
         {activeTab === 3 && "💡 Heavy cranes detect unstable platform lean offsets to protect ground crews!"}
      </div>
    </div>
  );
};

const TiltFunFactVisual = () => {
  const [hasTilted, setHasTilted] = useState(false);

  return (
    <div className="relative w-full h-full min-h-[290px] flex flex-col items-center justify-between bg-zinc-950 overflow-hidden p-5 rounded-[28px] text-center select-none">
      <div className="absolute inset-0 bg-[radial-gradient(#eecf3e_1px,transparent_1px)] bg-[size:16px_16px] opacity-10 pointer-events-none" />
      
      {/* Header status */}
      <div className="w-full flex justify-between items-center bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800 backdrop-blur-sm z-10 text-[9px] font-mono">
        <div className="flex items-center gap-1.5 font-bold uppercase tracking-widest text-[#facc15]">
          <span className="w-2 h-2 rounded-full bg-yellow-500 animate-[bounce_1.5s_infinite]" />
          <span>Vintage arcade fact</span>
        </div>
        <span className="text-zinc-550 font-bold uppercase">CONSOLE STATUS: LIVE</span>
      </div>

      {/* Pinball cabinet container */}
      <div className="my-auto relative flex flex-col items-center justify-center p-1 z-10">
         <motion.div
           animate={hasTilted ? { 
             rotate: [-3, 3, -2, 2, -1, 1, 0],
             x: [-5, 5, -3, 3, -1, 1, 0]
           } : {}}
           transition={{ duration: 0.6 }}
           className="relative w-28 h-36 bg-gradient-to-b from-yellow-700 via-amber-900 to-amber-950 border-4 border-amber-600 rounded-3xl overflow-hidden flex flex-col justify-between p-2.5 shadow-2xl"
         >
            {/* Top digital scoreboard segment */}
            <div className="bg-zinc-950 rounded-xl border border-amber-600 p-1 flex flex-col items-center shadow-inner select-none">
               {hasTilted ? (
                 <motion.h4 
                   animate={{ opacity: [1, 0.2, 1] }} 
                   transition={{ duration: 0.3, repeat: Infinity }}
                   className="text-red-500 font-black text-sm tracking-widest uppercase text-center"
                 >
                   TILT!
                 </motion.h4>
               ) : (
                 <div className="flex flex-col items-center leading-none">
                    <span className="text-yellow-400 font-mono text-[7px] font-black uppercase tracking-wider">ARCADE SCORE</span>
                    <span className="text-emerald-400 font-mono text-xs tracking-widest font-black uppercase mt-0.5">99,420</span>
                 </div>
               )}
            </div>

            {/* Vintage neon play grid design */}
            <div className="flex-1 bg-zinc-950/90 rounded-xl border border-zinc-800 my-2 relative p-1 overflow-hidden flex flex-col justify-around">
               <div className="flex justify-between text-xs opacity-80">
                  <span className="animate-pulse">🔴</span>
                  <span className="animate-bounce delay-150">🟢</span>
               </div>
               
               {hasTilted ? (
                 <span className="text-[5px] text-zinc-500 font-black uppercase bg-zinc-900 py-1 rounded text-center border border-zinc-800">PLAY FIELD LOCKED</span>
               ) : (
                 <div className="w-full h-8 bg-zinc-900/60 rounded border border-zinc-800 flex items-center justify-center relative">
                    <motion.div 
                      animate={{ x: [-12, 12, -12] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                      className="w-3 h-3 rounded-full bg-slate-300 border border-slate-100 shadow-[0_0_8px_white]"
                    />
                 </div>
               )}
            </div>

            <button
               onClick={() => {
                 setHasTilted(true);
                 setTimeout(() => setHasTilted(false), 3000);
               }}
               className="w-full bg-[#fa5252] hover:bg-[#e03131] border border-[#ff8787] text-white py-1 rounded-xl font-black text-[7px] uppercase tracking-wider shadow"
            >
               SHAKE MACHINE TO CHEAT!
            </button>
         </motion.div>
      </div>

      <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-tight bg-zinc-900 border border-zinc-850 p-2 rounded-xl w-full z-10 leading-relaxed">
         {hasTilted 
           ? "❌ CHEATER DETECTED! Shaking tilted the internal ball onto the pinball contacts, freezing score accumulation!" 
           : "🕹️ Pinball machines safeguard against high shake forces using gravity tilt switches!"}
      </div>
    </div>
  );
};

// --- Custom Visuals for LDR (Light Sensor) Module ---

const LdrMeetVisual = () => {
  const [flashlightIntensity, setFlashlightIntensity] = useState(0); // 0 to 100

  return (
    <div className="relative w-full h-full min-h-[290px] flex flex-col items-center justify-between bg-zinc-950 overflow-hidden p-5 rounded-[28px] text-center select-none">
      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] bg-[size:16px_16px] opacity-10 pointer-events-none" />
      
      {/* Header status */}
      <div className="w-full flex justify-between items-center bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800 backdrop-blur-sm z-10 text-[9px] font-mono">
        <div className="flex items-center gap-1.5 font-bold uppercase tracking-widest text-[#facc15]">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-[pulse_1s_infinite]" />
          <span>Interactive Photoresistor API</span>
        </div>
        <span className="text-zinc-500 font-bold uppercase">LUX LEVEL: {flashlightIntensity}%</span>
      </div>

      {/* Main active LDR face representing the slide */}
      <div className="relative flex flex-col items-center justify-center my-auto py-2 z-10 w-full max-w-[280px]">
        {/* Flashlight Beam Visualization */}
        <div 
          className="absolute top-0 w-32 h-20 bg-amber-300/20 blur-xl rounded-full transition-all duration-300 pointer-events-none"
          style={{ 
            opacity: flashlightIntensity / 100,
            transform: `scale(${0.5 + (flashlightIntensity / 200)})` 
          }}
        />

        {/* LDR Component Visual */}
        <div className="relative w-20 h-20 bg-[#d4d4d8] border-4 border-[#a1a1aa] rounded-full flex items-center justify-center shadow-xl transition-all duration-300">
          <div className="absolute inset-2 bg-[#fee2e2] rounded-full border-2 border-slate-400 flex items-center justify-center overflow-hidden">
            {/* The squiggly conductor track */}
            <svg viewBox="0 0 100 100" className="w-full h-full p-2">
              <path 
                d="M 10,50 C 20,20 30,80 40,30 C 50,70 60,30 70,80 C 80,20 90,50 90,50" 
                fill="none" 
                stroke={flashlightIntensity > 40 ? '#f59e0b' : '#b91c1c'} 
                strokeWidth="8" 
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-colors duration-300"
              />
            </svg>
          </div>

          {/* Core connection rods at the sides */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-4 h-2 bg-slate-500 rounded-lg" />
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-2 bg-slate-500 rounded-lg" />
        </div>

        {/* Two silver/gold structural pin legs underneath */}
        <div className="flex gap-8 -mt-2.5 z-0 pb-3">
          <div className="w-1 h-8 bg-gradient-to-b from-zinc-400 to-zinc-650 rounded-b shadow" />
          <div className="w-1 h-8 bg-gradient-to-b from-zinc-400 to-zinc-650 rounded-b shadow" />
        </div>

        {/* Drag brightness controller */}
        <div className="w-full space-y-1.5 px-3 mb-1">
          <div className="flex justify-between items-center text-[8px] font-black text-zinc-400 uppercase tracking-widest">
            <span>🔦 Beam Flashlight Intensity</span>
            <span className="text-amber-400">{flashlightIntensity}%</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={flashlightIntensity} 
            onChange={(e) => setFlashlightIntensity(Number(e.target.value))}
            className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
        </div>
      </div>

      <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-tight bg-zinc-900 border border-zinc-850 p-2 rounded-xl w-full z-10 leading-relaxed">
        {flashlightIntensity > 0 
          ? `☀️ Shaking photons onto the face! Resistance is falling fast as light levels climb higher.` 
          : "Slide the flashlight bar to illuminate the squiggly track and trigger conduction!"}
      </div>
    </div>
  );
};

const LdrDefinitionVisual = () => {
  const [ambientDark, setAmbientDark] = useState(false);

  return (
    <div className="relative w-full h-full min-h-[290px] flex flex-col items-center justify-between bg-zinc-950 overflow-hidden p-5 rounded-[28px] text-center select-none transition-colors duration-500">
      <div className="absolute inset-0 bg-[radial-gradient(#eab308_1px,transparent_1px)] bg-[size:16px_16px] opacity-10 pointer-events-none" />
      
      {/* Header status */}
      <div className="w-full flex justify-between items-center bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800 backdrop-blur-sm z-10 text-[9px] font-mono">
        <div className="flex items-center gap-1.5 font-bold uppercase tracking-widest text-[#eab308]">
          <span className={`w-2 h-2 rounded-full ${ambientDark ? 'bg-zinc-650' : 'bg-yellow-400'} animate-pulse`} />
          <span>Interactive Light Dependent Registry</span>
        </div>
        <span className="text-zinc-505 font-bold uppercase">{ambientDark ? "Ambient: DARK" : "Ambient: BRIGHT"}</span>
      </div>

      {/* Robot Eye Sensor demonstration */}
      <div className="my-auto z-10 flex flex-col items-center gap-3">
         {/* Robot Face card */}
         <div className="w-40 h-32 bg-zinc-900/90 rounded-2xl border-2 border-zinc-800 flex flex-col items-center justify-center p-3 relative overflow-hidden shadow-2xl">
            <div className="absolute top-1.5 left-2 text-[7px] font-black text-zinc-500 uppercase tracking-widest">MCU-STATION EYE</div>
            
            {/* Robot Eyes Layout */}
            <div className="flex gap-6 mt-2">
               {/* Left eye: LDR sensor */}
               <div className="relative w-12 h-12 rounded-full bg-zinc-950 border-2 border-zinc-750 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-1.5 bg-[#fee2e2] rounded-full flex items-center justify-center opacity-85">
                     <svg viewBox="0 0 100 100" className="w-full h-full p-1 opacity-60">
                        <path d="M 10,50 C 20,20 30,80 40,30 C 50,70 60,30 70,80 C 80,20 90,50 90,50" fill="none" stroke="#b91c1c" strokeWidth="12" />
                     </svg>
                  </div>
                  {/* Digital pupil scale indicator */}
                  <div className={`absolute w-3 h-3 rounded-full bg-yellow-400 blur-[2px] transition-all duration-500 ${ambientDark ? 'scale-0' : 'scale-100'}`} />
               </div>

               {/* Right eye: LED indicator representing feedback */}
               <div className="relative w-12 h-12 rounded-full bg-zinc-950 border-2 border-zinc-755 flex items-center justify-center">
                  <div className={`w-6 h-6 rounded-full border-2 border-slate-805 transition-all duration-500 ${
                     ambientDark 
                       ? 'bg-yellow-400 shadow-[0_0_15px_#facc15] scale-110' 
                       : 'bg-zinc-800 scale-90'
                  }`} />
               </div>
            </div>

            <span className="text-[7px] font-black text-zinc-400 uppercase tracking-widest mt-3.5 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
               {ambientDark ? "💡 LED NIGHT LIGHT: ON 🔌" : "🌙 LED NIGHT LIGHT: STANDBY"}
            </span>
         </div>

         {/* Daylight Toggle Switch Button */}
         <button
           onClick={() => setAmbientDark(!ambientDark)}
           className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow border ${
             ambientDark 
               ? 'bg-zinc-805 border-zinc-700 text-yellow-400' 
               : 'bg-yellow-450 border-yellow-300 text-slate-900'
           }`}
         >
           {ambientDark ? "☀️ CHANGE TO DAYTIME" : "🌑 SIMULATE DARK ROOM"}
         </button>
      </div>

      <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-tight bg-zinc-900 border border-zinc-850 p-2 rounded-xl w-full z-10 leading-relaxed">
         {ambientDark 
           ? "🔴 high resistance mode! The LDR limits electric current, signaling the smart controller to light up the night lamp." 
           : "🟢 low resistance mode! Sunlight floods the LDR. Current flows easily, telling the smart controller to turn off the light."}
      </div>
    </div>
  );
};

const LdrHowItWorksVisual = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="relative w-full h-full min-h-[290px] flex flex-col items-center justify-between bg-zinc-950 overflow-hidden p-5 rounded-[28px] text-center select-none">
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] bg-[size:16px_16px] opacity-10 pointer-events-none" />
      
      {/* Header status */}
      <div className="w-full flex justify-between items-center bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800 backdrop-blur-sm z-10 text-[9px] font-mono">
        <div className="flex items-center gap-1.5 font-bold uppercase tracking-widest text-[#3b82f6]">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span>LDR Physics Animation</span>
        </div>
        <span className="text-zinc-550 font-bold uppercase">SECTION {step} / 3</span>
      </div>

      {/* Physics Lane Schematic */}
      <div className="my-auto w-full max-w-[320px] flex flex-col items-center gap-3.5 z-10">
         <div className="w-full h-36 bg-zinc-900/90 rounded-2xl border-2 border-zinc-800 flex flex-col items-center justify-center p-3 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:10px_10px]" />

            {step === 1 && (
              <div className="flex flex-col items-center justify-center space-y-1 animate-fadeIn text-center">
                 {/* Highway Squiggle representing the electrical roadway */}
                 <div className="relative w-44 h-12 bg-zinc-950 rounded-lg border border-zinc-800 flex items-center justify-center overflow-hidden">
                    <svg viewBox="0 0 100 40" className="w-full h-full">
                       <path d="M 5,20 C 25,-10 35,50 55,-10 C 75,50 85,15 95,20" fill="none" stroke="#64748b" strokeWidth="5" />
                    </svg>
                    {/* Floating electron particles */}
                    <motion.div animate={{ x: [0, 160] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute left-0 w-2 h-2 rounded-full bg-yellow-400" />
                 </div>
                 <h6 className="text-zinc-200 text-[10px] font-black uppercase tracking-wider mt-1.5">The Electricity Roadway</h6>
                 <p className="text-[7.5px] text-zinc-500 font-black tracking-widest uppercase leading-none">THE NARROW CADMIUM SULFIDE SQUIGGLY TRACK</p>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col items-center justify-center space-y-1 animate-fadeIn text-center">
                 <div className="relative w-44 h-12 bg-zinc-950 rounded-lg border-2 border-emerald-500 flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    {/* Golden bright highway theme */}
                    <div className="absolute inset-0 bg-emerald-500/10" />
                    <svg viewBox="0 0 100 40" className="w-full h-full">
                       <path d="M 5,20 C 25,-10 35,50 55,-10 C 75,50 85,15 95,20" fill="none" stroke="#10b981" strokeWidth="6" />
                    </svg>
                    {/* Zooming multiple electron dots */}
                    <motion.div animate={{ x: [0, 160] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="absolute left-0 w-2 h-2 rounded-full bg-[#34d399]" />
                    <motion.div animate={{ x: [0, 160] }} transition={{ duration: 1, repeat: Infinity, ease: "linear", delay: 0.3 }} className="absolute left-0 w-2 h-2 rounded-full bg-[#34d399]" />
                    <motion.div animate={{ x: [0, 160] }} transition={{ duration: 1, repeat: Infinity, ease: "linear", delay: 0.6 }} className="absolute left-0 w-2 h-2 rounded-full bg-[#34d399]" />
                 </div>
                 <h6 className="text-emerald-400 text-[10px] font-black uppercase tracking-wider mt-1.5">OPEN HIGHWAY (EASY FLOW)</h6>
                 <p className="text-[7.5px] text-emerald-500 font-extrabold tracking-wider leading-none">Photons excited! Resistance drops to nearly 0 ohms!</p>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col items-center justify-center space-y-1 animate-fadeIn text-center">
                 <div className="relative w-44 h-12 bg-zinc-950 rounded-lg border border-red-900/60 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-red-950/15" />
                    <svg viewBox="0 0 100 40" className="w-full h-full opacity-35">
                       <path d="M 5,20 C 25,-10 35,50 55,-10 C 75,50 85,15 95,20" fill="none" stroke="#ef4444" strokeWidth="4" />
                    </svg>
                    {/* Trapped slow particle barely moving */}
                    <motion.div animate={{ x: [0, 20, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute left-10 w-2 h-2 rounded-full bg-red-500 opacity-60" />
                 </div>
                 <h6 className="text-red-500 text-[10px] font-black uppercase tracking-wider mt-1.5">HEAVY TRAFFIC (LOCK-UP MODE)</h6>
                 <p className="text-[7.5px] text-red-100 font-extrabold tracking-wider leading-none">Light blocked! Resistance rises above 1,000,000 ohms!</p>
              </div>
            )}
         </div>

         {/* Steps Selector */}
         <div className="flex gap-2 justify-center w-full">
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                onClick={() => setStep(num)}
                className={`px-3 py-1 rounded-lg font-black uppercase text-[9px] tracking-widest transition-all ${
                  step === num 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
                }`}
              >
                Part {num}
              </button>
            ))}
         </div>
      </div>

      <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-tight bg-zinc-900 border border-zinc-850 p-2 rounded-xl w-full z-10 leading-relaxed">
         {step === 1 && "📌 Step 1: Electricity travels along the thin Cadmium Sulfide squiggly road."}
         {step === 2 && "📌 Step 2: Bright light delivers energy (photons), releasing electrons. The road opens up (LOW RESISTANCE)."}
         {step === 3 && "📌 Step 3: Blocked light starves conduction. The road blocks up, choking electrical flow (HIGH RESISTANCE)."}
      </div>
    </div>
  );
};

const LdrRealLifeUsesVisual = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [isDark, setIsDark] = useState(true);

  return (
    <div className="relative w-full h-full min-h-[290px] flex flex-col items-center justify-between bg-zinc-950 overflow-hidden p-5 rounded-[28px] text-center select-none animate-fadeIn">
      <div className="absolute inset-0 bg-[radial-gradient(#ec4899_1px,transparent_1px)] bg-[size:16px_16px] opacity-10 pointer-events-none" />
      
      {/* Header status */}
      <div className="w-full flex justify-between items-center bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800 backdrop-blur-sm z-10 text-[9px] font-mono">
        <div className="flex items-center gap-1.5 font-bold uppercase tracking-widest text-[#ec4899]">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span>Real-World LDR Applications</span>
        </div>
        <span className="text-zinc-550 font-bold uppercase">{isDark ? "ROOM: NIGHT TIME" : "ROOM: DAY TIME"}</span>
      </div>

      {/* Main visual simulator */}
      <div className="my-auto w-full max-w-[340px] flex flex-col items-center gap-3 z-10">
         <div className="w-full h-32 bg-zinc-900/95 rounded-2xl border border-zinc-805 flex flex-col items-center justify-center p-3 relative overflow-hidden transition-all duration-300">
            {/* Ambient darkness overlay */}
            <div className={`absolute inset-0 transition-opacity duration-500 bg-black/60 pointer-events-none z-0 ${isDark ? 'opacity-100' : 'opacity-0'}`} />

            {/* Application 1: Streetlights */}
            {activeTab === 1 && (
               <div className="flex flex-col items-center justify-center space-y-1.5 z-10 animate-fadeIn">
                  <div className="relative w-10 h-16 flex flex-col items-center">
                     {/* Street Lamp Post */}
                     <div className="w-1.5 h-full bg-slate-700 rounded-lg absolute bottom-0 left-1/2 -translate-x-1/2" />
                     {/* Lamp shade */}
                     <div className="w-8 h-4 bg-slate-800 rounded-t-full absolute top-1 flex justify-center items-center">
                        <div className="w-3 h-1 bg-zinc-550 rounded-full" />
                     </div>
                     {/* Active lantern glow at night */}
                     <div className={`w-12 h-12 bg-yellow-300 rounded-full blur-md absolute top-4 transition-opacity duration-500 ${isDark ? 'opacity-70' : 'opacity-0'}`} />
                     <div className={`w-3 h-3 rounded-full bg-amber-200 absolute top-4 transition-all duration-500 ${isDark ? 'scale-100' : 'scale-0'}`} />
                  </div>
                  <h6 className="text-zinc-200 text-[10px] font-black uppercase tracking-wider mt-1">Automatic Streetlight</h6>
               </div>
            )}

            {activeTab === 2 && (
               <div className="flex flex-col items-center justify-center space-y-2 z-10 animate-fadeIn">
                  <div className="flex gap-4 items-center animate-pulse">
                     {/* Cute Garden Flower */}
                     <span className="text-3xl">🌻</span>
                     {/* Yard spotlight */}
                     <div className="relative w-8 h-8 rounded-xl bg-slate-800 border border-slate-705 flex items-center justify-center text-sm">
                        ☀️
                        <div className={`absolute inset-0 bg-yellow-400 rounded-xl blur-sm transition-opacity duration-300 ${isDark ? 'opacity-35' : 'opacity-0'}`} />
                     </div>
                  </div>
                  <h6 className="text-zinc-200 text-[10px] font-black uppercase tracking-wider mt-1">Solar Garden Spike</h6>
               </div>
            )}

            {activeTab === 3 && (
               <div className="flex flex-col items-center justify-center space-y-2.5 z-10 w-full max-w-[180px] animate-fadeIn">
                  {/* Smartphone Frame */}
                  <div className="w-24 h-16 bg-zinc-950 border border-zinc-800 rounded-lg p-1 px-1.5 flex flex-col justify-between shadow-lg">
                     {/* Ear speaker / small light sensor notch at top */}
                     <div className="flex justify-between items-center w-full">
                        <div className="w-4 h-0.5 bg-zinc-700 rounded-full mx-auto" />
                        <div className="w-1 h-1 rounded-full bg-blue-400 opacity-60" />
                     </div>
                     
                     {/* Display screen which glows bright or dims down */}
                     <div className="flex-1 rounded bg-[#1e293b] border border-[#334155] my-1 flex flex-col items-center justify-center p-0.5 transition-all duration-500"
                          style={{ filter: isDark ? 'brightness(0.6)' : 'brightness(1.5)' }}>
                        <span className="text-[5px] font-black uppercase tracking-widest text-slate-300 animate-pulse">AUTO-BRIGHT</span>
                        <div className="w-10 h-1 bg-sky-400 rounded-full mt-1 overflow-hidden">
                           <div className="h-full bg-white transition-all duration-500" style={{ width: isDark ? '30%' : '90%' }} />
                        </div>
                     </div>
                  </div>
                  <h6 className="text-zinc-200 text-[10px] font-black uppercase tracking-wider leading-none">Smart Phone Auto-Brightness</h6>
               </div>
            )}
         </div>

         {/* Grid Selectors + Day/Night slider */}
         <div className="grid grid-cols-4 gap-1.5 w-full items-center">
            <button
               onClick={() => setActiveTab(1)}
               className={`py-1.5 rounded-xl text-[7px] font-black uppercase tracking-wider border transition-all ${
                 activeTab === 1 
                   ? 'bg-rose-650 border-rose-500 text-white shadow shadow-rose-900/20' 
                   : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-850'
               }`}
            >
               1. Streetlight
            </button>
            <button
               onClick={() => setActiveTab(2)}
               className={`py-1.5 rounded-xl text-[7px] font-black uppercase tracking-wider border transition-all ${
                 activeTab === 2 
                   ? 'bg-rose-650 border-rose-500 text-white shadow shadow-rose-900/20' 
                   : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-850'
               }`}
            >
               2. Sol Garden
            </button>
            <button
               onClick={() => setActiveTab(3)}
               className={`py-1.5 rounded-xl text-[7px] font-black uppercase tracking-wider border transition-all ${
                 activeTab === 3 
                   ? 'bg-rose-650 border-rose-500 text-white shadow shadow-rose-900/20' 
                   : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-850'
               }`}
            >
               3. Phone Dim
            </button>
            
            {/* Ambient room slide button */}
            <button
               onClick={() => setIsDark(!isDark)}
               className="bg-[#228be6] hover:bg-[#1c7ed6] border border-[#74c0fc] text-white py-1.5 rounded-xl font-black text-[7px] uppercase tracking-wider shadow"
            >
               {isDark ? "💡 TURN ON DAY" : "🌑 OFF ROOM LIGHT"}
            </button>
         </div>
      </div>

      <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-tight bg-zinc-900 border border-zinc-850 p-2 rounded-xl w-full z-10 leading-relaxed">
         {activeTab === 1 && (isDark ? "💡 Streetlights trigger automatically as ambient daylight drops!" : "💡 Daytime sunlight drops streetlight activation to protect power outputs.")}
         {activeTab === 2 && (isDark ? "💡 Lawn lighting activates as LDR reads low light, running on daytime solar charge!" : "💡 Sun shines: Lawn spike goes offline and gathers energy from solar panels.")}
         {activeTab === 3 && (isDark ? "💡 Your phone screen dims significantly to protect your eyes inside dark rooms!" : "💡 Sunlight raises screen brightness automatically to let you read displays comfortably.")}
      </div>
    </div>
  );
};

const LdrFunFactVisual = () => {
  const [sunPosition, setSunPosition] = useState(50); // 10 to 90

  return (
    <div className="relative w-full h-full min-h-[290px] flex flex-col items-center justify-between bg-zinc-950 overflow-hidden p-5 rounded-[28px] text-center select-none">
      <div className="absolute inset-0 bg-[radial-gradient(#a855f7_1px,transparent_1px)] bg-[size:16px_16px] opacity-10 pointer-events-none" />
      
      {/* Header status */}
      <div className="w-full flex justify-between items-center bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800 backdrop-blur-sm z-10 text-[9px] font-mono">
        <div className="flex items-center gap-1.5 font-bold uppercase tracking-widest text-[#a855f7]">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-[bounce_1.5s_infinite]" />
          <span>Sunflower Tracker Tech</span>
        </div>
        <span className="text-zinc-550 font-bold uppercase">POSITION: {sunPosition}° E</span>
      </div>

      {/* Main track representing the sun flight */}
      <div className="my-auto w-full max-w-[320px] flex flex-col items-center gap-3 z-10 relative">
         {/* Sky container */}
         <div className="w-full h-28 bg-zinc-900/60 rounded-2xl border border-zinc-800 relative py-2 overflow-hidden flex items-center justify-center">
            {/* The sun emoji positioned according to range */}
            <motion.div 
              animate={{ x: `${(sunPosition - 50) * 2.8}px` }}
              className="absolute top-4 w-10 h-10 rounded-full bg-yellow-300 shadow-[0_0_25px_#eab308] flex items-center justify-center text-lg z-0"
            >
               ☀️
            </motion.div>

            {/* Sunflower/Solar Panel tracker rotating with sun */}
            <motion.div 
              animate={{ rotate: (sunPosition - 50) * 0.9 }}
              transition={{ type: "spring", stiffness: 80 }}
              className="flex flex-col items-center z-10 mt-8"
            >
               {/* Panel face grid */}
               <div className="w-16 h-8 bg-sky-950 border-2 border-sky-400 rounded flex gap-1 p-1 shadow-lg relative">
                  <div className="flex-1 bg-sky-900/40 rounded border border-sky-600/65 flex items-center justify-center text-[10px]">🌻</div>
                  <div className="flex-1 bg-sky-900/40 rounded border border-sky-600/65 flex items-center justify-center text-[10px]">📡</div>
                  
                  {/* Miniature LDR eyes representation on the corners */}
                  <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-red-500 border border-white" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 border border-white" />
               </div>
               {/* Stand */}
               <div className="w-2 h-8 bg-slate-600" />
            </motion.div>
         </div>

         {/* Slide Control */}
         <div className="w-full space-y-1">
            <div className="flex justify-between items-center text-[8px] font-black text-zinc-400 uppercase tracking-widest">
               <span>🧭 Drag to track Sun coordinates</span>
               <span className="text-purple-400">{sunPosition}° E</span>
            </div>
            <input 
              type="range" 
              min="15" 
              max="85" 
              value={sunPosition} 
              onChange={(e) => setSunPosition(Number(e.target.value))}
              className="w-full h-1 bg-zinc-800 rounded appearance-none cursor-pointer accent-purple-500"
            />
         </div>
      </div>

      <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-tight bg-zinc-900 border border-zinc-850 p-2 rounded-xl w-full z-10 leading-relaxed">
         💡 sunflower tracker panel: Four corner LDR sensors evaluate brightness. The tracker rotates until light scales are perfectly balanced!
      </div>
    </div>
  );
};

// --- HIGH-FIDELITY UNIFIED HARDWARE BLUEPRINTS FOR STUDENTS ---
const UnifiedSensorBlueprint = ({ moduleId }: { moduleId: string }) => {
  const [val, setVal] = useState<number>(50); // General use slider state
  const [activeLabel, setActiveLabel] = useState<number | null>(null);
  const [clicked, setClicked] = useState(false);
  const [joy, setJoy] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [rotAngle, setRotAngle] = useState(0);
  const [matrix, setMatrix] = useState<boolean[]>(() => 
    Array(64).fill(false).map((_, i) => [18,19,20,21,26,29,34,37,42,45,50,51,52,53].includes(i)) // Pre-populated face
  );

  const handleJoystickDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / (rect.width / 2)) - 1));
    const y = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / (rect.height / 2)) - 1));
    setJoy({ x, y });
  };

  // Sensor definitions: component naming, colors, call-outs
  const specs: Record<string, {
    title: string;
    sub: string;
    labels: { idx: number; name: string; desc: string }[];
  }> = {
    tilt: {
      title: "Metallic Tilt Switch",
      sub: "SW-200D Gravity Ball Sensor",
      labels: [
        { idx: 1, name: "Gold-Plated Metal Capsule", desc: "Sealing chamber with vacuum contact lines." },
        { idx: 2, name: "Dual Gravity Rolling Particles", desc: "Two rolling metal spheres bridging contacts." },
        { idx: 3, name: "Internal Conduction Pins", desc: "Pin leads connected when the sensor is upright." }
      ]
    },
    'ir-sensor': {
      title: "Infrared Proximity Switch",
      sub: "FC-51 Obstacle Sensor Board",
      labels: [
        { idx: 1, name: "IR Transmitter LED (Clear)", desc: "Constantly projects invisible infrared light." },
        { idx: 2, name: "IR Receiver Photodiode (Dark)", desc: "Captures reflected infrared wave bounces." },
        { idx: 3, name: "Calibration Potentiometer", desc: "Adjustable trimmer screw to set detection ranges." }
      ]
    },
    ultrasonic: {
      title: "Ultrasonic Ranging Transceiver",
      sub: "HC-SR04 Sonic Sound Ruler",
      labels: [
        { idx: 1, name: "Ultrasonic Transmitter (TX)", desc: "Projects high-frequency sound cycles at 40kHz." },
        { idx: 2, name: "Ultrasonic Receiver (RX)", desc: "Captures high-frequency acoustic reflections." },
        { idx: 3, name: "MAX3232 Control Micro-Engine", desc: "Computes wave travels down to microsecond scales." }
      ]
    },
    'reed-switch': {
      title: "Magnetic Glass Reed Switch",
      sub: "KY-021 Hermetic Metal Switch",
      labels: [
        { idx: 1, name: "Hermetic Tube Envelope", desc: "Seals double metal reeds from humidity and corrosion." },
        { idx: 2, name: "Ferromagnetic Reeds", desc: "Two overlapping clean metal leaves that snap shut under magnetism." },
        { idx: 3, name: "Pull-up Resistor", desc: "Ensures noise-free logical state transitions on signal lines." }
      ]
    },
    joystick: {
      title: "2-Axis Joystick Controller",
      sub: "Dual Potentiometer SW-Thumbstick",
      labels: [
        { idx: 1, name: "Ergonomic Thumb Cap", desc: "Slick textured cap for complete 360° steering angles." },
        { idx: 2, name: "X & Y Potentiometers", desc: "Rotational dials translating tilt angles to signals." },
        { idx: 3, name: "Z-Axis Click Button", desc: "Tactile key switch triggered by pushing thumbstick straight down." }
      ]
    },
    'rotary-encoder': {
      title: "Endless Rotary Encoder Knob",
      sub: "EC11 Incremental Pulse Controller",
      labels: [
        { idx: 1, name: "Endless D-Shaft Spindle", desc: "Twists endlessly left & right with smooth mechanical clicks." },
        { idx: 2, name: "Shutter Disc and Spring", desc: "Inner slotted plate interrupting light or contact lines." },
        { idx: 3, name: "CLK / DT Signal Pins", desc: "Dual phase shifted waves delivering directional spin pulses." }
      ]
    },
    'flame-sensor': {
      title: "Infrared Flame Detector",
      sub: "YG1006 Heat-Radiation Photodiode",
      labels: [
        { idx: 1, name: "Infrared Phototransistor Eye", desc: "Dark glass bulb responsive strictly to light in the flame spectrum." },
        { idx: 2, name: "LM393 Comparator IC", desc: "Compares voltages against limit reference to trigger digital alarm." },
        { idx: 3, name: "AO / DO Signal Outputs", desc: "Supplies analog values and quick digital alert pins." }
      ]
    },
    'smoke-sensor': {
      title: "Gas & Smoke Sniffer Panel",
      sub: "MQ-2 Micro Heater Chemical Sensor",
      labels: [
        { idx: 1, name: "Anti-Blowback Mesh Shield", desc: "High temperature metal dome protecting sensitive chemicals inside." },
        { idx: 2, name: "Sniffer Chemical Core", desc: "Tin-dioxide layer that changes electrical flow in gas presence." },
        { idx: 3, name: "Internal Heating Filament", desc: "Micro heating core heating the sniffer element for reliable reaction." }
      ]
    },
    'soil-moisture': {
      title: "Soil Moisture Dual-Prong Probe",
      sub: "Corrosion-Proof Resistive Spade",
      labels: [
        { idx: 1, name: "Resistive Conduction Spears", desc: "Sturdy flat spade forks that slide easily into mud/dirt." },
        { idx: 2, name: "Anti-Oxidation Gold Tracks", desc: "Conductive tracks plated to withstand wet dirt electrolysis damage." },
        { idx: 3, name: "Onboard Signal Extender", desc: "Dedicated amplifier boosting signals to analog/digital lines." }
      ]
    },
    'temperature-sensor': {
      title: "Silicon Temperature Sensor",
      sub: "LM35 Precision Analog Heat Probe",
      labels: [
        { idx: 1, name: "Solid-State Transistor Shell", desc: "Durable epoxy capsule keeping silicon core safe from water." },
        { idx: 2, name: "Linear Thermodiode Core", desc: "Changes electrical flow linearly: exactly 10 millivolts per degree." },
        { idx: 3, name: "High-Tolerance Leg Pins", desc: "Triple gold-alloy legs carrying positive, negative, and signal paths." }
      ]
    },
    'sound-sensor': {
      title: "Acoustic Decibel Sound Sensor",
      sub: "High-Gain Condenser Microphone",
      labels: [
        { idx: 1, name: "Condenser Micro-Capsule", desc: "Cylinder with ultra-thin vibrating diaphragm catching sound waves." },
        { idx: 2, name: "Onboard Audio Booster Chip", desc: "Multiplies micro-volt whispers to full operational voltages." },
        { idx: 3, name: "Noise Gate Potentiometer", desc: "Spinnable trimmer screw calibrating the trigger sensitivity." }
      ]
    },
    'light-cup': {
      title: "Fluorescent Light Cup Module",
      sub: "Integrated Tilt-LED Dual Action",
      labels: [
        { idx: 1, name: "Capsulated Tilt Chamber", desc: "Hermetic cylinder containing rolling liquid mercury or metallic ball." },
        { idx: 2, name: "Co-Integrated Indicator LED", desc: "Onboard 5mm colored LED linked to report tilting." },
        { idx: 3, name: "Signal Connect Board", desc: "Routes signals to fade background bulbs in interactive dual layouts." }
      ]
    },
    'knock-sensor': {
      title: "Shock Knock Vibration Sensor",
      sub: "KY-031 Miniature Spring-Vibe Switch",
      labels: [
        { idx: 1, name: "Shock Spring Container", desc: "Miniature protective cylinder containing a thin, loose spring." },
        { idx: 2, name: "Central Strike Electrode", desc: "Metal core terminal that the wiggling spring crashes into when bumped." },
        { idx: 3, name: "Solder Base Connection", desc: "Durable anchor transfering outer shakes to internal spring." }
      ]
    },
    'dot-matrix': {
      title: "8x8 Red LED Pixel Grid",
      sub: "MAX7219 Multiplied Grid Display",
      labels: [
        { idx: 1, name: "64-Pixel LED Module Card", desc: "Casing sealing 64 individual red light diodes in neat grid rows." },
        { idx: 2, name: "MAX7219 Shift Register Driver", desc: "Backside chip routing matrix paths with only three inputs." },
        { idx: 3, name: "Daisy-Chain Input/Output Ports", desc: "Double connector rows that allow linking multiple displays." }
      ]
    },
    ldr: {
      title: "Light Dependent Resistor Module",
      sub: "Photo-Conductive Cadmium-Sulfide Cell",
      labels: [
        { idx: 1, name: "Serpentine Photoconductive Disc", desc: "Cadmium-Sulfide squiggle line whose resistance drops in bright daylight." },
        { idx: 2, name: "LM393 Comparator IC", desc: "High efficiency chip evaluating light limits to toggle digital alarms." },
        { idx: 3, name: "Sensitivity Calibrator Screw", desc: "Spinnable screw dial adjusting exact room brightness checkpoints." }
      ]
    },
    heartbeat: {
      title: "Optical Heartbeat Pulse Sensor",
      sub: "Finger & Earlobe Photoplethysmography (PPG)",
      labels: [
        { idx: 1, name: "Reverse-Mounted Kingbright LED", desc: "Super-bright green light diode casting light into subcutaneous capillary tissue." },
        { idx: 2, name: "APDS-9008 Photodiode Sensor", desc: "Ultra-sensitive optical receptor element measuring tiny changes in light absorption." },
        { idx: 3, name: "Amplifier & Noise Filter Core", desc: "Integrated operational amplifier (Op-Amp) maximizing cardiac pulse wave peaks." }
      ]
    },
    laser: {
      title: "Laser Transmitter Module",
      sub: "KY-008 Solid-State Laser Pointer Core",
      labels: [
        { idx: 1, name: "Laser Diode Brass Tube", desc: "Sturdy copper/brass protective housing encapsulating the active laser crystal and focused glass objective lens." },
        { idx: 2, name: "Current-Limiting Resistor", desc: "Surface mount resistor safeguarding the delicate laser crystal from power spikes." },
        { idx: 3, name: "3-Pin Interface Rail", desc: "Terminal header pins representing Ground, VCC (+5V), and the digital Signal Trigger input." }
      ]
    },
    humidity: {
      title: "DHT11 Climate Sensor",
      sub: "Capacitive Humidity & Temperature Grid",
      labels: [
        { idx: 1, name: "Perforated Ventilation Housing", desc: "Blue plastic grid shell permitting clean surrounding airflow to reach the underlying sensing elements safely." },
        { idx: 2, name: "Hygroscopic Humidity Core", desc: "Sensing substrate that changes surface resistance in proportion to water vapor absorption." },
        { idx: 3, name: "Calibration High-Speed Micro", desc: "Built-in 8-bit chip processing analog resistance changes into a clean serial output stream." }
      ]
    },
    tracking: {
      title: "TCRT5000 Tracking Sensor",
      sub: "Infrared Optical Reflective Barrier Module",
      labels: [
        { idx: 1, name: "IR Emitter Diode (Black)", desc: "Narrow-angle gallium arsenide diode projecting high-intensity invisible 950nm infrared light downwards." },
        { idx: 2, name: "IR Phototransistor Receiver (Blue)", desc: "High-speed optical transistor capturing matching bounces of reflected 950nm light." },
        { idx: 3, name: "LM393 Voltage Comparator Node", desc: "Dual precision micro-comparator comparing the analog reflection to fine-adjusted threshold limits." }
      ]
    },
    touch: {
      title: "TTP223 Touch Switch",
      sub: "Capacitive Solid-State Proximity Pad",
      labels: [
        { idx: 1, name: "Concentric Sensing Pad", desc: "Copper capacitive ring layout on the top PCB layer establishing an electrostatic field boundary." },
        { idx: 2, name: "TTP223B Integration IC", desc: "Miniature high-performance CMOS Touch Controller executing adaptive charge detection." },
        { idx: 3, name: "Sensitivity Adjustment Bridge", desc: "Solder jumper pad for switching output modes or tuning detection thresholds dynamically." }
      ]
    }
  };

  const currentSpec = specs[moduleId] || {
    title: "Component Blueprint",
    sub: "Standard Arduino Device Module",
    labels: [
      { idx: 1, name: "Active Sensor Element", desc: "The primary physical component that interacts with environmental forces." },
      { idx: 2, name: "Signal Processing Circuitry", desc: "Resistors, diodes, and operational chips stabilizing outputs." },
      { idx: 3, name: "Triple Output Interconnects", desc: "Standard pins: Positive power (VCC), Ground (GND), and signal outputs." }
    ]
  };

  return (
    <div className="relative w-full h-full min-h-[460px] flex flex-col justify-between bg-zinc-950 overflow-hidden p-6 rounded-[36px] select-none text-center text-white border-2 border-zinc-904/55">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#00f2fe_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.03] pointer-events-none" />

      {/* Header telemetry info bar */}
      <div className="w-full flex justify-between items-center bg-zinc-900/60 px-4 py-2 rounded-2xl border border-zinc-800/80 backdrop-blur-sm z-10 text-[9px] font-mono">
        <div className="flex items-center gap-1.5 text-cyan-400">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-[pulse_1.5s_infinite]" />
          <span className="tracking-widest font-black uppercase">LAB HARDWARE BLUEPRINT</span>
        </div>
        <span className="text-zinc-500 font-bold tracking-wider">{moduleId.toUpperCase()} // DIAGRAM_V2</span>
      </div>

      {/* Interactive Visual Canvas Area */}
      <div className="flex-1 flex flex-col items-center justify-center my-4 relative z-10 h-40">
        {moduleId === 'tilt' && (
          <div className="relative flex flex-col items-center gap-2">
            <motion.div 
              animate={{ rotate: clicked ? [0, 45, 0, -45, 0] : [0, 5, 0, -5, 0] }}
              transition={{ duration: clicked ? 0.8 : 3, repeat: clicked ? 0 : Infinity }}
              onClick={() => setClicked(true)}
              onAnimationComplete={() => setClicked(false)}
              className="relative cursor-pointer hover:scale-105 transition-transform"
            >
              {/* Glass Tube representation */}
              <div className="w-28 h-10 bg-zinc-900/90 border-2 border-zinc-700/80 rounded-full flex items-center justify-between p-1 px-4 relative shadow-xl">
                {/* Rolling spheres inside */}
                <motion.div 
                  animate={{ x: clicked ? [0, 45, 0, -45, 0] : [10, 15, 10] }}
                  transition={{ duration: clicked ? 0.8 : 2 }}
                  className="w-4 h-4 bg-amber-400 rounded-full shadow-[0_0_8px_#fbbf24] absolute"
                />
                <motion.div 
                  animate={{ x: clicked ? [0, 40, 0, -35, 0] : [20, 24, 20] }}
                  transition={{ duration: clicked ? 0.8 : 1.8 }}
                  className="w-3.5 h-3.5 bg-amber-500 rounded-full shadow-[0_0_6px_#fbbf24] absolute"
                />
                <div className="w-3 h-4 border-l-2 border-zinc-500 absolute left-4" />
                <div className="w-1.5 h-6 bg-zinc-600 rounded-xs absolute right-3" />
                {/* Pin leads */}
                <div className="w-8 h-0.5 bg-zinc-500 absolute -right-8 top-1/2 -translate-y-1/2" />
                <div className="w-8 h-0.5 bg-zinc-500 absolute -right-8 top-1/4" />
              </div>
              {/* Tap to Shake hint prompt */}
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-black text-cyan-400 tracking-widest uppercase animate-pulse w-max">
                👈 CLICK TO SHAKE
              </span>
            </motion.div>
          </div>
        )}

        {moduleId === 'ir-sensor' && (
          <div className="relative flex items-center justify-center gap-3">
            <div className="bg-zinc-900 border-2 border-zinc-800 p-4 rounded-xl flex items-center gap-3 shadow-2xl relative w-44">
              {/* POT */}
              <div className="w-7 h-7 bg-blue-600 rounded border border-blue-500 flex flex-col items-center justify-center relative">
                <div className="w-4 h-4 bg-zinc-700 border border-zinc-500 rounded-full flex items-center justify-center text-[8px] font-mono text-white select-none">
                  +
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {/* Emitter */}
                <div className="relative flex items-center gap-2">
                  <div className="w-8 h-4 bg-cyan-700/80 rounded border-2 border-cyan-400 flex items-center justify-end px-1 shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                    <span className="w-1 h-2 bg-white rounded-full animate-pulse" />
                  </div>
                  <span className="text-[7px] font-bold text-cyan-400">TX</span>
                  <div className="absolute left-9 flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <motion.span 
                        key={i}
                        animate={{ opacity: [0, 1, 0], x: [0, 15] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
                        className="w-1 h-3 border-r border-dashed border-cyan-400 rounded-full"
                      />
                    ))}
                  </div>
                </div>
                {/* Receiver */}
                <div className="relative flex items-center gap-2">
                  <div className="w-8 h-4 bg-purple-950/90 rounded border-2 border-purple-500 flex items-center justify-end px-1 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                    <span className="w-1 h-2 bg-purple-400 rounded-full" />
                  </div>
                  <span className="text-[7px] font-bold text-purple-400">RX</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {moduleId === 'ultrasonic' && (
          <div className="relative flex items-center gap-6 bg-zinc-900 border-2 border-zinc-800 p-5 rounded-[24px] shadow-2xl w-56 justify-center">
            {/* Metal pins outline */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-3 bg-amber-500 rounded-sm flex justify-around px-1 z-0 shadow">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-0.5 h-3 bg-zinc-300 rounded" />
              ))}
            </div>

            {/* Speaker 1 (TX) */}
            <div className="relative w-14 h-14 bg-zinc-950 rounded-full border-4 border-zinc-700 flex flex-col items-center justify-center shadow-inner">
              <div className="w-10 h-10 bg-zinc-900 rounded-full border border-dashed border-zinc-600 flex items-center justify-center">
                 <span className="text-[8px] font-mono font-black text-emerald-400 animate-pulse">TX</span>
              </div>
              {/* Soundwaves pulsing */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-dashed border-emerald-500/20 animate-ping pointer-events-none" />
            </div>

            {/* Speaker 2 (RX) */}
            <div className="relative w-14 h-14 bg-zinc-950 rounded-full border-4 border-zinc-700 flex flex-col items-center justify-center shadow-inner">
              <div className="w-10 h-10 bg-zinc-900 rounded-full border border-dashed border-zinc-650 flex items-center justify-center">
                 <span className="text-[8px] font-mono font-black text-cyan-400">RX</span>
              </div>
            </div>
          </div>
        )}

        {moduleId === 'reed-switch' && (
          <div className="relative flex flex-col items-center gap-3">
            <div className="flex items-center gap-4">
              <div className="relative w-36 h-8 bg-emerald-950/40 border border-emerald-500/30 rounded-full flex items-center justify-center p-1 font-mono">
                {/* Thin overlapping blades */}
                <div className="w-10 h-0.5 bg-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <div className="w-10 h-0.5 bg-zinc-500 absolute right-4 top-1/2 -translate-y-1/2" />
                {/* Spark when connected */}
                {clicked && (
                  <motion.div 
                    animate={{ scale: [1, 2, 1], opacity: [1, 0] }}
                    className="absolute z-10 w-4 h-4 bg-yellow-400 rounded-full blur-[2px]"
                  />
                )}
                {/* Reeds moving */}
                <motion.div 
                  animate={{ rotate: clicked ? -2 : 0 }}
                  className="w-12 h-[3px] bg-zinc-300 absolute left-8 origin-left"
                />
                <motion.div 
                  animate={{ rotate: clicked ? 2 : 0 }}
                  className="w-12 h-[3px] bg-zinc-300 absolute right-8 origin-right"
                />
              </div>
              {/* Magnetic sensor */}
              <motion.div 
                drag
                dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
                dragElastic={0.1}
                onDrag={(e, info) => {
                  const dist = Math.abs(info.point.x);
                  if (dist < 40) {
                    setClicked(true);
                  } else {
                    setClicked(false);
                  }
                }}
                className="w-12 h-6 bg-red-600 border border-red-500 rounded flex items-center justify-between text-[7px] font-black font-mono cursor-grab active:cursor-grabbing p-1.5 shadow-lg relative"
              >
                <div className="bg-red-800 px-1 rounded-sm text-white font-bold">N</div>
                <div className="bg-blue-800 px-1 rounded-sm text-white font-bold">S</div>
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[6px] tracking-wider uppercase text-red-400">DRAG ME</span>
              </motion.div>
            </div>
          </div>
        )}

        {moduleId === 'joystick' && (
          <div className="relative flex flex-col items-center gap-1.5">
            <div 
              onMouseMove={handleJoystickDrag}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => { setIsDragging(false); setJoy({ x: 0, y: 0 }); }}
              onMouseLeave={() => { setIsDragging(false); setJoy({ x: 0, y: 0 }); }}
              className="relative w-28 h-28 bg-zinc-900 border-2 border-zinc-800 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing shadow-inner"
            >
              <div className="absolute inset-4 border border-zinc-800/80 rounded-full border-dashed" />
              {/* Dynamic joystick thumb controller */}
              <motion.div 
                style={{ x: joy.x * 24, y: joy.y * 24 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-12 h-12 bg-zinc-850 border-4 border-zinc-700/80 rounded-full flex items-center justify-center shadow-xl relative"
              >
                <div className="w-4 h-4 bg-zinc-950 border border-zinc-850 rounded-full shadow-inner" />
              </motion.div>
            </div>
            <div className="text-[8px] font-mono uppercase tracking-widest text-indigo-400">
              X: {Math.round((joy.x + 1) * 512)} | Y: {Math.round((joy.y + 1) * 512)}
            </div>
          </div>
        )}

        {moduleId === 'rotary-encoder' && (
          <div className="relative flex flex-col items-center gap-2">
            <motion.div 
              drag="y"
              dragConstraints={{ top: -100, bottom: 100 }}
              onDrag={(e, info) => {
                setRotAngle(prev => (prev + (info.delta.y * 3)) % 360);
              }}
              className="relative w-24 h-24 bg-zinc-900 border-4 border-zinc-800 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing p-1.5"
            >
              {/* Notching notches rotating */}
              <motion.div 
                style={{ rotate: rotAngle }}
                className="relative w-full h-full rounded-full border-4 border-zinc-700/90 flex items-center justify-center"
              >
                <div className="w-1.5 h-6 bg-zinc-500 rounded absolute top-1 origin-bottom" />
                <div className="w-3 h-3 bg-[#e60515] rounded-full absolute" />
              </motion.div>
            </motion.div>
            <div className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">
              👈 DRAG UP/DOWN TO SPIN KNOB
            </div>
          </div>
        )}

        {moduleId === 'flame-sensor' && (
          <div className="relative flex flex-col items-center gap-2">
            <div className="flex items-center gap-6">
              <div className="bg-zinc-900 border-2 border-zinc-800 p-4 rounded-xl shadow-2xl relative w-36 flex items-center justify-center">
                <div className="w-8 h-10 bg-zinc-950 rounded border-2 border-zinc-800 relative flex items-center justify-center p-2 shadow-inner">
                  <div className="w-5 h-5 bg-zinc-900 rounded-full border border-dashed border-zinc-700 flex items-center justify-center">
                    <span className="w-2.5 h-2.5 bg-black rounded-full" />
                  </div>
                  {/* Glowing signal lamp */}
                  {clicked && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-400 animate-ping" />
                  )}
                </div>
              </div>
              
              {/* animated flame model */}
              <motion.div 
                animate={{ scale: [1, 1.15, 0.95, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                onClick={() => setClicked(!clicked)}
                className="w-12 h-16 flex items-end justify-center cursor-pointer select-none"
              >
                <div className="relative w-10 h-10 bg-amber-500 rounded-full blur-[2px] flex items-center justify-center">
                  <div className="w-7 h-10 bg-orange-650 rounded-full absolute bottom-1 blur-[1px]" />
                  <div className="w-4 h-10 bg-yellow-400 rounded-full absolute bottom-1.5 animate-pulse" />
                </div>
              </motion.div>
            </div>
            <span className="text-[8px] font-mono tracking-wider text-red-400 uppercase">
              {clicked ? "🔥 FIRE ALARM DETECTED" : "👉 CLICK FLAME TO ACTIVATE"}
            </span>
          </div>
        )}

        {moduleId === 'smoke-sensor' && (
          <div className="relative flex flex-col items-center gap-3">
            <div className="relative flex items-center gap-8">
              {/* MQ-2 gas cap */}
              <div className="w-20 h-20 rounded-full border-4 border-zinc-700 bg-zinc-900 flex items-center justify-center relative shadow-xl overflow-hidden">
                <div className="absolute inset-0 bg-neutral-900 opacity-60" />
                <div className="w-14 h-14 rounded-full border-2 border-dashed border-zinc-600 flex items-center justify-center p-1 bg-zinc-950">
                  <motion.div 
                    animate={{ scale: clicked ? [1, 1.2, 1] : 1 }}
                    transition={{ duration: 0.5, repeat: clicked ? Infinity : 0 }}
                    className={`w-6 h-6 rounded-full border ${clicked ? 'bg-red-500 border-red-400 shadow-[0_0_10px_#ef4444]' : 'bg-zinc-800 border-zinc-700'}`}
                  />
                </div>
                {/* indicator wire wrapping */}
                <div className="absolute bottom-1 text-[7px] text-zinc-500 font-bold tracking-widest font-mono uppercase">SAFETY</div>
              </div>

              {/* Smoke clouds */}
              <div className="flex flex-col gap-2">
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={val}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setVal(value);
                    if (value > 65) setClicked(true);
                    else setClicked(false);
                  }}
                  className="w-24 h-1 cursor-pointer accent-orange-500"
                />
                <span className="text-[7px] font-black uppercase tracking-wider text-zinc-400">
                  💨 GAS LVL: {val} ppm
                </span>
              </div>
            </div>
          </div>
        )}

        {moduleId === 'soil-moisture' && (
          <div className="relative flex flex-col items-center gap-3">
            <div className="flex items-center gap-6">
              <div className="relative flex flex-col items-center">
                {/* Gold plate fork prongs */}
                <div className="flex gap-4">
                  <div className="w-4 h-16 bg-zinc-800 border border-zinc-700 rounded-b flex flex-col items-center justify-between p-1">
                    <div className="w-1.5 h-10 bg-amber-400 rounded-b shadow-[0_0_4px_#f59e0b]" />
                  </div>
                  <div className="w-4 h-16 bg-zinc-800 border border-zinc-700 rounded-b flex flex-col items-center justify-between p-1">
                    <div className="w-1.5 h-10 bg-amber-400 rounded-b shadow-[0_0_4px_#f59e0b]" />
                  </div>
                </div>
                {/* Board */}
                <div className="w-14 h-4 bg-zinc-900 border border-zinc-800 rounded shadow-lg absolute -top-4" />
              </div>

              {/* Dirt & Moisture selector */}
              <div className="space-y-1.5 text-left bg-zinc-900 border border-zinc-800 p-2.5 rounded-xl">
                <input 
                  type="range" 
                  min="10" 
                  max="100" 
                  value={val} 
                  onChange={(e) => setVal(Number(e.target.value))}
                  className="w-20 h-1 cursor-pointer accent-sky-500" 
                />
                <div className="text-[7px] font-mono uppercase text-zinc-450">
                  💧 moisture: <span className="text-sky-400 font-extrabold">{val}%</span>
                </div>
                <div className="text-[7px] font-mono uppercase text-zinc-450">
                  🌱 soil: <span className={val > 60 ? "text-emerald-400 font-bold" : "text-amber-500 font-bold"}>{val > 60 ? "WET & HEALTHY" : "DRY & PARCHED"}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {moduleId === 'temperature-sensor' && (
          <div className="relative flex flex-col items-center gap-3">
            <div className="flex items-center gap-6">
              {/* LM35 transistor look */}
              <div className="relative w-12 h-16 bg-zinc-900 border border-zinc-800 rounded-t-xl flex flex-col justify-between items-center p-1.5 shadow-xl">
                <div className="w-full h-8 bg-zinc-950 border border-zinc-850 rounded-lg flex items-center justify-center text-[8px] tracking-wide text-zinc-400 font-black font-mono">
                  LM35
                </div>
                {/* 3 metal pins legs */}
                <div className="flex gap-2 absolute -bottom-6">
                  <div className="w-0.5 h-6 bg-zinc-500" />
                  <div className="w-0.5 h-6 bg-zinc-500" />
                  <div className="w-0.5 h-6 bg-zinc-500" />
                </div>
              </div>

              {/* Slider for temp */}
              <div className="space-y-1 text-left bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl">
                <input 
                  type="range"
                  min="-20"
                  max="120"
                  value={val}
                  onChange={(e) => setVal(Number(e.target.value))}
                  className="w-20 h-1 cursor-pointer accent-red-500"
                />
                <div className="text-[8px] font-mono font-black text-zinc-300">
                  🌡️ TEMPERATURE: <span className="text-red-400 text-xs font-black">{val}°C</span>
                </div>
                <div className="text-[7px] font-mono uppercase tracking-wider text-zinc-500">
                  {val > 50 ? "🥵 EXTREME HEAT" : val < 5 ? "❄️ FREEZING COLD" : "👌 ROOM VALUE"}
                </div>
              </div>
            </div>
          </div>
        )}

        {moduleId === 'sound-sensor' && (
          <div className="relative flex flex-col items-center gap-3">
            <div className="flex items-center gap-6">
              {/* Silver mic cylinder */}
              <div className="relative w-14 h-14 bg-zinc-900 rounded-full border-4 border-zinc-700 flex items-center justify-center shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-zinc-850 to-zinc-950 rounded-full" />
                <div className="w-10 h-10 rounded-full bg-zinc-950 border-2 border-dashed border-zinc-600 flex items-center justify-center">
                  <motion.div 
                    animate={{ scale: clicked ? [1, 1.4, 1] : [1, 1.1, 1] }}
                    transition={{ duration: clicked ? 0.3 : 1.5, repeat: Infinity }}
                    className={`w-5 h-5 rounded-full border ${clicked ? 'bg-pink-500 border-pink-400 shadow-[0_0_10px_#ec4899]' : 'bg-zinc-800 border-zinc-700'}`}
                  />
                </div>
                {/* indicator wire wrapping */}
                <div className="absolute top-1 text-[7px] text-zinc-500 font-bold uppercase tracking-widest font-mono">MIC</div>
              </div>

              {/* Mic Controller Slider */}
              <div className="space-y-1 text-left bg-zinc-900 border border-zinc-800 p-2.5 rounded-xl">
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={val}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setVal(value);
                    if (value > 70) setClicked(true);
                    else setClicked(false);
                  }}
                  className="w-20 h-1 cursor-pointer accent-pink-500"
                />
                <div className="text-[7px] font-mono uppercase tracking-widest text-zinc-400">
                  🔊 NOISE LEVEL: {val} dB
                </div>
                <div className="text-[7px] font-mono uppercase text-pink-400 font-black tracking-widest">
                  {clicked ? "🎙️ CLAP/NOISE DETECTED" : "🤫 SILENT GATE"}
                </div>
              </div>
            </div>
          </div>
        )}

        {moduleId === 'light-cup' && (
          <div className="relative flex flex-col items-center gap-3">
            <div className="flex items-center gap-8">
              <motion.div 
                animate={{ rotate: val }}
                className="relative w-14 h-14 bg-zinc-900 border-2 border-zinc-800 rounded-full flex flex-col items-center justify-between p-1 shadow-inner"
              >
                {/* Rolling bead mercury */}
                <motion.div 
                  animate={{ y: Math.abs(val) > 40 ? 10 : -8 }}
                  className="w-3 h-3 bg-zinc-300 border border-white rounded-full shadow absolute top-1/2 left-1/2 -translate-x-1/2"
                />
                <span className="text-[6px] font-black tracking-widest text-zinc-500 uppercase">TILT</span>
              </motion.div>

              {/* Co-Integrated LED stand */}
              <div className="flex items-center gap-3">
                <input 
                  type="range"
                  min="-90"
                  max="90"
                  value={val}
                  onChange={(e) => setVal(Number(e.target.value))}
                  className="w-16 h-1 cursor-pointer accent-cyan-500"
                />
                <div className="relative w-8 h-12 flex flex-col items-center">
                  <motion.div 
                    animate={{ opacity: Math.abs(val) > 40 ? 1 : 0.1 }}
                    className="w-5 h-5 rounded-t-full bg-cyan-400 border border-cyan-300 shadow-[0_0_12px_#22d3ee] flex items-center justify-center text-[10px] font-bold"
                  >
                    💡
                  </motion.div>
                  <div className="w-1.5 h-6 bg-zinc-700" />
                </div>
              </div>
            </div>
            <div className="text-[7px] font-mono uppercase text-cyan-400">
              👈 SLIDE TO TILT / ANGLE: {val}°
            </div>
          </div>
        )}

        {moduleId === 'knock-sensor' && (
          <div className="relative flex flex-col items-center gap-2">
            <motion.div 
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setClicked(true);
                setTimeout(() => setClicked(false), 200);
              }}
              className="relative cursor-pointer group"
            >
              {/* spring visualizer */}
              <div className="w-32 h-10 bg-zinc-900 border-2 border-zinc-800 rounded flex items-center justify-center gap-1.5 relative overflow-hidden shadow-xl p-2 px-4 group-hover:border-stone-500">
                <div className="w-1.5 h-6 bg-stone-600 rounded-xs" />
                {/* spring coil */}
                <motion.div 
                  animate={{ x: clicked ? [-5, 5, -5, 5, 0] : 0 }}
                  className="flex gap-0.5"
                >
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-1 h-4 border-l border-white border-dashed rounded-xs" />
                  ))}
                </motion.div>
                <div className="w-2 h-6 bg-stone-500 rounded-xs absolute right-6" />
                {clicked && (
                  <motion.div 
                    animate={{ scale: [1, 2, 1], opacity: [1, 0] }}
                    className="absolute z-10 w-full h-full bg-stone-550/30 font-bold flex items-center justify-center text-xs tracking-widest text-[#00f2fe]"
                  >
                    🚀 BUMPED!
                  </motion.div>
                )}
              </div>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-black text-stone-400 tracking-widest uppercase animate-pulse">
                👇 CLICK PCB TO KNOCK
              </span>
            </motion.div>
          </div>
        )}

        {moduleId === 'dot-matrix' && (
          <div className="relative flex flex-col items-center gap-2">
            {/* LED matrix grid painter */}
            <div className="grid grid-cols-8 gap-0.5 bg-zinc-900 border-4 border-zinc-800 p-1.5 rounded-xl shadow-2xl">
              {matrix.map((on, i) => (
                <div 
                  key={i} 
                  onClick={() => {
                    const copy = [...matrix];
                    copy[i] = !copy[i];
                    setMatrix(copy);
                  }}
                  className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${on ? 'bg-red-550 shadow-[0_0_6px_rgba(239,68,68,0.8)]' : 'bg-zinc-800 hover:bg-zinc-700'}`}
                />
              ))}
            </div>
            <div className="text-[7px] font-mono uppercase tracking-widest text-red-400">
              ✏️ CLICK MATRIX PIXELS TO DRAW
            </div>
          </div>
        )}

        {moduleId === 'ldr' && (
          <div className="relative flex flex-col items-center gap-3">
            <div className="flex items-center gap-6">
              {/* Serpentine track */}
              <div className="relative w-14 h-14 bg-orange-100 rounded-full border-4 border-zinc-700 shadow-xl overflow-hidden p-1 flex items-center justify-center">
                <div className="absolute inset-x-2 h-1 border-t border-b border-red-500 rounded opacity-80" />
                <div className="w-10 h-10 rounded-full border-4 border-dashed border-red-500/70 p-0.5">
                  <div className="w-full h-full bg-zinc-950/20 flex items-center justify-center">
                    <span className="text-[12px]">☀️</span>
                  </div>
                </div>
              </div>

              {/* Slider representing cloud covering sun */}
              <div className="space-y-1.5 text-left bg-zinc-900 border border-zinc-800 p-2.5 rounded-xl">
                <input 
                  type="range"
                  min="0"
                  max="1000"
                  value={val}
                  onChange={(e) => setVal(Number(e.target.value))}
                  className="w-20 h-1 cursor-pointer accent-amber-500"
                />
                <div className="text-[7px] font-mono uppercase tracking-widest text-zinc-400">
                  🔆 AMBIENT LIGHT: <span className="text-amber-400 font-extrabold">{val} lux</span>
                </div>
                <div className="text-[7px] font-mono uppercase tracking-widest text-zinc-500 font-black">
                  STATE: <span className={val > 400 ? "text-yellow-400" : "text-purple-400"}>{val > 405 ? "☀️ SUNNY DAY" : "🌙 DARK NIGHT"}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {moduleId === 'heartbeat' && (
          <div className="relative flex flex-col items-center gap-3">
            <div className="flex items-center gap-6">
              {/* Biometric pulse ring */}
              <div className="relative w-14 h-14 bg-red-950/40 rounded-full border-4 border-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.4)] flex items-center justify-center animate-pulse overflow-hidden">
                <div className="absolute inset-2 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-[12px] text-white">❤️</span>
                </div>
              </div>

              {/* Status card */}
              <div className="space-y-1.5 text-left bg-zinc-900 border border-zinc-800 p-2.5 rounded-xl">
                <div className="text-[7px] font-mono uppercase tracking-widest text-zinc-400">
                  💓 BIOMETRIC SIGNAL READOUT
                </div>
                <div className="text-[7.5px] font-mono uppercase tracking-widest text-[#22c55e] font-extrabold animate-pulse">
                  STATUS: LIVE PPG RX ACTIVE
                </div>
              </div>
            </div>
          </div>
        )}

        {moduleId === 'laser' && (
          <div className="relative flex flex-col items-center gap-3">
            <div className="flex items-center gap-6">
              {/* Laser beam indicator */}
              <div className="relative w-14 h-14 bg-red-955/40 rounded-full border-4 border-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.4)] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-2 bg-red-650 rounded-full flex items-center justify-center animate-ping opacity-30" />
                <div className="absolute inset-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-[11px] text-white">⚡</span>
                </div>
              </div>

              {/* Status card */}
              <div className="space-y-1.5 text-left bg-zinc-900 border border-zinc-800 p-2.5 rounded-xl">
                <div className="text-[7px] font-mono uppercase tracking-widest text-zinc-400">
                  ⚡ LASER BEAM RADIAL STATE
                </div>
                <div className="text-[7.5px] font-mono uppercase tracking-widest text-[#ef4444] font-extrabold animate-pulse">
                  BEAM: COHERENT 650NM ACTIVE
                </div>
              </div>
            </div>
          </div>
        )}

        {moduleId === 'humidity' && (
          <div className="relative flex flex-col items-center gap-3">
            <div className="flex items-center gap-6">
              {/* Humidity visual ring / cloud */}
              <div className="relative w-14 h-14 bg-sky-950/45 rounded-full border-4 border-sky-500/80 shadow-[0_0_15px_rgba(56,189,248,0.4)] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-2 bg-sky-600 rounded-full flex items-center justify-center animate-pulse duration-1000">
                  <span className="text-[12px] text-white">🌫️</span>
                </div>
              </div>

              {/* Slider for relative humidity */}
              <div className="space-y-1 text-left bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl">
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={val}
                  onChange={(e) => setVal(Number(e.target.value))}
                  className="w-20 h-1 cursor-pointer accent-sky-500"
                />
                <div className="text-[8px] font-mono font-black text-zinc-300">
                  🌫️ RH PERCENTAGE: <span className="text-sky-450 text-xs font-black">{val}%</span>
                </div>
                <div className="text-[7px] font-mono uppercase tracking-wider text-zinc-500">
                  {val > 70 ? "🌧️ SEVERE DAMP" : val < 30 ? "🌵 EXT-ARID DRY" : "👌 COMFORTABLE"}
                </div>
              </div>
            </div>
          </div>
        )}

        {moduleId === 'tracking' && (
          <div className="relative flex flex-col items-center gap-3">
            <div className="flex items-center gap-6">
              {/* IR emitter/receiver visual */}
              <div className="relative w-14 h-14 bg-indigo-950/45 rounded-full border-4 border-indigo-500/80 shadow-[0_0_15px_rgba(99,102,241,0.4)] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-2 bg-indigo-750 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-[11px] text-white">📡</span>
                </div>
              </div>

              {/* Slider for reflected intensity */}
              <div className="space-y-1 text-left bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl">
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={val}
                  onChange={(e) => setVal(Number(e.target.value))}
                  className="w-20 h-1 cursor-pointer accent-indigo-500"
                />
                <div className="text-[8px] font-mono font-black text-zinc-300">
                  📡 IR REFLECTION: <span className="text-indigo-400 text-xs font-black">{val}%</span>
                </div>
                <div className="text-[7px] font-mono uppercase tracking-wider text-zinc-500">
                  {val >= 50 ? "⬜ HIGH REFLECT (WHITE)" : "⬛ ABSORB LIGHT (BLACK)"}
                </div>
              </div>
            </div>
          </div>
        )}

        {moduleId === 'touch' && (
          <div className="relative flex flex-col items-center gap-3">
            <div className="flex items-center gap-6">
              {/* Touch visual fingertip */}
              <div className="relative w-14 h-14 bg-rose-950/45 rounded-full border-4 border-rose-500/80 shadow-[0_0_15px_rgba(244,63,94,0.4)] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-2 bg-rose-750 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-[12px] text-rose-100 font-extrabold">👇</span>
                </div>
              </div>

              {/* Slider for capacitance intensity */}
              <div className="space-y-1 text-left bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl">
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={val}
                  onChange={(e) => setVal(Number(e.target.value))}
                  className="w-20 h-1 cursor-pointer accent-rose-500"
                />
                <div className="text-[8px] font-mono font-black text-zinc-300">
                  👇 CHARGE VALUE: <span className="text-rose-400 text-xs font-black">{val}%</span>
                </div>
                <div className="text-[7px] font-mono uppercase tracking-wider text-zinc-500">
                  {val >= 40 ? "🔴 TOUCH REGISTERED" : "⚪ STANDBY FIELD"}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Structured specifications & descriptive pointers */}
      <div className="w-full bg-zinc-900/60 border border-zinc-800/80 p-3 rounded-2xl z-10 text-left space-y-2 mt-4">
        <p className="text-[8px] font-black text-cyan-400 uppercase tracking-widest mb-1">🔍 DIAGRAM CALL-OUTS (CLICK PINS FOR INFORMATION)</p>
        <div className="grid grid-cols-1 gap-1.5 max-h-24 overflow-y-auto pr-1">
          {currentSpec.labels.map((lbl, i) => (
            <div 
              key={i}
              onClick={() => setActiveLabel(activeLabel === i ? null : i)}
              className={`p-1.5 rounded-xl border transition-all duration-300 cursor-pointer ${activeLabel === i ? 'bg-cyan-950/50 border-cyan-500/50 text-cyan-200' : 'bg-zinc-950/40 border-zinc-800 text-zinc-300 hover:border-zinc-700/80'}`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-black ${activeLabel === i ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'bg-zinc-800 text-zinc-400'}`}>
                  {lbl.idx}
                </span>
                <span className="text-[9px] font-black uppercase tracking-tight">{lbl.name}</span>
              </div>
              {/* Dropdown description */}
              <AnimatePresence>
                {(activeLabel === i || activeLabel === null) && (
                  <motion.p 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 0.85 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="text-[8px] font-medium leading-relaxed font-sans pl-6 mt-1 text-zinc-400 uppercase tracking-tight"
                  >
                    {lbl.desc}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const renderCustomSlideVisual = (moduleId: string, slideIndex: number, module: any) => {
  // Disable custom diagnostic vector for any slide after the first one of Arduino Nano
  // to allow the real images of Arduino Nano (breadboard, pins comparison, USB, car) to render beautifully with slide text.
  if (moduleId === 'nano' && slideIndex > 0) {
    return null;
  }

  // Disable custom diagnostic vector for the first slide of Arduino Uno
  // to allow the newly requested real learning photo of Arduino Uno to render beautifully with slide text.
  if (moduleId === 'uno' && slideIndex === 0) {
    return null;
  }

  if (moduleId === 'uno' || moduleId === 'nano' || moduleId === 'mega') {
    return <ArduinoInteractiveSlideVisual moduleId={moduleId} slideIndex={slideIndex} />;
  }

  // To keep slide views pristine, we do not show embed simulations on the slide details;
  // all sensor simulations are reserved for the interactive Simulation Dashboard tab instead.
  return null;
};

const renderParagraphWithHighlights = (text: string) => {
  const parts = text.split(/(\bWET\b|\bDRY\b)/g);
  return parts.map((part, index) => {
    if (part === 'WET') {
      return (
        <span key={index} className="text-sky-600 font-black text-base md:text-lg lg:text-xl bg-sky-100 hover:bg-sky-200 px-3 py-1 rounded-xl border border-sky-250 transition-colors mx-0.5 shadow-2xs font-mono">
          WET
        </span>
      );
    }
    if (part === 'DRY') {
      return (
        <span key={index} className="text-amber-700 font-black text-base md:text-lg lg:text-xl bg-amber-100 hover:bg-amber-200 px-3 py-1 rounded-xl border border-amber-250 transition-colors mx-0.5 shadow-2xs font-mono">
          DRY
        </span>
      );
    }
    return part;
  });
};

const formatSlideContent = (content: string) => {
  const lines = content.split('\n');
  const colors = [
    { bg: 'bg-indigo-50/70 border-indigo-150', text: 'text-indigo-700', checkBg: 'bg-indigo-600' },
    { bg: 'bg-emerald-50/70 border-emerald-150', text: 'text-emerald-700', checkBg: 'bg-emerald-600' },
    { bg: 'bg-amber-50/70 border-amber-150', text: 'text-amber-850', checkBg: 'bg-amber-500' },
    { bg: 'bg-sky-50/70 border-sky-150', text: 'text-sky-700', checkBg: 'bg-sky-600' },
    { bg: 'bg-violet-50/70 border-violet-150', text: 'text-violet-700', checkBg: 'bg-violet-600' },
    { bg: 'bg-rose-50/70 border-rose-150', text: 'text-rose-700', checkBg: 'bg-rose-600' },
  ];

  return (
    <div className="space-y-6 text-left w-full select-none">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return null;

        const colorSet = colors[idx % colors.length];

        // Check if it's a bullet point or numbering list
        if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*') || trimmed.match(/^[123]\./)) {
          const text = trimmed.replace(/^[•\-\*123\._\s]+/, '');
          const parts = text.split(':');
          return (
            <div key={idx} className={`flex items-start gap-5 ${colorSet.bg} border-2 p-5 md:p-6 rounded-[24px] shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-md`}>
              <div className={`w-8 h-8 ${colorSet.checkBg} rounded-xl flex items-center justify-center text-white text-base shrink-0 font-black mt-1.5 shadow-sm`}>✓</div>
              <div className="flex-1 text-base md:text-lg lg:text-xl text-slate-800 leading-relaxed">
                {parts.length > 1 ? (
                  <>
                    <strong className={`${colorSet.text} text-xl md:text-2xl block mb-2 font-extrabold tracking-tight`}>
                      {parts[0].trim()}
                    </strong>
                    <span className="text-slate-700 font-semibold leading-relaxed block">
                      {renderParagraphWithHighlights(parts.slice(1).join(':').trim())}
                    </span>
                  </>
                ) : (
                  <span className="text-slate-700 font-semibold leading-relaxed block">
                    {renderParagraphWithHighlights(text)}
                  </span>
                )}
              </div>
            </div>
          );
        }

        // Standard lines with category colons like 'The Definition: It is a...'
        const parts = trimmed.split(':');
        if (parts.length > 1 && parts[0].length < 35) {
          return (
            <div key={idx} className={`flex flex-col ${colorSet.bg} border-2 p-5 md:p-6 rounded-[26px] transition duration-300 hover:scale-[1.01] shadow-sm`}>
              <div className={`inline-block self-start px-4 md:px-5 py-2 bg-white ${colorSet.text} text-sm md:text-base font-black tracking-wide rounded-2xl border-2 uppercase shadow-2xs`}>
                ⚡ {parts[0].trim()}
              </div>
              <p className="text-slate-700 text-base md:text-lg lg:text-xl font-semibold leading-relaxed pl-1 pt-3.5">
                {renderParagraphWithHighlights(parts.slice(1).join(':').trim())}
              </p>
            </div>
          );
        }

        return (
          <p key={idx} className="text-slate-755 text-base md:text-lg lg:text-xl font-semibold leading-relaxed px-5 py-3.5 bg-slate-50 border-l-4 border-indigo-500 rounded-r-2xl">
            {renderParagraphWithHighlights(trimmed)}
          </p>
        );
      })}
    </div>
  );
};

// --- Slide Viewer Component ---
const Slideshow = ({ module, onComplete }: { module: any, onComplete: () => void }) => {
  const [current, setCurrent] = useState(0);
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  const slides = module.slides;
  const moduleId = module.id;

  if (!slides || slides.length === 0) return null;

  const next = () => {
    if (current < slides.length - 1) setCurrent(current + 1);
    else onComplete();
  };

  const customVisual = renderCustomSlideVisual(moduleId, current, module);
  const hasImage = slides[current]?.image && !customVisual;

  return (
    <div className={`relative min-h-[620px] lg:min-h-[700px] ${hasImage ? 'max-w-5xl lg:max-w-[1240px]' : 'max-w-4xl lg:max-w-5xl'} w-full mx-auto bg-white rounded-[40px] shadow-[20px_20px_0px_0px_rgba(0,0,0,0.06)] border-4 border-black/10 flex flex-col overflow-hidden my-8 hover:shadow-[24px_24px_0px_0px_rgba(0,0,0,0.09)] transition-shadow duration-300`}>
      <div className="absolute top-0 right-0 p-8 z-20">
         <div className="bg-secondary text-dark px-4.5 py-2 rounded-full font-black text-xs uppercase tracking-widest border border-black/5 shadow-sm">Slide {current + 1}</div>
      </div>

      <div className="flex-1 p-8 md:p-16 flex flex-col justify-center gap-10 text-left">
        <div className="w-full font-sans">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6 flex flex-col justify-center h-full text-left"
            >
              <div className="inline-flex items-center gap-2.5 self-start bg-secondary px-4 py-1.5 rounded-xl font-black text-[11px] text-dark/70 uppercase tracking-widest border border-black/10 scale-95 origin-left shadow-2xs">
                 🔬 {module.name} Discovery
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-dark tracking-tight leading-tight">{slides[current]?.title}</h2>
              
              {slides[current]?.image && !customVisual ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center py-4 w-full">
                  <div className="lg:col-span-7 space-y-6">
                    {slides[current]?.content ? (
                      <div className="text-slate-700 leading-relaxed tracking-normal font-semibold text-base md:text-lg lg:text-xl">
                        {formatSlideContent(slides[current]?.content)}
                      </div>
                    ) : null}
                  </div>
                  <div className="lg:col-span-5 flex flex-col items-center justify-center w-full space-y-3">
                    <div 
                      onClick={() => setZoomImage(slides[current].image || null)}
                      className="group relative bg-slate-50 hover:bg-slate-100/50 border-2 border-slate-200/60 p-6 rounded-3xl shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] flex items-center justify-center max-h-[500px] overflow-hidden w-full max-w-md lg:max-w-full cursor-zoom-in transition-all duration-300 hover:shadow-lg hover:border-black/10"
                    >
                      <img 
                        src={slides[current].image} 
                        alt={slides[current].title} 
                        referrerPolicy="no-referrer"
                        className="max-h-[420px] max-w-full h-auto object-contain transition-transform duration-500 rounded-2xl group-hover:scale-[1.03]"
                      />
                      
                      {/* Zoom Indicator badge overlay */}
                      <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md text-white/95 px-4 py-2 rounded-xl font-bold text-[11px] uppercase tracking-wider flex items-center gap-2 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                        🔍 Click to Zoom
                      </div>
                    </div>
                    <span className="text-zinc-400 text-xs font-black tracking-wider uppercase">Click board visual above to inspect closely</span>
                  </div>
                </div>
              ) : (
                slides[current]?.content ? (
                  /* Formatted and beautifully segmented block-based slide content */
                  <div className="text-slate-700 leading-relaxed tracking-normal font-semibold text-base md:text-lg lg:text-xl">
                    {formatSlideContent(slides[current]?.content)}
                  </div>
                ) : null
              )}

              {slides[current].fact && (
                <div className="inline-flex self-start items-center gap-3.5 bg-[#e6f4ea] text-emerald-850 px-5 py-3.5 rounded-2xl border border-white shadow-xs font-bold text-sm md:text-base leading-relaxed mt-4 animate-pulse">
                  <Info size={18} strokeWidth={2.5} className="shrink-0 text-emerald-600" />
                  <span>Did You Know? {slides[current].fact}</span>
                </div>
              )}

              {customVisual && (
                <div className="w-full mt-6">
                  {customVisual}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="p-8 border-t-4 border-gray-100 flex items-center justify-between bg-gray-50/50">
        <div className="flex gap-2.5">
          {slides.map((_, i) => (
            <div key={i} className={`h-2.5 rounded-full transition-all border-2 border-slate-200 ${i === current ? 'w-10 bg-primary' : 'w-2.5 bg-gray-200'}`} />
          ))}
        </div>
        <div className="flex gap-4">
          <button 
            disabled={current === 0}
            onClick={() => setCurrent(current - 1)}
            className="px-6 py-3.5 rounded-xl bg-white text-gray-500 border-2 border-gray-150 disabled:opacity-0 hover:bg-gray-100 transition-all font-black uppercase text-xs tracking-widest button-pop shadow-sm"
          >
            ← Previous
          </button>
          <button 
            onClick={next}
            className="px-10 py-3.5 bg-dark text-white rounded-xl font-black uppercase tracking-widest flex items-center gap-2.5 button-pop text-sm shadow-md"
          >
            {current === slides.length - 1 ? 'Start Mission' : 'Next Mission'} <ArrowRight size={18} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* High-Resolution Full Screen Zoom Modal */}
      <AnimatePresence>
        {zoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomImage(null)}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-[9999] flex flex-col items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center bg-zinc-900 border-4 border-black p-6 rounded-[32px] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setZoomImage(null)} 
                className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 active:scale-95 text-dark font-black w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-200 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              >
                ✕
              </button>
              
              <div className="text-center mb-4">
                <span className="text-zinc-400 text-[10px] font-black uppercase tracking-widest bg-zinc-800 border border-zinc-700 px-3 py-1 rounded-full">High-Resolution Viewer</span>
                <h3 className="text-white text-xl font-black tracking-tight mt-2">{slides[current]?.title}</h3>
              </div>

              <div className="flex-1 w-full flex items-center justify-center overflow-auto rounded-2xl bg-black/40 border border-zinc-800 p-4 min-h-[300px]">
                <img 
                  src={zoomImage} 
                  alt="Zoomed Detail" 
                  referrerPolicy="no-referrer"
                  className="max-h-[55vh] max-w-full object-contain rounded-xl select-none"
                />
              </div>

              <div className="mt-4 text-center">
                <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">Click anywhere outside or the close button to exit</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const EMOJI_PATTERNS: Record<string, number[][]> = {
  happy: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 1, 1, 0],
    [0, 1, 1, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
  sad: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 1, 1, 0],
    [0, 1, 1, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
  surprised: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 1, 1, 0],
    [0, 1, 1, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 0, 0],
  ],
  robot: [
    [0, 1, 1, 1, 1, 1, 1, 0],
    [1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1],
    [0, 1, 1, 1, 1, 1, 1, 0],
  ]
};

// --- Arduino Board Visual Component ---
const ArduinoUnoVisual = ({ activePins = [] }: { activePins?: string[] }) => {
  return (
    <div className="relative w-80 h-100 bg-[#E2E8F0]/25 rounded-2xl border-4 border-slate-200/40 shadow-2xl overflow-hidden scale-75 lg:scale-100">
       {/* Completely Blank Simulation Board */}
    </div>
  );
};

// --- MiniGame Engine Component ---
const MiniGame = ({ data, moduleId, onComplete, type = 'sensor' }: { data: any, moduleId?: string, onComplete: () => void, type?: 'sensor' | 'board' }) => {
  const [gameState, setGameState] = useState<'playing'>('playing');
  const [score, setScore] = useState(0);
  const [tiltX, setTiltX] = useState(0);
  const [distance, setDistance] = useState(250);

  const [carPos, setCarPos] = useState({ x: 0, y: 0 });
  const [joystickOffset, setJoystickOffset] = useState({ x: 0, y: 0 });

  const [rotation, setRotation] = useState(0);
  const [fanSpeed, setFanSpeed] = useState(0);
  const [ledColor, setLedColor] = useState<'red' | 'green' | 'blue' | 'purple' | 'cyan' | 'yellow' | 'white'>('red');

  // Flame Sensor Game State
  const [truckX, setTruckX] = useState(0);
  const [fireIntensity, setFireIntensity] = useState(100);
  const [isSpraying, setIsSpraying] = useState(false);
  const [isDriving, setIsDriving] = useState(false);

  // Smoke Sensor State
  const [isEmittingSmoke, setIsEmittingSmoke] = useState(false);
  const [smokeLevel, setSmokeLevel] = useState(0);
  const [smokeReading, setSmokeReading] = useState(0);

  // Dot Matrix State
  const [matrixDisplay, setMatrixDisplay] = useState<number[][]>(Array(8).fill(0).map(() => Array(8).fill(0)));
  const [activeMood, setActiveMood] = useState<string | null>(null);

  // LDR State
  const [dayIntensity, setDayIntensity] = useState(1); // 1 = Day, 0 = Night
  const [targetIntensity, setTargetIntensity] = useState(1);
  const [ldrReading, setLdrReading] = useState(800);
  const [ldrSimulated, setLdrSimulated] = useState(false);

  // Reed Switch State
  const [isReedActive, setIsReedActive] = useState(false);
  const [magnetProx, setMagnetProx] = useState(0); // 0 to 1 based on closeness

  // Soil Moisture State
  const containerRef = useRef<HTMLDivElement>(null);
  const [soilSensorPos, setSoilSensorPos] = useState({ x: 0, y: -100 });
  const [isWatering, setIsWatering] = useState(false);
  const [dryPlantHealth, setDryPlantHealth] = useState(10); // 10% health initially
  const [activeSoilPot, setActiveSoilPot] = useState<'dry' | 'green' | null>(null);

  // Temperature Sensor State
  const [tempValue, setTempValue] = useState(0);
  const [tempTarget, setTempTarget] = useState<string | null>(null);
  const [isTempComplete, setIsTempComplete] = useState(false);

  // Humidity Sensor State
  const [humidityValue, setHumidityValue] = useState(35);
  const [isHumidityComplete, setIsHumidityComplete] = useState(false);

  // Tracking Sensor State
  const [trackingOffset, setTrackingOffset] = useState(0); // robot misalignment from center line (-50 to +50)
  const [isTrackingComplete, setIsTrackingComplete] = useState(false);
  const [robotState, setRobotState] = useState({
    x: 250,
    y: 50,
    theta: 0,
    omega: 0,
    lastSteerDir: 1
  });
  const [isSimRunning, setIsSimRunning] = useState(false);
  const [sensorsState, setSensorsState] = useState({
    leftBlack: false,
    rightBlack: false,
    slx: 250,
    sly: 50,
    srx: 250,
    sry: 50
  });
  const [trackingStepCount, setTrackingStepCount] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const trackingOfflineCountRef = useRef(0);

  // --- Line Tracking Simulation Handlers ---
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#000000';
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = (touch.clientX - rect.left) * (canvas.width / rect.width);
    const y = (touch.clientY - rect.top) * (canvas.height / rect.height);
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#000000';
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = (touch.clientX - rect.left) * (canvas.width / rect.width);
    const y = (touch.clientY - rect.top) * (canvas.height / rect.height);

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const drawPresetTrack = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear first
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid pattern
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    for (let i = 20; i < canvas.width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let j = 20; j < canvas.height; j += 20) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(canvas.width, j);
      ctx.stroke();
    }

    // Draw smooth oval loop
    ctx.beginPath();
    ctx.ellipse(250, 150, 185, 95, 0, 0, 2 * Math.PI);
    ctx.strokeStyle = '#18181b';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    // Reset robot position
    setRobotState({
      x: 250,
      y: 55,
      theta: 0, // pointing right
      omega: 0,
      lastSteerDir: 1
    });
    setSensorsState({
      leftBlack: true,
      rightBlack: true,
      slx: 238,
      sly: 31,
      srx: 262,
      sry: 31
    });
    setTrackingStepCount(0);
  };

  const drawFigure8Track = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    for (let i = 20; i < canvas.width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let j = 20; j < canvas.height; j += 20) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(canvas.width, j);
      ctx.stroke();
    }

    // Draw figure-8
    ctx.beginPath();
    ctx.strokeStyle = '#18181b';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (let t = 0; t <= 2 * Math.PI + 0.1; t += 0.05) {
      const px = 250 + 160 * Math.sin(t);
      const py = 150 + 85 * Math.sin(t) * Math.cos(t);
      if (t === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.stroke();

    // Reset robot to starting point on curve
    const startT = Math.PI / 4;
    const rx = 250 + 160 * Math.sin(startT);
    const ry = 150 + 85 * Math.sin(startT) * Math.cos(startT);
    
    const dxt = 160 * Math.cos(startT);
    const dyt = 85 * Math.cos(2 * startT);
    const rtheta = Math.atan2(dyt, dxt);

    setRobotState({
      x: rx,
      y: ry,
      theta: rtheta,
      omega: 0,
      lastSteerDir: 1
    });
    setSensorsState({
      leftBlack: true,
      rightBlack: true,
      slx: rx - 10,
      sly: ry,
      srx: rx + 10,
      sry: ry
    });
    setTrackingStepCount(0);
  };

  const clearTrack = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    for (let i = 20; i < canvas.width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let j = 20; j < canvas.height; j += 20) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(canvas.width, j);
      ctx.stroke();
    }

    setRobotState({
      x: 250,
      y: 150,
      theta: 0,
      omega: 0,
      lastSteerDir: 1
    });
    setSensorsState({
      leftBlack: false,
      rightBlack: false,
      slx: 238,
      sly: 126,
      srx: 262,
      sry: 126
    });
    setTrackingStepCount(0);
    setIsTrackingComplete(false);
    setScore(0);
  };

  // Run line-tracker loop
  useEffect(() => {
    if (!isSimRunning || moduleId !== 'tracking') return;
    
    let frameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const runPhysics = () => {
      const width = canvas.width;
      const height = canvas.height;
      let pixels: Uint8ClampedArray;
      try {
        pixels = ctx.getImageData(0, 0, width, height).data;
      } catch (e) {
        frameId = requestAnimationFrame(runPhysics);
        return;
      }

      setRobotState(prev => {
        let { x, y, theta, omega, lastSteerDir } = prev;
        
        // TCRT5000 geometric placement matching front of robot
        const L_ahead = 24;
        const L_spacing = 9;
        
        // Fixed coordinate rotation math to align with physical Left and Right sensors
        const slx = x + L_ahead * Math.cos(theta) + L_spacing * Math.sin(theta);
        const sly = y + L_ahead * Math.sin(theta) - L_spacing * Math.cos(theta);
        const srx = x + L_ahead * Math.cos(theta) - L_spacing * Math.sin(theta);
        const sry = y + L_ahead * Math.sin(theta) + L_spacing * Math.cos(theta);

        const isPixelBlack = (px: number, py: number) => {
          const xi = Math.round(px);
          const yi = Math.round(py);
          if (xi < 0 || xi >= width || yi < 0 || yi >= height) return false;
          const index = (yi * width + xi) * 4;
          const r = pixels[index];
          const g = pixels[index + 1];
          const b = pixels[index + 2];
          // Saturated colors below 110 represent black lines
          return (r < 110 && g < 110 && b < 110);
        };

        const leftBlack = isPixelBlack(slx, sly);
        const rightBlack = isPixelBlack(srx, sry);

        let targetOmega = 0;
        let currentSpeed = 1.6;

        if (leftBlack || rightBlack) {
          trackingOfflineCountRef.current = 0;
        } else {
          trackingOfflineCountRef.current += 1;
        }

        if (leftBlack && !rightBlack) {
          targetOmega = -0.065; // steer left
          currentSpeed = 1.6;
        } else if (rightBlack && !leftBlack) {
          targetOmega = 0.065; // steer right
          currentSpeed = 1.6;
        } else if (leftBlack && rightBlack) {
          targetOmega = 0; // go straight
          currentSpeed = 1.8;
        } else {
          // If offline for a short brief period, keep previous turning posture to catch line
          if (trackingOfflineCountRef.current < 25) {
            targetOmega = lastSteerDir * 0.045;
            currentSpeed = 0.8;
          } else {
            // Completely offline: stop completely to prevent unrequested endless spin!
            targetOmega = 0;
            currentSpeed = 0;
          }
        }

        if (targetOmega !== 0) {
          lastSteerDir = targetOmega < 0 ? -1 : 1;
        }

        omega = omega * 0.70 + targetOmega * 0.30;
        theta += omega;
        x += Math.cos(theta) * currentSpeed;
        y += Math.sin(theta) * currentSpeed;

        if (x < -10 || x > width + 10 || y < -10 || y > height + 10) {
          // Reset inside
          x = 250;
          y = 50;
          theta = 0;
          omega = 0;
        }

        // Live check counting
        const isCurrentlyTracking = leftBlack || rightBlack;
        if (isCurrentlyTracking) {
          setTrackingStepCount(c => {
            const nextCount = c + 1;
            if (nextCount >= 180) {
              setIsTrackingComplete(true);
              setScore(100);
            }
            return nextCount;
          });
        } else {
          setTrackingStepCount(c => Math.max(0, c - 2));
        }

        setSensorsState({ leftBlack, rightBlack, slx, sly, srx, sry });

        return { x, y, theta, omega, lastSteerDir };
      });

      frameId = requestAnimationFrame(runPhysics);
    };

    frameId = requestAnimationFrame(runPhysics);
    return () => cancelAnimationFrame(frameId);
  }, [isSimRunning, moduleId]);

  // Handle automatic drawing of tracking oval on canvas layout
  useEffect(() => {
    if (moduleId === 'tracking' && canvasRef.current) {
      const timer = setTimeout(() => {
        drawPresetTrack();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [moduleId]);

  // Touch Sensor State
  const [touchClicks, setTouchClicks] = useState(0); 
  const [touchLevel, setTouchLevel] = useState(50); // potentiometer sensitivity (0-100)
  const [isCurrentlyTouched, setIsCurrentlyTouched] = useState(false);
  const [isTouchComplete, setIsTouchComplete] = useState(false);

  // Advanced Touch Kid Character & Gate Simulation States
  const [touchSimState, setTouchSimState] = useState<'idle' | 'walking' | 'standing' | 'reaching' | 'touching' | 'unlocking' | 'opened' | 'passing' | 'passed'>('idle');
  const [touchCharX, setTouchCharX] = useState(15);
  const [touchFingerY, setTouchFingerY] = useState(120); // 120 = retracted, 55 = touching the pad
  const [touchLockType, setTouchLockType] = useState<'solenoid' | 'servo' | 'pneumatic'>('solenoid');
  const [touchIsAutoPlaying, setTouchIsAutoPlaying] = useState(false);
  const [touchLog, setTouchLog] = useState('SYSTEM REBOOT: D4 CAPACITIVE GATE MONITOR ONLINE.');
  const [isHumanImgError, setIsHumanImgError] = useState(false);
  const [isGateImgError, setIsGateImgError] = useState(false);

  // Knock Sensor state variables
  const [knockCount, setKnockCount] = useState(0);
  const [knockIntensity, setKnockIntensity] = useState(0); // 0-100 impact level
  const [knockSensitivity, setKnockSensitivity] = useState(40); // threshold (0-100)
  const [isKnockedState, setIsKnockedState] = useState(false);
  const [isKnockComplete, setIsKnockComplete] = useState(false);
  const [knockLog, setKnockLog] = useState('SYSTEM STABLE: KY-031 KNOCK SENSOR ARMED.');

  // Derive 3D layout coordinates for the boy character based on horizontal tracker value
  // This smoothly guides the boy off the front path directly into the center opening of the gate
  const isBackFacing = touchCharX > 42;
  const fInterpolate = isBackFacing ? Math.min(1, Math.max(0, (touchCharX - 42) / 38)) : 0;
  const visualLeftStr = isBackFacing 
    ? `calc(${(1 - fInterpolate).toFixed(4)} * 42% + ${fInterpolate.toFixed(4)} * (100% - 12% - 108px))`
    : `${touchCharX}%`;
  const visualBottom = touchCharX > 42 ? (touchCharX <= 80 ? Math.round(64 + ((touchCharX - 42) / 38) * 44) : Math.round(108 + ((touchCharX - 80) / 10) * 16)) : 64;
  const visualScale = touchCharX > 42 ? (touchCharX <= 80 ? (1.0 - ((touchCharX - 42) / 38) * 0.3) : (0.7 - ((touchCharX - 80) / 10) * 0.12)) : 1.0;
  const visualZIndex = touchCharX > 42 ? 25 : 40;

  // sound effect helper for the touch module
  const playTouchSound = (soundType: 'beep' | 'clack' | 'cheer') => {
    if (simIsMuted) return;
    try {
      const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      if (soundType === 'beep') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1150, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } else if (soundType === 'clack') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, ctx.currentTime);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (soundType === 'cheer') {
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
          gain.gain.setValueAtTime(0.03, ctx.currentTime + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.15);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.08);
          osc.stop(ctx.currentTime + idx * 0.08 + 0.15);
        });
      }
    } catch (e) {}
  };

  // Knock Sensor Sound & Interactive Impact Engine
  const playKnockSound = () => {
    if (simIsMuted) return;
    try {
      const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      // High-to-low sweeping frequency creates perfect mechanical wooden impact sound
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15);
      
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {}
  };

  const triggerKnock = (forceOverride?: number) => {
    if (isKnockedState) return;
    
    // Choose selected force or random vibration power
    const force = forceOverride !== undefined ? forceOverride : Math.round(40 + Math.random() * 55);
    setKnockIntensity(force);
    setIsKnockedState(true);
    playKnockSound();
    
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const isSuccessful = force >= knockSensitivity;
    
    if (isSuccessful) {
      setKnockCount(prev => {
        const next = Math.min(3, prev + 1);
        if (next >= 3) {
          setIsKnockComplete(true);
        }
        return next;
      });
      setKnockLog(`[${timestamp}] 💥 IMPACT DETECTED! Force: ${force}/100 >= Limit: ${knockSensitivity} | Pins D12 & D13 HIGH! LEDs illuminated!`);
    } else {
      setKnockLog(`[${timestamp}] 💤 Tap sensed: ${force}/100 < Limit: ${knockSensitivity} | Vibration too faint to close spring contact.`);
    }
    
    // Auto reset wiggling state after a split second
    setTimeout(() => {
      setIsKnockedState(false);
    }, 400);
  };

  // Touch Sensor Cinematic Auto-Play Loop
  useEffect(() => {
    if (!touchIsAutoPlaying || moduleId !== 'touch') return;
    
    let timer: any = null;
    
    if (touchSimState === 'idle') {
      timer = setTimeout(() => {
        setTouchSimState('walking');
        setTouchLog('[CINEMATIC] Human kid starts walking towards the entrance...');
      }, 1000);
    } else if (touchSimState === 'walking') {
      timer = setTimeout(() => {
        setTouchCharX(38); // move position towards sensor station
        setTouchSimState('standing');
        setTouchLog('[CINEMATIC] Arrived at the TTP223 capacitive touch column.');
      }, 1500);
    } else if (touchSimState === 'standing') {
      timer = setTimeout(() => {
        setTouchSimState('reaching');
        setTouchLog('[CINEMATIC] Raising finger to contact the golden conductive pad...');
      }, 1500);
    } else if (touchSimState === 'reaching') {
      timer = setTimeout(() => {
        setTouchFingerY(55); // drop finger onto pad
        setTouchSimState('touching');
        setIsCurrentlyTouched(true);
        setTouchLog('[TTP223] HUMAN BODY CAPACITANCE REGISTERED! SIG D4 -> HIGH (5V)');
        playTouchSound('beep');
      }, 1000);
    } else if (touchSimState === 'touching') {
      timer = setTimeout(() => {
        setTouchSimState('unlocking');
        setTouchLog(`[MCU] High I/O trigger received! Activating relay output to open ${touchLockType} lock...`);
        playTouchSound('clack');
      }, 1500);
    } else if (touchSimState === 'unlocking') {
      timer = setTimeout(() => {
        setTouchSimState('opened');
        setIsCurrentlyTouched(false);
        setTouchFingerY(120); // pull hand back
        setTouchLog('[GATE] Lock solenoid released! Gateway swing doors are now OPEN.');
      }, 1500);
    }
    
    return () => clearTimeout(timer);
  }, [touchIsAutoPlaying, touchSimState, moduleId, touchLockType]);

  // Unified Effect that auto-progresses the kid past the gate once OPENED (Both manual and cinematic)
  useEffect(() => {
    if (moduleId !== 'touch') return;
    
    let timer: any = null;
    
    if (touchSimState === 'opened') {
      timer = setTimeout(() => {
        setTouchCharX(80); // Move straight to the middle of the gate! (80%)
        setTouchSimState('passing');
        setTouchLog('The gate is open! The boy turns around and starts walking through the middle of the gate in 3D...');
      }, 1200);
    } else if (touchSimState === 'passing') {
      timer = setTimeout(() => {
        setTouchCharX(90); // Walk deep inside the gate! (90%)
        setTouchSimState('passed');
        setIsTouchComplete(true);
        setTouchClicks(prev => prev + 1);
        setTouchLog('[SUCCESS] Gateway security authorized! The boy has went inside the gate safely.');
        playTouchSound('cheer');
      }, 1800);
    }
    
    return () => clearTimeout(timer);
  }, [touchSimState, moduleId]);

  const triggerManualTouchToggle = () => {
    if (touchSimState === 'passed') {
      setTouchSimState('idle');
      setTouchCharX(15);
      setTouchFingerY(120);
      setIsCurrentlyTouched(false);
      setIsTouchComplete(false);
      setTouchLog('RELOADED: GATE CLOSED & LOCKED.');
      return;
    }
    
    const nextTouch = !isCurrentlyTouched;
    setIsCurrentlyTouched(nextTouch);
    if (nextTouch) {
      playTouchSound('beep');
      setTouchFingerY(55); // touch pad
      setTouchLog('[TTP223] TOUCH PAD INDUCTION ACTIVE! SIG PIN D4 -> HIGH (5V)');
      if (touchSimState === 'idle' || touchSimState === 'standing' || touchSimState === 'reaching') {
        setTouchSimState('touching');
        setTimeout(() => {
          setTouchSimState('unlocking');
          playTouchSound('clack');
          setTouchLog(`[MCU] Solenoid relay activated! Electromagnetic barrier unlocked.`);
          setTimeout(() => {
            setTouchSimState('opened');
            setIsCurrentlyTouched(false);
            setTouchFingerY(120);
            setTouchLog(`[GATE] Locks released! The boy sees the doors open and begins to walk through.`);
          }, 800);
        }, 800);
      }
    } else {
      setTouchFingerY(120);
      setTouchLog('[TTP223] STANDBY. NO CHARGE INTERFERENCE PIN D4 -> LOW (0V)');
      if (touchSimState === 'touching') {
        setTouchSimState('idle');
      }
    }
  };

  // IR Sensor - Smart Parking System State
  const [parkingSlots, setParkingSlots] = useState<(string | null)[]>([null, null, null, null]);
  const [parkingState, setParkingState] = useState<'idle' | 'spawning' | 'approaching' | 'detected' | 'entering' | 'parking' | 'parked' | 'full'>('idle');
  const [currentCarIdx, setCurrentCarIdx] = useState<number>(-1);
  const [gateOpen, setGateOpen] = useState(false);
  const [carAnimPos, setCarAnimPos] = useState({ x: -100, y: 240, rotate: 0 });
  const [irSensorLedActive, setIrSensorLedActive] = useState(false);
  const [lcdLines, setLcdLines] = useState<string[]>(['SMART PARKING', 'SLOTS FREE: 4']);

  // Light Cup Drag-to-Tilt State
  const [lightCupAngle, setLightCupAngle] = useState(0); 
  const [lightCupPouredLeft, setLightCupPouredLeft] = useState(false);
  const [lightCupPouredRight, setLightCupPouredRight] = useState(false);

  // Sound Sensor (Clap Party) States
  const [soundClappedCount, setSoundClappedCount] = useState(0);
  const [isSoundClapping, setIsSoundClapping] = useState(false);
  const [soundLevel, setSoundLevel] = useState(30);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef(0);
  const dragStartAngleRef = useRef(0);

  // Heartbeat Pulse Sensor States
  const [fingerPlaced, setFingerPlaced] = useState(false);
  const [heartBPM, setHeartBPM] = useState(0);
  const [detectedBeats, setDetectedBeats] = useState(0);
  const [ecgPathOffset, setEcgPathOffset] = useState(0);
  const [ecgPulseActive, setEcgPulseActive] = useState(false);

  // Laser Emit Sensor States
  const [laserArmed, setLaserArmed] = useState(true); // default armed for home security!
  const [laserAngle, setLaserAngle] = useState(0); // Angle in degrees (-60 to 60)
  const [laserHits, setLaserHits] = useState<boolean[]>([false, false, false, false]); // 4 target sensor nodes
  const [laserBlinkActive, setLaserBlinkActive] = useState(false);

  // === Laser security simulation states ( Bhutanese Traditional Gate Theme ) ===
  const [laserSimState, setLaserSimState] = useState<'idle' | 'sneaking' | 'triggered' | 'police-arriving' | 'arrested' | 'cleared'>('idle');
  const [thiefPos, setThiefPos] = useState(15); 
  const [policePos, setPolicePos] = useState(115); 
  const [sirenActive, setSirenActive] = useState(false);
  const [simIsMuted, setSimIsMuted] = useState(false);
  const [arduinoLogText, setArduinoLogText] = useState('SYSTEM CHECK: OK. KY-008 MONITOR ARMED.');
  const [isLdrBlocked, setIsLdrBlocked] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [buzzerToneSelect, setBuzzerToneSelect] = useState<'hilo' | 'yelp' | 'pulse'>('hilo');

  // Alarm sound effect synthesized real-time with Web Audio API
  useEffect(() => {
    let audioInterval = null;
    let audioCtx = null;
    let osc = null;
    let gain = null;

    if (sirenActive && !simIsMuted && moduleId === 'laser') {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          audioCtx = new AudioContextClass();
          gain = audioCtx.createGain();
          gain.gain.setValueAtTime(0.04, audioCtx.currentTime); 
          gain.connect(audioCtx.destination);

          osc = audioCtx.createOscillator();
          osc.connect(gain);
          osc.start();

          let toggle = false;

          audioInterval = setInterval(() => {
            if (!audioCtx || !osc) return;
            const now = audioCtx.currentTime;

            if (buzzerToneSelect === 'hilo') {
              // Classic dual-tone police alarm
              const targetFreq = toggle ? 920 : 610;
              osc.frequency.setTargetAtTime(targetFreq, now, 0.05);
              toggle = !toggle;
            } else if (buzzerToneSelect === 'yelp') {
              // Rapid high-speed chirp sweep
              osc.frequency.setValueAtTime(500, now);
              osc.frequency.linearRampToValueAtTime(1400, now + 0.12);
            } else {
              // Pulse beeper
              osc.frequency.setValueAtTime(1200, now);
              gain.gain.setValueAtTime(0.04, now);
              setTimeout(() => {
                if (gain) {
                  try { gain.gain.setValueAtTime(0.0, now + 0.05); } catch(e){}
                }
              }, 60);
            }
          }, buzzerToneSelect === 'yelp' ? 140 : buzzerToneSelect === 'pulse' ? 200 : 300);
        }
      } catch (e) {
        console.error("Audio Synthesis Failed", e);
      }
    }

    return () => {
      if (audioInterval) clearInterval(audioInterval);
      if (osc) { try { osc.stop(); } catch(e){} }
      if (audioCtx) { try { audioCtx.close(); } catch(e){} }
    };
  }, [sirenActive, simIsMuted, buzzerToneSelect, moduleId]);

  // Cinematic storyboard timeline runner
  useEffect(() => {
    let timer = null;
    if (!isAutoPlaying || moduleId !== 'laser') return;

    if (laserSimState === 'idle') {
      setLaserArmed(true);
      setThiefPos(12);
      setPolicePos(115);
      setSirenActive(false);
      setIsLdrBlocked(false);
      setScore(0);
      setArduinoLogText('SYSTEM SAFE: BEAM DISPATCHED ON D12. DETECTING LIGHT...');
      timer = setTimeout(() => {
        setLaserSimState('sneaking');
      }, 1000);
    } else if (laserSimState === 'sneaking') {
      setArduinoLogText('LDR ENVELOPE: LIGHT OK. INTRUDER IN BOUNDS!');
      const runInterval = setInterval(() => {
        setThiefPos((prev) => {
          // At around 48% coordinate, block the laser
          if (prev >= 48) {
            clearInterval(runInterval);
            setIsLdrBlocked(true);
            setSirenActive(true);
            setLaserSimState('triggered');
            return 48;
          }
          return prev + 1.2;
        });
      }, 40);
      return () => clearInterval(runInterval);
    } else if (laserSimState === 'triggered') {
      setIsLdrBlocked(true);
      setSirenActive(true);
      setArduinoLogText('BEAM SEVERED! RESISTANCE INFINITE. TRIGGER BUZZER D8!');
      timer = setTimeout(() => {
        setLaserSimState('police-arriving');
      }, 2000);
    } else if (laserSimState === 'police-arriving') {
      setArduinoLogText('BUZZER ALARM ACTIVE. COPS EN ROUTE FROM STATION...');
      const carInterval = setInterval(() => {
        setPolicePos((prev) => {
          if (prev <= 60) {
            clearInterval(carInterval);
            setLaserSimState('arrested');
            return 60;
          }
          return prev - 2.5;
        });
      }, 30);
      return () => clearInterval(carInterval);
    } else if (laserSimState === 'arrested') {
      setArduinoLogText('COPS ARRIVED. ALARM MUTED. TAKING BURGLAR TO THE GRID!');
      timer = setTimeout(() => {
        setLaserSimState('cleared');
      }, 2500);
    } else if (laserSimState === 'cleared') {
      const driveInterval = setInterval(() => {
        setPolicePos((prev) => {
          if (prev <= -30) {
            clearInterval(driveInterval);
            setIsAutoPlaying(false);
            setScore(100); // completed!
            setLaserSimState('idle'); // loop back
            return -30;
          }
          return prev - 2;
        });
        setThiefPos((prev) => prev - 2); // police carry thief offscreen together!
      }, 30);
      return () => clearInterval(driveInterval);
    }

    return () => clearTimeout(timer);
  }, [isAutoPlaying, laserSimState, moduleId]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (moduleId === 'ir-sensor') {
      if (parkingState === 'spawning') {
        const nextIdx = parkingSlots.findIndex(s => s === null);
        if (nextIdx !== -1) {
          if (currentCarIdx !== nextIdx) {
            setCurrentCarIdx(nextIdx);
          } else {
            setCarAnimPos({ x: -80, y: 240, rotate: 0 });
            setLcdLines(['SYSTEM ACTIVE', `DISPATCH CAR ${nextIdx + 1}`]);
            timer = setTimeout(() => {
              setParkingState('approaching');
            }, 800);
          }
        } else {
          setParkingState('full');
        }
      } else if (parkingState === 'approaching') {
        setCarAnimPos({ x: 35, y: 240, rotate: 0 });
        setLcdLines(['STATUS: RUNNING', 'CAR APPROACHING...']);
        timer = setTimeout(() => {
          setParkingState('detected');
        }, 1500);
      } else if (parkingState === 'detected') {
        setIrSensorLedActive(true);
        setLcdLines(['IR DETECTED CAR', 'STATUS: VERIFYING']);
        timer = setTimeout(() => {
          setGateOpen(true);
          setLcdLines(['ACCESS GRANTED', 'OPENING BARRIER']);
          timer = setTimeout(() => {
            setParkingState('entering');
          }, 1200);
        }, 1200);
      } else if (parkingState === 'entering') {
        setIrSensorLedActive(false);
        setCarAnimPos({ x: 120, y: 240, rotate: 0 });
        setLcdLines(['CAR PASSING GATE', 'BARRIER ACTIVE']);
        timer = setTimeout(() => {
          const slotPositionsX = [200, 310, 420, 530];
          const slotX = slotPositionsX[currentCarIdx] + 7.5;
          setCarAnimPos({ x: slotX, y: 240, rotate: 0 });
          timer = setTimeout(() => {
            setParkingState('parking');
          }, 1000);
        }, 1000);
      } else if (parkingState === 'parking') {
        const slotPositionsX = [200, 310, 420, 530];
        const slotX = slotPositionsX[currentCarIdx] + 7.5;
        setCarAnimPos({ x: slotX, y: 240, rotate: -90 });
        timer = setTimeout(() => {
          setCarAnimPos({ x: slotX, y: 76, rotate: -90 });
          setLcdLines(['ASSIGNING SLOT...', `SLOT CHOSEN: #${currentCarIdx + 1}`]);
          timer = setTimeout(() => {
            setParkingState('parked');
          }, 1200);
        }, 600);
      } else if (parkingState === 'parked') {
        const colors = ['#ef4444', '#3b82f6', '#eab308', '#10b981'];
        if (parkingSlots[currentCarIdx] === null) {
          setParkingSlots(prev => {
            const next = [...prev];
            next[currentCarIdx] = colors[currentCarIdx];
            return next;
          });
          setCarAnimPos({ x: -100, y: 240, rotate: 0 });
          setGateOpen(false);
          const freeSlots = 4 - (currentCarIdx + 1);
          setLcdLines([`SLOT #${currentCarIdx + 1} RESERVED`, `SLOTS AVAILABLE: ${freeSlots}`]);
          timer = setTimeout(() => {
            if (currentCarIdx < 3) {
              setParkingState('spawning');
            } else {
              setParkingState('full');
            }
          }, 1500);
        }
      } else if (parkingState === 'full') {
        setLcdLines(['PARKING FULL!', 'NO PARKING SPACE']);
      }
    }
    return () => clearTimeout(timer);
  }, [parkingState, currentCarIdx, moduleId]);

  useEffect(() => {
    let waterInterval: NodeJS.Timeout;
    if (activeSoilPot === 'dry') {
      setIsWatering(true);
      waterInterval = setInterval(() => {
        setDryPlantHealth(prev => Math.min(100, prev + 2));
      }, 100);
    } else {
      setIsWatering(false);
    }
    return () => clearInterval(waterInterval);
  }, [activeSoilPot]);

  useEffect(() => {
    let transitionInterval: NodeJS.Timeout;
    if (dayIntensity !== targetIntensity) {
      setLdrSimulated(true);
      const step = 1 / (7 * 20); // 7 seconds at 20fps
      transitionInterval = setInterval(() => {
        setDayIntensity(prev => {
          if (targetIntensity > prev) {
            return Math.min(targetIntensity, prev + step);
          } else {
            return Math.max(targetIntensity, prev - step);
          }
        });
      }, 50);
    }
    return () => clearInterval(transitionInterval);
  }, [targetIntensity, dayIntensity]);

  useEffect(() => {
    // Simulate LDR resistance changing with light
    // In Arduino, higher light often means lower resistance (measured value depends on circuit)
    // Here: Bright Day = ~800, Deep Night = ~100
    setLdrReading(Math.round(100 + dayIntensity * 700 + (Math.random() - 0.5) * 5));
  }, [dayIntensity]);

  useEffect(() => {
    let smokeInterval: NodeJS.Timeout;
    if (isEmittingSmoke) {
      smokeInterval = setInterval(() => {
        setSmokeLevel(prev => Math.min(100, prev + 5)); // Faster rise
      }, 50);
    } else {
      smokeInterval = setInterval(() => {
        setSmokeLevel(prev => Math.max(0, prev - 1)); // Natural dispersion
      }, 100);
    }
    return () => clearInterval(smokeInterval);
  }, [isEmittingSmoke]);

  useEffect(() => {
    // Simulate sensor lag and jitter
    setSmokeReading(prev => {
      const target = smokeLevel * 5.0; // Reaches 500ppm from 0ppm baseline
      const diff = target - prev;
      return prev + (diff * 0.1) + (Math.random() - 0.5) * 2;
    });
  }, [smokeLevel]);

  useEffect(() => {
    let driveInterval: NodeJS.Timeout;
    if (isDriving && truckX < 360) {
      driveInterval = setInterval(() => {
        setTruckX(prev => Math.min(360, prev + 5));
      }, 30);
    } else if (truckX >= 360) {
      setIsDriving(false);
    }
    return () => clearInterval(driveInterval);
  }, [isDriving, truckX]);

  useEffect(() => {
    if (moduleId === 'flame-sensor') {
      const isNear = truckX >= 360; 
      if (isNear && fireIntensity > 0) {
        setIsSpraying(true);
        const timer = setInterval(() => {
          setFireIntensity(prev => Math.max(0, prev - 2.5));
        }, 50);
        return () => clearInterval(timer);
      } else {
        setIsSpraying(false);
      }
    }
  }, [truckX, fireIntensity, moduleId]);

  useEffect(() => {
    let ecgInterval: NodeJS.Timeout;
    let pulseInterval: NodeJS.Timeout;

    if (moduleId === 'heartbeat') {
      if (fingerPlaced) {
        setHeartBPM(74 + Math.floor(Math.random() * 5));
        
        ecgInterval = setInterval(() => {
          setEcgPathOffset(prev => (prev + 4.5) % 400);
        }, 30);

        pulseInterval = setInterval(() => {
          setEcgPulseActive(true);
          
          try {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContextClass) {
              const ctx = new AudioContextClass();
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.type = 'sine';
              osc.frequency.setValueAtTime(441, ctx.currentTime);
              gain.gain.setValueAtTime(0.06, ctx.currentTime);
              gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.start();
              osc.stop(ctx.currentTime + 0.1);
            }
          } catch (e) {}

          setTimeout(() => {
            setEcgPulseActive(false);
          }, 150);

          setDetectedBeats(prev => {
            const next = Math.min(10, prev + 1);
            setScore(next * 10);
            return next;
          });
        }, 800);
      } else {
        setHeartBPM(0);
        setEcgPulseActive(false);
      }
    }

    return () => {
      clearInterval(ecgInterval);
      clearInterval(pulseInterval);
    };
  }, [fingerPlaced, moduleId]);

  // Laser target collision evaluator
  useEffect(() => {
    if (moduleId === 'laser' && laserArmed) {
      const targets = [
        { id: 0, ang: -45 },
        { id: 1, ang: -15 },
        { id: 2, ang: 15 },
        { id: 3, ang: 45 }
      ];

      targets.forEach((tgt) => {
        if (Math.abs(laserAngle - tgt.ang) < 3.5 && !laserHits[tgt.id]) {
          // Locked target! Trigger a sound beep & mark hit
          setLaserHits(prev => {
            const next = [...prev];
            if (!next[tgt.id]) {
              next[tgt.id] = true;
              
              // Increment score based on target hits count
              const activeCount = next.filter(Boolean).length;
              setScore(activeCount * 25);

              // Sound feedback beep synthesize
              try {
                const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
                if (AudioContextClass) {
                  const ctx = new AudioContextClass();
                  const osc = ctx.createOscillator();
                  const gain = ctx.createGain();
                  
                  osc.type = 'triangle';
                  osc.frequency.setValueAtTime(600 + tgt.id * 100, ctx.currentTime);
                  gain.gain.setValueAtTime(0.08, ctx.currentTime);
                  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
                  
                  osc.connect(gain);
                  gain.connect(ctx.destination);
                  osc.start();
                  osc.stop(ctx.currentTime + 0.15);
                }
              } catch (e) {}
            }
            return next;
          });
        }
      });
    }
  }, [laserAngle, laserArmed, moduleId, laserHits]);

  const isComplete = score >= 100 || 
                    (moduleId === 'heartbeat' && detectedBeats >= 10) ||
                    (moduleId === 'laser' && laserHits.filter(Boolean).length === 4) ||
                    (moduleId === 'ultrasonic' && distance < 120) ||
                    (moduleId === 'joystick' && (Math.abs(carPos.x) > 50 || Math.abs(carPos.y) > 50)) ||
                    (moduleId === 'rotary-encoder' && fanSpeed >= 100) ||
                    (moduleId === 'flame-sensor' && fireIntensity <= 0) ||
                    (moduleId === 'smoke-sensor' && smokeLevel >= 80) ||
                    (moduleId === 'dot-matrix' && activeMood !== null) ||
                    (moduleId === 'ldr' && ldrSimulated) ||
                    (moduleId === 'soil-moisture' && dryPlantHealth >= 100) ||
                    (moduleId === 'reed-switch' && isReedActive) ||
                    (moduleId === 'ir-sensor' && parkingState === 'full') ||
                    (moduleId === 'light-cup' && lightCupPouredLeft && lightCupPouredRight) ||
                    (moduleId === 'sound-sensor' && soundClappedCount >= 3) ||
                    (moduleId === 'temperature-sensor' && isTempComplete) ||
                    (moduleId === 'humidity' && isHumidityComplete) ||
                    (moduleId === 'tracking' && isTrackingComplete) ||
                    (moduleId === 'knock-sensor' && isKnockComplete) ||
                    (moduleId === 'touch' && isTouchComplete);

  const activePins = moduleId === 'soil-moisture' ? ['A0'] :
                     moduleId === 'ldr' ? ['A1'] :
                     moduleId === 'heartbeat' ? ['A0', 'D13'] :
                     moduleId === 'laser' ? ['D12', 'A0', 'A1', 'A2', 'A3'] :
                     moduleId === 'smoke-sensor' ? ['A2'] :
                     moduleId === 'temperature-sensor' ? ['A0'] :
                     moduleId === 'humidity' ? ['D2'] :
                     moduleId === 'tracking' ? ['D3'] :
                     moduleId === 'touch' ? ['D4'] :
                     moduleId === 'knock-sensor' ? ['D3', 'D12', 'D13'] :
                     moduleId === 'ultrasonic' ? ['D12', 'D13'] :
                     moduleId === 'tilt' ? ['D2'] :
                     moduleId === 'ir-sensor' ? ['D2', 'D5'] :
                     moduleId === 'joystick' ? ['A4', 'A5'] :
                     moduleId === 'rotary-encoder' ? ['D5', 'D6'] :
                     moduleId === 'dot-matrix' ? ['D11', 'D12'] : 
                     moduleId === 'light-cup' ? ['D3', 'D4'] :
                     moduleId === 'sound-sensor' ? ['A0', 'D8'] :
                     moduleId === 'reed-switch' ? ['D2', 'D13'] : [];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 relative">
       {/* Lab Bench Background */}
       <div className="bg-[#fdfbf7] rounded-[60px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-4 md:p-12 border-8 border-[#e8e2d6] min-h-[700px] flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
          {/* Wood Grain Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />
          
          {/* Simulation Area */}
          <div className="flex-1 w-full bg-white rounded-[48px] hard-shadow-dark border-4 border-black/5 p-8 md:p-12 min-h-[550px] flex flex-col items-center justify-center space-y-10 relative overflow-hidden backdrop-blur-sm bg-white/80">
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle,black_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            
            {gameState === 'playing' && (
              <div className="w-full space-y-10 relative z-10 h-full flex flex-col">
                {moduleId === 'reed-switch' ? (
                  <div className="space-y-12 w-full flex flex-col items-center">
                    {/* Security Scene */}
                    <div ref={containerRef} className="h-96 w-full bg-[#f8fafc] rounded-[48px] border-4 border-black/10 relative overflow-hidden flex items-center justify-center shadow-2xl p-8" style={{ perspective: '2000px' }}>
                       <div className="absolute inset-0 bg-[radial-gradient(circle,#94a3b8_1px,transparent_1px)] bg-[size:40px_40px] opacity-10" />
                       
                       {/* VINTAGE COZY INTERIOR (Matching sample image) */}
                       <AnimatePresence>
                         {isReedActive && (
                           <motion.div 
                             initial={{ opacity: 0, scale: 0.95 }}
                             animate={{ opacity: 1, scale: 1 }}
                             transition={{ duration: 0.6, delay: 0.1 }}
                             className="absolute inset-x-8 inset-y-8 left-[calc(25%+12px)] right-8 z-0 bg-sky-50 border-4 border-slate-200 rounded-[32px] overflow-hidden flex flex-col items-stretch justify-end shadow-inner"
                           >
                              {/* Striped Wallpaper (Teal/Light Blue) */}
                              <div className="absolute inset-0 opacity-20 pointer-events-none" 
                                style={{ 
                                  backgroundImage: 'linear-gradient(90deg, #0d9488 50%, transparent 50%)', 
                                  backgroundSize: '40px 100%' 
                                }} 
                              />
                              
                              {/* Wall Decorations - Pictures & Clock */}
                              <div className="absolute top-12 left-16 flex items-start gap-4">
                                 <div className="w-16 h-20 bg-amber-900 p-1.5 rounded-sm shadow-md border border-amber-950 flex flex-col">
                                    <div className="flex-1 bg-emerald-50 rounded-sm overflow-hidden relative">
                                       <div className="absolute bottom-0 w-full h-1/2 bg-emerald-200/50 rotate-12 translate-y-2" />
                                    </div>
                                 </div>
                                 <div className="flex flex-col gap-3">
                                    <div className="w-28 h-18 bg-amber-900 p-2 rounded-sm shadow-md border border-amber-950 mt-4">
                                       <div className="w-full h-full bg-sky-50 rounded-sm border border-black/5" />
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                       <div className="w-8 h-8 rounded-full bg-white border-2 border-amber-900 shadow-sm flex items-center justify-center">
                                          <div className="w-0.5 h-3 bg-dark rounded-full origin-bottom rotate-45" />
                                          <div className="w-0.5 h-2 bg-dark rounded-full absolute origin-bottom -rotate-45" />
                                       </div>
                                       <div className="w-8 h-8 rounded-full bg-white border-2 border-amber-900 shadow-sm" />
                                    </div>
                                 </div>
                                 <div className="w-16 h-20 bg-amber-900 p-1.5 rounded-sm shadow-md border border-amber-950">
                                    <div className="w-full h-full bg-orange-50 rounded-sm overflow-hidden relative">
                                       <div className="absolute inset-2 w-4 h-4 rounded-full bg-yellow-200/50 blur-sm" />
                                    </div>
                                 </div>
                              </div>

                              {/* Arched Window with Curtains */}
                              <div className="absolute top-6 right-10 w-56 h-64 flex flex-col items-center">
                                 <div className="w-full h-full bg-white rounded-t-full border-x-8 border-t-8 border-amber-900 shadow-2xl relative overflow-hidden">
                                    {/* Outdoor View */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-sky-300 to-sky-100">
                                       <div className="absolute bottom-0 w-full h-3/4 bg-emerald-200 rounded-t-full translate-y-8 blur-[1px]" />
                                    </div>
                                    {/* Window Panes */}
                                    <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 opacity-20">
                                       <div className="border-r-4 border-b-4 border-amber-950" />
                                       <div className="border-b-4 border-amber-950" />
                                       <div className="border-r-4 border-amber-950" />
                                       <div className="border-amber-950" />
                                    </div>
                                    {/* Curtains */}
                                    <div className="absolute inset-y-0 left-0 w-12 bg-orange-500 rounded-r-3xl shadow-[5px_0_15px_rgba(0,0,0,0.2)] z-10" />
                                    <div className="absolute inset-y-0 right-0 w-12 bg-orange-500 rounded-l-3xl shadow-[-5px_0_15px_rgba(0,0,0,0.2)] z-10" />
                                 </div>
                                 {/* Hanging Lamp */}
                                 <div className="absolute -top-10 left-12 flex flex-col items-center z-20">
                                    <div className="w-1 h-24 bg-amber-950" />
                                    <div className="w-24 h-14 bg-orange-200 rounded-t-full border-b-[6px] border-amber-600 shadow-lg relative flex items-center justify-center">
                                       <div className="absolute -bottom-2 w-4 h-4 bg-yellow-100 rounded-full blur-[2px]" />
                                    </div>
                                 </div>
                              </div>

                              {/* Bookshelf (Left) */}
                              <div className="absolute bottom-16 left-8 w-36 h-72 bg-amber-800 border-x-4 border-t-4 border-amber-950 rounded-t-sm flex flex-col p-2 gap-4 shadow-2xl z-10">
                                 <div className="flex-1 grid grid-rows-3 gap-0.5">
                                    <div className="border-b-4 border-amber-950 flex gap-1 items-end px-1 pb-1">
                                       <div className="w-2.5 h-10 bg-sky-700 rounded-sm" />
                                       <div className="w-2.5 h-12 bg-red-700 rounded-sm" />
                                       <div className="w-2.5 h-8 bg-yellow-600 rounded-sm" />
                                       <div className="w-2.5 h-14 bg-emerald-700 rounded-sm" />
                                    </div>
                                    <div className="border-b-4 border-amber-950 flex gap-1 items-end px-1 pb-1">
                                       <div className="w-3 h-8 bg-amber-100/50 rounded-sm" />
                                       <div className="w-2.5 h-10 bg-orange-600 rounded-sm" />
                                       <div className="w-2.5 h-9 bg-purple-700 rounded-sm" />
                                    </div>
                                    <div className="border-b-0 flex gap-1 items-end px-1 pb-1">
                                       <div className="w-2.5 h-6 bg-slate-500 rounded-sm" />
                                       <div className="w-2.5 h-8 bg-blue-700 rounded-sm" />
                                    </div>
                                 </div>
                                 <div className="h-20 bg-amber-900 border-2 border-amber-950 rounded-sm flex flex-col justify-around p-2">
                                    <div className="w-full h-1.5 bg-amber-950/30 rounded-full" />
                                    <div className="w-full h-1.5 bg-amber-950/30 rounded-full" />
                                 </div>
                              </div>

                              {/* Main Seating Area */}
                              <div className="relative z-10 p-8 pt-0 flex items-end justify-center gap-12 w-full h-64">
                                 {/* Teal Sofa with Orange Pillows */}
                                 <div className="relative flex flex-col items-center group -ml-12">
                                    {/* Rug Underneath */}
                                    <div className="absolute -bottom-4 w-[120%] h-24 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 rounded-[60px] opacity-90 shadow-inner -z-10 border-4 border-white/10" />
                                    
                                    {/* Sofa Structure */}
                                    <div className="flex gap-1 relative z-10 transition-transform group-hover:-translate-y-1">
                                       {/* Left Orange Pillow */}
                                       <motion.div 
                                         animate={{ rotate: [12, 10, 12] }}
                                         transition={{ duration: 3, repeat: Infinity }}
                                         className="w-12 h-12 bg-orange-500 rounded-2xl shadow-xl absolute -left-4 top-4 z-20 border-b-4 border-orange-700" 
                                       />
                                       
                                       {/* Sofa Body */}
                                       <div className="w-64 h-24 bg-teal-600 rounded-t-[40px] border-x-8 border-t-8 border-teal-800 shadow-2xl relative flex overflow-hidden">
                                          <div className="w-1/2 h-full border-r-4 border-teal-800/30" />
                                          <div className="absolute bottom-2 left-1/4 right-1/4 h-2 bg-teal-800/20 rounded-full" />
                                       </div>

                                       {/* Right Orange Pillow */}
                                       <motion.div 
                                         animate={{ rotate: [-12, -10, -12] }}
                                         transition={{ duration: 3, repeat: Infinity }}
                                         className="w-12 h-12 bg-orange-500 rounded-2xl shadow-xl absolute -right-4 top-4 z-20 border-b-4 border-orange-700" 
                                       />
                                    </div>
                                    
                                    {/* Sofa Base */}
                                    <div className="w-[110%] h-14 bg-teal-700 rounded-b-[32px] border-x-8 border-b-8 border-teal-900 shadow-2xl relative">
                                       <div className="absolute -top-2 inset-x-4 h-2 bg-black/10 rounded-full" />
                                    </div>

                                    {/* Round Wooden Coffee Table */}
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 translate-y-4">
                                       <div className="w-40 h-10 bg-amber-800 rounded-full border-b-[8px] border-amber-950 border-x-4 border-t-2 border-amber-700 shadow-2xl flex items-center justify-center">
                                          <div className="w-10 h-3 bg-white/5 rounded-full blur-sm" />
                                       </div>
                                       <div className="flex justify-around px-8 mt-[-2px]">
                                          <div className="w-2 h-6 bg-amber-950 rounded-full" />
                                          <div className="w-2 h-6 bg-amber-950 rounded-full" />
                                       </div>
                                    </div>
                                 </div>

                                 {/* Yellow Armchair */}
                                 <div className="flex flex-col items-center group mb-4">
                                    <div className="w-32 h-24 bg-yellow-500 rounded-t-[40px] border-x-8 border-t-8 border-yellow-700 shadow-xl relative z-10 transition-transform group-hover:scale-105">
                                       <div className="absolute inset-y-4 left-0 w-6 bg-yellow-600 rounded-r-lg" />
                                       <div className="absolute inset-y-4 right-0 w-6 bg-yellow-600 rounded-l-lg" />
                                    </div>
                                    <div className="w-36 h-12 bg-yellow-600 rounded-b-2xl border-x-8 border-b-8 border-yellow-800 shadow-2xl" />
                                    <div className="flex justify-around w-24 mt-[-4px]">
                                       <div className="w-1.5 h-3 bg-amber-950 rounded-full" />
                                       <div className="w-1.5 h-3 bg-amber-950 rounded-full" />
                                    </div>
                                 </div>
                              </div>

                              {/* Wooden Floor (Matching the texture in the image) */}
                              <div className="h-16 w-full bg-[#d97706]/20 border-t-4 border-amber-900/10 flex flex-col pointer-events-none relative overflow-hidden backdrop-blur-[2px]">
                                 {/* Floor Planks */}
                                 <div className="absolute inset-0 opacity-10" 
                                   style={{ 
                                     backgroundImage: 'linear-gradient(rgba(0,0,0,0.5) 2px, transparent 2px)', 
                                     backgroundSize: '100% 12px' 
                                   }} 
                                 />
                                 <div className="absolute inset-0 bg-gradient-to-t from-amber-950/20 to-transparent" />
                              </div>

                              <div className="absolute bottom-6 left-12 z-50 flex items-center gap-3">
                                 <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10">
                                    <Wind size={18} className="text-white/60" />
                                 </div>
                                 <div>
                                    <h4 className="text-[10px] font-black text-amber-950/40 uppercase tracking-[0.8em]">VINTAGE INTERIOR</h4>
                                    <div className="w-12 h-1 bg-amber-900/20 rounded-full mt-1" />
                                 </div>
                              </div>
                           </motion.div>
                         )}
                       </AnimatePresence>

                       {/* Wall/Door Frame */}
                       <div className="absolute inset-y-0 left-1/4 w-10 bg-slate-400 border-x-4 border-slate-500 z-30 shadow-[5px_0_15px_rgba(0,0,0,0.2)]" />
                       
                       {/* The Door (Set pointer-events-none to ensure it doesn't block magnet drag) */}
                       <motion.div 
                         initial={false}
                         animate={{ 
                           rotateY: isReedActive ? -110 : 0,
                           x: isReedActive ? 15 : 0,
                           z: isReedActive ? -60 : 1,
                         }}
                         transition={{ type: 'spring', damping: 22, stiffness: 70 }}
                         style={{ 
                           transformOrigin: 'left center', 
                           transformStyle: 'preserve-3d',
                           pointerEvents: isReedActive ? 'auto' : 'none' 
                         }}
                         className="absolute inset-y-0 left-1/4 w-80 bg-gradient-to-r from-amber-950 via-amber-900 to-amber-800 border-4 border-amber-950 rounded-r-[56px] z-40 shadow-[25px_0_50px_rgba(0,0,0,0.5)] cursor-default"
                       >
                         {/* Door Handle */}
                         <div className="absolute top-1/2 right-12 w-16 h-16 bg-yellow-500 rounded-full border-4 border-amber-950 shadow-[inset_0_4px_12px_rgba(0,0,0,0.6),0_15px_30px_rgba(0,0,0,0.4)] flex items-center justify-center">
                            <div className="w-2.5 h-7 bg-amber-950/50 rounded-full" />
                         </div>
                         
                         {/* Grain Pattern & Panels */}
                         <div className="absolute inset-0 opacity-15 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />
                         <div className="absolute inset-10 border-4 border-black/10 rounded-[40px] pointer-events-none shadow-inner" />
                         <div className="absolute top-20 left-12 text-[16px] font-[1000] text-white/5 uppercase tracking-[0.4em] vertical-text">SECURED</div>
                       </motion.div>

                       <AnimatePresence>
                         {!isReedActive && (
                           <motion.div 
                             initial={{ opacity: 0, scale: 0.9 }}
                             animate={{ opacity: 1, scale: 1 }}
                             exit={{ opacity: 0, scale: 0.5, y: -20 }}
                             className="absolute inset-0 z-50 pointer-events-none"
                           >
                             {/* The Reed Switch (Mounted on the Frame) */}
                             <div className="absolute left-[calc(25%)] top-1/3 -translate-x-1/2 flex flex-col items-center pointer-events-auto">
                                <div className="w-24 h-12 bg-white border-4 border-slate-400 rounded-xl flex items-center justify-center p-2 shadow-2xl relative">
                                   <div className="w-full h-full bg-sky-200/40 rounded-full border-2 border-sky-400 relative flex items-center justify-center overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]">
                                      <motion.div 
                                        animate={{ rotate: 12, x: 4 }}
                                        className="w-10 h-[6px] bg-gradient-to-r from-amber-600 to-amber-400 absolute left-0 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.3)] z-10" 
                                      />
                                      <motion.div 
                                        animate={{ rotate: -12, x: -4 }}
                                        className="w-10 h-[6px] bg-gradient-to-l from-amber-600 to-amber-400 absolute right-0 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.3)] z-10" 
                                      />
                                   </div>
                                   <div className="absolute -top-12 text-[16px] font-[1000] text-black uppercase tracking-tighter bg-yellow-400 px-4 py-1.5 rounded-xl border-4 border-black shadow-xl whitespace-nowrap z-50">REED SWITCH</div>
                                </div>
                                <svg className="absolute top-12 left-2 w-32 h-32 pointer-events-none overflow-visible">
                                   <path d="M0,0 Q20,50 60,60" stroke="#facc15" strokeWidth="4" fill="none" className="opacity-80" />
                                   <path d="M0,0 Q40,40 60,80" stroke="#3b82f6" strokeWidth="4" fill="none" className="opacity-80" />
                                </svg>
                             </div>

                             {/* The LED (Indicator) */}
                             <div className="absolute left-[calc(25%+120px)] top-1/4 flex flex-col items-center pointer-events-auto">
                                <div className="relative">
                                   <div className="w-8 h-8 rounded-full border-4 border-slate-700 bg-slate-600 z-10" />
                                   <div className="w-1 h-6 bg-slate-700 -mt-1 mx-auto" />
                                </div>
                                <span className="text-[10px] font-black text-slate-500 uppercase mt-2">ALARM LED</span>
                             </div>

                             {/* The MAGNET */}
                             <motion.div
                               drag
                               dragConstraints={containerRef}
                               dragElastic={0.05}
                               dragMomentum={false}
                               whileDrag={{ scale: 1.1 }}
                               initial={{ x: 0, y: 0 }}
                               onDrag={(e, info) => {
                                 const container = containerRef.current?.getBoundingClientRect();
                                 if (container) {
                                   // Viewport coordinates
                                   const magnetX = info.point.x;
                                   const magnetY = info.point.y;
                                   
                                   // Target: 25% from left, 33% from top of security scene
                                   const targetX = container.left + container.width * 0.25;
                                   const targetY = container.top + container.height * 0.33;
                                   
                                   const dist = Math.sqrt(Math.pow(magnetX - targetX, 2) + Math.pow(magnetY - targetY, 2));
                                   
                                   // Calculate proximity for visual feedback (even more sensitive)
                                   const prox = Math.max(0, 1 - dist / 500);
                                   setMagnetProx(prox);
 
                                   // Even more forgiving trigger (240px)
                                   if (dist < 240) {
                                     setIsReedActive(true);
                                     setMagnetProx(1);
                                   }
                                 }
                               }}
                               onDragEnd={() => setMagnetProx(0)}
                               className="absolute left-3/4 bottom-12 z-50 cursor-grab active:cursor-grabbing flex flex-col items-center pointer-events-auto"
                             >
                                <div className="relative group">
                                   {/* Status Tooltip */}
                                   <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-danger text-white px-5 py-2 rounded-full text-[12px] font-black shadow-xl border-2 border-white/20 transition-all">
                                      {magnetProx > 0.4 ? "REED SENSING..." : "FIND THE SWEET SPOT"}
                                   </div>
                                   
                                   {/* Magnetic Field Visualizer (Enhanced) */}
                                   <div className="absolute inset-x-[-150px] inset-y-[-150px] pointer-events-none flex items-center justify-center">
                                      <motion.div 
                                        animate={{ 
                                          scale: [1, 1.4 + magnetProx, 1],
                                          opacity: magnetProx * 0.7 + 0.1,
                                          borderWidth: [2, 4, 2]
                                        }}
                                        transition={{ duration: 0.8, repeat: Infinity }}
                                        className="w-40 h-40 border-primary/40 rounded-full"
                                      />
                                   </div>
 
                                   <motion.div 
                                     animate={{ 
                                       scale: 1 + magnetProx * 0.5,
                                       rotate: magnetProx * 10
                                     }}
                                     className="w-16 h-16 relative z-10"
                                   >
                                      <div className="absolute inset-0 border-[12px] border-danger rounded-[20px_20px_0_0] border-b-0 shadow-2xl" />
                                      <div className="absolute bottom-0 left-0 w-[12px] h-6 bg-slate-300 rounded-b-sm border-t border-black/10" />
                                      <div className="absolute bottom-0 right-0 w-[12px] h-6 bg-slate-300 rounded-b-sm border-t border-black/10" />
                                      
                                      {/* Target Contact Dot */}
                                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_20px_white] animate-pulse" />
                                   </motion.div>
                                </div>
                             </motion.div>
                           </motion.div>
                         )}
                       </AnimatePresence>
                    </div>

                    <div className="flex flex-col items-center gap-6">
                       <div className="bg-dark/5 p-6 rounded-[32px] text-center border-2 border-black/5 max-w-md">
                          <p className="font-black text-gray-500 uppercase tracking-widest text-[9px] leading-relaxed">
                            {isReedActive 
                              ? "Security System Disabled. The door is open! Click 'Reset System' to test the lock again." 
                              : "Mission: Magnetic Passkey. Use the magnet to trigger the Reed Switch. This will complete the circuit and unlock the vault door."}
                          </p>
                       </div>

                       <div className="flex justify-center gap-4">
                          <button 
                            onClick={() => {
                              setIsReedActive(false);
                              setMagnetProx(0);
                            }}
                            className="px-8 py-4 bg-white border-2 border-dark/10 hover:border-dark text-dark/60 hover:text-dark rounded-full font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 shadow-sm"
                          >
                            <RotateCcw size={14} /> Reset System
                          </button>
                          
                          {isReedActive && (
                            <motion.button 
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              onClick={onComplete}
                              className="px-12 py-4 bg-dark text-white rounded-full font-black text-[12px] uppercase tracking-widest transition-all button-pop flex items-center gap-3 shadow-xl shadow-dark/20"
                            >
                              Home Secured! <ArrowRight size={16} strokeWidth={3} />
                            </motion.button>
                          )}
                       </div>
                    </div>
                  </div>
                ) : moduleId === 'temperature-sensor' ? (
                  <div className="space-y-12 w-full flex flex-col items-center">
                    {/* Lab Environment */}
                    <div ref={containerRef} className="h-[450px] w-full bg-[#f1f5f9] rounded-[48px] border-4 border-black/10 relative overflow-hidden flex items-center justify-around shadow-2xl p-8">
                       <div className="absolute inset-0 bg-[radial-gradient(circle,#cbd5e1_1px,transparent_1px)] bg-[size:30px_30px] opacity-10" />
                       
                       {/* Target 1: ICE BUCKET */}
                       <div className="flex flex-col items-center scale-90 lg:scale-100">
                          <div className="relative w-44 h-48 bg-slate-200 rounded-b-3xl border-x-8 border-b-8 border-slate-300 shadow-xl flex flex-col justify-end overflow-hidden">
                             <div className="absolute inset-0 bg-blue-500/20" />
                             {/* Ice Cubes */}
                             <div className="absolute top-1/2 inset-x-2 flex flex-wrap justify-center gap-1">
                                {[...Array(8)].map((_, i) => (
                                  <div key={i} className="w-8 h-8 bg-white/80 rounded-md border border-sky-100 rotate-12 shadow-sm" />
                                ))}
                             </div>
                             {/* Water Level */}
                             <div className="h-2/3 bg-gradient-to-t from-sky-400 to-sky-300/80 w-full animate-wave" />
                          </div>
                          <span className="text-[12px] font-black text-slate-500 uppercase mt-4 tracking-widest">ICE WATER</span>
                          <div className="w-16 h-2 bg-slate-200 rounded-full mt-2" />
                       </div>

                       {/* Target 2: HUMAN CHARACTER */}
                       <div className="flex flex-col items-center scale-110">
                          <div className="relative w-48 h-64 flex flex-col items-center">
                             {/* Human Visual */}
                             <div className="relative">
                                {/* Hair */}
                                <div className="w-24 h-12 bg-dark rounded-t-full absolute -top-2 left-1/2 -translate-x-1/2" />
                                {/* Face */}
                                <div className="w-20 h-24 bg-[#ffdbac] rounded-[40px] border-4 border-black/10 shadow-lg relative z-10 flex flex-col items-center justify-center gap-4">
                                   <div className="flex gap-4">
                                      <div className="w-2.5 h-2.5 bg-dark rounded-full" />
                                      <div className="w-2.5 h-2.5 bg-dark rounded-full" />
                                   </div>
                                   <div className="w-6 h-3 border-b-2 border-dark/30 rounded-full" />
                                </div>
                                {/* Ears */}
                                <div className="absolute top-10 -left-2 w-6 h-6 bg-[#ffdbac] rounded-full" />
                                <div className="absolute top-10 -right-2 w-6 h-6 bg-[#ffdbac] rounded-full" />
                             </div>
                             {/* Body */}
                             <div className="w-32 h-40 bg-primary rounded-t-[50px] mt-[-10px] relative shadow-xl overflow-hidden">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-8 bg-[#ffdbac] rounded-b-full border-t border-black/5" />
                                {/* Detail pattern on shirt */}
                                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,white_25%,transparent_25%)] bg-[size:20px_20px]" />
                             </div>
                          </div>
                          <span className="text-[12px] font-black text-slate-500 uppercase mt-4 tracking-widest">HUMAN ANALOGY</span>
                          <div className="w-20 h-2 bg-slate-200 rounded-full mt-2" />
                       </div>

                       {/* Target 3: HEAT SOURCE (Electric Heater) */}
                       <div className="flex flex-col items-center scale-90 lg:scale-100">
                          <div className="relative w-44 h-48 bg-slate-800 rounded-2xl border-4 border-slate-700 shadow-2xl flex flex-col p-4 gap-3">
                             <div className="flex-1 grid grid-rows-3 gap-2">
                                {[...Array(3)].map((_, i) => (
                                  <motion.div 
                                    key={i}
                                    animate={{ 
                                      backgroundColor: ['#475569', '#ef4444', '#f97316', '#ef4444', '#475569'],
                                      boxShadow: ['none', '0 0 15px #ef4444', '0 0 20px #f97316', '0 0 15px #ef4444', 'none']
                                    }}
                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                                    className="w-full h-full rounded-full border border-black/20"
                                  />
                                ))}
                             </div>
                             <div className="h-6 flex justify-between px-4">
                                <div className="w-3 h-3 rounded-full bg-danger animate-pulse" />
                                <div className="flex gap-1">
                                   <div className="w-6 h-1.5 bg-slate-600 rounded-full" />
                                   <div className="w-6 h-1.5 bg-slate-600 rounded-full" />
                                </div>
                             </div>
                          </div>
                          <span className="text-[12px] font-black text-slate-500 uppercase mt-4 tracking-widest">ELECTRIC HEAT</span>
                          <div className="w-16 h-2 bg-slate-200 rounded-full mt-2" />
                       </div>

                       {/* DRAGGABLE SENSOR */}
                       <motion.div 
                         drag
                         dragConstraints={containerRef}
                         onDrag={(e, info) => {
                           const container = containerRef.current?.getBoundingClientRect();
                           if (!container) return;
                           
                           const sx = info.point.x;
                           const sy = info.point.y;
                           
                           // Target Areas
                           const targets = [
                             { id: 'ice', x: container.left + container.width * 0.2, y: container.top + container.height * 0.5, temp: -72.0 },
                             { id: 'human', x: container.left + container.width * 0.5, y: container.top + container.height * 0.5, temp: 29.0 },
                             { id: 'heat', x: container.left + container.width * 0.8, y: container.top + container.height * 0.5, temp: 800.0 }
                           ];

                           let found = false;
                           targets.forEach(t => {
                             const d = Math.sqrt(Math.pow(sx - t.x, 2) + Math.pow(sy - t.y, 2));
                             if (d < 120) {
                               setTempTarget(t.id);
                               setTempValue(prev => prev + (t.temp - prev) * 0.1);
                               found = true;
                               if (d < 60) setIsTempComplete(true);
                             }
                           });
                           
                           if (!found) {
                             setTempTarget(null);
                             setTempValue(prev => prev + (0 - prev) * 0.05); // Return to room temp (0)
                           }
                         }}
                         className="absolute bottom-10 right-10 z-50 cursor-grab active:cursor-grabbing flex flex-col items-center"
                       >
                          {/* Digital Thermometer Body */}
                          <div className="bg-slate-200 rounded-[32px] p-4 border-4 border-slate-400 shadow-2xl flex flex-col items-center gap-3 -translate-y-6">
                             {/* LCD Screen */}
                             <div className="w-40 h-20 bg-[#94a3b8]/40 rounded-xl border-4 border-slate-400 flex flex-col items-center justify-center shadow-inner relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                                <div className="text-4xl font-mono font-black text-slate-900 tabular-nums z-10 tracking-tight">
                                   {tempValue.toFixed(1)}°
                                </div>
                                <div className="absolute top-1 right-2 text-[8px] font-bold text-slate-600">CELSIUS</div>
                             </div>
                             
                             {/* Power Button */}
                             <div className="w-6 h-6 rounded-full bg-slate-400 shadow-inner border-2 border-slate-500 hover:bg-slate-300 transition-colors cursor-pointer" />
                          </div>

                          {/* The Probe Handle & Tip */}
                          <div className="relative flex flex-col items-center">
                             {/* Tapered Handle */}
                             <div className="w-9 h-12 bg-white rounded-t-xl border-x-[3px] border-slate-300 shadow-sm" />
                             {/* Metal Probe */}
                             <div className="w-2.5 h-24 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 border-x border-slate-500" />
                             {/* Sensitive Tip */}
                             <div className="w-2.5 h-4 bg-slate-700 rounded-b-full shadow-md" />
                          </div>
                       </motion.div>
                    </div>
                  </div>
                ) : moduleId === 'soil-moisture' ? (
                  <div className="space-y-12 w-full flex flex-col items-center">
                {/* Greenhouse Scene */}
                <div ref={containerRef} className="h-84 w-full bg-emerald-50 rounded-[48px] border-4 border-black/10 relative overflow-hidden flex items-end justify-center shadow-2xl p-12">
                   <div className="absolute inset-0 bg-[radial-gradient(circle,#10b981_1px,transparent_1px)] bg-[size:30px_30px] opacity-10" />
                   
                   {/* Water Pipes System */}
                   <div className="absolute top-0 inset-x-20 z-10">
                      <div className="w-full h-4 bg-slate-200 border-x-4 border-b-4 border-slate-300 rounded-b-xl relative">
                         {/* Pipe Spout over Left Pot */}
                         <div className="absolute left-1/4 top-4 w-4 h-8 bg-slate-300 rounded-b-lg border-2 border-slate-400">
                           {/* Water Flow Animation */}
                           <AnimatePresence>
                             {isWatering && [...Array(12)].map((_, i) => (
                               <motion.div
                                 key={i}
                                 initial={{ y: 0, opacity: 0 }}
                                 animate={{ 
                                   y: 120, 
                                   opacity: [0, 0.8, 0],
                                   scale: [0.5, 1, 0.5]
                                 }}
                                 transition={{ 
                                   duration: 0.8, 
                                   repeat: Infinity, 
                                   delay: i * 0.1 
                                 }}
                                 className="absolute left-1/2 -translate-x-1/2 w-2 h-4 bg-sky-400 rounded-full blur-[1px]"
                               />
                             ))}
                           </AnimatePresence>
                         </div>
                         {/* Pipe Spout over Right Pot */}
                         <div className="absolute right-1/4 top-4 w-4 h-4 bg-slate-300 rounded-b-lg border-2 border-slate-400" />
                      </div>
                   </div>

                   {/* Flower Pots */}
                   <div className="flex justify-around w-full relative z-0">
                      {/* Left Pot (Dry/Needs Water) */}
                      <div className="flex flex-col items-center">
                         <div className="relative">
                            {/* Dry Plant */}
                            <motion.div 
                              animate={{ 
                                filter: `grayscale(${100 - dryPlantHealth}%)`,
                                scale: 0.8 + (dryPlantHealth / 500),
                                rotate: dryPlantHealth < 50 ? [0, 2, -2, 0] : 0
                              }}
                              className="mb-2"
                            >
                               <div className={`w-16 h-24 relative flex items-center justify-center`}>
                                  <div className={`w-1 h-20 bg-emerald-800 rounded-full`} />
                                  <div className={`absolute top-2 w-10 h-6 bg-emerald-600 rounded-full rotate-45 -translate-x-4`} />
                                  <div className={`absolute top-8 w-10 h-6 bg-emerald-600 rounded-full -rotate-45 translate-x-4`} />
                                  <div className={`absolute top-14 w-8 h-4 bg-emerald-600 rounded-full rotate-12 -translate-x-3`} />
                               </div>
                            </motion.div>
                         </div>
                         <div className="w-24 h-20 bg-orange-700/80 rounded-b-3xl border-x-4 border-b-4 border-orange-900 rounded-t-lg relative shadow-xl">
                            <div className="absolute top-0 inset-x-0 h-4 bg-orange-900/40 rounded-t-sm" />
                            <div className="absolute inset-2 bg-stone-800 rounded-b-2xl border-2 border-stone-900 shadow-inner" />
                            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[8px] font-black text-white/20 uppercase">CRACKED SOIL</div>
                         </div>
                      </div>

                      {/* Right Pot (Healthy) */}
                      <div className="flex flex-col items-center">
                        <div className="relative">
                            {/* Healthy Plant */}
                            <div className="mb-2">
                               <div className="w-16 h-24 relative flex items-center justify-center">
                                  <div className="w-1.5 h-20 bg-emerald-900 rounded-full" />
                                  <div className="absolute top-2 w-12 h-8 bg-emerald-500 rounded-full rotate-45 -translate-x-5 shadow-sm" />
                                  <div className="absolute top-6 w-12 h-8 bg-emerald-500 rounded-full -rotate-45 translate-x-5 shadow-sm" />
                                  <div className="absolute top-12 w-10 h-6 bg-emerald-500 rounded-full rotate-12 -translate-x-4 shadow-sm" />
                                  {/* Flower */}
                                  <motion.div 
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="absolute -top-4 w-8 h-8 bg-pink-400 rounded-full border-4 border-white shadow-md flex items-center justify-center"
                                  >
                                     <div className="w-2 h-2 bg-yellow-300 rounded-full" />
                                  </motion.div>
                               </div>
                            </div>
                         </div>
                         <div className="w-24 h-20 bg-orange-700/80 rounded-b-3xl border-x-4 border-b-4 border-orange-900 rounded-t-lg relative shadow-xl">
                            <div className="absolute top-0 inset-x-0 h-4 bg-orange-900/40 rounded-t-sm" />
                            <div className="absolute inset-2 bg-stone-800 rounded-b-2xl border-2 border-stone-900 shadow-inner" />
                            <div className="absolute bottom-2 flex w-full justify-center opacity-30">
                               <div className="w-1.5 h-1.5 bg-sky-300 rounded-full mx-0.5" />
                               <div className="w-1.5 h-1.5 bg-sky-300 rounded-full mx-0.5" />
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* THE DRAGGABLE SENSOR */}
                   <motion.div
                     drag
                     dragConstraints={containerRef}
                     dragElastic={0.1}
                     initial={{ x: 0, y: -200 }}
                     onDrag={(e, info) => {
                       const container = containerRef.current?.getBoundingClientRect();
                       if (container) {
                         const sensorCenterX = info.point.x;
                         const sensorBottomY = info.point.y;
                         
                         const leftPot = container.left + container.width * 0.25;
                         const rightPot = container.left + container.width * 0.75;
                         const potTop = container.top + container.height * 0.5;

                         if (sensorBottomY > potTop) {
                            if (Math.abs(sensorCenterX - leftPot) < 80) setActiveSoilPot('dry');
                            else if (Math.abs(sensorCenterX - rightPot) < 80) setActiveSoilPot('green');
                            else setActiveSoilPot(null);
                         } else {
                            setActiveSoilPot(null);
                         }
                       }
                     }}
                     className="absolute z-50 cursor-grab active:cursor-grabbing flex flex-col items-center"
                   >
                     {/* Feedback Display over Sensor */}
                     <AnimatePresence>
                       {activeSoilPot && (
                         <motion.div 
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0 }}
                           className={`absolute -top-16 px-4 py-2 rounded-2xl border-4 font-black text-[10px] uppercase tracking-widest whitespace-nowrap shadow-xl ${
                             activeSoilPot === 'dry' ? 'bg-orange-500 border-orange-700 text-white animate-bounce' : 'bg-success border-success/80 text-white'
                           }`}
                         >
                           {activeSoilPot === 'dry' ? '⚠ NEED WATER' : '✔ HEALTHY'}
                         </motion.div>
                       )}
                     </AnimatePresence>

                     {/* Sensor Probe Hardware */}
                     <div className="flex flex-col items-center">
                        <div className="w-16 h-10 bg-slate-800 rounded-t-xl border-4 border-dark relative flex items-center justify-center">
                           <div className="w-8 h-4 bg-primary/20 rounded border border-primary flex items-center justify-around px-1 gap-1">
                              <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
                              <div className="w-1 h-2 bg-primary rounded-full animate-pulse delay-75" />
                              <div className="w-1 h-2 bg-primary rounded-full animate-pulse delay-150" />
                           </div>
                        </div>
                        {/* The Probes */}
                        <div className="flex gap-4">
                           <div className="w-1.5 h-20 bg-gradient-to-b from-slate-400 to-amber-600 rounded-b-full border-x-2 border-dark" />
                           <div className="w-1.5 h-20 bg-gradient-to-b from-slate-400 to-amber-600 rounded-b-full border-x-2 border-dark" />
                        </div>
                     </div>
                   </motion.div>
                </div>

                <div className="flex flex-col items-center gap-6">
                   <div className="bg-dark/5 p-6 rounded-[32px] text-center border-2 border-black/5 max-w-md">
                      <p className="font-black text-gray-500 uppercase tracking-widest text-[9px] leading-relaxed">
                        Automatic Irrigation: Drag the <span className="text-dark">Soil Moisture Sensor</span> into the dry flower pot. The system will detect low moisture and automatically activate the <span className="text-primary italic">water pump</span> until the plant is healthy.
                      </p>
                   </div>

                   <div className="flex justify-center gap-4">
                      <button 
                        onClick={() => { setDryPlantHealth(10); setActiveSoilPot(null); }}
                        className="px-8 py-4 bg-white border-2 border-dark/10 hover:border-dark text-dark/60 hover:text-dark rounded-full font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2"
                      >
                        <RotateCcw size={14} /> Reset Plants
                      </button>
                      
                      {isComplete && (
                        <motion.button 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          onClick={onComplete}
                          className="px-12 py-4 bg-dark text-white rounded-full font-black text-[12px] uppercase tracking-widest transition-all button-pop flex items-center gap-3 shadow-xl shadow-dark/20"
                        >
                          Garden Mastered! <ArrowRight size={16} strokeWidth={3} />
                        </motion.button>
                      )}
                   </div>
                </div>
              </div>
            ) : moduleId === 'tilt' ? (
              <div className="space-y-8 w-full">
                {/* Robot Simulation Area */}
                <div className="h-64 w-full bg-gray-50 rounded-[40px] border-4 border-black/5 relative overflow-hidden flex items-center justify-center shadow-inner">
                  <div className="absolute bottom-10 w-full h-2 bg-gray-200" /> {/* Ground line */}
                  
                  <motion.div 
                    animate={{ 
                      x: tiltX,
                      rotate: tiltX * 0.1
                    }}
                    transition={{ type: 'spring', stiffness: 60, damping: 15 }}
                    className="relative"
                  >
                    {/* Humanoid Robot Body */}
                    <div className="w-20 h-24 bg-primary rounded-[20px] border-4 border-dark relative flex items-center justify-center shadow-lg">
                      {/* Eyes/Visor */}
                      <div className="absolute top-5 w-14 h-4 bg-dark rounded-full overflow-hidden p-1 flex justify-around">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                      </div>
                      
                      {/* Antenna with LED logic */}
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-1 h-6 bg-dark">
                        <motion.div 
                          animate={{ 
                            backgroundColor: Math.abs(tiltX) > 0 ? '#ef4444' : '#4b5563',
                            opacity: Math.abs(tiltX) > 0 ? 1 : 0.3,
                            boxShadow: Math.abs(tiltX) > 0 ? '0 0 20px #ef4444' : 'none'
                          }}
                          className="absolute -top-3 -left-1.5 w-4 h-4 rounded-full border-2 border-dark"
                        />
                      </div>

                      {/* Arms */}
                      <motion.div 
                        animate={{ rotate: tiltX < 0 ? -40 : 0 }}
                        className="absolute -left-6 top-8 w-6 h-12 bg-secondary rounded-full border-4 border-dark origin-top" 
                      />
                      <motion.div 
                        animate={{ rotate: tiltX > 0 ? 40 : 0 }}
                        className="absolute -right-6 top-8 w-6 h-12 bg-secondary rounded-full border-4 border-dark origin-top" 
                      />
                    </div>
                    
                    {/* Legs */}
                    <div className="flex justify-around -mt-1 px-2">
                      <div className="w-6 h-6 bg-dark rounded-b-lg" />
                      <div className="w-6 h-6 bg-dark rounded-b-lg" />
                    </div>
                  </motion.div>

                  {/* Environment decorations */}
                  <div className="absolute bottom-12 left-20 w-4 h-8 bg-green-200 rounded-full" />
                  <div className="absolute bottom-12 right-20 w-6 h-4 bg-gray-200 rounded-full" />
                </div>

                {/* Tilt Controls */}
                <div className="flex justify-center gap-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9, rotate: -5 }}
                    onMouseDown={() => { setTiltX(-150); setScore(100); }}
                    onMouseUp={() => setTiltX(0)}
                    className="p-8 bg-white border-4 border-gray-100 rounded-[32px] hard-shadow-dark flex flex-col items-center gap-2 hover:border-primary transition-all group"
                  >
                    <ArrowLeft size={32} className="group-hover:text-primary transition-colors" />
                    <span className="font-black uppercase tracking-widest text-[10px]">Tilt Left</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9, rotate: 5 }}
                    onMouseDown={() => { setTiltX(150); setScore(100); }}
                    onMouseUp={() => setTiltX(0)}
                    className="p-8 bg-white border-4 border-gray-100 rounded-[32px] hard-shadow-dark flex flex-col items-center gap-2 hover:border-primary transition-all group"
                  >
                    <ArrowRight size={32} className="group-hover:text-primary transition-colors" />
                    <span className="font-black uppercase tracking-widest text-[10px]">Tilt Right</span>
                  </motion.button>
                </div>

                <div className="pt-8 flex justify-center gap-4">
                  <button 
                    onClick={() => setScore(0)}
                    className="px-8 py-3 bg-white border-2 border-dark/10 hover:border-dark text-dark/60 hover:text-dark rounded-full font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2"
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                  <button 
                    onClick={onComplete}
                    className="px-10 py-3 bg-dark text-white rounded-full font-black text-[10px] uppercase tracking-widest transition-all button-pop flex items-center gap-2"
                  >
                    Next Step <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ) : moduleId === 'ultrasonic' ? (
              <div className="space-y-12 w-full">
                {/* Simulation Header */}
                <div className="flex justify-between items-center bg-dark/5 p-4 rounded-3xl border-2 border-black/5">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
                    <span className="font-black text-xs uppercase tracking-widest">Active Sonar</span>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-primary tabular-nums">{(distance / 5).toFixed(1)} cm</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Measured Distance</div>
                  </div>
                </div>

                {/* Ultrasonic Simulation Area */}
                <div className="h-64 w-full bg-gray-50 rounded-[40px] border-4 border-black/5 relative overflow-hidden flex items-center shadow-inner px-12">
                  {/* The Ultrasonic Sensor (Stationary) */}
                  <div className="relative z-10">
                    <div className="w-16 h-28 bg-gray-300 rounded-xl border-4 border-dark flex flex-col items-center justify-around p-2">
                      <div className="w-10 h-10 bg-dark rounded-full flex items-center justify-center border-2 border-gray-400">
                        <div className="w-6 h-6 bg-gray-700 rounded-full border-2 border-gray-600" />
                      </div>
                      <div className="w-10 h-10 bg-dark rounded-full flex items-center justify-center border-2 border-gray-400">
                        <div className="w-6 h-6 bg-gray-700 rounded-full border-2 border-gray-600" />
                      </div>
                    </div>
                    {/* Visual Sound Waves */}
                    <motion.div 
                      animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
                      className="absolute left-16 top-1/2 -translate-y-1/2 w-20 h-20 border-r-4 border-primary rounded-full"
                    />
                  </div>

                  {/* The Retro Red Robot obstacle (Draggable) */}
                  <motion.div 
                    drag="x"
                    dragConstraints={{ left: 0, right: 600 }}
                    dragElastic={0}
                    onDrag={(e, info) => {
                      setDistance(250 + info.offset.x);
                    }}
                    initial={{ x: 250 }}
                    style={{ x: distance }}
                    className="absolute cursor-grab active:cursor-grabbing left-20 z-20"
                  >
                    <div className="relative group flex flex-col items-center">
                      {/* Interactive Drag Me tooltip */}
                      <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-dark text-white px-3.5 py-1.5 rounded-full text-[10px] font-black whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg tracking-wider uppercase">
                        🤖 Move Me!
                      </div>

                      {/* Retro 3D Red Robot SVG Rendering */}
                      <svg 
                        width="110" 
                        height="165" 
                        viewBox="0 0 100 150" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="drop-shadow-[0_16px_28px_rgba(0,0,0,0.35)] select-none pointer-events-none filter saturate-110"
                      >
                        <defs>
                          {/* Candy Red Metallic Gradients */}
                          <linearGradient id="candyRed" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#EF4444" />
                            <stop offset="40%" stopColor="#DC2626" />
                            <stop offset="100%" stopColor="#7F1D1D" />
                          </linearGradient>
                          <linearGradient id="candyRedHighlight" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#F87171" stopOpacity="0.8" />
                            <stop offset="50%" stopColor="#FCA5A5" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
                          </linearGradient>
                          <linearGradient id="candyRedBright" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#FCA5A5" />
                            <stop offset="100%" stopColor="#B91C1C" />
                          </linearGradient>

                          {/* Chrome Silver Gradient */}
                          <linearGradient id="chromeSilver" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#F9FAFB" />
                            <stop offset="40%" stopColor="#D1D5DB" />
                            <stop offset="100%" stopColor="#4B5563" />
                          </linearGradient>

                          {/* Deep Industrial Metal Gradient */}
                          <linearGradient id="deepMetal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#4B5563" />
                            <stop offset="100%" stopColor="#111827" />
                          </linearGradient>

                          {/* Glowing Electric Blue Radial Gradient */}
                          <radialGradient id="electricBlue" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#93C5FD" />
                            <stop offset="50%" stopColor="#3B82F6" />
                            <stop offset="85%" stopColor="#1D4ED8" />
                            <stop offset="100%" stopColor="#172554" />
                          </radialGradient>

                          {/* Glossy Glass Dome Reflections */}
                          <linearGradient id="lensGlass" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
                            <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                          </linearGradient>
                        </defs>

                        {/* 1. FEET & SOLES */}
                        {/* Left Foot */}
                        <rect x="23" y="141" width="16" height="4" rx="1.5" fill="#1E293B" />
                        <path d="M25,134 C25,131 37,131 37,134 L37,141 L25,141 Z" fill="url(#candyRed)" stroke="#7F1D1D" strokeWidth="0.5" />
                        <rect x="27" y="138" width="8" height="2" fill="#E2E8F0" opacity="0.3" />

                        {/* Right Foot */}
                        <rect x="61" y="141" width="16" height="4" rx="1.5" fill="#1E293B" />
                        <path d="M63,134 C63,131 75,131 75,134 L75,141 L63,141 Z" fill="url(#candyRed)" stroke="#7F1D1D" strokeWidth="0.5" />
                        <rect x="65" y="138" width="8" height="2" fill="#E2E8F0" opacity="0.3" />

                        {/* 2. LOWER LEGS (SHINS) */}
                        {/* Left Shin Joint & Rod */}
                        <rect x="30" y="116" width="4" height="19" rx="1" fill="url(#chromeSilver)" />
                        <rect x="29" y="120" width="6" height="2" rx="0.5" fill="#374151" />
                        <rect x="29" y="126" width="6" height="2" rx="0.5" fill="#374151" />

                        {/* Right Shin Joint & Rod */}
                        <rect x="66" y="116" width="4" height="19" rx="1" fill="url(#chromeSilver)" />
                        <rect x="65" y="120" width="6" height="2" rx="0.5" fill="#374151" />
                        <rect x="65" y="126" width="6" height="2" rx="0.5" fill="#374151" />

                        {/* 3. KNEE CAPS */}
                        {/* Left Knee Cap */}
                        <rect x="26" y="105" width="12" height="12" rx="2.5" fill="url(#candyRed)" stroke="#7F1D1D" strokeWidth="0.5" />
                        <circle cx="32" cy="111" r="2" fill="url(#chromeSilver)" />
                        <circle cx="32" cy="111" r="0.75" fill="#111827" />

                        {/* Right Knee Cap */}
                        <rect x="62" y="105" width="12" height="12" rx="2.5" fill="url(#candyRed)" stroke="#7F1D1D" strokeWidth="0.5" />
                        <circle cx="68" cy="111" r="2" fill="url(#chromeSilver)" />
                        <circle cx="68" cy="111" r="0.75" fill="#111827" />

                        {/* 4. DRAG THIGHS */}
                        <rect x="30" y="93" width="4" height="13" rx="1" fill="url(#chromeSilver)" />
                        <rect x="66" y="93" width="4" height="13" rx="1" fill="url(#chromeSilver)" />

                        {/* 5. HIPS BAR */}
                        <rect x="26" y="87" width="48" height="8" rx="4" fill="url(#deepMetal)" />
                        <circle cx="50" cy="91" r="3" fill="url(#chromeSilver)" />

                        {/* 6. MAIN RETRO DETAILED TORSO */}
                        <g>
                          <rect x="27" y="47" width="46" height="42" rx="7" fill="url(#candyRed)" stroke="#7F1D1D" strokeWidth="0.75" />
                          {/* Torso Gloss Highlight */}
                          <path d="M30,50 C30,48 70,48 70,50 L68,68 C68,72 32,72 32,68 Z" fill="url(#candyRedHighlight)" />
                          
                          {/* Technical grid/boiler plates in torso */}
                          <rect x="33" y="53" width="34" height="3" rx="1" fill="#1F2937" opacity="0.4" />
                          <circle cx="36" cy="54.5" r="1" fill="#4B5563" />
                          <circle cx="64" cy="54.5" r="1" fill="#4B5563" />

                          {/* Center Chest Blue Dial Indicator */}
                          <circle cx="50" cy="69" r="9" fill="url(#deepMetal)" stroke="url(#chromeSilver)" strokeWidth="1" />
                          {/* Pulsing Core Power Ring */}
                          <motion.circle 
                            cx="50" 
                            cy="69" 
                            r="6.5" 
                            fill="url(#electricBlue)"
                            animate={{ opacity: [0.75, 1, 0.75], scale: [0.95, 1.05, 0.95] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          />
                          <circle cx="50" cy="69" r="6.5" fill="url(#lensGlass)" />
                          <circle cx="47.5" cy="66.5" r="2" fill="#FFFFFF" opacity="0.9" />
                        </g>

                        {/* 7. SHOULDER & INTERACTIVE MECHANICAL ARMS */}
                        {/* Left arm (forward-reaching) */}
                        <circle cx="23" cy="55" r="5" fill="url(#chromeSilver)" />
                        <g>
                          <rect x="14" y="54" width="8" height="15" rx="3.5" fill="url(#candyRed)" stroke="#7F1D1D" strokeWidth="0.5" transform="rotate(12, 18, 61)" />
                          <circle cx="15" cy="68" r="3.5" fill="url(#deepMetal)" />
                          <rect x="7" y="67" width="7" height="17" rx="3" fill="url(#candyRed)" stroke="#7F1D1D" strokeWidth="0.5" transform="rotate(-8, 10.5, 75.5)" />
                          
                          {/* High-Fidelity Claws left */}
                          <circle cx="9" cy="85" r="3.5" fill="url(#chromeSilver)" />
                          {/* Curved index claw */}
                          <path d="M5,86 C3,86 1,90 2,93 C3,95 6,93 5,90" stroke="url(#chromeSilver)" strokeWidth="1.5" strokeLinecap="round" />
                          {/* Curved middle claw */}
                          <path d="M9,88 C8,90 7,94 9,96 C11,97 12,94 11,91" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
                          {/* Curved thumb claw */}
                          <path d="M13,85 C15,86 17,89 15,92 C14,94 12,92 12,89" stroke="url(#chromeSilver)" strokeWidth="1.5" strokeLinecap="round" />
                        </g>

                        {/* Right arm (reaching forward-right) */}
                        <circle cx="77" cy="55" r="5" fill="url(#chromeSilver)" />
                        <g>
                          <rect x="78" y="54" width="8" height="15" rx="3.5" fill="url(#candyRed)" stroke="#7F1D1D" strokeWidth="0.5" transform="rotate(-12, 82, 61)" />
                          <circle cx="85" cy="68" r="3.5" fill="url(#deepMetal)" />
                          <rect x="86" y="67" width="7" height="17" rx="3" fill="url(#candyRed)" stroke="#7F1D1D" strokeWidth="0.5" transform="rotate(8, 89.5, 75.5)" />
                          
                          {/* High-Fidelity Claws right */}
                          <circle cx="91" cy="85" r="3.5" fill="url(#chromeSilver)" />
                          {/* Curved index claw */}
                          <path d="M87,85 C85,86 83,89 85,92 C86,94 88,92 88,89" stroke="url(#chromeSilver)" strokeWidth="1.5" strokeLinecap="round" />
                          {/* Curved middle claw */}
                          <path d="M91,88 C92,90 93,94 91,96 C89,97 88,94 89,91" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
                          {/* Curved thumb claw */}
                          <path d="M95,86 C97,86 99,90 98,93 C97,95 94,93 95,90" stroke="url(#chromeSilver)" strokeWidth="1.5" strokeLinecap="round" />
                        </g>

                        {/* 8. NECK SPRING SPLICE */}
                        <rect x="41" y="41" width="18" height="3" rx="1" fill="url(#chromeSilver)" />
                        <rect x="43" y="44" width="14" height="4" rx="0.5" fill="url(#deepMetal)" />

                        {/* 9. HEAD MOUNTED WITH ANIMATED GLOW EYE GOGGLES */}
                        {/* Dynamic springy animated head element using Framer Motion inside SVG */}
                        <motion.g 
                          animate={{ y: [0, -2, 0], rotate: [-0.5, 0.5, -0.5] }}
                          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                        >
                          {/* Head Base Plate */}
                          <path d="M33,14 C33,8 67,8 67,14 L67,39 C67,41 33,41 33,39 Z" fill="url(#candyRed)" stroke="#7F1D1D" strokeWidth="0.75" />
                          {/* Head shine */}
                          <path d="M36,13 C36,10 64,10 64,13" stroke="#FCA5A5" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
                          
                          {/* Left bolt ear */}
                          <rect x="28" y="22" width="5" height="3" fill="url(#chromeSilver)" />
                          <polygon points="24,20 28,22 28,25 24,27" fill="url(#chromeSilver)" />
                          <circle cx="23" cy="23.5" r="1.5" fill="#4B5563" />

                          {/* Right bolt ear */}
                          <rect x="67" y="22" width="5" height="3" fill="url(#chromeSilver)" />
                          <polygon points="76,20 72,22 72,25 76,27" fill="url(#chromeSilver)" />
                          <circle cx="77" cy="23.5" r="1.5" fill="#4B5563" />

                          {/* Left Goggle Lens (Metallic rim + glass reflections + deep cyan/blue glow) */}
                          <circle cx="42.5" cy="22" r="7.5" fill="#111827" stroke="url(#chromeSilver)" strokeWidth="1.2" />
                          <motion.circle 
                            cx="42.5" 
                            cy="22" 
                            r="5.5" 
                            fill="url(#electricBlue)"
                            animate={{ opacity: [0.8, 1, 0.8] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          />
                          <circle cx="42.5" cy="22" r="5.5" fill="url(#lensGlass)" />
                          <circle cx="40" cy="19.5" r="1.5" fill="#FFFFFF" opacity="0.9" />

                          {/* Right Goggle Lens */}
                          <circle cx="57.5" cy="22" r="7.5" fill="#111827" stroke="url(#chromeSilver)" strokeWidth="1.2" />
                          <motion.circle 
                            cx="57.5" 
                            cy="22" 
                            r="5.5" 
                            fill="url(#electricBlue)"
                            animate={{ opacity: [0.8, 1, 0.8] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          />
                          <circle cx="57.5" cy="22" r="5.5" fill="url(#lensGlass)" />
                          <circle cx="55" cy="19.5" r="1.5" fill="#FFFFFF" opacity="0.9" />

                          {/* Mechanical horizontal mouth grille */}
                          <rect x="41" y="32.5" width="18" height="4" rx="1.5" fill="#0F172A" />
                          <line x1="43" y1="34" x2="57" y2="34" stroke="url(#chromeSilver)" strokeWidth="0.5" />
                          <line x1="43" y1="35.5" x2="57" y2="35.5" stroke="url(#chromeSilver)" strokeWidth="0.5" />
                        </motion.g>
                      </svg>
                    </div>
                  </motion.div>

                  {/* Ground line */}
                  <div className="absolute bottom-6 left-0 w-full h-1 bg-gray-200" />
                </div>

                <div className="bg-dark/5 p-6 rounded-3xl border-2 border-black/5 text-left space-y-2">
                  <h4 className="font-black text-xs uppercase tracking-widest text-dark flex items-center gap-2">
                     <Info size={14} className="text-primary" /> Sonar Logic
                  </h4>
                  <p className="text-[10px] font-bold text-gray-500 leading-relaxed uppercase tracking-tight">
                    Ultrasonic waves travel at the speed of sound. By timing how long the "ping" takes to bounce back, we can precisely calculate the distance.
                  </p>
                </div>

                <div className="flex justify-center gap-4">
                  <button 
                    onClick={() => { setDistance(250); setScore(0); }}
                    className="px-8 py-3 bg-white border-2 border-dark/10 hover:border-dark text-dark/60 hover:text-dark rounded-full font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2"
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                  {isComplete && (
                    <motion.button 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      onClick={onComplete}
                      className="px-10 py-3 bg-dark text-white rounded-full font-black text-[10px] uppercase tracking-widest transition-all button-pop flex items-center gap-2 shadow-xl shadow-dark/20"
                    >
                      Mission Complete <ArrowRight size={14} />
                    </motion.button>
                  )}
                </div>
              </div>
            ) : moduleId === 'joystick' ? (
              <div className="space-y-8 w-full">
                {/* Car Simulation Field */}
                <div className="h-72 w-full bg-gray-50 rounded-[40px] border-4 border-black/5 relative overflow-hidden shadow-inner flex items-center justify-center">
                  <div className="absolute inset-0 opacity-10 bg-[grid-line] bg-[size:40px_40px] pointer-events-none" 
                       style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)' }} />
                  
                  {/* Robot Car */}
                  <motion.div 
                    animate={{ 
                      x: carPos.x, 
                      y: carPos.y,
                      rotate: joystickOffset.x * 0.5
                    }}
                    transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                    className="relative w-24 h-32"
                  >
                    {/* Car Body */}
                    <div className="w-full h-full bg-primary rounded-2xl border-4 border-dark relative shadow-xl">
                      {/* Top Window */}
                      <div className="absolute top-4 left-2 right-2 h-10 bg-dark/20 rounded-lg border-2 border-dark/20" />
                      {/* Headlights */}
                      <div className="absolute bottom-2 left-2 w-4 h-2 bg-yellow-300 rounded-full shadow-[0_0_10px_#fef08a]" />
                      <div className="absolute bottom-2 right-2 w-4 h-2 bg-yellow-300 rounded-full shadow-[0_0_10px_#fef08a]" />
                    </div>
                    {/* Wheels */}
                    <div className="absolute -left-3 top-4 w-4 h-10 bg-dark rounded-lg" />
                    <div className="absolute -right-3 top-4 w-4 h-10 bg-dark rounded-lg" />
                    <div className="absolute -left-3 bottom-4 w-4 h-10 bg-dark rounded-lg" />
                    <div className="absolute -right-3 bottom-4 w-4 h-10 bg-dark rounded-lg" />
                  </motion.div>
                </div>

                {/* Joystick Control Section */}
                <div className="flex flex-col items-center gap-6">
                  <div className="relative w-40 h-40 bg-gray-200 rounded-full border-4 border-dark/10 flex items-center justify-center shadow-inner">
                    <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                      <div className="w-full h-[2px] bg-dark" />
                      <div className="w-[2px] h-full bg-dark" />
                    </div>
                    
                    {/* The Knob */}
                    <motion.div 
                      drag
                      dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
                      dragElastic={0.1}
                      onDrag={(e, info) => {
                        const x = info.offset.x;
                        const y = info.offset.y;
                        setJoystickOffset({ x, y });
                        setCarPos(prev => ({
                          x: Math.max(-150, Math.min(150, prev.x + x * 0.1)),
                          y: Math.max(-100, Math.min(100, prev.y + y * 0.1))
                        }));
                      }}
                      onDragEnd={() => setJoystickOffset({ x: 0, y: 0 })}
                      className="w-16 h-16 bg-dark rounded-full cursor-grab active:cursor-grabbing border-4 border-gray-600 shadow-2xl flex items-center justify-center relative z-20"
                    >
                      <div className="w-8 h-8 rounded-full border-2 border-white/20" />
                    </motion.div>
                  </div>

                  <div className="text-center">
                    <div className="font-black text-[10px] uppercase tracking-widest text-dark/40 mb-1">Analog Input View</div>
                    <div className="flex gap-4 font-mono text-xs font-black bg-dark/5 px-4 py-2 rounded-full text-primary">
                      <span>X: {Math.round(joystickOffset.x + 512)}</span>
                      <span>Y: {Math.round(joystickOffset.y + 512)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <button 
                    onClick={() => { setCarPos({ x: 0, y: 0 }); setJoystickOffset({ x: 0, y: 0 }); }}
                    className="px-8 py-3 bg-white border-2 border-dark/10 hover:border-dark text-dark/60 hover:text-dark rounded-full font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2"
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                  {isComplete && (
                    <motion.button 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      onClick={onComplete}
                      className="px-10 py-3 bg-dark text-white rounded-full font-black text-[10px] uppercase tracking-widest transition-all button-pop flex items-center gap-2 shadow-xl shadow-dark/20"
                    >
                      Drive Complete <ArrowRight size={14} />
                    </motion.button>
                  )}
                </div>
              </div>
            ) : moduleId === 'rotary-encoder' ? (
              <div className="space-y-6 w-full flex flex-col items-center">
                {/* 3D Perspective LED Lab Screen */}
                <div className="relative w-full max-w-[420px] h-[360px] bg-slate-950 rounded-[36px] border-4 border-black/15 shadow-2xl overflow-hidden flex flex-col justify-between p-6">
                  {/* Grid Lines Overlay */}
                  <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                  {/* Header HUD panel */}
                  <div className="relative z-10 flex justify-between items-center pointer-events-auto">
                    <div className="bg-slate-900/90 backdrop-blur-md text-white/90 px-3.5 py-2 rounded-2xl border border-white/10 flex flex-col gap-0.5 shadow-xl">
                      <span className="text-white/40 text-[7px] uppercase tracking-widest font-black">PWM Duty Cycle</span>
                      <span className="font-mono text-xs font-black text-cyan-400">{Math.round(fanSpeed)}%</span>
                    </div>

                    <div className="bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/10 flex flex-col items-end gap-0.5 shadow-xl">
                      <span className="text-white/40 text-[7px] uppercase tracking-widest font-black text-right">LED Color</span>
                      <span className={`text-xs font-black uppercase tracking-tight ${
                        ledColor === 'red' ? 'text-red-400' :
                        ledColor === 'green' ? 'text-green-400' :
                        ledColor === 'blue' ? 'text-blue-400' :
                        ledColor === 'purple' ? 'text-purple-400' :
                        ledColor === 'cyan' ? 'text-cyan-400' :
                        ledColor === 'yellow' ? 'text-yellow-400' : 'text-slate-100'
                      }`}>{ledColor}</span>
                    </div>
                  </div>

                  {/* 3D Viewport with 3D Depth Perspective */}
                  <div className="absolute inset-x-0 top-14 bottom-16 overflow-visible flex flex-col items-center justify-center" style={{ perspective: '800px' }}>
                    
                    {/* Glowing Aura in 3D Space */}
                    <div 
                      className="absolute w-64 h-64 rounded-full blur-[48px] transition-all duration-150 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${
                          ledColor === 'red' ? 'rgba(239, 68, 68, ' + (fanSpeed / 100) * 0.95 + ')' :
                          ledColor === 'green' ? 'rgba(34, 197, 94, ' + (fanSpeed / 100) * 0.95 + ')' :
                          ledColor === 'blue' ? 'rgba(59, 130, 246, ' + (fanSpeed / 100) * 0.95 + ')' :
                          ledColor === 'purple' ? 'rgba(168, 85, 247, ' + (fanSpeed / 100) * 0.95 + ')' :
                          ledColor === 'cyan' ? 'rgba(6, 182, 212, ' + (fanSpeed / 100) * 0.95 + ')' :
                          ledColor === 'yellow' ? 'rgba(234, 179, 8, ' + (fanSpeed / 100) * 0.95 + ')' :
                          'rgba(248, 250, 252, ' + (fanSpeed / 100) * 0.95 + ')'
                        } 0%, transparent 70%)`,
                        transform: `translateY(-20px) scale(${1 + (fanSpeed / 180)})`,
                        boxShadow: fanSpeed > 0 ? `0 0 60px ${Math.round(fanSpeed / 4.5)}px ${
                          ledColor === 'red' ? 'rgba(239, 68, 68, 0.3)' :
                          ledColor === 'green' ? 'rgba(34, 197, 94, 0.3)' :
                          ledColor === 'blue' ? 'rgba(59, 130, 246, 0.3)' :
                          ledColor === 'purple' ? 'rgba(168, 85, 247, 0.3)' :
                          ledColor === 'cyan' ? 'rgba(6, 182, 212, 0.3)' :
                          ledColor === 'yellow' ? 'rgba(234, 179, 8, 0.3)' :
                          'rgba(248, 250, 252, 0.3)'
                        }` : 'none'
                      }}
                    />

                    {/* Highly-styled 3D Breadboard or PCB Platform */}
                    <div 
                      className="absolute bottom-[-24px] w-[260px] h-[80px] bg-slate-800 rounded-xl border-t-2 border-slate-700 shadow-2xl flex flex-col items-center justify-center animate-pulse"
                      style={{
                        transform: 'rotateX(55deg) translateZ(0px)',
                        boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
                        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
                      }}
                    >
                      {/* Breadboard Hole Rows / Terminal Strips */}
                      <div className="flex flex-col gap-1 w-full px-4">
                        <div className="flex justify-between text-[7px] font-mono text-white/30 tracking-widest px-1 uppercase">
                          <span>D13</span><span>Gnd</span><span>Red</span><span>Grn</span><span>Blu</span>
                        </div>
                        <div className="flex justify-around bg-slate-900/90 py-1.5 rounded-md border border-white/5">
                          {[...Array(8)].map((_, i) => (
                            <div key={i} className="flex flex-col gap-1 items-center">
                              <div className="w-1.5 h-1.5 rounded-sm bg-black border border-white/10" />
                              <div className="w-1.5 h-1.5 rounded-sm bg-black border border-white/10" />
                            </div>
                          ))}
                        </div>
                        <div className="text-[6px] font-mono text-[#06b6d4]/70 uppercase tracking-widest text-center">
                          RGB LED MODULE
                        </div>
                      </div>
                    </div>

                    {/* Interactive 3D physical-like RGB LED component */}
                    <motion.div 
                      initial={{ y: 0 }}
                      animate={fanSpeed > 0 ? {
                        y: [0, -1, 0, -0.5, 0],
                        scale: [1, 1.01, 1, 1.005, 1]
                      } : {}}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="relative z-10 flex flex-col items-center bottom-6"
                    >
                      {/* Epoxy Translucent Dome Lens using SVG for incredible detail */}
                      <svg viewBox="0 0 100 160" className="w-[84px] h-[134px] overflow-visible drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)]">
                        {/* Metal legs insertion into PCB */}
                        <g opacity="0.85">
                          {/* Cathode/Anode Pins */}
                          <line x1="32" y1="80" x2="32" y2="155" stroke="#94a3b8" strokeWidth="2.5" />
                          <line x1="44" y1="80" x2="44" y2="155" stroke="#64748b" strokeWidth="2.5" />
                          <line x1="56" y1="80" x2="56" y2="155" stroke="#94a3b8" strokeWidth="2.5" />
                          <line x1="68" y1="80" x2="68" y2="155" stroke="#64748b" strokeWidth="2.5" />
                        </g>

                        {/* Flat support rim base of the LED (Epoxy Base flange) */}
                        <path d="M 18,80 L 82,80 L 82,75 L 18,75 Z" fill="rgba(255, 255, 255, 0.22)" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.8" />

                        {/* Clear Translucent Epoxy Capsule Dome */}
                        <path 
                          d="M 22,75 L 22,40 A 28,28 0 0,1 78,40 L 78,75 Z" 
                          fill="url(#ledBodyGrad)" 
                          stroke="rgba(255,255,255,0.45)" 
                          strokeWidth="1.2" 
                        />

                        {/* Highlight Reflection line */}
                        <path d="M 27,65 L 27,42 A 23,23 0 0,1 42,22" fill="none" stroke="rgba(255, 255, 255, 0.55)" strokeWidth="2" strokeLinecap="round" />

                        {/* Internal Semiconductor Die Structure */}
                        <g transform="translate(10, 5)">
                          {/* Anode bar, Cathode cups */}
                          <path d="M 40,70 L 40,50 L 30,45" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />
                          <path d="M 30,45 L 25,48 L 35,48 Z" fill="#94a3b8" />

                          {/* 3 tiny emitter sub-dies (RGB Chips) along the frame */}
                          {/* Red Die */}
                          <circle cx="28" cy="46" r="1.8" fill={ledColor === 'red' || ledColor === 'purple' || ledColor === 'yellow' || ledColor === 'white' ? '#ef4444' : '#571c1c'} />
                          {/* Green Die */}
                          <circle cx="30.5" cy="46" r="1.8" fill={ledColor === 'green' || ledColor === 'cyan' || ledColor === 'yellow' || ledColor === 'white' ? '#22c55e' : '#14532d'} />
                          {/* Blue Die */}
                          <circle cx="33" cy="46" r="1.8" fill={ledColor === 'blue' || ledColor === 'purple' || ledColor === 'cyan' || ledColor === 'white' ? '#3b82f6' : '#1e3a8a'} />

                          {/* Micro gold hair wires going up */}
                          <path d="M 28,46 Q 30,35 40,50" stroke="#fef08a" strokeWidth="0.4" fill="none" opacity="0.8" />
                          <path d="M 30.5,46 Q 33,35 40,50" stroke="#fef08a" strokeWidth="0.4" fill="none" opacity="0.8" />
                          <path d="M 33,46 Q 35,35 40,50" stroke="#fef08a" strokeWidth="0.4" fill="none" opacity="0.8" />
                        </g>

                        {/* Ultimate Glowing Core based on brightness and color state */}
                        {fanSpeed > 0 && (
                          <g filter="url(#ledIntensityGlow)">
                            <ellipse 
                              cx="50" 
                              cy="50" 
                              rx="22" 
                              ry="22" 
                              fill={
                                ledColor === 'red' ? '#fca5a5' :
                                ledColor === 'green' ? '#86efac' :
                                ledColor === 'blue' ? '#93c5fd' :
                                ledColor === 'purple' ? '#d8b4fe' :
                                ledColor === 'cyan' ? '#67e8f9' :
                                ledColor === 'yellow' ? '#fef08a' : '#ffffff'
                              }
                              opacity={(fanSpeed / 100) * 0.9} 
                            />
                            <ellipse 
                              cx="50" 
                              cy="50" 
                              rx="10" 
                              ry="10" 
                              fill="#ffffff" 
                              opacity={(fanSpeed / 100) * 0.95} 
                            />
                          </g>
                        )}

                        <defs>
                          <linearGradient id="ledBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
                            <stop offset="30%" stopColor="rgba(255,255,255,0.22)" />
                            <stop offset="70%" stopColor="rgba(255,255,255,0.12)" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
                          </linearGradient>
                          <filter id="ledIntensityGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="8" result="blur" />
                            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 2.5 0" />
                          </filter>
                        </defs>
                      </svg>
                    </motion.div>
                  </div>

                  {/* Simulated Oscilloscope Waveform Panel at bottom */}
                  <div className="relative z-10 w-full bg-slate-900/90 border border-white/5 rounded-2xl h-[70px] p-2 flex flex-col justify-between overflow-hidden">
                    <div className="flex justify-between items-center text-[7px] font-mono uppercase tracking-wider text-slate-500">
                      <span>Live Pulse-Width Modulation (PWM) Oscilloscope</span>
                      <span className="text-cyan-400">5.0V Amplitude</span>
                    </div>

                    {/* PWM Pulse Wave Representation */}
                    <div className="flex-1 flex items-center justify-around px-1 gap-1 relative">
                      {/* Interactive Wave Columns */}
                      {[...Array(14)].map((_, i) => (
                        <div key={i} className="flex-1 h-8 flex items-center">
                          {/* Each period consists of a active high block (width depends on fanSpeed) and an inactive low block */}
                          <div className="flex-1 h-full flex items-end">
                            <div 
                              className="bg-cyan-500/80 shadow-[0_0_8px_#22d3ee] transition-all duration-150 h-5" 
                              style={{ 
                                width: fanSpeed > 0 ? `${fanSpeed}%` : '0px',
                                opacity: fanSpeed > 0 ? 0.3 + (fanSpeed / 150) : 0.1 
                              }} 
                            />
                            <div 
                              className="bg-slate-700 h-[2px] flex-1" 
                              style={{ width: `${100 - fanSpeed}%` }} 
                            />
                          </div>
                        </div>
                      ))}
                      
                      {/* Scope grid lines */}
                      <div className="absolute inset-0 flex flex-col justify-around pointer-events-none opacity-5">
                        <div className="w-full h-[1px] bg-white border-t border-dashed" />
                        <div className="w-full h-[1px] bg-white border-t border-dashed" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-header interactive Color Switch Panel */}
                <div className="flex flex-col items-center gap-2 max-w-[420px] w-full bg-white border-2 border-black/5 rounded-3xl p-4 shadow-sm">
                  <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Select LED Channel / Mix</span>
                  <div className="flex flex-wrap justify-center gap-2.5">
                    {[
                      { id: 'red', label: '🔴 Red', activeBg: 'bg-red-500 text-white border-red-600' },
                      { id: 'green', label: '🟢 Green', activeBg: 'bg-green-600 text-white border-green-700' },
                      { id: 'blue', label: '🔵 Blue', activeBg: 'bg-blue-600 text-white border-blue-700' },
                      { id: 'purple', label: '🔮 Purple', activeBg: 'bg-purple-600 text-white border-purple-700' },
                      { id: 'cyan', label: '🧪 Cyan', activeBg: 'bg-cyan-600 text-dark border-cyan-700' },
                      { id: 'yellow', label: '⚡ Yellow', activeBg: 'bg-yellow-500 text-dark border-yellow-600' },
                      { id: 'white', label: '⚪ White', activeBg: 'bg-slate-100 text-dark border-slate-300' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setLedColor(item.id as any)}
                        className={`text-[9px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl border-2 transition-all ${
                          ledColor === item.id 
                            ? `${item.activeBg} scale-110 shadow-md` 
                            : 'bg-slate-50 border-black/5 hover:border-black/10 hover:bg-slate-100 text-gray-500'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Connecting Mechanical Base / Wiring spacer */}
                <div className="w-1.5 h-6 bg-dark/15 rounded-full" />

                {/* Immersive Rotating Knob Base */}
                <div className="relative">
                  <div className="absolute inset-0 -m-6 bg-primary/5 rounded-full blur-2xl -z-10" />
                  
                  <motion.div 
                    onPan={(e, info) => {
                      const sens = 1.0;
                      const delta = info.delta.x * sens;
                      setRotation(prev => prev + delta);
                      setFanSpeed(prev => {
                        const next = prev + (delta / 3.2);
                        return Math.max(0, Math.min(100, next));
                      });
                    }}
                    style={{ rotate: rotation }}
                    className="w-40 h-40 bg-white border-[12px] border-dark rounded-full shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing relative hover:shadow-primary/10 transition-shadow"
                  >
                    {/* Tick markings on the physical dial */}
                    {[...Array(24)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`absolute w-1 rounded-full ${i % 6 === 0 ? 'h-4 bg-dark' : 'h-2 bg-dark/15'}`} 
                        style={{ transform: `rotate(${i * 15}deg) translateY(-58px)` }} 
                      />
                    ))}
                    
                    {/* Dial Position Needle */}
                    <div className="absolute top-2.5 w-1.5 h-4.5 bg-primary rounded-full shadow-[0_0_12px_#3b82f6]" />

                    {/* Industrial Core styling */}
                    <div className="w-14 h-14 bg-dark rounded-full flex items-center justify-center shadow-inner border-4 border-white/5">
                      <div className="w-6 h-6 rounded-full border-2 border-white/10" />
                    </div>
                  </motion.div>
                </div>

                {/* Instructions */}
                <div className="flex flex-col items-center gap-6 mt-8">
                  <div className="bg-dark/5 px-6 py-3 rounded-2xl text-center border-2 border-black/5">
                    <p className="font-black text-gray-500 uppercase tracking-widest text-[9px] max-w-xs leading-relaxed">
                      Rotate the <span className="text-dark">Rotary Encoder</span> right to increase LED brightness, and left to dim/turn it off completely.
                    </p>
                  </div>

                  <div className="flex justify-center gap-4">
                    <button 
                      onClick={() => {
                        setFanSpeed(0);
                        setRotation(0);
                      }}
                      className="px-8 py-3 bg-white border-2 border-dark/10 hover:border-dark text-dark/60 hover:text-dark rounded-full font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2"
                    >
                      <RotateCcw size={14} /> Reset Brightness
                    </button>
                    {(fanSpeed >= 100 || isComplete) && (
                      <motion.button 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={onComplete}
                        className="px-10 py-3 bg-dark text-white rounded-full font-black text-[10px] uppercase tracking-widest transition-all button-pop flex items-center gap-2 shadow-xl shadow-dark/20"
                      >
                        LED Lab Complete <ArrowRight size={14} />
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            ) : moduleId === 'flame-sensor' ? (
              <div className="space-y-12 w-full">
                {/* Burj Khalifa Scene */}
                <div className="h-80 w-full bg-[#1a1a2e] rounded-[48px] border-4 border-black/10 relative overflow-hidden flex items-end justify-center shadow-2xl">
                   {/* Moon/Stars */}
                   <div className="absolute top-10 left-10 w-16 h-16 bg-yellow-50 rounded-full blur-xl opacity-20" />
                   {[...Array(20)].map((_, i) => (
                     <div 
                       key={i} 
                       className="absolute bg-white rounded-full animate-pulse" 
                       style={{ 
                         top: `${Math.random() * 50}%`, 
                         left: `${Math.random() * 100}%`, 
                         width: `${Math.random() * 2 + 1}px`, 
                         height: `${Math.random() * 2 + 1}px` 
                       }} 
                     />
                   ))}

                    {/* Burj Khalifa Silhouette (Extremely Right) */}
                    <div className="absolute right-8 bottom-0 z-10 w-32 h-[92%] bg-gradient-to-t from-gray-900 to-gray-800 rounded-t-lg border-x-4 border-t-4 border-white/10 shadow-2xl flex flex-col items-center">
                      {/* Structure layers */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100%_4px]" />
                      <div className="w-12 h-full border-x-2 border-white/5 relative">
                         {/* Windows */}
                         <div className="absolute inset-0 grid grid-cols-2 gap-1 p-2 opacity-20">
                            {[...Array(20)].map((_, i) => (
                              <div key={i} className="h-4 bg-blue-300/30 rounded-sm" />
                            ))}
                         </div>
                      </div>
                      
                      {/* Peak Antenna */}
                      <div className="absolute -top-12 w-1 h-12 bg-white/20" />
                      <div className="absolute -top-1 w-8 h-1 bg-white/10" />
                      
                      {/* Fire Particles */}
                      <AnimatePresence>
                        {fireIntensity > 0 && [...Array(Math.floor(fireIntensity / 5))].map((_, i) => (
                          <motion.div 
                            key={i}
                            initial={{ scale: 0, y: 0, x: (Math.random() - 0.5) * 60 }}
                            animate={{ 
                              scale: [1, 2, 0], 
                              y: -100 - (Math.random() * 100), 
                              x: (Math.random() - 0.5) * 100,
                              rotate: Math.random() * 360
                            }}
                            transition={{ duration: 1 + Math.random(), repeat: Infinity, delay: i * 0.1 }}
                            className="absolute bottom-20 w-4 h-4 bg-orange-500 rounded-full blur-md opacity-60"
                          />
                        ))}
                      </AnimatePresence>

                      {/* Intensity Bar */}
                      <div className="absolute top-4 inset-x-4 h-2 bg-black/40 rounded-full overflow-hidden border border-white/10">
                        <motion.div 
                          animate={{ width: `${fireIntensity}%` }}
                          className="h-full bg-danger shadow-[0_0_10px_#ef4444]"
                        />
                      </div>
                      <div className="absolute top-8 font-black text-[8px] text-white/40 uppercase tracking-widest">Tower Heat Status</div>
                   </div>

                   {/* The Fire Fighter Truck */}
                   <motion.div 
                     animate={{ x: truckX }}
                     transition={{ type: "spring", stiffness: 40, damping: 15 }}
                     className="absolute bottom-4 left-4 z-20"
                   >
                     <div className="relative scale-[1.6] origin-bottom-left">
                        {/* High-Pressure Sprayer effect */}
                        <AnimatePresence>
                          {isSpraying && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute -top-16 left-28 w-48 h-48 pointer-events-none"
                            >
                               {[...Array(20)].map((_, i) => (
                                 <motion.div 
                                   key={i}
                                   animate={{ 
                                     x: [0, 120 + Math.random() * 80], 
                                     y: [0, -60 - Math.random() * 60], 
                                     scale: [1.5, 4, 0], 
                                     opacity: [1, 0.8, 0] 
                                   }}
                                   transition={{ duration: 0.35, repeat: Infinity, delay: i * 0.02 }}
                                   className="absolute w-4 h-4 bg-white/80 rounded-full blur-[2px]"
                                 />
                               ))}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Truck Design (Enhanced Professional Fire Engine) */}
                        <div className="flex items-end">
                           {/* Main Apparatus Body */}
                           <div className="w-36 h-18 bg-danger rounded-t-xl border-4 border-dark relative shadow-2xl overflow-hidden">
                              {/* Chrome strip */}
                              <div className="absolute top-1 left-0 w-full h-[3px] bg-gray-200/50" />
                              
                              {/* Equipment compartments */}
                              <div className="absolute top-6 left-2 flex gap-1.5 h-7">
                                 {[1, 2, 3].map(i => (
                                   <div key={i} className="w-8 h-full bg-gray-300 border-2 border-dark rounded-sm flex flex-col justify-around p-0.5">
                                      <div className="w-full h-0.5 bg-dark opacity-20" />
                                      <div className="w-full h-0.5 bg-dark opacity-20" />
                                   </div>
                                 ))}
                              </div>
                              
                              {/* Ladder on Top */}
                              <div className="absolute top-0 right-4 w-20 h-2 bg-gray-300 border-2 border-dark -rotate-2 rounded flex divide-x-2 divide-dark">
                                 <div className="w-4" /><div className="w-4" /><div className="w-4" /><div className="w-4" />
                              </div>

                              <div className="absolute bottom-2 left-4 text-[5px] font-black italic text-white/60 tracking-wider">LADDER UNIT 01</div>
                           </div>
                           
                           {/* Crew Cabin */}
                           <div className="w-16 h-16 bg-danger rounded-tr-[45px] border-4 border-dark -ml-2 mb-0 shadow-2xl relative">
                              {/* Windows */}
                              <div className="absolute top-3 left-4 w-8 h-5 bg-blue-300 rounded-sm border-2 border-dark shadow-inner" />
                              
                              {/* Emergency Beacon */}
                              <div className="absolute -top-5 left-4 flex gap-1">
                                 <div className="w-5 h-4 bg-red-600 rounded-lg border-2 border-dark shadow-[0_0_15px_#ef4444] animate-pulse" />
                                 <div className="w-3 h-4 bg-blue-600 rounded-lg border-2 border-dark shadow-[0_0_15px_#3b82f6] animate-[pulse_0.5s_infinite]" />
                              </div>
                              
                              {/* Front grill */}
                              <div className="absolute bottom-1 right-1 w-2 h-6 bg-gray-300 border-2 border-dark rounded-sm" />
                           </div>
                        </div>
                        
                        {/* Wheels with Chassis */}
                        <div className="flex gap-10 px-4 -mt-3.5 relative z-10">
                           {[1, 2, 3].map(i => (
                             <div key={i} className="w-8 h-8 bg-dark rounded-full border-4 border-gray-600 flex items-center justify-center shadow-lg">
                                <div className="w-3 h-3 bg-gray-400 rounded-full border border-dark" />
                             </div>
                           ))}
                        </div>

                        {/* High-Mounted Flame Sensor */}
                        <div className="absolute -top-12 left-20 flex flex-col items-center">
                           <div className="w-2 h-8 bg-gray-500 rounded-full" />
                           <div className={`w-12 h-7 border-4 border-dark transition-colors duration-300 rounded-xl flex items-center justify-center ${isSpraying ? 'bg-primary shadow-[0_0_20px_#3b82f6]' : 'bg-secondary'}`}>
                              <div className={`w-4 h-4 rounded-full ${isSpraying ? 'bg-white animate-ping' : 'bg-danger animate-pulse'}`} />
                           </div>
                        </div>
                     </div>
                   </motion.div>

                   {/* Ground line */}
                   <div className="absolute bottom-0 w-full h-4 bg-gray-900 border-t-2 border-white/5" />
                </div>

                <div className="flex flex-col items-center gap-6">
                  <div className="bg-dark/5 px-6 py-4 rounded-[32px] text-center border-2 border-black/5 max-w-md">
                    <p className="font-black text-gray-500 uppercase tracking-widest text-[9px] leading-relaxed">
                      Deploy the fire fighter unit! The onboard <span className="text-primary text-[11px]">Flame Sensor</span> is programmed to detect fire IR signatures and automatically engage extinguishers at a safe distance.
                    </p>
                  </div>

                  <div className="flex justify-center gap-4">
                    <button 
                      disabled={isDriving || fireIntensity < 100}
                      onClick={() => setIsDriving(true)}
                      className={`px-12 py-4 rounded-full font-black text-[12px] uppercase tracking-widest transition-all button-pop flex items-center gap-3 shadow-xl ${
                        isDriving || fireIntensity < 100 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'bg-danger text-white hover:scale-105 shadow-danger/20'
                      }`}
                    >
                      <Play size={16} /> Start Mission
                    </button>
                    
                    <button 
                      onClick={() => { setTruckX(0); setFireIntensity(100); setIsDriving(false); }}
                      className="px-8 py-4 bg-white border-2 border-dark/10 hover:border-dark text-dark/60 hover:text-dark rounded-full font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2"
                    >
                      <RotateCcw size={14} /> Reset Mission
                    </button>
                    
                    {isComplete && (
                      <motion.button 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={onComplete}
                        className="px-12 py-4 bg-success text-white rounded-full font-black text-[12px] uppercase tracking-widest transition-all button-pop flex items-center gap-3 shadow-xl shadow-success/20"
                      >
                        Fire Extinguished! <Trophy size={16} />
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            ) : moduleId === 'smoke-sensor' ? (
              <div className="space-y-12 w-full">
                {/* Factory Scene */}
                <div className="h-80 w-full bg-slate-200 rounded-[48px] border-4 border-black/10 relative overflow-hidden flex items-end shadow-2xl">
                   {/* Background Sky */}
                   <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-slate-200" />
                   
                   {/* Factory Structure */}
                   <div className="relative z-10 ml-8 w-64 h-48 bg-slate-700 rounded-t-lg border-x-4 border-t-4 border-slate-800 flex items-end gap-2 p-4">
                      {/* Chimneys */}
                      <div className="absolute -top-20 left-4 w-12 h-20 bg-slate-800 border-x-4 border-dark flex flex-col items-center">
                         <div className="w-16 h-4 bg-slate-900 -mt-2 rounded-sm" />
                         {/* Thick Smoke Particles */}
                         <AnimatePresence>
                           {isEmittingSmoke && [...Array(25)].map((_, i) => (
                             <motion.div 
                               key={i}
                               initial={{ y: 0, x: 0, opacity: 0, scale: 0.5 }}
                               animate={{ 
                                 y: -220, 
                                 x: (i % 2 === 0 ? 1 : -1) * (15 + (Math.random() * 80)), 
                                 opacity: [0, 0.9, 0],
                                 scale: [1, 5, 10]
                                }}
                               transition={{ duration: 3, repeat: Infinity, delay: i * 0.12 }}
                               className="absolute -top-12 left-1/2 -translate-x-1/2 w-10 h-10 bg-black rounded-full blur-2xl z-50"
                             />
                           ))}
                         </AnimatePresence>
                      </div>

                      <div className="absolute -top-16 right-8 w-10 h-16 bg-slate-800 border-x-4 border-dark flex flex-col items-center">
                         <div className="w-14 h-4 bg-slate-900 -mt-2 rounded-sm" />
                         <AnimatePresence>
                           {isEmittingSmoke && [...Array(20)].map((_, i) => (
                             <motion.div 
                               key={i}
                               initial={{ y: 0, x: 0, opacity: 0, scale: 0.5 }}
                               animate={{ 
                                 y: -200, 
                                 x: (i % 2 === 0 ? 1 : -1) * (10 + (Math.random() * 60)), 
                                 opacity: [0, 1, 0],
                                 scale: [1, 4, 8]
                               }}
                               transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.18 }}
                               className="absolute -top-12 left-1/2 -translate-x-1/2 w-10 h-10 bg-black rounded-full blur-xl z-50"
                             />
                           ))}
                         </AnimatePresence>
                      </div>

                      {/* Factory Details */}
                      <div className="grid grid-cols-4 gap-2 w-full h-24">
                        {[...Array(8)].map((_, i) => (
                          <div key={i} className={`bg-slate-800/50 rounded pointer-events-none ${i % 3 === 0 ? 'animate-pulse' : ''}`} />
                        ))}
                      </div>
                   </div>

                   {/* Smoke Sensor Unit (Repositioned Above) */}
                   <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center z-30">
                      <div className="w-[2px] h-8 bg-dark/40" />
                      <div className={`w-14 h-14 rounded-full border-4 border-dark flex items-center justify-center transition-colors duration-500 ${smokeLevel > 20 ? 'bg-orange-500 shadow-[0_0_20px_#f97316]' : 'bg-slate-400'}`}>
                         <div className="w-8 h-8 rounded-full border-2 border-dark/20 flex items-center justify-center bg-dark/10">
                            <motion.div 
                              animate={{ scale: smokeLevel > 5 ? [1, 1.3, 1] : 1 }}
                              transition={{ repeat: Infinity, duration: 0.8 }}
                              className="w-3 h-3 bg-white/30 rounded-full"
                            />
                         </div>
                      </div>
                      <span className="mt-1 text-[10px] font-black uppercase text-black bg-white/80 px-2 py-0.5 rounded shadow-sm border border-black/10">SMOKE SENSOR</span>
                   </div>

                   {/* LCD Display Unit */}
                   <div className="absolute bottom-8 right-8">
                     <div className="bg-dark p-3 rounded-2xl shadow-2xl border-4 border-slate-600">
                        <div className="bg-[#94b300] w-48 h-18 rounded border-2 border-black/20 overflow-hidden relative font-mono p-2 shadow-inner">
                           {/* LCD Scanning Lines */}
                           <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:100%_2px] pointer-events-none z-10" />
                           
                           <div className={`text-[10px] uppercase font-bold tracking-tight transition-colors duration-300 ${smokeReading > 400 ? 'text-red-700 animate-pulse' : 'text-[#1a1c00]/80'}`}>
                              System Status: {smokeReading > 400 ? '!! DANGER !!' : 'CLEAN'}
                           </div>
                           
                           <div className="text-[#1a1c00] text-xl font-bold mt-1">
                              CO2: {Math.round(smokeReading)} <span className="text-sm">PPM</span>
                           </div>

                           {/* Red Danger Backlight Blink */}
                           {smokeReading > 400 && (
                             <motion.div 
                               animate={{ opacity: [0, 0.4, 0] }}
                               transition={{ repeat: Infinity, duration: 0.5 }}
                               className="absolute inset-0 bg-red-600 z-0 pointer-events-none"
                             />
                           )}
                        </div>
                        <div className="mt-2 flex justify-between px-1">
                           <div className="w-2 h-2 bg-red-500 rounded-full" />
                           <div className="w-2 h-2 bg-green-500 rounded-full" />
                        </div>
                     </div>
                     <div className="text-[7px] text-center mt-1 font-black text-dark/30 uppercase">I2C LCD INTERFACE</div>
                   </div>

                   {/* Ground */}
                   <div className="absolute bottom-0 w-full h-6 bg-slate-800" />
                </div>

                <div className="flex flex-col items-center gap-8">
                   <div className="bg-dark/5 p-6 rounded-[32px] text-center border-2 border-black/5 max-lg">
                      <p className="font-black text-gray-500 uppercase tracking-widest text-[9px] leading-relaxed">
                        Pollution Monitoring: Press <span className="text-primary">Release CO2</span> to simulate industrial emissions. The <span className="text-dark">Smoke Sensor MQ-2</span> triggers an alert on the digital <span className="text-dark">LCD display</span> when concentrations exceed safe levels.
                      </p>
                   </div>

                   <div className="flex justify-center gap-4">
                      <button 
                         onClick={() => setIsEmittingSmoke(!isEmittingSmoke)}
                         className={`px-12 py-4 rounded-full font-black text-[12px] uppercase tracking-widest transition-all button-pop flex items-center gap-3 shadow-xl ${
                           isEmittingSmoke 
                           ? 'bg-black text-white hover:bg-slate-900' 
                           : 'bg-primary text-white hover:scale-105 shadow-primary/20'
                         }`}
                      >
                        <Wind size={16} strokeWidth={3} /> {isEmittingSmoke ? 'Stop CO2 Release' : 'Release CO2'}
                      </button>

                      <button 
                        onClick={() => { setSmokeLevel(0); setSmokeReading(400); setIsEmittingSmoke(false); }}
                        className="px-8 py-4 bg-white border-2 border-dark/10 hover:border-dark text-dark/60 hover:text-dark rounded-full font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2"
                      >
                        <RotateCcw size={14} /> Clear Air (Instant)
                      </button>

                      {isComplete && (
                        <motion.button 
                           initial={{ opacity: 0, scale: 0.8 }}
                           animate={{ opacity: 1, scale: 1 }}
                           onClick={onComplete}
                           className="px-12 py-4 bg-success text-white rounded-full font-black text-[12px] uppercase tracking-widest transition-all button-pop flex items-center gap-3 shadow-xl shadow-success/20"
                        >
                           Detection Verified! <Check size={16} />
                        </motion.button>
                      )}
                   </div>
                </div>
              </div>
            ) : moduleId === 'dot-matrix' ? (
              <div className="space-y-12 w-full flex flex-col items-center">
                {/* Dot Matrix Display (Middle Upper Side) */}
                <div className="relative group">
                  <div className="bg-dark p-6 rounded-3xl shadow-2xl border-8 border-slate-700 flex items-center justify-center">
                    <div className="grid grid-cols-8 gap-2">
                       {matrixDisplay.map((row, rIdx) => 
                         row.map((cell, cIdx) => (
                           <motion.div
                             key={`${rIdx}-${cIdx}`}
                             initial={{ scale: 0 }}
                             animate={{ scale: 1, backgroundColor: cell ? '#ef4444' : '#1e293b' }}
                             className={`w-4 h-4 rounded-full shadow-inner ${cell ? 'shadow-[0_0_10px_#ef4444]' : ''}`}
                           />
                         ))
                       )}
                    </div>
                  </div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full border-2 border-dark/10 text-[8px] font-black uppercase tracking-widest text-dark/40">8x8 LED Matrix</div>
                </div>

                {/* Mood Selection Controls */}
                <div className="space-y-8 w-full max-w-md">
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { id: 'happy', icon: '😊', label: 'Happy' },
                        { id: 'sad', icon: '😢', label: 'Sad' },
                        { id: 'surprised', icon: '😲', label: 'Suprised' },
                        { id: 'robot', icon: '🤖', label: 'Robot' }
                      ].map((mood) => (
                        <motion.button
                          key={mood.id}
                          whileHover={{ y: -5, scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setMatrixDisplay(EMOJI_PATTERNS[mood.id]);
                            setActiveMood(mood.id);
                          }}
                          className={`p-4 rounded-3xl border-4 flex flex-col items-center gap-2 transition-all ${
                            activeMood === mood.id 
                            ? 'border-primary bg-primary/5 text-primary' 
                            : 'border-gray-50 bg-white text-gray-400 hover:border-primary/20'
                          }`}
                        >
                          <span className="text-3xl">{mood.icon}</span>
                          <span className="font-black text-[9px] uppercase tracking-widest">{mood.label}</span>
                        </motion.button>
                      ))}
                   </div>

                   <div className="flex flex-col items-center gap-6">
                      <div className="bg-dark/5 p-4 rounded-2xl text-center border-2 border-black/5 w-full">
                        <p className="font-black text-gray-500 uppercase tracking-widest text-[9px]">
                          Select a mood emoji to display it on the <span className="text-dark">8x8 Dot Matrix</span> via the MAX7219 driver.
                        </p>
                      </div>

                      <div className="flex justify-center gap-4">
                        <button 
                          onClick={() => {
                            setMatrixDisplay(Array(8).fill(0).map(() => Array(8).fill(0)));
                            setActiveMood(null);
                          }}
                          className="px-8 py-3 bg-white border-2 border-dark/10 hover:border-dark text-dark/60 hover:text-dark rounded-full font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2"
                        >
                          <RotateCcw size={14} /> Clear Matrix
                        </button>
                        
                        {isComplete && (
                          <motion.button 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={onComplete}
                            className="px-10 py-3 bg-dark text-white rounded-full font-black text-[10px] uppercase tracking-widest transition-all button-pop flex items-center gap-2 shadow-xl shadow-dark/20"
                          >
                            Display Confirmed <Check size={14} strokeWidth={3} />
                          </motion.button>
                        )}
                      </div>
                   </div>
                </div>
              </div>
            ) : moduleId === 'ir-sensor' ? (
              <div className="space-y-12 w-full flex flex-col items-center">
                {/* 3D Smart Parking Scene */}
                <div className="relative w-full max-w-[650px] h-[360px] bg-slate-950 rounded-[36px] overflow-hidden border-4 border-slate-700 shadow-2xl" style={{ perspective: '1200px' }}>
                  {/* Grid overlay background */}
                  <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                  
                  {/* Asphalt floor base */}
                  <div className="absolute inset-x-0 bottom-0 h-[220px] bg-slate-900 border-t-[6px] border-slate-800 rounded-b-[32px] overflow-hidden">
                    {/* Road lane line markings */}
                    <div className="absolute left-0 right-0 bottom-4 h-1.5 bg-yellow-500/40 border-b border-t border-dashed border-yellow-300/30" />
                    
                    {/* Driving lane markers */}
                    <div className="absolute left-[160px] top-0 bottom-0 w-2.5 bg-yellow-500/65" style={{ transform: 'skewX(-20deg)' }} />
                    
                    {/* Drive in arrow indicator */}
                    <div className="absolute left-6 bottom-8 text-[9px] font-mono font-black text-amber-500/50 uppercase tracking-widest animate-pulse">
                      DRIVE IN ────➔
                    </div>

                    {/* Left Asphalt Border Line */}
                    <div className="absolute left-0 bottom-0 top-0 w-3 bg-zinc-950/30" />
                  </div>

                  {/* 4 Parking Slots (3D Perspective layout) */}
                  {[200, 310, 420, 530].map((posLeft, idx) => {
                    const carColor = parkingSlots[idx];
                    const isEmpty = carColor === null;
                    const carPrimaryColors = ['#ef4444', '#3b82f6', '#eab308', '#10b981'];
                    const carDarkColors = ['#991b1b', '#1e3a8a', '#854d0e', '#064e3b'];
                    
                    return (
                      <div 
                        key={idx} 
                        className="absolute top-[35px] h-[170px] w-[88px] rounded-xl bg-slate-900/90 shadow-[inset_0_4px_12px_rgba(0,0,0,0.8)] flex flex-col items-center justify-between p-2 pt-3 transition-colors duration-500"
                        style={{
                          left: `${posLeft}px`,
                          borderLeft: '3px solid rgba(234, 179, 8, 0.45)',
                          borderRight: '3px solid rgba(234, 179, 8, 0.45)',
                          borderTop: '5px solid rgba(234, 179, 8, 0.6)'
                        }}
                      >
                        {/* Slot Label & Status LED Indicator Light */}
                        <div className="absolute -top-7 flex flex-col items-center gap-0.5">
                          <div className="text-[8px] font-mono font-black text-slate-400 uppercase tracking-wider">SLOT {idx+1}</div>
                          <div className={`w-3.5 h-3.5 rounded-full border-2 border-slate-950/40 transition-all duration-300 ${
                            isEmpty 
                              ? 'bg-emerald-500 shadow-[0_0_12px_#10b981]' 
                              : 'bg-rose-500 shadow-[0_0_12px_#f43f5e]'
                          }`} />
                        </div>

                        {/* Position Outline or Parked Car model */}
                        {isEmpty ? (
                          <div className="flex-1 flex flex-col items-center justify-center opacity-20">
                            <span className="text-[10px] font-mono font-black text-slate-300 tracking-widest uppercase">FREE</span>
                            <span className="text-[7px] font-mono text-slate-400 mt-1">AVAILABLE</span>
                          </div>
                        ) : (
                          /* 3D-styled Parked Car Visual representation */
                          <motion.div 
                            initial={{ scale: 0.8, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            className="w-[74px] h-[126px] rounded-lg relative shadow-2xl flex flex-col items-center justify-between p-2"
                            style={{ 
                              background: `linear-gradient(to bottom, ${carColor}, ${carDarkColors[idx]})`,
                              border: '2px solid rgba(0,0,0,0.5)',
                            }}
                          >
                            {/* Glass Windshield Block with Reflection lines */}
                            <div className="w-full h-5 bg-zinc-950 rounded border-b border-white/20 relative overflow-hidden">
                              <div className="absolute top-0 left-1 w-12 h-0.5 bg-white/25 rotate-[15deg] translate-y-2 opacity-50" />
                            </div>
                            
                            {/* Spoiler/Rear Wing style panel */}
                            <div className="w-[62px] h-3 bg-zinc-950/70 rounded-xs flex items-center justify-center text-[7px] font-mono text-white/40 tracking-widest font-black uppercase">
                              SLOT {idx+1}
                            </div>
                            
                            {/* Side mirrors */}
                            <div className="absolute top-4 -left-1 w-1.5 h-3 bg-zinc-800 rounded-l-xs border-l border-white/10" />
                            <div className="absolute top-4 -right-1 w-1.5 h-3 bg-zinc-800 rounded-r-xs border-r border-white/10" />

                            {/* Active Headlights */}
                            <div className="absolute -top-1 left-2 w-2 h-1 bg-yellow-200 rounded-t-full shadow-[0_-6px_12px_rgba(254,240,138,0.7)]" />
                            <div className="absolute -top-1 right-2 w-2 h-1 bg-yellow-200 rounded-t-full shadow-[0_-6px_12px_rgba(254,240,138,0.7)]" />

                            {/* Rear Brake Tail-lights red */}
                            <div className="absolute -bottom-1 left-2.5 w-2 h-1 bg-red-650 rounded-b-xs" />
                            <div className="absolute -bottom-1 right-2.5 w-2 h-1 bg-red-650 rounded-b-xs" />
                          </motion.div>
                        )}
                      </div>
                    );
                  })}

                  {/* IR Obstacle Detection Sensor board */}
                  <div className="absolute left-[30px] bottom-[110px] z-20 flex flex-col items-center">
                    <div className="bg-slate-900 border-2 border-slate-700 p-2.5 rounded-xl flex flex-col items-center gap-1.5 shadow-2xl w-24">
                      {/* Transmitter & Receiver LED pods */}
                      <div className="flex justify-around w-full">
                        {/* Clear Transmitter (TX) LED */}
                        <div className="flex flex-col items-center">
                          <div className="w-4 h-4 rounded-full bg-sky-400/25 border-2 border-sky-400 flex items-center justify-center shadow-[0_0_8px_rgba(56,189,248,0.3)]">
                            <div className="w-1.5 h-1.5 bg-sky-200 rounded-full" />
                          </div>
                          <span className="text-[6.5px] font-mono font-black text-sky-450 mt-0.5">TX</span>
                        </div>
                        {/* Dark Receiver (RX) photodiode */}
                        <div className="flex flex-col items-center">
                          <div className="w-4 h-4 rounded-full bg-indigo-950 border-2 border-indigo-500/80 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-zinc-950 rounded-full" />
                          </div>
                          <span className="text-[6.5px] font-mono font-black text-indigo-400 mt-0.5">RX</span>
                        </div>
                      </div>

                      {/* Onboard comparator circuit active LED */}
                      <div className="flex items-center gap-1.5 pt-0.5 border-t border-slate-800 w-full justify-center">
                        <div className={`w-2.5 h-2.5 rounded-full border border-slate-950/50 transition-all duration-300 ${
                          irSensorLedActive 
                            ? 'bg-rose-500 shadow-[0_0_8px_#ef4444]' 
                            : 'bg-emerald-600 shadow-[0_0_4px_#059669]'
                        }`} />
                        <span className="text-[6px] font-mono font-bold text-slate-400">OUT LED</span>
                      </div>
                    </div>

                    {/* Laser IR Proximity Active visual beam */}
                    <AnimatePresence>
                      {irSensorLedActive && (
                        <motion.div 
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{ opacity: 0.85, scaleX: 1 }}
                          exit={{ opacity: 0, scaleX: 0 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-[94px] top-4.5 w-[65px] h-3 bg-gradient-to-r from-red-500/90 via-rose-500/30 to-transparent blur-[1px] origin-left pointer-events-none"
                        />
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Mechanical Gate Servo + Turn Barrier arm */}
                  <div className="absolute left-[170px] bottom-[35px] z-20 flex flex-col items-center origin-bottom">
                    {/* Solder Core Motor bracket base */}
                    <div className="w-11 h-11 bg-gradient-to-br from-blue-700 to-blue-900 rounded-lg border border-blue-500/70 shadow-2xl flex items-center justify-center relative">
                      <div className="w-5.5 h-5.5 rounded-full bg-slate-100 border border-slate-350 flex items-center justify-center shadow-lg">
                        <div className="w-2 h-2 rounded-full bg-slate-800" />
                      </div>
                      <span className="absolute bottom-[2px] text-[5.5px] font-mono text-blue-200/80 font-black tracking-widest uppercase">SG90</span>
                    </div>

                    {/* Turn barrier Stripe Arm */}
                    <motion.div 
                      animate={{ rotate: gateOpen ? 0 : -95 }}
                      transition={{ type: 'spring', damping: 14, stiffness: 130 }}
                      className="absolute bottom-6 left-5 w-26 h-3 px-1 origin-left rounded-md shadow-2xl"
                      style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, #facc15, #facc15 8px, #0f172a 8px, #0f172a 16px)',
                        border: '1.5px solid #000000'
                      }}
                    >
                      {/* Safety reflection patch */}
                      <div className="absolute right-0.5 top-0.5 bottom-0.5 w-1.5 bg-rose-600 rounded-xs" />
                    </motion.div>
                  </div>

                  {/* Blue LCD 1602 Pixel Screen device panel */}
                  <div className="absolute left-[18px] top-[18px] z-20 flex flex-col items-center">
                    <div className="bg-gradient-to-br from-slate-850 to-zinc-900 p-2.5 rounded-xl border-2 border-slate-700 shadow-2xl w-[156px]">
                      {/* LCD Blue Backlight pixels */}
                      <div className="bg-teal-700 text-teal-100 p-2.5 rounded-lg border-2 border-teal-900 shadow-[inset_0_2px_10px_rgba(0,0,0,0.6)] font-mono flex flex-col justify-between h-[54px] relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(rgba(204,251,241,0.2)_1px,transparent_1px)] bg-[size:4px_4px] pointer-events-none" />
                        <div className="text-[9px] font-black tracking-widest uppercase truncate leading-none text-teal-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">{lcdLines[0]}</div>
                        <div className="text-[9px] font-black tracking-widest uppercase truncate leading-none text-teal-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] mt-1">{lcdLines[1]}</div>
                      </div>
                      
                      {/* Pin layout labels on the side */}
                      <div className="w-full flex justify-between px-1 mt-1 opacity-30 select-none">
                        <span className="text-[4px] font-mono text-slate-350">VSS VDD VO RS RW E D0 D1</span>
                        <span className="text-[4px] font-mono text-slate-350">D6 D7 A K</span>
                      </div>
                    </div>
                  </div>

                  {/* Active Spawning Animating Driving Car */}
                  {parkingState !== 'idle' && parkingState !== 'parked' && parkingState !== 'full' && currentCarIdx !== -1 && (
                    <motion.div 
                      key={currentCarIdx}
                      animate={{ 
                        x: carAnimPos.x, 
                        y: carAnimPos.y, 
                        rotate: carAnimPos.rotate 
                      }}
                      transition={{ 
                        type: 'tween',
                        ease: 'easeInOut',
                        duration: parkingState === 'approaching' ? 1.5 :
                                  parkingState === 'detected' ? 0.3 :
                                  parkingState === 'entering' ? 1.0 :
                                  0.8
                      }}
                      className="absolute z-10 w-[72px] h-[36px] flex items-center justify-between p-1.5 rounded-lg shadow-2xl"
                      style={{ 
                        left: 0,
                        top: 0,
                        background: `linear-gradient(to right, ${['#ef4444', '#3b82f6', '#eab308', '#10b981'][currentCarIdx]}, ${['#991b1b', '#1e3a8a', '#854d0e', '#064e3b'][currentCarIdx]})`,
                        border: '2px solid rgba(0,0,0,0.5)',
                      }}
                    >
                      {/* High-fidelity Windshield gloss block */}
                      <div className="w-5 h-6 bg-zinc-950 rounded border-r border-white/20 ml-4 shrink-0 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-8 h-0.25 bg-white/20 rotate-[30deg] translate-y-1" />
                      </div>
                      
                      {/* Beam yellow headlight vectors */}
                      <div className="absolute right-0.5 top-1.5 w-1.5 h-1.5 bg-yellow-350 rounded-r-sm shadow-[6px_0_12px_rgba(253,224,71,0.8)]" />
                      <div className="absolute right-0.5 bottom-1.5 w-1.5 h-1.5 bg-yellow-350 rounded-r-sm shadow-[6px_0_12px_rgba(253,224,71,0.8)]" />
                      
                      {/* Red taillights */}
                      <div className="absolute left-0.5 top-1.5 w-1 h-1.5 bg-red-650 rounded-l-xs" />
                      <div className="absolute left-0.5 bottom-1.5 w-1 h-1.5 bg-red-650 rounded-l-xs" />
                    </motion.div>
                  )}
                </div>

                {/* Laboratory Automation Console Controls */}
                <div className="flex flex-col items-center gap-6 w-full">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => {
                        // Reset and launch sequence
                        setParkingSlots([null, null, null, null]);
                        setCurrentCarIdx(-1);
                        setGateOpen(false);
                        setIrSensorLedActive(false);
                        setCarAnimPos({ x: -100, y: 240, rotate: 0 });
                        setParkingState('spawning');
                      }}
                      className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-600/25 flex items-center gap-2 transition-transform hover:scale-102"
                    >
                      <Play size={13} fill="currentColor" /> Start Parking System
                    </button>

                    <button 
                      onClick={() => {
                        // Soft reset back to initial setup
                        setParkingSlots([null, null, null, null]);
                        setCurrentCarIdx(-1);
                        setGateOpen(false);
                        setIrSensorLedActive(false);
                        setCarAnimPos({ x: -100, y: 240, rotate: 0 });
                        setParkingState('idle');
                        setLcdLines(['SMART PARKING', 'SLOTS FREE: 4']);
                      }}
                      className="px-8 py-4 bg-white border-2 border-slate-300 hover:border-slate-800 text-slate-600 hover:text-slate-900 rounded-full font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2"
                    >
                      <RotateCcw size={13} /> Reset System
                    </button>
                  </div>

                  {/* Microcontroller schematic details card */}
                  <div className="bg-dark/5 p-6 rounded-[32px] text-center border-2 border-black/5 max-w-lg">
                    <p className="font-semibold text-gray-500 uppercase tracking-wider text-[9px] leading-relaxed">
                      Microprocessor logic: The <span className="text-dark font-black">Infrared (IR) Transmitter LED</span> emits a steady wave at 38kHz. When a car blocks this beam (detected near the left edge), a low logic is sent to <span className="text-dark font-black">MCU Pin D2</span>. The microchip opens the servo gate barricade to 90 degrees instantly, reserves the slot, and increments the occupied flag on the <span className="text-primary font-black">monochrome 1602 LCD module</span>.
                    </p>
                  </div>

                  {/* Full Validation completed trophy marker */}
                  {isComplete && (
                    <motion.button 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      onClick={onComplete}
                      className="px-10 py-5 bg-dark text-white rounded-full font-black text-xs uppercase tracking-widest transition-all button-pop flex items-center gap-2 shadow-2xl shadow-dark/30"
                    >
                      Simulation Verified <Trophy size={15} />
                    </motion.button>
                  )}
                </div>
              </div>
            ) : moduleId === 'ldr' ? (
              <div className="space-y-12 w-full flex flex-col items-center">
                {/* Environmental Scene */}
                <div 
                  className="h-80 w-full rounded-[48px] border-4 border-black/10 relative overflow-hidden transition-colors duration-1000 shadow-2xl"
                  style={{ 
                    backgroundColor: `rgb(${26 + dayIntensity * 170}, ${26 + dayIntensity * 180}, ${46 + dayIntensity * 200})` 
                  }}
                >
                   {/* Stars (Only visible at night) */}
                   <div className="absolute inset-0 z-0 opacity-40 transition-opacity duration-1000" style={{ opacity: 1 - dayIntensity }}>
                      {[...Array(30)].map((_, i) => (
                        <div 
                          key={i} 
                          className="absolute bg-white rounded-full animate-pulse" 
                          style={{ 
                            top: `${Math.random() * 60}%`, 
                            left: `${Math.random() * 100}%`, 
                            width: `${Math.random() * 2 + 1}px`, 
                            height: `${Math.random() * 2 + 1}px` 
                          }} 
                        />
                      ))}
                   </div>

                   {/* The Sun / Moon */}
                   <motion.div 
                     animate={{ 
                       y: dayIntensity > 0.5 ? 40 : 150,
                       x: dayIntensity > 0.5 ? 100 : -100,
                       opacity: dayIntensity > 0.3 ? 1 : 0
                     }}
                     className="absolute top-0 right-1/4 w-20 h-20 bg-yellow-400 rounded-full blur-xl shadow-[0_0_60px_rgba(250,204,21,0.5)]"
                   />

                   {/* Highway Ground */}
                   <div className="absolute bottom-0 w-full h-32 bg-slate-800 z-10">
                      {/* Road Marking lines */}
                      <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 flex gap-12 px-4 overflow-hidden">
                        {[...Array(10)].map((_, i) => (
                          <motion.div 
                            key={i}
                            animate={{ x: [-100, 100] }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-20 h-full bg-white/20 rounded-full shrink-0" 
                          />
                        ))}
                      </div>

                      {/* Moving Cars */}
                      {[
                        { type: 'truck', color: 'bg-zinc-700', dur: 12, delay: 0 },
                        { type: 'thar', color: 'bg-red-800', dur: 9, delay: 2 },
                        { type: 'bmw', color: 'bg-indigo-900', dur: 7, delay: 4 },
                        { type: 'lambo', color: 'bg-yellow-500', dur: 5, delay: 6 }
                      ].map((car, i) => (
                        <motion.div
                          key={i}
                          initial={{ x: -300 }}
                          animate={{ x: 1200 }}
                          transition={{ 
                            duration: car.dur, 
                            repeat: Infinity, 
                            ease: "linear",
                            delay: car.delay
                          }}
                          className="absolute z-20 flex items-center"
                          style={{ bottom: 20 + (i % 2 === 0 ? 0 : 40) }}
                        >
                          <div className="relative">
                            {/* Vehicle Body Rendering */}
                            {car.type === 'truck' ? (
                              <div className="flex items-end">
                                <div className="w-24 h-14 bg-zinc-800 rounded-sm border-2 border-black/20" />
                                <div className="w-10 h-10 bg-zinc-700 rounded-tr-lg border-2 border-black/20 -ml-1 relative">
                                   <div className="absolute top-1 right-1 w-6 h-4 bg-sky-200/30 rounded-sm" />
                                </div>
                              </div>
                            ) : car.type === 'thar' ? (
                              <div className="w-20 h-12 bg-red-900 rounded-lg border-2 border-black/30 relative">
                                 <div className="absolute -right-1 top-2 w-2 h-8 bg-black/40 rounded-full" /> {/* Spare wheel */}
                                 <div className="absolute top-1 left-2 w-10 h-5 bg-black/20 rounded-sm" />
                              </div>
                            ) : car.type === 'bmw' ? (
                              <div className="w-22 h-9 bg-slate-900 rounded-full border-2 border-black/20 relative">
                                 <div className="absolute top-1 left-4 w-12 h-4 bg-sky-200/20 rounded-t-xl" />
                                 <div className="absolute -bottom-1 left-4 w-4 h-1 bg-primary/30" />
                              </div>
                            ) : (
                              <div className="w-24 h-7 bg-yellow-500 rounded-br-[40px] rounded-tl-lg border-2 border-black/20 relative">
                                 <div className="absolute top-0.5 left-6 w-10 h-3 bg-black/40 rounded-t-sm skew-x-[30deg]" />
                              </div>
                            )}

                            {/* Wheels */}
                            <div className="flex justify-around absolute -bottom-2 w-full px-2">
                               <div className="w-4 h-4 bg-black rounded-full border-2 border-gray-600" />
                               <div className="w-4 h-4 bg-black rounded-full border-2 border-gray-600" />
                            </div>

                            {/* Headlights (Visible at night) */}
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 flex flex-col gap-2 transition-opacity duration-1000" style={{ opacity: 1 - dayIntensity }}>
                               <div className="w-12 h-6 bg-yellow-100/40 rounded-full blur-lg" />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                   </div>

                   {/* Street Lights (Left & Right) */}
                   {[ 'left-1/4', 'right-1/4' ].map((pos, idx) => (
                     <div key={idx} className={`absolute bottom-32 ${pos} z-10 flex flex-col items-center`}>
                        {/* Post */}
                        <div className="w-2 h-32 bg-slate-600 rounded-t-full relative">
                           {/* Arm */}
                           <div className={`absolute top-0 w-12 h-2 bg-slate-600 rounded-full ${idx === 0 ? 'right-0' : 'left-0'}`} />
                           {/* Light Head */}
                           <div className={`absolute top-0 w-16 h-4 bg-slate-700 rounded-full border-2 border-black/10 flex items-center justify-center overflow-hidden ${idx === 0 ? '-right-14' : '-left-14'}`}>
                              {/* Glow */}
                              <motion.div 
                                animate={{ 
                                  opacity: 1 - dayIntensity,
                                  scaleY: 1 - dayIntensity 
                                }}
                                className="absolute top-2 w-48 h-64 bg-yellow-200/30 rounded-full blur-3xl origin-top"
                              />
                              <div 
                                className="w-12 h-2 rounded-full transition-colors duration-1000"
                                style={{ backgroundColor: `rgba(254, 240, 138, ${1 - dayIntensity})` }}
                              />
                           </div>
                        </div>
                     </div>
                   ))}

                   {/* Environmental Metadata Overlay */}
                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-4">
                      <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                         <span className="text-[10px] font-black text-white/80 uppercase tracking-widest">LDR: {ldrReading}</span>
                      </div>
                   </div>
                </div>

                {/* Dashboard Controls */}
                <div className="flex flex-col items-center gap-8 w-full">
                   <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
                      <button 
                        onClick={() => setTargetIntensity(1)}
                        className={`p-8 rounded-[32px] border-4 flex flex-col items-center gap-3 transition-all button-pop ${
                          targetIntensity === 1 ? 'border-primary bg-primary/5 shadow-xl' : 'bg-white border-gray-100 grayscale hover:grayscale-0'
                        }`}
                      >
                         <div className="p-4 bg-yellow-100 rounded-2xl text-yellow-600">
                            <Wind size={32} />
                         </div>
                         <span className="font-black uppercase tracking-widest text-xs">Day Dashboard</span>
                      </button>

                      <button 
                        onClick={() => setTargetIntensity(0)}
                        className={`p-8 rounded-[32px] border-4 flex flex-col items-center gap-3 transition-all button-pop ${
                          targetIntensity === 0 ? 'border-indigo-500 bg-indigo-50 shadow-xl' : 'bg-white border-gray-100 grayscale hover:grayscale-0'
                        }`}
                      >
                         <div className="p-4 bg-indigo-100 rounded-2xl text-indigo-600">
                            <Bot size={32} />
                         </div>
                         <span className="font-black uppercase tracking-widest text-xs">Night Dashboard</span>
                      </button>
                   </div>

                   <div className="bg-dark/5 p-6 rounded-[32px] text-center border-2 border-black/5 max-w-lg">
                      <p className="font-black text-gray-500 uppercase tracking-widest text-[9px] leading-relaxed">
                        Adaptive Lighting: The <span className="text-dark">LDR (Photoresistor)</span> monitors ambient brightness. A smooth <span className="text-primary italic">7-second transition</span> simulates dusk and dawn, triggering the <span className="text-dark">Auto Street-Light</span> protocol when light levels drop.
                      </p>
                   </div>

                   {/* Logic Indicator */}
                   <div className="flex items-center gap-4">
                      <div className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${dayIntensity < 0.3 ? 'bg-orange-500 border-orange-600 text-white shadow-xl shadow-orange-500/20' : 'bg-gray-100 border-gray-200 text-gray-400'}`}>
                         <Check size={20} strokeWidth={3} />
                         <span className="font-bold uppercase tracking-widest text-[10px]">Street Light: {dayIntensity < 0.3 ? 'ACTIVE' : 'IDLE'}</span>
                      </div>
                      
                      {isComplete && (
                        <motion.button 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          onClick={onComplete}
                          className="px-10 py-5 bg-dark text-white rounded-full font-black text-xs uppercase tracking-widest transition-all button-pop flex items-center gap-2 shadow-xl shadow-dark/20"
                        >
                          Simulation Verified <Trophy size={16} />
                        </motion.button>
                      )}
                   </div>
                </div>
              </div>
            ) : moduleId === 'light-cup' ? (
              <div className="space-y-12 w-full flex flex-col items-center select-none">
                 {/* Main Sandbox Header with Calibration Progress */}
                 <div className="w-full flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-[#06b6d4]">
                    <span className="flex items-center gap-2">
                       <span className="w-2.5 h-2.5 bg-cyan-500 rounded-full animate-pulse" />
                       KY-027 MAGIC POUR SIMULATOR
                    </span>
                    <span>Pair Calibration: {((lightCupPouredLeft ? 50 : 0) + (lightCupPouredRight ? 50 : 0))}%</span>
                 </div>

                 {/* Workbench Drag Zone */}
                 <div 
                   onPointerDown={(e) => {
                     isDraggingRef.current = true;
                     dragStartRef.current = e.clientX;
                     dragStartAngleRef.current = lightCupAngle;
                     e.currentTarget.setPointerCapture(e.pointerId);
                   }}
                   onPointerMove={(e) => {
                     if (!isDraggingRef.current) return;
                     const deltaX = e.clientX - dragStartRef.current;
                     let newAngle = dragStartAngleRef.current + deltaX * 0.4;
                     newAngle = Math.max(-50, Math.min(50, newAngle));
                     setLightCupAngle(newAngle);

                     if (newAngle < -20) setLightCupPouredLeft(true);
                     if (newAngle > 20) setLightCupPouredRight(true);
                   }}
                   onPointerUp={() => {
                     isDraggingRef.current = false;
                   }}
                   onPointerCancel={() => {
                     isDraggingRef.current = false;
                   }}
                   className="h-96 w-full cursor-grab active:cursor-grabbing rounded-[48px] border-4 border-dashed border-cyan-500/30 bg-radial from-slate-900 via-slate-950 to-black relative flex flex-col items-center justify-center overflow-hidden transition-all shadow-xl"
                 >
                    {/* Perspective Workbench Grid overlay */}
                    <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#0891b2_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                    {/* Left & Right Magic light Cup Modules in Twin configuration */}
                    <div className="flex gap-12 md:gap-20 items-center justify-center relative z-10 scale-90 sm:scale-100">
                       
                       {/* LEFT LIGHT CUP MODULE */}
                       <motion.div 
                         style={{ transformOrigin: "50% 100%" }}
                         animate={{ rotate: lightCupAngle, y: lightCupAngle < 0 ? 10 : 0 }}
                         transition={{ type: "spring", stiffness: 120, damping: 15 }}
                         className="relative w-40 h-52 flex flex-col items-center"
                       >
                          {/* Solder Pins standing downward */}
                          <div className="absolute -bottom-7 flex gap-1.5 justify-center">
                             <div className="w-1 h-8 bg-gradient-to-b from-gray-400 to-gray-600 rounded-b shadow-sm" />
                             <div className="w-1 h-8 bg-gradient-to-b from-gray-400 to-gray-600 rounded-b shadow-sm" />
                             <div className="w-1 h-8 bg-gradient-to-b from-gray-400 to-gray-600 rounded-b shadow-sm" />
                             <div className="w-1 h-8 bg-gradient-to-b from-gray-400 to-gray-600 rounded-b shadow-sm" />
                          </div>

                          {/* PCB Container */}
                          <div className="w-32 h-44 bg-neutral-900 border-2 border-slate-700/60 rounded-2xl relative shadow-xl overflow-hidden p-3 flex flex-col items-center">
                             {/* Circuit traces */}
                             <div className="absolute top-2 left-2 w-4 h-4 rounded-full border border-slate-700 opacity-40" />
                             <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full border border-slate-700 opacity-40" />
                             <div className="absolute inset-x-4 top-16 bottom-16 border border-dashed border-cyan-800/20 pointer-events-none" />
                             
                             {/* Text markings */}
                             <div className="absolute top-3 right-3 text-[7px] font-mono text-zinc-500 font-black tracking-widest leading-none">
                               KY-027 L
                             </div>

                             {/* Support Bracket */}
                             <div className="absolute top-10 left-12 w-6 h-20 bg-zinc-800 border border-zinc-700 rounded-t-sm shadow-md flex justify-center pt-2">
                                <div className="w-2 h-16 bg-zinc-950 rounded-sm" />
                             </div>

                             {/* Glass Tilt Chamber holding Mercury ball */}
                             <div className="absolute top-6 left-6 w-16 h-8 bg-white/20 backdrop-blur-xs border border-white/40 rounded-full shadow-inner flex items-center px-1 overflow-hidden">
                                {/* Mercury Ball */}
                                <motion.div 
                                  animate={{ 
                                    x: lightCupAngle < -15 ? 4 : 32, // Rolls left/down on tilt
                                    boxShadow: lightCupAngle < -15 
                                      ? "0 0 10px rgba(255, 255, 255, 0.8), inset 0 2px 2px white"
                                      : "0 2px 5px rgba(0,0,0,0.5), inset 0 2px 2px white"
                                  }}
                                  transition={{ type: "spring", stiffness: 180, damping: 10 }}
                                  className="w-5 h-5 rounded-full bg-gradient-to-b from-neutral-200 via-neutral-400 to-neutral-500 shadow-lg relative"
                                >
                                   <div className="absolute top-0.5 left-1 w-2 h-2 rounded-full bg-white/50 blur-[0.5px]" />
                                </motion.div>

                                {/* Inside metal contact probes */}
                                <div className="absolute left-1 flex flex-col gap-1.5">
                                   <div className="w-2.5 h-0.5 bg-yellow-600" />
                                   <div className="w-2.5 h-0.5 bg-yellow-600" />
                                </div>
                             </div>

                             {/* 5mm Indicator LED stand */}
                             <div className="absolute bottom-4 right-6 flex flex-col items-center">
                                {/* Dome of LED */}
                                <div 
                                   className={`w-6 h-8 rounded-t-full border transition-all duration-300 relative flex items-center justify-center ${
                                     lightCupAngle < -15 
                                       ? 'bg-cyan-400 border-cyan-300 shadow-[0_0_25px_#22d3ee]' 
                                       : 'bg-zinc-800/80 border-zinc-700'
                                   }`}
                                >
                                   {/* Internal Filament */}
                                   <div className="absolute bottom-1 w-2 h-3 border-t border-x border-zinc-500 rounded-sm" />
                                   
                                   {/* Light aura */}
                                   {lightCupAngle < -15 && (
                                     <span className="absolute w-20 h-20 rounded-full bg-cyan-400/20 blur-xl pointer-events-none" />
                                   )}
                                </div>
                                {/* Metal Leads */}
                                <div className="w-0.5 h-12 bg-neutral-400" />
                             </div>

                             {/* Wire labels on bottom */}
                             <div className="absolute bottom-1.5 flex gap-2.5 text-[6px] font-mono text-cyan-600/80 font-bold scale-90">
                                <span>-</span>
                                <span>+</span>
                                <span>S</span>
                                <span>L</span>
                             </div>
                          </div>
                          
                          {/* Annotation label */}
                          <div className="mt-1.5 bg-zinc-950/80 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/5">
                             <span className="text-[8px] font-mono tracking-widest text-zinc-400">LEFT MODULE</span>
                          </div>
                       </motion.div>

                       {/* LIGHT CORE CONDUIT FLOW VISUALIZER */}
                       <div className="flex flex-col items-center gap-1.5">
                          <div className="relative w-16 h-10 border border-dashed border-white/15 rounded-xl flex items-center justify-center py-2 bg-slate-950/40">
                             <div className="flex items-center gap-1">
                                <motion.div 
                                  animate={{ 
                                    scale: lightCupAngle < -15 ? [1, 1.3, 1] : 1,
                                    borderColor: lightCupAngle < -15 ? "#22d3ee" : "rgba(255,255,255,0.15)"
                                  }}
                                  className="w-2 h-2 rounded-full border bg-cyan-550/30" 
                                />
                                <div className="w-6 h-0.5 bg-slate-800 relative overflow-hidden">
                                   <motion.div 
                                     animate={lightCupAngle < -15 ? { x: [24, -24] } : lightCupAngle > 15 ? { x: [-24, 24] } : { x: 0 }}
                                     transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                     className="absolute inset-y-0 w-3 bg-cyan-400"
                                   />
                                </div>
                                <motion.div 
                                  animate={{ 
                                    scale: lightCupAngle > 15 ? [1, 1.3, 1] : 1,
                                    borderColor: lightCupAngle > 15 ? "#22d3ee" : "rgba(255,255,255,0.15)"
                                  }}
                                  className="w-2 h-2 rounded-full border bg-cyan-550/30" 
                                />
                             </div>
                          </div>
                          <span className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest">Signal Link</span>
                       </div>

                       {/* RIGHT LIGHT CUP MODULE */}
                       <motion.div 
                         style={{ transformOrigin: "50% 100%" }}
                         animate={{ rotate: lightCupAngle, y: lightCupAngle > 0 ? 10 : 0 }}
                         transition={{ type: "spring", stiffness: 120, damping: 15 }}
                         className="relative w-40 h-52 flex flex-col items-center"
                       >
                          {/* Solder Pins standing downward */}
                          <div className="absolute -bottom-7 flex gap-1.5 justify-center">
                             <div className="w-1 h-8 bg-gradient-to-b from-gray-400 to-gray-600 rounded-b shadow-sm" />
                             <div className="w-1 h-8 bg-gradient-to-b from-gray-400 to-gray-600 rounded-b shadow-sm" />
                             <div className="w-1 h-8 bg-gradient-to-b from-gray-400 to-gray-600 rounded-b shadow-sm" />
                             <div className="w-1 h-8 bg-gradient-to-b from-gray-400 to-gray-600 rounded-b shadow-sm" />
                          </div>

                          {/* PCB Container */}
                          <div className="w-32 h-44 bg-neutral-900 border-2 border-slate-700/60 rounded-2xl relative shadow-xl overflow-hidden p-3 flex flex-col items-center">
                             {/* Circuit traces */}
                             <div className="absolute top-2 left-2 w-4 h-4 rounded-full border border-slate-700 opacity-40" />
                             <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full border border-slate-700 opacity-40" />
                             <div className="absolute inset-x-4 top-16 bottom-16 border border-dashed border-cyan-800/20 pointer-events-none" />
                             
                             {/* Text markings */}
                             <div className="absolute top-3 right-3 text-[7px] font-mono text-zinc-500 font-black tracking-widest leading-none">
                                KY-027 R
                             </div>

                             {/* Support Bracket */}
                             <div className="absolute top-10 left-12 w-6 h-20 bg-zinc-800 border border-zinc-700 rounded-t-sm shadow-md flex justify-center pt-2">
                                <div className="w-2 h-16 bg-zinc-950 rounded-sm" />
                             </div>

                             {/* Glass Tilt Chamber holding Mercury ball */}
                             <div className="absolute top-6 left-6 w-16 h-8 bg-white/20 backdrop-blur-xs border border-white/40 rounded-full shadow-inner flex items-center px-1 overflow-hidden">
                                {/* Mercury Ball */}
                                <motion.div 
                                  animate={{ 
                                    x: lightCupAngle > 15 ? 32 : 4, // Rolls right/down on tilt
                                    boxShadow: lightCupAngle > 15 
                                      ? "0 0 10px rgba(255, 255, 255, 0.8), inset 0 2px 2px white"
                                      : "0 2px 5px rgba(0,0,0,0.5), inset 0 2px 2px white"
                                  }}
                                  transition={{ type: "spring", stiffness: 180, damping: 10 }}
                                  className="w-5 h-5 rounded-full bg-gradient-to-b from-neutral-200 via-neutral-400 to-neutral-500 shadow-lg relative"
                                >
                                   <div className="absolute top-0.5 left-1 w-2 h-2 rounded-full bg-white/50 blur-[0.5px]" />
                                </motion.div>

                                {/* Inside metal contact probes */}
                                <div className="absolute right-1 flex flex-col gap-1.5">
                                   <div className="w-2.5 h-0.5 bg-yellow-600" />
                                   <div className="w-2.5 h-0.5 bg-yellow-600" />
                                </div>
                             </div>

                             {/* 5mm Indicator LED stand */}
                             <div className="absolute bottom-4 left-6 flex flex-col items-center">
                                {/* Dome of LED */}
                                <div 
                                   className={`w-6 h-8 rounded-t-full border transition-all duration-300 relative flex items-center justify-center ${
                                     lightCupAngle > 15 
                                       ? 'bg-cyan-400 border-cyan-300 shadow-[0_0_25px_#22d3ee]' 
                                       : 'bg-zinc-800/80 border-zinc-700'
                                   }`}
                                >
                                   {/* Internal Filament */}
                                   <div className="absolute bottom-1 w-2 h-3 border-t border-x border-zinc-500 rounded-sm" />
                                   
                                   {/* Light aura */}
                                   {lightCupAngle > 15 && (
                                     <span className="absolute w-20 h-20 rounded-full bg-cyan-400/20 blur-xl pointer-events-none" />
                                   )}
                                </div>
                                {/* Metal Leads */}
                                <div className="w-0.5 h-12 bg-neutral-400" />
                             </div>

                             {/* Wire labels on bottom */}
                             <div className="absolute bottom-1.5 flex gap-2.5 text-[6px] font-mono text-cyan-600/80 font-bold scale-90">
                                <span>-</span>
                                <span>+</span>
                                <span>S</span>
                                <span>L</span>
                             </div>
                          </div>
                          
                          {/* Annotation label */}
                          <div className="mt-1.5 bg-zinc-950/80 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/5">
                             <span className="text-[8px] font-mono tracking-widest text-zinc-400">RIGHT MODULE</span>
                          </div>
                       </motion.div>

                    </div>

                    {/* Touch Hint / Interaction overlay */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-75">
                       <span className="text-[9px] font-mono text-cyan-300 uppercase tracking-widest animate-pulse font-bold">
                          {isDraggingRef.current ? "Dragging & Tilting Active!" : "👈 Drag anywhere on Board to Tilt / Pour Light 👉"}
                       </span>
                    </div>
                 </div>

                 {/* Workbench Dashboard Controls */}
                 <div className="flex flex-col items-center gap-6 w-full">
                    {/* Precise slider fallback */}
                    <div className="w-full max-w-sm flex flex-col gap-1 text-center bg-zinc-50 border border-black/5 p-4 rounded-3xl">
                       <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                          Manual Slider Adjust: {lightCupAngle}°
                       </span>
                       <input 
                         type="range"
                         min="-45"
                         max="45"
                         value={lightCupAngle}
                         onChange={(e) => {
                           const newAngle = Number(e.target.value);
                           setLightCupAngle(newAngle);
                           if (newAngle < -20) setLightCupPouredLeft(true);
                           if (newAngle > 20) setLightCupPouredRight(true);
                         }}
                         className="w-full h-1.5 bg-gray-200 rounded-lg cursor-pointer accent-cyan-500"
                       />
                       <span className="text-[8px] font-mono text-gray-400 uppercase tracking-widest">
                          Left (Pour Left) ◄ ─── ► Right (Pour Right)
                       </span>
                    </div>

                    {/* Double checkpoint progress visualizer */}
                    <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                       <div className={`p-4 border-2 rounded-2xl flex items-center justify-between text-left transition-all ${lightCupPouredLeft ? 'bg-cyan-50/50 border-cyan-400 text-cyan-700' : 'bg-white border-gray-100 text-gray-400 grayscale'}`}>
                          <div className="flex flex-col">
                             <span className="text-[8px] font-black uppercase tracking-widest leading-none">Tilt Left Cup</span>
                             <span className="text-[10px] font-bold mt-1 text-dark/70">{lightCupPouredLeft ? '✓ COMMITTED' : '⌛ PENDING'}</span>
                          </div>
                          <b className="text-xl">{lightCupPouredLeft ? '💡' : '🌑'}</b>
                       </div>

                       <div className={`p-4 border-2 rounded-2xl flex items-center justify-between text-left transition-all ${lightCupPouredRight ? 'bg-cyan-50/50 border-cyan-400 text-cyan-700' : 'bg-white border-gray-100 text-gray-400 grayscale'}`}>
                          <div className="flex flex-col">
                             <span className="text-[8px] font-black uppercase tracking-widest leading-none">Tilt Right Cup</span>
                             <span className="text-[10px] font-bold mt-1 text-dark/70">{lightCupPouredRight ? '✓ COMMITTED' : '⌛ PENDING'}</span>
                          </div>
                          <b className="text-xl">{lightCupPouredRight ? '💡' : '🌑'}</b>
                       </div>
                    </div>

                    {/* Explanatory text */}
                    <div className="bg-dark/5 p-6 rounded-[32px] text-center border-2 border-black/5 max-w-lg">
                       <p className="font-black text-gray-500 uppercase tracking-widest text-[9px] leading-relaxed">
                          Under the Hood: Tilting closed the copper/mercury-contact switch inside the glass cylinder, signaling the microcontroller through terminal <span className="text-dark">S (Switch Signal)</span>, which instantly triggers the co-integrated <span className="text-dark">LED (Light pin)</span> to project radiant light!
                       </p>
                    </div>

                    {/* Confirm Button */}
                    <div className="flex justify-center mt-2">
                       {isComplete && (
                         <motion.button 
                           initial={{ opacity: 0, scale: 0.8 }}
                           animate={{ opacity: 1, scale: 1 }}
                           onClick={onComplete}
                           className="px-12 py-5 bg-dark text-white rounded-full font-black text-xs uppercase tracking-widest transition-all button-pop flex items-center gap-2 shadow-xl shadow-dark/20 hover:bg-[#06b6d4] hover:shadow-cyan-500/20"
                         >
                           Simulation Verified <Trophy size={16} />
                         </motion.button>
                       )}
                    </div>

                 </div>
              </div>
            ) : moduleId === 'sound-sensor' ? (
              <div className="space-y-12 w-full flex flex-col items-center select-none">
                 {/* Main Sandbox Header with Calibration Progress */}
                 <div className="w-full flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-pink-500">
                    <span className="flex items-center gap-2">
                       <span className="w-2.5 h-2.5 bg-pink-500 rounded-full animate-pulse" />
                       KY-038 ACOUSTIC CLAP DETECTOR
                    </span>
                    <span>CLAP CALIBRATION: {Math.min(100, Math.round((soundClappedCount / 3) * 100))}%</span>
                 </div>

                 {/* Simulated Workbench Block */}
                 <div className="h-[430px] w-full rounded-[48px] border-4 border-dashed border-pink-500/30 bg-radial from-slate-900 via-slate-950 to-black relative flex flex-col items-center justify-center overflow-hidden transition-all shadow-2xl">
                    {/* Perspective Workbench Grid overlay */}
                    <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ec4899_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                    {/* TOP HALF: Hands Clapping Animation Zone */}
                    <div className="relative w-full h-44 flex items-center justify-center max-w-lg mb-4">
                       
                       {/* Left Hand */}
                       <motion.div
                         animate={{ 
                           x: isSoundClapping ? -10 : -130, // Separated when idle, meets perfectly centered when clapped
                           y: isSoundClapping ? -8 : 0,
                           rotate: isSoundClapping ? 25 : -15, // Smooth clap rotation
                           scale: isSoundClapping ? 1.05 : 1
                         }}
                         transition={{ type: "spring", stiffness: 350, damping: 18 }}
                         className="absolute left-1/2 -translate-x-[105%] flex items-center justify-end w-32 h-32 origin-bottom-right"
                       >
                         {/* High-Fidelity standalone 3D Yellow Emoji Hand SVG */}
                         <svg width="112" height="112" viewBox="0 0 120 120" fill="none" className="drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)] filter saturate-125">
                           <defs>
                             <linearGradient id="emojiHandGold" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="0%" stopColor="#FFF275" />
                               <stop offset="60%" stopColor="#FFA600" />
                               <stop offset="100%" stopColor="#D96B00" />
                             </linearGradient>
                           </defs>
                           
                           {/* Palm base plate */}
                           <path 
                             d="M 35,90 C 35,108 55,115 70,115 C 85,115 95,98 95,80 C 95,65 82,58 72,58 C 58,58 50,68 50,78 C 50,78 40,78 35,90 Z" 
                             fill="url(#emojiHandGold)" 
                           />
                           
                           {/* Thumb (curves outwards to the left) */}
                           <path 
                             d="M 36,80 C 16,74 12,58 18,50 C 24,42 32,48 40,56 C 46,62 48,72 46,80 Z" 
                             fill="url(#emojiHandGold)" 
                           />
                           
                           {/* Index Finger */}
                           <path d="M 40,24 C 40,16 52,16 52,24 L 52,65 C 52,69 40,69 40,65 Z" fill="url(#emojiHandGold)" />
                           
                           {/* Middle Finger (tallest) */}
                           <path d="M 54,12 C 54,4 66,4 66,12 L 66,62 C 66,66 54,66 54,62 Z" fill="url(#emojiHandGold)" />

                           {/* Ring Finger */}
                           <path d="M 68,16 C 68,8 80,8 80,16 L 80,65 C 80,69 68,69 68,65 Z" fill="url(#emojiHandGold)" />

                           {/* Pinky Finger */}
                           <path d="M 82,28 C 82,21 93,21 93,28 L 93,72 C 93,76 82,76 82,72 Z" fill="url(#emojiHandGold)" />

                           {/* Separators */}
                           <path 
                             d="M 40,40 L 40,65 M 52.5,35 L 52.5,65 M 66.5,32 L 66.5,65 M 80.5,38 L 80.5,68" 
                             stroke="#C2410C" 
                             strokeWidth="1.2" 
                             strokeLinecap="round" 
                             opacity="0.35" 
                           />

                           {/* Inner Palm crease */}
                           <path 
                             d="M 42,88 C 48,94 62,96 74,90 C 82,86 86,78 86,70" 
                             stroke="#9A3412" 
                             strokeWidth="2.2" 
                             strokeLinecap="round" 
                             opacity="0.25" 
                           />
                         </svg>
                       </motion.div>

                       {/* Floating sparks and emoji-styled sound wave ripples */}
                       <AnimatePresence>
                         {isSoundClapping && (
                           <>
                             {/* Central shockwave circle */}
                             <motion.div 
                               initial={{ scale: 0.1, opacity: 1 }}
                               animate={{ scale: 3.2, opacity: 0 }}
                               exit={{ opacity: 0 }}
                               transition={{ duration: 0.45, ease: "easeOut" }}
                               className="absolute w-24 h-24 rounded-full border-4 border-double border-yellow-400 flex items-center justify-center z-10 pointer-events-none"
                             >
                               <div className="w-12 h-12 rounded-full bg-yellow-400/35 blur-[2px]" />
                             </motion.div>

                             {/* Glowing yellow impact rays from reference emoji */}
                             <motion.div
                               initial={{ scale: 0.4, opacity: 0 }}
                               animate={{ scale: 1.4, opacity: 1, y: -50 }}
                               exit={{ opacity: 0 }}
                               transition={{ duration: 0.3 }}
                               className="absolute flex gap-12 z-20 pointer-events-none"
                             >
                               <span className="text-yellow-400 font-bold text-2xl select-none">⚡</span>
                               <span className="text-yellow-400 font-bold text-2xl select-none">⚡</span>
                             </motion.div>

                             {/* Emoji 3D sparkles */}
                             <motion.div
                               initial={{ scale: 0, opacity: 0, rotate: 0 }}
                               animate={{ scale: [1, 1.5, 1.2], opacity: 1, x: -75, y: -65, rotate: 45 }}
                               exit={{ opacity: 0 }}
                               transition={{ duration: 0.35 }}
                               className="absolute text-yellow-400 text-3xl select-none pointer-events-none drop-shadow-[0_4px_6px_rgba(234,179,8,0.4)]"
                             >
                               ✦
                             </motion.div>

                             <motion.div
                               initial={{ scale: 0, opacity: 0, rotate: 0 }}
                               animate={{ scale: [1, 1.5, 1.2], opacity: 1, x: 75, y: -65, rotate: -45 }}
                               exit={{ opacity: 0 }}
                               transition={{ duration: 0.35 }}
                               className="absolute text-yellow-400 text-3xl select-none pointer-events-none drop-shadow-[0_4px_6px_rgba(234,179,8,0.4)]"
                             >
                               ✦
                             </motion.div>

                             {/* Small accent sparkles */}
                             <motion.div
                               initial={{ scale: 0 }}
                               animate={{ scale: [1, 1.4, 0], x: -30, y: -85 }}
                               transition={{ duration: 0.4 }}
                               className="absolute text-amber-200 text-lg select-none pointer-events-none"
                             >
                               ✧
                             </motion.div>
                             <motion.div
                               initial={{ scale: 0 }}
                               animate={{ scale: [1, 1.4, 0], x: 30, y: -85 }}
                               transition={{ duration: 0.4 }}
                               className="absolute text-amber-200 text-lg select-none pointer-events-none"
                             >
                               ✧
                             </motion.div>
                           </>
                         )}
                       </AnimatePresence>

                       {/* Comic "CLAP!" text splash */}
                       <AnimatePresence>
                         {isSoundClapping && (
                           <motion.div 
                             initial={{ scale: 0.5, y: 15, opacity: 0 }}
                             animate={{ scale: 1.45, y: -25, opacity: 1 }}
                             exit={{ opacity: 0 }}
                             className="absolute bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-black font-black text-[10px] px-3.5 py-1 rounded-xl shadow-[0_4px_12px_rgba(245,158,11,0.5)] border border-yellow-250 z-20 pointer-events-none select-none tracking-widest uppercase"
                           >
                              💥 CLAP!!
                           </motion.div>
                         )}
                       </AnimatePresence>

                       {/* Right Hand */}
                       <motion.div
                         animate={{ 
                           x: isSoundClapping ? 10 : 130, // Symmetrical sliding gap
                           y: isSoundClapping ? -8 : 0,
                           rotate: isSoundClapping ? -25 : 15,
                           scale: isSoundClapping ? 1.05 : 1
                         }}
                         transition={{ type: "spring", stiffness: 350, damping: 18 }}
                         className="absolute right-1/2 translate-x-[105%] flex items-center justify-start w-32 h-32 origin-bottom-left"
                       >
                         {/* Seamlessly mirrored copy of the primary hand geometry for flawless symmetry */}
                         <div className="scale-x-[-1] w-full h-full flex items-center justify-start">
                           <svg width="112" height="112" viewBox="0 0 120 120" fill="none" className="drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)] filter saturate-125">
                             <path 
                               d="M 35,90 C 35,108 55,115 70,115 C 85,115 95,98 95,80 C 95,65 82,58 72,58 C 58,58 50,68 50,78 C 50,78 40,78 35,90 Z" 
                               fill="url(#emojiHandGold)" 
                             />
                             
                             <path 
                               d="M 36,80 C 16,74 12,58 18,50 C 24,42 32,48 40,56 C 46,62 48,72 46,80 Z" 
                               fill="url(#emojiHandGold)" 
                             />
                             
                             <path d="M 40,24 C 40,16 52,16 52,24 L 52,65 C 52,69 40,69 40,65 Z" fill="url(#emojiHandGold)" />
                             <path d="M 54,12 C 54,4 66,4 66,12 L 66,62 C 66,66 54,66 54,62 Z" fill="url(#emojiHandGold)" />
                             <path d="M 68,16 C 68,8 80,8 80,16 L 80,65 C 80,69 68,69 68,65 Z" fill="url(#emojiHandGold)" />
                             <path d="M 82,28 C 82,21 93,21 93,28 L 93,72 C 93,76 82,76 82,72 Z" fill="url(#emojiHandGold)" />

                             <path 
                               d="M 40,40 L 40,65 M 52.5,35 L 52.5,65 M 66.5,32 L 66.5,65 M 80.5,38 L 80.5,68" 
                               stroke="#C2410C" 
                               strokeWidth="1.2" 
                               strokeLinecap="round" 
                               opacity="0.35" 
                             />

                             <path 
                               d="M 42,88 C 48,94 62,96 74,90 C 82,86 86,78 86,70" 
                               stroke="#9A3412" 
                               strokeWidth="2.2" 
                               strokeLinecap="round" 
                               opacity="0.25" 
                             />
                           </svg>
                         </div>
                       </motion.div>

                    </div>
                    
                    
                     {/* BOTTOM HALF: Electronics Components and Breadboard */}
                    <div className="flex gap-16 items-center justify-center relative z-10 scale-90 sm:scale-100">
                       
                       {/* 1. SOUND SENSOR MODULE */}
                       <div className="relative w-40 h-52 flex flex-col items-center">
                          {/* Pins pointing downward */}
                          <div className="absolute -bottom-7 flex gap-1.5 justify-center">
                             <div className="w-1 h-8 bg-gradient-to-b from-gray-400 to-gray-650 rounded-b shadow-sm" />
                             <div className="w-1 h-8 bg-gradient-to-b from-gray-400 to-gray-650 rounded-b shadow-sm" />
                             <div className="w-1 h-8 bg-gradient-to-b from-gray-400 to-gray-650 rounded-b shadow-sm" />
                             <div className="w-1 h-8 bg-gradient-to-b from-gray-400 to-gray-650 rounded-b shadow-sm" />
                          </div>

                          {/* Red PCB container box */}
                          <div className="w-32 h-44 bg-[#991b1b] border-2 border-red-700 rounded-2xl relative shadow-xl overflow-hidden p-3 flex flex-col items-center">
                             {/* Copper Traces */}
                             <div className="absolute inset-x-2 top-8 bottom-8 border border-white/5 pointer-events-none" />
                             <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full border border-red-650" />
                             <div className="absolute top-2 left-2 w-3 h-3 rounded-full border border-red-650" />

                             <div className="absolute top-3 left-3 text-[5.5px] font-mono font-black text-red-300 tracking-wider">
                                KY-038 DETECTOR
                             </div>

                             {/* Condenser Mic Capsule */}
                             <div className="absolute top-8 left-4 flex flex-col items-center">
                                {/* Cylinder wrapper */}
                                <div className="w-10 h-10 bg-gradient-to-b from-zinc-300 via-zinc-400 to-zinc-500 border border-zinc-650 rounded-full flex items-center justify-center shadow-md relative">
                                   {/* Black felt eardrum ring */}
                                   <div className="w-7 h-7 bg-zinc-950 rounded-full flex items-center justify-center border-2 border-zinc-900">
                                      <motion.div 
                                        animate={isSoundClapping ? { scale: [1, 1.3, 1] } : {}}
                                        className="w-4 h-4 rounded-full bg-zinc-900 border border-dashed border-zinc-700" 
                                      />
                                   </div>
                                </div>
                                <span className="text-[5px] font-mono text-white/50 uppercase scale-90 mt-0.5">ACOUSTIC PORT</span>
                             </div>

                             {/* Blue Potentiometer Sensitivity Trimmer screw */}
                             <div className="absolute top-8 right-4 w-9 h-9 bg-sky-600 border border-sky-500 rounded flex items-center justify-center shadow-sm">
                                <div className="w-5 h-5 rounded-full bg-zinc-300 flex items-center justify-center border border-zinc-400">
                                   <div className="w-4 h-1.5 bg-zinc-650 rounded-xs rotate-45" />
                                </div>
                                <div className="absolute bottom-0 right-0 text-[4px] font-bold text-sky-100 scale-75">103</div>
                             </div>

                             {/* LM393 Operational IC driver */}
                             <div className="absolute bottom-12 left-5 w-10.5 h-6 bg-zinc-900 border border-zinc-800 rounded flex flex-col justify-between p-0.5 shadow-sm">
                                <div className="text-[4px] font-mono font-black text-zinc-400 tracking-tighter truncate leading-none">LM393</div>
                                <div className="flex justify-around">
                                   <div className="w-0.5 h-1 bg-zinc-500" />
                                   <div className="w-0.5 h-1 bg-zinc-500" />
                                   <div className="w-0.5 h-1 bg-zinc-500" />
                                </div>
                             </div>

                             {/* Onboard Comparator threshold trigger LED indicator */}
                             <div className="absolute bottom-12 right-6 flex flex-col items-center">
                                <div className="text-[4.5px] font-mono text-white/50 scale-90 mb-0.5">D-OUT</div>
                                <motion.div 
                                  animate={{ 
                                    backgroundColor: isSoundClapping ? "#ec4899" : "#3f1b25",
                                    boxShadow: isSoundClapping ? "0 0 10px #ec4899" : "none"
                                  }}
                                  className="w-2.5 h-2.5 rounded-full border border-black/30"
                                />
                             </div>

                             {/* Base Labels pins */}
                             <div className="absolute bottom-1 flex gap-2.5 text-[5px] font-mono text-zinc-300 font-bold tracking-tighter">
                                <span>A0</span>
                                <span>GND</span>
                                <span>+</span>
                                <span>D0</span>
                             </div>
                          </div>

                          <div className="mt-2 bg-zinc-950/80 backdrop-blur-xs px-2 py-1 rounded-md border border-white/5">
                             <span className="text-[8px] font-mono tracking-widest text-zinc-400">SOUND SENSOR</span>
                          </div>
                       </div>

                       {/* SIGNAL AND POWER RAIL FLOW LINKS */}
                       <div className="flex flex-col items-center gap-1.5">
                          <div className="relative w-16 h-10 border border-dashed border-white/10 rounded-xl flex items-center justify-center bg-slate-950/40">
                             <div className="flex items-center gap-1">
                                <motion.div 
                                  animate={{ 
                                    scale: isSoundClapping ? 1.4 : 1,
                                    borderColor: isSoundClapping ? "#f43f5e" : "rgba(255,255,255,0.15)"
                                  }}
                                  className="w-2.5 h-2.5 rounded-full border bg-pink-500/20" 
                                />
                                <div className="w-6 h-0.5 bg-slate-800 relative overflow-hidden">
                                   <motion.div 
                                     animate={isSoundClapping ? { x: [24, -24] } : { x: 0 }}
                                     transition={{ duration: 0.2 }}
                                     className="absolute inset-y-0 w-3 bg-pink-400"
                                   />
                                </div>
                                <motion.div 
                                  animate={{ 
                                    scale: isSoundClapping ? 1.4 : 1,
                                    borderColor: isSoundClapping ? "#10b981" : "rgba(255,255,255,0.15)"
                                  }}
                                  className="w-2.5 h-2.5 rounded-full border bg-emerald-500/20" 
                                />
                             </div>
                          </div>
                          <span className="text-[6.5px] font-mono text-zinc-500 uppercase tracking-widest leading-none">High Signal</span>
                       </div>

                       {/* 2. ARDUINO-LINKED 5MM HIGH-BRIGHTNESS LED */}
                       <div className="relative w-36 h-52 flex flex-col items-center justify-end">
                          <div className="relative w-28 h-40 bg-[#0f172a] border-2 border-slate-700/80 rounded-2xl p-3 shadow-xl flex flex-col items-center justify-between">
                             <div className="text-[5.5px] font-mono text-slate-400 font-bold uppercase tracking-widest mt-1">D8 ACTION NODE</div>

                             {/* Glass Dome of 5mm breadboard LED */}
                             <div className="relative flex flex-col items-center mt-3">
                                <motion.div 
                                  animate={{ 
                                    backgroundColor: isSoundClapping ? "rgb(236, 72, 153)" : "rgba(30,30,40,0.8)",
                                    borderColor: isSoundClapping ? "rgb(244, 114, 182)" : "rgb(51, 65, 85)",
                                    boxShadow: isSoundClapping 
                                      ? "0 0 35px 8px rgba(236, 72, 153, 0.95), inset 0 3px 4px rgba(255,255,255,0.6)" 
                                      : "inset 0 2px 2px rgba(255,255,255,0.1)"
                                  }}
                                  transition={{ duration: 0.15 }}
                                  className="w-11 h-16 rounded-t-full border-2 flex items-center justify-center relative shadow-inner overflow-hidden"
                                >
                                   {/* Internal Leadframe (Cathode/Anode flags) */}
                                   <div className="absolute bottom-2 flex gap-1 items-end opacity-60">
                                      <div className="w-3 h-5.5 bg-zinc-500 rounded-xs" />
                                      <div className="w-4 h-7 bg-zinc-500 rounded-sm" />
                                   </div>

                                   {/* Aura beam reflection effect */}
                                   <AnimatePresence>
                                     {isSoundClapping && (
                                       <motion.div 
                                         initial={{ opacity: 0, scale: 0.8 }}
                                         animate={{ opacity: 0.35, scale: [1, 1.4, 1.1] }}
                                         exit={{ opacity: 0 }}
                                         className="absolute inset-0 bg-radial from-white to-transparent pointer-events-none"
                                       />
                                     )}
                                   </AnimatePresence>
                                </motion.div>

                                {/* Leads standing down */}
                                <div className="flex gap-4 -mt-0.5 z-0">
                                   <div className="w-0.75 h-14 bg-gradient-to-b from-slate-400 to-slate-500 shadow-sm" />
                                   <div className="w-0.75 h-16 bg-gradient-to-b from-slate-350 to-slate-450 shadow-sm" />
                                </div>
                             </div>

                             {/* Ground resistor onboard */}
                             <div className="text-[5px] font-mono text-zinc-500 text-center leading-tight">
                                220Ω PULL-DOWN RESISTOR
                             </div>
                          </div>

                          <div className="mt-2 bg-zinc-950/80 backdrop-blur-xs px-2 py-1 rounded-md border border-white/5">
                             <span className="text-[8px] font-mono tracking-widest text-zinc-400">TRIGGERED LED</span>
                          </div>
                       </div>

                    </div>

                    {/* Interaction Notice / Quick feedback */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-90">
                       <span className="text-[9px] font-mono text-pink-400 uppercase tracking-widest animate-pulse font-extrabold">
                          {isSoundClapping ? "CRISP CLAP AUDIO ACTIVE // OUTPUT FLAGGED HIGH!" : "👇 CLICK CLAP BUTTON BELOW TO TEST THE MIC SWITCH 👇"}
                       </span>
                    </div>
                 </div>

                 {/* Interactive Cockpit Dashboard panel */}
                 <div className="flex flex-col items-center gap-6 w-full">
                    
                    {/* Tactile Hand Clap Launcher */}
                    <div className="flex flex-col items-center gap-3">
                       <button 
                         disabled={isSoundClapping}
                         onClick={() => {
                           if (isSoundClapping) return;
                           
                           setIsSoundClapping(true);
                           setSoundLevel(100);
                           
                           // Synthesize & emit crisp digital clap audio output!
                           try {
                             const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
                             if (AudioContextClass) {
                               const ctx = new AudioContextClass();
                               const now = ctx.currentTime;
                               [0, 0.015, 0.03].forEach((delay) => {
                                 const osc = ctx.createOscillator();
                                 const gain = ctx.createGain();
                                 
                                 osc.type = 'triangle';
                                 osc.frequency.setValueAtTime(350 - delay * 1000, now + delay);
                                 osc.frequency.exponentialRampToValueAtTime(80, now + delay + 0.04);
                                 
                                 gain.gain.setValueAtTime(0.4, now + delay);
                                 gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.04);
                                 
                                 const filter = ctx.createBiquadFilter();
                                 filter.type = 'bandpass';
                                 filter.frequency.setValueAtTime(1200, now + delay);
                                 filter.Q.setValueAtTime(5, now + delay);
                                 
                                 osc.connect(filter);
                                 filter.connect(gain);
                                 gain.connect(ctx.destination);
                                 
                                 osc.start(now + delay);
                                 osc.stop(now + delay + 0.05);
                               });
                             }
                           } catch (e) {
                             console.log(e);
                           }
                           
                           // Increment Calibration checks
                           setSoundClappedCount(prev => {
                             const next = Math.min(3, prev + 1);
                             if (next >= 3) {
                               // Synchronize game engine score
                               setScore(100);
                             }
                             return next;
                           });

                           // Auto-decay and return hands
                           setTimeout(() => {
                             setIsSoundClapping(false);
                             setSoundLevel(30);
                           }, 350);
                         }}
                         className="px-12 py-5 bg-gradient-to-r from-pink-600 via-rose-600 to-pink-500 text-white rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-pink-600/30 hover:scale-103 hover:shadow-pink-400/30 disabled:opacity-80 active:translate-y-0.5 flex items-center gap-2 cursor-pointer"
                       >
                          👏 TRIGGER CRISP CLAP SOUND
                       </button>
                    </div>

                    {/* Progress checkpoints indicators */}
                    <div className="flex flex-col gap-1.5 text-center bg-zinc-50 border border-black/5 p-4 rounded-3xl w-full max-w-sm">
                       <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">
                          Acoustic Level Indicator: {soundLevel} dB
                       </span>
                       <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden relative">
                          <motion.div 
                            animate={{ width: `${soundLevel}%` }}
                            transition={{ type: "spring", stiffness: 100 }}
                            className="h-full bg-gradient-to-r from-pink-400 to-rose-500"
                          />
                       </div>
                       
                       {/* 3 Steps validation checklist */}
                       <div className="flex justify-between mt-3 px-1">
                          {[1, 2, 3].map((step) => {
                             const isChecked = soundClappedCount >= step;
                             return (
                               <div key={step} className="flex items-center gap-1.5 animate-pulse">
                                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center text-[8px] font-black transition-all ${
                                    isChecked ? 'bg-pink-500 border-pink-400 text-white shadow-md animate-bounce' : 'bg-gray-100 border-gray-300 text-gray-400'
                                  }`}>
                                     {isChecked ? '✓' : step}
                                  </div>
                                  <span className="text-[8px] font-mono text-gray-500 tracking-wider">CLAP {step}</span>
                               </div>
                             );
                          })}
                       </div>
                    </div>

                    {/* Science & MCU Code breakdown label */}
                    <div className="bg-dark/5 p-6 rounded-[32px] text-center border-2 border-black/5 max-w-lg">
                       <p className="font-semibold text-gray-500 uppercase tracking-wider text-[9px] leading-relaxed">
                          Under the Hood: Hand impact acoustic waves compress the membrane inside the <span className="text-dark font-mono">Microphone Capsule</span>, sending an electric peak past the LM393 comparator's gate limit. Pin <span className="text-dark font-mono">D0 (Digital Output)</span> goes <span className="text-pink-600 font-bold">HIGH</span>, instantly triggering Arduino Pin <span className="text-dark font-mono">D8 (LED)</span> to fire bright neon glow!
                       </p>
                    </div>

                    {/* Confirm completion button when verified */}
                    <div className="flex justify-center mt-2">
                       {isComplete && (
                         <motion.button 
                           initial={{ opacity: 0, scale: 0.8 }}
                           animate={{ opacity: 1, scale: 1 }}
                           onClick={onComplete}
                           className="px-12 py-5 bg-dark text-white rounded-full font-black text-xs uppercase tracking-widest transition-all button-pop flex items-center gap-2 shadow-xl shadow-dark/20 hover:bg-[#ec4899] hover:shadow-pink-500/20"
                         >
                           Simulation Verified <Trophy size={16} />
                         </motion.button>
                       )}
                    </div>

                 </div>
              </div>
            ) : moduleId === 'heartbeat' ? (
              <div className="space-y-12 w-full flex flex-col items-center select-none">
                 {/* Main Sandbox Header with Calibration Progress */}
                 <div className="w-full flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-red-500">
                    <span className="flex items-center gap-2">
                       <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                       PPG BIOMETRIC PULSE SENSOR LABORATORY
                    </span>
                    <span>CALIBRATION SCANNING: {score}%</span>
                 </div>

                 {/* Simulated Workbench Block */}
                 <div className="h-[430px] w-full rounded-[48px] border-4 border-dashed border-red-500/30 bg-gradient-to-b from-stone-900 via-stone-950 to-black relative flex flex-col items-center justify-center overflow-hidden transition-all shadow-2xl">
                    {/* Perspective Workbench Grid overlay */}
                    <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ef4444_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                    {/* TOP HALF: Cardiac Waveform and Heart Beat Animation Zone */}
                    <div className="relative w-full h-44 flex items-center justify-between max-w-xl px-12 z-10">
                       
                       {/* Left Zone: Beating Heart Visualizer */}
                       <div className="relative flex flex-col items-center justify-center w-40 h-40">
                         {/* Visual pulses */}
                         <AnimatePresence>
                           {ecgPulseActive && (
                             <motion.div 
                               initial={{ scale: 0.8, opacity: 0.8 }}
                               animate={{ scale: 1.8, opacity: 0 }}
                               exit={{ opacity: 0 }}
                               transition={{ duration: 0.6 }}
                               className="absolute w-24 h-24 bg-red-500/20 rounded-full blur-md"
                             />
                           )}
                         </AnimatePresence>
                         
                         <motion.div
                           animate={ecgPulseActive ? { scale: [1, 1.4, 0.95, 1.1, 1] } : { scale: 1 }}
                           transition={{ duration: 0.4 }}
                           className="text-7xl drop-shadow-[0_0_20px_rgba(239,68,68,0.6)] cursor-pointer"
                         >
                           ❤️
                         </motion.div>
                         <span className="text-[10px] font-mono text-zinc-400 mt-2 font-black tracking-widest uppercase">
                           {fingerPlaced ? `${heartBPM} BPM` : "NO SIGNAL"}
                         </span>
                       </div>

                       {/* Right Zone: Green Cathode-Ray Oscilloscope Tube showing PQRST lines */}
                       <div className="flex-1 h-36 bg-black border-2 border-zinc-800 rounded-2xl relative shadow-inner overflow-hidden p-3 flex flex-col justify-between">
                         {/* CRT Grid Overlay */}
                         <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.08)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
                         <div className="absolute inset-0 bg-radial from-transparent to-green-950/20 pointer-events-none" />
                         
                         <span className="text-[6.5px] font-mono text-emerald-500/80 uppercase tracking-widest font-black">
                           CH-01: BIOMETRIC_AMPLIFIED_SIGNAL
                         </span>

                         {/* SVG ECG Wave Line */}
                         <div className="w-full h-20 relative">
                           {fingerPlaced ? (
                             <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                               <defs>
                                 <linearGradient id="ecgGlow" x1="0" y1="0" x2="1" y2="0">
                                   <stop offset="0%" stopColor="#22c55e" />
                                   <stop offset="100%" stopColor="#10b981" />
                                 </linearGradient>
                               </defs>
                               {/* Standard PQRST periodic waveform */}
                               <motion.path
                                 d="M 0,50 L 50,50 L 60,40 L 70,50 L 80,50 L 90,85 L 100,10 L 110,65 L 120,50 L 140,50 L 150,45 L 160,50 L 170,50 L 210,50 L 220,40 L 230,50 L 240,50 L 250,85 L 260,10 L 270,65 L 280,50 L 300,50 L 310,45 L 320,50 L 330,50 L 370,50 L 380,40 L 390,50 L 400,50"
                                 fill="none"
                                 stroke="url(#ecgGlow)"
                                 strokeWidth="3.5"
                                 strokeLinecap="round"
                                 strokeDasharray="400"
                                 strokeDashoffset={-ecgPathOffset}
                               />
                             </svg>
                           ) : (
                             // Horizontal flatline with subtle jitter
                             <div className="absolute inset-y-1/2 left-0 right-0 h-1 bg-zinc-850 animate-pulse" />
                           )}
                         </div>

                         <div className="flex justify-between items-center text-[6px] font-mono text-emerald-500/60 font-black">
                           <span>SCAN SPEED: 25mm/s</span>
                           <span className="animate-pulse">{fingerPlaced ? "SIGNAL: SOLID 100%" : "SIGNAL: DISCONNECTED"}</span>
                         </div>
                       </div>

                    </div>
                    
                    {/* BOTTOM HALF: Hardware Components & Finger Placement Area */}
                    <div className="flex gap-12 items-center justify-center relative z-10 scale-90 sm:scale-100">
                       
                       {/* 1. HEARTBEAT PULSE SENSOR BOARD */}
                       <div className="relative w-40 h-52 flex flex-col items-center justify-end">
                          {/* Pins pointing downward */}
                          <div className="absolute -bottom-7 flex gap-1.5 justify-center">
                             <div className="w-1 h-8 bg-gradient-to-b from-gray-400 to-gray-650 rounded-b shadow-sm" />
                             <div className="w-1 h-8 bg-gradient-to-b from-gray-400 to-gray-650 rounded-b shadow-sm" />
                             <div className="w-1 h-8 bg-gradient-to-b from-gray-400 to-gray-650 rounded-b shadow-sm" />
                          </div>

                          {/* Pulsing bio pad board layout */}
                          <div className="w-32 h-44 bg-purple-950/80 border-2 border-purple-500/60 rounded-3xl relative shadow-xl overflow-hidden p-3 flex flex-col items-center">
                             <div className="absolute inset-2 border border-purple-500/10 rounded-2xl pointer-events-none" />
                             
                             <div className="text-[5px] font-mono text-purple-300 font-black text-center tracking-wider leading-none absolute top-3">
                               PULSE_BIOMETRICS v1.0
                             </div>

                             {/* Biometric Glass Contact Lens Pad */}
                             <div 
                               onClick={() => setFingerPlaced(!fingerPlaced)}
                               className="relative w-20 h-20 rounded-full bg-zinc-950 border-4 border-zinc-800 flex items-center justify-center shadow-inner cursor-pointer hover:border-red-500/50 transition-all group mt-6"
                             >
                               {/* Inner green emitter led */}
                               <motion.div 
                                 animate={{
                                   backgroundColor: fingerPlaced ? "rgba(34, 197, 94, 0.95)" : "rgba(34, 197, 94, 0.15)",
                                   boxShadow: fingerPlaced ? "0 0 16px 4px rgba(34, 197, 94, 0.85)" : "none"
                                 }}
                                 className="w-8 h-8 rounded-full border border-green-500 flex items-center justify-center text-xs"
                               >
                                 🟢
                               </motion.div>

                               {/* Circular glowing outline */}
                               <div className="absolute inset-0 rounded-full border border-dashed border-red-500/20 group-hover:border-red-500/40 animate-[spin_10s_linear_infinite]" />

                               {/* Floating Finger Overlay */}
                               <AnimatePresence>
                                 {fingerPlaced && (
                                   <motion.div 
                                     initial={{ scale: 0.8, opacity: 0, y: 15 }}
                                     animate={{ scale: 1.05, opacity: 0.85, y: 0 }}
                                     exit={{ scale: 0.8, opacity: 0, y: 15 }}
                                     className="absolute text-5xl select-none"
                                   >
                                     👆
                                   </motion.div>
                                 )}
                               </AnimatePresence>
                             </div>

                             {/* AO Signal circuit amplifier */}
                             <div className="absolute bottom-10 left-4 flex flex-col gap-0.5">
                               <div className="w-5 h-3 bg-zinc-800 rounded-xs" />
                               <span className="text-[4px] font-mono text-zinc-500">AMP_IC</span>
                             </div>

                             {/* Active Pulse indicator LED */}
                             <div className="absolute bottom-10 right-5 flex flex-col items-center">
                               <span className="text-[4px] font-mono text-zinc-500">OUT LED</span>
                               <motion.div 
                                 animate={{
                                   backgroundColor: ecgPulseActive ? "#ef4444" : "#451a1a",
                                   boxShadow: ecgPulseActive ? "0 0 10px #ef4444" : "none"
                                 }}
                                 className="w-2.5 h-2.5 rounded-full border border-black/40"
                               />
                             </div>

                             {/* Pin Labels */}
                             <div className="absolute bottom-1.5 flex gap-4 text-[5px] font-mono text-zinc-300 font-bold tracking-tight">
                                <span>S (A0)</span>
                                <span>- (GND)</span>
                                <span>+ (VCC)</span>
                             </div>
                          </div>

                          <div className="mt-2 bg-zinc-950/80 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/5">
                             <span className="text-[8px] font-mono tracking-widest text-zinc-400">PULSE SENSOR</span>
                          </div>
                       </div>

                       {/* SIGNAL AND POWER RAIL FLOW LINKS */}
                       <div className="flex flex-col items-center gap-1.5">
                          <div className="relative w-16 h-10 border border-dashed border-white/10 rounded-xl flex items-center justify-center bg-stone-950/40">
                             <div className="flex items-center gap-1">
                                <motion.div 
                                  animate={{ 
                                    scale: fingerPlaced ? 1.4 : 1,
                                    borderColor: fingerPlaced ? "#ef4444" : "rgba(255,255,255,0.15)"
                                  }}
                                  className="w-2.5 h-2.5 rounded-full border bg-red-500/20" 
                                />
                                <div className="w-6 h-0.5 bg-zinc-805 relative overflow-hidden">
                                   <motion.div 
                                     animate={fingerPlaced ? { x: [24, -24] } : { x: 0 }}
                                     transition={{ duration: 0.2 }}
                                     className="absolute inset-y-0 w-3 bg-red-400"
                                   />
                                </div>
                                <motion.div 
                                  animate={{ 
                                    scale: ecgPulseActive ? 1.4 : 1,
                                    borderColor: ecgPulseActive ? "#10b981" : "rgba(255,255,255,0.15)"
                                  }}
                                  className="w-2.5 h-2.5 rounded-full border bg-emerald-500/20" 
                                />
                             </div>
                          </div>
                          <span className="text-[6.5px] font-mono text-zinc-500 uppercase tracking-widest leading-none">BIOMETRIC SIGNAL</span>
                       </div>

                       {/* 2. ARDUINO-LINKED Pin D13 INDICATOR LED */}
                       <div className="relative w-36 h-52 flex flex-col items-center justify-end">
                          <div className="relative w-28 h-40 bg-[#0f172a] border-2 border-slate-700/80 rounded-2xl p-3 shadow-xl flex flex-col items-center justify-between">
                             <div className="text-[5.5px] font-mono text-slate-400 font-bold uppercase tracking-widest mt-1">D13 BUILT-IN LED</div>

                             {/* Glass Dome LED */}
                             <div className="relative flex flex-col items-center mt-3">
                                <motion.div 
                                  animate={{ 
                                    backgroundColor: ecgPulseActive ? "rgb(239, 68, 68)" : "rgba(30,30,40,0.8)",
                                    borderColor: ecgPulseActive ? "rgb(248, 113, 113)" : "rgb(51, 65, 85)",
                                    boxShadow: ecgPulseActive 
                                      ? "0 0 35px 8px rgba(239, 68, 68, 0.95), inset 0 3px 4px rgba(255,255,255,0.6)" 
                                      : "inset 0 2px 2px rgba(255,255,255,0.1)"
                                  }}
                                  transition={{ duration: 0.15 }}
                                  className="w-11 h-16 rounded-t-full border-2 flex items-center justify-center relative shadow-inner overflow-hidden"
                                >
                                   <div className="absolute bottom-2 flex gap-1 items-end opacity-60">
                                      <div className="w-3 h-5.5 bg-zinc-500 rounded-xs" />
                                      <div className="w-4 h-7 bg-zinc-500 rounded-sm" />
                                   </div>
                                </motion.div>

                                {/* Leads standing down */}
                                <div className="flex gap-4 -mt-0.5 z-0">
                                   <div className="w-0.75 h-14 bg-gradient-to-b from-slate-400 to-slate-500 shadow-sm" />
                                   <div className="w-0.75 h-16 bg-gradient-to-b from-slate-350 to-slate-450 shadow-sm" />
                                </div>
                             </div>

                             <div className="text-[5px] font-mono text-zinc-500 text-center leading-tight">
                                LED CORRESPONDS TO PULSE
                             </div>
                          </div>

                          <div className="mt-2 bg-zinc-950/80 backdrop-blur-xs px-2 py-1 rounded-md border border-white/5">
                             <span className="text-[8px] font-mono tracking-widest text-zinc-400">STATUS LED</span>
                          </div>
                       </div>

                    </div>

                    {/* Interaction Notice / Quick feedback */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-90">
                       <span className="text-[9px] font-mono text-red-500 uppercase tracking-widest animate-pulse font-extrabold text-center">
                          {fingerPlaced ? "💓 BIOMETRIC READING COMMENCING // REMAIN STILL!" : "👉 TOUCH SENSOR PAD OR BUTTON BELOW TO DETECT HEARTBEAT 👈"}
                       </span>
                    </div>
                 </div>

                 {/* Interactive Cockpit Dashboard panel */}
                 <div className="flex flex-col items-center gap-6 w-full">
                    
                    {/* Tactile finger click launcher */}
                    <div className="flex flex-col items-center gap-3">
                       <button 
                         onClick={() => setFingerPlaced(!fingerPlaced)}
                         className={`px-12 py-5 text-white rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl hover:scale-103 active:translate-y-0.5 flex items-center gap-2 cursor-pointer ${
                           fingerPlaced 
                             ? "bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-700 shadow-zinc-800/30 font-bold" 
                             : "bg-gradient-to-r from-red-650 via-rose-600 to-red-500 shadow-red-600/30 hover:shadow-red-500/40"
                         }`}
                       >
                          {fingerPlaced ? "🤚 LIFT FINGERTIP OFF SENSOR" : "👆 PLACE FINGERTIP ON BIOMETRIC SENSOR"}
                       </button>
                    </div>

                    {/* Progress checkpoints indicators */}
                    <div className="flex flex-col gap-1.5 text-center bg-zinc-50 border border-black/5 p-4 rounded-3xl w-full max-w-sm">
                       <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">
                          Pulse Calibration Progress: {score}% ({detectedBeats}/10 Beats Detected)
                       </span>
                       <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden relative">
                          <motion.div 
                            animate={{ width: `${score}%` }}
                            transition={{ type: "spring", stiffness: 100 }}
                            className="h-full bg-gradient-to-r from-red-400 to-rose-500"
                          />
                       </div>
                       
                       {/* Steps validation checklist progress */}
                       <div className="flex justify-between mt-3 px-1">
                          {[2, 4, 6, 8, 10].map((step) => {
                             const isChecked = detectedBeats >= step;
                             return (
                               <div key={step} className="flex items-center gap-1.5 animate-pulse">
                                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center text-[8px] font-black transition-all ${
                                    isChecked ? 'bg-red-500 border-red-400 text-white shadow-md animate-bounce' : 'bg-gray-100 border-gray-300 text-gray-400'
                                  }`}>
                                     {isChecked ? '✓' : step}
                                  </div>
                                  <span className="text-[8px] font-mono text-gray-500 tracking-wider">{step} BEATS</span>
                                </div>
                             );
                          })}
                       </div>
                    </div>

                    {/* Science & MCU Code breakdown label */}
                    <div className="bg-dark/5 p-6 rounded-[32px] text-center border-2 border-black/5 max-w-lg">
                       <p className="font-semibold text-gray-500 uppercase tracking-wider text-[9px] leading-relaxed">
                          Under the Hood: The Kingbright LED projects green light. As blood waves surge through your finger's microcapillaries, light absorption changes dynamically. The APDS-9008 Photodiode captures reflections, translating changes into analog levels on pin <span className="text-dark font-mono">A0</span>. The Arduino maps thresholds to fire built-in LED pin <span className="text-dark font-mono">D13</span> in perfect cardiac synchrony!
                       </p>
                    </div>

                    {/* Confirm completion button when verified */}
                    <div className="flex justify-center mt-2">
                       {isComplete && (
                         <motion.button 
                           initial={{ opacity: 0, scale: 0.8 }}
                           animate={{ opacity: 1, scale: 1 }}
                           onClick={onComplete}
                           className="px-12 py-5 bg-dark text-white rounded-full font-black text-xs uppercase tracking-widest transition-all button-pop flex items-center gap-2 shadow-xl shadow-dark/20 hover:bg-[#ef4444] hover:shadow-red-500/20"
                         >
                           Simulation Verified <Trophy size={16} />
                         </motion.button>
                       )}
                    </div>

                 </div>
              </div>
            ) : moduleId === 'laser' ? (
               <div className="space-y-8 w-full flex flex-col items-center select-none pb-6">
                  {/* Title Header Bar */}
                  <div className="w-full flex flex-col sm:flex-row justify-between items-center bg-stone-900 border border-red-500/20 px-6 py-4 rounded-3xl text-xs gap-3">
                     <span className="flex items-center gap-2 font-black uppercase tracking-widest text-red-500 font-mono">
                        <span className={`w-3 h-3 rounded-full ${laserArmed ? "bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]" : "bg-stone-700"}`} />
                        HIMALAYAN HOME SECURITY TRIPWIRE SIMULATOR (3D DIORAMA)
                     </span>
                     <span className="font-mono text-[10px] font-bold text-stone-400 bg-stone-950 px-3 py-1.5 rounded-full border border-white/5">
                        LDR PHOTORESISTOR (A0): <span className={isLdrBlocked ? "text-red-500 font-black animate-pulse" : "text-emerald-400 font-black"}>{isLdrBlocked ? "114 Ω (BLOCKED!)" : "1023 Ω (LIGHT OK)"}</span>
                     </span>
                  </div>

                  {/* 3D Simulation Workbench / Diorama Stage */}
                  <div className="relative w-full h-[410px] rounded-[36px] bg-gradient-to-b from-stone-900 via-stone-950 to-amber-950/20 overflow-hidden shadow-2xl border-4 border-double border-red-500/20">
                     {/* Night Sky Stars */}
                     <div className="absolute inset-x-0 top-0 h-44 pointer-events-none opacity-40">
                        {Array.from({ length: 15 }).map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{ duration: 1.5 + (i % 3), repeat: Infinity, ease: "linear", delay: i * 0.2 }}
                            className="absolute w-1 h-1 bg-white rounded-full"
                            style={{
                              left: `${(i * 7) + 3}%`,
                              top: `${(i * 11) % 110 + 10}px`
                            }}
                          />
                        ))}
                     </div>

                     {/* Distant mountains backdrop */}
                     <svg className="absolute bottom-16 left-0 w-full h-32 opacity-20 pointer-events-none" viewBox="0 0 500 100" preserveAspectRatio="none">
                       <polygon points="0,100 80,40 160,80 240,20 320,70 400,30 500,100" fill="#292524" />
                     </svg>

                     {/* Main Interactive Stage Stage (Relative) */}
                     <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-12">
                        
                        {/* 3D Traditional House Gate Frame */}
                        <div className="relative w-[340px] h-[250px] mb-4">
                           {/* Intricate Himalayan/Bhutanese Portal Gate SVG */}
                           <svg className="absolute inset-0 w-full h-full filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]" viewBox="0 0 340 250">
                             <defs>
                               {/* Color Gradients */}
                               <linearGradient id="wall3d" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="0%" stopColor="#fffbfa"/>
                                 <stop offset="100%" stopColor="#eae5de"/>
                               </linearGradient>
                               <linearGradient id="columnsGrad" x1="0" y1="0" x2="1" y2="0">
                                 <stop offset="0%" stopColor="#4c0d0a"/>
                                 <stop offset="35%" stopColor="#7c1512"/>
                                 <stop offset="65%" stopColor="#7c1512"/>
                                 <stop offset="100%" stopColor="#3f0806"/>
                               </linearGradient>
                               <linearGradient id="doorSlab" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="0%" stopColor="#991b1b"/>
                                 <stop offset="100%" stopColor="#5f1111"/>
                               </linearGradient>
                               <filter id="laserBeamGlow">
                                 <feGaussianBlur stdDeviation="4" result="blur" />
                                 <feMerge>
                                   <feMergeNode in="blur" />
                                   <feMergeNode in="SourceGraphic" />
                                 </feMerge>
                               </filter>
                             </defs>

                             {/* Wall frame block */}
                             <rect x="50" y="45" width="240" height="195" fill="url(#wall3d)" stroke="#dcd7cd" strokeWidth="2" rx="4" />

                             {/* Base step slabs (3D Stacking) */}
                             <rect x="35" y="234" width="270" height="12" fill="#78716c" rx="2" />
                             <rect x="42" y="240" width="256" height="10" fill="#44403c" rx="1" />

                             {/* Symmetrical traditional windows with golden pane borders */}
                             {/* Left Window (Gego) */}
                             <rect x="72" y="105" width="36" height="60" fill="#1e293b" rx="2" stroke="#4c0d0a" strokeWidth="3" />
                             <line x1="90" y1="105" x2="90" y2="165" stroke="#fbbf24" strokeWidth="1" />
                             <line x1="72" y1="125" x2="108" y2="125" stroke="#fbbf24" strokeWidth="1" />
                             <line x1="72" y1="145" x2="108" y2="145" stroke="#fbbf24" strokeWidth="1" />
                             {/* Cozy window grid illumination glow under night */}
                             <rect x="74" y="107" width="14" height="16" fill="#fbbf24" opacity="0.15" />
                             <rect x="92" y="127" width="14" height="16" fill="#fbbf24" opacity="0.15" />

                             {/* Right Window (Gego) */}
                             <rect x="232" y="105" width="36" height="60" fill="#1e293b" rx="2" stroke="#4c0d0a" strokeWidth="3" />
                             <line x1="250" y1="105" x2="250" y2="165" stroke="#fbbf24" strokeWidth="1" />
                             <line x1="232" y1="125" x2="268" y2="125" stroke="#fbbf24" strokeWidth="1" />
                             <line x1="232" y1="145" x2="268" y2="145" stroke="#fbbf24" strokeWidth="1" />
                             <rect x="252" y="107" width="14" height="16" fill="#fbbf24" opacity="0.15" />
                             <rect x="234" y="127" width="14" height="16" fill="#fbbf24" opacity="0.15" />

                             {/* Deep Recessed Door opening */}
                             <rect x="130" y="120" width="80" height="114" fill="#290705" rx="3" />

                             {/* Traditional Double Door Facade */}
                             {/* Left Gate swing */}
                             <rect x="132" y="122" width="37" height="112" fill="url(#doorSlab)" stroke="#ea580c" strokeWidth="1.5" />
                             <circle cx="162" cy="175" r="3.5" fill="#facc15" stroke="#b45309" strokeWidth="1" />
                             <line x1="135" y1="150" x2="165" y2="150" stroke="#facc15" opacity="0.3" />
                             <line x1="135" y1="190" x2="165" y2="190" stroke="#facc15" opacity="0.3" />

                             {/* Right Gate swing */}
                             <rect x="171" y="122" width="37" height="112" fill="url(#doorSlab)" stroke="#ea580c" strokeWidth="1.5" />
                             <circle cx="178" cy="175" r="3.5" fill="#facc15" stroke="#b45309" strokeWidth="1" />
                             <line x1="175" y1="150" x2="205" y2="150" stroke="#facc15" opacity="0.3" />
                             <line x1="175" y1="190" x2="205" y2="190" stroke="#facc15" opacity="0.3" />

                             {/* Intricate Pillars (Kachhen) */}
                             <rect x="116" y="65" width="14" height="170" fill="url(#columnsGrad)" />
                             <rect x="210" y="65" width="14" height="170" fill="url(#columnsGrad)" />
                             {/* Pillar decorative golden rims */}
                             <rect x="116" y="85" width="14" height="3" fill="#fbbf24" />
                             <rect x="116" y="215" width="14" height="3" fill="#fbbf24" />
                             <rect x="210" y="85" width="14" height="3" fill="#fbbf24" />
                             <rect x="210" y="215" width="14" height="3" fill="#fbbf24" />

                             {/* Massive multi-tiered roof and brackets eaves (The core look of the uploaded image) */}
                             {/* Tier 1 support board */}
                             <rect x="40" y="55" width="260" height="12" fill="#451a03" stroke="#f97316" strokeWidth="1" />
                             {/* Infinite symbol / geometric knot badges (Srivatsa) */}
                             <rect x="55" y="57" width="8" height="8" fill="#eab308" rx="1" />
                             <rect x="110" y="57" width="8" height="8" fill="#eab308" rx="1" />
                             <rect x="165" y="57" width="8" height="8" fill="#eab308" rx="1" />
                             <rect x="220" y="57" width="8" height="8" fill="#eab308" rx="1" />
                             <rect x="275" y="57" width="8" height="8" fill="#eab308" rx="1" />

                             {/* Tier 2 bracket block */}
                             <path d="M30,55 L50,30 L290,30 L310,55 Z" fill="#7c2d12" stroke="#1e1b18" strokeWidth="1.5" />
                             {/* Auspicious wheel motifs */}
                             <circle cx="100" cy="42" r="6" fill="#fbbf24" stroke="#c2410c" strokeWidth="1" />
                             <circle cx="170" cy="42" r="6" fill="#fbbf24" stroke="#c2410c" strokeWidth="1" />
                             <circle cx="240" cy="42" r="6" fill="#fbbf24" stroke="#c2410c" strokeWidth="1" />

                             {/* Traditional tile layered pagoda roof shroud */}
                             <path d="M15,30 L35,12 L305,12 L325,30 Z" fill="#1c1917" stroke="#44403c" strokeWidth="2.5" />
                             {/* Central peak temple golden apex (Ganjira spire symbol) */}
                             <path d="M162,12 L170,-2 L178,12 Z" fill="#fbbf24" stroke="#ea580c" strokeWidth="1" />
                             <circle cx="170" cy="-4" r="3.5" fill="#facc15" />

                             {/* Miniature siren lamps on top corners */}
                             <g className={sirenActive ? "animate-pulse" : ""}>
                               <rect x="45" y="20" width="10" height="10" fill="#44403c" rx="1" />
                               <circle cx="50" cy="16" r="5" fill={sirenActive ? "#ef4444" : "#7f1d1d"} stroke={sirenActive ? "#fca5a5" : "none"} strokeWidth="1" />
                               <rect x="285" y="20" width="10" height="10" fill="#44403c" rx="1" />
                               <circle cx="290" cy="16" r="5" fill={sirenActive ? "#ef4444" : "#7f1d1d"} stroke={sirenActive ? "#fca5a5" : "none"} strokeWidth="1" />
                             </g>

                             {/* Laser Hardware components mounted on gates */}
                             {/* KY-008 Mount left */}
                             <rect x="110" y="172" width="16" height="18" fill="#1e293b" rx="2" />
                             <rect x="122" y="177" width="10" height="8" fill="#eab308" rx="1" />
                             <circle cx="128" cy="181" r="2" fill={laserArmed ? "#f43f5e" : "#52525b"} />

                             {/* LDR Detector Mount right */}
                             <rect x="214" y="172" width="16" height="18" fill="#1e293b" rx="2" />
                             <circle cx="218" cy="181" r="3.5" fill="#3f3f46" stroke="#52525b" />
                             {/* Dual wave lines for photoresistor sensor */}
                             <path d="M216,181 Q218,179 220,181" stroke="#ea580c" strokeWidth="0.8" fill="none" />
                             <circle cx="225" cy="181" r="2" fill={laserArmed && !isLdrBlocked ? "#22c55e" : "#ef4444"} className={laserArmed && !isLdrBlocked ? "animate-ping" : ""} />

                             {/* Background Laser line path */}
                             {laserArmed && (
                               <g>
                                 <line 
                                   x1="128" 
                                   y1="181" 
                                   x2={isLdrBlocked ? Math.max(130, thiefPos * 3.4) : 214} 
                                   y2="181" 
                                   stroke="rgba(239, 68, 68, 0.3)" 
                                   strokeWidth="4" 
                                   strokeLinecap="round" 
                                 />
                               </g>
                             )}
                           </svg>

                           {/* Interactive Piezo Buzzer Component (Renders alongside the wall) */}
                           <div className="absolute right-0 top-32 flex flex-col items-center">
                             <motion.div 
                               animate={sirenActive ? { scale: [1, 1.2, 1], rotate: [-4, 4, -4] } : { scale: 1, rotate: 0 }}
                               transition={{ duration: 0.15, repeat: Infinity }}
                               className={`w-10 h-10 rounded-full flex flex-col items-center justify-center text-[8px] font-black tracking-tighter cursor-pointer ${
                                 sirenActive ? "bg-red-500 text-white shadow-[0_0_15px_#f43f5e] border-2 border-red-300" : "bg-stone-800 text-stone-400 border border-stone-700"
                               }`}
                             >
                               <span>BUZZ</span>
                               <span>🔊</span>
                             </motion.div>
                             {sirenActive && (
                               <div className="flex gap-1 mt-1">
                                 <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                                 <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping delay-75" />
                                 <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping delay-150" />
                                </div>
                             )}
                           </div>

                           {/* ================= CHARACTERS OVERLAY LAYER (Centered in 340px area!) ================= */}
                           
                           {/* 1. SNEAKY THIEF (Raccoon Rogue) */}
                           <motion.div 
                             className="absolute h-18 w-14 z-20 pointer-events-none"
                             style={{
                               left: `${thiefPos}%`,
                               bottom: '22px',
                               transform: 'translateX(-50%)'
                             }}
                             animate={laserSimState === 'sneaking' ? { y: [0, -6, 0] } : (laserSimState === 'triggered' ? { x: [-2, 2, -2] } : { y: 0 })}
                             transition={laserSimState === 'sneaking' ? { duration: 0.4, repeat: Infinity, ease: 'easeInOut' } : (laserSimState === 'triggered' ? { duration: 0.1, repeat: Infinity } : { duration: 0.3 })}
                           >
                             <div className="relative w-full h-full flex flex-col items-center">
                                {/* Alert badge over head */}
                                {laserSimState === 'triggered' && (
                                  <motion.div 
                                    initial={{ scale: 0, y: 10 }}
                                    animate={{ scale: 1.3, y: -18 }}
                                    className="absolute bg-red-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-md border border-red-350 shadow-md animate-bounce whitespace-nowrap"
                                  >
                                    ‼️ DETECTED
                                  </motion.div>
                                )}
                                {laserSimState === 'arrested' && (
                                  <motion.div 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1.1, y: -16 }}
                                    className="absolute bg-stone-900 text-yellow-400 text-[7px] font-black px-1.5 py-0.5 rounded-md border border-yellow-500 shadow-lg whitespace-nowrap"
                                  >
                                    😵 CAPTURED!
                                  </motion.div>
                                )}

                                {/* Swag bag */}
                                <div className="absolute -left-3 top-2 w-7 h-7 rounded-full bg-amber-850 border-2 border-amber-950 flex items-center justify-center text-[7px] font-sans font-extrabold text-stone-200 rotate-12 shadow-sm">
                                  CHIP
                                </div>

                                {/* Thief body (Striped shirt) */}
                                <div className="w-11 h-11 rounded-2xl bg-gradient-to-b from-stone-850 via-stone-700 to-stone-900 border-2 border-stone-955 flex flex-col items-center justify-items-start relative overflow-hidden shadow-inner mt-2">
                                  {/* Horizontal white stripes */}
                                  <div className="w-full h-1 bg-white absolute top-4 opacity-50" />
                                  <div className="w-full h-1 bg-white absolute top-7 opacity-50" />

                                  {/* Mask & Eyes */}
                                  <div className="w-full h-3 bg-stone-950 flex items-center justify-around px-1 mt-1 border-y border-stone-955">
                                    {laserSimState === 'arrested' ? (
                                      <>
                                        <span className="text-[7px] text-yellow-300 font-bold">X</span>
                                        <span className="text-[7px] text-yellow-300 font-bold">X</span>
                                      </>
                                    ) : (
                                      <>
                                        <motion.div animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                                        <motion.div animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                                      </>
                                    )}
                                  </div>
                                </div>

                                {/* Handcuffs icon for arrested stage */}
                                {laserSimState === 'arrested' && (
                                  <div className="absolute top-8 text-xs bg-stone-950 py-0.5 px-1 rounded-full border border-gray-400">⛓️</div>
                                )}

                                {/* Little rogue tail */}
                                <div className="absolute -right-2.5 bottom-1 w-4 h-6 rounded-r bg-stone-800 border border-stone-955 -rotate-12" />
                                
                                {/* Label */}
                                <div className="mt-1 bg-stone-900/90 text-stone-300 text-[7px] px-1 rounded border border-stone-800 font-mono font-bold leading-none py-0.5">
                                  THIEF
                                </div>
                             </div>
                           </motion.div>

                           {/* 2. CHUNKY POLICE SQUAD CAR */}
                           <motion.div 
                             className="absolute h-20 w-32 z-35"
                             style={{
                               left: `${policePos}%`,
                               bottom: '16px',
                               transform: 'translateX(-50%)'
                             }}
                             animate={sirenActive ? { y: [0, -3, 0] } : { y: 0 }}
                             transition={{ duration: 0.15, repeat: Infinity }}
                           >
                             <div className="relative w-full h-full flex flex-col items-center">
                                
                                {/* Whimsical Text Bubble from Cop */}
                                {laserSimState === 'police-arriving' && (
                                  <div className="absolute -top-12 bg-blue-600 text-white text-[8px] font-black px-2 py-1 rounded-xl border border-blue-200 shadow-xl w-32 text-center animate-bounce whitespace-nowrap">
                                    🚨 POLICE: EN ROUTE! 🚨
                                   </div>
                                )}

                                {/* Siren lights (Floating dome assembly) */}
                                <div className="flex gap-1.5 absolute top-0">
                                  <div className={`w-3.5 h-3 rounded-t-full border border-red-300 ${sirenActive ? "bg-red-500 animate-ping" : "bg-red-900"}`} />
                                  <div className="w-1.5 h-2 bg-stone-700" />
                                  <div className={`w-3.5 h-3 rounded-t-full border border-blue-300 ${sirenActive ? "bg-blue-500 animate-ping" : "bg-blue-900"}`} />
                                </div>

                                {/* Car body */}
                                <div className="w-28 h-12 rounded-2xl bg-stone-900 border-2 border-stone-955 flex relative shadow-lg overflow-hidden mt-2.5">
                                  {/* Front stripe & shield emblem */}
                                  <div className="w-10 h-full bg-white border-r border-stone-955 flex flex-col items-center justify-center p-0.5">
                                    <span className="text-[6px] font-sans text-blue-800 font-semibold leading-none">POLICE</span>
                                    <span className="text-[7px]">⭐</span>
                                  </div>
                                  
                                  {/* Side window & officer */}
                                  <div className="flex-1 bg-stone-900 relative">
                                    <div className="w-10 h-5 bg-sky-900 border-b border-r border-stone-955 rounded-b-md m-1 flex items-center justify-center overflow-hidden">
                                       {/* Officer hat */}
                                       <div className="text-[12px] transform -translate-y-0.5">👮</div>
                                    </div>
                                  </div>

                                  {/* Yellow headlights */}
                                  <div className="absolute left-0 bottom-1.5 w-1.5 h-3 bg-yellow-300 rounded-r" />
                                  {/* Red brake lights */}
                                  <div className="absolute right-0 bottom-1.5 w-1.5 h-3 bg-red-500 rounded-l" />
                                </div>

                                {/* Wheels */}
                                <div className="flex justify-around w-24 absolute bottom-[-4px]">
                                  <div className="w-6 h-6 rounded-full bg-stone-950 border-2 border-zinc-500 flex items-center justify-center text-[7px] text-zinc-400">⚙️</div>
                                  <div className="w-6 h-6 rounded-full bg-stone-950 border-2 border-zinc-500 flex items-center justify-center text-[7px] text-zinc-400">⚙️</div>
                                </div>
                                
                                {/* Exhaust puffs */}
                                {sirenActive && (
                                  <div className="absolute right-[-15px] bottom-1 flex flex-col gap-0.5 opacity-60">
                                    <motion.div animate={{ scale: [1, 2, 0.1], x: [0, 10, 15] }} transition={{ duration: 0.6, repeat: Infinity }} className="w-2.5 h-2.5 rounded-full bg-stone-500" />
                                    <motion.div animate={{ scale: [1, 2, 0.1], x: [0, 8, 12] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="w-2  h-2 rounded-full bg-stone-400" />
                                  </div>
                                )}
                             </div>
                           </motion.div>

                           {/* ================= FOREGROUND LASER OVERLAY SVG SYSTEM (z-30) ================= 
                               Draws active tripwires and glowing spark stars directly on top of the character layers! */}
                           {laserArmed && (
                             <svg className="absolute inset-0 w-full h-full pointer-events-none z-30 animate-pulse" viewBox="0 0 340 250" style={{ animationDuration: '4s' }}>
                               <g>
                                 {/* Multi-layered glowing neon laser lines */}
                                 <line 
                                   x1="128" 
                                   y1="181" 
                                   x2={isLdrBlocked ? Math.max(130, thiefPos * 3.4) : 214} 
                                   y2="181" 
                                   stroke="rgba(239, 68, 68, 0.75)" 
                                   strokeWidth="6" 
                                   filter="url(#laserBeamGlow)" 
                                   strokeLinecap="round" 
                                 />
                                 <line 
                                   x1="128" 
                                   y1="181" 
                                   x2={isLdrBlocked ? Math.max(130, thiefPos * 3.4) : 214} 
                                   y2="181" 
                                   stroke="#ef4444" 
                                   strokeWidth="2.8" 
                                   strokeLinecap="round" 
                                 />
                                 <line 
                                   x1="128" 
                                   y1="181" 
                                   x2={isLdrBlocked ? Math.max(130, thiefPos * 3.4) : 214} 
                                   y2="181" 
                                   stroke="#ffffff" 
                                   strokeWidth="1.2" 
                                   strokeLinecap="round" 
                                 />

                                 {/* Dynamic beam strike focus/spark dot when the thief intercepts */}
                                 {isLdrBlocked && (
                                   <g>
                                     {/* Outer high-contrast pulsing alert ring */}
                                     <circle 
                                       cx={Math.max(130, thiefPos * 3.4)} 
                                       cy="181" 
                                       r="12" 
                                       fill="none"
                                       stroke="#ef4444"
                                       strokeWidth="1.5"
                                       className="animate-[ping_1s_infinite]" 
                                     />
                                     {/* Laser focus dot directly overlayed on thief's chest! */}
                                     <circle 
                                       cx={Math.max(130, thiefPos * 3.4)} 
                                       cy="181" 
                                       r="6.5" 
                                       fill="#ef4444" 
                                       stroke="#ffffff"
                                       strokeWidth="1.2"
                                       className="animate-[pulse_0.3s_infinite]" 
                                     />
                                     <circle 
                                       cx={Math.max(130, thiefPos * 3.4)} 
                                       cy="181" 
                                       r="2.5" 
                                       fill="#ffffff" 
                                     />
                                   </g>
                                 )}
                               </g>
                             </svg>
                           )}
                        </div>

                        {/* Forest Trees background scenery */}
                        <div className="absolute left-4 bottom-12 text-2xl filter drop-shadow opacity-95">🌳</div>
                        <div className="absolute left-10 bottom-11 text-xl filter drop-shadow opacity-70">🌲</div>
                        <div className="absolute right-6 bottom-12 text-2xl filter drop-shadow opacity-95">🌳</div>
                     </div>

                     {/* Ground base line styling */}
                     <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-b from-stone-850 to-stone-900 border-t-4 border-stone-950 flex flex-col items-center justify-center">
                        <div className="h-0.5 w-full bg-stone-950/20 shadow-sm border-dashed" />
                        <span className="text-[7.5px] font-mono uppercase tracking-widest text-stone-500/80 mt-1 font-semibold">Bhutanese Traditional Exterior Courtyard Walkway</span>
                     </div>
                  </div>

                  {/* Arduino Serial Live Code Console Monitor */}
                  <div className="w-full bg-stone-950 rounded-2xl p-4 border border-zinc-800/80 shadow-md">
                     <div className="flex justify-between items-center text-[7.5px] font-mono text-zinc-500 uppercase tracking-widest pb-2 border-b border-zinc-900">
                        <span>🔌 Arduino R3 Live Register Console Broker</span>
                        <span className="text-emerald-500/80 animate-pulse">● Connected (PORT: COM3)</span>
                     </div>
                     <p className="mt-2 text-[10px] font-mono text-teal-400 font-bold leading-relaxed text-left min-h-12 flex items-center">
                        <span className="mr-2 text-zinc-500 select-none">&gt;</span>
                        {arduinoLogText}
                     </p>
                  </div>

                  {/* COCKPIT DASHBOARD CONTROL DESK */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-stone-50 border border-black/5 p-6 rounded-[34px] w-full">
                     
                     {/* 1. Cinematic Story Controls */}
                     <div className="flex flex-col gap-3 text-left">
                        <span className="text-[8px] font-mono text-stone-400 font-black uppercase tracking-widest">🎬 Kids Interactive Cinematic Movie</span>
                        
                        <div className="flex flex-col gap-2">
                           <button 
                             onClick={() => {
                               setIsAutoPlaying(true);
                               setLaserSimState('idle');
                             }}
                             className={`w-full py-3.5 rounded-xl font-black text-[10.5px] uppercase tracking-widest transition-all shadow-md items-center justify-center gap-1.5 flex active:translate-y-0.5 cursor-pointer ${
                               isAutoPlaying 
                                 ? "bg-stone-300 text-stone-500 border border-stone-400" 
                                 : "bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white hover:brightness-105"
                             }`}
                           >
                              <span>🎬 PLAY KIDS STORY VIDEO</span>
                           </button>

                           <button 
                             onClick={() => {
                               setIsAutoPlaying(false);
                               setLaserSimState('idle');
                               setThiefPos(15);
                               setPolicePos(115);
                               setSirenActive(false);
                               setIsLdrBlocked(false);
                               setScore(0);
                               setArduinoLogText('SECURITY SYSTEMS CLEARED & ARMED');
                             }}
                             className="w-full py-3 bg-stone-900 border border-stone-800 text-stone-100 rounded-xl font-black text-[9.5px] uppercase tracking-widest hover:bg-stone-850 active:translate-y-0.5 cursor-pointer flex justify-center items-center gap-1 shadow"
                           >
                              🔄 RESET SECURE ALARM SYSTEM
                           </button>
                        </div>
                     </div>

                     {/* 2. Interactive Tactile Sliders (Sandbox) */}
                     <div className="flex flex-col gap-2 text-left">
                        <div className="flex justify-between items-center text-[8px] font-mono text-stone-400 font-black uppercase tracking-widest">
                           <span>👤 KIDS HAND CONTROL: MOVE THIEF</span>
                           <span className="text-amber-600 font-black">{thiefPos}%</span>
                        </div>
                        
                        <div className="flex items-center gap-3">
                           <button 
                              onClick={() => {
                                if (isAutoPlaying) setIsAutoPlaying(false);
                                setThiefPos(prev => Math.max(12, prev - 5));
                              }}
                              className="w-8 h-8 rounded-full bg-stone-900 text-white text-xs font-black flex items-center justify-center cursor-pointer shadow hover:brightness-110 active:scale-95"
                           >
                              ◀
                           </button>
                           <input 
                             type="range"
                             min="12"
                             max="94"
                             value={thiefPos}
                             onChange={(e) => {
                               if (isAutoPlaying) setIsAutoPlaying(false);
                               const val = Number(e.target.value);
                               setThiefPos(val);
                               const blocked = laserArmed && val >= 42 && val <= 54;
                               setIsLdrBlocked(blocked);
                               setSirenActive(blocked);

                               if (blocked) {
                                  setLaserSimState('triggered');
                                  setArduinoLogText(`BEAM INTERSECTED AT ${val}%! PIN D8 BUZZER ACTIVE!`);
                               } else {
                                  if (laserSimState === 'triggered') setLaserSimState('idle');
                                  setArduinoLogText(`LDR ACTIVE - ALIGNMENT SAFE (${val}%)`);
                               }
                             }}
                             className="flex-1 h-2 cursor-pointer accent-amber-500 bg-gray-200 rounded-lg outline-none"
                           />
                           <button 
                              onClick={() => {
                                if (isAutoPlaying) setIsAutoPlaying(false);
                                setThiefPos(prev => Math.min(94, prev + 5));
                              }}
                              className="w-8 h-8 rounded-full bg-stone-900 text-white text-xs font-black flex items-center justify-center cursor-pointer shadow hover:brightness-110 active:scale-95"
                           >
                              ▶
                           </button>
                        </div>

                        {/* Mute security trip alert sound option */}
                        <button 
                          onClick={() => setSimIsMuted(!simIsMuted)}
                          className={`mt-2 py-1.5 px-3 rounded-lg border text-[8px] font-mono uppercase tracking-widest font-bold self-start cursor-pointer transition-colors ${
                            simIsMuted ? 'bg-red-50 text-red-500 border-red-200' : 'bg-stone-100 text-stone-500 border-stone-250 hover:bg-stone-200'
                          }`}
                        >
                           {simIsMuted ? '🔇 SYSTEM SOUNDS: MUTED' : '🔊 SYSTEM SOUNDS: AUDIBLE'}
                        </button>
                     </div>

                     {/* 3. Arduino Wiring Configurations */}
                     <div className="flex flex-col gap-2.5 text-left">
                        <span className="text-[8px] font-mono text-stone-400 font-black uppercase tracking-widest">🔌 KY-008 WIRING SELECTOR</span>
                        
                        <div className="grid grid-cols-2 gap-2">
                           <button 
                             onClick={() => {
                               const nextArmed = !laserArmed;
                               setLaserArmed(nextArmed);
                               if (!nextArmed) {
                                  setSirenActive(false);
                                  setIsLdrBlocked(false);
                                  setArduinoLogText('KY-008 LASER POWER CUT (PIN D12 LOW)');
                               } else {
                                  const blocked = thiefPos >= 42 && thiefPos <= 54;
                                  setIsLdrBlocked(blocked);
                                  setSirenActive(blocked);
                                  setArduinoLogText('KY-008 LASER LIGHT SOURCE DISPATCHED (PIN D12 HIGH)');
                               }
                             }}
                             className={`py-2 px-3.5 text-[8.5px] font-black uppercase tracking-widest rounded-xl transition-all cursor-pointer ${
                               laserArmed 
                                 ? "bg-red-500 text-white shadow-sm" 
                                 : "bg-stone-200 text-stone-500"
                             }`}
                           >
                              {laserArmed ? "🔌 LASER ARMED" : "🔌 LASER CUT"}
                           </button>

                           <div className="flex flex-col gap-1 w-full text-left">
                              <span className="text-[6.5px] font-mono text-zinc-400 uppercase font-black leading-none mb-0.5">BUZZER TONE</span>
                              <select 
                                 value={buzzerToneSelect}
                                 onChange={(e) => setBuzzerToneSelect(e.target.value)}
                                 className="w-full bg-stone-900 border border-stone-800 text-stone-300 text-[8px] font-mono p-1 rounded outline-none"
                              >
                                 <option value="hilo">DUAL-TONE WEE-WOO</option>
                                 <option value="yelp">YELP EXPONENTIAL</option>
                                 <option value="pulse">MCU HIGH-PITCH BEATER</option>
                              </select>
                           </div>
                        </div>

                        {/* Science fact block */}
                        <div className="bg-stone-100 p-2.5 rounded-xl text-left border border-black/5">
                           <p className="text-[7.5px] font-mono text-stone-500 leading-relaxed uppercase">
                             MCU HARDWARE INDEX: KY-008 Laser Emits a concentrated 650nm Red ray via Pin D12. When the thief intercepts the transmission, the photoresistor circuit drops input D8 LOW, causing the piezo alarm buzzer to sound!
                           </p>
                        </div>
                     </div>

                  </div>

                  {/* Sandbox confirmation verified trigger */}
                  <div className="flex flex-col items-center gap-2">
                     {score >= 100 && (
                          <motion.button 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={onComplete}
                            className="px-12 py-5 bg-stone-900 text-white rounded-full font-black text-xs uppercase tracking-widest transition-all button-pop flex items-center gap-2 shadow-xl shadow-stone-950/20 hover:bg-[#ef4444] hover:shadow-red-500/20 cursor-pointer"
                          >
                            Simulation Verified <Trophy size={16} />
                          </motion.button>
                     )}
                  </div>
               </div>
            ) : moduleId === 'touch' ? (
               <div className="space-y-8 w-full flex flex-col items-center select-none pb-6">
                  {/* Title Header Bar */}
                  <div className="w-full flex flex-col sm:flex-row justify-between items-center bg-stone-900 border border-rose-500/20 px-6 py-4 rounded-3xl text-xs gap-3">
                     <span className="flex items-center gap-2 font-black uppercase tracking-widest text-rose-500 font-mono">
                        <span className={`w-3 h-3 rounded-full ${isCurrentlyTouched ? "bg-rose-500 animate-pulse shadow-[0_0_10px_#f43f5e]" : "bg-stone-700"}`} />
                        TTP223 CAPACITIVE TOUCH PORTAL GATEWAY (Diorama)
                     </span>
                     <span className="font-mono text-[10px] font-bold text-stone-400 bg-stone-950 px-3 py-1.5 rounded-full border border-white/5">
                        CAPACITIVE STATE (D4): <span className={isCurrentlyTouched ? "text-rose-500 font-black animate-pulse" : "text-stone-400"}>{isCurrentlyTouched ? "HIGH - TOUCHED! (5V)" : "LOW - STANDBY (0V)"}</span>
                     </span>
                  </div>

                  {/* 3D Simulation Workbench / Diorama Stage */}
                  <div 
                     className="relative w-full h-[420px] rounded-[36px] bg-gradient-to-b from-slate-900 via-zinc-950 to-stone-900 overflow-hidden shadow-2xl border-4 border-double border-rose-500/20"
                     style={{
                        backgroundImage: "url('/input_file_0.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                     }}
                  >
                     {/* Twinkling ambient sky backdrop overlays (softened) */}
                     <div className="absolute inset-0 bg-stone-950/20 pointer-events-none" />
                     <div className="absolute top-4 right-10 flex gap-1 items-center">
                        <span className="w-2 h-2 rounded-full bg-yellow-200/50 animate-ping" />
                        <span className="text-[9px] font-mono font-black text-yellow-100/40 uppercase tracking-widest bg-stone-950/50 px-2 py-0.5 rounded">Garden Station</span>
                     </div>
                     
                     {/* Forest Background trees overlay (soft blend) */}
                     <div className="absolute left-6 bottom-16 text-3xl filter drop-shadow opacity-15 select-none">🌳</div>
                     <div className="absolute left-16 bottom-14 text-2xl filter drop-shadow opacity-10 select-none">🌲</div>
                     <div className="absolute right-12 bottom-16 text-3xl filter drop-shadow opacity-15 select-none">🌳</div>
                     <div className="absolute right-24 bottom-14 text-2xl filter drop-shadow opacity-10 select-none">🌲</div>

                     {/* MAIN INTERACTIVE WORLD GRID */}
                     <div className="absolute inset-0 flex items-end justify-between px-10 pb-16">
                        
                        {/* 1. CHARACTER WORKSPACE LAYER (left-side relative movement with 3D perspective depth tracking) */}
                        <div 
                           className="absolute flex flex-col items-center select-none"
                           style={{ 
                              left: visualLeftStr,
                              bottom: `${visualBottom}px`,
                              zIndex: visualZIndex,
                              transform: `translateX(-50%) scale(${visualScale})`,
                              transition: isBackFacing 
                                 ? 'left 2.0s cubic-bezier(0.25, 0.46, 0.45, 0.94), bottom 2.0s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 2.0s cubic-bezier(0.25, 0.46, 0.45, 0.94)' 
                                 : 'left 0.4s ease-out, bottom 0.4s ease-out, transform 0.4s ease-out'
                           }}
                        >
                           {/* Kid Speech Bubble (Counter-flipped to keep text perfectly readable when character turns) */}
                           <div 
                              className="relative mb-3 bg-white border-2 border-stone-900 px-3 py-1.5 rounded-2xl shadow-md text-slate-800 font-black text-[9px] uppercase tracking-wide max-w-[130px] leading-tight text-center"
                           >
                              {touchSimState === 'idle' && "Hello! Help me touch the gold sensor!"}
                              {touchSimState === 'walking' && "Walking to the touch station!"}
                              {touchSimState === 'standing' && "Let's press that gold touch core!"}
                              {touchSimState === 'reaching' && "Reaching out TTP223 copper pad..."}
                              {touchSimState === 'touching' && "Conductive body electrostatic loop active!"}
                              {touchSimState === 'unlocking' && `Engaging high speed ${touchLockType} lock...`}
                              {touchSimState === 'opened' && "Hooray! The gate is open! Let's go in!"}
                              {touchSimState === 'passing' && "Walking past the ancient gates..."}
                              {touchSimState === 'passed' && "Awesome! Inside secure zone safely!"}
                              {/* Speech bubble arrow/nub */}
                              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-r-2 border-b-2 border-stone-900 rotate-45" />
                           </div>

                           {/* Character SVG Rendering (Always use premium vector SVG to avoid asset mismatch) */}
                           <div className="relative">
                              <svg className="w-20 h-32 filter drop-shadow-lg" viewBox="0 0 100 160">
                                 {/* Suit trousers */}
                                 <rect x="36" y="94" width="12" height="42" fill="#2d3748" rx="2" />
                                 <rect x="52" y="94" width="12" height="42" fill="#2d3748" rx="2" />
                                 {/* Shoes */}
                                 <ellipse cx="40" cy="138" rx="8" ry="4" fill="#111" />
                                 <ellipse cx="58" cy="138" rx="8" ry="4" fill="#111" />
                                 
                                 {/* Suit jacket */}
                                 <rect x="28" y="44" width="44" height="52" fill="#1e3a8a" rx="8" />

                                 {/* 3D Directional details: Shirt & Tie only visible when facing forward */}
                                 {!isBackFacing ? (
                                    <>
                                       {/* White dress shirt background collar */}
                                       <polygon points="50,44 42,44 50,56" fill="#ffffff" />
                                       <polygon points="50,44 58,44 50,56" fill="#ffffff" />
                                       {/* Blue long tie */}
                                       <polygon points="50,47 47,49 50,75 53,49" fill="#0284c7" />
                                       {/* Smart golden button lapel pin */}
                                       <circle cx="34" cy="58" r="2.5" fill="#eab308" />
                                    </>
                                 ) : null}
                                 
                                 {/* Head (Skin vs Back-Hair based on orientation) */}
                                 {!isBackFacing ? (
                                    <>
                                       {/* Skin Head */}
                                       <circle cx="50" cy="24" r="18" fill="#fda4af" />
                                       {/* Brown hair front */}
                                       <path d="M30,22 Q34,6 50,6 Q66,6 70,22 Q50,14 30,22" fill="#78350f" />
                                       <path d="M30,20 Q32,4 42,2 Q50,4 52,14" fill="#78350f" />
                                       {/* Large expressive eyes */}
                                       <circle cx="43" cy="24" r="3.5" fill="#ffffff" />
                                       <circle cx="43" cy="24" r="1.8" fill="#111827" />
                                       <circle cx="57" cy="24" r="3.5" fill="#ffffff" />
                                       <circle cx="57" cy="24" r="1.8" fill="#111827" />
                                       {/* Hearty smile */}
                                       <path d="M44,32 Q50,38 56,32" stroke="#111827" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                                    </>
                                 ) : (
                                    <>
                                       {/* Back Hair: fully covers the face area to face towards the gate in 3D */}
                                       <circle cx="50" cy="24" r="18.5" fill="#78350f" />
                                       <path d="M31.5,24 Q50,44 68.5,24 L68.5,14 Q50,6 31.5,14 Z" fill="#78350f" />
                                       <path d="M30,20 Q34,6 50,6 Q66,6 70,20" fill="#5c260a" />
                                    </>
                                 )}
                                 
                                 {/* Arms (Different based on back-cheering vs front state) */}
                                 {isBackFacing ? (
                                    touchSimState === 'passed' ? (
                                       /* Celebrate with arms high with back facing us */
                                       <g>
                                          <rect x="14" y="24" width="10" height="30" fill="#1e3a8a" rx="4" transform="rotate(-150 19 29)" />
                                          <circle cx="28" cy="14" r="5" fill="#fda4af" />
                                          <rect x="76" y="24" width="10" height="30" fill="#1e3a8a" rx="4" transform="rotate(150 81 29)" />
                                          <circle cx="72" cy="14" r="5" fill="#fda4af" />
                                       </g>
                                    ) : (
                                       /* Normal back-view walking arms */
                                       <g>
                                          <rect x="18" y="46" width="10" height="34" fill="#1e3a8a" rx="4" />
                                          <rect x="72" y="46" width="10" height="34" fill="#1e3a8a" rx="4" />
                                       </g>
                                    )
                                 ) : (
                                    <>
                                       {/* Left hand waving or down */}
                                       {touchSimState === 'passed' ? (
                                          <g className="origin-[32px_48px]">
                                             <rect x="18" y="22" width="10" height="30" fill="#1e3a8a" rx="4" transform="rotate(-40 18 22)" />
                                             <circle cx="38" cy="11" r="5" fill="#fda4af" />
                                          </g>
                                       ) : (
                                          <rect x="18" y="46" width="10" height="34" fill="#1e3a8a" rx="4" />
                                       )}
                                       {/* Right hand reaching for sensor */}
                                       {touchSimState === 'reaching' || touchSimState === 'touching' ? (
                                          <g>
                                             <rect x="68" y="46" width="24" height="10" fill="#1e3a8a" rx="4" />
                                             <circle cx="94" cy="51" r="5" fill="#fda4af" />
                                          </g>
                                       ) : (
                                          <rect x="72" y="46" width="10" height="34" fill="#1e3a8a" rx="4" />
                                       )}
                                    </>
                                 )}
                              </svg>
                           </div>
                        </div>

                        {/* 2. SENSOR STATION WITH TTP223 TOUCH MODULE */}
                        <div className="absolute left-[38%] bottom-16 z-35 flex flex-col items-center">
                           <span className="text-[7px] font-mono text-stone-400 font-bold uppercase tracking-widest bg-stone-900/60 border border-white/5 px-2 py-0.5 rounded-md mb-2">TTP223 Column</span>
                           
                           {/* Enlarged zoom-in of the real double sided touch sensor module */}
                           <div className="relative w-18 h-24 bg-rose-950/30 border-2 border-rose-500/30 rounded-2xl shadow-2xl p-2 flex flex-col items-center justify-between backdrop-blur-sm">
                              {/* PCB traces detail drawing background */}
                              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(244,63,94,0.1)_1px,transparent_1px)] bg-[size:8px_8px] rounded-2xl pointer-events-none" />
                              
                              {/* Copper Sensing Ring (The target) */}
                              <div 
                                 onClick={() => {
                                    if (touchSimState !== 'passed') {
                                       triggerManualTouchToggle();
                                    }
                                 }}
                                 className={`w-12 h-12 rounded-full border-4 flex items-center justify-center cursor-pointer transition-all ${
                                    isCurrentlyTouched 
                                       ? "border-rose-500 bg-rose-500/20 shadow-[0_0_20px_#f43f5e] scale-98" 
                                       : "border-amber-500/70 bg-[#2d1b11] hover:border-rose-400"
                                 }`}
                              >
                                 {/* Glowing electrostatic concentric rings */}
                                 <div className={`w-8 h-8 rounded-full border border-dashed flex items-center justify-center ${isCurrentlyTouched ? "border-rose-300" : "border-amber-500/40"}`}>
                                    <div className="w-5 h-5 rounded-full bg-amber-500/35 flex items-center justify-center text-[8px] font-black font-mono text-yellow-100">
                                       {isCurrentlyTouched ? "🔋" : "TOUCH"}
                                    </div>
                                 </div>
                              </div>

                              {/* Onboard Components: LEDs and IC Chip */}
                              <div className="flex gap-2.5 items-center w-full justify-center">
                                 {/* 3-pin headers */}
                                 <div className="flex flex-col gap-0.5 items-center">
                                    <span className="text-[5.5px] font-mono text-zinc-500 tracking-tighter leading-none">SIG</span>
                                    <span className={`w-1.5 h-1.5 rounded-full ${isCurrentlyTouched ? "bg-yellow-400" : "bg-zinc-700"}`} />
                                 </div>
                                 
                                 {/* TTP223 SOT23 Controller chip */}
                                 <div className="w-4 h-3 bg-zinc-800 border border-zinc-700 rounded-sm text-[4.5px] font-mono text-zinc-400 flex items-center justify-center font-bold">T223</div>
                                 
                                 {/* Onboard power indicator led */}
                                 <div className="flex flex-col gap-0.5 items-center">
                                    <span className="text-[5.5px] font-mono text-zinc-500 tracking-tighter leading-none">POW</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_4px_#10b981]" />
                                 </div>
                              </div>
                           </div>

                           {/* Heavy industrial chrome mounting pillar stand */}
                           <div className="w-2.5 h-14 bg-gradient-to-r from-zinc-650 via-zinc-400 to-zinc-750 shadow-md border-x border-stone-950" />
                           <div className="w-8 h-2 bg-stone-950 rounded-t-lg" />
                        </div>

                        {/* 3. PHYSICAL INPUT FLOATING FINGER HAND (Animated clear touching mechanism) */}
                        <AnimatePresence>
                           {(touchSimState === 'reaching' || touchSimState === 'touching' || isCurrentlyTouched) && (
                              <motion.div 
                                 initial={{ y: -80, x: 200, opacity: 0 }}
                                 animate={{ 
                                    y: isCurrentlyTouched ? -120 : -90, 
                                    x: 135, 
                                    opacity: 1 
                                 }}
                                 exit={{ y: -80, x: 200, opacity: 0 }}
                                 transition={{ type: 'spring', damping: 15 }}
                                 className="absolute bottom-16 z-50 pointer-events-none flex flex-col items-center"
                              >
                                 {/* Glowing touch spark indicator */}
                                 {isCurrentlyTouched && (
                                    <div className="absolute -top-2 left-6 w-10 h-10 bg-yellow-400/40 rounded-full blur-md animate-ping" />
                                 )}
                                 
                                 {/* A large, cartoon human touching finger */}
                                 <div className="relative text-3xl select-none filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] transform rotate-12">
                                    👇
                                 </div>
                                 <div className="text-[6.5px] font-mono font-bold bg-amber-500 border border-stone-900 text-stone-900 uppercase tracking-wider px-1 py-0.5 rounded shadow mt-1">
                                    CAP INTENSITY: {touchLevel}%
                                 </div>
                              </motion.div>
                           )}
                        </AnimatePresence>

                        {/* 4. THE SECURITY GATEWAY (Bricks Column & Swing Gates) */}
                        <div className="absolute right-[12%] bottom-16 z-30 flex items-end">
                           
                           {/* Left Pillar */}
                           <div className="relative w-8 h-48 bg-gradient-to-b from-[#8C4A32] via-[#5C2B1B] to-[#3D1A10] border border-stone-950 shadow-md rounded-t flex flex-col items-center justify-between select-none py-4">
                              {/* Stone bricks decoration texturing patterns using CSS layout */}
                              <div className="absolute inset-0 bg-[#2D120B]/10 border-y-2 border-[#FFE8E1]/5 pointer-events-none" />
                              <div className="w-10 h-2.5 bg-[#4F2013] border-b-2 border-stone-950 rounded shadow absolute -top-1" />
                              <div className="w-6 h-4 bg-yellow-500/10 border border-yellow-500/15 rounded flex items-center justify-center">
                                 <span className="text-[6px] font-mono text-yellow-300 font-extrabold tracking-tighter">SECURE</span>
                              </div>
                           </div>

                           {/* CLOSED GATE PNG PREVIEW IMAGE (User uploaded sample) */}
                           {(!isGateImgError && (touchSimState !== 'unlocking' && touchSimState !== 'opened' && touchSimState !== 'passing' && touchSimState !== 'passed')) ? (
                              <div className="h-44 flex items-center align-bottom justify-center mx-[-4px]">
                                 <img 
                                   src="/input_file_1.png" 
                                   alt="User Traditional Bhutanese Gate" 
                                   className="h-44 object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] z-20"
                                   style={{ display: isGateImgError ? 'none' : 'block' }}
                                   onError={() => setIsGateImgError(true)}
                                 />
                              </div>
                           ) : (
                              /* 3D ROTATABLE VECTOR SWING GATES (Symmetric layout) */
                              <div className="w-38 h-44 relative bg-transparent flex items-center mx-0 overflow-visible">
                                 {/* Embedded road pathway background under doors */}
                                 <div className="absolute inset-x-0 bottom-0 h-4 bg-stone-900/30" />
                                 
                                 {/* LEFT WING DOOR */}
                                 <div 
                                    style={{
                                       transform: (touchSimState === 'opened' || touchSimState === 'passing' || touchSimState === 'passed') ? 'rotateY(-95deg)' : 'rotateY(0deg)',
                                       transformOrigin: 'left center',
                                       transition: 'transform 1.8s cubic-bezier(0.18, 0.89, 0.32, 1.1)'
                                    }}
                                    className="absolute left-0 w-19 h-40 border-y-4 border-l-4 border-r-2 border-zinc-800 bg-zinc-900/20 backdrop-blur-[1px] flex flex-col justify-between py-6 rounded-l-md shadow-lg"
                                 >
                                    <div className="w-full h-0.5 bg-zinc-700/60" />
                                    <div className="w-full flex justify-around">
                                       <span className="text-zinc-600 font-extrabold text-[10px]">⚜</span>
                                       <span className="text-zinc-600 font-extrabold text-[10px]">⚜</span>
                                    </div>
                                    <div className="w-full h-0.5 bg-zinc-700/60" />
                                 </div>

                                 {/* RIGHT WING DOOR */}
                                 <div 
                                    style={{
                                       transform: (touchSimState === 'opened' || touchSimState === 'passing' || touchSimState === 'passed') ? 'rotateY(95deg)' : 'rotateY(0deg)',
                                       transformOrigin: 'right center',
                                       transition: 'transform 1.8s cubic-bezier(0.18, 0.89, 0.32, 1.1)'
                                    }}
                                    className="absolute right-0 w-19 h-40 border-y-4 border-r-4 border-l-2 border-zinc-800 bg-zinc-900/20 backdrop-blur-[1px] flex flex-col justify-between py-6 rounded-r-md shadow-lg"
                                 >
                                    <div className="w-full h-0.5 bg-zinc-700/60" />
                                    <div className="w-full flex justify-around">
                                       <span className="text-zinc-600 font-extrabold text-[10px]">⚜</span>
                                       <span className="text-zinc-600 font-extrabold text-[10px]">⚜</span>
                                    </div>
                                    <div className="w-full h-0.5 bg-zinc-700/60" />
                                 </div>

                                 {/* Electromechanical lock mechanism cylinder */}
                                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-35 flex flex-col items-center">
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 shadow-md ${
                                       (touchSimState === 'opened' || touchSimState === 'passing' || touchSimState === 'passed')
                                          ? "bg-emerald-950 border-emerald-400" 
                                          : "bg-red-950 border-red-500 animate-pulse"
                                    }`}>
                                       <span className="text-[6px] font-bold text-white font-mono leading-none">
                                          {(touchSimState === 'opened' || touchSimState === 'passing' || touchSimState === 'passed') ? "🔓" : "🔒"}
                                       </span>
                                    </div>
                                    {/* Magnetic Lock status display */}
                                    <span className={`text-[4.5px] font-mono uppercase tracking-widest font-black px-1.5 py-0.5 rounded shadow-sm border mt-1.5 ${
                                       (touchSimState === 'opened' || touchSimState === 'passing' || touchSimState === 'passed')
                                          ? "text-emerald-400 border-emerald-500/20 bg-emerald-950" 
                                          : "text-red-400 border-red-500/20 bg-red-950"
                                    }`}>
                                       {(touchSimState === 'opened' || touchSimState === 'passing' || touchSimState === 'passed') ? "RELAY HIGH" : "RELAY LOW"}
                                    </span>
                                 </div>
                              </div>
                           )}

                           {/* Right Pillar */}
                           <div className="relative w-8 h-48 bg-gradient-to-b from-[#8C4A32] via-[#5C2B1B] to-[#3D1A10] border border-stone-950 shadow-md rounded-t flex flex-col items-center justify-between select-none py-4">
                              <div className="absolute inset-0 bg-[#2D120B]/10 border-y-2 border-[#FFE8E1]/5 pointer-events-none" />
                              <div className="w-10 h-2.5 bg-[#4F2013] border-b-2 border-stone-950 rounded shadow absolute -top-1" />
                              <div className="w-5 h-5 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-700">
                                 <span className="text-[7px]">⚡</span>
                              </div>
                           </div>

                        </div>

                     </div>

                     {/* Ground walkway base footer bar */}
                     <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-b from-stone-800 to-stone-900 border-t-4 border-stone-950 flex flex-col items-center justify-center select-none">
                        <div className="h-0.5 w-full bg-stone-950/20 shadow-sm border-dashed" />
                        <span className="text-[7.5px] font-mono uppercase tracking-widest text-stone-500 mt-1 font-semibold">Tenzin's Smart Home Gate & Garden Walkway Pathway</span>
                     </div>

                  </div>

                  {/* Microcontroller Serial Output Monitor board */}
                  <div className="w-full bg-stone-950 rounded-2xl p-4 border border-zinc-800/80 shadow-md">
                     <div className="flex justify-between items-center text-[7.5px] font-mono text-zinc-500 uppercase tracking-widest pb-2 border-b border-zinc-900">
                        <span>🔌 ARDUINO UNO HARDWARE REGISTER BROADCASTER</span>
                        <span className="text-emerald-500/85 animate-pulse">● CONNECTED (PORT: COM4)</span>
                     </div>
                     <p className="mt-2 text-[10px] font-mono text-cyan-400 font-bold leading-relaxed text-left min-h-12 flex items-center">
                        <span className="mr-2 text-zinc-500 select-none">&gt;</span>
                        {touchLog}
                     </p>
                  </div>

                  {/* CONTROL CONSOLE BOARD */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-stone-50 border border-black/5 p-6 rounded-[34px] w-full">
                     
                     {/* 1. INTERACTIVE CINEMATIC MOVIE PANEL */}
                     <div className="flex flex-col gap-3 text-left">
                        <span className="text-[8px] font-mono text-stone-400 font-black uppercase tracking-widest">🎬 Kids Interactive Cinematic Movie</span>
                        
                        <div className="flex flex-col gap-2">
                           <button 
                             onClick={() => {
                               if (touchIsAutoPlaying) {
                                 setTouchIsAutoPlaying(false);
                               } else {
                                 // Restart variables
                                 setTouchSimState('idle');
                                 setTouchCharX(15);
                                 setTouchFingerY(120);
                                 setIsCurrentlyTouched(false);
                                 setIsTouchComplete(false);
                                 setTouchIsAutoPlaying(true);
                               }
                             }}
                             className={`w-full py-3.5 rounded-xl font-black text-[10.5px] uppercase tracking-widest transition-all shadow-md items-center justify-center gap-1.5 flex active:translate-y-0.5 cursor-pointer ${
                               touchIsAutoPlaying 
                                 ? "bg-rose-600 text-white hover:bg-rose-700 animate-pulse border-none" 
                                 : "bg-gradient-to-r from-red-500 via-rose-600 to-amber-600 text-white hover:brightness-105 border-none"
                             }`}
                           >
                               <span>{touchIsAutoPlaying ? "⏹️ STOP STORY VIDEO" : "🎬 PLAY INTERACTIVE STORY"}</span>
                           </button>

                           <button 
                             onClick={() => {
                               setTouchIsAutoPlaying(false);
                               setTouchSimState('idle');
                               setTouchCharX(15);
                               setTouchFingerY(120);
                               setIsCurrentlyTouched(false);
                               setIsTouchComplete(false);
                               setTouchLog('ARDUINO UNO MONITOR: SECURITY CHIP STABLE. COM4 ARMED.');
                             }}
                             className="w-full py-2.5 bg-stone-900 border border-stone-800 text-stone-100 rounded-xl font-black text-[9.5px] uppercase tracking-widest hover:bg-stone-800 active:translate-y-0.5 cursor-pointer flex justify-center items-center gap-1 shadow"
                           >
                              🔄 RESET WORLD SCENE
                           </button>
                        </div>
                     </div>

                     {/* 2. SANDBOX HANDS-ON WORKSPACE (Character Drag & Touch Toggles) */}
                     <div className="flex flex-col gap-2.5 text-left">
                        <div className="flex justify-between items-center text-[8px] font-mono text-stone-400 font-black uppercase tracking-widest">
                           <span>👤 MANUAL MOVE HUMAN</span>
                           <span className="text-rose-600 font-extrabold">{touchCharX}%</span>
                        </div>
                        
                        {/* Kid manual positioning slider */}
                        <div className="flex items-center gap-2">
                           <input 
                             type="range"
                             min="15"
                             max="85"
                             value={touchCharX}
                             onChange={(e) => {
                               if (touchIsAutoPlaying) setTouchIsAutoPlaying(false);
                               const targetX = Number(e.target.value);
                               
                               // Gate collision detection logic
                               const stepDoorsLocked = !(touchSimState === 'opened' || touchSimState === 'passing' || touchSimState === 'passed');
                               if (stepDoorsLocked && targetX > 42) {
                                  // Lock boundary limit
                                  setTouchCharX(38);
                                  setTouchSimState('standing');
                                  setTouchLog('[COLLISION WARNING] Gate doors are locked solid! You must trigger the touch sensor to pass.');
                                  playTouchSound('clack');
                               } else {
                                  setTouchCharX(targetX);
                                  if (targetX < 35) {
                                     setTouchSimState('idle');
                                  } else if (targetX >= 35 && targetX <= 42) {
                                     setTouchSimState('standing');
                                  } else if (targetX > 42 && targetX < 75) {
                                     setTouchSimState('passing');
                                  } else if (targetX >= 75) {
                                     setTouchSimState('passed');
                                     setIsTouchComplete(true);
                                     playTouchSound('cheer');
                                  }
                               }
                             }}
                             className="flex-1 h-2 cursor-pointer accent-stone-900 bg-gray-200 rounded-lg outline-none"
                           />
                        </div>

                        {/* Direct capacitive touch switch toggle */}
                        <button 
                           onClick={triggerManualTouchToggle}
                           className={`w-full py-2 px-3 border rounded-xl text-[9px] font-black uppercase tracking-widest cursor-pointer transition-colors flex items-center justify-center gap-1.5 ${
                              isCurrentlyTouched 
                                 ? 'bg-rose-50 text-rose-600 border-rose-300 shadow-inner' 
                                 : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                           }`}
                        >
                           👇 {isCurrentlyTouched ? "RELEASE SENSOR PAD" : "TAP SENSOR PAD"}
                        </button>
                     </div>

                     {/* 3. ARDUINO HARDWARE CONFIG LAYOUT */}
                     <div className="flex flex-col gap-2.5 text-left">
                        <span className="text-[8px] font-mono text-stone-400 font-black uppercase tracking-widest">🔌 ACTUATOR LOCK TYPE SELECTOR</span>
                        
                        <div className="grid grid-cols-1 gap-2">
                           <div className="flex gap-2 w-full">
                              {['solenoid', 'servo', 'pneumatic'].map((t) => (
                                 <button
                                    key={t}
                                    onClick={() => {
                                       setTouchLockType(t as any);
                                       setTouchLog(`[MCU] Switched gateway lock algorithm to the high performance ${t.toUpperCase()} model.`);
                                       playTouchSound('clack');
                                    }}
                                    className={`flex-1 py-1 px-1.5 text-[7px] font-black uppercase tracking-wider rounded-lg border text-center cursor-pointer transition-colors ${
                                       touchLockType === t
                                          ? "bg-zinc-900 text-white border-transparent shadow-sm"
                                          : "bg-white text-stone-400 border-stone-200 hover:text-stone-700"
                                    }`}
                                 >
                                    {t}
                                 </button>
                              ))}
                           </div>
                        </div>

                        {/* Young learner educational fact tip block */}
                        <div className="bg-stone-100 p-2.5 rounded-xl text-left border border-black/5">
                           <p className="text-[7px] font-mono text-stone-500 leading-relaxed uppercase">
                              KIDS EDU HUB: Unlike old mechanical toggle buttons that have moving parts that wear, the solid-state TTP223 chip senses our body's electricity (capacitance) from a distance. High signal (5V) triggers motor/relay actuators to swing open the gates!
                           </p>
                        </div>
                     </div>

                  </div>

                  {/* Sandbox confirmation verified trigger */}
                  <div className="flex flex-col items-center gap-2">
                     {isTouchComplete && (
                          <motion.button 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={onComplete}
                            className="px-12 py-5 bg-stone-900 text-white rounded-full font-black text-xs uppercase tracking-widest transition-all button-pop flex items-center gap-2 shadow-xl shadow-stone-950/20 hover:bg-[#6366f1] hover:shadow-indigo-500/20 cursor-pointer border-none"
                          >
                            Simulation Verified <Trophy size={16} />
                          </motion.button>
                     )}
                  </div>
               </div>
            ) : moduleId === 'knock-sensor' ? (
                <div className="space-y-8 w-full flex flex-col items-center select-none pb-6">
                   {/* Title Header Bar */}
                   <div className="w-full flex flex-col sm:flex-row justify-between items-center bg-zinc-900 border border-amber-500/20 px-6 py-4 rounded-3xl text-xs gap-3">
                      <span className="flex items-center gap-2 font-black uppercase tracking-widest text-amber-500 font-mono">
                         <span className={`w-3 h-3 rounded-full ${isKnockedState ? "bg-amber-400 animate-pulse shadow-[0_0_10px_#f59e0b]" : "bg-zinc-700"}`} />
                         KY-031 SHOCK KNOCK REALTIME CALIBRATOR & LED DIORAMA
                      </span>
                      <span className="font-mono text-[10px] font-bold text-zinc-400 bg-zinc-950 px-3 py-1.5 rounded-full border border-white/5">
                         SENSOR OUT PIN (D3): <span className={(isKnockedState && knockIntensity >= knockSensitivity) ? "text-amber-400 font-black" : "text-zinc-500"}>{(isKnockedState && knockIntensity >= knockSensitivity) ? "HIGH (5V)" : "LOW (0V)"}</span>
                      </span>
                   </div>

                   {/* 3D Simulation Workbench / Diorama Stage */}
                   <div className="relative w-full h-[440px] rounded-[36px] bg-gradient-to-b from-[#1b1917] via-[#292524] to-[#1c1917] overflow-hidden shadow-2xl border-4 border-amber-500/10">
                      {/* Perspective Wood floor grids */}
                      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/black-thread.png')] pointer-events-none" />
                      <div className="absolute inset-0 bg-[radial-gradient(#d6d3d1_1px,transparent_1.5px)] bg-[size:32px_32px] opacity-[0.05] pointer-events-none" />

                      {/* Header Badge */}
                      <div className="absolute top-4 right-6 flex gap-1.5 items-center">
                         <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                         <span className="text-[9px] font-mono font-black text-emerald-450 uppercase tracking-widest bg-zinc-950/80 px-2.5 py-1 rounded-md border border-emerald-500/10">Lab Station 3</span>
                      </div>

                      {/* WORKBENCH BREADBOARD STAGE AND HAND */}
                      <div className="absolute inset-0 flex items-center justify-between px-16">
                         
                         {/* LEFT: SENSORS & CIRCUIT BOARD (BREADBOARD STYLE) */}
                         <div className="relative bg-[#efebe4] border-4 border-[#cfc8ba] rounded-[32px] p-6 shadow-2xl flex items-center gap-12 max-w-lg">
                            {/* Breadboard rows */}
                            <div className="absolute top-1 left-4 right-4 h-1.5 border-b border-[#ded9cf] border-dashed pointer-events-none opacity-40" />
                            <div className="absolute bottom-1 left-4 right-4 h-1.5 border-t border-[#ded9cf] border-dashed pointer-events-none opacity-40" />
                            
                            {/* 1. THE TWO LED OUTPUT LIGHTS (RED & BLUE) - Placed on the left */}
                            <div className="flex flex-col items-center justify-center gap-6 bg-stone-900/5 p-4 rounded-2xl border border-[#ded8cc]">
                               
                               {/* RED LED MODULE */}
                               <div className="flex flex-col items-center gap-1">
                                  <div className="relative w-8 h-12 flex flex-col items-center justify-end">
                                     {/* LED Glass Capsule */}
                                     <motion.div
                                       animate={{ 
                                         backgroundColor: (isKnockedState && knockIntensity >= knockSensitivity) ? '#ef4444' : '#7f1d1d',
                                         boxShadow: (isKnockedState && knockIntensity >= knockSensitivity) 
                                           ? '0 0 25px #ef4444, inset 0 0 8px rgba(255,255,255,0.8)' 
                                           : 'none'
                                       }}
                                       className="w-5.5 h-7 rounded-t-full bg-red-900 border border-red-700 relative flex items-center justify-center overflow-hidden transition-all duration-100"
                                     >
                                        <div className="w-1.5 h-3 bg-amber-200/40 rounded-sm" />
                                     </motion.div>
                                     <div className="w-6.5 h-0.5 bg-red-800 rounded-xs" />
                                     <div className="flex gap-2">
                                        <div className="w-0.5 h-4 bg-stone-400" />
                                        <div className="w-0.5 h-2 bg-stone-400" />
                                     </div>
                                  </div>
                                  <span className="text-[7px] font-mono text-red-500 font-bold">RED PIN D12</span>
                               </div>

                               {/* BLUE LED MODULE */}
                               <div className="flex flex-col items-center gap-1">
                                  <div className="relative w-8 h-12 flex flex-col items-center justify-end">
                                     {/* LED Glass Capsule */}
                                     <motion.div
                                       animate={{ 
                                         backgroundColor: (isKnockedState && knockIntensity >= knockSensitivity) ? '#3b82f6' : '#1e3a8a',
                                         boxShadow: (isKnockedState && knockIntensity >= knockSensitivity) 
                                           ? '0 0 25px #3b82f6, inset 0 0 8px rgba(255,255,255,0.8)' 
                                           : 'none'
                                       }}
                                       className="w-5.5 h-7 rounded-t-full bg-blue-900 border border-blue-700 relative flex items-center justify-center overflow-hidden transition-all duration-100"
                                     >
                                        <div className="w-1.5 h-3 bg-sky-200/40 rounded-sm" />
                                     </motion.div>
                                     <div className="w-6.5 h-0.5 bg-blue-800 rounded-xs" />
                                     <div className="flex gap-2">
                                        <div className="w-0.5 h-4 bg-stone-400" />
                                        <div className="w-0.5 h-2 bg-stone-400" />
                                     </div>
                                  </div>
                                  <span className="text-[7px] font-mono text-blue-500 font-bold font-black">BLUE PIN D13</span>
                               </div>

                            </div>

                            {/* Center separator wires */}
                            <div className="flex flex-col gap-3 h-full justify-center pointer-events-none py-4 opacity-75">
                              <div className="w-6 h-0.5 bg-emerald-500 shadow-[0_0_4px_#10b981]" />
                              <div className="w-8 h-0.5 bg-red-500 shadow-[0_0_4px_#ef4444]" />
                              <div className="w-10 h-0.5 bg-[#0ea5e9] shadow-[0_0_4px_#0ea5e9]" />
                            </div>

                            {/* 2. PHYSICAL REPLICATED KY-031 KNOCK SENSOR COMPONENT - Placed on the right, close to the hand */}
                            <div className="relative flex flex-col items-center gap-2">
                               <p className="text-[8px] font-mono font-extrabold text-[#78716c] uppercase">KY-031 MODULE</p>
                               <motion.div 
                                 animate={isKnockedState ? { y: [0, 4, -2, 0] } : {}}
                                 transition={{ duration: 0.25 }}
                                 onClick={() => triggerKnock()}
                                 className="relative cursor-pointer hover:brightness-105 active:scale-[0.98] transition-all"
                               >
                                  {/* Physical Spring Sensor Case layout */}
                                  <div className="relative w-28 h-40 bg-[#141414] border-4 border-[#292524] rounded-2xl flex flex-col justify-between p-3.5 shadow-xl">
                                     {/* Circuit lines */}
                                     <div className="absolute inset-x-2 top-10 bottom-10 border-l border-amber-500/10 border-dashed pointer-events-none" />
                                     
                                     {/* Sensor Label */}
                                     <div className="text-[7px] font-mono font-extrabold text-[#d97706] tracking-widest text-center">KY-031 BUMP</div>
                                     
                                     {/* SPRING CHAMBER CASE */}
                                     <div className="w-12 h-18 bg-black/50 border-2 border-stone-700 rounded-full mx-auto relative overflow-hidden flex flex-col items-center justify-center p-2">
                                        {/* Core terminal pin */}
                                        <div className="w-1 h-11 bg-amber-400 rounded-full absolute left-1/2 -translate-x-1/2 top-2.5 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                                        
                                        {/* Copper spiral contact spring */}
                                        <motion.div
                                          animate={isKnockedState ? {
                                            rotate: [-18, 18, -12, 12, -6, 6, 0],
                                            x: [-5, 5, -3, 3, -1, 1, 0]
                                          } : {}}
                                          transition={{ duration: 0.5, ease: "easeOut" }}
                                          className="origin-bottom w-4 h-11 border border-stone-400 border-dashed rounded flex flex-col justify-end p-0.5"
                                        >
                                           {[...Array(4)].map((_, i) => (
                                              <div key={i} className="h-0.5 bg-stone-300 rounded-xs border-b border-stone-400" />
                                           ))}
                                        </motion.div>
                                     </div>

                                     {/* 3 Output Terminal Pins */}
                                     <div className="flex justify-between text-[7px] font-mono text-zinc-500 px-1 mt-1">
                                        <span className="flex flex-col items-center">GND<div className="w-0.5 h-2 bg-stone-600" /></span>
                                        <span className="flex flex-col items-center">5V<div className="w-0.5 h-2 bg-stone-600" /></span>
                                        <span className="flex flex-col items-center font-black text-amber-500">SIG<div className="w-0.5 h-3 bg-amber-500" /></span>
                                     </div>
                                  </div>
                               </motion.div>
                            </div>

                         </div>

                         {/* RIGHT: HAND AND CONTROL LAYER - Points leftwards directly towards the sensor and the LEDs */}
                         <div className="relative w-72 h-full flex flex-col items-center justify-center">
                            
                            {/* Hand speech balloon */}
                            <div className="relative mb-5 bg-white border-2 border-zinc-900 px-3 py-1.5 rounded-2xl shadow-md text-slate-800 font-black text-[9px] uppercase tracking-wide text-center max-w-[150px]">
                               {isKnockComplete ? "Awesome calibration complete!" : isKnockedState ? "BOOM! Feel that slap!" : "Click me to slap on the sensor board!"}
                               <div className="absolute -bottom-1.5 right-6 w-2.5 h-2.5 bg-white border-r-2 border-b-2 border-zinc-900 rotate-45" />
                            </div>

                            {/* 3. INTERACTIVE SVG HAND COMPONENT (SLAPPING ANIMATED FROM TOP) */}
                            <motion.div
                              animate={isKnockedState ? { 
                                x: [-20, -75, -20], 
                                y: [10, 80, 10], 
                                rotate: [5, -15, 5] 
                              } : { 
                                x: -20, 
                                y: [-4, 4, -4] 
                              }}
                              transition={isKnockedState ? { duration: 0.18, ease: "easeOut" } : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                              onClick={() => triggerKnock()}
                              className="relative cursor-pointer z-35 hover:brightness-105"
                            >
                               {/* Real beautiful SVG hand vector */}
                               <svg viewBox="0 0 100 100" className="w-32 h-32 text-[#fdba74] filter drop-shadow-2xl">
                                  {/* Arm wrist sleeve */}
                                  <rect x="70" y="35" width="30" height="24" fill="#a8a29e" rx="3" />
                                  <rect x="68" y="32" width="4" height="30" fill="#78716c" rx="1" />
                                  {/* Main Hand Palm */}
                                  <path d="M70 45 C70 45, 60 52, 45 52 C35 52, 28 44, 28 35 C28 26, 36 22, 45 22 C58 22, 70 30, 70 34" fill="#fed7aa" stroke="#c2410c" strokeWidth="2.5" />
                                  {/* Index finger pointer */}
                                  <path d="M45 22 C45 22, 10 20, 10 12 C10 4, 25 4, 35 14" fill="#fed7aa" stroke="#c2410c" strokeWidth="2.5" />
                                  {/* Knock fist knuckles */}
                                  <circle cx="36" cy="30" r="5" fill="#fecdd3" stroke="#be123c" strokeWidth="1.5" />
                                  <circle cx="34" cy="40" r="5" fill="#fecdd3" stroke="#be123c" strokeWidth="1.5" />
                                  <circle cx="38" cy="48" r="5" fill="#fecdd3" stroke="#be123c" strokeWidth="1.5" />
                               </svg>
                               <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[9px] font-black tracking-widest text-[#fed7aa] uppercase animate-pulse drop-shadow-md">
                                  TAP HAND TO KNOCK
                                </div>
                            </motion.div>

                         </div>
                      </div>

                      {/* BOTTOM VIBRATION GRAPH & REALTIME CALIBRATOR */}
                      <div className="absolute bottom-4 inset-x-6 flex items-center justify-between text-zinc-400 text-[10px] font-mono gap-6 bg-[#0c0a09] border border-stone-800 p-3.5 rounded-2xl">
                         
                         {/* Dynamic Signal Graph line */}
                         <div className="flex-1 space-y-1">
                            <span className="text-[7.5px] text-[#f59e0b] font-bold uppercase tracking-wider">📡 ACTIVE REBOUND WAVEFORM MONITOR:</span>
                            <div className="relative w-full h-8 bg-black/60 rounded-md border border-stone-850 overflow-hidden">
                               {/* Draw waves */}
                               <div className="absolute inset-y-1/2 left-0 right-0 h-0.5 bg-amber-500/10" />
                               {isKnockedState ? (
                                  <motion.div 
                                    initial={{ x: "0%" }}
                                    animate={{ x: "100%" }}
                                    transition={{ duration: 0.35, ease: "easeOut" }}
                                    className="absolute inset-y-0 w-full flex items-center"
                                  >
                                     <svg className="w-full h-full text-amber-500" viewBox="0 0 400 30" preserveAspectRatio="none">
                                        <path d="M 0 15 Q 20 -15 40 15 T 80 15 T 120 15 T 160 15 Q 180 35 200 15 T 240 15 T 280 15 Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
                                     </svg>
                                  </motion.div>
                               ) : (
                                  <div className="absolute inset-y-0 w-full flex items-center justify-center text-[7.5px] font-mono text-stone-600 tracking-wider">
                                     ~ FLAT LINE: WAITING FOR BUMP ~
                                  </div>
                               )}
                            </div>
                         </div>

                         {/* Calibration dials */}
                         <div className="flex flex-col gap-1 items-start">
                            <span className="text-[7.5px] text-zinc-500 font-extrabold uppercase tracking-wide">🔧 PIN THRESHOLD (SENSITIVITY): {knockSensitivity}</span>
                            <input 
                              type="range"
                              min="15"
                              max="85"
                              value={knockSensitivity}
                              onChange={(e) => {
                                setKnockSensitivity(Number(e.target.value));
                                setKnockLog(`[SYSTEM] Potentiometer reset. Adjusted knock calibration cutoff to ${e.target.value}.`);
                              }}
                              className="w-36 h-1 cursor-pointer accent-[#cfc8ba] bg-[#efebe4] border border-[#cfc8ba] rounded"
                            />
                         </div>

                      </div>
                   </div>

                   {/* Sandbox confirmation verified trigger */}
                   <div className="flex flex-col items-center gap-2 mt-4">
                      {isKnockComplete && (
                           <motion.button 
                             initial={{ opacity: 0, scale: 0.8 }}
                             animate={{ opacity: 1, scale: 1 }}
                             onClick={onComplete}
                             className="px-12 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-black text-xs uppercase tracking-widest transition-all button-pop flex items-center gap-2 shadow-xl shadow-amber-950/20 hover:brightness-105 cursor-pointer border-none"
                           >
                             Simulation Verified <Trophy size={16} />
                           </motion.button>
                      )}
                   </div>
                </div>
             ) : moduleId === 'humidity' ? (
              <div className="space-y-12 w-full flex flex-col items-center select-none">
                 {/* Main Sandbox Header with Calibration Progress */}
                 <div className="w-full flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-sky-500 font-mono">
                    <span className="flex items-center gap-2">
                       <span className="w-2.5 h-2.5 bg-sky-500 rounded-full animate-pulse" />
                       DHT11 HUMIDIFIER CHAMBER CALIBRATION SYSTEM
                    </span>
                    <span>HUMIDITY MATCH PROGRESS: {isHumidityComplete ? '100% [LOCKED]' : Math.abs(humidityValue - 60) <= 2 ? '90% [ALIGNED]' : '0% [CALIBRATING]'}</span>
                 </div>

                 {/* Simulated Workbench Block */}
                 <div className="h-[430px] w-full rounded-[48px] border-4 border-dashed border-sky-500/30 bg-gradient-to-b from-stone-900 via-stone-950 to-black relative flex flex-col items-center justify-center overflow-hidden transition-all shadow-2xl">
                    {/* Perspective Workbench Grid overlay */}
                    <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                    {/* TOP DISPLAY: Chamber and Humidity visual elements */}
                    <div className="relative w-full h-44 max-w-xl z-10 flex items-center justify-center gap-8">
                       
                       {/* Humidifer Chamber Unit */}
                       <div className="w-48 h-32 bg-zinc-900 border-4 border-zinc-800 rounded-3xl relative overflow-hidden flex flex-col items-center justify-between p-4 shadow-xl">
                          <div className="absolute top-1.5 right-3 text-[5px] font-mono text-zinc-500">DHT11_CHAMBER_V1</div>
                          
                          {/* Humidity Meter ring inside */}
                          <div className="relative w-16 h-16 flex items-center justify-center rounded-full border border-white/5 bg-zinc-950">
                             
                             {/* Mist animation if humidity is growing */}
                             {humidityValue > 50 && (
                                <motion.div 
                                  animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.45, 0.1] }}
                                  transition={{ repeat: Infinity, duration: 1.5 }}
                                  className="absolute inset-1 bg-sky-400/20 rounded-full blur-[4px] pointer-events-none"
                                />
                             )}
                             
                             <div className="text-xl font-mono text-sky-400 font-black tabular-nums">{humidityValue}%</div>
                             <div className="absolute bottom-1.5 text-[5.5px] font-mono text-zinc-500">RH</div>
                          </div>

                          {/* Humidity visual levels badge */}
                          <div className={`px-2.5 py-1 rounded text-[7px] font-black uppercase tracking-wider ${
                            isHumidityComplete ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-400' :
                            Math.abs(humidityValue - 60) <= 2 ? 'bg-amber-950/80 border border-amber-500/50 text-amber-400 font-bold' :
                            humidityValue < 40 ? 'bg-orange-950/80 border border-orange-500/50 text-orange-400 font-bold' :
                            humidityValue < 60 ? 'bg-sky-950/80 border border-sky-500/50 text-sky-450 font-bold' :
                            'bg-sky-950/80 border border-sky-500/50 text-sky-400 font-bold'
                          }`}>
                             {isHumidityComplete ? '🎯 CALIBRATED 60% TEST SUCCESS' :
                              Math.abs(humidityValue - 60) <= 2 ? '⚠️ STEADY STABLE: CLICK CONFIRM' :
                              humidityValue < 40 ? '🌵 TOO ARID (GOAL: 60%)' :
                              humidityValue < 60 ? '👌 SOAKING UP (GOAL: 60%)' :
                              '🌧️ TOO DAMPLY DAMP (GOAL: 60%)'}
                          </div>
                       </div>

                       {/* DHT11 blue breakout module visual */}
                       <div className="w-24 h-32 bg-blue-950/40 border border-blue-500/30 rounded-xl flex flex-col items-center justify-between p-2.5 bg-zinc-900 relative">
                          <div className="text-[5.5px] font-black text-blue-400 font-mono absolute top-2">DHT11 MODULE</div>
                          
                          {/* blue sensor plastic housing */}
                          <div className="w-14 h-16 bg-blue-600 rounded-md border-2 border-blue-700 relative mt-3 flex flex-col justify-around p-1 shadow-md">
                             <div className="grid grid-cols-4 gap-0.5 opacity-50">
                                {[...Array(12)].map((_, i) => (
                                  <div key={i} className="h-0.5 bg-blue-950 rounded-xs" />
                                ))}
                             </div>
                             <div className="w-full h-1 bg-blue-800 rounded-sm" />
                          </div>

                          {/* Pin indicators */}
                          <div className="text-[5px] font-bold text-zinc-400 font-mono tracking-tighter flex gap-2">
                             <span>VCC</span>
                             <span>GND</span>
                             <span>D2</span>
                          </div>
                       </div>

                    </div>

                    {/* BOTTOM HALF: Action Control panels */}
                    <div className="flex gap-12 items-center justify-center relative z-10 scale-90 sm:scale-100">
                       
                       {/* Humidifier Activator console */}
                       <div className="flex flex-col items-center gap-1.5">
                          <button 
                            type="button"
                            onClick={() => {
                              const nextVal = Math.min(100, humidityValue + 5);
                              setHumidityValue(nextVal);
                              if (Math.abs(nextVal - 60) <= 2) {
                                // Align
                              } else {
                                setIsHumidityComplete(false);
                              }
                            }}
                            className="w-16 h-16 rounded-full bg-gradient-to-r from-sky-600 to-blue-500 text-white font-black text-sm flex items-center justify-center shadow-lg shadow-sky-500/20 active:scale-95 hover:brightness-105 cursor-pointer border-none"
                          >
                             💨 +
                          </button>
                          <span className="text-[6.5px] font-mono text-zinc-400 uppercase tracking-widest leading-none font-bold">HUMIDITY +5%</span>
                       </div>

                       {/* Status alignment flow line indicators */}
                       <div className="flex flex-col items-center gap-1.5">
                          <div className="relative w-16 h-10 border border-dashed border-white/10 rounded-xl flex items-center justify-center bg-stone-950/40">
                             <div className="flex items-center gap-1">
                                <motion.div 
                                  animate={{ 
                                    scale: Math.abs(humidityValue - 60) <= 2 ? [1, 1.3, 1] : 1
                                  }}
                                  className={`w-2.5 h-2.5 rounded-full border ${Math.abs(humidityValue - 60) <= 2 ? 'bg-amber-500 border-amber-400' : 'bg-zinc-800'}`}
                                />
                                <div className="w-6 h-0.5 bg-zinc-800 relative overflow-hidden">
                                   <motion.div 
                                     animate={Math.abs(humidityValue - 60) <= 2 ? { x: [-24, 24] } : { x: 0 }}
                                     transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                                     className="absolute inset-y-0 w-3 bg-amber-400"
                                   />
                                </div>
                                <motion.div 
                                  className={`w-2.5 h-2.5 rounded-full border ${isHumidityComplete ? 'bg-emerald-500 border-emerald-400 animate-pulse' : 'bg-zinc-800'}`}
                                />
                             </div>
                          </div>
                          <span className="text-[6.5px] font-mono text-zinc-500 uppercase tracking-widest leading-none">LOCK STATUS</span>
                       </div>

                       {/* Dry Air Fan Activator console */}
                       <div className="flex flex-col items-center gap-1.5">
                          <button 
                            type="button"
                            onClick={() => {
                              const nextVal = Math.max(0, humidityValue - 5);
                              setHumidityValue(nextVal);
                              if (Math.abs(nextVal - 60) <= 2) {
                                // Align
                              } else {
                                setIsHumidityComplete(false);
                              }
                            }}
                            className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-black text-sm flex items-center justify-center shadow-lg shadow-orange-500/20 active:scale-95 hover:brightness-105 cursor-pointer border-none"
                          >
                             🌀 -
                          </button>
                          <span className="text-[6.5px] font-mono text-zinc-400 uppercase tracking-widest leading-none font-bold">DRY FAN -5%</span>
                       </div>

                    </div>

                    {/* Interaction Notice / Quick feedback */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-90">
                       <span className="text-[9px] font-mono text-sky-400 uppercase tracking-widest animate-pulse font-extrabold text-center">
                          {isHumidityComplete ? "✨ SUCCESS: DHT11 IS COMPLETELY CALIBRATED! CLICK VERIFY TO LOCK! ✨" : "👉 USE HUMIDITY (+) AND FAN (-) BUTTONS TO STABILIZE CHAMBER HUMIDITY AT EXACTLY 60% 👈"}
                       </span>
                    </div>
                 </div>

                 {/* Interactive Action cockpit switch */}
                 <div className="flex flex-col items-center gap-6 w-full">
                    
                    <div className="flex flex-col md:flex-row items-center gap-8 bg-zinc-50 border border-black/5 p-6 rounded-3xl w-full max-w-xl justify-around">
                       {/* Tac button to verify calibration inside targets */}
                       <div className="flex flex-col items-center gap-2">
                          <span className="text-[7.5px] font-mono text-zinc-400 uppercase tracking-widest font-black">MCU ENCLOSURE SYNC</span>
                          <button 
                            type="button"
                            disabled={Math.abs(humidityValue - 60) > 2}
                            onClick={() => {
                              if (Math.abs(humidityValue - 60) <= 2) {
                                setIsHumidityComplete(true);
                                setScore(100);
                              }
                            }}
                            className={`px-10 py-3.5 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-md active:translate-y-0.5 cursor-pointer border-none ${
                              Math.abs(humidityValue - 60) <= 2 
                                ? "bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 shadow-emerald-500/20" 
                                : "bg-zinc-300 shadow-none cursor-not-allowed text-zinc-400"
                            }`}
                          >
                             {isHumidityComplete ? "✓ SHIELD LOCKED" : "🤝 CONFIRM 60% LOCK-ON"}
                          </button>
                       </div>
                    </div>

                    {/* Science & MCU Code breakdown label */}
                    <div className="bg-dark/5 p-6 rounded-[32px] text-center border-2 border-black/5 max-w-lg">
                       <p className="font-semibold text-gray-500 uppercase tracking-wider text-[9px] leading-relaxed">
                          Under the Hood: When digital Pin <span className="text-dark font-mono font-bold">D2</span> reads serial bitstreams from the DHT11, a smart polymer capacitor changes resistive capacitance depending on microscopic ambient water vapors. Stabilizing moisture around exactly <span className="text-sky-500 font-bold">60% Relative Humidity (RH)</span> lets the microprocessor synchronize calibration constants, validating the environment with perfect climate precision!
                       </p>
                    </div>

                    {/* Target reset button */}
                    <button 
                      type="button"
                      onClick={() => {
                        setHumidityValue(35);
                        setIsHumidityComplete(false);
                        setScore(0);
                      }}
                      className="text-[9px] font-mono text-zinc-400 hover:text-sky-500 transition-colors uppercase tracking-widest font-black flex items-center gap-1 cursor-pointer mt-1 border-none bg-transparent"
                    >
                      🔄 Reset Chamber Atmosphere
                    </button>

                    {/* Confirm completion button when verified */}
                    <div className="flex justify-center mt-2">
                       {isComplete && (
                         <motion.button 
                           initial={{ opacity: 0, scale: 0.8 }}
                           animate={{ opacity: 1, scale: 1 }}
                           onClick={onComplete}
                           className="px-12 py-5 bg-dark text-white rounded-full font-black text-xs uppercase tracking-widest transition-all button-pop flex items-center gap-2 shadow-xl shadow-dark/20 hover:bg-[#0ea5e9] hover:shadow-sky-500/20 border-none cursor-pointer"
                         >
                           Simulation Verified <Trophy size={16} />
                         </motion.button>
                       )}
                    </div>

                 </div>
              </div>
            ) : moduleId === 'tracking' ? (
              <div className="space-y-6 w-full flex flex-col items-center select-none">
                 {/* Main Sandbox Header with Calibration Progress */}
                 <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] gap-2 font-black uppercase tracking-widest text-indigo-500 font-mono">
                    <span className="flex items-center gap-2">
                       <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-pulse" />
                       TCRT5000 DUAL-INFRARED LINE-TRACKER SIMULATOR
                    </span>
                    <span className="px-3 py-1 rounded bg-indigo-500/10 border border-indigo-500/25 text-indigo-400">
                      TRACK LOCK CONFIDENCE: {isTrackingComplete ? '100% [VERIFIED]' : `${Math.floor((trackingStepCount / 180) * 100)}%`}
                    </span>
                 </div>

                 {/* Interactive Draw-and-Follow Area */}
                 <div className="w-full flex flex-col xl:flex-row gap-6 items-center xl:items-start justify-center">
                   
                   {/* Left Side: The Interactive Canvas Playground */}
                   <div className="w-full max-w-[500px] flex flex-col items-center gap-3">
                     <div className="relative w-full h-[300px] rounded-[32px] border-4 border-dashed border-indigo-500/30 bg-white shadow-2xl overflow-hidden group">
                       
                       {/* Interactive Canvas */}
                       <canvas 
                         ref={canvasRef}
                         width={500}
                         height={300}
                         onMouseDown={handleMouseDown}
                         onMouseMove={handleMouseMove}
                         onMouseUp={handleMouseUp}
                         onMouseLeave={handleMouseUp}
                         onTouchStart={handleTouchStart}
                         onTouchMove={handleTouchMove}
                         onTouchEnd={handleMouseUp}
                         className="absolute inset-0 z-10 cursor-crosshair"
                       />

                       <motion.div 
                         className="absolute w-14 h-16 pointer-events-none z-20"
                         style={{
                           position: 'absolute',
                           left: robotState.x,
                           top: robotState.y,
                           transform: `translate(-50%, -50%) rotate(${(robotState.theta * 180) / Math.PI}deg)`
                         }}
                       >
                         {/* Base coordinate alignment */}
                         <div className="relative w-full h-full flex items-center justify-center animate-none">
                           
                           {/* FLOOR LEVEL SHADOW: Drop-shadow to give height & authentic hover/roll depth */}
                           <div className="absolute top-[8px] left-[4px] w-[40px] h-[40px] bg-black/45 rounded-full filter blur-[4.5px] -z-10 transition-all duration-300 transform scale-95" />

                           {/* Left Wheel 3D */}
                           <div className="absolute -left-[10px] top-[12px] w-[8px] h-[34px] bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-800 rounded-md shadow-md border-r border-zinc-700/40 flex flex-col justify-around overflow-hidden z-0">
                             {/* Rotating metal silver hubcaps inside wheel hub */}
                             <div className="absolute inset-[1px] bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-700 rounded-xs flex items-center justify-center">
                               <div className={`w-[1px] h-[8px] bg-zinc-400 rounded-full ${isSimRunning ? 'animate-spin' : ''}`} style={{ animationDuration: '300ms' }} />
                             </div>
                           </div>

                           {/* Right Wheel 3D */}
                           <div className="absolute -right-[10px] top-[12px] w-[8px] h-[34px] bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-950 rounded-md shadow-md border-l border-zinc-700/40 flex flex-col justify-around overflow-hidden z-0">
                             {/* Rotating metal silver hubcaps inside wheel hub */}
                             <div className="absolute inset-[1px] bg-gradient-to-r from-zinc-700 via-zinc-900 to-zinc-855 rounded-xs flex items-center justify-center">
                               <div className={`w-[1px] h-[8px] bg-zinc-400 rounded-full ${isSimRunning ? 'animate-spin' : ''}`} style={{ animationDuration: '320ms' }} />
                             </div>
                           </div>

                           {/* Flared Bottom Skirt (the lower portion of the bell shape flipping out) */}
                           <div className="absolute w-[50px] h-[50px] bg-gradient-to-b from-white via-zinc-100 to-zinc-250 rounded-[22px] border border-zinc-300 shadow shadow-inner top-[5px] z-5 pointer-events-none" />

                           {/* Antenna Stem */}
                           <div className="absolute -top-[11px] left-[21.5px] w-[5px] h-[12px] bg-gradient-to-r from-zinc-150 via-zinc-50 to-zinc-300 border border-zinc-300 rounded-t-sm shadow-sm z-15 pointer-events-none" />

                           {/* Antenna Globe (White ball with shiny glossy highlight on top) */}
                           <div className="absolute -top-[20px] left-[17px] w-[13px] h-[13px] bg-gradient-to-br from-white via-zinc-100 to-zinc-300 rounded-full border border-zinc-350 shadow-md z-15 flex items-center justify-center pointer-events-none">
                             {/* Gloss spot reflection */}
                             <div className="absolute top-[1.5px] left-[2.5px] w-2 h-1 bg-white/70 rounded-full blur-[0.2px]" />
                           </div>

                           {/* Glossy Dome Body Section (White rounded cup) */}
                           <div className="relative w-[44px] h-[46px] bg-gradient-to-b from-zinc-50 via-white to-zinc-150 border border-zinc-300/80 rounded-[21px] shadow-sm z-10 overflow-hidden flex flex-col items-center justify-start pointer-events-none">
                             
                             {/* Translucent Light Ring: Pulses like the status indicator shown on the top cap */}
                             <div className="absolute top-[6px] left-[2px] right-[2px] h-[3px] bg-indigo-500/10 border-t border-b border-indigo-400/20 shadow-[0_0_6px_rgba(99,102,241,0.55)] animate-pulse" />

                             {/* Gloss Specks Reflection */}
                             <div className="absolute top-[2px] left-[4px] w-[16px] h-[5px] bg-white/70 rounded-full filter blur-[1px] transform rotate-[-8deg]" />

                             {/* Adorable Oval Black Eyes with pupil glint highlights */}
                             <div className="absolute left-[10px] top-[11px] w-[8px] h-[11px] bg-zinc-950 rounded-full flex items-start justify-end p-0.5 shadow-sm">
                               <div className="w-[2px] h-[2px] bg-white rounded-full mt-[0.5px] mr-[0.5px]" />
                             </div>
                             <div className="absolute right-[10px] top-[11px] w-[8px] h-[11px] bg-zinc-950 rounded-full flex items-start justify-end p-0.5 shadow-sm">
                               <div className="w-[2px] h-[2px] bg-white rounded-full mt-[0.5px] mr-[0.5px]" />
                             </div>

                             {/* Horizontal Mouth Groove / shell split gap */}
                             <div className="absolute top-[24px] left-[3px] right-[3px] h-[1.5px] bg-zinc-450/70 border-b border-white/50 rounded-full" />

                             {/* Curved Brilliant Blue Bumper Wrap */}
                             <div className="absolute top-[27px] left-0 right-0 h-[19px] bg-gradient-to-b from-sky-400 via-sky-500 to-indigo-600 border-t border-sky-300 flex items-center justify-around px-1 z-15 shadow-inner">
                               
                               {/* Embedded Left Sensor Receiver Recess Capsule */}
                               <div className="relative w-[16px] h-[9px] bg-zinc-950 rounded border border-zinc-700/60 flex items-center justify-around px-0.5 shadow-inner">
                                 {/* Transmitter emitter (dark black bead) */}
                                 <div className="w-[2px] h-[2px] bg-zinc-900 rounded-full border border-zinc-950" />
                                 {/* Glowing state receiver lamp */}
                                 <div className={`w-[2.5px] h-[2.5px] rounded-full border transition-all duration-150 ${
                                   sensorsState.leftBlack 
                                     ? 'bg-rose-500 border-rose-400 shadow-[0_0_6px_rgba(244,63,94,0.95)]' 
                                     : 'bg-emerald-500 border-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.95)]'
                                 }`} />
                               </div>

                               {/* Embedded Right Sensor Receiver Recess Capsule */}
                               <div className="relative w-[16px] h-[9px] bg-zinc-950 rounded border border-zinc-700/60 flex items-center justify-around px-0.5 shadow-inner">
                                 {/* Transmitter emitter (dark black bead) */}
                                 <div className="w-[2px] h-[2px] bg-zinc-900 rounded-full border border-zinc-950" />
                                 {/* Glowing state receiver lamp */}
                                 <div className={`w-[2.5px] h-[2.5px] rounded-full border transition-all duration-150 ${
                                   sensorsState.rightBlack 
                                     ? 'bg-rose-500 border-rose-400 shadow-[0_0_6px_rgba(244,63,94,0.95)]' 
                                     : 'bg-emerald-500 border-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.95)]'
                                 }`} />
                               </div>

                             </div>

                           </div>

                           {/* Projected IR Beam Visualization reaching forward */}
                           <div className="absolute top-0 transform -translate-y-5 w-8 h-4 flex justify-around pointer-events-none opacity-[0.85]">
                             {/* Left Beam line */}
                             <div className={`w-[2px] h-full ${sensorsState.leftBlack ? 'bg-gradient-to-t from-rose-500/80 to-transparent' : 'bg-gradient-to-t from-emerald-400/80 to-transparent'}`} />
                             {/* Right Beam line */}
                             <div className={`w-[2px] h-full ${sensorsState.rightBlack ? 'bg-gradient-to-t from-rose-500/80 to-transparent' : 'bg-gradient-to-t from-emerald-400/80 to-transparent'}`} />
                           </div>

                         </div>
                       </motion.div>

                       {/* Interactive Drawing Instructions Overlay when blank */}
                       <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[8px] font-semibold text-zinc-350 pointer-events-none uppercase tracking-wider flex items-center gap-1.5 z-20">
                         <span className="w-2 h-2 rounded-full bg-rose-550 animate-pulse" />
                         ✏️ Click & Drag to DRAW custom path lines in real-time!
                       </div>

                     </div>

                     {/* Toolbar Controls under Canvas */}
                     <div className="flex flex-wrap items-center justify-center gap-2 w-full max-w-[500px]">
                       
                       {/* Start/Stop toggle */}
                       <button 
                         type="button"
                         onClick={() => setIsSimRunning(!isSimRunning)}
                         className={`px-4 py-2 rounded-2xl font-black text-[9px] uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md active:translate-y-0.5 border-none cursor-pointer text-white ${
                           isSimRunning 
                             ? "bg-rose-600 shadow-rose-500/10 hover:bg-rose-500" 
                             : "bg-indigo-600 shadow-indigo-500/15 hover:bg-indigo-500"
                         }`}
                       >
                         {isSimRunning ? (
                           <>🛑 Pause Follower</>
                         ) : (
                           <>▶️ Start Bot</>
                         )}
                       </button>

                       {/* Preset Racetrack 1 */}
                       <button 
                         type="button"
                         onClick={drawPresetTrack}
                         className="px-3.5 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-2xl font-black text-[9px] uppercase tracking-wider flex items-center gap-1 transition-colors border-none cursor-pointer animate-none"
                       >
                         🔁 Oval Preset
                       </button>

                       {/* Preset Figures 2 */}
                       <button 
                         type="button"
                         onClick={drawFigure8Track}
                         className="px-3.5 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-2xl font-black text-[9px] uppercase tracking-wider flex items-center gap-1 transition-colors border-none cursor-pointer text-center"
                       >
                         🔀 Figure-8 Preset
                       </button>

                       {/* Clear path */}
                       <button 
                         type="button"
                         onClick={clearTrack}
                         className="px-3.5 py-2 bg-zinc-100 hover:bg-zinc-200 text-red-600 rounded-2xl font-black text-[9px] uppercase tracking-wider flex items-center gap-1 transition-colors border-none cursor-pointer"
                       >
                         <Trash2 size={11} /> Clear Board
                       </button>

                     </div>

                   </div>

                   {/* Right Side: Smart Sensor Cockpit Readings & Visualizer */}
                   <div className="w-full xl:w-56 flex flex-col gap-3">
                     
                     {/* Goal tracking info */}
                     <div className="bg-zinc-50 border border-black/5 rounded-3xl p-4 flex flex-col gap-2.5 text-center">
                       <span className="text-[8px] font-mono font-black text-zinc-400 uppercase tracking-widest block">SIMULATION PROGRESS</span>
                       
                       
                       {/* Circular gauge */}
                       <div className="relative w-14 h-14 mx-auto mt-1 flex items-center justify-center">
                         <svg className="w-full h-full transform -rotate-90">
                           <circle cx="28" cy="28" r="23" className="stroke-zinc-100" strokeWidth="4" fill="transparent" />
                           <circle 
                             cx="28" 
                             cy="28" 
                             r="23" 
                             className="stroke-indigo-600 transition-all duration-300" 
                             strokeWidth="4" 
                             fill="transparent" 
                             strokeDasharray={145}
                             strokeDashoffset={145 - (145 * Math.min(180, trackingStepCount)) / 180}
                           />
                         </svg>
                         <div className="absolute text-[8px] font-black text-indigo-600 font-mono">
                           {Math.floor((Math.min(180, trackingStepCount) / 180) * 100)}%
                         </div>
                       </div>
                     </div>

                   </div>

                 </div>

                 {/* Under the hood mcu explainer block */}
                 <div className="bg-dark/5 p-5 rounded-[32px] text-center border-2 border-black/5 max-w-xl">
                    <p className="font-semibold text-gray-500 uppercase tracking-wider text-[9px] leading-relaxed">
                       Under the Hood: When the robot's infra-red LED beams of TCRT5000 shine onto a white surface, most of the light is reflected back to the adjacent phototransistor (High status). But a dense black ink line absorbs the invisible infrared waves, dropping the reflected voltage to 0V (Low status). By reading these changes, the Arduino implements high-speed feedback steering loops!
                    </p>
                 </div>

                 {/* Confirm completion button when verified */}
                 <div className="flex justify-center mt-1">
                    {isComplete && (
                      <motion.button 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={onComplete}
                        className="px-12 py-5 bg-dark text-white rounded-full font-black text-xs uppercase tracking-widest transition-all button-pop flex items-center gap-2 shadow-xl shadow-dark/20 hover:bg-[#6366f1] hover:shadow-indigo-500/20 border-none cursor-pointer"
                      >
                        Simulation Verified <Trophy size={16} />
                      </motion.button>
                    )}
                 </div>

              </div>
            ) : (moduleId === 'uno' || moduleId === 'nano' || moduleId === 'mega' || type === 'board') ? (
              <CircuitMasterGame moduleId={moduleId} onComplete={onComplete} />
            ) : (
              <div className="w-full space-y-12">
                <div className="space-y-2">
                   <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-primary mb-2">
                     <span className="flex items-center gap-2">
                       <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                       Lab Simulation Active
                     </span>
                     <span>Calibration: {score}%</span>
                   </div>
                  <div className="h-6 w-full bg-gray-100 rounded-full border-2 border-black/5 overflow-hidden p-1">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${score}%` }} 
                      className="h-full bg-primary rounded-full shadow-[0_0_15px_rgba(77,150,255,0.6)]" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setScore(prev => {
                          return Math.min(100, prev + 20);
                        });
                      }}
                      className="aspect-square bg-gray-50 border-4 border-gray-100 rounded-[32px] flex items-center justify-center text-5xl hover:border-primary hover:bg-primary/5 transition-all hard-shadow-dark group"
                    >
                      <span className="group-hover:animate-bounce">📡</span>
                    </motion.button>
                  ))}
                </div>
                <div className="flex flex-col items-center gap-6">
                  <div className="bg-dark/5 p-4 rounded-2xl inline-block">
                    <p className="font-black text-gray-500 uppercase tracking-widest text-[9px]">
                      Click the sensor nodes to input environment data and calibrate the module
                    </p>
                  </div>
                  
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setScore(0)}
                      className="px-8 py-3 bg-white border-2 border-dark/10 hover:border-dark text-dark/60 hover:text-dark rounded-full font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2"
                    >
                      <RotateCcw size={14} /> Reset
                    </button>
                    {isComplete && (
                      <motion.button 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={onComplete}
                        className="px-10 py-3 bg-dark text-white rounded-full font-black text-[10px] uppercase tracking-widest transition-all button-pop flex items-center gap-2 shadow-xl shadow-dark/20"
                      >
                        Mission Complete <ArrowRight size={14} />
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
);
};

// --- EXPORTED MODULE ---

export const ModuleViewer = ({ module, onFinish, type = 'sensor' }: { module: any, onFinish: (score: number) => void, type?: 'sensor' | 'board' }) => {
  const showSimulation = !!module.game;

  const [step, setStep] = useState<'slides' | 'game' | 'quiz'>(() => {
    if (module.slides && module.slides.length > 0) return 'slides';
    if (showSimulation) return 'game';
    return 'quiz';
  });

  const handleSlidesComplete = () => {
    if (showSimulation) {
      setStep('game');
    } else if (module.quiz && module.quiz.length > 0) {
      setStep('quiz');
    } else {
      onFinish(5);
    }
  };

  const handleGameComplete = () => {
    if (module.quiz && module.quiz.length > 0) {
      setStep('quiz');
    } else {
      onFinish(10);
    }
  };

  const isBoard = module.id === 'uno' || module.id === 'nano' || module.id === 'mega' || type === 'board';

  return (
    <div className={`p-4 md:p-8 ${isBoard ? 'max-w-7xl' : 'max-w-5xl'} mx-auto space-y-8`}>
      {/* Header */}
      <div className="flex items-center gap-6 justify-between border-b-4 border-black/5 pb-8">
        <div className="flex items-center gap-6">
          <div className={`w-20 h-20 rounded-[32px] ${module.color || 'bg-gray-800'} text-white flex items-center justify-center shadow-xl border-4 border-black/10`}>
            {module.icon ? <module.icon size={40} strokeWidth={2.5} /> : <Cpu size={40} />}
          </div>
          <div>
            <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">{module.name}</h1>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-1">Sensor Lab Module #404</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-3">
        {[
          { id: 'slides', label: 'Explore', color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary' },
          ...(showSimulation ? [{ id: 'game', label: 'Simulation', color: 'text-secondary', bg: 'bg-secondary/10', border: 'border-secondary' }] : []),
          { id: 'quiz', label: 'Quiz', color: 'text-success', bg: 'bg-success/10', border: 'border-success' }
        ].map((tab) => {
          const isActive = step === tab.id;
          return (
            <motion.button
              key={tab.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStep(tab.id as any)}
              className={`px-8 py-3 rounded-full border-4 transition-all flex items-center justify-center ${
                isActive 
                  ? `${tab.border} ${tab.bg} shadow-sm` 
                  : 'border-gray-100 hover:border-black/5 bg-white text-gray-400'
              }`}
            >
              <span className={`font-black uppercase tracking-widest text-[10px] ${isActive ? 'text-dark' : 'text-gray-400'}`}>
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="pt-4">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            {step === 'slides' && module.slides && module.slides.length > 0 && (
              <Slideshow module={module} onComplete={handleSlidesComplete} />
            )}
            {step === 'game' && module.game && (
              <MiniGame data={module.game} moduleId={module.id} onComplete={handleGameComplete} type={type} />
            )}
            {step === 'quiz' && module.quiz && module.quiz.length > 0 && (
              <QuizView questions={module.quiz} onComplete={onFinish} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
