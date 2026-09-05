'use client'

import { useState } from 'react'
import { Check, ChartNoAxesColumnIncreasing, ChevronRight, Dumbbell, Gift, House, Lock, UserRound, X } from 'lucide-react'

type Benefit = { id: string; title: string; description: string; validity: string; tone: string; conditions: string; where: string; status: 'Disponible' | 'Utilizado' | 'Vencido' }

const benefits: Benefit[] = [
  { id: 'clothing', title: '10% en indumentaria', description: 'Tenés un 10% de descuento en productos seleccionados del gimnasio.', validity: '30 sep 2026', tone: 'benefit-purple', conditions: 'Válido para productos seleccionados. No acumulable con otras promociones.', where: 'Recepción de Potencia Fitness', status: 'Disponible' },
  { id: 'class', title: 'Clase especial sin cargo', description: 'Accedé a una clase especial durante este mes.', validity: '30 sep 2026', tone: 'benefit-blue', conditions: 'Reservá tu lugar en recepción con al menos 24 horas de anticipación.', where: 'Sala de clases · Villa Crespo', status: 'Disponible' },
  { id: 'assessment', title: 'Evaluación física', description: 'Accedé a una evaluación física sin cargo.', validity: '15 oct 2026', tone: 'benefit-orange', conditions: 'Una evaluación por socio. Coordiná el turno con tu entrenador.', where: 'Consultorio de evaluación', status: 'Disponible' },
  { id: 'birthday', title: 'Beneficio de cumpleaños', description: 'Tenemos un beneficio especial para vos este mes.', validity: '30 sep 2026', tone: 'benefit-green', conditions: 'Disponible durante el mes de tu cumpleaños.', where: 'Recepción de Potencia Fitness', status: 'Disponible' },
]

const achievements = [
  ['Primer entrenamiento', 'Completaste tu primer entrenamiento.', true], ['Primer mes activo', 'Completaste tu primer mes entrenando.', true], ['4 semanas de constancia', 'Mantuviste una racha de 4 semanas.', true], ['10 entrenamientos', 'Completaste 10 entrenamientos.', true], ['25 entrenamientos', 'Completá 25 entrenamientos.', false], ['8 semanas de constancia', 'Alcanzá una racha de 8 semanas.', false],
] as const

export function MemberBenefits({ onNavigate }: { onNavigate?: (item: string) => void }) {
  const [selected, setSelected] = useState<Benefit | null>(null)
  const [used, setUsed] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const open = (benefit: Benefit) => { setSelected(benefit); setUsed(false); setConfirmed(false) }
  return <div className="member-benefits-screen">
    <header className="benefits-header"><div><p className="eyebrow">POTENCIA FITNESS · VILLA CRESPO</p><h1>Tus beneficios</h1><p>Reconocemos tu constancia y progreso.</p></div><span className="benefits-header-mark"><Gift /></span></header>
    <div className="benefits-scroll">
      <section className="benefits-summary" aria-label="Resumen de beneficios"><div><strong>3</strong><span>Beneficios disponibles</span></div><div><strong>6</strong><span>Logros obtenidos</span></div><div><strong>4 semanas</strong><span>Racha actual</span></div></section>
      <section className="benefits-section"><div className="benefits-section-heading"><div><p className="member-label">PARA VOS</p><h2>Beneficios disponibles</h2></div><span className="benefit-count">3 disponibles</span></div><div className="benefits-grid">{benefits.map(benefit => <article className="benefit-card" key={benefit.id}><div className={`benefit-art ${benefit.tone}`}><Gift /></div><div className="benefit-card-content"><div className="benefit-card-top"><span className="ytufit-status-badge ytufit-status-membership-active">{benefit.status}</span><span className="benefit-validity">Hasta {benefit.validity}</span></div><h3>{benefit.title}</h3><p>{benefit.description}</p><button className="benefit-link" onClick={() => open(benefit)}>Ver beneficio <ChevronRight /></button></div></article>)}</div></section>
      <section className="benefits-section"><div className="benefits-section-heading"><div><p className="member-label">CONSTANCIA</p><h2>Tus logros</h2></div></div><div className="achievement-grid">{achievements.map(([title, description, obtained]) => <article className={`achievement-card ${obtained ? '' : 'achievement-locked'}`} key={title}><span className="achievement-icon">{obtained ? <Check /> : <Lock />}</span><div><h3>{title}</h3><p>{description}</p><span className={obtained ? 'achievement-status' : 'achievement-status locked'}>{obtained ? 'Obtenido' : 'Bloqueado'}</span></div></article>)}</div></section>
      <section className="benefits-section history-section"><div className="benefits-section-heading"><div><p className="member-label">RECIENTE</p><h2>Historial de beneficios</h2></div><button className="benefit-link">Ver todos <ChevronRight /></button></div><div className="benefit-history"><div><span>15 ago</span><strong>Batido proteico</strong><em>Utilizado</em></div><div><span>01 ago</span><strong>10% en indumentaria</strong><em>Utilizado</em></div></div></section>
    </div><nav className="mobile-bottom-nav benefits-nav" aria-label="Navegación del socio">{([{ label: 'Inicio', Icon: House }, { label: 'Entrenar', Icon: Dumbbell }, { label: 'Progreso', Icon: ChartNoAxesColumnIncreasing }, { label: 'Beneficios', Icon: Gift }, { label: 'Perfil', Icon: UserRound }]).map(({ label, Icon }) => <button key={label} className={label === 'Beneficios' ? 'bottom-nav-active' : ''} onClick={() => onNavigate?.(label)} aria-current={label === 'Beneficios' ? 'page' : undefined}><Icon aria-hidden="true" /><span>{label}</span></button>)}</nav>
    {selected && <div className="benefit-overlay" role="presentation" onClick={() => setSelected(null)}><aside className="benefit-drawer" role="dialog" aria-modal="true" aria-labelledby="benefit-title" onClick={event => event.stopPropagation()}><button className="drawer-close" onClick={() => setSelected(null)} aria-label="Cerrar"><X /></button>{confirmed ? <div className="benefit-confirmed"><span><Check /></span><h2>Beneficio utilizado.</h2><p>Podés presentarlo en {selected.where}.</p><button className="ytufit-button ytufit-button-primary" onClick={() => setSelected(null)}>Listo</button></div> : used ? <div className="benefit-confirmed"><span className="confirm-question">?</span><h2>¿Querés utilizar este beneficio?</h2><p>Al confirmar, quedará registrado como utilizado.</p><button className="ytufit-button ytufit-button-primary" onClick={() => setConfirmed(true)}>Confirmar uso</button></div> : <><div className={`benefit-art benefit-art-large ${selected.tone}`}><Gift /></div><span className="ytufit-status-badge ytufit-status-membership-active">{selected.status}</span><h2 id="benefit-title">{selected.title}</h2><p>{selected.description}</p><dl><div><dt>Condiciones</dt><dd>{selected.conditions}</dd></div><div><dt>Vigencia</dt><dd>{selected.validity}</dd></div><div><dt>Dónde utilizarlo</dt><dd>{selected.where}</dd></div></dl><button className="ytufit-button ytufit-button-primary benefit-use-button" onClick={() => setUsed(true)}>Usar beneficio</button></>}</aside></div>}
  </div>
}

export default MemberBenefits
