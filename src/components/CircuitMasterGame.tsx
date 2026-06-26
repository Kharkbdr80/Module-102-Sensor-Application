import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import arduinoMegaImg from '../assets/images/arduino_mega_board_1779971928669.png';
import arduinoUnoImg from '../assets/images/arduino_uno_board_1779428605614.png';

interface CircuitMasterProps {
  moduleId?: string;
  onComplete: () => void;
}

interface NanoPin {
  label: string;
  type: 'digital' | 'analog' | 'power' | 'usb' | 'brain' | 'reset';
  displayName: string;
}

// Labeled educational descriptions matching the key regions on the Arduino board layouts
const itemDescriptions: Record<string, string> = {
  'ATmega2560 Brain': 'The prime microcontroller processing chip (ATmega2560). It runs your firmware, controls all inputs/outputs, and stores up to 256 KB of executable program sketches.',
  'USB Type-B Port': 'The robust USB port used to compile/upload your code from the Arduino IDE, and to deliver standard 5V USB power.',
  'DC Power Jack': 'Coaxial power input port. Allows powering your finished project with a standard external 7V-12V AC-to-DC adapter or 9V battery.',
  'ATmega16U2 Serial Core': 'A secondary ultra-low power chip dedicated to translating PC USB serial interface messages to UART TTL serial communication.',
  'Digital and PWM Sockets': 'A total of 54 general-purpose digital input/output pins! 15 support PWM signal output, and 4 sets support independent hardware UART serial.',
  'Analog Input Sockets': '16 dedicated high-precision analog measuring pins (A0-A15) which convert incoming variable voltages from 0V to 5V into 10-bit integer readings.',
  'Power Interface Sockets': 'Outputs stable regulated voltage supplies (3.3V, 5V, GND, RESET) and takes unregulated external source power through the Vin pin.',
  'Voltage Regulator': 'Under the hood step-down converter which steps down unstable input voltage levels (7-12V DC) down to a stable 5V for safe continuous operation.',
  '16 MHz Crystal Oscillator': 'The synchronous hardware frequency generator. Vibrates exactly 16,000,000 times per second, running the CPU code step-by-step with clock cycles.',
  'ICSP Programming Headers': 'In-Circuit Serial Programming pin headers enabling direct chip-level programming, custom ISP code uploading, and bootloader recovery.',
  'Built-in Status LEDs': 'Diagnostic debug lights: LED connected directly to pin 13 (marked L) and active serial data bus indicators (TX and RX indicating serial data flow).',
  'Reset Button': 'A tactile switch which temporarily pulls the reset pin to GND, rebooting the chip and restarting execution of your program from the beginning.',
  'USB Interface': 'Standard serial-over-USB port that supplies power and handles communication with the central system.',
  'ATmega328 Brain': 'The classic microcontroller chip (ATmega328P) that acts as the core processor of the Arduino Uno, executing loaded program instructions.',
  'Digital Pins': '14 digital input/output pins (0–13) designed to read button states or write digital signals to turn on/off external components like LEDs.',
  'Analog Input Pins': '6 analog measurement pins (A0–A5) that read variable voltages ranging from 0V to 5V and convert them into digital high-precision data.',
  'Power Supply Pins': 'Regulated 5V and 3.3V power outputs, multiple Ground (GND) references, and raw Voltage Input (Vin) to power external circuits.',
};

export const CircuitMasterGame = ({ moduleId = 'uno', onComplete }: CircuitMasterProps) => {
  const isNano = moduleId === 'nano';
  const isMega = moduleId === 'mega';
  const [activeItem, setActiveItem] = useState<{ name: string; type: string } | null>(null);

  // Define top & bottom pin maps for Nano board representation
  const topPins: NanoPin[] = [
    { label: 'D12', type: 'digital', displayName: '🔌 Digital Pin 12' },
    { label: 'D11', type: 'digital', displayName: '🔌 Digital Pin 11 (PWM)' },
    { label: 'D10', type: 'digital', displayName: '🔌 Digital Pin 10 (PWM)' },
    { label: 'D9', type: 'digital', displayName: '🔌 Digital Pin 9 (PWM)' },
    { label: 'D8', type: 'digital', displayName: '🔌 Digital Pin 8' },
    { label: 'D7', type: 'digital', displayName: '🔌 Digital Pin 7' },
    { label: 'D6', type: 'digital', displayName: '🔌 Digital Pin 6 (PWM)' },
    { label: 'D5', type: 'digital', displayName: '🔌 Digital Pin 5 (PWM)' },
    { label: 'D4', type: 'digital', displayName: '🔌 Digital Pin 4' },
    { label: 'D3', type: 'digital', displayName: '🔌 Digital Pin 3 (PWM)' },
    { label: 'D2', type: 'digital', displayName: '🔌 Digital Pin 2' },
  ];

  const bottomPins: NanoPin[] = [
    { label: 'D13', type: 'digital', displayName: '🔌 Digital Pin 13 (LED)' },
    { label: '3V3', type: 'power', displayName: '⚡ 3.3V Power Out' },
    { label: 'REF', type: 'analog', displayName: '🎛️ Analog Reference' },
    { label: 'A0', type: 'analog', displayName: '🎛️ Analog input Pin 0' },
    { label: 'A1', type: 'analog', displayName: '🎛️ Analog input Pin 1' },
    { label: 'A2', type: 'analog', displayName: '🎛️ Analog input Pin 2' },
    { label: 'A3', type: 'analog', displayName: '🎛️ Analog input Pin 3' },
    { label: 'A4', type: 'analog', displayName: '🎛️ Analog input Pin 4' },
    { label: 'A5', type: 'analog', displayName: '🎛️ Analog input Pin 5' },
    { label: 'A6', type: 'analog', displayName: '🎛️ Analog input Pin 6' },
    { label: 'A7', type: 'analog', displayName: '🎛️ Analog input Pin 7' },
  ];

  const megaTopPins: NanoPin[] = [
    { label: 'D53', type: 'digital', displayName: '🔌 Digital Pin 53' },
    { label: 'D51', type: 'digital', displayName: '🔌 Digital Pin 51' },
    { label: 'D49', type: 'digital', displayName: '🔌 Digital Pin 49' },
    { label: 'D47', type: 'digital', displayName: '🔌 Digital Pin 47' },
    { label: 'D45', type: 'digital', displayName: '🔌 Digital Pin 45' },
    { label: 'D43', type: 'digital', displayName: '🔌 Digital Pin 43' },
    { label: 'D41', type: 'digital', displayName: '🔌 Digital Pin 41' },
    { label: 'D39', type: 'digital', displayName: '🔌 Digital Pin 39' },
    { label: 'TX1', type: 'digital', displayName: '🔌 UART Serial 1 TX' },
    { label: 'RX1', type: 'digital', displayName: '🔌 UART Serial 1 RX' }
  ];

  const megaBottomPins: NanoPin[] = [
    { label: '5V', type: 'power', displayName: '⚡ 5V Power Supply' },
    { label: '3V3', type: 'power', displayName: '⚡ 3.3V Power Supply' },
    { label: 'GND', type: 'power', displayName: '⚡ Ground Pin' },
    { label: 'A0', type: 'analog', displayName: '🎛️ Analog input Pin 0' },
    { label: 'A1', type: 'analog', displayName: '🎛️ Analog input Pin 1' },
    { label: 'A2', type: 'analog', displayName: '🎛️ Analog input Pin 2' },
    { label: 'A8', type: 'analog', displayName: '🎛️ Analog input Pin 8' },
    { label: 'A9', type: 'analog', displayName: '🎛️ Analog input Pin 9' },
    { label: 'A15', type: 'analog', displayName: '🎛️ Analog input Pin 15' },
    { label: 'AREF', type: 'analog', displayName: '🎛️ Analog Reference' }
  ];

  const handleSelect = (name: string, type: string) => {
    setActiveItem({ name, type });
  };

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case 'digital':
        return 'bg-cyan-500 border-cyan-600 shadow-[0_0_15px_rgba(6,182,212,0.4)]';
      case 'analog':
        return 'bg-emerald-500 border-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.4)]';
      case 'power':
        return 'bg-amber-500 border-amber-600 shadow-[0_0_15px_rgba(245,158,11,0.4)]';
      case 'usb':
        return 'bg-blue-500 border-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.4)]';
      case 'brain':
        return 'bg-purple-500 border-purple-600 shadow-[0_0_15px_rgba(168,85,247,0.4)]';
      case 'reset':
        return 'bg-rose-500 border-rose-600 shadow-[0_0_15px_rgba(244,63,94,0.4)]';
      default:
        return 'bg-slate-500 border-slate-600';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'digital': return 'Digital Input/Output Port';
      case 'analog': return 'Analog Input Port';
      case 'power': return 'Power Supply Pin';
      case 'usb': return 'Communication Path';
      case 'brain': return 'Control Core';
      case 'reset': return 'System Reset Switch';
      default: return 'Board Component';
    }
  };

  return (
    <div className={`w-full ${isMega ? 'max-w-6xl' : 'max-w-4xl'} mx-auto flex flex-col items-center justify-center py-6 px-4 space-y-8 select-none`}>
      
      {/* Visual Header */}
      <div className="text-center">
        <span className="text-[10px] font-black tracking-widest text-[#00878C] uppercase">
          Virtual Control Panel
        </span>
        <h3 className="text-xl font-extrabold text-slate-800 tracking-tight uppercase mt-1">
          {isNano ? 'Arduino Nano Hardware Sandbox' : isMega ? 'Arduino Mega 2560 Hardware Sandbox' : 'Arduino Uno Hardware Sandbox'}
        </h3>
        <div className="h-1 w-10 bg-[#00878C] mx-auto mt-2 rounded-full" />
      </div>

      {isNano ? (
        /* SENSATIONAL HIGH-FIDELITY SCHEMATIC VECTOR IMPLEMENTATION OF ARDUINO NANO */
        <div className="relative w-full max-w-[700px] h-[360px] bg-[#1a4a75] rounded-[24px] border-[5px] border-slate-700/85 shadow-2xl overflow-hidden p-6 flex flex-col justify-between items-center select-none">
          {/* Solder grid background */}
          <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />

          {/* TOP PIN ROW WITH LABELS AND HOLES */}
          <div className="w-full flex justify-between px-10 relative z-10">
            {topPins.map((pin, index) => {
              const isItemActive = activeItem?.name === pin.label;
              return (
                <div key={index} className="flex flex-col items-center space-y-2">
                  {/* Metal solder pin hole button */}
                  <button
                    onClick={() => handleSelect(pin.label, pin.type)}
                    className={`w-7 h-7 rounded-full border-2 border-stone-400 bg-amber-50 flex items-center justify-center cursor-pointer transition-all duration-150 ${
                      isItemActive ? 'ring-4 ring-cyan-400 scale-110 shadow-[0_0_12px_rgba(34,211,238,1)]' : 'hover:scale-105 hover:bg-zinc-100'
                    }`}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-900 shadow-inner" />
                  </button>
                  {/* Pin text layout label below connection hole */}
                  <span className={`text-[9px] font-mono font-black tracking-tighter ${
                    isItemActive ? 'text-cyan-300 scale-105' : 'text-slate-200/90'
                  }`}>
                    {pin.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* MID LAYER (USB PORT on left, ATMega328 in center, Reset on Right) */}
          <div className="w-full flex justify-between items-center px-6 relative z-10 my-1">
            
            {/* 1. Metal MINI-USB PORT */}
            <button
              onClick={() => handleSelect('USB Port', 'usb')}
              className={`w-20 h-16 bg-gradient-to-r from-zinc-300 to-zinc-200 rounded-r-lg border-y-2 border-r-2 border-zinc-400 flex flex-col items-center justify-center cursor-pointer relative transition-all duration-200 -ml-6 shadow-md hover:from-zinc-200 ${
                activeItem?.name === 'USB Port' ? 'ring-4 ring-blue-400 scale-102 shadow-[0_0_15px_rgba(59,130,246,0.6)]' : ''
              }`}
            >
              <span className="text-[7px] font-mono font-black text-slate-800 tracking-wiest uppercase leading-none">MINI USB</span>
              <div className="w-12 h-5 bg-zinc-400 rounded-sm mt-1 border-t border-zinc-500 flex items-center justify-center">
                <span className="text-[5px] font-mono font-black text-zinc-800 tracking-tight">USA 2009</span>
              </div>
            </button>

            {/* 2. Microcontroller core ATmega328P */}
            <button
              onClick={() => handleSelect('ATmega328 Brain', 'brain')}
              className={`w-28 h-28 bg-neutral-900 border-2 border-neutral-750 rounded-xl flex flex-col items-center justify-center relative rotate-45 cursor-pointer transition-all duration-200 shadow-xl ${
                activeItem?.name === 'ATmega328 Brain' ? 'border-purple-400 ring-4 ring-purple-400/40 shadow-[0_0_24px_rgba(168,85,247,0.8)] scale-105' : 'hover:border-zinc-500'
              }`}
            >
              <div className="-rotate-45 text-center flex flex-col items-center">
                <span className="text-[7.5px] font-mono font-black text-rose-500 uppercase tracking-widest leading-none mb-1 animate-pulse">ATMEGA</span>
                <span className="text-[9px] font-bold text-white tracking-widest">328P</span>
                <div className="w-3 h-3 bg-neutral-950 rounded-full border border-neutral-800 flex items-center justify-center mt-1">
                  <div className="w-1 h-1 rounded-full bg-[#00878C]" />
                </div>
              </div>
            </button>

            {/* 3. Tact Reset Button */}
            <button
              onClick={() => handleSelect('Reset Button', 'reset')}
              className={`w-14 h-14 bg-stone-300 border-2 border-stone-400 rounded-xl flex items-center justify-center p-2 cursor-pointer transition-all duration-150 shadow-md ${
                activeItem?.name === 'Reset Button' ? 'ring-4 ring-rose-400 scale-105' : 'hover:bg-amber-50'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-inner ${
                activeItem?.name === 'Reset Button' ? 'bg-rose-500 animate-pulse' : 'bg-red-600'
              }`}>
                <div className="w-3 h-3 rounded-full bg-red-800/80" />
              </div>
            </button>
          </div>

          {/* BOTTOM PIN ROW WITH LABELS AND HOLES */}
          <div className="w-full flex justify-between px-10 relative z-10">
            {bottomPins.map((pin, index) => {
              const isItemActive = activeItem?.name === pin.label;
              return (
                <div key={index} className="flex flex-col items-center space-y-2">
                  {/* Pin text layout label above connection hole */}
                  <span className={`text-[9px] font-mono font-black tracking-tighter ${
                    isItemActive ? 'text-cyan-300 scale-105' : 'text-slate-200/90'
                  }`}>
                    {pin.label}
                  </span>
                  {/* Metal solder pin hole button */}
                  <button
                    onClick={() => handleSelect(pin.label, pin.type)}
                    className={`w-7 h-7 rounded-full border-2 border-stone-400 bg-amber-50 flex items-center justify-center cursor-pointer transition-all duration-150 ${
                      isItemActive ? 'ring-4 ring-cyan-400 scale-110 shadow-[0_0_12px_rgba(34,211,238,1)]' : 'hover:scale-105 hover:bg-zinc-100'
                    }`}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-900 shadow-inner" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Solder labeling markings */}
          <div className="absolute right-6 top-6 flex flex-col items-end opacity-25">
            <span className="text-[10px] font-mono font-black text-white uppercase tracking-widest leading-none">NANO v3.0</span>
            <span className="text-[6px] font-semibold text-white uppercase tracking-wider mt-1">ARDUINO - CC</span>
          </div>
        </div>
      ) : isMega ? (
        /* 100% exact replica of the user-uploaded Arduino Mega 2560, with interactive labels matching labels 1 to 11 */
        <div className="relative w-full max-w-[1020px] aspect-[2/1] bg-slate-950/20 border-[5px] border-[#00878C]/30 rounded-[28px] shadow-3xl p-2 flex flex-col justify-center items-center overflow-hidden select-none">
          <img
            src={arduinoMegaImg}
            alt="Arduino Mega 2560 Board Layout (Numbered)"
            className="w-full h-full object-contain filter drop-shadow-lg"
            referrerPolicy="no-referrer"
          />

          {/* Hotspots for each of the numbered components */}
          {/* Label 1: ATmega2560 Brain */}
          <button
            onClick={() => handleSelect('ATmega2560 Brain', 'brain')}
            title="[1] ATmega2560 Brain"
            className={`absolute left-[45%] top-[30%] w-[15%] h-[32%] rounded-md cursor-pointer border-2 transition-all z-20 hover:bg-purple-400/20 ${
              activeItem?.name === 'ATmega2560 Brain' ? 'border-purple-500 bg-purple-500/25 shadow-[0_0_12px_rgba(168,85,247,0.7)] animate-pulse' : 'border-transparent'
            }`}
          />

          {/* Label 2: USB Type-B Port */}
          <button
            onClick={() => handleSelect('USB Type-B Port', 'usb')}
            title="[2] USB Type-B Port"
            className={`absolute left-[0%] top-[15%] w-[17%] h-[28%] rounded-md cursor-pointer border-2 transition-all z-20 hover:bg-blue-400/20 ${
              activeItem?.name === 'USB Type-B Port' ? 'border-blue-500 bg-blue-500/25 shadow-[0_0_12px_rgba(59,130,246,0.7)] animate-pulse' : 'border-transparent'
            }`}
          />

          {/* Label 3: DC Power Jack */}
          <button
            onClick={() => handleSelect('DC Power Jack', 'power')}
            title="[3] DC Power Jack"
            className={`absolute left-[4%] top-[72%] w-[15%] h-[24%] rounded-md cursor-pointer border-2 transition-all z-20 hover:bg-amber-400/20 ${
              activeItem?.name === 'DC Power Jack' ? 'border-amber-500 bg-amber-500/25 shadow-[0_0_12px_rgba(245,158,11,0.7)] animate-pulse' : 'border-transparent'
            }`}
          />

          {/* Label 4: ATmega16U2 Serial Core */}
          <button
            onClick={() => handleSelect('ATmega16U2 Serial Core', 'brain')}
            title="[4] ATmega16U2 Serial Controller"
            className={`absolute left-[21%] top-[28%] w-[7%] h-[14%] rounded-md cursor-pointer border-2 transition-all z-20 hover:bg-purple-400/20 ${
              activeItem?.name === 'ATmega16U2 Serial Core' ? 'border-purple-500 bg-purple-500/25 shadow-[0_0_12px_rgba(168,85,247,0.7)] animate-pulse' : 'border-transparent'
            }`}
          />

          {/* Label 5: Digital and PWM Sockets (divided into top and right headers) */}
          <button
            onClick={() => handleSelect('Digital and PWM Sockets', 'digital')}
            title="[5] Digital and PWM Sockets (Top)"
            className={`absolute left-[22%] top-[0%] w-[66%] h-[12%] rounded-md cursor-pointer border-2 transition-all z-20 hover:bg-cyan-400/20 ${
              activeItem?.name === 'Digital and PWM Sockets' ? 'border-cyan-500 bg-cyan-500/25 shadow-[0_0_12px_rgba(34,211,238,0.7)] animate-pulse' : 'border-transparent'
            }`}
          />
          <button
            onClick={() => handleSelect('Digital and PWM Sockets', 'digital')}
            title="[5] Digital and PWM Sockets (Right)"
            className={`absolute left-[91%] top-[0%] w-[9%] h-[87%] rounded-md cursor-pointer border-2 transition-all z-20 hover:bg-cyan-400/20 ${
              activeItem?.name === 'Digital and PWM Sockets' ? 'border-cyan-500 bg-cyan-500/25 shadow-[0_0_12px_rgba(34,211,238,0.7)] animate-pulse' : 'border-transparent'
            }`}
          />

          {/* Label 6: Analog Input Sockets */}
          <button
            onClick={() => handleSelect('Analog Input Sockets', 'analog')}
            title="[6] Analog Input Sockets"
            className={`absolute left-[51%] top-[90%] w-[41%] h-[10%] rounded-md cursor-pointer border-2 transition-all z-20 hover:bg-cyan-400/20 ${
              activeItem?.name === 'Analog Input Sockets' ? 'border-cyan-500 bg-cyan-500/25 shadow-[0_0_12px_rgba(34,211,238,0.7)] animate-pulse' : 'border-transparent'
            }`}
          />

          {/* Label 7: Power Interface Sockets */}
          <button
            onClick={() => handleSelect('Power Interface Sockets', 'power')}
            title="[7] Power Interface Sockets"
            className={`absolute left-[30%] top-[90%] w-[20%] h-[10%] rounded-md cursor-pointer border-2 transition-all z-20 hover:bg-amber-400/20 ${
              activeItem?.name === 'Power Interface Sockets' ? 'border-amber-500 bg-amber-500/25 shadow-[0_0_12px_rgba(245,158,11,0.7)] animate-pulse' : 'border-transparent'
            }`}
          />

          {/* Label 8: Voltage Regulator */}
          <button
            onClick={() => handleSelect('Voltage Regulator', 'power')}
            title="[8] Voltage Regulator"
            className={`absolute left-[10%] top-[57%] w-[9%] h-[16%] rounded-md cursor-pointer border-2 transition-all z-20 hover:bg-rose-400/20 ${
              activeItem?.name === 'Voltage Regulator' ? 'border-rose-500 bg-rose-500/25 shadow-[0_0_12px_rgba(244,63,94,0.7)] animate-pulse' : 'border-transparent'
            }`}
          />

          {/* Label 9: 16 MHz Crystal Oscillator */}
          <button
            onClick={() => handleSelect('16 MHz Crystal Oscillator', 'power')}
            title="[9] 16 MHz Crystal Oscillator"
            className={`absolute left-[70%] top-[36%] w-[9%] h-[20%] rounded-md cursor-pointer border-2 transition-all z-20 hover:bg-teal-400/20 ${
              activeItem?.name === '16 MHz Crystal Oscillator' ? 'border-teal-500 bg-teal-500/25 shadow-[0_0_12px_rgba(20,184,166,0.7)] animate-pulse' : 'border-transparent'
            }`}
          />

          {/* Label 10: ICSP Programming Headers (Two regions marked with 10) */}
          <button
            onClick={() => handleSelect('ICSP Programming Headers', 'usb')}
            title="[10] ICSP SPI Header"
            className={`absolute left-[19%] top-[7%] w-[9%] h-[13%] rounded-md cursor-pointer border-2 transition-all z-[22] hover:bg-orange-400/10 ${
              activeItem?.name === 'ICSP Programming Headers' ? 'border-orange-500 bg-orange-500/25 shadow-[0_0_12px_rgba(249,115,22,0.7)] animate-pulse' : 'border-transparent'
            }`}
          />
          <button
            onClick={() => handleSelect('ICSP Programming Headers', 'usb')}
            title="[10] ATmega2560 ICSP Header"
            className={`absolute left-[62%] top-[38%] w-[7%] h-[18%] rounded-md cursor-pointer border-2 transition-all z-20 hover:bg-orange-400/10 ${
              activeItem?.name === 'ICSP Programming Headers' ? 'border-orange-500 bg-orange-500/25 shadow-[0_0_12px_rgba(249,115,22,0.7)] animate-pulse' : 'border-transparent'
            }`}
          />

          {/* Label 11: Built-in Status LEDs */}
          <button
            onClick={() => handleSelect('Built-in Status LEDs', 'digital')}
            title="[11] Built-in Status LEDs"
            className={`absolute left-[27%] top-[18%] w-[7%] h-[21%] rounded-md cursor-pointer border-2 transition-all z-20 hover:bg-yellow-400/20 ${
              activeItem?.name === 'Built-in Status LEDs' ? 'border-yellow-500 bg-yellow-500/25 shadow-[0_0_12px_rgba(234,179,8,0.7)] animate-pulse' : 'border-transparent'
            }`}
          />

          {/* Reset Button */}
          <button
            onClick={() => handleSelect('Reset Button', 'reset')}
            title="Reset Button"
            className={`absolute left-[1%] top-[8%] w-[5%] h-[9%] rounded-md cursor-pointer border-2 transition-all z-20 hover:bg-red-400/20 ${
              activeItem?.name === 'Reset Button' ? 'border-red-500 bg-red-500/25 shadow-[0_0_12px_rgba(239,68,68,0.7)] animate-pulse' : 'border-transparent'
            }`}
          />
        </div>
      ) : (
        /* HIGH-FIDELITY INTERACTIVE ARDUINO UNO HARDWARE PLAYGROUND RENDERING */
        <div className="relative w-full max-w-[700px] aspect-[400/280] bg-slate-50 border-4 border-slate-200/80 rounded-[24px] overflow-hidden flex items-center justify-center shadow-lg group">
          {/* Hardware grid subtle trace lines */}
          <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#00878C_1px,transparent_1px),linear-gradient(to_bottom,#00878C_1px,transparent_1px)] bg-[size:15px_15px] pointer-events-none" />

          {/* Real reference image matching the Playground explorer */}
          <img
            src={arduinoUnoImg}
            alt="Arduino Uno Board Reference"
            className="w-full h-full object-fill opacity-100 select-none pointer-events-none filter drop-shadow-sm"
            referrerPolicy="no-referrer"
          />

          {/* Overlay matching CircuitMaster interactive hotspots perfectly */}
          
          {/* 1. Digital Pins (top slot - 0 to 13) */}
          <button
            onClick={() => handleSelect('Digital Pins', 'digital')}
            title="Digital Pins (0-13)"
            style={{ left: '32.0%', top: '2.0%', width: '63.0%', height: '13.0%' }}
            className={`absolute rounded-md cursor-pointer transition-all duration-200 z-10 ${
              activeItem?.name === 'Digital Pins'
                ? 'border-[3.5px] border-[#00878C] bg-[#00878C]/15 shadow-[0_0_20px_rgba(0,135,140,0.55)] scale-[1.01]'
                : 'border border-transparent hover:border-[#00878C]/65 bg-transparent'
            }`}
          />

          {/* 2. Analog Input Pins (bottom right - A0 to A5) */}
          <button
            onClick={() => handleSelect('Analog Input Pins', 'analog')}
            title="Analog Input Pins (A0-A5)"
            style={{ left: '71.5%', top: '83.5%', width: '24.0%', height: '14.0%' }}
            className={`absolute rounded-md cursor-pointer transition-all duration-200 z-10 ${
              activeItem?.name === 'Analog Input Pins'
                ? 'border-[3.5px] border-emerald-500 bg-emerald-500/15 shadow-[0_0_20px_rgba(16,185,129,0.55)] scale-[1.01]'
                : 'border border-transparent hover:border-emerald-500/65 bg-transparent'
            }`}
          />

          {/* 3. Power Pins (bottom middle) */}
          <button
            onClick={() => handleSelect('Power Supply Pins', 'power')}
            title="Power Supply Pins (5V, 3.3V, GND)"
            style={{ left: '41.5%', top: '83.5%', width: '27.5%', height: '14.0%' }}
            className={`absolute rounded-md cursor-pointer transition-all duration-200 z-10 ${
              activeItem?.name === 'Power Supply Pins'
                ? 'border-[3.5px] border-amber-400 bg-amber-400/15 shadow-[0_0_20px_rgba(245,158,11,0.55)] scale-[1.01]'
                : 'border border-transparent hover:border-amber-400/65 bg-transparent'
            }`}
          />

          {/* 4. USB Interface (middle left) */}
          <button
            onClick={() => handleSelect('USB Interface', 'usb')}
            title="USB Interface"
            style={{ left: '2.0%', top: '19.5%', width: '22.0%', height: '38.0%' }}
            className={`absolute rounded-md cursor-pointer transition-all duration-200 z-10 ${
              activeItem?.name === 'USB Interface'
                ? 'border-[3.5px] border-blue-400 bg-blue-400/15 shadow-[0_0_20px_rgba(59,130,246,0.55)] scale-[1.01]'
                : 'border border-transparent hover:border-blue-400/65 bg-transparent'
            }`}
          />

          {/* 5. Reset Button (top left) */}
          <button
            onClick={() => handleSelect('Reset Button', 'reset')}
            title="Reset Button"
            style={{ left: '4.0%', top: '3.5%', width: '11.5%', height: '14.0%' }}
            className={`absolute rounded-md cursor-pointer transition-all duration-200 z-10 ${
              activeItem?.name === 'Reset Button'
                ? 'border-[3.5px] border-rose-500 bg-rose-500/15 shadow-[0_0_20px_rgba(239,68,68,0.55)] scale-[1.01]'
                : 'border border-transparent hover:border-rose-500/65 bg-transparent'
            }`}
          />

          {/* 6. ATmega328P Microcontroller Brain (lower middle-right) */}
          <button
            onClick={() => handleSelect('ATmega328 Brain', 'brain')}
            title="ATmega328P Microcontroller Brain"
            style={{ left: '45.0%', top: '65.0%', width: '48.0%', height: '18.0%' }}
            className={`absolute rounded-md cursor-pointer transition-all duration-200 z-10 ${
              activeItem?.name === 'ATmega328 Brain'
                ? 'border-[3.5px] border-purple-500 bg-purple-500/15 shadow-[0_0_20px_rgba(168,85,247,0.55)] scale-[1.01]'
                : 'border border-transparent hover:border-purple-500/65 bg-transparent'
            }`}
          />
        </div>
      )}

      {/* State display zone with accurate bounding-box visual border - NO description text! */}
      <div className="w-full max-w-md">
        {activeItem ? (
          <div className={`w-full border-2 text-white rounded-2xl p-5 shadow-lg flex flex-col items-center justify-center animate-[fadeIn_0.15s_ease-out] ${getBadgeStyle(activeItem.type)}`}>
            <span className="text-[10px] font-black tracking-widest uppercase opacity-80 mb-1">
              {getTypeLabel(activeItem.type)}
            </span>
            <div className="text-lg sm:text-lg font-black tracking-normal uppercase text-center bg-black/15 py-1.5 px-6 rounded-xl">
              {activeItem.name === 'ATmega328 Brain' || activeItem.name === 'Reset Button' || activeItem.name === 'USB Port' || activeItem.name === 'USB Interface' || activeItem.name === 'Power Supply Pins' || activeItem.name === 'Analog Input Pins' || activeItem.name === 'Digital Pins' || activeItem.name.includes('Core') || activeItem.name.includes('Sockets') || activeItem.name.includes('Oscillator') || activeItem.name.includes('Headers') || activeItem.name.includes('LEDs') || activeItem.name.includes('Jack') || activeItem.name.includes('Regulator') ? activeItem.name : `${activeItem.name} PORT`}
            </div>
            {itemDescriptions[activeItem.name] && (
              <p className="text-xs text-center mt-3 opacity-90 leading-relaxed font-semibold bg-black/20 py-2.5 px-4 rounded-xl max-w-sm">
                💡 {itemDescriptions[activeItem.name]}
              </p>
            )}
            <button
              onClick={() => setActiveItem(null)}
              className="mt-4 inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest bg-white text-zinc-900 px-3.5 py-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <RotateCcw size={10} strokeWidth={3} /> Clear Selection
            </button>
          </div>
        ) : (
          <div className="w-full text-center py-6 px-4 border border-dashed border-slate-200 bg-slate-50/60 rounded-2xl">
            <span className="text-[10px] font-black tracking-widest text-[#00878C] uppercase">
              Awaiting Interaction
            </span>
            <p className="text-[11px] text-slate-500 font-extrabold mt-1 max-w-xs mx-auto">
              Tap any pin connection, chip, or USB interface on the model board to identify it.
            </p>
          </div>
        )}
      </div>

      {/* Navigation Block */}
      <div className="flex justify-center pt-2">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-md flex items-center gap-2 hover:bg-slate-800 transition-colors cursor-pointer"
        >
          Go to Final Quiz <ArrowRight size={14} strokeWidth={3} />
        </motion.button>
      </div>

    </div>
  );
};
