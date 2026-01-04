
import React, { useState, useMemo } from 'react';
import { QUESTIONS, ANIMAL_INFO } from './constants';
import { AnimalType, ScoreProfile, TestResult } from './types';
import { getDeepAnalysis } from './geminiService';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell
} from 'recharts';

// --- Components ---

const ProgressBar: React.FC<{ current: number; total: number }> = ({ current, total }) => {
  const percentage = Math.round((current / total) * 100);
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
      <div 
        className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

const QuestionCard: React.FC<{
  question: typeof QUESTIONS[0];
  onAnswer: (score: number) => void;
}> = ({ question, onAnswer }) => {
  const options = [
    { label: "非常不同意", value: 1 },
    { label: "不同意", value: 2 },
    { label: "一般", value: 3 },
    { label: "同意", value: 4 },
    { label: "非常同意", value: 5 },
  ];

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 animate-fadeIn">
      <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center leading-relaxed">
        {question.text}
      </h3>
      <div className="flex flex-col gap-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onAnswer(opt.value)}
            className="w-full py-4 px-6 text-left rounded-xl border-2 border-gray-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 group flex justify-between items-center"
          >
            <span className="text-gray-700 font-medium group-hover:text-indigo-700">{opt.label}</span>
            <div className="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-indigo-500 flex items-center justify-center">
               <div className="w-3 h-3 rounded-full bg-indigo-500 opacity-0 group-focus:opacity-100"></div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const ResultView: React.FC<{ result: TestResult }> = ({ result }) => {
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);

  const chartData = useMemo(() => [
    { name: '老虎', score: result.scores[AnimalType.TIGER], full: 5 },
    { name: '孔雀', score: result.scores[AnimalType.PEACOCK], full: 5 },
    { name: '考拉', score: result.scores[AnimalType.KOALA], full: 5 },
    { name: '猫头鹰', score: result.scores[AnimalType.OWL], full: 5 },
    { name: '变色龙', score: result.scores[AnimalType.CHAMELEON], full: 5 },
  ], [result.scores]);

  const handleFetchAiAnalysis = async () => {
    setLoadingAnalysis(true);
    const analysis = await getDeepAnalysis(result.primaryType, result.scores);
    setAiAnalysis(analysis);
    setLoadingAnalysis(false);
  };

  const primaryInfo = ANIMAL_INFO[result.primaryType];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-12">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8 text-center text-white relative overflow-hidden" style={{ backgroundColor: primaryInfo.color }}>
          <div className="absolute -right-10 -bottom-10 text-9xl opacity-20 transform rotate-12">
             {primaryInfo.icon}
          </div>
          <p className="text-lg font-medium opacity-90 mb-2">测试结果揭晓</p>
          <h2 className="text-5xl font-bold mb-4">你是「{primaryInfo.name}」</h2>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {primaryInfo.traits.map((trait, i) => (
              <span key={i} className="px-4 py-1 bg-white bg-opacity-20 rounded-full text-sm font-semibold">
                #{trait}
              </span>
            ))}
          </div>
        </div>

        <div className="p-8 grid md:grid-cols-2 gap-8 items-center">
          <div>
             <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
               <i className="fas fa-chart-pie text-indigo-500"></i>
               性格维度图
             </h4>
             <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="name" tick={{ fill: '#4b5563', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 5]} hide />
                    <Radar
                      name="得分"
                      dataKey="score"
                      stroke={primaryInfo.color}
                      fill={primaryInfo.color}
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
             </div>
          </div>
          <div className="space-y-6">
            <section>
              <h4 className="text-lg font-bold text-gray-800 mb-2">性格解析</h4>
              <p className="text-gray-600 leading-relaxed">{primaryInfo.description}</p>
            </section>
            <section>
              <h4 className="text-lg font-bold text-gray-800 mb-2">成长建议</h4>
              <p className="text-gray-600 leading-relaxed italic border-l-4 border-indigo-200 pl-4">
                "{primaryInfo.advice}"
              </p>
            </section>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <div className="flex justify-between items-center mb-6">
           <h4 className="text-2xl font-bold text-gray-800">Gemini AI 深度分析</h4>
           {!aiAnalysis && !loadingAnalysis && (
             <button 
                onClick={handleFetchAiAnalysis}
                className="bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex items-center gap-2"
             >
                <i className="fas fa-magic"></i> 获取专业建议
             </button>
           )}
        </div>
        
        {loadingAnalysis && (
          <div className="py-12 flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="text-gray-500 font-medium animate-pulse">AI 正在根据您的性格进行深度建模...</p>
          </div>
        )}

        {aiAnalysis && (
          <div className="prose prose-indigo max-w-none text-gray-700 whitespace-pre-wrap leading-loose bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
             {aiAnalysis}
          </div>
        )}
      </div>

      <div className="text-center">
        <button 
          onClick={() => window.location.reload()}
          className="text-indigo-600 font-semibold hover:underline"
        >
          重新测试
        </button>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [step, setStep] = useState<'landing' | 'quiz' | 'result'>('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<TestResult | null>(null);

  const startTest = () => {
    setStep('quiz');
  };

  const handleAnswer = (score: number) => {
    const newAnswers = { ...answers, [QUESTIONS[currentQuestionIndex].id]: score };
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<number, number>) => {
    const scores: ScoreProfile = {
      [AnimalType.TIGER]: 0,
      [AnimalType.PEACOCK]: 0,
      [AnimalType.KOALA]: 0,
      [AnimalType.OWL]: 0,
      [AnimalType.CHAMELEON]: 0,
    };

    const counts: Record<AnimalType, number> = {
      [AnimalType.TIGER]: 0,
      [AnimalType.PEACOCK]: 0,
      [AnimalType.KOALA]: 0,
      [AnimalType.OWL]: 0,
      [AnimalType.CHAMELEON]: 0,
    };

    QUESTIONS.forEach(q => {
      scores[q.category] += finalAnswers[q.id];
      counts[q.category] += 1;
    });

    // Calculate Averages
    Object.keys(scores).forEach(key => {
      const k = key as AnimalType;
      scores[k] = parseFloat((scores[k] / counts[k]).toFixed(2));
    });

    // Determine primary type
    let primaryType = AnimalType.TIGER;
    let maxScore = -1;
    
    // Check if it's a chameleon (balanced scores)
    const values = Object.values(scores);
    const stdDev = Math.sqrt(values.reduce((s, v) => s + (v - 3)**2, 0) / values.length);
    
    // Simple logic: if variation is small, it's a chameleon
    if (stdDev < 0.5) {
       primaryType = AnimalType.CHAMELEON;
    } else {
       Object.entries(scores).forEach(([type, score]) => {
         if (score > maxScore) {
           maxScore = score;
           primaryType = type as AnimalType;
         }
       });
    }

    setResult({
      primaryType,
      scores,
      analysis: "" // Will be fetched via Gemini
    });
    setStep('result');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-4 md:p-8">
      <header className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-indigo-900 tracking-tight mb-2">
          PDP 动物性格测试
        </h1>
        <p className="text-slate-500 font-medium">发现你的原生职场竞争力，探索未知的自己</p>
      </header>

      <main className="max-w-2xl mx-auto">
        {step === 'landing' && (
          <div className="bg-white rounded-3xl shadow-2xl p-10 border border-indigo-50 animate-fadeIn">
            <div className="flex justify-center mb-8 gap-4">
               {Object.values(ANIMAL_INFO).map(animal => (
                 <span key={animal.name} className="text-4xl" title={animal.name}>{animal.icon}</span>
               ))}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">你是哪种职业性格？</h2>
            <p className="text-gray-600 mb-8 leading-relaxed text-center">
              PDP (Professional DynaMetric Programs) 是一项世界领先的性格评估工具。
              通过 30 道精选题目，我们将为你分析你的优势、沟通风格以及职业建议。
              请在测试时，根据你的<b>真实本能</b>而非你“想成为”的样子进行选择。
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-xl">
                 <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">1</div>
                 <p className="text-indigo-900 font-medium text-sm">30 道行为偏好测试题</p>
              </div>
              <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl">
                 <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">2</div>
                 <p className="text-purple-900 font-medium text-sm">多维度性格雷达图谱</p>
              </div>
              <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl">
                 <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">3</div>
                 <p className="text-emerald-900 font-medium text-sm">Gemini AI 提供深度职业规划建议</p>
              </div>
            </div>
            <button 
              onClick={startTest}
              className="w-full mt-10 bg-indigo-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-[0.98]"
            >
              开启自我发现之旅
            </button>
            <p className="mt-6 text-center text-gray-400 text-xs italic">
               *本测试仅供职业参考，不构成专业诊断
            </p>
          </div>
        )}

        {step === 'quiz' && (
          <div>
            <div className="flex justify-between items-center mb-4 px-2">
               <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">题目 {currentQuestionIndex + 1} / {QUESTIONS.length}</span>
               <span className="text-sm font-medium text-gray-400">预计剩余 2 分钟</span>
            </div>
            <ProgressBar current={currentQuestionIndex + 1} total={QUESTIONS.length} />
            <QuestionCard 
              question={QUESTIONS[currentQuestionIndex]} 
              onAnswer={handleAnswer} 
            />
            {currentQuestionIndex > 0 && (
              <button 
                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                className="mt-6 text-gray-400 hover:text-gray-600 text-sm font-medium flex items-center gap-1"
              >
                <i className="fas fa-arrow-left"></i> 上一题
              </button>
            )}
          </div>
        )}

        {step === 'result' && result && <ResultView result={result} />}
      </main>

      <footer className="mt-16 text-center text-gray-400 text-sm border-t border-gray-100 pt-8 pb-4">
        <p>&copy; 2024 PDP Personality Lab. Powered by Gemini AI.</p>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
