import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Github, Linkedin, Instagram, Code2, Gamepad2, X, Compass, List, Crosshair, Orbit, ChevronRight, Rocket } from 'lucide-react'
import './App.css'

const destinations = [
  { name: 'Abhistack', type: 'THE HOME WORLD', category: 'Portfolio', url: 'https://abhistack.pages.dev/', description: 'A little more about me. Explore my work, my experiments, and the things that make me curious.', x: 24, y: 48, size: 154, color: '#66d9d2', style: 'ocean', number: '01' },
  { name: 'Igris', type: 'ARTIFICIAL INTELLIGENCE', category: 'Conversational AI', url: 'https://agentigris.pages.dev/', description: 'Meet your next AI companion. Modular personalities, a personal knowledge base, and conversations with context.', x: 52, y: 32, size: 112, color: '#c1a3ff', style: 'violet', number: '02' },
  { name: 'Traata', type: 'THE VAULT PLANET', category: 'Privacy & security', url: 'https://traata.pages.dev/', description: 'Your secrets have a safe home. A lightweight password manager built for simplicity and privacy.', x: 76, y: 49, size: 138, color: '#efbd83', style: 'sand', number: '03' },
  { name: 'BlunderBot', type: 'A WORTHY OPPONENT', category: 'AI chess', url: 'https://blunderbot.pages.dev/', description: 'Make your move. An AI chess opponent with a sharp mind and an even sharper sense of humor.', x: 41, y: 73, size: 78, color: '#ed959e', style: 'red', number: '04' },
  { name: 'Terminal Sandbox', type: 'THE EXPERIMENTAL OUTPOST', category: 'Linux playground', url: 'https://terminalsandbox.pages.dev/', description: 'A Debian Linux terminal, right in your browser. A small outpost for big experiments.', x: 81, y: 79, size: 66, color: '#95caa4', style: 'green', number: '05' },
  { name: 'Mosslight Isle', type: 'THE WANDERING WORLD', category: 'Relaxing exploration', url: 'https://mosslight-isle.pages.dev/', description: 'A quiet island escape where the journey is the point. Wander at your own pace, take in the scenery, and enjoy an open world without a checklist.', x: 16, y: 77, size: 92, color: '#a9dfa5', style: 'moss', number: '06' },
]
const socials = [
  { name: 'GitHub', icon: Github, url: 'https://github.com/AbhishekDvs' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/allstarabhishek' },
  { name: 'Dev.to', icon: Code2, url: 'https://dev.to/abhishekdvs' },
  { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/fourforcephoto/' },
  { name: 'X', icon: X, url: 'https://x.com/abhisheksdistro' },
  { name: 'Chess.com', icon: Gamepad2, url: 'https://www.chess.com/member/dovahkiinishere' },
]
const stars = Array.from({ length: 190 }, (_, i) => ({ x: ((i * 127.31 + 14) % 100), y: ((i * 73.79 + 3) % 100), size: i % 11 === 0 ? 2.5 : i % 3 === 0 ? 1.5 : 1, delay: i % 7 }))

export default function App() {
  const [selected, setSelected] = useState<number | null>(null)
  const [arrived, setArrived] = useState(false)
  const [listOpen, setListOpen] = useState(false)
  const [about, setAbout] = useState(false)
  const [flying, setFlying] = useState(false)
  const ship = useRef<HTMLDivElement>(null)
  const position = useRef({ x: 50, y: 57, angle: 0 })
  const target = useRef<{ x: number; y: number } | null>(null)
  const keys = useRef(new Set<string>())
  const select = (index: number) => {
    setSelected(index)
    setArrived(false)
    setAbout(false)
    setListOpen(false)
    keys.current.clear()
    const planet = document.querySelectorAll('.planet-destination')[index]?.getBoundingClientRect()
    const scene = document.querySelector('.universe')?.getBoundingClientRect()
    if (planet && scene) target.current = { x: Math.min(92, (planet.right - scene.left + 34) / scene.width * 100), y: (planet.top + planet.height / 2 - scene.top) / scene.height * 100 }
  }
  useEffect(() => {
    let frame = 0
    let last = 0
    let wasMoving = false
    let lastDocked = -1
    const down = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLElement && ['INPUT', 'TEXTAREA'].includes(event.target.tagName)) return
      const key = event.key.toLowerCase()
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(key)) {
        event.preventDefault()
        keys.current.add(key)
        target.current = null
      }
      if (key === 'escape') { setSelected(null); setAbout(false); setListOpen(false); target.current = null }
    }
    const up = (event: KeyboardEvent) => keys.current.delete(event.key.toLowerCase())
    const clear = () => keys.current.clear()
    const animate = (time: number) => {
      const dt = Math.min((time - last) / 1000, .04)
      last = time
      const p = position.current
      let dx = Number(keys.current.has('d') || keys.current.has('arrowright')) - Number(keys.current.has('a') || keys.current.has('arrowleft'))
      let dy = Number(keys.current.has('s') || keys.current.has('arrowdown')) - Number(keys.current.has('w') || keys.current.has('arrowup'))
      if (target.current) {
        dx = target.current.x - p.x
        dy = target.current.y - p.y
        if (Math.hypot(dx, dy) < .5) { target.current = null; dx = 0; dy = 0; setArrived(true) }
      }
      const distance = Math.hypot(dx, dy)
      const moving = distance > 0
      if (moving) {
        const speed = target.current ? Math.min(23, distance * 3 + 2) : 15
        p.x = Math.max(5, Math.min(95, p.x + dx / distance * speed * dt))
        p.y = Math.max(18, Math.min(89, p.y + dy / distance * speed * dt))
        p.angle = Math.atan2(dy * window.innerHeight, dx * window.innerWidth) * 180 / Math.PI + 90
      }
      if (moving && !target.current && keys.current.size > 0) {
        const scene = document.querySelector('.universe')!.getBoundingClientRect()
        const planets = document.querySelectorAll('.planet-destination')
        const near = Array.from(planets).findIndex(planet => {
          const rect = planet.getBoundingClientRect()
          return Math.hypot(p.x / 100 * scene.width - (rect.left - scene.left + rect.width / 2), p.y / 100 * scene.height - (rect.top - scene.top + rect.height / 2)) < rect.width / 2 + 22
        })
        if (near >= 0 && near !== lastDocked) {
          setSelected(near)
          setArrived(true)
          setAbout(false)
          setListOpen(false)
        }
        lastDocked = near
        if (near < 0) setArrived(false)
      }
      if (moving !== wasMoving) { setFlying(moving); wasMoving = moving }
      if (ship.current) { ship.current.style.left = `${p.x}%`; ship.current.style.top = `${p.y}%`; ship.current.style.setProperty('--angle', `${p.angle}deg`) }
      frame = requestAnimationFrame(animate)
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    window.addEventListener('blur', clear)
    frame = requestAnimationFrame(animate)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); window.removeEventListener('blur', clear) }
  }, [])
  const destination = selected !== null ? destinations[selected] : null
  return (
    <main className="universe">
      <a className="skip-link" href="#destinations" onClick={() => setListOpen(true)}>Skip to destination links</a>
      <div className="cosmos" aria-hidden="true">
        <div className="nebula nebula-one" /><div className="nebula nebula-two" /><div className="nebula nebula-three" /><div className="nebula-cloud nebula-cloud-one" /><div className="nebula-cloud nebula-cloud-two" />
        <div className="starfield">{stars.map((s, i) => <i key={i} style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }} />)}</div>
        <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
        <div className="comet comet-one" /><div className="comet comet-two" />
        <div className="distant-planet" />
      </div>
      <header className="header">
        <a className="brand" href="#" aria-label="Linkverse home" onClick={e => { e.preventDefault(); setSelected(null); setAbout(false); setListOpen(false); target.current = { x: 50, y: 57 } }}><Orbit size={27} strokeWidth={1.4} /><span>LINKVERSE<span className="brand-dot">®</span></span></a>
        <div className="header-center"><span className="status-dot" /> ABHISHEK'S CORNER OF THE COSMOS</div>
        <button className="about-button" onClick={() => { setAbout(!about); setSelected(null); setListOpen(false) }}>Meet the explorer <ArrowUpRight size={14} /></button>
      </header>
      <section className="intro" aria-label="Welcome">
        <div className="eyebrow"><span /> PERSONAL UNIVERSE · EST. ON EARTH</div>
        <h1>A little curiosity.<br />An <em>entire universe.</em></h1>
        <p>Ideas, experiments, and things I've built.<br />Pick a world. See where it takes you.</p>
      </section>
      <div className="sector-label"><span>SECTOR 001 — THE CREATIVE SYSTEM</span><span>{String(destinations.length).padStart(2, '0')} WORLDS TO DISCOVER</span></div>
      <section className="planet-map" aria-label="Explore project planets">
        {destinations.map((d, index) => <button key={d.name} className={`planet-destination ${d.style} ${selected === index ? 'selected' : ''}`} style={{ '--x': `${d.x}%`, '--y': `${d.y}%`, '--size': `${d.size}px`, '--planet-color': d.color } as React.CSSProperties} onClick={() => select(index)} aria-label={`Travel to ${d.name}, ${d.category}`} aria-pressed={selected === index}>
          <span className="planet-halo" /><span className="planet-ring back-ring" /><span className="planet-sphere"><span className="planet-texture" /></span><span className="planet-ring front-ring" />
          <span className="planet-label"><span className="planet-number">{d.number} <span>—</span> {d.category}</span><span className="planet-name">{d.name}<ArrowUpRight size={14} /></span></span>
          <span className="selection-bracket top-left" /><span className="selection-bracket bottom-right" />
        </button>)}
      </section>
      <div ref={ship} className={`spaceship ${flying ? 'flying' : ''}`} style={{ left: '50%', top: '57%' }} aria-hidden="true"><div className="ship-body"><svg className="ship-svg" width="52" height="64" viewBox="0 0 52 64"><defs><linearGradient id="hull" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#4c6579"/><stop offset=".45" stopColor="#d4dfe4"/><stop offset=".6" stopColor="#91a9ba"/><stop offset="1" stopColor="#374f64"/></linearGradient><linearGradient id="glass" x2="0" y2="1"><stop stopColor="#c9ffff"/><stop offset=".4" stopColor="#50cee4"/><stop offset="1" stopColor="#154665"/></linearGradient></defs><path d="M21 23 4 40 3 49 18 43 23 37M31 23 48 40 49 49 34 43 29 37" fill="#728c9e" stroke="#c1d3de" strokeWidth=".6"/><path d="m20 29-11 12v4l11-6m12-10 11 12v4l-11-6" fill="#273b51"/><path d="M11 34h7v19h-7zm23 0h7v19h-7z" fill="url(#hull)" stroke="#a5bfcc" strokeWidth=".5"/><path d="M12 49h5v5h-5zm23 0h5v5h-5z" fill="#6adcf0"/><path d="M26 4 32 19 32 37 30 49H22L20 37V19Z" fill="url(#hull)" stroke="#d2e3ea" strokeWidth=".7"/><path d="m26 13 3 9v9h-6v-9Z" fill="url(#glass)" stroke="#152d46"/><path d="M23 35h6v8h-6z" fill="#304b61"/><path d="M26 5v7M8 43l9-7m27 7-9-7M23 46h6" stroke="#effaff" strokeWidth=".6"/><path d="M4 43h3v3H4z" fill="#f38981"/><path d="M45 43h3v3h-3z" fill="#89efbc"/></svg><span className="engine engine-left" /><span className="engine engine-right" /></div><span className="ship-label">YOU ARE HERE</span></div>
      <div className="left-coordinate" aria-hidden="true">X 07.284 / Y 19.063 <span>∞</span> KEEP EXPLORING</div>
      {destination && <aside className="destination-panel" aria-label={`${destination.name} destination`} style={{ '--planet-color': destination.color } as React.CSSProperties}>
        <div className="panel-top"><span><span className="status-dot" /> {arrived ? 'ORBIT ESTABLISHED' : flying ? 'AUTOPILOT ENGAGED' : 'DESTINATION SELECTED'}</span><button className="icon-button" aria-label="Close destination" onClick={() => { setSelected(null); target.current = null }}><X size={17}/></button></div>
        <div className="eyebrow">WORLD {destination.number} / {destination.type}</div><h2>{destination.name}</h2><p>{destination.description}</p>
        <a className="launch-link" href={destination.url} target="_blank" rel="noopener noreferrer">{arrived ? 'Explore this world' : 'Open destination'}<ArrowUpRight size={18}/></a>
        <span className="external-note">Opens in a new tab. Your ship stays here.</span>
      </aside>}
      {about && <aside className="destination-panel about-panel" aria-label="About Abhishek"><div className="panel-top"><span>TRANSMISSION FROM EARTH</span><button className="icon-button" aria-label="Close about" onClick={() => setAbout(false)}><X size={17}/></button></div><div className="eyebrow">THE EXPLORER BEHIND THE WORLDS</div><h2>Hey, I'm Abhishek<span>.</span></h2><p>A full-stack developer exploring AI, security, and useful little ideas. Away from the keyboard: photography, biking, and one more game of chess.</p><div className="socials">{socials.map(s => <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name} title={s.name}><s.icon size={19}/></a>)}</div></aside>}
      {listOpen && <aside id="destinations" className="destination-panel destinations-panel" aria-label="All destinations"><div className="panel-top"><span>CHOOSE YOUR NEXT WORLD</span><button className="icon-button" aria-label="Close destinations" onClick={() => setListOpen(false)}><X size={17}/></button></div><h2>Star atlas<span>.</span></h2>{destinations.map((d, i) => <div className="atlas-row" key={d.name}><button onClick={() => select(i)}><span className={`mini-planet ${d.style}`} /><span><strong>{d.name}</strong><small>{d.category}</small></span><ChevronRight size={16}/></button><a href={d.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${d.name} in new tab`}><ArrowUpRight size={17}/></a></div>)}</aside>}
      <footer className="flight-deck"><div className="pilot-info"><span className="pilot-icon"><Rocket size={19}/></span><div><span>YOUR SHIP, YOUR JOURNEY</span><strong>{flying ? 'Cruising through the cosmos' : 'A good place to get a little lost.'}</strong></div></div><div className="flight-controls"><span className="key-group"><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd></span><span>to fly</span><span className="control-divider"/><Crosshair size={15}/><span>click a world to travel</span></div><button className={`atlas-toggle ${listOpen ? 'active' : ''}`} onClick={() => { setListOpen(!listOpen); setSelected(null); setAbout(false) }} aria-expanded={listOpen}><List size={17}/><span>Star atlas</span><span className="atlas-count">{String(destinations.length).padStart(2, '0')}</span></button></footer>
      <div className="mobile-controls" aria-label="Ship direction controls">{[{ k: 'arrowleft', icon: ArrowLeft, label: 'Fly left' }, { k: 'arrowup', icon: ArrowUp, label: 'Fly up' }, { k: 'arrowdown', icon: ArrowDown, label: 'Fly down' }, { k: 'arrowright', icon: ArrowRight, label: 'Fly right' }].map(c => <button key={c.k} aria-label={c.label} onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); target.current = null; keys.current.add(c.k) }} onPointerUp={() => keys.current.delete(c.k)} onPointerCancel={() => keys.current.delete(c.k)}><c.icon size={16}/></button>)}</div>
      <div className="bottom-line"><span>BUILT BY ABHISHEK DVS</span><span><Compass size={11}/> MADE OF CODE & CURIOSITY</span><span>TAKE YOUR TIME. THERE'S SPACE.</span></div>
      <div className="sr-only" role="status" aria-live="polite">{destination ? `${arrived ? 'Arrived at' : 'Traveling to'} ${destination.name}` : ''}</div>
    </main>
  )
}
