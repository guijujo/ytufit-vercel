'use client'

import { useState } from 'react'
import { ArrowLeft, BarChart3, Check, ChevronRight, Dumbbell, Gift, House, UserRound } from 'lucide-react'

type Period = 'Últimos 30 días' | '3 meses' | '6 meses'

const trainingBars = [2, 3, 3, 3]
const volumeBars = [5200, 5850, 6300, 7230]
const exercises = [
  { name: 'Press de banca', current: '50 kg', previous: '45 kg', improvement: '+11%', last: '50 kg × 10', records: ['50 kg × 10', '47,5 kg × 10', '47,5 kg × 8', '45 kg × 10'], tone: 'progress-purple' },
  { name: 'Sentadilla', current: '70 kg', previous: '65 kg', improvement: '+8%', last: '70 kg × 8', records: ['70 kg × 8', '67,5 kg × 8', '65 kg × 10', '65 kg × 8'], tone: 'progress-blue' },
  { name: 'Remo con barra', current: '45 kg', previous: '42,5 kg', improvement: '+6%', last: '45 kg × 10', records: ['45 kg × 10', '42,5 kg × 10', '42,5 kg × 8', '40 kg × 10'], tone: 'progress-green' },
]

function MemberNav({ onHome, onTraining }: { onHome: () => void; onTraining: () => void }) {
  return <nav className="mobile-bottom-nav" aria-label="Navegación del socio"><button onClick={onHome}><House aria-hidden="true" /><span>Inicio</span></button><button onClick={onTraining}><Dumbbell aria-hidden="true" /><span>Entrenar</span></button><button className="bottom-nav-active" aria-current="page"><BarChart3 aria-hidden="true" /><span>Progreso</span></button><button><Gift aria-hidden="true" /><span>Beneficios</span></button><button><UserRound aria-hidden="true" /><span>Perfil</span></button></nav>
}

function MiniBarChart({ values, max, labels, tone }: { values: number[]; max: number; labels: string[]; tone: string }) {
  return <div className={`progress-chart ${tone}`} role="img" aria-label="Gráfico de evolución semanal">{values.map((value, index) => <div className="progress-bar-column" key={labels[index]}><div className="progress-bar-track"><span style={{ height: `${Math.max(12, value / max * 100)}%` }} /></div><small>{labels[index]}</small></div>)}</div>
}

export function MemberProgress({ onHome, onTraining }: { onHome: () => void; onTraining: () => void }) {
  const [period, setPeriod] = useState<Period>('Últimos 30 días')
  const [selectedExercise, setSelectedExercise] = useState<(typeof exercises)[number] | null>(null)

  return <div className="member-progress-screen">
    <header className="progress-header"><div><p className="eyebrow">Potencia Fitness · Villa Crespo</p><h1>Tu progreso</h1><p>Seguí tu evolución y constancia en el entrenamiento.</p></div><button className="progress-profile" aria-label="Ver perfil"><UserRound /></button></header>
    <div className="member-scroll progress-scroll">
      <div className="period-selector" role="group" aria-label="Seleccionar período">{(['Últimos 30 días', '3 meses', '6 meses'] as Period[]).map(option => <button key={option} className={period === option ? 'period-active' : ''} onClick={() => setPeriod(option)}>{option}</button>)}</div>
      <section className="progress-metric-grid" aria-label="Resumen de progreso"><div><span>Entrenamientos</span><strong>11</strong></div><div><span>Consistencia</span><strong>82%</strong></div><div><span>Volumen total</span><strong>24.580 <small>kg</small></strong></div><div><span>Racha actual</span><strong>4 <small>semanas</small></strong></div></section>
      <section className="progress-panel"><div className="progress-section-heading"><div><p className="member-label">FRECUENCIA</p><h2>Entrenamientos por semana</h2><p>Tu frecuencia se mantuvo estable este mes.</p></div><BarChart3 /></div><MiniBarChart values={trainingBars} max={4} labels={['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4']} tone="chart-indigo" /></section>
      <section className="progress-panel"><div className="progress-section-heading"><div><p className="member-label">CARGA TOTAL</p><h2>Volumen entrenado</h2><p><strong className="positive-copy">+12%</strong> vs período anterior</p></div><Dumbbell /></div><MiniBarChart values={volumeBars} max={8000} labels={['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4']} tone="chart-blue" /></section>
      <section className="progress-section"><div className="progress-section-heading"><div><p className="member-label">FUERZA Y EVOLUCIÓN</p><h2>Ejercicios destacados</h2></div></div><div className="exercise-progress-list">{exercises.map(exercise => <button className="exercise-progress-card" key={exercise.name} onClick={() => setSelectedExercise(exercise)}><span className={`exercise-progress-icon ${exercise.tone}`}><Dumbbell /></span><span className="exercise-progress-main"><strong>{exercise.name}</strong><small>Última sesión · {exercise.last}</small></span><span className="exercise-progress-values"><strong>{exercise.current}</strong><small>antes {exercise.previous}</small></span><span className="improvement-badge">{exercise.improvement}</span><ChevronRight /></button>)}</div></section>
      <section className="progress-panel consistency-panel"><div className="progress-section-heading"><div><p className="member-label">RITMO SOSTENIDO</p><h2>Consistencia</h2></div><span className="consistency-score">82%</span></div><div className="consistency-row"><strong>11 entrenamientos completados</strong><span>3,0 entrenamientos por semana</span></div><div className="consistency-track"><span /></div><p>Vas manteniendo un buen ritmo.</p></section>
      <section className="progress-panel weekly-streak-panel"><div className="progress-section-heading"><div><p className="member-label">SEMANAS CUMPLIDAS</p><h2>Racha semanal</h2></div><strong className="streak-number">4 semanas</strong></div><div className="streak-detail-grid"><span><strong>8 semanas</strong><small>Mejor racha</small></span><span><strong>3 / 3</strong><small>Objetivo semanal</small></span><span><strong>1</strong><small>Freeze disponible</small></span></div></section>
      <section className="progress-section recent-section"><div className="progress-section-heading"><div><p className="member-label">ACTIVIDAD</p><h2>Últimos entrenamientos</h2></div><button className="card-link">Ver historial <ChevronRight /></button></div>{[['Hoy', 'Día D — Piernas + Core', '55 min'], ['03/09', 'Día C — Torso', '48 min'], ['01/09', 'Día B — Piernas', '59 min']].map(([date, title, duration]) => <div className="recent-workout-row" key={date}><span>{date}</span><div><strong>{title}</strong><small>Completado · {duration}</small></div><Check /></div>)}</section>
    </div>
    <MemberNav onHome={onHome} onTraining={onTraining} />
    {selectedExercise && <div className="progress-drawer-backdrop" role="presentation" onClick={() => setSelectedExercise(null)}><aside className="progress-drawer" role="dialog" aria-modal="true" aria-labelledby="exercise-detail-title" onClick={event => event.stopPropagation()}><button className="mobile-back-button drawer-close" onClick={() => setSelectedExercise(null)} aria-label="Cerrar detalle"><ArrowLeft /></button><p className="member-label">DETALLE DE EJERCICIO</p><h2 id="exercise-detail-title">{selectedExercise.name}</h2><p className="drawer-copy">Evolución del peso en tus últimas sesiones.</p><div className="exercise-detail-best"><span>Mejor registro</span><strong>{selectedExercise.records[0]}</strong></div><MiniBarChart values={[45, 47.5, 47.5, 50]} max={55} labels={['1', '2', '3', '4']} tone="chart-detail" /><div className="record-list"><p className="member-label">ÚLTIMOS REGISTROS</p>{selectedExercise.records.map(record => <div key={record}><span>{record}</span><Check /></div>)}</div></aside></div>}
  </div>
}

export default MemberProgress
