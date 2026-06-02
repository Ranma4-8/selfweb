export type WeatherTheme = 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'stormy' | 'foggy'

export interface WeatherInfo {
  theme: WeatherTheme
  label: string       // 天气描述，如"晴"
  temp: number
}

// WMO weather code → theme
function codeToTheme(code: number): { theme: WeatherTheme; label: string } {
  if (code === 0) return { theme: 'sunny', label: '晴' }
  if (code <= 3) return { theme: 'cloudy', label: code === 1 ? '多云' : '阴' }
  if (code <= 48) return { theme: 'foggy', label: '雾' }
  if (code <= 57) return { theme: 'rainy', label: '毛毛雨' }
  if (code <= 67) return { theme: 'rainy', label: code <= 63 ? '小雨' : '大雨' }
  if (code <= 77) return { theme: 'snowy', label: code <= 73 ? '小雪' : '大雪' }
  if (code <= 82) return { theme: 'rainy', label: '阵雨' }
  if (code <= 86) return { theme: 'snowy', label: '阵雪' }
  return { theme: 'stormy', label: '雷暴' }
}

export async function fetchWeather(): Promise<WeatherInfo> {
  const coords = await getCoords()
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=weathercode,temperature_2m`
  const res = await fetch(url)
  if (!res.ok) throw new Error('weather fetch failed')
  const data = await res.json()
  const code: number = data.current.weathercode
  const temp: number = Math.round(data.current.temperature_2m)
  const { theme, label } = codeToTheme(code)
  return { theme, label, temp }
}

function getCoords(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve) => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      resolve({ lat: -36.85, lon: 174.76 }) // fallback: Auckland
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      () => resolve({ lat: -36.85, lon: 174.76 }),
      { timeout: 5000 }
    )
  })
}

// Visual config per theme
export const WEATHER_THEMES: Record<WeatherTheme, {
  bg: string          // background color class
  blob1: string       // first blob color
  blob2: string       // second blob color
  accent: string      // button / text accent color
  titleColor: string
  subColor: string
  particles: string[] // emoji particles shown floating
}> = {
  sunny: {
    bg: 'bg-amber-950',
    blob1: 'bg-amber-400/40',
    blob2: 'bg-orange-300/30',
    accent: 'bg-amber-400 hover:bg-amber-300 text-stone-900 shadow-amber-400/30',
    titleColor: 'text-white',
    subColor: 'text-amber-200/70',
    particles: ['☀️', '🌤️', '✨'],
  },
  cloudy: {
    bg: 'bg-slate-800',
    blob1: 'bg-slate-400/30',
    blob2: 'bg-slate-300/20',
    accent: 'bg-slate-300 hover:bg-white text-slate-800 shadow-slate-400/30',
    titleColor: 'text-white',
    subColor: 'text-slate-300/70',
    particles: ['☁️', '🌥️', '💨'],
  },
  rainy: {
    bg: 'bg-blue-950',
    blob1: 'bg-blue-400/30',
    blob2: 'bg-indigo-400/20',
    accent: 'bg-blue-400 hover:bg-blue-300 text-white shadow-blue-400/30',
    titleColor: 'text-white',
    subColor: 'text-blue-200/70',
    particles: ['🌧️', '💧', '🌂'],
  },
  snowy: {
    bg: 'bg-sky-950',
    blob1: 'bg-sky-200/30',
    blob2: 'bg-blue-100/20',
    accent: 'bg-sky-200 hover:bg-white text-sky-900 shadow-sky-200/30',
    titleColor: 'text-white',
    subColor: 'text-sky-200/70',
    particles: ['❄️', '🌨️', '⛄'],
  },
  stormy: {
    bg: 'bg-zinc-950',
    blob1: 'bg-purple-500/25',
    blob2: 'bg-zinc-400/15',
    accent: 'bg-purple-400 hover:bg-purple-300 text-white shadow-purple-400/30',
    titleColor: 'text-white',
    subColor: 'text-zinc-300/70',
    particles: ['⛈️', '🌩️', '💥'],
  },
  foggy: {
    bg: 'bg-neutral-800',
    blob1: 'bg-neutral-300/25',
    blob2: 'bg-stone-200/15',
    accent: 'bg-neutral-300 hover:bg-white text-neutral-800 shadow-neutral-300/30',
    titleColor: 'text-white',
    subColor: 'text-neutral-300/70',
    particles: ['🌫️', '😶‍🌫️', '🍃'],
  },
}
