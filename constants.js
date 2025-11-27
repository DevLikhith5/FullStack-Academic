
export const QUESTIONS = [
  // Science
  {
    id: 'sci-1',
    topic: 'Science',
    text: "What planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correctAnswer: "Mars",
    explanation: "Iron oxide prevalent on its surface gives it a reddish appearance."
  },
  {
    id: 'sci-2',
    topic: 'Science',
    text: "What is the chemical symbol for Gold?",
    options: ["Au", "Ag", "Fe", "Hg"],
    correctAnswer: "Au",
    explanation: "Au comes from the Latin word for gold, 'Aurum'."
  },
  {
    id: 'sci-3',
    topic: 'Science',
    text: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
    correctAnswer: "Mitochondria",
    explanation: "Mitochondria generate most of the chemical energy needed to power the cell's biochemical reactions."
  },
  // Tech
  {
    id: 'tech-1',
    topic: 'Tech',
    text: "Who is often credited with creating the World Wide Web?",
    options: ["Bill Gates", "Steve Jobs", "Tim Berners-Lee", "Al Gore"],
    correctAnswer: "Tim Berners-Lee",
    explanation: "He invented the World Wide Web in 1989 while working at CERN."
  },
  {
    id: 'tech-2',
    topic: 'Tech',
    text: "What does CPU stand for?",
    options: ["Central Processing Unit", "Computer Personal Unit", "Central Peripheral Utility", "Core Processing User"],
    correctAnswer: "Central Processing Unit",
    explanation: "The CPU is the primary component of a computer that acts as its control center."
  },
  // History
  {
    id: 'hist-1',
    topic: 'History',
    text: "Which civilization built the Machu Picchu complex?",
    options: ["Aztec", "Inca", "Maya", "Olmec"],
    correctAnswer: "Inca",
    explanation: "Machu Picchu was built in the 15th century and later abandoned."
  },
  {
    id: 'hist-2',
    topic: 'History',
    text: "In which year did the Titanic sink?",
    options: ["1905", "1912", "1920", "1898"],
    correctAnswer: "1912",
    explanation: "The RMS Titanic sank in the North Atlantic Ocean on April 15, 1912."
  },
  // Arts
  {
    id: 'arts-1',
    topic: 'Arts',
    text: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
    correctAnswer: "Leonardo da Vinci",
    explanation: "It is a half-length portrait painting by Italian artist Leonardo da Vinci."
  },
  // General
  {
    id: 'gen-1',
    topic: 'General',
    text: "What is the capital of Japan?",
    options: ["Seoul", "Beijing", "Tokyo", "Kyoto"],
    correctAnswer: "Tokyo",
    explanation: "Tokyo is the capital and most populous prefecture of Japan."
  },
  {
    id: 'gen-2',
    topic: 'General',
    text: "How many continents are there on Earth?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "7",
    explanation: "They are Africa, Antarctica, Asia, Europe, North America, Australia, and South America."
  }
];

export const QUESTION_TIMER_SECONDS = 15;
export const QUIZ_LENGTH = 5;