'use client'

import { useState } from 'react'
import { ArrowLeft, Check, ChevronRight, Clock3, Dumbbell, Flame, Play, X } from 'lucide-react'

const days = [
  { id: 'a', title: 'Día A', focus: 'Torso', exercises: '6 ejercicios', duration: '50 min', complete: true },
  { id: 'b', title: 'Día B', focus: 'Piernas', exercises: '7 ejercicios', duration: '60 min', complete: true },
  { id: 'c', title: 'Día C', focus: 'Torso', exercises: '6 ejercicios', duration: '50 min', complete: true },
  { id: 'd', title: 'Día D', focus: 'Piernas + Core', exercises: '7 ejercicios', duration: '55 min', complete: false },
]

const exercises = ['Sentadilla · 4 × 8', 'Prensa · 4 × 10', 'Peso muerto rumano · 3 × 10', 'Hip thrust · 4 × 10', 'Extensión de cuádriceps · 3 × 12', 'Curl femoral · 3 × 12', 'Plancha · 3 × 45 s']

export function MemberTrainingRoutine({ onBack, onStart }: { onBack: () => void; onStart: () => void }) {
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const selected = days.find(day => day.id === selectedDay)
  return <div className="member-training-screen">
    <header className="mobile-detail-header"><button className="mobile-back-button" aria-label="Volver al inicio" onClick={onBack}><ArrowLeft /></button><h1>Entrenar</h1><span className="mobile-header-spacer" /></header>
    <div className="member-scroll member-training-scroll">
      <section className="training-intro"><p className="member-label">TU ENTRENAMIENTO</p><h2>Fuerza e hipertrofia</h2><p>Rutina asignada por Luciano Romero</p><div className="training-context"><span>Objetivo: <strong>Hipertrofia</strong></span><span>Desde: <strong>25 ago 2026</strong></span></div></section>
      <section className="member-card routine-summary-card"><div className="routine-summary-head"><div><p className="member-label">RUTINA ACTIVA</p><h2>Fuerza e hipertrofia</h2></div><span className="training-status">Activa</span></div><div className="routine-stats"><span><strong>4 días</strong><small>por semana</small></span><span><strong>7 ejercicios</strong><small>por sesión aprox.</small></span><span><strong>55 min</strong><small>promedio</small></span></div><p className="routine-coach"><Dumbbell /> Entrenador: <strong>Luciano Romero</strong></p></section>
      <section className="member-card weekly-routine-progress"><div className="member-card-heading"><div><p className="member-label">PROGRESO SEMANAL</p><h2>3 de 4 entrenamientos</h2></div><strong className="routine-percent">75%</strong></div><div className="routine-progress-track"><span /></div><p>Te queda 1 entrenamiento esta semana.</p></section>
      <section className="next-training-card"><div><span className="training-overline">PRÓXIMO ENTRENAMIENTO</span><h2>Día D — Piernas + Core</h2><p>7 ejercicios <span>·</span> 55 min</p></div><button className="ytufit-button ytufit-button-primary" onClick={onStart}><Play />Empezar entrenamiento</button></section>
      <div className="training-section-title"><div><p className="member-label">RUTINA ASIGNADA</p><h2>Días de entrenamiento</h2></div></div>
      <section className="routine-days-list">{days.map(day => <button className={`routine-day-card ${day.id === 'd' ? 'routine-day-next' : ''}`} key={day.id} onClick={() => setSelectedDay(day.id)}><span className={`routine-day-state ${day.complete ? 'is-complete' : 'is-pending'}`}>{day.complete ? <Check /> : ''}</span><span className="routine-day-copy"><strong>{day.title}</strong><span>{day.focus}</span></span><span className="routine-day-meta"><span>{day.exercises}</span><span><Clock3 />{day.duration}</span></span><span className={`routine-day-badge ${day.complete ? 'badge-complete' : 'badge-pending'}`}>{day.complete ? 'Completado' : 'Pendiente'}</span><ChevronRight /></button>)}</section>
      <section className="member-card recent-training-card"><div className="member-card-heading"><div><p className="member-label">HISTORIAL RECIENTE</p><h2>Últimos entrenamientos</h2></div><button className="card-link">Ver historial <ChevronRight /></button></div><div className="recent-training-list"><span><strong>Hoy</strong><b>Día C — Torso</b><em>Completado</em></span><span><strong>03/09</strong><b>Día B — Piernas</b><em>Completado</em></span><span><strong>01/09</strong><b>Día A — Torso</b><em>Completado</em></span></div></section>
      <div className="member-streak-note"><Flame /> <span><strong>Tu racha actual: 4 semanas</strong><small>Basada en asistencia válida y cumplimiento semanal.</small></span></div>
    </div>
    <nav className="mobile-bottom-nav" aria-label="Navegación del socio">{['Inicio', 'Entrenar', 'Progreso', 'Beneficios', 'Perfil'].map(label => <button key={label} className={label === 'Entrenar' ? 'bottom-nav-active' : ''}><span>{label === 'Entrenar' ? <Dumbbell /> : label === 'Inicio' ? '⌂' : label === 'Progreso' ? '▥' : label === 'Beneficios' ? '◇' : '○'}</span><span>{label}</span></button>)}</nav>
    {selected && <div className="routine-detail-overlay" role="presentation" onClick={() => setSelectedDay(null)}><section className="routine-detail-sheet" role="dialog" aria-modal="true" aria-labelledby="routine-detail-title" onClick={event => event.stopPropagation()}><div className="routine-sheet-handle" /><div className="routine-sheet-heading"><div><p className="member-label">DETALLE DEL BLOQUE</p><h2 id="routine-detail-title">{selected.title} — {selected.focus}</h2><p>{selected.exercises} · {selected.duration}</p></div><button className="icon-button" aria-label="Cerrar detalle" onClick={() => setSelectedDay(null)}><X /></button></div><div className="routine-exercise-list">{exercises.map((exercise, index) => <button key={exercise} className="routine-exercise-row" onClick={() => undefined}><span>{index + 1}</span><strong>{exercise.split(' · ')[0]}</strong><small>{exercise.split(' · ')[1]}</small><ChevronRight /></button>)}</div>{selected.id === 'd' && <button className="ytufit-button ytufit-button-primary routine-sheet-cta" onClick={onStart}><Play />Empezar entrenamiento</button>}</section></div>}
  </div>
}

export default MemberTrainingRoutine
