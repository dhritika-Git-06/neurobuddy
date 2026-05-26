import { useState, useEffect, useRef, useCallback } from 'react';
import Layout from '../components/Layout';

// ─── 1. BREATHING EXERCISE ───────────────────────────────────────────────────
function BreathingGame() {
  const [phase, setPhase] = useState('idle'); // idle | inhale | hold | exhale | rest
  const [count, setCount] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  const PHASES = [
    { name: 'inhale', label: 'Breathe In', duration: 4, color: '#6366f1' },
    { name: 'hold',   label: 'Hold',       duration: 4, color: '#f59e0b' },
    { name: 'exhale', label: 'Breathe Out',duration: 6, color: '#10b981' },
    { name: 'rest',   label: 'Rest',       duration: 2, color: '#94a3b8' },
  ];

  const phaseIdx = useRef(0);
  const tick = useRef(0);

  const stop = useCallback(() => {
    clearInterval(timerRef.current);
    setRunning(false);
    setPhase('idle');
    setCount(0);
    phaseIdx.current = 0;
    tick.current = 0;
  }, []);

  const start = useCallback(() => {
    phaseIdx.current = 0;
    tick.current = 0;
    setCycles(0);
    setRunning(true);
    setPhase(PHASES[0].name);
    setCount(PHASES[0].duration);

    timerRef.current = setInterval(() => {
      tick.current += 1;
      const cur = PHASES[phaseIdx.current];
      const remaining = cur.duration - tick.current;
      if (remaining > 0) {
        setCount(remaining);
      } else {
        tick.current = 0;
        const next = (phaseIdx.current + 1) % PHASES.length;
        phaseIdx.current = next;
        if (next === 0) setCycles(c => c + 1);
        setPhase(PHASES[next].name);
        setCount(PHASES[next].duration);
      }
    }, 1000);
  }, []);

  useEffect(() => () => clearInterval(timerRef.current), []);

  const cur = PHASES.find(p => p.name === phase) || PHASES[0];
  const progress = running ? ((cur.duration - count) / cur.duration) * 100 : 0;
  const scale = phase === 'inhale' ? 1.35 : phase === 'exhale' || phase === 'rest' ? 0.85 : 1.2;

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <p className="text-gray-400 text-sm text-center max-w-sm">
        Box breathing (4-4-6-2) activates your parasympathetic nervous system, reducing cortisol and calming anxiety within minutes.
      </p>
      <div className="relative flex items-center justify-center" style={{width:200,height:200}}>
        <div className="absolute inset-0 rounded-full opacity-20" style={{background: cur.color, transform:`scale(${scale + 0.15})`, transition:'transform 1s ease-in-out'}}/>
        <div className="rounded-full flex flex-col items-center justify-center shadow-lg"
          style={{width:160,height:160,background:cur.color,transform:`scale(${scale})`,transition:'transform 1s ease-in-out'}}>
          <span className="text-white text-3xl font-bold">{running ? count : '4'}</span>
          <span className="text-white text-sm font-medium mt-1">{running ? cur.label : 'Ready'}</span>
        </div>
      </div>
      {running && <p className="text-gray-400 text-sm">Cycles completed: <span className="text-white font-bold">{cycles}</span></p>}
      <div className="flex gap-3">
        {!running
          ? <button onClick={start} className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition">Start Breathing</button>
          : <button onClick={stop}  className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-semibold transition">Stop</button>
        }
      </div>
    </div>
  );
}

// ─── 2. BUBBLE POP ────────────────────────────────────────────────────────────
function BubblePopGame() {
  const [bubbles, setBubbles] = useState([]);
  const [score, setScore] = useState(0);
  const [active, setActive] = useState(false);
  const intervalRef = useRef(null);
  const idRef = useRef(0);

  const COLORS = ['#6366f1','#10b981','#f59e0b','#ec4899','#06b6d4','#8b5cf6'];

  const spawnBubble = useCallback(() => {
    const id = idRef.current++;
    const size = 40 + Math.random() * 50;
    setBubbles(b => [...b, {
      id, size,
      x: 5 + Math.random() * 85,
      y: 5 + Math.random() * 85,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      born: Date.now(),
    }]);
    // auto-remove after 3s
    setTimeout(() => setBubbles(b => b.filter(x => x.id !== id)), 3000);
  }, []);

  const start = () => {
    setScore(0);
    setActive(true);
    setBubbles([]);
    intervalRef.current = setInterval(spawnBubble, 700);
    setTimeout(() => {
      clearInterval(intervalRef.current);
      setActive(false);
    }, 30000);
  };

  const pop = (id) => {
    setBubbles(b => b.filter(x => x.id !== id));
    setScore(s => s + 1);
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-gray-400 text-sm text-center max-w-sm">
        Popping bubbles gives a satisfying dopamine hit. Focus on each bubble — it pulls your mind away from stressors.
      </p>
      <div className="flex items-center gap-6">
        <span className="text-white font-bold text-lg">Score: <span className="text-indigo-400">{score}</span></span>
        {!active
          ? <button onClick={start} className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition">Play (30s)</button>
          : <span className="text-green-400 text-sm font-medium animate-pulse">Pop them!</span>
        }
      </div>
      <div className="relative bg-gray-900 rounded-xl border border-gray-700 overflow-hidden" style={{width:'100%',maxWidth:500,height:280}}>
        {!active && score === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-sm">Press Play to start</div>
        )}
        {!active && score > 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <span className="text-white text-2xl font-bold">Popped {score} bubbles!</span>
            <button onClick={start} className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition mt-2">Play Again</button>
          </div>
        )}
        {bubbles.map(b => (
          <button key={b.id} onClick={() => pop(b.id)}
            className="absolute rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-transform hover:scale-110 active:scale-75"
            style={{
              width: b.size, height: b.size,
              left: `${b.x}%`, top: `${b.y}%`,
              background: b.color,
              transform: 'translate(-50%,-50%)',
              fontSize: b.size * 0.3,
              animation: 'popIn 0.2s ease-out',
            }}>
            O
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── 3. MEMORY MATCH ──────────────────────────────────────────────────────────
const EMOJIS = ['🌸','🌊','🌿','🦋','🌙','⭐','🌈','🍃'];

function MemoryGame() {
  const makeCards = () =>
    [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((e, i) => ({ id: i, emoji: e, flipped: false, matched: false }));

  const [cards, setCards] = useState(makeCards);
  const [selected, setSelected] = useState([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [locked, setLocked] = useState(false);

  const flip = (id) => {
    if (locked) return;
    const card = cards.find(c => c.id === id);
    if (!card || card.flipped || card.matched) return;
    if (selected.length === 1 && selected[0].id === id) return;

    const newCards = cards.map(c => c.id === id ? { ...c, flipped: true } : c);
    setCards(newCards);
    const newSel = [...selected, { id, emoji: card.emoji }];
    setSelected(newSel);

    if (newSel.length === 2) {
      setMoves(m => m + 1);
      setLocked(true);
      if (newSel[0].emoji === newSel[1].emoji) {
        setTimeout(() => {
          setCards(c => c.map(x => newSel.find(s => s.id === x.id) ? { ...x, matched: true } : x));
          setSelected([]);
          setLocked(false);
          setWon(newCards.filter(c => !c.matched).length === 2);
        }, 500);
      } else {
        setTimeout(() => {
          setCards(c => c.map(x => newSel.find(s => s.id === x.id) ? { ...x, flipped: false } : x));
          setSelected([]);
          setLocked(false);
        }, 900);
      }
    }
  };

  const reset = () => { setCards(makeCards()); setSelected([]); setMoves(0); setWon(false); setLocked(false); };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-gray-400 text-sm text-center max-w-sm">
        Memory games shift focus to gentle concentration, quieting the stress response while giving a sense of accomplishment.
      </p>
      <div className="flex items-center gap-6">
        <span className="text-gray-400 text-sm">Moves: <span className="text-white font-bold">{moves}</span></span>
        <button onClick={reset} className="px-4 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-semibold transition">Reset</button>
      </div>
      {won && <p className="text-green-400 font-bold text-lg">You matched them all in {moves} moves!</p>}
      <div className="grid grid-cols-4 gap-3">
        {cards.map(card => (
          <button key={card.id} onClick={() => flip(card.id)}
            className={`w-16 h-16 rounded-xl text-2xl flex items-center justify-center font-bold transition-all duration-300 border-2 ${
              card.matched ? 'bg-green-900 border-green-500 scale-95' :
              card.flipped ? 'bg-indigo-800 border-indigo-400' :
              'bg-gray-800 border-gray-600 hover:border-indigo-500 hover:bg-gray-700'
            }`}>
            {card.flipped || card.matched ? card.emoji : '?'}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── 4. DOODLE CANVAS ─────────────────────────────────────────────────────────
function DoodleGame() {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const [color, setColor] = useState('#6366f1');
  const [size, setSize] = useState(6);
  const [tool, setTool] = useState('pen'); // pen | eraser

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return { x: src.clientX - rect.left, y: src.clientY - rect.top };
  };

  const startDraw = (e) => {
    drawing.current = true;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pos = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const draw = (e) => {
    if (!drawing.current) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pos = getPos(e, canvas);
    ctx.lineWidth = tool === 'eraser' ? size * 4 : size;
    ctx.lineCap = 'round';
    ctx.strokeStyle = tool === 'eraser' ? '#1f2937' : color;
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const stopDraw = () => { drawing.current = false; };

  const clear = () => {
    const canvas = canvasRef.current;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  };

  const COLORS = ['#6366f1','#10b981','#f59e0b','#ec4899','#ef4444','#06b6d4','#ffffff','#94a3b8'];

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-gray-400 text-sm text-center max-w-sm">
        Free-form doodling is a proven mindfulness technique — it lowers heart rate and reduces anxiety by engaging creative flow.
      </p>
      <div className="flex flex-wrap items-center gap-3 justify-center">
        <div className="flex gap-2">
          {COLORS.map(c => (
            <button key={c} onClick={() => { setColor(c); setTool('pen'); }}
              className={`w-7 h-7 rounded-full border-2 transition ${color === c && tool === 'pen' ? 'border-white scale-125' : 'border-gray-600'}`}
              style={{background: c}}/>
          ))}
        </div>
        <input type="range" min="2" max="20" value={size} onChange={e => setSize(+e.target.value)} className="w-24 accent-indigo-500"/>
        <button onClick={() => setTool(tool === 'eraser' ? 'pen' : 'eraser')}
          className={`px-3 py-1 rounded-lg text-sm font-semibold transition ${tool === 'eraser' ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
          {tool === 'eraser' ? 'Eraser ON' : 'Eraser'}
        </button>
        <button onClick={clear} className="px-3 py-1 bg-red-800 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition">Clear</button>
      </div>
      <canvas ref={canvasRef} width={500} height={300}
        className="rounded-xl border border-gray-700 cursor-crosshair touch-none"
        style={{background:'#111827', maxWidth:'100%'}}
        onMouseDown={startDraw} onMouseMove={draw} onMouseUp={stopDraw} onMouseLeave={stopDraw}
        onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={stopDraw}/>
    </div>
  );
}

// ─── 5. CATCH THE STAR ────────────────────────────────────────────────────────
function CatchStarGame() {
  const [stars, setStars] = useState([]);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [active, setActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const idRef = useRef(0);
  const spawnRef = useRef(null);
  const timerRef = useRef(null);

  const STAR_COLORS = ['#f59e0b','#fbbf24','#fde68a','#fcd34d'];

  const start = () => {
    setScore(0); setMissed(0); setStars([]); setTimeLeft(30); setActive(true);
    spawnRef.current = setInterval(() => {
      const id = idRef.current++;
      setStars(s => [...s, { id, x: 5 + Math.random() * 88, y: 5 + Math.random() * 80, color: STAR_COLORS[Math.floor(Math.random() * 4)] }]);
      setTimeout(() => {
        setStars(s => {
          const exists = s.find(x => x.id === id);
          if (exists) setMissed(m => m + 1);
          return s.filter(x => x.id !== id);
        });
      }, 2000);
    }, 600);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(spawnRef.current);
          clearInterval(timerRef.current);
          setActive(false);
          setStars([]);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const catch_ = (id) => {
    setStars(s => s.filter(x => x.id !== id));
    setScore(s => s + 1);
  };

  useEffect(() => () => { clearInterval(spawnRef.current); clearInterval(timerRef.current); }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-gray-400 text-sm text-center max-w-sm">
        Simple reflex games redirect nervous energy into playful focus, releasing tension through light physical engagement.
      </p>
      <div className="flex items-center gap-6">
        <span className="text-white text-sm">Caught: <span className="text-yellow-400 font-bold">{score}</span></span>
        <span className="text-white text-sm">Missed: <span className="text-red-400 font-bold">{missed}</span></span>
        {active && <span className="text-gray-400 text-sm">Time: <span className="text-white font-bold">{timeLeft}s</span></span>}
        {!active && <button onClick={start} className="px-5 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg font-semibold transition">Play (30s)</button>}
      </div>
      <div className="relative bg-gray-900 rounded-xl border border-gray-700 overflow-hidden" style={{width:'100%',maxWidth:500,height:280}}>
        {!active && timeLeft === 30 && <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-sm">Press Play to start</div>}
        {!active && timeLeft === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <span className="text-white text-xl font-bold">Caught {score} stars!</span>
            <span className="text-gray-400 text-sm">Missed: {missed}</span>
            <button onClick={start} className="px-5 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg font-semibold transition mt-2">Play Again</button>
          </div>
        )}
        {stars.map(s => (
          <button key={s.id} onClick={() => catch_(s.id)}
            className="absolute text-2xl transition-transform hover:scale-125 active:scale-75"
            style={{ left: `${s.x}%`, top: `${s.y}%`, transform: 'translate(-50%,-50%)', color: s.color, animation: 'popIn 0.2s ease-out' }}>
            ★
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── TECHNIQUES DATA ──────────────────────────────────────────────────────────
const TECHNIQUES = [
  {
    title: '5-4-3-2-1 Grounding',
    color: 'from-indigo-900 to-indigo-800',
    border: 'border-indigo-600',
    icon: '🧠',
    steps: ['5 things you can SEE', '4 things you can TOUCH', '3 things you can HEAR', '2 things you can SMELL', '1 thing you can TASTE'],
    desc: 'Anchors you to the present moment, interrupting the anxiety spiral by engaging all five senses.',
  },
  {
    title: 'Progressive Muscle Relaxation',
    color: 'from-emerald-900 to-emerald-800',
    border: 'border-emerald-600',
    icon: '💪',
    steps: ['Tense feet for 5s, release', 'Tense calves for 5s, release', 'Tense thighs for 5s, release', 'Tense stomach for 5s, release', 'Tense shoulders for 5s, release', 'Tense face for 5s, release'],
    desc: 'Systematically releasing muscle tension signals your brain to switch off the stress response.',
  },
  {
    title: 'Cognitive Reframing',
    color: 'from-purple-900 to-purple-800',
    border: 'border-purple-600',
    icon: '🔄',
    steps: ['Identify the stressful thought', 'Ask: Is this fact or assumption?', 'Find evidence for and against it', 'Write a balanced alternative thought', 'Repeat the new thought 3 times'],
    desc: 'CBT-based technique that challenges distorted thinking patterns causing unnecessary stress.',
  },
  {
    title: 'Cold Water Reset',
    color: 'from-cyan-900 to-cyan-800',
    border: 'border-cyan-600',
    icon: '💧',
    steps: ['Splash cold water on your face', 'Or hold ice cubes for 30 seconds', 'Or run cold water over wrists', 'Take 3 slow deep breaths after', 'Notice the shift in your body'],
    desc: 'Activates the dive reflex, rapidly slowing heart rate and triggering the parasympathetic system.',
  },
  {
    title: 'Journaling Dump',
    color: 'from-rose-900 to-rose-800',
    border: 'border-rose-600',
    icon: '📝',
    steps: ['Set a 5-minute timer', 'Write everything on your mind — no filter', 'Don\'t edit or re-read while writing', 'When done, close the journal', 'Optionally tear the page up after'],
    desc: 'Externalizing thoughts reduces their emotional weight and clears mental RAM.',
  },
  {
    title: 'Body Scan Meditation',
    color: 'from-amber-900 to-amber-800',
    border: 'border-amber-600',
    icon: '🧘',
    steps: ['Lie down or sit comfortably', 'Close eyes, breathe naturally', 'Focus attention on your toes', 'Slowly move attention up the body', 'Notice sensations without judgment', 'End at the top of your head'],
    desc: 'Builds interoceptive awareness, helping you catch and release physical stress before it escalates.',
  },
];

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
const GAMES = [
  { id: 'breathing', label: 'Box Breathing',   icon: '🫁', component: BreathingGame },
  { id: 'bubbles',   label: 'Bubble Pop',       icon: '🫧', component: BubblePopGame },
  { id: 'memory',    label: 'Memory Match',     icon: '🃏', component: MemoryGame },
  { id: 'doodle',    label: 'Doodle Zone',      icon: '🎨', component: DoodleGame },
  { id: 'stars',     label: 'Catch the Stars',  icon: '⭐', component: CatchStarGame },
];

export default function StressRelief() {
  const [activeGame, setActiveGame] = useState('breathing');
  const [tab, setTab] = useState('games'); // games | techniques

  const ActiveComponent = GAMES.find(g => g.id === activeGame)?.component;

  return (
    <Layout>
      <style>{`
        @keyframes popIn { from { transform: translate(-50%,-50%) scale(0); } to { transform: translate(-50%,-50%) scale(1); } }
      `}</style>
      <div className="p-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Stress Relief Zone</h1>
          <p className="text-gray-400">Take a break. Breathe. Play. Your mental health matters.</p>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-3 mb-8">
          <button onClick={() => setTab('games')}
            className={`px-6 py-2.5 rounded-xl font-semibold transition ${tab === 'games' ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'}`}>
            🎮 Stress Relief Games
          </button>
          <button onClick={() => setTab('techniques')}
            className={`px-6 py-2.5 rounded-xl font-semibold transition ${tab === 'techniques' ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'}`}>
            🧘 Techniques & Tips
          </button>
        </div>

        {/* GAMES TAB */}
        {tab === 'games' && (
          <div className="flex flex-col gap-6">
            {/* Game selector */}
            <div className="flex flex-wrap gap-3">
              {GAMES.map(g => (
                <button key={g.id} onClick={() => setActiveGame(g.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition ${
                    activeGame === g.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900' : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}>
                  <span>{g.icon}</span> {g.label}
                </button>
              ))}
            </div>

            {/* Active game card */}
            <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-1">
                {GAMES.find(g => g.id === activeGame)?.icon} {GAMES.find(g => g.id === activeGame)?.label}
              </h2>
              <div className="mt-4">
                {ActiveComponent && <ActiveComponent />}
              </div>
            </div>
          </div>
        )}

        {/* TECHNIQUES TAB */}
        {tab === 'techniques' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TECHNIQUES.map((t, i) => (
              <div key={i} className={`bg-gradient-to-br ${t.color} rounded-2xl border ${t.border} p-6 shadow-lg`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{t.icon}</span>
                  <h3 className="text-white font-bold text-lg">{t.title}</h3>
                </div>
                <p className="text-gray-300 text-sm mb-4">{t.desc}</p>
                <ol className="space-y-1.5">
                  {t.steps.map((step, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-200">
                      <span className="text-xs font-bold mt-0.5 opacity-60 min-w-[16px]">{j + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
