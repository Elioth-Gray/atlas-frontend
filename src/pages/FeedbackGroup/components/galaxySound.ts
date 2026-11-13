// Synthesized with the Web Audio API: no audio files to load, and nothing the CSP has to allow
const STORAGE_KEY = 'atlas-galaxy-sound'

export type GalaxySound =
  | 'hover'
  | 'select'
  | 'close'
  | 'toggle'
  | 'consult-start'
  | 'chat-send'
  | 'chat-receive'
  | 'solution-ready'
  | 'save-success'

let context: AudioContext | null = null
let isEnabled = readEnabled()

function readEnabled() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== 'off'
  } catch {
    return true
  }
}

export function isGalaxySoundOn() {
  return isEnabled
}

export function setGalaxySoundOn(enabled: boolean) {
  isEnabled = enabled
  try {
    localStorage.setItem(STORAGE_KEY, enabled ? 'on' : 'off')
  } catch {
    // The choice still applies for this visit
  }
}

// Browsers keep audio suspended until the first user gesture, so early hovers stay silent
function getContext() {
  if (typeof window === 'undefined' || typeof window.AudioContext !== 'function') return null
  context ??= new window.AudioContext()
  if (context.state === 'suspended') void context.resume()
  return context
}

interface ToneOptions {
  frequency: number
  endFrequency?: number
  duration: number
  volume: number
  delay?: number
  type?: OscillatorType
}

function playTone(audio: AudioContext, options: ToneOptions) {
  const { frequency, endFrequency, duration, volume, delay = 0, type = 'sine' } = options
  const start = audio.currentTime + delay
  const oscillator = audio.createOscillator()
  const gain = audio.createGain()

  oscillator.type = type
  oscillator.frequency.setValueAtTime(frequency, start)
  if (endFrequency)
    oscillator.frequency.exponentialRampToValueAtTime(endFrequency, start + duration)
  gain.gain.setValueAtTime(0.0001, start)
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)

  oscillator.connect(gain).connect(audio.destination)
  oscillator.start(start)
  oscillator.stop(start + duration + 0.05)
}

// Filtered noise sweep, the "zoom" between the overview and a planet
function playWhoosh(
  audio: AudioContext,
  from: number,
  to: number,
  duration: number,
  volume: number
) {
  const start = audio.currentTime
  const buffer = audio.createBuffer(1, Math.floor(audio.sampleRate * duration), audio.sampleRate)
  const samples = buffer.getChannelData(0)
  for (let index = 0; index < samples.length; index++) samples[index] = Math.random() * 2 - 1

  const source = audio.createBufferSource()
  source.buffer = buffer
  const filter = audio.createBiquadFilter()
  filter.type = 'bandpass'
  filter.Q.value = 1.4
  filter.frequency.setValueAtTime(from, start)
  filter.frequency.exponentialRampToValueAtTime(to, start + duration)
  const gain = audio.createGain()
  gain.gain.setValueAtTime(0.0001, start)
  gain.gain.exponentialRampToValueAtTime(volume, start + duration * 0.4)
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)

  source.connect(filter).connect(gain).connect(audio.destination)
  source.start(start)
}

export function playGalaxySound(sound: GalaxySound) {
  if (!isEnabled) return
  const audio = getContext()
  if (!audio) return

  switch (sound) {
    case 'hover':
      playTone(audio, { frequency: 880, endFrequency: 1320, duration: 0.14, volume: 0.035 })
      break
    case 'select':
      playWhoosh(audio, 350, 2600, 0.75, 0.14)
      playTone(audio, { frequency: 659, duration: 0.6, volume: 0.05, delay: 0.38 })
      playTone(audio, { frequency: 988, duration: 0.8, volume: 0.04, delay: 0.5 })
      playTone(audio, { frequency: 1319, duration: 0.9, volume: 0.025, delay: 0.62 })
      break
    case 'close':
      playWhoosh(audio, 2200, 300, 0.55, 0.1)
      break
    case 'toggle':
      playTone(audio, { frequency: 523, endFrequency: 784, duration: 0.18, volume: 0.05 })
      break
    case 'consult-start':
      playWhoosh(audio, 420, 1900, 0.42, 0.09)
      playTone(audio, {
        frequency: 523.25,
        duration: 0.28,
        volume: 0.05,
        delay: 0.04,
        type: 'triangle',
      })
      playTone(audio, {
        frequency: 659.25,
        duration: 0.32,
        volume: 0.05,
        delay: 0.12,
        type: 'triangle',
      })
      playTone(audio, {
        frequency: 783.99,
        duration: 0.38,
        volume: 0.045,
        delay: 0.2,
        type: 'sine',
      })
      playTone(audio, {
        frequency: 1046.5,
        duration: 0.5,
        volume: 0.035,
        delay: 0.28,
        type: 'sine',
      })
      break
    case 'chat-send':
      playTone(audio, {
        frequency: 440,
        endFrequency: 740,
        duration: 0.13,
        volume: 0.055,
        type: 'triangle',
      })
      playTone(audio, {
        frequency: 880,
        endFrequency: 1180,
        duration: 0.09,
        volume: 0.025,
        delay: 0.025,
        type: 'sine',
      })
      break
    case 'chat-receive':
      playTone(audio, {
        frequency: 659.25,
        duration: 0.22,
        volume: 0.045,
        type: 'sine',
      })
      playTone(audio, {
        frequency: 880,
        endFrequency: 987.77,
        duration: 0.32,
        volume: 0.045,
        delay: 0.11,
        type: 'sine',
      })
      break
    case 'solution-ready':
      playWhoosh(audio, 500, 2400, 0.45, 0.08)
      playTone(audio, { frequency: 523.25, duration: 0.35, volume: 0.045, delay: 0.05 })
      playTone(audio, { frequency: 659.25, duration: 0.4, volume: 0.045, delay: 0.13 })
      playTone(audio, { frequency: 783.99, duration: 0.45, volume: 0.045, delay: 0.21 })
      playTone(audio, { frequency: 1046.5, duration: 0.65, volume: 0.04, delay: 0.3 })
      playTone(audio, { frequency: 1318.5, duration: 0.75, volume: 0.03, delay: 0.38 })
      break
    case 'save-success':
      playTone(audio, { frequency: 587.33, duration: 0.25, volume: 0.05, type: 'triangle' })
      playTone(audio, { frequency: 880, duration: 0.35, volume: 0.05, delay: 0.1, type: 'sine' })
      playTone(audio, { frequency: 1174.66, duration: 0.5, volume: 0.04, delay: 0.2, type: 'sine' })
      break
  }
}
