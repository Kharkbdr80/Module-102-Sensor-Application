import { BoardData } from '../types';
import arduinoUnoIntroImg from '../assets/images/arduino_uno_intro_1780045060893.png';
import arduinoNanoBreadboardImg from '../assets/images/arduino_nano_breadboard_1780035302832.png';
import arduinoNanoPinsImg from '../assets/images/arduino_nano_pins_1780036634079.png';
import arduinoNanoUsbImg from '../assets/images/arduino_nano_usb_1780036040585.png';
import arduinoNanoCarImg from '../assets/images/arduino_nano_car_1780036344363.png';

export const BOARDS: BoardData[] = [
  {
    id: 'uno',
    name: 'Arduino Uno',
    description: 'The most popular board for beginners. It is like the brain of your project!',
    pins: '14 Digital, 6 Analog',
    usb: 'USB Type-B',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1603539304918-09a4d8164021?auto=format&fit=crop&q=80&w=400',
    details: {
      whatIsIt: 'The Arduino Uno is a microcontroller board based on the ATmega328P. It has everything needed to support the microcontroller.',
      parts: ['Digital Pins (0-13)', 'Analog Pins (A0-A5)', 'USB Port', 'Power Jack', 'Reset Button', 'Voltage Regulator'],
      projects: ['Blinking LED', 'Temperature Station', 'Digital Clock', 'Mini Robot']
    },
    slides: [
      {
        title: 'Meet Arduino Uno! 🎉',
        content: '🤖 What is it? Think of Arduino as a tiny, credit-card-sized computer brain that you can use to build your own electronic toys, flashing lights, and smart robots!\n🧠 The Core Brain: Located in the center is a small black computer chip (called ATmega328P) that executes the code you write step-by-step.\n🔌 No Soldering Needed: It is built perfectly for students! You just plug in springy jumper wires to connect sensors and LEDs easily without any hot iron solder.',
        image: arduinoUnoIntroImg
      },
      {
        title: 'Digital Pins (On/Off Switches) 💡',
        content: '🔘 On or Off? Pins 0 to 13 act like high-speed magic light switches!\n📥 Inputs (Listening): A pin can listen to the outside world, like checking if you pressed a tactile button.\n📤 Outputs (Speaking): A pin can send power out, like turning an LED light or a loud buzzer on or off.\n🌊 The Tilde Secret (~): Some pins have a wavy wavy symbol (~). These use a superpower called PWM (Pulse Width Modulation) which lets them adjust brightness or change motor speeds instead of just being fully on or out!',
      },
      {
        title: 'Analog Pins (The Sliders) 🎚️',
        content: '📈 Measuring Intensity: Unlike digital switches, Pins A0 to A5 act like volume control sliders or thermometer lines. They measure "How much?" instead of just "Yes or No".\n🔢 Score from 0 to 1023: They translate raw voltage into a helper score between 0 (completely dark/cold) and 1023 (fully bright/hot).\n☀️ Sensor Helpers: These are perfect for reading light sensors (to see if it is daytime), temperature sensors, or rotation knobs (potentiometers).',
      },
      {
        title: 'Power Pins (The Outlet Station) ⚡',
        content: '🔌 Fuel Outlets (5V & 3.3V): These pins are like tiny power adapters. They send positive electricity out to keep your sensors, buttons, and lights active!\n🏡 GND (Ground - Complete the Circle): Electrical current always needs to travel in a circle to work. GND is like "home"—all electricity travels out from the power pins, does its work, and returns home to GND!\n🔋 Vin (Battery Input): Want to unplug your robot from your laptop and let it run on the floor? You can clip a standard 9V battery to the Vin pin and GND pin to power your creation on the run!',
      },
      {
        title: 'Cool Things Kids Can Build! 🚀',
        content: '🏎️ Robotic Obstacle Cars: Add wheel motors and ultrasonic eyes so your car steers around walls on its own!\n🌡️ Smart Weather Alarms: Make a buzzer sound and display a warning text if your room gets too warm!\n🌱 Automatic Plant Waterers: Let Arduino monitor soil moisture and pump water to your favorite plant whenever it gets thirsty!\n🎒 Smart Blind Assist: Build a handheld cane that buzzes more rapidly as you get closer to walls or doors.',
        fact: 'The Arduino Uno is so reliable that NASA scientists use it to make quick prototypes!'
      },
      {
        title: 'The Great Crooked "Oops"! 🤭',
        content: '👾 A Mouse Slip: Look closely at Pin 7 and Pin 8 on any Arduino Uno. Notice how the gap is weirdly smaller? The creator\'s mouse slipped while drawing the layout on a computer, and he didn\'t notice before printing!\n🔧 Too Famous to Fix: By the time they realized the mistake, thousands of children and adults were already using it. Rewriting the board would make everyone\'s shields and cables break, so they left this cozy mistake on purpose, and it has been crooked for over 15 years!',
      }
    ],
    quiz: [
      { question: 'What is the "brain" of the Arduino Uno?', options: ['The USB Port', 'The ATmega328P Chip', 'The Reset Button', 'The Power Jack'], correct: 1, explanation: 'The ATmega328P is the microcontroller chip that processes all instructions.' },
      { question: 'How many Digital pins does the Uno have?', options: ['10', '20', '14', '6'], correct: 2, explanation: 'The Uno has 14 digital input/output pins (0 to 13).' },
      { question: 'What color is the standard Arduino Uno board?', options: ['Red', 'Green', 'Blue', 'Black'], correct: 2, explanation: 'Most official Arduino boards are characteristically blue.' },
      { question: 'Which pins are used for Analog input?', options: ['D0-D13', 'A0-A5', 'VIN and GND', 'TX and RX'], correct: 1, explanation: 'A0 through A5 are dedicated to analog signals like sensors.' },
      { question: 'What does the Reset button do?', options: ['Deletes your code', 'Restarts the program', 'Turns off the board', 'Changes the language'], correct: 1, explanation: 'It restarts the code currently uploaded to the board from the beginning.' },
      { question: 'Which pin is usually connected to the built-in LED?', options: ['Pin 5', 'Pin 10', 'Pin 13', 'Pin 0'], correct: 2, explanation: 'Pin 13 is internally connected to the "L" LED on the board.' },
      { question: 'How do you power an Arduino Uno?', options: ['USB only', 'Battery only', 'USB or External Power', 'Static Electricity'], correct: 2, explanation: 'You can use the USB cable or the DC power jack (7-12V).' },
      { question: 'What does PWM stand for?', options: ['Power Wave Mode', 'Pulse Width Modulation', 'Plastic Wire Module', 'Parallel Wave Maker'], correct: 1, explanation: 'PWM allows digital pins to simulate analog output (like dimming an LED).' }
    ],
    game: { title: 'Uno Part Matcher', description: 'Drag the labels to the correct parts of the Arduino Uno board.' }
  },
  {
    id: 'nano',
    name: 'Arduino Nano',
    description: 'A tiny but powerful board that fits perfectly on a breadboard.',
    pins: '14 Digital, 8 Analog',
    usb: 'Mini-USB',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&q=80&w=400',
    details: {
      whatIsIt: 'The Nano is a small, complete, and breadboard-friendly board based on the ATmega328.',
      parts: ['Mini-USB Port', 'ICSP Header', 'Reset Button', '30 Pins in two rows'],
      projects: ['Wearable Tech', 'Drone Controllers', 'Small Gadgets', 'Smart Watches']
    },
    slides: [
      { title: 'The Tiny Nano', content: 'The Nano is much smaller than the Uno but can do almost everything the Uno can!' },
      { title: 'Breadboard Best Friend', content: 'Unlike the Uno, the Nano has pins that point down. You can plug it directly into a breadboard.', image: arduinoNanoBreadboardImg },
      { title: 'More Pins?', content: 'The Nano actually has 8 analog pins (A0-A7), which is 2 more than the Uno!', image: arduinoNanoPinsImg },
      { title: 'USB Connections', content: 'The original Nano uses Mini-USB, though newer versions sometimes use Micro-USB or USB-C.', image: arduinoNanoUsbImg },
      { title: 'Where to use Nano?', content: 'Use it when you have very little space, like inside a toy car or a wearable glove.', image: arduinoNanoCarImg }
    ],
    quiz: [
      { question: 'Is the Nano bigger or smaller than the Uno?', options: ['Bigger', 'Smaller', 'Same size', 'It depends'], correct: 1, explanation: 'The Nano is significantly smaller, designed for compact projects.' },
      { question: 'What makes the Nano "breadboard friendly"?', options: ['It is made of bread', 'Its pins point downwards', 'It is very light', 'It does not need wires'], correct: 1, explanation: 'Its pin headers are designed to plug directly into breadboard holes.' },
      { question: 'Which chip does the Nano use?', options: ['Intel i7', 'ATmega328', 'M1 Chip', 'Pentium 4'], correct: 1, explanation: 'The classic Nano uses the same ATmega328 microcontroller as the Uno.' },
      { question: 'How many Analog pins does the Nano have?', options: ['6', '8', '14', '2'], correct: 1, explanation: 'The Nano has 8 analog pins (A0 to A7).' },
      { question: 'What USB type does the standard Nano use?', options: ['USB-C', 'Mini-USB', 'Micro-USB', 'No USB'], correct: 1, explanation: 'The traditional Arduino Nano uses a Mini-USB connector.' },
      { question: 'Can the Nano do PWM?', options: ['Yes', 'No', 'Only on Sundays', 'Only if connected to a PC'], correct: 0, explanation: 'Yes, just like the Uno, the Nano supports PWM on specific pins.' },
      { question: 'Which is better for a wearable device?', options: ['Uno', 'Mega', 'Nano', 'Desktop PC'], correct: 2, explanation: 'The Nano is the best choice because it is small and lightweight.' },
      { question: 'What does the VCC pin do?', options: ['Ground', 'Voltage Input', 'Velocity Control', 'Video Care'], correct: 1, explanation: 'VCC is the main positive voltage supply pin.' }
    ],
    game: { title: 'Nano Pin Master', description: 'Identify the tiny pins on the Arduino Nano to win!' }
  },
  {
    id: 'mega',
    name: 'Arduino Mega 2560',
    description: 'A powerhouse board with 54 digital pins and 16 analog inputs, designed for complex, scale-level robotics and multi-sensor systems.',
    pins: '54 Digital, 16 Analog',
    usb: 'USB Type-B',
    difficulty: 'Advanced',
    image: 'https://images.unsplash.com/photo-1608564697171-2ed41270b78d?auto=format&fit=crop&q=80&w=400',
    details: {
      whatIsIt: 'The Arduino Mega 2560 is a heavy-duty microcontroller board based on the ATmega2560. It offers vast input/output channels and expanded code storage.',
      parts: ['54 Digital Pins', '16 Analog Pins', '4 Hardware Serial UARTs', '256 KB Flash Memory', 'SMD ATmega2560 Chip'],
      projects: ['3D Printers', 'Industrial Arm Controllers', 'Home Automation Panels', 'Multi-Sensor Weather Hubs']
    },
    slides: [
      {
        title: 'Meet the Arduino Mega! 🚀',
        content: '🦖 The Mega Giant: Think of the Arduino Mega as the big, strong brother of the Arduino Uno! It is physically larger and built for gigantic projects with dozens of moving parts.\n💾 Superpowered Memory: It has 8 times more memory storage space than the Uno! This means it can remember huge, complicated instructions and advanced programming recipes easily.\n🔌 Mega Pin Power: Never run out of ports! Inside this board are enough pin connections to build your own mini laboratory.'
      },
      {
        title: 'Digital Pins Galore! 🔌',
        content: '🕹️ 54 Magic Switches: Yes, you read that right! While the Uno has 14 digital pins, the Mega has a massive layout of **54 digital pins** (0 to 53). You can connect screens, button grids, buzzers, and motor controllers all at once!\n🌊 Motor & Light Tuners: 15 of these pins have the wavy wave (PWM) power, letting you gently dim 15 colored lights or control the exact speeds of 15 different motors independently!\n🧱 double Row Stack: To fit so many connections, the Mega wraps its digital pins in beautiful double-row blocks at the end of the board.'
      },
      {
        title: 'A Giant Sensor Party! 🎚️',
        content: '👀 16 Robot Eyes: Instead of just 6 analog slider pins on the Uno, the Mega gives you **16 analog pins** (A0 to A15)! This means your creation can have dozens of ears, temperature sensors, or rotation knobs to feel the world around it.\n📐 Super Precision: Each slider pin reads voltage changes and turns them into a score between 0 (low/dark) and 1023 (high/bright), helping the board make perfect measurements.'
      },
      {
        title: 'Four Hardware Serial Channels 💬',
        content: '🗣️ Talking to Many Friends: Arduino boards talk to other devices (like a laptop, a Bluetooth card, or a GPS sensor) using internal radios called Serial Ports.\n📣 Four Built-in Megaphones: Most boards have only 1 lane to speak. The Mega has **4 physical hardware serial channels** (lanes 0 to 3). This lets it wire-chat with multiple smart devices at once without slow software tricks!'
      },
      {
        title: 'A Brain That Never Forgets! 🧠',
        content: '📚 Massive Code Vault (256 KB): Basic programs are short, but if your project needs a color touch screen or controls a 3D printer, you need lots of storage. Mega has tons of space to keep your projects stable!\n🏃 Fast-Thinking Memory (8 KB SRAM): It has 4 times more instant-thinking memory than the Uno. This keeps all robotic calculations buttery smooth and prevents the system from crashing.',
        fact: 'Most desktop 3D printers that print real plastic toys use an Arduino Mega as their internal computer brain!'
      }
    ],
    quiz: [
      { question: 'What microcontroller chip does the Arduino Mega 2560 use?', options: ['ATmega328P', 'ATmega2560', 'ARM Cortex-M3', 'Intel 8051'], correct: 1, explanation: 'The Arduino Mega uses the high-pins, high-capacity ATmega2560 chip.' },
      { question: 'How many digital input/output pins does the Mega offer?', options: ['14', '28', '40', '54'], correct: 3, explanation: 'The Mega has 54 digital IO pins (0 to 53) for massive expandability.' },
      { question: 'How many analog input pins can you read on the Mega?', options: ['6', '8', '16', '24'], correct: 2, explanation: 'The Mega features 16 analog input pins (A0 to A15) for high-density sensor grids.' },
      { question: 'How many hardware serial UART ports are built on the Mega?', options: ['1', '2', '4', '8'], correct: 2, explanation: 'It features 4 hardware UART interfaces for multi-serial support.' },
      { question: 'Why is the Mega frequently selected for 3D printers?', options: ['It is fireproof', 'Its extensive pin layout supports multiple motors, limit switches, and heaters', 'It runs direct G-code natively without firmware', 'It prints plastic itself'], correct: 1, explanation: '3D printers require many motors (X, Y, Z, Extruder), thermal inputs, and displays, easily managed by the Mega.' },
      { question: 'How much Flash memory does the ATmega2560 have for storing code?', options: ['32 KB', '64 KB', '128 KB', '256 KB'], correct: 3, explanation: 'It has 256 KB of Flash memory, 8 times more than the Arduino Uno.' },
      { question: 'How many of the digital pins can be set to perform PWM output?', options: ['6', '12', '15', '54'], correct: 2, explanation: 'The Mega supports PWM on 15 of its digital pins.' },
      { question: 'What USB port style does the traditional Arduino Mega use?', options: ['Micro-USB', 'Mini-USB', 'USB Type-C', 'USB Type-B'], correct: 3, explanation: 'Like the Uno, the full-size Arduino Mega 2560 uses the large, robust USB Type-B port.' }
    ],
    game: { title: 'Mega Pin Master', description: 'Interact with the heavy-duty ports and multiple UART zones of the Arduino Mega 2560!' }
  }
];
