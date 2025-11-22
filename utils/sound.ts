
let audioCtx: AudioContext | null = null;

const getCtx = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
};

export const playSound = (type: 'correct' | 'incorrect' | 'tick' | 'start' | 'finish') => {
  try {
    const ctx = getCtx();
    if (!ctx || ctx.state === 'suspended') {
      ctx?.resume();
    }
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    switch (type) {
      case 'correct':
        // Sharp, ascending square wave - "Digital Win"
        osc.type = 'square';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
        break;

      case 'incorrect':
        // Low, dissonant sawtooth - "Brutal Buzz"
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.linearRampToValueAtTime(100, now + 0.3);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
        break;

      case 'tick':
        // Short, dry click - "Clock Mech"
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        osc.start(now);
        osc.stop(now + 0.03);
        break;

      case 'start':
        // Power up slide
        osc.type = 'square';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.4);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
        break;
        
      case 'finish':
        // Success chord-ish arpeggio
        const frequencies = [440, 554, 659, 880]; // A major
        frequencies.forEach((freq, i) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = 'square';
          o.connect(g);
          g.connect(ctx.destination);
          
          const start = now + i * 0.05;
          o.frequency.value = freq;
          g.gain.setValueAtTime(0.05, start);
          g.gain.exponentialRampToValueAtTime(0.001, start + 0.3);
          o.start(start);
          o.stop(start + 0.3);
        });
        break;
    }
  } catch (e) {
    console.error("Audio error", e);
  }
}
