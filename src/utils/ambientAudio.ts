/**
 * Web Audio API Sacred Ambient Drone & Sound FX Synthesizer
 * Handcrafted zero-dependency procedural audio engine.
 * Generates harmonic 432Hz sacred drones and temple chimes without any external audio files.
 */

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private noiseNode: AudioNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Toggle the sacred temple ambient drone (432Hz harmonic pad)
   */
  public toggleDrone(): boolean {
    if (this.isPlaying) {
      this.stopDrone();
      return false;
    } else {
      this.startDrone();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public startDrone() {
    try {
      this.initContext();
      if (!this.ctx) return;

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      // Gentle fade in to a soothing, non-intrusive volume
      this.masterGain.gain.exponentialRampToValueAtTime(0.06, this.ctx.currentTime + 3);
      this.masterGain.connect(this.ctx.destination);

      // Lowpass filter for warm, celestial warmth
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(420, this.ctx.currentTime);
      filter.Q.setValueAtTime(3, this.ctx.currentTime);
      filter.connect(this.masterGain);

      // Harmonic frequencies around 108Hz / 216Hz / 432Hz (Sacred Vedic & Pythagorean ratios)
      const freqs = [108, 162, 216, 324, 432];

      this.oscillators = freqs.map((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const oscGain = this.ctx!.createGain();

        // Slight detuning for rich, lush chorus shimmer
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq + (idx * 0.4 - 0.8), this.ctx!.currentTime);

        const gainVal = 0.2 / (idx + 1);
        oscGain.gain.setValueAtTime(gainVal, this.ctx!.currentTime);

        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start();
        return osc;
      });

      this.isPlaying = true;
    } catch (err) {
      console.warn('AudioEngine: cannot start ambient drone', err);
      this.isPlaying = false;
    }
  }

  public stopDrone() {
    if (!this.ctx || !this.isPlaying) return;
    try {
      if (this.masterGain) {
        // Smooth 1.5s fade out
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.5);
        setTimeout(() => {
          this.oscillators.forEach((osc) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch (_) {}
          });
          this.oscillators = [];
          this.isPlaying = false;
        }, 1600);
      } else {
        this.isPlaying = false;
      }
    } catch (_) {
      this.isPlaying = false;
    }
  }

  /**
   * Play a delicate celestial chime when a tarot card or relic is revealed
   */
  public playCardRevealChime() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const chimeGain = this.ctx.createGain();
      chimeGain.gain.setValueAtTime(0.001, now);
      chimeGain.gain.exponentialRampToValueAtTime(0.08, now + 0.05);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);
      chimeGain.connect(this.ctx.destination);

      // Tibetan singing bowl frequency chime (587.33Hz D5 + harmonics)
      [587.33, 880, 1174.66, 1760].forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        osc.connect(chimeGain);
        osc.start(now);
        osc.stop(now + 2.3);
      });
    } catch (_) {}
  }
}

export const ambientSound = new AmbientSoundEngine();
