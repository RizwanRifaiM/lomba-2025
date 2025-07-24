'use client'

import React, { useState } from 'react'

import { Badge }      from '@/components/ui/badge'
import { Button }     from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress }   from '@/components/ui/progress'
import { Separator }  from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

import {
  BookOpen, Brain, Calculator, FlaskConical as Flask, Leaf, Code, Trophy, 
  CheckCircle, Play, Clock, Users, ArrowLeft, Star, Target, Award, Video, FileText, 
  Download, ExternalLink, Lightbulb, Code2
} from 'lucide-react'

interface ModuleContent {
  introduction: string
  concepts: Array<{
    title: string
    content: string
    examples?: string[]
  }>
  practiceExercises: Array<{
    title: string
    description: string
    difficulty: 'Easy' | 'Medium' | 'Hard'
    solution?: string
  }>
  resources: Array<{
    title: string
    type: 'video' | 'article' | 'book' | 'tool' | 'documentation'
    url: string
    description: string
  }>
  keyTakeaways: string[]
}

interface Module {
  id: number
  title: string
  duration: string
  completed: boolean
  description: string
  content: ModuleContent
}

interface Quiz {
  id: string
  title: string
  questions: number
  duration: string
}

interface Course {
  title: string
  icon: React.ElementType
  color: string
  description: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  rating: number
  students: number
  modules: Module[]
  quiz: Quiz
}

interface QuizQuestion {
  question: string
  options: string[]
  correct: number
  explanation: string
}

const courseData: Record<string, Course> = {
  'machine-learning': {
    title: 'Machine Learning',
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
    description: 'Master the fundamentals of AI and ML with hands-on projects',
    level: 'Advanced',
    rating: 4.8,
    students: 12_543,
    modules: [
      { 
        id: 1, 
        title: 'Introduction to ML', 
        duration: '45 min', 
        completed: false, 
        description: 'ML basics & applications',
        content: {
          introduction: "Machine Learning adalah cabang dari Artificial Intelligence yang memungkinkan komputer untuk belajar dan membuat keputusan tanpa perlu diprogram secara eksplisit untuk setiap tugas. Dalam modul ini, kita akan menjelajahi konsep dasar ML dan aplikasinya di dunia nyata.",
          concepts: [
            {
              title: "Definisi Machine Learning",
              content: "Machine Learning adalah metode analisis data yang mengotomatisasi pembangunan model analitik. Ini adalah cabang dari artificial intelligence berdasarkan ide bahwa sistem dapat belajar dari data, mengidentifikasi pola, dan membuat keputusan dengan minimal intervensi manusia.",
              examples: [
                "Sistem rekomendasi Netflix yang mempelajari preferensi penonton",
                "Filter spam email yang belajar mengenali pola email spam",
                "Sistem deteksi fraud bank yang menganalisis pola transaksi"
              ]
            },
            {
              title: "Jenis-jenis Machine Learning",
              content: "Ada tiga jenis utama machine learning: Supervised Learning (menggunakan data berlabel), Unsupervised Learning (mencari pola dalam data tanpa label), dan Reinforcement Learning (belajar melalui trial dan error).",
              examples: [
                "Supervised: Prediksi harga rumah berdasarkan data historis",
                "Unsupervised: Segmentasi pelanggan berdasarkan perilaku",
                "Reinforcement: Game AI yang belajar bermain catur"
              ]
            }
          ],
          practiceExercises: [
            {
              title: "Identifikasi Jenis ML",
              description: "Diberikan beberapa skenario, tentukan apakah ini supervised, unsupervised, atau reinforcement learning",
              difficulty: "Easy",
              solution: "Analisis setiap skenario berdasarkan ketersediaan label dan tujuan pembelajaran"
            },
            {
              title: "Studi Kasus ML",
              description: "Pilih industri favorit Anda dan identifikasi 3 aplikasi ML yang mungkin",
              difficulty: "Medium"
            }
          ],
          resources: [
            {
              title: "Machine Learning Crash Course",
              type: "video",
              url: "#",
              description: "Google's comprehensive ML course for beginners"
            },
            {
              title: "Introduction to Statistical Learning",
              type: "book",
              url: "#",
              description: "Comprehensive textbook on statistical learning methods"
            },
            {
              title: "Scikit-learn Documentation",
              type: "documentation",
              url: "#",
              description: "Official documentation for Python's ML library"
            }
          ],
          keyTakeaways: [
            "ML memungkinkan komputer belajar dari data tanpa programming eksplisit",
            "Ada tiga jenis utama: supervised, unsupervised, dan reinforcement learning",
            "ML applications ada di mana-mana dalam kehidupan sehari-hari",
            "Pemilihan algoritma tergantung pada jenis data dan masalah yang ingin diselesaikan"
          ]
        }
      },
      { 
        id: 2, 
        title: 'Supervised Learning', 
        duration: '60 min', 
        completed: false, 
        description: 'Classification & regression',
        content: {
          introduction: "Supervised Learning adalah jenis machine learning di mana kita melatih model menggunakan data yang sudah memiliki label atau target yang diketahui. Tujuannya adalah membuat prediksi akurat pada data baru.",
          concepts: [
            {
              title: "Klasifikasi vs Regresi",
              content: "Klasifikasi memprediksi kategori (diskrit), sedangkan regresi memprediksi nilai numerik (kontinu). Keduanya menggunakan supervised learning tetapi untuk jenis output yang berbeda.",
              examples: [
                "Klasifikasi: Email spam/tidak spam, diagnosis medis",
                "Regresi: Prediksi harga saham, estimasi suhu"
              ]
            },
            {
              title: "Algoritma Populer",
              content: "Beberapa algoritma supervised learning yang paling sering digunakan termasuk Linear Regression, Decision Trees, Random Forest, dan Support Vector Machines.",
              examples: [
                "Linear Regression untuk prediksi harga rumah",
                "Decision Trees untuk sistem approval kredit",
                "Random Forest untuk prediksi customer churn"
              ]
            }
          ],
          practiceExercises: [
            {
              title: "Build Your First Classifier",
              description: "Implementasi decision tree classifier menggunakan dataset iris",
              difficulty: "Medium",
              solution: "Gunakan scikit-learn untuk membangun dan mengevaluasi model"
            }
          ],
          resources: [
            {
              title: "Supervised Learning Algorithms",
              type: "article",
              url: "#",
              description: "Comprehensive guide to supervised learning algorithms"
            }
          ],
          keyTakeaways: [
            "Supervised learning menggunakan data berlabel untuk training",
            "Klasifikasi untuk prediksi kategori, regresi untuk nilai numerik",
            "Model performance diukur dengan metrics seperti accuracy dan MSE"
          ]
        }
      },
      { 
        id: 3, 
        title: 'Unsupervised Learning', 
        duration: '55 min', 
        completed: false, 
        description: 'Clustering & dimensionality reduction',
        content: {
          introduction: "Unsupervised Learning bekerja dengan data yang tidak memiliki label target. Tujuannya adalah menemukan pola tersembunyi, struktur, atau hubungan dalam data.",
          concepts: [
            {
              title: "Clustering",
              content: "Clustering mengelompokkan data points yang serupa. K-means adalah algoritma clustering yang paling populer, bekerja dengan membagi data ke dalam k cluster.",
              examples: [
                "Segmentasi pelanggan berdasarkan perilaku pembelian",
                "Grouping artikel berita berdasarkan topik"
              ]
            }
          ],
          practiceExercises: [
            {
              title: "Customer Segmentation",
              description: "Gunakan K-means untuk mengelompokkan pelanggan",
              difficulty: "Medium"
            }
          ],
          resources: [
            {
              title: "Clustering Algorithms Guide",
              type: "article",
              url: "#",
              description: "Deep dive into clustering techniques"
            }
          ],
          keyTakeaways: [
            "Unsupervised learning menemukan pola dalam data tanpa label",
            "Clustering mengelompokkan data berdasarkan kesamaan",
            "Dimensionality reduction mengurangi kompleksitas data"
          ]
        }
      },
      { 
        id: 4, 
        title: 'Neural Networks', 
        duration: '75 min', 
        completed: false, 
        description: 'Artificial neural networks',
        content: {
          introduction: "Neural Networks adalah model komputasi yang terinspirasi dari cara kerja otak manusia. Mereka terdiri dari nodes (neurons) yang saling terhubung dan dapat mempelajari pola kompleks dalam data.",
          concepts: [
            {
              title: "Struktur Neural Network",
              content: "Neural network terdiri dari input layer, hidden layers, dan output layer. Setiap neuron menerima input, menerapkan fungsi aktivasi, dan meneruskan output ke layer berikutnya.",
              examples: [
                "Perceptron sederhana untuk klasifikasi binary",
                "Multi-layer perceptron untuk masalah kompleks"
              ]
            }
          ],
          practiceExercises: [
            {
              title: "Build a Simple Neural Network",
              description: "Implementasi neural network dari scratch untuk klasifikasi digit",
              difficulty: "Hard"
            }
          ],
          resources: [
            {
              title: "Neural Networks and Deep Learning",
              type: "book",
              url: "#",
              description: "Comprehensive guide by Michael Nielsen"
            }
          ],
          keyTakeaways: [
            "Neural networks terinspirasi dari struktur otak manusia",
            "Backpropagation adalah algoritma training utama",
            "Deep networks dapat mempelajari representasi yang kompleks"
          ]
        }
      },
      { 
        id: 5, 
        title: 'Deep Learning Basics', 
        duration: '80 min', 
        completed: false, 
        description: 'DL frameworks intro',
        content: {
          introduction: "Deep Learning adalah subset dari machine learning yang menggunakan neural networks dengan banyak layer (deep networks) untuk mempelajari representasi data yang kompleks.",
          concepts: [
            {
              title: "Convolutional Neural Networks (CNN)",
              content: "CNN sangat efektif untuk computer vision tasks. Mereka menggunakan konvolusi untuk mendeteksi features lokal dalam gambar.",
              examples: [
                "Image classification dengan ResNet",
                "Object detection dengan YOLO"
              ]
            }
          ],
          practiceExercises: [
            {
              title: "Image Classification with CNN",
              description: "Build CNN untuk mengklasifikasikan gambar kucing dan anjing",
              difficulty: "Hard"
            }
          ],
          resources: [
            {
              title: "TensorFlow Tutorials",
              type: "documentation",
              url: "#",
              description: "Official TensorFlow learning resources"
            }
          ],
          keyTakeaways: [
            "Deep learning menggunakan neural networks yang dalam",
            "CNN excellent untuk computer vision",
            "Transfer learning dapat mempercepat training"
          ]
        }
      }
    ],
    quiz: { id: 'ml-quiz', title: 'ML Fundamentals Assessment', questions: 10, duration: '20 min' }
  },
  mathematics: {
    title: 'Advanced Mathematics',
    icon: Calculator,
    color: 'from-blue-500 to-cyan-500',
    description: 'Math essentials for STEM & data science',
    level: 'Intermediate',
    rating: 4.7,
    students: 8_932,
    modules: [
      { 
        id: 1, 
        title: 'Calculus Fundamentals', 
        duration: '50 min', 
        completed: false, 
        description: 'Derivatives & integrals',
        content: {
          introduction: "Kalkulus adalah cabang matematika yang mempelajari perubahan dan akumulasi. Ini fundamental untuk memahami banyak konsep dalam sains, engineering, dan data science.",
          concepts: [
            {
              title: "Derivatives",
              content: "Derivative mengukur rate of change dari suatu fungsi. Secara geometris, derivative adalah slope dari tangent line pada suatu titik.",
              examples: [
                "d/dx(x²) = 2x",
                "d/dx(sin x) = cos x",
                "Chain rule: d/dx[f(g(x))] = f'(g(x)) × g'(x)"
              ]
            },
            {
              title: "Integrals",
              content: "Integral adalah kebalikan dari derivative. Definite integral mengukur area under curve, sedangkan indefinite integral adalah antiderivative.",
              examples: [
                "∫ x² dx = x³/3 + C",
                "∫₀¹ x² dx = 1/3",
                "Fundamental Theorem: ∫ₐᵇ f'(x) dx = f(b) - f(a)"
              ]
            }
          ],
          practiceExercises: [
            {
              title: "Derivative Practice",
              description: "Hitung derivative dari berbagai fungsi menggunakan aturan dasar",
              difficulty: "Easy"
            },
            {
              title: "Optimization Problems",
              description: "Gunakan calculus untuk menyelesaikan masalah optimisasi",
              difficulty: "Medium"
            }
          ],
          resources: [
            {
              title: "Khan Academy Calculus",
              type: "video",
              url: "#",
              description: "Comprehensive calculus video series"
            },
            {
              title: "Calculus: Early Transcendentals",
              type: "book",
              url: "#",
              description: "Stewart's classic calculus textbook"
            }
          ],
          keyTakeaways: [
            "Derivatives mengukur rate of change",
            "Integrals mengukur accumulation/area",
            "Calculus fundamental untuk optimization dan modeling"
          ]
        }
      },
      { 
        id: 2, 
        title: 'Linear Algebra', 
        duration: '65 min', 
        completed: false, 
        description: 'Vectors & matrices',
        content: {
          introduction: "Linear Algebra adalah fondasi matematika untuk machine learning, computer graphics, dan banyak aplikasi computational lainnya.",
          concepts: [
            {
              title: "Vectors dan Operations",
              content: "Vector adalah array angka yang merepresentasikan magnitude dan direction. Operations dasar meliputi addition, scalar multiplication, dan dot product.",
              examples: [
                "Vector addition: [1,2] + [3,4] = [4,6]",
                "Dot product: [1,2] • [3,4] = 1×3 + 2×4 = 11"
              ]
            }
          ],
          practiceExercises: [
            {
              title: "Matrix Operations",
              description: "Practice matrix multiplication dan inverse",
              difficulty: "Medium"
            }
          ],
          resources: [
            {
              title: "3Blue1Brown Linear Algebra Series",
              type: "video",
              url: "#",
              description: "Visual introduction to linear algebra"
            }
          ],
          keyTakeaways: [
            "Vectors dan matrices adalah building blocks",
            "Matrix operations fundamental untuk ML",
            "Eigenvalues/eigenvectors penting untuk dimensionality reduction"
          ]
        }
      },
      { 
        id: 3, 
        title: 'Statistics & Probability', 
        duration: '70 min', 
        completed: false, 
        description: 'Statistical analysis',
        content: {
          introduction: "Statistics dan Probability memberikan tools untuk memahami uncertainty dan membuat inferences dari data.",
          concepts: [
            {
              title: "Descriptive Statistics",
              content: "Descriptive statistics merangkum dan mendeskripsikan karakteristik utama dari dataset.",
              examples: [
                "Mean, median, mode untuk central tendency",
                "Standard deviation untuk variability"
              ]
            }
          ],
          practiceExercises: [
            {
              title: "Statistical Analysis",
              description: "Analyze dataset dan compute key statistics",
              difficulty: "Medium"
            }
          ],
          resources: [
            {
              title: "Think Stats",
              type: "book",
              url: "#",
              description: "Probability and statistics for programmers"
            }
          ],
          keyTakeaways: [
            "Statistics membantu understanding data",
            "Probability quantifies uncertainty",
            "Hypothesis testing untuk drawing conclusions"
          ]
        }
      },
      { 
        id: 4, 
        title: 'Differential Equations', 
        duration: '85 min', 
        completed: false, 
        description: 'ODEs & PDEs',
        content: {
          introduction: "Differential Equations mendeskripsikan bagaimana quantities berubah over time dan sangat penting dalam modeling natural phenomena.",
          concepts: [
            {
              title: "Ordinary Differential Equations",
              content: "ODEs melibatkan functions dari satu variable dan derivatives-nya.",
              examples: [
                "dy/dx = y (exponential growth)",
                "d²y/dx² + y = 0 (harmonic oscillator)"
              ]
            }
          ],
          practiceExercises: [
            {
              title: "Population Growth Model",
              description: "Model population growth menggunakan differential equations",
              difficulty: "Hard"
            }
          ],
          resources: [
            {
              title: "Differential Equations Course",
              type: "video",
              url: "#",
              description: "MIT OpenCourseWare differential equations"
            }
          ],
          keyTakeaways: [
            "DEs model how things change",
            "Solutions describe system behavior over time",
            "Applications in physics, biology, economics"
          ]
        }
      },
      { 
        id: 5, 
        title: 'Complex Analysis', 
        duration: '90 min', 
        completed: false, 
        description: 'Complex variables',
        content: {
          introduction: "Complex Analysis extends calculus ke complex numbers dan membuka powerful mathematical tools.",
          concepts: [
            {
              title: "Complex Numbers",
              content: "Complex numbers z = a + bi extend real numbers dan memiliki geometric interpretation di complex plane.",
              examples: [
                "z = 3 + 4i has magnitude |z| = 5",
                "Euler's formula: e^(iθ) = cos(θ) + i×sin(θ)"
              ]
            }
          ],
          practiceExercises: [
            {
              title: "Complex Function Analysis",
              description: "Analyze properties of complex functions",
              difficulty: "Hard"
            }
          ],
          resources: [
            {
              title: "Visual Complex Analysis",
              type: "book",
              url: "#",
              description: "Tristan Needham's visual approach to complex analysis"
            }
          ],
          keyTakeaways: [
            "Complex numbers extend real analysis",
            "Holomorphic functions have remarkable properties",
            "Applications in signal processing dan quantum mechanics"
          ]
        }
      }
    ],
    quiz: { id: 'math-quiz', title: 'Mathematics Mastery Test', questions: 15, duration: '30 min' }
  },
  // Data untuk biology, chemistry, dan programming mengikuti pola yang sama...
  biology: {
    title: 'Modern Biology',
    icon: Leaf,
    color: 'from-green-500 to-emerald-500',
    description: 'Life sciences from molecules to ecosystems',
    level: 'Beginner',
    rating: 4.6,
    students: 15_678,
    modules: [
      { 
        id: 1, 
        title: 'Cell Biology', 
        duration: '40 min', 
        completed: false, 
        description: 'Cell structure & function',
        content: {
          introduction: "Sel adalah unit dasar kehidupan. Memahami struktur dan fungsi sel penting untuk memahami semua aspek biologi.",
          concepts: [
            {
              title: "Prokaryotic vs Eukaryotic Cells",
              content: "Prokaryotic cells tidak memiliki nucleus terdefinisi, sedangkan eukaryotic cells memiliki nucleus dan organelles yang terbungkus membran.",
              examples: [
                "Bakteri adalah prokaryotes",
                "Plant dan animal cells adalah eukaryotes"
              ]
            }
          ],
          practiceExercises: [
            {
              title: "Cell Identification",
              description: "Identifikasi berbagai jenis sel dan organelles",
              difficulty: "Easy"
            }
          ],
          resources: [
            {
              title: "Cell Biology by the Numbers",
              type: "book",
              url: "#",
              description: "Quantitative approach to cell biology"
            }
          ],
          keyTakeaways: [
            "Cells adalah basic units of life",
            "Prokaryotes dan eukaryotes memiliki structure berbeda",
            "Organelles memiliki specialized functions"
          ]
        }
      },
      // ... modules lainnya
      { id: 2, title: 'Genetics & Heredity', duration: '55 min', completed: false, description: 'DNA & inheritance', content: { introduction: "", concepts: [], practiceExercises: [], resources: [], keyTakeaways: [] }},
      { id: 3, title: 'Evolution & Adaptation', duration: '50 min', completed: false, description: 'Natural selection', content: { introduction: "", concepts: [], practiceExercises: [], resources: [], keyTakeaways: [] }},
      { id: 4, title: 'Ecology & Environment', duration: '45 min', completed: false, description: 'Ecosystems', content: { introduction: "", concepts: [], practiceExercises: [], resources: [], keyTakeaways: [] }},
      { id: 5, title: 'Human Physiology', duration: '60 min', completed: false, description: 'Human body systems', content: { introduction: "", concepts: [], practiceExercises: [], resources: [], keyTakeaways: [] }}
    ],
    quiz: { id: 'bio-quiz', title: 'Biology Knowledge Assessment', questions: 12, duration: '25 min' }
  },
  chemistry: {
    title: 'Chemical Sciences',
    icon: Flask,
    color: 'from-red-500 to-orange-500',
    description: 'Chemistry principles & molecular behavior',
    level: 'Intermediate',
    rating: 4.5,
    students: 7_234,
    modules: [
      { id: 1, title: 'Atomic Structure', duration: '45 min', completed: false, description: 'Atoms & periodicity', content: { introduction: "", concepts: [], practiceExercises: [], resources: [], keyTakeaways: [] }},
      { id: 2, title: 'Chemical Bonding', duration: '50 min', completed: false, description: 'Bond types', content: { introduction: "", concepts: [], practiceExercises: [], resources: [], keyTakeaways: [] }},
      { id: 3, title: 'Organic Chemistry', duration: '70 min', completed: false, description: 'Carbon compounds', content: { introduction: "", concepts: [], practiceExercises: [], resources: [], keyTakeaways: [] }},
      { id: 4, title: 'Thermodynamics', duration: '65 min', completed: false, description: 'Energy changes', content: { introduction: "", concepts: [], practiceExercises: [], resources: [], keyTakeaways: [] }},
      { id: 5, title: 'Reaction Kinetics', duration: '55 min', completed: false, description: 'Reaction rates', content: { introduction: "", concepts: [], practiceExercises: [], resources: [], keyTakeaways: [] }}
    ],
    quiz: { id: 'chem-quiz', title: 'Chemistry Proficiency Test', questions: 15, duration: '30 min' }
  },
  programming: {
    title: 'Software Development',
    icon: Code,
    color: 'from-indigo-500 to-purple-500',
    description: 'Programming fundamentals & software engineering',
    level: 'Beginner',
    rating: 4.9,
    students: 23_456,
    modules: [
      { id: 1, title: 'Programming Fundamentals', duration: '40 min', completed: false, description: 'Variables & control structures', content: { introduction: "", concepts: [], practiceExercises: [], resources: [], keyTakeaways: [] }},
      { id: 2, title: 'Data Structures', duration: '60 min', completed: false, description: 'Arrays, lists, etc.', content: { introduction: "", concepts: [], practiceExercises: [], resources: [], keyTakeaways: [] }},
      { id: 3, title: 'Algorithms', duration: '75 min', completed: false, description: 'Sorting & searching', content: { introduction: "", concepts: [], practiceExercises: [], resources: [], keyTakeaways: [] }},
      { id: 4, title: 'Object-Oriented Programming', duration: '65 min', completed: false, description: 'Classes & inheritance', content: { introduction: "", concepts: [], practiceExercises: [], resources: [], keyTakeaways: [] }},
      { id: 5, title: 'Software Design Patterns', duration: '80 min', completed: false, description: 'Scalable patterns', content: { introduction: "", concepts: [], practiceExercises: [], resources: [], keyTakeaways: [] }}
    ],
    quiz: { id: 'prog-quiz', title: 'Programming Skills Evaluation', questions: 20, duration: '40 min' }
  }
}

const quizQuestions: Record<string, QuizQuestion[]> = {
  'ml-quiz': [
    {
      question: 'Main difference between supervised and unsupervised learning?',
      options: ['Data size', 'Algorithm complexity', 'Presence of labeled data', 'Processing speed'],
      correct: 2,
      explanation: 'Supervised learning uses labeled data; unsupervised does not.'
    },
    {
      question: 'Which algorithm is commonly used for classification?',
      options: ['K-means', 'Decision Tree', 'PCA', 'DBSCAN'],
      correct: 1,
      explanation: 'Decision Trees are widely used for classification.'
    }
  ],
  'math-quiz': [
    {
      question: 'Derivative of x²?',
      options: ['x', '2x', 'x²', '2x²'],
      correct: 1,
      explanation: 'By power rule: d/dx(x^n)=nx^(n-1) ⇒ 2x.'
    }
  ],
  'bio-quiz': [
    {
      question: 'Powerhouse of the cell?',
      options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Endoplasmic reticulum'],
      correct: 2,
      explanation: 'Mitochondria produce ATP via cellular respiration.'
    }
  ],
  'chem-quiz': [
    {
      question: 'Atomic number of Carbon?',
      options: ['4', '6', '8', '12'],
      correct: 1,
      explanation: 'Carbon has 6 protons ⇒ atomic number 6.'
    }
  ],
  'prog-quiz': [
    {
      question: 'Big O notation used for?',
      options: ['Memory usage', 'Algorithm complexity', 'Code readability', 'Debugging'],
      correct: 1,
      explanation: 'Big O describes time/space complexity.'
    }
  ]
}



/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                    */
/* ------------------------------------------------------------------ */
export default function ELearningPlatform() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'course' | 'module' | 'quiz'>('dashboard')
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [currentModule, setCurrentModule] = useState<(Module & { courseId: string }) | null>(null)
  const [currentQuiz, setCurrentQuiz] = useState<(Quiz & { courseId: string; questions: QuizQuestion[] }) | null>(null)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})
  const [quizScore, setQuizScore] = useState<number | null>(null)
  const [courses, setCourses] = useState(courseData)

  

  const handleModuleComplete = (courseId: string, moduleId: number) => {
    setCourses(prev => ({
      ...prev,
      [courseId]: {
        ...prev[courseId],
        modules: prev[courseId].modules.map(m =>
          m.id === moduleId ? { ...m, completed: true } : m
        )
      }
    }))
  }

  const calculateProgress = (course: Course) =>
    (course.modules.filter(m => m.completed).length / course.modules.length) * 100

  const startQuiz = (courseId: string) => {
    const quiz = courses[courseId].quiz
    setCurrentQuiz({
      ...quiz,
      courseId,
      questions: Array.isArray(quizQuestions[quiz.id]) ? quizQuestions[quiz.id] : []
    })
    setQuizAnswers({})
    setQuizScore(null)
    setCurrentView('quiz')
  }

  const submitQuiz = () => {
    if (!currentQuiz) return
    const correct = currentQuiz.questions.reduce(
      (acc, q, idx) => acc + (quizAnswers[idx] === q.correct ? 1 : 0),
      0
    )
    setQuizScore(Math.round((correct / currentQuiz.questions.length) * 100))
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    }
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video': return Video
      case 'article': return FileText
      case 'book': return BookOpen
      case 'tool': return Code2
      case 'documentation': return FileText
      default: return FileText
    }
  }

   const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'Hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    }
  }

  /* ------------------------------------------------------------------ */
  /*  VIEWS                                                             */
  /* ------------------------------------------------------------------ */
  /* ---------- DASHBOARD ---------- */
 if (currentView === 'dashboard') {
    return (
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-16 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl mb-12">
          <h1 className="text-5xl font-bold mb-6 dark:text-white">Master Tomorrow's Skills Today</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto dark:text-gray-300">
            Join thousands advancing their careers with AI, Math, Science & Programming.
          </p>
          <div className="flex justify-center gap-8 text-sm dark:text-gray-300">
            <div><span className="text-3xl font-bold dark:text-white">5</span><div>Expert Courses</div></div>
            <div><span className="text-3xl font-bold dark:text-white">25</span><div>Learning Modules</div></div>
            <div><span className="text-3xl font-bold dark:text-white">5</span><div>Certification Quizzes</div></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(courses).map(([courseId, course]) => {
            const Icon = course.icon
            const progress = calculateProgress(course)

            return (
              <Card key={courseId} className="group dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <div className={`h-32 bg-gradient-to-r ${course.color} rounded-md flex items-center justify-center mb-4`}>
                    <Icon size={48} className="text-white" />
                  </div>
                  <CardTitle className="text-xl dark:text-white">{course.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                    <div className="flex items-center gap-1 text-sm dark:text-gray-300">
                      <Star size={12} className="fill-yellow-400 text-yellow-400" /> {course.rating}
                    </div>
                  </div>
                  <CardDescription className="dark:text-gray-400">{course.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm dark:text-gray-300">
                    <span className="flex items-center gap-1"><Users size={12} /> {course.students.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {course.modules.length} modules</span>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1 dark:text-gray-300">
                      <span>Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2 dark:bg-gray-700" />
                  </div>
                  <Separator className="dark:bg-gray-700" />
                  <Button onClick={() => { setSelectedCourse(courseId); setCurrentView('course') }} className="w-full">
                    <Play size={16} className="mr-2" /> Start Learning
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center p-6 dark:bg-gray-800 dark:border-gray-700">
            <Target size={32} className="mx-auto mb-3 text-muted-foreground dark:text-gray-400" />
            <h3 className="font-semibold mb-1 dark:text-white">Hands-on Learning</h3>
            <p className="text-sm text-muted-foreground dark:text-gray-400">Interactive projects & exercises</p>
          </Card>
          <Card className="text-center p-6 dark:bg-gray-800 dark:border-gray-700">
            <Award size={32} className="mx-auto mb-3 text-muted-foreground dark:text-gray-400" />
            <h3 className="font-semibold mb-1 dark:text-white">Certification Ready</h3>
            <p className="text-sm text-muted-foreground dark:text-gray-400">Earn certificates on completion</p>
          </Card>
          <Card className="text-center p-6 dark:bg-gray-800 dark:border-gray-700">
            <Users size={32} className="mx-auto mb-3 text-muted-foreground dark:text-gray-400" />
            <h3 className="font-semibold mb-1 dark:text-white">Expert Instructors</h3>
            <p className="text-sm text-muted-foreground dark:text-gray-400">Industry professionals & academics</p>
          </Card>
        </div>
       
      </main>
    )
  }

  /* ---------- COURSE DETAIL ---------- */
  if (currentView === 'course' && selectedCourse) {
    const course = courses[selectedCourse]
    const Icon = course.icon
    const progress = calculateProgress(course)

    return (
      <div className="dark:bg-gray-900 min-h-screen">
        <header className="border-b dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setCurrentView('dashboard')}>
              <ArrowLeft size={16} className="mr-2" /> Dashboard
            </Button>
            <div className={`p-2 bg-gradient-to-r ${course.color} rounded-md`}><Icon size={20} className="text-white" /></div>
            <div>
              <h1 className="text-xl font-bold dark:text-white">{course.title}</h1>
              <p className="text-sm text-muted-foreground dark:text-gray-400">{course.description}</p>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="dark:text-white">Course Progress</CardTitle>
                  <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm mb-1 dark:text-gray-300">
                  <span>Overall Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2 dark:bg-gray-700" />
                <div className="flex justify-between text-sm text-muted-foreground mt-2 dark:text-gray-400">
                  <span>{course.modules.filter(m => m.completed).length} / {course.modules.length} modules</span>
                  <span className="flex items-center gap-1"><Star size={12} className="fill-yellow-400 text-yellow-400" /> {course.rating}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Learning Modules</CardTitle>
                <CardDescription className="dark:text-gray-400">Complete all modules to unlock the final assessment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {course.modules.map((m, idx) => (
                  <div key={m.id} className={`p-4 border rounded-lg dark:border-gray-700 ${
                    m.completed 
                      ? 'border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-900/20' 
                      : 'dark:bg-gray-700'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                          m.completed 
                            ? 'bg-green-500 text-white' 
                            : 'bg-muted dark:bg-gray-600 dark:text-white'
                        }`}>
                          {m.completed ? <CheckCircle size={16} /> : idx + 1}
                        </div>
                        <div>
                          <h3 className="font-medium dark:text-white">{m.title}</h3>
                          <p className="text-sm text-muted-foreground dark:text-gray-400">{m.description}</p>
                          <Badge variant="outline" className="text-xs mt-1 dark:border-gray-600 dark:text-gray-300">
                            <Clock size={10} className="mr-1" />{m.duration}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        onClick={() => { setCurrentModule({ ...m, courseId: selectedCourse }); setCurrentView('module') }}
                        variant={m.completed ? 'outline' : 'default'}
                        size="sm"
                      >
                        {m.completed ? 'Review' : 'Start'}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <Trophy size={16} /> Course Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between dark:text-gray-300">
                  <span className="text-muted-foreground dark:text-gray-400">Students</span>
                  <span>{course.students.toLocaleString()}</span>
                </div>
                <div className="flex justify-between dark:text-gray-300">
                  <span className="text-muted-foreground dark:text-gray-400">Rating</span>
                  <span className="flex items-center gap-1">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                    {course.rating}
                  </span>
                </div>
                <div className="flex justify-between dark:text-gray-300">
                  <span className="text-muted-foreground dark:text-gray-400">Modules</span>
                  <span>{course.modules.length}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <Award size={16} /> Final Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between dark:text-gray-300">
                  <span>Questions</span>
                  <span>{course.quiz.questions}</span>
                </div>
                <div className="flex justify-between dark:text-gray-300">
                  <span>Duration</span>
                  <span>{course.quiz.duration}</span>
                </div>
                <div className="flex justify-between dark:text-gray-300">
                  <span>Pass Score</span>
                  <span>70%</span>
                </div>
                <Button onClick={() => startQuiz(selectedCourse)} className="w-full mt-4">
                  <Trophy size={16} className="mr-2" /> Take Assessment
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  /* ---------- MODULE ---------- */
  if (currentView === 'module' && currentModule) {
    const content = currentModule.content

    return (
      <div className="dark:bg-gray-900 min-h-screen">
        <header className="border-b dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setCurrentView('course')}>
              <ArrowLeft size={16} className="mr-2" /> Back to Course
            </Button>
            <div>
              <h1 className="text-xl font-bold dark:text-white">{currentModule.title}</h1>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                {courses[currentModule.courseId].title} • {currentModule.duration}
              </p>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white">Module Content</CardTitle>
              <CardDescription className="dark:text-gray-400">{currentModule.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="content">
                <TabsList className="w-full dark:bg-gray-700">
                  <TabsTrigger value="content" className="flex-1 dark:data-[state=active]:bg-gray-600">
                    Learning Content
                  </TabsTrigger>
                  <TabsTrigger value="exercises" className="flex-1 dark:data-[state=active]:bg-gray-600">
                    Practice
                  </TabsTrigger>
                  <TabsTrigger value="resources" className="flex-1 dark:data-[state=active]:bg-gray-600">
                    Resources
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="content" className="space-y-6 mt-6">
                  <Alert className="dark:bg-gray-700 dark:border-gray-600">
                    <BookOpen size={16} className="dark:text-gray-300" />
                    <AlertDescription className="dark:text-gray-300">
                      Interactive examples & real-world applications.
                    </AlertDescription>
                  </Alert>
                  
                  <div>
                    <h2 className="text-2xl font-bold mb-4 dark:text-white">Introduction</h2>
                    <p className="text-muted-foreground leading-relaxed dark:text-gray-400">{content.introduction}</p>
                  </div>

                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold dark:text-white">Key Concepts</h2>
                    {content.concepts.map((concept, idx) => (
                      <Card key={idx} className="dark:bg-gray-700 dark:border-gray-600">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2 dark:text-white">
                            <Lightbulb size={20} className="text-yellow-500" />
                            {concept.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="leading-relaxed dark:text-gray-300">{concept.content}</p>
                          {concept.examples && concept.examples.length > 0 && (
                            <div>
                              <h4 className="font-semibold mb-2 dark:text-white">Examples:</h4>
                              <ul className="list-disc list-inside space-y-1 text-sm dark:text-gray-300">
                                {concept.examples.map((example, exIdx) => (
                                  <li key={exIdx} className="text-muted-foreground dark:text-gray-400">{example}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {content.keyTakeaways.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold mb-4 dark:text-white">Key Takeaways</h2>
                      <Card className="dark:bg-gray-700 dark:border-gray-600">
                        <CardContent className="pt-6">
                          <ul className="space-y-2">
                            {content.keyTakeaways.map((takeaway, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm dark:text-gray-300">{takeaway}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="exercises" className="mt-6 space-y-4">
                  <h2 className="text-2xl font-bold mb-4 dark:text-white">Practice Exercises</h2>
                  {content.practiceExercises.length > 0 ? (
                    <div className="space-y-4">
                      {content.practiceExercises.map((exercise, idx) => (
                        <Card key={idx} className="dark:bg-gray-700 dark:border-gray-600">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg dark:text-white">{exercise.title}</CardTitle>
                              <Badge className={getDifficultyColor(exercise.difficulty)}>{exercise.difficulty}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <p className="text-muted-foreground dark:text-gray-400">{exercise.description}</p>
                            {exercise.solution && (
                              <details className="mt-3">
                                <summary className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                  View Solution Hint
                                </summary>
                                <div className="mt-2 p-3 bg-blue-50 rounded-md dark:bg-blue-900/30">
                                  <p className="text-sm text-blue-800 dark:text-blue-200">{exercise.solution}</p>
                                </div>
                              </details>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card className="dark:bg-gray-700 dark:border-gray-600">
                      <CardContent className="pt-6 text-center text-muted-foreground dark:text-gray-400">
                        <Code2 size={48} className="mx-auto mb-4 opacity-50" />
                        <p>Practice exercises will be available soon.</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="resources" className="mt-6 space-y-4">
                  <h2 className="text-2xl font-bold mb-4 dark:text-white">Additional Resources</h2>
                  {content.resources.length > 0 ? (
                    <div className="grid gap-4">
                      {content.resources.map((resource, idx) => {
                        const ResourceIcon = getResourceIcon(resource.type)
                        return (
                          <Card key={idx} className="hover:shadow-md transition-shadow dark:bg-gray-700 dark:border-gray-600 dark:hover:shadow-gray-600/30">
                            <CardContent className="pt-4">
                              <div className="flex items-start gap-3">
                                <div className="p-2 bg-muted rounded-md dark:bg-gray-600">
                                  <ResourceIcon size={20} className="dark:text-gray-300" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-semibold dark:text-white">{resource.title}</h3>
                                    <Badge variant="outline" className="text-xs capitalize dark:border-gray-600 dark:text-gray-300">
                                      {resource.type}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-2 dark:text-gray-400">{resource.description}</p>
                                  <Button size="sm" variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">
                                    <ExternalLink size={12} className="mr-1" />
                                    Access Resource
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  ) : (
                    <Card className="dark:bg-gray-700 dark:border-gray-600">
                      <CardContent className="pt-6 text-center text-muted-foreground dark:text-gray-400">
                        <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
                        <p>Additional resources will be added soon.</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => setCurrentView('course')}>Back to Course</Button>
            {!currentModule.completed && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Complete Module</Button>
                </DialogTrigger>
                <DialogContent className="dark:bg-gray-800 dark:border-gray-700">
                  <DialogHeader>
                    <DialogTitle className="dark:text-white">Complete Module?</DialogTitle>
                    <DialogDescription className="dark:text-gray-400">
                      Mark this module as completed. You can still review it later.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" className="dark:border-gray-600 dark:text-white">
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        handleModuleComplete(currentModule.courseId, currentModule.id)
                        setCurrentView('course')
                      }}
                    >
                      <CheckCircle size={16} className="mr-2" />
                      Mark Complete
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </main>
      </div>
    )
  }

  if (currentView === 'quiz' && currentQuiz) {
    return (
      <div className="dark:bg-gray-900 min-h-screen">
        <header className="border-b dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setCurrentView('course')}>
              <ArrowLeft size={16} className="mr-2" /> Back to Course
            </Button>
            <div>
              <h1 className="text-xl font-bold dark:text-white">{currentQuiz.title}</h1>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                {courses[currentQuiz.courseId].title} • {currentQuiz.duration}
              </p>
            </div>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 py-8">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white">Assessment</CardTitle>
              <CardDescription className="dark:text-gray-400">
                {quizScore === null
                  ? `Complete all ${currentQuiz.questions.length} questions`
                  : <span className={quizScore >= 70 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                      Your score: {quizScore}%
                    </span>}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {quizScore === null ? (
                <div className="space-y-6">
                  {currentQuiz.questions.map((q, idx) => (
                    <div key={idx} className="space-y-2">
                      <h3 className="font-medium dark:text-white">Q{idx + 1}: {q.question}</h3>
                      <RadioGroup
                        value={quizAnswers[idx]?.toString() || ''}
                        onValueChange={v => setQuizAnswers(prev => ({ ...prev, [idx]: parseInt(v) }))}
                      >
                        {q.options.map((opt, optIdx) => (
                          <div key={optIdx} className="flex items-center gap-2">
                            <RadioGroupItem value={optIdx.toString()} id={`q${idx}-o${optIdx}`} />
                            <Label htmlFor={`q${idx}-o${optIdx}`} className="dark:text-gray-300">{opt}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  ))}
                  <div className="flex justify-end"><Button onClick={submitQuiz}>Submit</Button></div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className={`p-4 rounded-md border ${
                    quizScore >= 70 
                      ? 'border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20' 
                      : 'border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-900/20'
                  }`}>
                    <h3 className="text-lg font-bold dark:text-white">{quizScore >= 70 ? 'Passed!' : 'Try Again'}</h3>
                    <p className="dark:text-gray-300">{quizScore >= 70 ? 'Great job!' : 'Review the material & retake.'}</p>
                  </div>
                  {currentQuiz.questions.map((q, idx) => (
                    <div key={idx} className="border-b pb-4 dark:border-gray-700">
                      <div className="flex items-start gap-2">
                        {quizAnswers[idx] === q.correct ? (
                          <CheckCircle size={16} className="text-green-500 mt-1" />
                        ) : (
                          <span className="font-bold text-red-500 dark:text-red-400">X</span>
                        )}
                        <div>
                          <p className="font-medium dark:text-white">{q.question}</p>
                          <p className="text-sm dark:text-gray-300">Your: {q.options[quizAnswers[idx]]}</p>
                          {quizAnswers[idx] !== q.correct && (
                            <p className="text-sm dark:text-gray-300">Correct: {q.options[q.correct]}</p>
                          )}
                          <p className="text-sm text-muted-foreground dark:text-gray-400">{q.explanation}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setCurrentView('course')} className="dark:border-gray-600 dark:text-white">
                      Back
                    </Button>
                    <Button onClick={() => { setQuizAnswers({}); setQuizScore(null) }}>
                      Try Again
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }
  

  return null
}