'use client'

import { useState } from 'react'
import { ArrowLeft, Bell, Check, ChartNoAxesColumnIncreasing, ChevronRight, Dumbbell, Flame, Gift, House, Play, Snowflake, UserRound } from 'lucide-react'
import { MemberTrainingRoutine } from '@/components/member-training-routine'

type MemberScreen = 'home' | 'streak' | 'workout' | 'training'

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

function MemberHome({ onScreen, onProgress, onBenefits }: { onScreen: (screen: MemberScreen) => void; onProgress?: () => void; onBenefits?: () => void }) {
  return <>
    <header className="mobile-header member-home-header"><div><p className="eyebrow">Potencia Fitness · Villa Crespo</p><h2>¡Hola, María!</h2></div><button className="mobile-bell" aria-label="Notificaciones"><Bell /><span /></button></header>
    <div className="member-scroll">
      <section className="membership-mobile membership-priority"><div><p className="membership-kicker">MEMBRESÍA ACTIVA</p><h3>Plan 3x semana</h3><p className="membership-expiry">Vence el 30/09/2026</p></div><div className="mini-y" aria-hidden="true">Y</div></section>
      <div className="mobile-section-heading"><div><p className="member-label">HOY, LUNES 7 DE SEPTIEMBRE</p><h2>Tu entrenamiento</h2></div><button onClick={() => onScreen('workout')}>Ver rutina</button></div>
      <section className="workout-card-mobile workout-priority"><div className="workout-card-top"><span className="tag tag-blue">FUERZA A</span><span className="workout-duration">55 min</span></div><h3>Fuerza e hipertrofia</h3><p>6 ejercicios · Tren superior</p><div className="workout-card-footer"><div className="exercise-summary"><Dumbbell /><span>6 ejercicios</span></div><button className="primary-button member-cta" onClick={() => onScreen('workout')}><Play data-icon="inline-start" />Comenzar entrenamiento</button></div></section>
      <StreakCard onOpen={() => onScreen('streak')} />
      <section className="member-card progress-summary"><div className="member-card-heading"><div><p className="member-label">ESTA SEMANA</p><h2>Tu progreso</h2></div><button className="card-link">Ver progreso <ChevronRight /></button></div><div className="progress-summary-grid"><div><strong>3</strong><span>Entrenamientos</span></div><div><strong>3</strong><span>Asistencias</span></div><div><strong>12.4k</strong><span>Volumen total</span></div></div></section>
    </div>
    <MobileBottomNavigation active="Inicio" onSelect={item => { if (item === 'Entrenar') onScreen('training'); if (item === 'Progreso') onProgress?.(); if (item === 'Beneficios') onBenefits?.() }} />
  </>
}

function StreakDetail({ onBack }: { onBack: () => void }) {
  return <><MobileHeader title="Tu constancia" onBack={onBack} /><div className="member-scroll detail-scroll"><section className="streak-hero"><span className="streak-flame streak-flame-large"><Flame /></span><p className="member-label">RACHA ACTUAL</p><h2>4 semanas</h2><p>Llevás 4 semanas cumpliendo tu objetivo.</p></section><section className="member-card streak-detail-card"><div className="member-card-heading"><div><p className="member-label">META SEMANAL</p><h2>3 días por semana</h2></div><strong className="completed-count">3 / 3</strong></div><WeeklyProgress /><div className="streak-stats"><div><strong>8 semanas</strong><span>Mejor racha</span></div><div><strong><Snowflake /> 1</strong><span>Freeze disponible</span></div></div></section><section className="member-card explanation-card"><h2>¿Cómo funciona?</h2><p>Un Freeze protege tu racha si una semana no alcanzás tu meta.</p><div className="streak-state"><span className="state-dot state-complete"><Check /></span><div><strong>Semana completada</strong><span>Alcanzaste 3 días esta semana.</span></div></div></section></div><MobileBottomNavigation active="Progreso" onSelect={() => undefined} /></>
}

function ActiveWorkout({ onBack }: { onBack: () => void }) {
  return <div className="active-workout-screen">
    <header className="active-workout-header">
      <button className="workout-exit-button" aria-label="Salir del entrenamiento" onClick={onBack}><ArrowLeft /></button>
      <div className="workout-progress-copy"><strong>3 / 7 ejercicios</strong><span>Fuerza A · Tren superior</span></div>
      <button className="workout-pause-button" aria-label="Pausar entrenamiento">Pausar</button>
    </header>
    <div className="active-workout-content">
      <div className="active-workout-progress" aria-label="Progreso del entrenamiento"><span /></div>
      <section className="active-exercise-heading" aria-labelledby="active-exercise-title">
        <p className="active-exercise-kicker">PECHO · BARRA OLÍMPICA</p>
        <h1 id="active-exercise-title">Press de banca</h1>
        <p>Controlá el movimiento y descansá cuando lo necesites.</p>
      </section>
      <section className="set-card" aria-labelledby="sets-title">
        <div className="set-card-heading"><div><p className="member-label">SERIES DE HOY</p><h2 id="sets-title">3 series · 8–10 reps</h2></div><Dumbbell aria-hidden="true" /></div>
        <div className="set-grid set-grid-head"><span>Serie</span><span>Kg</span><span>Reps</span><span>Estado</span></div>
        <div className="set-grid set-grid-row set-complete"><strong>1</strong><span>50 kg</span><span>10</span><span className="set-status"><Check aria-hidden="true" /> Lista</span></div>
        <div className="set-grid set-grid-row set-complete"><strong>2</strong><span>50 kg</span><span>10</span><span className="set-status"><Check aria-hidden="true" /> Lista</span></div>
        <div className="set-active-row"><div className="set-grid set-grid-row"><strong>3</strong><label><span className="sr-only">Peso en kilogramos, serie 3</span><input inputMode="decimal" aria-label="Peso en kilogramos, serie 3" defaultValue="55" /></label><label><span className="sr-only">Repeticiones, serie 3</span><input inputMode="numeric" aria-label="Repeticiones, serie 3" placeholder="—" /></label><span className="set-status set-pending">Pendiente</span></div><button className="save-set-button">Guardar serie <Check aria-hidden="true" /></button></div>
      </section>
      <section className="rest-timer-card" aria-label="Descanso opcional"><div className="rest-timer-icon" aria-hidden="true">01:30</div><div><p>Descanso opcional</p><strong>Timer activado</strong></div><button aria-label="Pausar timer de descanso">Pausar</button></section>
    </div>
    <div className="workout-sticky-actions"><button className="next-exercise-button">Siguiente ejercicio <ChevronRight aria-hidden="true" /></button></div>
  </div>
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

export function MemberMobileHome({ onProgress, onBenefits }: { onProgress?: () => void; onBenefits?: () => void }) {
  const [screen, setScreen] = useState<MemberScreen>('home')
  return <div className="mobile-frame member-mobile-system">{screen === 'home' && <MemberHome onScreen={setScreen} onProgress={onProgress} onBenefits={onBenefits} />}{screen === 'training' && <MemberTrainingRoutine onBack={() => setScreen('home')} onStart={() => setScreen('workout')} />}{screen === 'streak' && <StreakDetail onBack={() => setScreen('home')} />}{screen === 'workout' && <ActiveWorkout onBack={() => setScreen('home')} />}</div>
}

export default MemberMobileHome
