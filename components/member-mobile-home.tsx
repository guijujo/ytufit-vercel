'use client'

import { useState } from 'react'
import { ArrowLeft, Bell, Check, ChartNoAxesColumnIncreasing, ChevronRight, Dumbbell, Flame, Gift, House, Play, Snowflake, UserRound } from 'lucide-react'

type MemberScreen = 'home' | 'streak' | 'workout'

const week = ['L', 'M', 'X', 'J', 'V', 'S', 'D']

function MobileHeader({ title, onBack }: { title: string; onBack?: () => void }) {
  return <header className="mobile-detail-header">
    {onBack ? <button className="mobile-back-button" aria-label="Volver" onClick={onBack}><ArrowLeft /></button> : <div className="mobile-header-spacer" />}
    <h1>{title}</h1>
    <div className="mobile-header-spacer" />
  </header>
}

function WeeklyProgress({ compact = false }: { compact?: boolean }) {
  return <div className={compact ? 'week-days week-days-compact' : 'weekly-progress'}>
    {week.map((day, index) => <div key={day} className="week-day">
      <span className={index < 3 ? 'day-done' : index === 3 ? 'day-today' : 'day-open'}>{index < 3 ? <Check /> : index === 3 ? '•' : ''}</span>
      <small>{day}</small>
    </div>)}
  </div>
}

function StreakCard({ onOpen }: { onOpen: () => void }) {
  return <section className="member-card streak-card-featured">
    <div className="member-card-heading"><div className="streak-heading"><span className="streak-flame"><Flame /></span><div><p className="member-label">TU CONSTANCIA</p><h2>4 semanas</h2></div></div><button className="card-link" onClick={onOpen}>Ver detalle <ChevronRight /></button></div>
    <p className="member-card-copy">Llevás 4 semanas cumpliendo tu objetivo.</p>
    <div className="streak-meta"><span>Meta semanal <strong>3 / 3 días</strong></span><span>Mejor <strong>8 semanas</strong></span></div>
    <WeeklyProgress compact />
    <div className="freeze-row"><Snowflake /><span><strong>1 Freeze disponible</strong> · Protege tu racha si una semana no alcanzás tu meta.</span></div>
  </section>
}

function MemberHome({ onScreen }: { onScreen: (screen: MemberScreen) => void }) {
  return <>
    <header className="mobile-header member-home-header"><div><p className="eyebrow">Potencia Fitness · Villa Crespo</p><h2>¡Hola, María!</h2></div><button className="mobile-bell" aria-label="Notificaciones"><Bell /><span /></button></header>
    <div className="member-scroll">
      <section className="membership-mobile membership-priority"><div><p className="membership-kicker">MEMBRESÍA ACTIVA</p><h3>Plan 3x semana</h3><p className="membership-expiry">Vence el 30/09/2026</p></div><div className="mini-y" aria-hidden="true">Y</div></section>
      <div className="mobile-section-heading"><div><p className="member-label">HOY, LUNES 7 DE SEPTIEMBRE</p><h2>Tu entrenamiento</h2></div><button onClick={() => onScreen('workout')}>Ver rutina</button></div>
      <section className="workout-card-mobile workout-priority"><div className="workout-card-top"><span className="tag tag-blue">FUERZA A</span><span className="workout-duration">55 min</span></div><h3>Fuerza e hipertrofia</h3><p>6 ejercicios · Tren superior</p><div className="workout-card-footer"><div className="exercise-summary"><Dumbbell /><span>6 ejercicios</span></div><button className="primary-button member-cta" onClick={() => onScreen('workout')}><Play data-icon="inline-start" />Comenzar entrenamiento</button></div></section>
      <StreakCard onOpen={() => onScreen('streak')} />
      <section className="member-card progress-summary"><div className="member-card-heading"><div><p className="member-label">ESTA SEMANA</p><h2>Tu progreso</h2></div><button className="card-link">Ver progreso <ChevronRight /></button></div><div className="progress-summary-grid"><div><strong>3</strong><span>Entrenamientos</span></div><div><strong>3</strong><span>Asistencias</span></div><div><strong>12.4k</strong><span>Volumen total</span></div></div></section>
    </div>
    <MobileBottomNavigation active="Inicio" onSelect={() => undefined} />
  </>
}

function StreakDetail({ onBack }: { onBack: () => void }) {
  return <><MobileHeader title="Tu constancia" onBack={onBack} /><div className="member-scroll detail-scroll"><section className="streak-hero"><span className="streak-flame streak-flame-large"><Flame /></span><p className="member-label">RACHA ACTUAL</p><h2>4 semanas</h2><p>Llevás 4 semanas cumpliendo tu objetivo.</p></section><section className="member-card streak-detail-card"><div className="member-card-heading"><div><p className="member-label">META SEMANAL</p><h2>3 días por semana</h2></div><strong className="completed-count">3 / 3</strong></div><WeeklyProgress /><div className="streak-stats"><div><strong>8 semanas</strong><span>Mejor racha</span></div><div><strong><Snowflake /> 1</strong><span>Freeze disponible</span></div></div></section><section className="member-card explanation-card"><h2>¿Cómo funciona?</h2><p>Un Freeze protege tu racha si una semana no alcanzás tu meta.</p><div className="streak-state"><span className="state-dot state-complete"><Check /></span><div><strong>Semana completada</strong><span>Alcanzaste 3 días esta semana.</span></div></div></section></div><MobileBottomNavigation active="Progreso" onSelect={() => undefined} /></>
}

function ActiveWorkout({ onBack }: { onBack: () => void }) {
  return <><MobileHeader title="Press de banca" onBack={onBack} /><div className="member-scroll workout-scroll"><div className="workout-step"><span>Ejercicio 2 de 6</span><strong>33%</strong></div><div className="workout-progress-line"><div /></div><div className="active-exercise-visual"><Dumbbell /><p>PECHO · BARRA OLÍMPICA</p></div><div className="exercise-title"><h2>Press de banca</h2><p>Completá las series con control.</p></div><div className="series-table"><div className="series-head"><span>Serie</span><span>Kg</span><span>Reps</span><span>Estado</span></div>{[['1','50','10',true],['2','50','10',true],['3','55','',false]].map(([set, kg, reps, done]) => <div className="series-row" key={set as string}><strong>{set as string}</strong><input aria-label={`Peso serie ${set}`} defaultValue={kg as string} /><input aria-label={`Repeticiones serie ${set}`} defaultValue={reps as string} placeholder="—" /><span className={done ? 'set-done' : 'set-open'}>{done ? <><Check /> Listo</> : 'Pendiente'}</span></div>)}</div><div className="rest-card"><div><p>Descanso sugerido</p><strong>01:30</strong></div><span>Timer</span></div></div><div className="workout-sticky-actions"><button className="secondary-button" onClick={onBack}>Anterior</button><button className="primary-button">Guardar serie <ChevronRight /></button></div></>
}

function MobileBottomNavigation({ active, onSelect }: { active: string; onSelect: (item: string) => void }) {
  const items = [
    { label: 'Inicio', icon: House },
    { label: 'Entrenar', icon: Dumbbell },
    { label: 'Progreso', icon: ChartNoAxesColumnIncreasing },
    { label: 'Beneficios', icon: Gift },
    { label: 'Perfil', icon: UserRound },
  ]

  return <nav className="mobile-bottom-nav" aria-label="Navegación del socio">{items.map(({ label, icon: Icon }) => <button key={label} className={active === label ? 'bottom-nav-active' : ''} onClick={() => onSelect(label)} aria-current={active === label ? 'page' : undefined}><Icon aria-hidden="true" /><span>{label}</span></button>)}</nav>
}

export function MemberMobileHome() {
  const [screen, setScreen] = useState<MemberScreen>('home')
  return <div className="mobile-frame member-mobile-system">{screen === 'home' && <MemberHome onScreen={setScreen} />}{screen === 'streak' && <StreakDetail onBack={() => setScreen('home')} />}{screen === 'workout' && <ActiveWorkout onBack={() => setScreen('home')} />}</div>
}

export default MemberMobileHome
