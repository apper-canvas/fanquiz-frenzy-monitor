import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { FadeTransition, SlideTransition, PopTransition } from '../transitions/Transitions';
import { getIcon } from '../utils/iconUtils';

// Sample quiz data
const quizData = {
  'friends': [
    {
      id: 'f1',
      question: "What is the name of Ross and Monica's dog when they were growing up?",
      options: ["Chi-Chi", "Marcel", "Fluffy", "LaPooh"],
      correctAnswer: 3,
      explanation: "Ross and Monica had a dog named LaPooh when they were kids."
    },
    {
      id: 'f2',
      question: "What is Chandler Bing's job?",
      options: [
        "Statistical analysis and data reconfiguration",
        "Transponster",
        "Advertising copywriter",
        "IT procurement manager"
      ],
      correctAnswer: 0,
      explanation: "Chandler works in statistical analysis and data reconfiguration. Monica famously doesn't know this in a contest."
    },
    {
      id: 'f3',
      question: "What's the name of the coffee shop where the friends hang out?",
      options: ["Central Park", "Central Perk", "Coffee Time", "Manhattan Brew"],
      correctAnswer: 1,
      explanation: "Central Perk is the coffee shop located on the ground floor of the building where Rachel, Monica, Joey, and Chandler live."
    },
    {
      id: 'f4',
      question: "Which character says the last line of the series finale?",
      options: ["Rachel", "Ross", "Monica", "Chandler"],
      correctAnswer: 3,
      explanation: "Chandler suggests they all go for coffee, and when asked where, he sarcastically replies, 'Where?'"
    },
    {
      id: 'f5',
      question: "How many times has Ross been divorced?",
      options: ["2", "3", "1", "4"],
      correctAnswer: 1,
      explanation: "Ross has been divorced three times: from Carol, Emily, and Rachel."
    },
    {
      id: 'f6',
      question: "What is Joey's catchphrase?",
      options: ["How you doin'?", "Could I BE any more...?", "Oh my god!", "We were on a break!"],
      correctAnswer: 0,
      explanation: "Joey's famous pickup line is 'How you doin'?'"
    },
    {
      id: 'f7',
      question: "What instrument does Phoebe play?",
      options: ["Piano", "Violin", "Guitar", "Drums"],
      correctAnswer: 2,
      explanation: "Phoebe plays the guitar when performing her songs like 'Smelly Cat'."
    },
    {
      id: 'f8',
      question: "Which of the friends dated Janice?",
      options: ["Joey", "Ross", "Chandler", "Both Ross and Chandler"],
      correctAnswer: 3,
      explanation: "Both Ross and Chandler dated Janice at different points in the series."
    },
    {
      id: 'f9',
      question: "What is the name of Phoebe's twin sister?",
      options: ["Ursula", "Regina", "Denise", "Gladys"],
      correctAnswer: 0,
      explanation: "Phoebe's identical twin sister is Ursula, who works as a waitress."
    },
    {
      id: 'f10',
      question: "Which friend was previously a member of the a cappella group 'The Menudo Fan Club'?",
      options: ["Ross", "Joey", "Rachel", "Chandler"],
      correctAnswer: 0,
      explanation: "Ross was part of a musical group called 'The Menudo Fan Club' in high school."
    }
  ],
  'modern-family': [
    {
      id: 'mf1',
      question: "What is the name of Jay and Gloria's son?",
      options: ["Manny", "Joe", "Fulgencio", "Javier"],
      correctAnswer: 1,
      explanation: "Jay and Gloria have a son named Joe (short for Fulgencio Joseph)."
    },
    {
      id: 'mf2',
      question: "What is Phil Dunphy's profession?",
      options: ["Lawyer", "Real Estate Agent", "Engineer", "Teacher"],
      correctAnswer: 1,
      explanation: "Phil works as a real estate agent."
    },
    {
      id: 'mf3',
      question: "Which country is Gloria from?",
      options: ["Mexico", "Brazil", "Colombia", "Argentina"],
      correctAnswer: 2,
      explanation: "Gloria is from Colombia."
    },
    {
      id: 'mf4',
      question: "What is the name of Mitchell and Cameron's adopted daughter?",
      options: ["Haley", "Alex", "Lily", "Claire"],
      correctAnswer: 2,
      explanation: "Mitchell and Cameron adopted a daughter named Lily from Vietnam."
    },
    {
      id: 'mf5',
      question: "What is Claire's maiden name?",
      options: ["Pritchett", "Tucker", "Delgado", "Johnson"],
      correctAnswer: 0,
      explanation: "Claire's maiden name is Pritchett, as she is Jay's daughter."
    },
    {
      id: 'mf6',
      question: "What is Cameron's occupation before becoming a high school football coach?",
      options: ["Music Teacher", "Clown", "Chef", "Architect"],
      correctAnswer: 0,
      explanation: "Cameron works as a music teacher before becoming a football coach."
    },
    {
      id: 'mf7',
      question: "What is the name of the family dog that the Dunphys adopt?",
      options: ["Stella", "Rex", "Larry", "Spot"],
      correctAnswer: 0,
      explanation: "Stella is the French Bulldog that Jay and Gloria adopt."
    },
    {
      id: 'mf8',
      question: "What is Phil's alter ego when he's a realtor?",
      options: ["Phil the Thrill", "Property Phil", "Phil Dunphy: Real Estate Ninja", "Magic Phil"],
      correctAnswer: 2,
      explanation: "Phil calls himself 'Phil Dunphy: Real Estate Ninja' on his business cards."
    },
    {
      id: 'mf9',
      question: "Which college does Haley attend briefly before getting expelled?",
      options: ["UCLA", "USC", "CalTech", "None of these"],
      correctAnswer: 3,
      explanation: "Haley attends an unnamed college before getting expelled for assaulting a police officer."
    },
    {
      id: 'mf10',
      question: "What is Manny's biological father's name?",
      options: ["Javier", "Esteban", "Roberto", "Carlos"],
      correctAnswer: 0,
      explanation: "Manny's biological father is named Javier Delgado."
    }
  ],
  'harry-potter': [
    {
      id: 'hp1',
      question: "What house at Hogwarts does Harry Potter belong to?",
      options: ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"],
      correctAnswer: 0,
      explanation: "Harry belongs to Gryffindor house."
    },
    {
      id: 'hp2',
      question: "What is the core of Harry Potter's wand?",
      options: ["Dragon Heartstring", "Unicorn Hair", "Phoenix Feather", "Veela Hair"],
      correctAnswer: 2,
      explanation: "Harry's wand has a phoenix feather core, specifically a feather from Fawkes."
    },
    {
      id: 'hp3',
      question: "Which spell is used to disarm an opponent?",
      options: ["Expecto Patronum", "Expelliarmus", "Wingardium Leviosa", "Accio"],
      correctAnswer: 1,
      explanation: "Expelliarmus is the disarming spell. It's often used by Harry."
    },
    {
      id: 'hp4',
      question: "What is the name of Harry Potter's owl?",
      options: ["Errol", "Hedwig", "Crookshanks", "Scabbers"],
      correctAnswer: 1,
      explanation: "Harry's snowy owl is named Hedwig."
    },
    {
      id: 'hp5',
      question: "Who is the Half-Blood Prince?",
      options: ["Voldemort", "Harry Potter", "Severus Snape", "Sirius Black"],
      correctAnswer: 2,
      explanation: "Severus Snape is the Half-Blood Prince; his mother was Eileen Prince and his father was a Muggle."
    },
    {
      id: 'hp6',
      question: "What subject does Professor McGonagall teach?",
      options: ["Potions", "Transfiguration", "Charms", "Defense Against the Dark Arts"],
      correctAnswer: 1,
      explanation: "Professor McGonagall teaches Transfiguration at Hogwarts."
    },
    {
      id: 'hp7',
      question: "What does the spell 'Obliviate' do?",
      options: ["Makes objects float", "Erases memories", "Creates light", "Causes pain"],
      correctAnswer: 1,
      explanation: "The Obliviate spell erases or modifies a person's memory."
    },
    {
      id: 'hp8',
      question: "What position does Harry play in Quidditch?",
      options: ["Keeper", "Chaser", "Beater", "Seeker"],
      correctAnswer: 3,
      explanation: "Harry plays as the Seeker position on the Gryffindor Quidditch team."
    },
    {
      id: 'hp9',
      question: "What is the name of the three-headed dog that guards the Philosopher's Stone?",
      options: ["Fang", "Fluffy", "Norbert", "Aragog"],
      correctAnswer: 1,
      explanation: "The three-headed dog is named Fluffy and belongs to Hagrid."
    },
    {
      id: 'hp10',
      question: "How many Deathly Hallows are there?",
      options: ["Two", "Three", "Four", "Seven"],
      correctAnswer: 1,
      explanation: "There are three Deathly Hallows: the Elder Wand, the Resurrection Stone, and the Invisibility Cloak."
    }
  ]
};

const MainFeature = ({ category }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime, setStartTime] = useState(null);

  const questions = category ? quizData[category.id] : [];
  const currentQuestion = questions[currentQuestionIndex];

  // Timer effect
  useEffect(() => {
    if (!quizComplete && !isAnswered && category) {
      const now = new Date();
      setStartTime(now);
      const timer = setInterval(() => {
        setTimeSpent(prevTime => prevTime + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentQuestionIndex, isAnswered, quizComplete, category]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleAnswerSelect = (answerIndex) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(prevScore => prevScore + 1);
      toast.success("Correct answer! 🎉");
    } else {
      toast.error("Wrong answer! Try again next time.");
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setQuizComplete(true);
    } else {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setQuizComplete(false);
    setTimeSpent(0);
  };

  // Icons
  const TrophyIcon = getIcon('trophy');
  const TimerIcon = getIcon('timer');
  const CheckCircleIcon = getIcon('check-circle');
  const XCircleIcon = getIcon('x-circle');
  const HelpCircleIcon = getIcon('help-circle');

  if (!category) return null;

  // Results screen
  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    let resultMessage = "";
    let resultIcon = null;
    
    if (percentage >= 80) {
      resultMessage = "Amazing! You're a true fan!";
      resultIcon = <TrophyIcon className="h-16 w-16 text-yellow-500" />;
    } else if (percentage >= 60) {
      resultMessage = "Great job! You know your stuff!";
      resultIcon = <CheckCircleIcon className="h-16 w-16 text-green-500" />;
    } else if (percentage >= 40) {
      resultMessage = "Not bad! Keep learning!";
      resultIcon = <HelpCircleIcon className="h-16 w-16 text-blue-500" />;
    } else {
      resultMessage = "Time to rewatch the series!";
      resultIcon = <XCircleIcon className="h-16 w-16 text-red-500" />;
    }

    return (
      <PopTransition
        className="card max-w-2xl mx-auto text-center"
      >
        <motion.div 
          className="flex justify-center mb-4"
          animate={{ scale: [0.9, 1.2, 1] }}
          transition={{ duration: 1, times: [0, 0.6, 1] }}
        >
          {resultIcon}
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Quiz Complete!</h2>
        <div className="text-lg md:text-xl font-semibold mb-4">
          {resultMessage}
        </div>
        <FadeTransition delay={0.2} className="mb-8 p-6 bg-surface-50 dark:bg-surface-800 rounded-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-white dark:bg-surface-700 rounded-lg">
              <div className="text-sm text-surface-500 dark:text-surface-400">Your Score</div>
              <div className="text-2xl font-bold">{score} / {questions.length}</div>
            </div>
            <div className="p-4 bg-white dark:bg-surface-700 rounded-lg">
              <div className="text-sm text-surface-500 dark:text-surface-400">Percentage</div>
              <div className="text-2xl font-bold">{percentage}%</div>
            </div>
          </div>
          
          <div className="p-4 bg-white dark:bg-surface-700 rounded-lg">
            <div className="text-sm text-surface-500 dark:text-surface-400">Time Spent</div>
            <div className="text-2xl font-bold">{formatTime(timeSpent)}</div>
          </div>
        </FadeTransition>
        
        <motion.button
          onClick={handleRestartQuiz}
          className="btn btn-primary w-full sm:w-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          Try Again
        </motion.button>
      </PopTransition>
    );
  }

  // Quiz question screen
  return (
    <FadeTransition className="max-w-3xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div className="font-semibold text-lg">
          <span className="text-primary">
            Question {currentQuestionIndex + 1}/{questions.length}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-surface-100 dark:bg-surface-800 px-3 py-1 rounded-full">
          <TimerIcon className="h-4 w-4 text-surface-500" />
          <span className="text-surface-600 dark:text-surface-300">{formatTime(timeSpent)}</span>
        </div>
      </div>

      <motion.div 
        className="card mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-xl md:text-2xl font-semibold mb-6">
          {currentQuestion.question}
        </h2>
        
        <div className="space-y-3">
          <AnimatePresence>
            {currentQuestion.options.map((option, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: isAnswered ? 1 : 1.03 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { delay: index * 0.1 }
                }}
                onClick={() => handleAnswerSelect(index)}
                className={`quiz-option ${
                isAnswered && index === currentQuestion.correctAnswer
                  ? 'quiz-option-correct'
                  : isAnswered && index === selectedAnswer && index !== currentQuestion.correctAnswer
                  ? 'quiz-option-incorrect'
                  : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  <AnimatePresence>
                    {isAnswered && index === currentQuestion.correctAnswer && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      </motion.div>
                    )}
                    {isAnswered && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <XCircleIcon className="h-5 w-5 text-red-500" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      <AnimatePresence>
        {isAnswered && (
          <SlideTransition
            direction="up"
            className="card mb-6 border-l-4 border-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="text-lg font-semibold mb-2">
              {selectedAnswer === currentQuestion.correctAnswer
                ? "Correct! 🎉"
                : "Incorrect 😕"}
            </div>
            <p className="text-surface-600 dark:text-surface-300">
              {currentQuestion.explanation}
            </p>
          </SlideTransition>
        )}
      </AnimatePresence>

      <div className="flex justify-end">
        <motion.button
          onClick={handleNextQuestion}
          disabled={!isAnswered}
          whileHover={isAnswered ? { scale: 1.05 } : {}}
          whileTap={isAnswered ? { scale: 0.95 } : {}}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className={`btn ${
            isAnswered ? 'btn-primary' : 'bg-surface-300 dark:bg-surface-700 cursor-not-allowed'
          }`}
        >
          {currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
        </motion.button>
      </div>
    </FadeTransition>
  );
};

export default MainFeature;