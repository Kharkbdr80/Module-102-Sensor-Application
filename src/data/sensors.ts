import { SensorData } from '../types';
import { 
  Compass, Activity, Zap, Thermometer, Lightbulb, Waves, Volume2, Flame, 
  Wind, Droplets, Move, ArrowRightLeft, Eye, RefreshCcw, Grid3X3, Heart, 
  Navigation, Disc, CircleDot, Maximize, Cloud, Radar, Fingerprint
} from 'lucide-react';
import hcSr04SensorImg from '../assets/images/hc_sr04_real_photo_1779684996005.png';
import tiltSwitchSensorImg from '../assets/images/tilt_switch_sensor_1779685151972.png';
import irSensorAnnotatedImg from '../assets/images/ir_sensor_uploaded_1779686000000_1779686826826.png';
import reedSwitchSensorImg from '../assets/images/reed_switch_sensor_1779687095094.png';
import joystickSensorImg from '../assets/images/joystick_sensor_annotated_1779687202180.png';
import rotaryEncoderSensorImg from '../assets/images/rotary_encoder_uploaded_1779687298453.png';
import flameSensorImg from '../assets/images/flame_sensor_annotated_1779687431102.png';
import smokeSensorImg from '../assets/images/smoke_sensor_replicated_1779687538752.png';
import soilMoistureSensorImg from '../assets/images/soil_moisture_sensor_replicated_1779687671329.png';
import soundSensorImg from '../assets/images/sound_sensor_annotated_1779687838158.png';
import lightCupSensorImg from '../assets/images/light_cup_sensor_replicated_1779687945724.png';
import knockSensorImg from '../assets/images/knock_sensor_replicated_1779688047101.png';
import dotMatrixSensorImg from '../assets/images/dot_matrix_sensor_1779688140829.png';
import ldrSensorImg from '../assets/images/ldr_sensor_replicated_1779688231650.png';
import heartbeatSensorImg from '../assets/images/pulse_sensor_img_1779858687755.png';
import laserSensorImg from '../assets/images/laser_sensor_img_1779859241286.png';
import humiditySensorImg from '../assets/images/humidity_sensor_dht11_1779860379846.png';
import trackingSensorImg from '../assets/images/tracking_sensor_tcrt5000_1779860827109.png';
import touchSensorImg from '../assets/images/touch_sensor_ttp223_1779862321055.png';


export const SENSORS: SensorData[] = [
  {
    id: 'tilt',
    name: 'Tilt Switch',
    description: 'Detects when something is tilted or shaken.',
    icon: Compass,
    color: 'bg-blue-500',
    category: 'Motion',
    slides: [
      {
        title: 'Sensor Image',
        content: '',
        image: tiltSwitchSensorImg
      },
      { 
        title: 'What is a Tilt Switch?', 
        content: "The Definition: It is a simple digital sensor that detects when an object leans, flips, or tilts over.\n\nThe Gravity Switch: Unlike a regular light switch you flip with your finger, this switch is flipped automatically by gravity!\n\nThe Detective: It tells your robot exactly when it is standing up straight or when it has accidentally fallen over." 
      },
      { 
        title: 'How It Works (The 3 Steps)', 
        content: "The Secret Chamber: Inside the sensor is a tiny hollow tube with a small metal ball and two little metal pins at the bottom.\n\nStanding Up (ON): When the sensor is upright, gravity pulls the metal ball down so it touches both pins. This acts like a closed gate, allowing electricity to flow through.\n\nTipping Over (OFF): When you tilt the sensor, the ball rolls away from the pins. This opens the gate, stops the electricity, and tells the computer the sensor is now tilted!" 
      },
      { 
        title: '3 Real-Life Uses', 
        content: "1. Safety Heaters: Portable heaters use these to turn off instantly if a pet or person knocks them over, preventing fires.\n\n2. Digital Levelers: Builders use tools with these sensors to make sure floors and walls are perfectly straight and not leaning.\n\n3. Handheld Games: Some toy games use tilt switches so you can control a character or steer a car just by tilting the screen." 
      },
      { 
        title: 'Fun Fact! 🕹️', 
        content: "Don't Cheat the Machine!\n\nOld Pinball machines have a built-in tilt switch called a \"Tilt Bob.\" If a player gets frustrated and tries to shake or lift the machine to move the pinball, the sensor detects the movement, screams \"TILT!\" in big red letters, and freezes the game so the player can't score!" 
      }
    ],
    quiz: [
      { question: 'What does a Tilt Switch detect?', options: ['Temperature', 'Orientation', 'Sound', 'Light'], correct: 1, explanation: 'It detects if an object is being tilted or tipped.' },
      { question: 'What is inside a modern tilt switch?', options: ['Water', 'A tiny metal ball', 'Magnets', 'A spring'], correct: 1, explanation: 'A metal ball rolls to connect or disconnect the electrical pins.' },
      { question: 'Which pin type is best for a Tilt Switch?', options: ['Analog', 'Digital', 'Power Only', 'USB'], correct: 1, explanation: 'Since it is usually ON or OFF, a Digital pin is perfect.' },
      { question: 'Tilting a device is like...?', options: ['Opening a door', 'Flipping a switch', 'Dimming a light', 'Singing a song'], correct: 1, explanation: 'A tilt switch acts like a simple SPST switch triggered by gravity.' },
      { question: 'Where might you find one?', options: ['In a toaster', 'In a handheld game', 'In a spoon', 'In a window'], correct: 1, explanation: 'Many portable electronics use them to detect how they are held.' },
      { question: 'Can it measure the exact angle?', options: ['Yes', 'No', 'Only at night', 'Only if it\'s hot'], correct: 1, explanation: 'Standard tilt switches only detect if the angle passed a certain threshold (ON/OFF).' },
      { question: 'Is it dangerous to touch?', options: ['Yes', 'No', 'Only if green', 'Only if it\'s loud'], correct: 1, explanation: 'Modern tilt switches are completely safe components.' },
      { question: 'What happens to the ball when tilted?', options: ['It melts', 'It rolls away', 'It explodes', 'It glows'], correct: 1, explanation: 'The ball rolls due to gravity, either making or breaking contact.' }
    ],
    game: { title: 'Balance Adventure', description: 'Tilt the board to collect stars!', prompt: 'Tilt board left/right to move robot.' }
  },
  {
    id: 'ir-sensor',
    name: 'IR Sensor Module',
    description: 'Uses infrared light to detect objects nearby.',
    icon: Activity,
    color: 'bg-red-500',
    category: 'Detection',
    slides: [
      {
        title: 'Sensor Image',
        content: '',
        image: irSensorAnnotatedImg
      },
      {
        title: 'What is an IR Sensor Module?',
        content: "The Definition: It is an electronic proximity sensor that uses invisible infrared light beams to detect obstacles or nearby objects without touching them.\n\nThe Invisible Flashlight: Think of it like a superhero who shines a secret flashlight that only they can see. If the beam strikes something, they instantly realize an object is there!\n\nThe Scout: It acts as the ultimate eyes for obstacles, letting robots know when they are about to run into a wall, a pet, or a table leg."
      },
      {
        title: 'How It Works (The 3 Steps)',
        content: "The Transmitter (Shining): The clear LED (the Emitter) constantly shoots out a beam of invisible infrared (IR) light into the space ahead.\n\nThe Receiver (Waiting): Right next to it, the black receiver bulb (the Photodiode) waits in the dark, watching for any bouncing IR rays.\n\nThe Encounter: When an object gets close, the sent light bounces off it and returns to the smart black receiver. The board detects this bounce, activates an onboard indicator light (DO LED), and sends a signal to the microcontroller: \"Obstacle detected!\""
      },
      {
        title: '3 Real-Life Uses',
        content: "1. Hand Sanitizers & Faucets: Wave your hands under automatic soap and sanitizer dispensers at shopping malls. An IR sensor sees your skin and triggers the pump!\n\n2. Automatic Doors: Ever walked up to a supermarket door and had it open magically? An overhead IR sensor scanned your presence and opened the way!\n\n3. Obstacle Avoidance Cars: Smart toy vehicles use small IR sensors on their front bumpers to avoid crashing into walls, automatically steering away when a barrier is detected."
      },
      {
        title: 'Fun Fact! 🕶️',
        content: "The Trick of the Color Black!\n\nIR sensors rely on light bouncing back to work properly. While bright colors like white reflect almost all IR light, dark colors—especially pitch black—absorb most of it! If you put a pure black strip on the floor, the IR sensor might think the ground has vanished or there is a deep endless cliff, which is exactly how robot vacuum cleaners detect stairs!"
      }
    ],
    quiz: [
      { question: 'What does IR stand for?', options: ['Instant Radio', 'Infrared', 'Interesting Robot', 'Inner Ray'], correct: 1, explanation: 'IR stands for Infrared, a type of light humans cannot see.' },
      { question: 'How many LEDs are usually on an IR module?', options: ['1', '2', '5', '0'], correct: 1, explanation: 'One sends light (Emitter) and one receives it (Receiver).' },
      { question: 'What detects the returning light?', options: ['The battery', 'The photodiode', 'The wires', 'The plastic'], correct: 1, explanation: 'A photodiode is sensitive to specific wavelengths of light.' },
      { question: 'Which color reflects IR light best?', options: ['Black', 'White', 'Clear/Invisible', 'Deep Purple'], correct: 1, explanation: 'White surfaces reflect most light, making them easy to detect.' },
      { question: 'Which color absorbs IR light?', options: ['White', 'Black', 'Blue', 'Yellow'], correct: 1, explanation: 'Black surfaces absorb light, sometimes making them "invisible" to the sensor.' },
      { question: 'Where do you see these in a store?', options: ['At the checkout', 'At the auto-door', 'In the fridge', 'In the parking lot'], correct: 1, explanation: 'Automatic doors use IR sensors to detect people walking up.' },
      { question: 'What is the "Potentiometer" for?', options: ['Changing volume', 'Changing sensitivity', 'Changing color', 'Turning it off'], correct: 1, explanation: 'It adjusts the distance threshold for detection.' },
      { question: 'Can humans see IR light?', options: ['Yes', 'No', 'Only if they wink', 'Only at night'], correct: 1, explanation: 'Infrared is outside the visible spectrum of the human eye.' }
    ],
    game: { title: 'Invisible Beam Guard', description: 'Protect the treasure with IR!', prompt: 'Block the beam to earn points.' }
  },
  {
    id: 'ultrasonic',
    name: 'Ultrasonic Sensor',
    description: 'Measures distance using high-frequency sound waves.',
    icon: Waves,
    color: 'bg-emerald-500',
    category: 'Distance',
    slides: [
      {
        title: 'Sensor Image',
        content: '',
        image: hcSr04SensorImg
      },
      { 
        title: 'What is an Ultrasonic Sensor?', 
        content: "The Definition: It is a smart electronic ruler that measures distance using invisible sound waves instead of a wooden stick.\n\nThe Secret Name: \"Ultrasonic\" sounds like a superhero name, but it actually means sounds that are vibrating so fast and are so high-pitched that humans cannot hear them!\n\nThe Eyes: Even though it looks like it has two eyes, it is actually using one as a \"mouth\" to speak and one as an \"ear\" to listen." 
      },
      { 
        title: 'How It Works (The 3 Steps)', 
        content: "The Shout: The sensor sends out a tiny pulse of high-pitched sound (ultrasound) into the air.\n\nThe Bounce: The sound travels until it hits an object (like a wall, a toy, or your hand) and bounces back as an echo.\n\nThe Catch: The sensor catches the echo. It counts exactly how long it took for the sound to go out and come back. If it happens fast, the object is close! If it takes longer, the object is far away." 
      },
      { 
        title: '3 Real-Life Uses', 
        content: "1. Car Parking Sensors: Many cars have these on their bumpers. They beep faster and faster as the car gets close to a wall so the driver doesn't crash.\n\n2. Robot Vacuums: Small cleaning robots use these to \"see\" where the furniture is so they can clean under the table without bumping into the chair legs.\n\n3. Automatic Trash Cans: Some trash cans have these on top. When you wave your hand over the lid, the sensor \"hears\" your hand and opens the lid automatically." 
      },
      { 
        title: 'Fun Fact! 🦇', 
        content: "Nature’s Superpower!\n\nLong before humans invented these sensors, animals like bats and dolphins were already using them! They use \"Echolocation,\" which is the exact same process of sending out sound and listening for the echo to hunt for food and fly safely in the pitch-black dark." 
      }
    ],
    quiz: [
      { 
        question: 'What do the two silver cylinders on the ultrasonic sensor represent?', 
        options: ['Two batteries powering the sensor', 'A speaker and a microphone working together', 'Two independent laser beams', 'A power and reset switch'], 
        correct: 1, 
        explanation: 'One cylinder acts as a transmitter (speaker) to send out sound, and the other is a receiver (microphone) to catch the bouncing echo!' 
      },
      { 
        question: 'What does the word "Ultrasonic" mean?', 
        options: ['Sounds that are too high-pitched for human ears to hear', 'Super-fast electrical triggers', 'Invisible rays of green light', 'Extremely powerful magnetic waves'], 
        correct: 0, 
        explanation: 'Ultrasonic sound is pitched above 20 kilohertz (20,000 Hz), which is higher than the upper limit of human hearing!' 
      },
      { 
        question: 'How does the sensor act like an "electronic ruler"?', 
        options: ['By shifting its physical length', 'By timing the round-trip of sent sound waves', 'By projecting an actual laser line', 'By measuring the weight of the objects'], 
        correct: 1, 
        explanation: 'By counting the milliseconds standard sound waves take to exit, bounce off an object, and return, the sensor accurately tracks the distance!' 
      },
      { 
        question: 'Which of the following household items uses ultrasonic sensors to navigate safely?', 
        options: ['A convection toaster oven', 'An automated robotic vacuum cleaner', 'An electric blender', 'A digital kitchen scale'], 
        correct: 1, 
        explanation: 'Smart robotic vacuums use ultrasonic sensors to scan room dimensions and cleanly avoid colliding with chair and table legs!' 
      },
      { 
        question: 'What natural biological method works exactly like the ultrasonic sensor?', 
        options: ['Photosynthesis in leaf cells', 'Echolocation in bats and dolphins', 'Skin camouflage in chameleons', 'Night vision in cats'], 
        correct: 1, 
        explanation: 'Bats and dolphins naturally practice echolocation—sending audible or high-pitched sound squeaks and processing the echoes to navigate!' 
      }
    ],
    game: { title: 'Distance Detective', description: 'Find the hidden treasure chests!', prompt: 'Find treasures by measuring distance.' }
  },
  { 
    id: 'reed-switch', 
    name: 'Reed Switch', 
    description: 'Detects magnetic fields.', 
    icon: Zap, 
    color: 'bg-yellow-500', 
    category: 'Detection', 
    slides: [
      {
        title: 'Sensor Image',
        content: '',
        image: reedSwitchSensorImg
      },
      { 
        title: 'What is a Reed Switch?', 
        content: "The Definition: It is a magnetic sensor that turns a circuit on or off whenever a magnet gets close to it.\n\nThe Invisible Finger: You don't need to press this switch with your finger; a magnet does all the work from a distance!\n\nThe Hidden Guard: Because it is usually very small and made of glass, it can be hidden inside gadgets to act as a secret sensor." 
      },
      { 
        title: 'How It Works (The 3 Steps)', 
        content: "The Glass House: Inside a tiny glass tube are two thin pieces of metal (called \"reeds\") that are very close but not quite touching.\n\nThe Magnetic Pull: When a magnet comes near the tube, it creates an invisible magnetic force that pulls the two metal reeds toward each other.\n\nThe Connection: Once the reeds touch, they act like a bridge, allowing electricity to flow through. When you move the magnet away, the reeds snap back apart and the electricity stops!" 
      },
      { 
        title: '3 Real-Life Uses', 
        content: "1. Window & Door Alarms: This is how home security systems know if a window is open. A magnet is on the window, and the switch is on the frame. If they move apart, the alarm goes off!\n\n2. Laptop \"Sleep\" Mode: Have you ever wondered how your laptop knows to turn off the screen when you close the lid? There is a tiny magnet in the screen and a reed switch in the keyboard!\n\n3. Bike Speedometers: A magnet is attached to a bicycle wheel. Every time the wheel spins past the reed switch on the frame, the computer counts it to calculate how fast you are going." 
      },
      { 
        title: 'Fun Fact! 🪄', 
        content: "The Magician's Secret!\n\nMany magicians use reed switches hidden inside their props or even under their sleeves! By wearing a ring with a tiny hidden magnet, they can make lights turn on or \"magic\" boxes open just by waving their hand near the secret switch!" 
      }
    ], 
    quiz: [
      { question: 'What triggers a Reed Switch?', options: ['Heat', 'Light', 'Magnets', 'Sound'], correct: 2, explanation: 'A magnetic field pulls the metal strips together to close the circuit.' },
      { question: 'Where would you find one of these?', options: ['A toaster', 'A door security sensor', 'A lightbulb', 'A keyboard'], correct: 1, explanation: 'They are very common on doors and windows to detect if they are open.' },
      { question: 'What is the glass tube for?', options: ['To look pretty', 'To seal it from environment', 'To make it fragile', 'To let light in'], correct: 1, explanation: 'It protects the delicate metal contacts inside.' },
      { question: 'True or False: Reed switches need batteries to stay "ready"?', options: ['True', 'False'], correct: 1, explanation: 'They are purely passive mechanical switches operated by magnetism.' },
      { question: 'How many metal strips are inside?', options: ['1', '2', '10', '100'], correct: 1, explanation: 'There are typically two flexible metal "reeds" that meet when magnetized.' }
    ], 
    game: { title: 'Security Unlocker', description: 'Use the magnet to trigger the reed switch and unlock the secure door!', prompt: 'Drag the magnet to the switch.' } 
  },
  { 
    id: 'joystick', 
    name: 'Joystick Sensor', 
    description: '2-axis controller + button.', 
    icon: Move, 
    color: 'bg-indigo-500', 
    category: 'Control', 
    slides: [
      {
        title: 'Sensor Image',
        content: '',
        image: joystickSensorImg
      },
      { 
        title: 'What is a Joystick Sensor?', 
        content: "The Definition: It is a fun input sensor that lets us control movements by pushing a small stick in different directions, just like a game controller!\n\nThe Direction Guide: Think of it like a steering wheel for your fingers that tells a computer or a robot exactly which way you want to go.\n\nThe Secret Button: Besides moving around, it also has a hidden push-button built right inside that clicks down when you press the top of the stick." 
      },
      { 
        title: 'How It Works (The 3 Steps)', 
        content: "The Hidden Knobs: Underneath the joystick are two hidden turning knobs called potentiometers—one tracking left/right movement (X-axis) and one tracking up/down movement (Y-axis).\n\nThe Voltage Shift: When you push the stick, it turns these internal knobs. Turning them changes how much electricity is allowed to flow through the circuit.\n\nThe Coordinate Report: The sensor measures these electronic changes and converts them into number coordinates. It tells the computer, \"The stick is pushed 80% to the right and 10% up!\"" 
      },
      { 
        title: '3 Real-Life Uses', 
        content: "Video Game Controllers: It is the exact same technology used in PlayStation, Xbox, and Nintendo controllers to move characters or look around in 3D worlds.\n\nElectric Wheelchairs: It allows people with mobility challenges to steer and drive their electric wheelchairs easily with just a gentle push of one thumb.\n\nDrone and Robot Remotes: Pilots use joysticks on their remote controls to fly quadcopters through the air or steer robotic arms to pick up objects." 
      },
      { 
        title: 'Fun Fact! 🕹️', 
        content: "From Warships to Video Games!\n\nLong before joysticks were used for Pac-Man or Mario, they were invented to pilot military airplanes and submarines! The very first joysticks were giant levers that pilots had to grip with their whole hand to stay in the air. Over many years, engineers managed to shrink that massive technology down until it was small enough to be controlled by a kid's thumb!" 
      }
    ], 
    quiz: [
      { question: 'How many directions does it measure?', options: ['1 (X)', '2 (X and Y)', '3 (X, Y, Z)', 'None'], correct: 1, explanation: 'It provides coordinates for horizontal and vertical movement.' },
      { question: 'What component is inside a joystick?', options: ['Batteries', 'Potentiometers', 'Lamps', 'Magnets'], correct: 1, explanation: 'Rotating resistors change voltage based on where the stick points.' },
      { question: 'What happens when you push the stick down?', options: ['It breaks', 'It clicks a button', 'It turns red', 'Nothing'], correct: 1, explanation: 'Most joysticks have a built-in tactile push-button.' },
      { question: 'What is the center value for an axis?', options: ['0', '512', '1023', '100'], correct: 1, explanation: 'In a 10-bit system (0-1023), the middle position is halfway at 512.' },
      { question: 'What can you build with this?', options: ['A remote car', 'A game controller', 'A robot arm control', 'All of the above'], correct: 3, explanation: 'Joysticks are incredibly versatile for any directional control.' }
    ], 
    game: { title: 'Joystick Racer', description: 'Drive the robot car through the laboratory!', prompt: 'Move the joystick to steer the car!' } 
  },
  { 
    id: 'rotary-encoder', 
    name: 'Rotary Encoder', 
    description: 'Detects rotation.', 
    icon: RefreshCcw, 
    color: 'bg-indigo-500', 
    category: 'Control', 
    slides: [
      {
        title: 'Sensor Image',
        content: '',
        image: rotaryEncoderSensorImg
      },
      { 
        title: 'What is a Rotary Encoder?', 
        content: "The Definition: It is a clever spinning sensor that detects how much a knob is turned, which way it is rotating, and how fast it is spinning!\n\nThe Infinite Spinner: Unlike a volume knob on an old radio that stops when you turn it too far, a rotary encoder can spin round and round forever in either direction.\n\nThe Clicking Wheel: It usually feels like it has tiny, satisfying clicks when you turn it, and it often has a hidden button you can press by pushing the knob straight down." 
      },
      { 
        title: 'How It Works (The 3 Steps)', 
        content: "The Secret Wheel: Inside the sensor is a tiny, hidden disc with lots of little holes or slots cut into it, which spins whenever you turn the outside knob.\n\nThe Light Beam: The sensor shines a tiny, invisible beam of light through the spinning disc. As the disc turns, it blocks and unblocks the light, turning the beam on and off like a super-fast flashlight.\n\nThe Electronic Counter: A light sensor inside counts how many times the light flashes. It tells the computer, \"The knob just clicked 5 times to the right!\" or \"It clicked 10 times to the left!\"" 
      },
      { 
        title: '3 Real-Life Uses', 
        content: "The Computer Mouse Wheel: The little scroll wheel between your mouse buttons uses a rotary encoder to know exactly how far you are scrolling down a web page.\n\nModern Microwave Knobs: When you turn a single dial to add 10 seconds, 30 seconds, or 2 minutes to the cooking timer, you are twisting a rotary encoder.\n\n3D Printer Controls: Many school 3D printers have a single clicky knob next to the screen that you spin to scroll through the file menu and press down to select your project." 
      },
      { 
        title: 'Fun Fact! 🖲️', 
        content: "It Never Gets Lost!\n\nOld-fashioned volume knobs can get confused if you turn them too fast, but a rotary encoder is like a tiny robot mathematician. It can track thousands of tiny steps in a single second without ever losing count. Because it counts every single individual flash of light, it always knows its exact position, making it one of the most reliable sensors in the world!" 
      }
    ], 
    quiz: [
      { question: 'Is there a limit to how much it spins?', options: ['Yes, 270 degrees', 'No, it can spin infinitely', 'Yes, 10 turns', 'Only on Sundays'], correct: 1, explanation: 'Encoders are designed to spin freely without a stopping point.' },
      { question: 'What type of signals does it send?', options: ['Analog only', 'Digital pulses', 'Radio waves', 'Heat pulses'], correct: 1, explanation: 'It sends rapid pulses that the Arduino counts to track rotation.' },
      { question: 'What is better for a volume knob?', options: ['A switch', 'A rotary encoder', 'A light sensor', 'A battery'], correct: 1, explanation: 'Encoders allow for precise digital control without mechanical limits.' },
      { question: 'Can it detect speed of rotation?', options: ['Yes', 'No'], correct: 0, explanation: 'By measuring how fast pulses arrive, you can calculate the spin speed.' }
    ], 
    game: { title: 'RGB LED Dimmer', description: 'Use the rotary encoder to change the brightness of the RGB LED!', prompt: 'Rotate the knob to adjust LED brightness!' } 
  },
  { 
    id: 'flame-sensor', 
    name: 'Flame Sensor', 
    description: 'Detects fire.', 
    icon: Flame, 
    color: 'bg-red-600', 
    category: 'Env', 
    slides: [
      {
        title: 'Sensor Image',
        content: '',
        image: flameSensorImg
      },
      { 
        title: 'What is a Flame Sensor?', 
        content: "The Definition: It is a super sensitive safety sensor designed to spot a fire or an open flame the exact split-second it appears!\n\The Fire Tracker: Think of it like a digital firefighter on watch 24/7, keeping its eye out to warn humans and robots before a fire gets too big.\n\The Black Bulb: It usually looks like a tiny black or dark blue glass bulb attached to a small circuit board. This bulb is actually an infrared receiver that acts as the sensor's \"eye.\"" 
      },
      { 
        title: 'How It Works (The 3 Steps)', 
        content: "The Invisible Glow: Fire does not just give off bright light we can see; it also shoots out an invisible type of light called Infrared (IR) light that human eyes cannot detect.\n\The Specialized Eye: The black bulb on the sensor is specially tuned to only look for this exact infrared light wavelength produced by real fire. It ignores normal room lights!\n\The Alarm Signal: When a flame appears, the infrared light hits the bulb. The sensor instantly reacts by opening up an electric pathway and shouting a warning signal to the computer: \"Fire detected!\"" 
      },
      { 
        title: '3 Real-Life Uses', 
        content: "Firefighting Robots: Small autonomous robots use this sensor to navigate through mazes, find a hidden candle or fire, and activate a little fan or water pump to blow it out.\n\nIndustrial Gas Stoves: Safe heating systems and massive factory furnaces use them to make sure a pilot light is actually burning before releasing gas, preventing dangerous leaks.\n\nSmart Home Alarms: They work alongside smoke detectors to give an ultra-fast warning for open fires in kitchens or laboratories before the smoke even reaches the ceiling." 
      },
      { 
        title: 'Fun Fact! 🔥', 
        content: "It Can \"See\" Fire in the Dark!\n\nBecause this sensor is looking for invisible infrared heat waves rather than the actual color of the flame, it can spot a fire just as easily in a pitch-black room as it can in broad daylight. To this sensor, a flame looks like a flashing beacon shining bright against the dark, making it impossible for a fire to hide from a robot's protection!" 
      }
    ], 
    quiz: [
      { question: 'What light does it detect?', options: ['Visible light', 'Infrared from fire', 'UV light', 'Laser light'], correct: 1, explanation: 'It detects basic IR wavelengths produced by combustion.' },
      { question: 'Is it wise to touch the fire?', options: ['Yes', 'No', 'Only if wearing gloves', 'Only for science'], correct: 1, explanation: 'Never bring sensors too close to real fire for safety!' },
      { question: 'What is the shape of its detection area?', options: ['A straight line', 'A cone', 'A square', 'A sphere'], correct: 1, explanation: 'It has a directional field of view, usually around 60 degrees wide.' },
      { question: 'Can it see through a thick wall?', options: ['Yes', 'No'], correct: 1, explanation: 'Infrared light from fire cannot pass through solid walls.' }
    ], 
    game: { title: 'Emergency Response', description: 'Burj Khalifa is in danger! Drive the fighter truck to the location and let the Flame Sensor trigger the extinguishers automatically.', prompt: 'Drag the truck towards the fire!' } 
  },
  { 
    id: 'smoke-sensor', 
    name: 'Smoke Sensor', 
    description: 'Detects smoke.', 
    icon: Wind, 
    color: 'bg-gray-500', 
    category: 'Env', 
    slides: [
      {
        title: 'Sensor Image',
        content: '',
        image: smokeSensorImg
      },
      { 
        title: 'What is a Smoke Sensor?', 
        content: "The Definition: It is an amazing safety sensor that sniffs the air to detect dangerous smoke or gases long before a human can smell them!\n\nThe Nose of the Robot: Think of it like a mechanical nose that never sleeps, constantly taking tiny breaths of air to make sure the room is safe.\n\nThe Metal Cap: It looks like a little circuit board with a round, silver metal mesh cap on top. This mesh cap lets air inside while protecting the sensitive parts hidden underneath." 
      },
      { 
        title: 'How It Works (The 3 Steps)', 
        content: "The Heating Core: Inside the metal cap is a tiny heating element that warms up a special chemical coating. When the air is clean, the sensor stays quiet.\n\nThe Chemical Reaction: When smoke or gas enters the mesh cap, the floating smoke particles trap themselves on the heated chemical coating.\n\nThe Current Surge: This chemical reaction changes how easily electricity can flow through the sensor. The thicker the smoke, the stronger the electric signal becomes, forcing the sensor to trigger the alarm!" 
      },
      { 
        title: '3 Real-Life Uses', 
        content: "School and Home Smoke Alarms: It is the main brain inside the round white smoke detectors mounted on the ceilings of classrooms and bedrooms to keep families safe.\n\nSmart Ventilation Fans: In modern kitchens, if someone burns the toast, this sensor can tell the ceiling exhaust fan to turn on automatically to clear out the smoke.\n\nGas Leak Detectors: Because it can sniff out more than just wood smoke, it is used near gas cylinders to sound a loud buzzer if dangerous, invisible gas starts leaking into a room." 
      },
      { 
        title: 'Fun Fact! 💨', 
        content: "It Can Smell Invisible Smoke!\n\nDid you know this sensor can detect a fire before you even see a single flame or any thick gray smoke? It is so sensitive that it can pick up microscopic, invisible particles floating in the air the very second something starts to overheat. It literally alerts humans to a problem while it is still just a tiny smudge, giving everyone plenty of time to get to safety!" 
      }
    ], 
    quiz: [
      { question: 'What is another name for this sensor?', options: ['MQ-2', 'ABC-1', 'G-Box', 'Smoke-X'], correct: 0, explanation: 'The MQ-2 is one of the most popular gas and smoke sensors for DIY projects.' },
      { question: 'Why does it feel warm?', options: ['It is broken', 'It has a built-in heater', 'It is made of sun', 'The battery is leaking'], correct: 1, explanation: 'The heater is necessary to make the sensing element reactive to gases.' },
      { question: 'Which of these can it ALSO detect?', options: ['Gold', 'Alcohol', 'Water', 'Music'], correct: 1, explanation: 'MQ sensors are sensitive to various combustible gases and vapors like alcohol.' },
      { question: 'What happens to voltage when it sees smoke?', options: ['It goes up', 'It goes down', 'It stops', 'It reverses'], correct: 0, explanation: 'As resistance drops, the voltage output usually increases.' }
    ], 
    game: { title: 'Safety Hero', description: 'Be the first to detect smoke and save the village!', prompt: 'Watch the sensor values climb.' } 
  },
  { 
    id: 'soil-moisture', 
    name: 'Soil Moisture', 
    description: 'Measures soil wetness.', 
    icon: Droplets, 
    color: 'bg-green-600', 
    category: 'Env', 
    slides: [
      {
        title: 'Sensor Image',
        content: '',
        image: soilMoistureSensorImg
      },
      { 
        title: 'What is a Soil Moisture Sensor?', 
        content: "The Definition: It is a cool sensor that measures how wet or dry the dirt (soil) is around a plant's roots.\n\nThe Plant Translator: Think of it like a translator that allows plants to 'talk' to us and tell us exactly when they are thirsty!\n\nThe Metal Legs: It has two long metal prongs (legs) that push right down into the soil, just like a fork." 
      },
      { 
        title: 'How It Works (The 3 Steps)', 
        content: "The Tiny Zap: The sensor sends a tiny, completely safe electrical signal down one of its metal legs into the dirt.\n\nThe Water Highway:\n\nIf the soil is WET: Water is a great highway for electricity! The signal travels easily through the damp dirt.\n\nIf the soil is DRY: Dry dirt is full of air pockets that block electricity, making the signal struggle to travel.\n\nThe Measurement: The second metal leg catches whatever signal made it through the dirt. If it gets a strong signal, it knows the soil is wet. If the signal is super weak, it knows the plant needs a drink!" 
      },
      { 
        title: '3 Real-Life Uses', 
        content: '1. Smart Home Gardens: People use them to build automatic watering systems that only turn on the hose when the garden soil gets dry.\n\n2. High-Tech Mega Farms: Farmers place these sensors all over giant crop fields to save water and grow stronger fruits and vegetables.\n\n3. Color-Changing Flower Pots: Some smart pots use this sensor to flash a blue light when the plant is happy and a blinking red light when it’s thirsty!' 
      },
      { 
        title: 'Fun Fact! 🌵', 
        content: "Saving Plants from Too Much Love!\n\nDid you know that most houseplants die from too much watering rather than too little? Young gardeners often get so excited that they drown their plants' roots in water! This sensor is a plant's best friend because it tells humans to put the watering can down until the dirt is actually dry." 
      }
    ], 
    quiz: [
      { question: 'What property does it measure?', options: ['Color of dirt', 'Moisture/Conductivity', 'Speed of roots', 'Weight of plant'], correct: 1, explanation: 'It measures how well the soil conducts electricity, which depends on water content.' },
      { question: 'What is a problem with some soil sensors?', options: ['They are too loud', 'They can rust/corrode', 'They attract bees', 'They grow roots'], correct: 1, explanation: 'Standard resistive sensors corrode due to electrolysis if left powered on.' },
      { question: 'Which plant needs DRYER readings?', options: ['Fern', 'Cactus', 'Rose', 'Grass'], correct: 1, explanation: 'Cacti are adapted to low-moisture environments.' },
      { question: 'How can you prevent rust?', options: ['Paint it', 'Use a capacitive sensor', 'Keep it dry', 'Bury it deeper'], correct: 1, explanation: 'Capacitive sensors don\'t expose metal to the soil, so they never rust.' }
    ], 
    game: { title: 'Plant Rescue', description: 'Water the plants only when they are actually thirsty!', prompt: 'Check the moisture level.' } 
  },
  { 
    id: 'temperature-sensor', 
    name: 'Temperature Sensor', 
    description: 'Measures heat.', 
    icon: Thermometer, 
    color: 'bg-red-300', 
    category: 'Env', 
    slides: [
      { 
        title: 'What is a Temperature Sensor?', 
        content: "The Definition: It is an incredibly useful electronic thermometer that measures how hot or cold the air, water, or objects around it are!\n\nThe Weather Guide: Think of it like a digital skin that can instantly feel warmth or chilliness and turn that feeling into numbers a computer can read.\n\The Tiny Black Box: It often looks like a tiny black plastic rectangle with three metal legs (like a transistor, or the popular DHT11 or LM35 sensors) or a metal-tipped probe for dipping in liquids." 
      },
      { 
        title: 'How It Works (The 3 Steps)', 
        content: "The Heat Feeling: Inside the sensor is a special material that changes its mood based on the heat. When it gets hot, the material expands or changes its internal electrical properties.\n\nThe Electricity Struggle: When the temperature changes, it alters how easily electricity can flow through the sensor. Higher heat usually makes it harder or easier for the electrical current to pass.\n\nThe Math Conversion: The sensor measures this electrical struggle and sends a number to the computer. The computer instantly translates it, saying, \"It is exactly 25 degrees Celsius in this classroom!\"" 
      },
      { 
        title: '3 Real-Life Uses', 
        content: "Smart Home Thermostats: They monitor the room temperature and automatically tell the air conditioner to turn on if it gets too hot, or the heater to kick in if it gets too freezing.\n\nDigital Medical Thermometers: Doctors and parents use them to safely check your body temperature in just a few seconds when you are feeling sick to see if you have a fever.\n\nSmart Refrigerators: These sensors live inside your kitchen fridge to make sure the air stays cold enough to keep the milk and ice cream from melting or spoiling!" 
      },
      { 
        title: 'Fun Fact! 🌡️', 
        content: "It Can Measure the Ice of Antarctica and Rocket Engines!\n\nWhile human beings start shivering when it gets a little cold and get uncomfortable in the hot sun, electronic temperature sensors can survive in the craziest places on Earth! Some specialized sensors can measure freezing temperatures down to minus 200 degrees in outer space, while others can sit inside a roaring rocket engine or volcano and measure thousands of degrees without melting. They give robots the power to explore places that are way too extreme for humans!" 
      }
    ], 
    quiz: [
      { question: 'What unit do we usually measure in?', options: ['Liters', 'Celsius/Fahrenheit', 'Meters', 'Amps'], correct: 1, explanation: 'Temperature is measured in degrees Celsius or Fahrenheit.' },
      { question: 'What happens to a thermistor as it gets hot?', options: ['Its color changes', 'Its resistance changes', 'It grows bigger', 'It starts singing'], correct: 1, explanation: 'Resistance changes predictably with temperature.' },
      { question: 'What can you build with this?', options: ['A smart fan', 'A fridge alarm', 'A thermometer', 'All of the above'], correct: 3, explanation: 'Temperature sensing is core to climate control and monitoring.' },
      { question: 'Is 0°C freezing or boiling?', options: ['Freezing', 'Boiling', 'Neither'], correct: 0, explanation: '0 degrees Celsius is the freezing point of water.' }
    ], 
    game: { title: 'Thermal Discovery', description: 'Explore how different things feel! Use the temperature sensor to check the ice water, the human body, and the electric heater.', prompt: 'Drag the sensor to the targets to read their temperature!' } 
  },
  { 
    id: 'sound-sensor', 
    name: 'Sound Sensor', 
    description: 'Detects noise.', 
    icon: Volume2, 
    color: 'bg-pink-500', 
    category: 'Detect', 
    slides: [
      {
        title: 'Sensor Image',
        content: '',
        image: soundSensorImg
      },
      { 
        title: 'What is a Sound Sensor?', 
        content: "The Definition: It is an awesome electronic ear that detects noises, claps, voices, and music around it by measuring sound vibrations in the air!\n\nThe Spy Microphone: Think of it like a tiny, built-in spy microphone that listens out for sharp noises and alerts your robot or computer.\n\nThe Silver Cylinder: It usually looks like a small circuit board with a tiny, round silver cylinder on the front covered by a black felt top. That cylinder is the sensor's electronic eardrum." 
      },
      { 
        title: 'How It Works (The 3 Steps)', 
        content: "The Wiggling Air: When you clap your hands or speak, you create invisible sound waves that travel through the air, causing the air particles to wiggle back and forth.\n\nThe Moving Magnet: These wiggling air waves crash into a microscopic flexible membrane inside the silver sensor cylinder, moving a tiny magnet back and forth.\n\nThe Voltage Flash: The moving magnet instantly generates a tiny splash of electricity. The sensor measures how strong that electrical splash is and tells the computer, \"Whoa! Someone just clapped really loudly!\"" 
      },
      { 
        title: '3 Real-Life Uses', 
        content: "Clap-Activated Smart Lights: You can connect this sensor to bedroom lights so that you can turn them on or off just by clapping your hands twice from across the room.\n\nSpy and Security Alarms: Safe boxes and smart home security systems use them to trigger a loud siren if they hear a window smashing or a heavy door banging open.\n\nDecibel Sound Meters: Schools and libraries use them connected to a screen to show a green light when students are working quietly, or a red warning light if the room gets too noisy!" 
      },
      { 
        title: 'Fun Fact! 🗣️', 
        content: "It Can Hear Everything, but Understands Nothing!\n\nWhile this sensor has amazing hearing, it doesn't actually understand human words, languages, or secrets! It is completely tone-deaf and language-blind. To a sound sensor, a beautiful song, a shouted word, and a loud sneeze all look exactly the same: just a sudden jump in electrical voltage numbers. It leaves all the thinking to the computer brain, acting purely as a loyal ear that reports exactly how hard the air is shaking!" 
      }
    ], 
    quiz: [
      { question: 'What is the main part of the sensor?', options: ['A speaker', 'A microphone', 'A mirror', 'A battery'], correct: 1, explanation: 'The microphone is the primary sensing element for sound.' },
      { question: 'What does the blue knob do?', options: ['Change the volume', 'Adjust sensitivity threshold', 'Change the light color', 'Nothing'], correct: 1, explanation: 'It sets the point where the sensor sends a HIGH signal.' },
      { question: 'Can it understand what words you say?', options: ['Yes', 'No, only how loud it is', 'Only in Spanish', 'Only if it is big'], correct: 1, explanation: 'Basic sound sensors only track amplitude/loudness, not speech recognition.' },
      { question: 'What can you use it for?', options: ['Burglar alarm', 'Clap light', 'Dance party lights', 'All of the above'], correct: 3, explanation: 'If it makes noise, this sensor can react to it!' }
    ], 
    game: { title: 'Clap Party', description: 'Pop the balloons by clapping your hands!', prompt: 'Wait for the loud sound!' } 
  },
  { 
    id: 'light-cup', 
    name: 'Light Cup', 
    description: 'Detects tilt/light.', 
    icon: Lightbulb, 
    color: 'bg-cyan-500', 
    category: 'Motion', 
    slides: [
      {
        title: 'Sensor Image',
        content: '',
        image: lightCupSensorImg
      },
      { 
        title: 'What is a Light Cup Sensor?', 
        content: "The Definition: It is a magical interactive module that acts like a special tilt switch and a dimming light combined into one cool package!\n\nThe Magic Pourer: Think of it like a electronic cup full of digital \"light juice.\" When you lean or tilt the sensor, the light seems to shift and pour out!\n\The See-Through Tube: It features a small, clear glass or plastic cylinder containing a tiny rolling component, standing right next to a bright LED light." 
      },
      { 
        title: 'How It Works (The 3 Steps)', 
        content: "The Rolling Ball: Inside the clear cylinder sits a microscopic metal ball or a tiny drop of liquid mercury that is free to roll around whenever you tilt your hand.\n\nThe Hidden Switch: When you lean the sensor forward, the metal ball rolls to the bottom and lands on two electrical pins, acting like a bridge that completes a circuit.\n\The Fading Trick: The computer reads this connection and sends a command to the LED light next to it, making it fade out on one module while making a second module light up, making it look like light is pouring from one cup to another!" 
      },
      { 
        title: '3 Real-Life Uses', 
        content: "Interactive Toys: Toy designers use them inside magic wands and glowing swords that change colors or light up only when a child waves them through the air.\n\nSmart Balancing Tools: They can be used in simple gadgets to warn a user if a surface or a camera tripod is leaning too much to one side by flashing a light.\n\nAnimated Costumes: Students use them in wearable electronics, attaching them to gloves or sleeves so that blinking patterns activate whenever they raise their arms to dance." 
      },
      { 
        title: 'Fun Fact! 🪄', 
        content: "It Takes Two to Do Magic!\n\nTo get the ultimate \"Magic Cup\" illusion, engineers always use these sensors in pairs! By wiring two light cups together to a single microcontroller brain, you can program them so that as you tilt the left cup down, its LED slowly dims to darkness, while the right cup's LED magically glows brighter and brighter. It completely tricks your friends into thinking you are physically pouring pure, liquid light across the air from one hand to the other!" 
      }
    ], 
    quiz: [
      { question: 'What two things are in a Light Cup?', options: ['A magnet and a light', 'A tilt switch and an LED', 'A speaker and a button', 'A battery and a fan'], correct: 1, explanation: 'It uses gravity (tilt) to trigger a visual response (LED).' },
      { question: 'What triggers the light?', options: ['Sound', 'Tilting the component', 'Heat', 'Magnets'], correct: 1, explanation: 'The internal ball or liquid switch moves with gravity.' }
    ], 
    game: { title: 'Balance Light', description: 'Keep the cup level to keep the light on!', prompt: 'Don\'t tilt too far!' } 
  },
  { 
    id: 'knock-sensor', 
    name: 'Knock Sensor', 
    description: 'Detects knocks.', 
    icon: Activity, 
    color: 'bg-stone-500', 
    category: 'Detect', 
    slides: [
      {
        title: 'Sensor Image',
        content: '',
        image: knockSensorImg
      },
      { 
        title: 'What is a Knock Sensor?', 
        content: "The Definition: It is an ultra-sensitive vibration sensor that can feel when an object gets tapped, bumped, knocked on, or shaken!\n\The Secret Ear: Think of it like a tiny, secret ear that listens to the \"thud\" or structure-borne sound of a hard surface rather than listening to noises in the open air.\n\The Spring Tube: It often looks like a tiny black cylinder or a small glass tube with a microscopic metal spring hidden inside attached to a circuit board." 
      },
      { 
        title: 'How It Works (The 3 Steps)', 
        content: "The Waiting Spring: When everything is perfectly still, the tiny metal spring inside the sensor hangs loose in the middle of the tube without touching anything.\n\nThe Big Bump: The moment someone knocks on the table or bumps the project, the vibration shakes the sensor, causing the loose spring to wiggle and bounce around.\n\The Circuit Connection: As it wiggles, the spring crashes into a metal contact pin inside the tube for a split second. This closes the electric circuit, sending a fast signal to the computer: \"Ouch! Someone just knocked!\"" 
      },
      { 
        title: '3 Real-Life Uses', 
        content: "Secret Knock Door Locks: Students and makers use them to build smart doors that will only unlock if you tap out a secret rhythm (like \"tap-tap... tap!\") on the surface.\n\nCar Engine Protection: Inside real cars, these sensors listen for a bad metallic pinging noise called \"engine knock.\" If the engine shakes incorrectly, the car's computer instantly fixes it to prevent damage.\n\nAnti-Theft Alarm Systems: They are placed inside safes, cash boxes, or attached to windows so that if a thief tries to smash, shake, or break their way in, a loud siren goes off." 
      },
      { 
        title: 'Fun Fact! 🚪', 
        content: "It Can Hear Through Solid Wood and Metal!\n\nWhile a normal microphone gets confused by background noise like people talking or the wind blowing, a knock sensor completely ignores the air! It only cares about vibrations traveling inside solid objects. That means you can hide a knock sensor completely out of sight underneath a thick wooden table or inside a plastic toy box, and it will still easily detect your taps right through the solid material!" 
      }
    ], 
    quiz: [
      { question: 'What does a knock sensor detect?', options: ['Air pressure', 'Vibrations/Taps', 'Light level', 'Magnets'], correct: 1, explanation: 'It feels physical impacts or taps on the surface.' },
      { question: 'What is the "Piezo" part for?', options: ['Eating', 'Generating electricity from vibration', 'Connecting to internet', 'Making it hot'], correct: 1, explanation: 'Piezoelectric crystals turn mechanical force into electrical signals.' },
      { question: 'What could you build with this?', options: ['Electronic drum kit', 'Alarm system', 'Knock-to-unlock', 'All of the above'], correct: 3, explanation: 'Any system triggered by a tap can use this sensor.' }
    ], 
    game: { title: 'Secret Knock', description: 'Unlock the secret door with the right rhythm!', prompt: 'Tap the sensor to match the pattern.' } 
  },
  { 
    id: 'dot-matrix', 
    name: 'Dot Matrix', 
    description: 'Grid display.', 
    icon: Grid3X3, 
    color: 'bg-red-800', 
    category: 'Output', 
    slides: [
      {
        title: 'Sensor Image',
        content: '',
        image: dotMatrixSensorImg
      },
      { 
        title: 'What is a Dot Matrix Display?', 
        content: "The Definition: It is a cool electronic screen made up of a grid of tiny LED lights arranged in neat rows and columns to show text, numbers, and pictures!\n\nThe Pixel Painter: Think of it like a digital Lite-Brite toy or a graph-paper notebook where lighting up specific squares creates an entire drawing.\n\The Grid Block: It usually looks like a square plastic block with a matrix of 64 dots (an 8-by-8 grid) that can glow brightly in red, green, or blue." 
      },
      { 
        title: 'How It Works (The 3 Steps)', 
        content: "The Address System: Every single LED dot on the grid has an address based on its exact row number and column number, just like playing a game of Battleship!\n\nThe Rapid Flash: Instead of turning all the lights on at once, the computer turns on one row at a time, thousands of times per second. It switches them so fast that human eyes get tricked.\n\The Illumination Trick: Because it flashes faster than a blink, your eyes do not see the rows switching. Instead, you see a solid, glowing image of a smiley face, a letter, or an arrow!" 
      },
      { 
        title: '3 Real-Life Uses', 
        content: "Bus and Subway Signs: Large moving buses use giant dot matrix displays on the front to show passengers the name of the next destination or route number.\n\nRetro Arcade Games: Classic arcade machines and electronic toys use these grids to animate moving characters, falling bricks, or scoreboard numbers.\n\nDigital Scoreboards: Sports stadiums use massive grids of dot matrices linked together to show the scores, player names, and flashing \"GOAL!\" animations." 
      },
      { 
        title: 'Fun Fact! 👾', 
        content: "It is the Grandfather of Modern Phone Screens!\n\nThe super-sharp screen on your smartphone or television works on the exact same principle as this simple dot matrix! Your phone screen is just a giant grid made of millions of microscopic \"dots\" called pixels. By learning how to control an 8-by-8 dot matrix with 64 dots, you are learning the exact same secret code that engineers use to display high-definition video games and movies across the world!" 
      }
    ], 
    quiz: [
      { question: 'How are the lights arranged?', options: ['In a circle', 'In rows and columns', 'Randomly', 'Like a star'], correct: 1, explanation: 'A 8x8 grid is the most common dot matrix size.' },
      { question: 'Can it show words?', options: ['No', 'Yes, by scrolling them', 'Only if they are short', 'Only in green'], correct: 1, explanation: 'Scrolling text is a very common use for these displays.' },
      { question: 'How many LEDs are in an 8x8 grid?', options: ['8', '16', '64', '100'], correct: 2, explanation: '8 times 8 equals 64 pixels.' },
      { question: 'What does "Multiplexing" do?', options: ['Saves power', 'Controls many LEDs with few pins', 'Makes it brighter', 'Changes the color'], correct: 1, explanation: 'It rapidly switches between rows/columns to create the illusion of a steady image.' }
    ], 
    game: { title: 'Pixel Artist', description: 'Draw a smiley face on the 8x8 grid!', prompt: 'Light up the pixels.' } 
  },
  { 
    id: 'ldr', 
    name: 'LDR Module', 
    description: 'Detects light.', 
    icon: Lightbulb, 
    color: 'bg-yellow-300', 
    category: 'Detect', 
    slides: [
      {
        title: 'Sensor Image',
        content: '',
        image: ldrSensorImg
      },
      { 
        title: "What is an LDR?", 
        content: "The Definition: An LDR (Light Dependent Resistor) is a smart light sensor that measures how bright or dark it is in a room!\n\nThe Solar Eye: Think of it like a pair of electronic sunglasses that can instantly tell a computer if the sun is shining bright or if the lights have been turned off.\n\nThe Squiggly Face: It looks like a tiny, round little disc with a red or silver squiggly line winding across its face like a small snake or a maze." 
      },
      { 
        title: "How It Works (The 3 Steps)", 
        content: "The Light Battle: The squiggly track on top is made of a special material that reacts to light. When light shines on it, it gets super excited and lets electricity pass through easily.\n\nThe Dark Block: When it gets dark, the material blocks the electricity, making it struggle and slow down like a traffic jam inside a circuit.\n\The Quick Report: The sensor checks how hard the electricity is struggling (the resistance) and reports it to the computer. It says, \"The lights are off, it is pitch black!\" or \"Wow, it is super bright out here!\"" 
      },
      { 
        title: "3 Real-Life Uses", 
        content: "Automatic Streetlights: Streetlights on the highway use them to know exactly when the sun goes down so they can turn themselves on automatically without anyone flipping a switch.\n\nSmart Phone Screens: Your smartphone uses a tiny built-in LDR to measure the room's brightness and automatically lower your screen's light in the dark so it does not hurt your eyes.\n\nSolar Garden Lights: Those small plastic lamps placed in garden dirt use them to stay off and charge up all day, then instantly glow the second night falls." 
      },
      { 
        title: "Fun Fact! ☀️", 
        content: "It Can Help Robots Escape or Hunt the Light!\n\nStudents use this sensor to build clever little robots called \"Line Followers\" or \"Light Hunters.\" You can program a robot to use an LDR like an eye so that it will actively drive toward a flashlight beam across the floor. Alternatively, you can program it to act like a scared bug that instantly drives away and hides in the shadows the second you turn on the classroom lights!" 
      }
    ], 
    quiz: [
      { question: 'What does LDR stand for?', options: ['Light Dark Radio', 'Light Dependent Resistor', 'Little Digital Robot', 'Long Distance Ray'], correct: 1, explanation: 'It is a resistor that depends on light intensities.' },
      { question: 'What happens in bright light?', options: ['Resistance goes UP', 'Resistance goes DOWN', 'It explodes', 'It starts smoking'], correct: 1, explanation: 'More light means the electrical path becomes easier (lower resistance).' },
      { question: 'Is it an Analog or Digital sensor by itself?', options: ['Analog', 'Digital'], correct: 0, explanation: 'It provides a varying resistance, which is an analog signal.' },
      { question: 'What makes the squiggle work?', options: ['Magic', 'Photons releasing electrons', 'Heat', 'Magnets'], correct: 1, explanation: 'The material is sensitive to light particles called photons.' }
    ], 
    game: { title: 'City Lights', description: 'Turn on the city lights when the sun goes down!', prompt: 'Block the light to test!' } 
  },
  { 
    id: 'heartbeat', 
    name: 'Heartbeat Sensor', 
    description: 'Measures heart rate by optical pulse detection.', 
    icon: Heart, 
    color: 'bg-rose-500', 
    category: 'Biometrics', 
    slides: [
      {
        title: 'Sensor Image',
        content: '',
        image: heartbeatSensorImg
      },
      { 
        title: 'What is a Heartbeat Sensor?', 
        content: "The Definition: It is an optical biometric sensor that reads your heart rate (BPM - Beats Per Minute) simply by shining light through your finger or earlobe!\n\nThe Living Clock: Think of it like a micro-observatory that feels the rhythm of your life, converting the physical expansion of blood vessels into digital pulses.\n\nThe Red Glow: It usually features a bright green or red light on one side and a light-sensitive eye on the other, designed to press gently against your skin." 
      },
      { 
        title: 'How It Works (The 3 Steps)', 
        content: "The Green Beacon: The sensor shines a bright green light directly into your fingertip. Since human blood absorbs green light, some light is taken in and some bounces back.\n\nThe Pulse Peak: Every time your heart beats, it pushes fresh, oxygen-rich blood through your body. This makes your tiny blood vessels swell slightly, absorbing MORE green light.\n\nThe Optical Capture: During the gaps between beats, less blood is present, so LESS green light is absorbed. The photodetector measures these microscopic light changes and translates them into an accurate heartbeat display on your screen!" 
      },
      { 
        title: '3 Real-Life Uses', 
        content: "Fitness Smartwatches: Smart bands and sports watches use light-based sensors on your wrist to monitor calorie burns and pulse rates while you run or ride a bike.\n\nHospital ICU Monitors: Clamps placed on a patient's finger (pulse oximeters) continuously verify heartbeat rhythms and blood oxygen levels to ensure they are safe.\n\nStamina Gym Treadmills: The metal bar handles on professional gym treadmills read your pulse through your palms to automatically guide your workout intensity." 
      },
      { 
        title: 'Fun Fact! 🐳', 
        content: "From Hummingbirds to Blue Whales!\n\nDid you know that heart rate speeds vary wildly across the animal kingdom? A tiny hummingbird's heart beats an astounding 1,200 times per minute (20 beats per second!), while a giant Blue Whale's heart is as big as a small car and beats only 8 to 10 times per minute! Humans sit comfortably in the middle, typically averaging 60 to 100 beats per minute at rest!" 
      }
    ], 
    quiz: [
      { question: 'What does BPM stand for in heart rate monitoring?', options: ['Breaths Per Minute', 'Beats Per Minute', 'Blood Pressures Monitored', 'Biometric Pulse Measure'], correct: 1, explanation: 'BPM stands for Beats Per Minute, which is the standard measure of heart rate.' },
      { question: 'How does an optical pulse sensor "see" your heartbeat?', options: ['By measuring skin temperature', 'By shining light and measuring light absorption changes', 'By using tiny sound echoes', 'By tracking blood pressure with mechanical metal pads'], correct: 1, explanation: 'It shines light (usually green or red) into the skin and detects how the expansion of blood vessels alters light scattering!' },
      { question: 'Why does the sensor use green light instead of yellow or blue?', options: ['Green light goes faster', 'Oxygenated blood absorbs green light extremely well', 'It makes the sensor look cool', 'It is cheap to manufacture'], correct: 1, explanation: 'Green light is highly absorbed by hemoglobin, creating clear signal peaks for every cardiac cycle.' },
      { question: 'Which device uses this sensor to track daily fitness?', options: ['Television remote', 'Smartwatch/Fitness band', 'Microwave oven', 'Desktop computer mouse'], correct: 1, explanation: 'Modern smartwatches use optical heart rate monitors on their backs.' }
    ], 
    game: { title: 'Rhythm Master', description: 'Simulate a healthy cardiac cycle by pulsing in rhythm!', prompt: 'Interact with the sensor to measure BPM.' } 
  },
  { 
    id: 'laser', 
    name: 'Laser Emit Sensor', 
    description: 'Emits a concentrated coherent light beam.', 
    icon: Zap, 
    color: 'bg-red-500', 
    category: 'Indicators', 
    slides: [
      {
        title: 'Sensor Image',
        content: '',
        image: laserSensorImg
      },
      { 
        title: 'What is a Laser Emit Sensor?', 
        content: "The Definition: It is a solid-state transmitter module (like the popular KY-008) that projects a highly concentrated, narrow, and perfectly straight beam of red light over long distances!\n\nThe Super Spotlight: Unlike standard flashlights that spread light in all directions, a laser concentrates all of its light into one single super-powered dot that does not spread out.\n\nThe Brass Barrel: It usually consists of a tiny copper/brass cylinder containing a laser diode lens mounted directly onto an easy-to-use Arduino PCB panel." 
      },
      { 
        title: 'How It Works (The 3 Steps)', 
        content: "The Logic High: When you send a digital HIGH signal (5V) from the Arduino, electricity surges into the built-in solid-state laser diode.\n\nThe Excited Atoms: Inside the diode, electrons are excited to high energy levels, releasing identical, synchronized red light particles (photons) that jump back and forth inside an optical cavity.\n\nThe Coherent Beam: These photons escape through a tiny micro-lens at the tip, producing a highly amplified, single-wavelength light ray traveling perfectly in parallel!" 
      },
      { 
        title: '3 Real-Life Uses', 
        content: "Intruder Tripwires: Security systems project low-power lasers across doorway channels into photodetectors. If an intruder crosses and cuts the beam, an alarm sounds!\n\nBarcode scanners: Supermarket laser sensors sweep beams across grocery barcodes to decode stock tags and process quick purchases.\n\nIndustrial Levelers: Construction teams mount high-accuracy laser tubes to lay down perfectly straight pipes and ensure floors are 100% level." 
      },
      { 
        title: 'Fun Fact! 🌌', 
        content: "Light Speed Travel to the Moon!\n\nDid you know that laser beams are so incredibly straight and fast that scientists use ultra-powerful ones to measure the exact distance from the Earth to the Moon? They shoot a laser from Earth toward reflective mirrors left on the lunar surface by Apollo astronauts, then measure how many nanoseconds it takes for the beam to bounce back. The trip takes only about 1.3 seconds each way!" 
      }
    ], 
    quiz: [
      { question: 'What does the word LASER stand for?', options: ['Light Amplification by Stimulated Emission of Radiation', 'Light And Sound Energy Resonator', 'Liquid Added Solar Energy Receiver', 'Long Range Signal Emitter'], correct: 0, explanation: 'LASER is an acronym for Light Amplification by Stimulated Emission of Radiation.' },
      { question: 'Which Arduino command turns the Laser Emit fully ON?', options: ['analogRead(pin)', 'digitalWrite(pin, HIGH)', 'digitalWrite(pin, LOW)', 'pinMode(pin, INPUT)'], correct: 1, explanation: 'Writing digital HIGH to the laser pin sends power (5V) to activate the internal laser diode.' },
      { question: 'Why is a laser beam different from a standard flashlight?', options: ['It is made of soundwaves', 'Its light waves are coherent, travel in parallel, and do not spread', 'It uses heat instead of light', 'It runs without electrical current'], correct: 1, explanation: 'Laser light is monochromatic and coherent, allowing the beam to travel long distances in a perfectly straight line.' },
      { question: 'What security device uses a laser to detect intruders?', options: ['A laser tripwire system', 'A smoke detector', 'An ultrasonic range finder', 'A joystick sensor'], correct: 0, explanation: 'Laser tripwires trigger alarm signals immediately if an object interrupts the continuous laser path.' }
    ], 
    game: { title: 'Laser Target Lock', description: 'Guide and fire the laser to align on target nodes!', prompt: 'Activate the laser and trigger photodetectors!' } 
  },
  {
    id: 'humidity',
    name: 'Humidity Sensor',
    description: 'Measures atmospheric relative humidity level using DHT11 standard.',
    icon: Cloud,
    color: 'bg-sky-500',
    category: 'Env',
    slides: [
      {
        title: 'Sensor Image',
        content: '',
        image: humiditySensorImg
      },
      { 
        title: 'What is a Humidity Sensor?', 
        content: "The Definition: It is a smart environmental sensor (often the DHT11 module) that monitors moisture levels in the surrounding air.\n\nThe Air Sniffer: It behaves like a high-precision digital nose, analyzing invisible water vapor floating in the environment.\n\nThe Blue Shell: It usually sits inside a compact, grid-like blue or white plastic shell with open vents that allow the room air to circulate freely through the active grid." 
      },
      { 
        title: 'How It Works (The 3 Steps)', 
        content: "The Air Circulation: Ambient air passes through the grid shell to contact a moisture-holding component inside.\n\nThe Resistance Change: Inside, a hygroscopic polymer film absorbs or releases water vapor depending on room conditions, changing its electrical resistance.\n\nThe Calibration Readout: An onboard IC processes these electrical variations, sending a digital code to the Arduino via a single data pin to output percentages like 45% or 72% RH!" 
      },
      { 
        title: '3 Real-Life Uses', 
        content: "1. Smart Greenhouses: Automatically turns on humidifier or air ventilators when humidity falls below ideal conditions for plants.\n\n2. AC Units & Dehumidifiers: Home climate units continuously sense weather conditions to activate drying patterns and eliminate sticky, humid conditions.\n\n3. Weather Stations: Field meteorologists place these sensors globally inside automated enclosures to accurately analyze regional storm risk and rain forecasts." 
      },
      { 
        title: 'Fun Fact! 🦎', 
        content: "Nature's Humidity Gauge!\n\nJust like the ultrasonic sensor is inspired by bats, we also have natural moisture experts in nature! Some desert lizards have highly sophisticated skin scales filled with microscopic channels. They can absorb morning water mist from the air directly through their feet, using humidity changes locally to survive in standard arid deserts!" 
      }
    ], 
    quiz: [
      { question: 'What does RH stand for in humidity readings?', options: ['Rain Hazard', 'Relative Humidity', 'Radio Heat', 'Resistive Hydrogen'], correct: 1, explanation: 'RH stands for Relative Humidity, representing the current water vapor amount relative to the maximum at that temperature.' },
      { question: 'What color is the common DHT11 temperature & humidity module shell?', options: ['Bright Red', 'Cobalt Blue', 'Chrome Yellow', 'Solid Black'], correct: 1, explanation: 'The ubiquitous DHT11 module commonly features a bright cobalt blue grid plastic housing.' },
      { question: 'How many active pins does a DHT11 breakout module typically feature?', options: ['1 pin', '3 pins', '12 pins', '2 pins'], correct: 1, explanation: 'Breakout boards for DHT11 typically expose 3 pins: VCC (power), GND (ground), and OUT/DATA (signal).' },
      { question: 'Which of these devices would use a humidity sensor to manage room sweatiness?', options: ['A kitchen toaster', 'An automated air conditioner', 'An electric blender', 'A digital thermometer scale'], correct: 1, explanation: 'Modern air conditioners monitor humidity levels to activate drying loops when the indoor air gets uncomfortable.' }
    ], 
    game: { title: 'Humidifier Calibration', description: 'Calibrate the chamber\'s relative humidity to exactly 60%!', prompt: 'Manage the humidifier and dry fan to lock the humidity level.' } 
  },
  {
    id: 'tracking',
    name: 'Tracking Sensor',
    description: 'Detects lines or dark/light boundaries using focused infrared emitter/receiver pairs.',
    icon: Radar,
    color: 'bg-indigo-600',
    category: 'Motion',
    slides: [
      {
        title: 'Sensor Image',
        content: '',
        image: trackingSensorImg
      },
      { 
        title: 'What is a Tracking Sensor?', 
        content: "The Definition: It is a smart navigational sensor (commonly the TCRT5000) designed to distinguish between highly reflective surfaces and dark non-reflective lines.\n\nThe Road Guide: It behaves like a focused pair of optical eyes facing downward, helping robot cars or scanners follow custom dark paths without wandering off.\n\nThe Dual Beaks: It features two key components at the tip - a black infrared (IR) LED emitter that beams invisible light down, and a clear IR phototransistor that catches the bouncing reflection." 
      },
      { 
        title: 'How It Works (The 3 Steps)', 
        content: "The Light Projection: The onboard black IR LED continuously projects a tight, invisible beam of infrared light toward the ground.\n\nThe Absorption Difference: A white surface highly reflects this light back up, whereas a dark/black line absorbs most of the infrared light energy.\n\nThe Output Trigger: The phototransistor captures the reflection; if reflection is high (white surface), resistance drops and it returns HIGH/LOW. If reflection is low (black line), it triggers a reverse state, letting the MCU instantly adjust steering motors!" 
      },
      { 
        title: '3 Real-Life Uses', 
        content: "1. Line-Following AGVs: Automated Guided Vehicles in massive Amazon-style warehouses follow painted magnetic or dark lines on concrete floors to transport crates.\n\n2. Industrial Assembly Lines: High-speed conveyor belts use optical tracking to confirm package presence and alignment boundaries before robotic arms grip them.\n\n3. Paper Edge Aligners: Giant office printers use miniature reflection tracking pairs to detect the white margin edge of a paper sheet, preventing awkward printing jams or errors." 
      },
      { 
        title: 'Fun Fact! 🤖', 
        content: "High-Speed Robot Derbies!\n\nLine tracking is the secret sauce behind micromouse and line-following robotic drag races where robots traverse incredibly complex, winding racing tracks at speeds exceeding 3 meters per second! These robots process line sensor readings thousands of times each second to perform perfect high-speed cornering!" 
      }
    ], 
    quiz: [
      { question: 'What spectrum of light does the TCRT5000 tracking sensor utilize?', options: ['Visible Purple Light', 'High-energy Ultraviolet', 'Invisible Infrared Light', 'Super-focused Red Laser'], correct: 2, explanation: 'Tracking sensors utilize invisible Infrared (IR) light to avoid interference from ambient room lighting.' },
      { question: 'Why does a black line trigger a change in the tracking sensor?', options: ['Black color generates negative electric power', 'Black surfaces absorb infrared light instead of reflecting it', 'Black lines reflect light with double intensity', 'Black paint is highly magnetic to the emitter'], correct: 1, explanation: 'Dark/black boundaries absorb infrared light energy, resulting in a minimal reflection being returned to the photoreceptor.' },
      { question: 'What is the standard purpose of the on-board potentiometer screw on the TCRT5000 module?', options: ['Change the color of the IR light', 'Tune the sensitivity/distance threshold of the reflex trigger', 'Increase the output voltage above +5V', 'Switch the sensor into a thermometer mode'], correct: 1, explanation: 'The built-in potentiometer adjustability lets you calibrate exactly how reflective a surface must be to trigger a threshold match.' },
      { question: 'Which application most directly uses multi-sensor tracking arrays?', options: ['Kitchen boiling kettles', 'An automated warehouse line-following transporter', 'A digital voice audio recorder', 'A residential smart fireplace alarm'], correct: 1, explanation: 'Warehouse transporter AGVs rely heavily on tracking array modules to navigate along marked pathways efficiently.' }
    ], 
    game: { title: 'Line Tracker Calibration', description: 'Calibrate and align the robot\'s tracking sensor with the pathway line!', prompt: 'Adjust the alignment angle and sensitivity to lock onto the track boundary.' } 
  },
  {
    id: 'touch',
    name: 'Touch Sensor',
    description: 'Detects physical touch or proximity using capacitive charge changes.',
    icon: Fingerprint,
    color: 'bg-rose-500',
    category: 'Control',
    slides: [
      {
        title: 'Sensor Image',
        content: '',
        image: touchSensorImg
      },
      { 
        title: 'What is a Touch Sensor?', 
        content: "The Definition: It is a solid-state electronic button module (commonly the TTP223) that senses the presence or touch of a human finger through changes in electrical capacitance.\n\nThe Copper Core: Unlike mechanical buttons that click and suffer structural fatigue, capacitive touch sensors use a flat, responsive copper pad pattern printed on the board that senses finger conductivity without moving parts.\n\nOver the Glass: Because it operates using electronic proximity fields, the module can perfectly register touch even through protective glass, acrylic, plexiglass, or plastic up to 3mm thick, keeping the interface completely waterproof!" 
      },
      { 
        title: 'How It Works (The 3 Steps)', 
        content: "Proximity Field: The internal TTP223 chip establishes a high-frequency electrostatic field surrounding the circular copper touch area on the PCB surface.\n\nCapacitance Disturb: When a human finger (essentially a conductive object filled with electrolyte) interacts with this field, it acts as a secondary electrode, changing the localized capacitance.\n\nSignal Output: The IC compares this sudden capacitance increase to its base environment constant, activates a local feedback LED, and drives the digital I/O pin HIGH to alert the Arduino instantly!" 
      },
      { 
        title: '3 Real-Life Uses', 
        content: "1. Modern White Goods: Glossy glass control interfaces on modern kitchen stoves, microwave panels, and luxury smart refrigerator touch screens.\n\n2. Waterproof public switches: Secure elevator controls, ATMs, and outdoor parking terminals that need completely sealed button interfaces that lock out dust and water.\n\n3. Backlit Smart Switches: Sleek replacement light switches with elegant capacitive touch glass overlays that integrate home automation controls seamlessly." 
      },
      { 
        title: 'Fun Fact! 🌸', 
        content: "Human Capacitors!\n\nCapacitive touch sensors only work because our human bodies naturally carry localized electrostatic charge and conducting ions! When you try to touch a smart phone screen or TTP223 module with thick, dry woolen gloves or wooden pens, the electrostatic circuit isn't completed, which is why capacitive devices ignore ordinary non-conductive contacts!" 
      }
    ], 
    quiz: [
      { question: 'What principle does the TTP223 Touch Sensor use to register a touch?', options: ['Mechanical lever contact', 'Capacitive charge disturbance', 'Magnetic flux alteration', 'Temperature variation'], correct: 1, explanation: 'The TTP223 uses capacitive sensing, reading local changes in electric charge when a finger approaches its field.' },
      { question: 'Through which of these materials can capacitive touch trigger reliably?', options: ['Solid iron shielding plate', 'Acrylic sheets up to 3mm thick', 'A block of lead block', 'Heavy structural concrete'], correct: 1, explanation: 'Electrostatic fields can penetrate non-conductive, thin insulative plates like acrylic, glass, or plastic sheets.' },
      { question: 'Which advantage makes touch sensors superior to old clicking pushbuttons?', options: ['They consume ultra high voltages', 'They have zero moving parts, avoiding fatigue and allowing dustproofing', 'They emit bright beams of laser light', 'They require high hydraulic pressure'], correct: 2, explanation: 'The absence of moving parts eliminates mechanical fatigue, allowing long-term durability and water-resistant casing sealing.' },
      { question: 'What happens to the measured capacitance when a finger touches the sensor core?', options: ['The capacitance completely disappears', 'The local capacitance increases as a conductive body comes close', 'The board temperature rises by 10 degrees', 'The voltage triggers an electric shock'], correct: 1, explanation: 'The conductive human finger supplies extra capacitance to the sensitive trace, triggering the TTP223 output switch.' }
    ], 
    game: { title: 'Touch Pad Calibration', description: 'Calibrate the capacitive debounce filter to record 5 successful fingerprint clicks!', prompt: 'Tweak sensitivity levels and press the capacitive core switch to record clicks!' } 
  },
];
