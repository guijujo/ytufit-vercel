'use client'

import { useMemo, useState } from 'react'
import { ArrowLeft, BarChart3, CalendarCheck2, ChevronRight, Dumbbell, Filter, MoreHorizontal, Search, UserPlus } from 'lucide-react'

const members = [
  { name: 'Juan Pérez', initials: 'JP', status: 'Activa', membership: 'Plan Pro', trainer: 'Sofía Martínez', last: '07/09/2026', streak: 5, tone: 'active' },
  { name: 'Luciano Romero', initials: 'LR', status: 'Activa', membership: 'Plan Pro', trainer: 'Sofía Martínez', last: '07/09/2026', streak: 5, tone: 'active' },
  { name: 'Camila Fernández', initials: 'CF', status: 'Por vencer', membership: 'Plan Plus', trainer: 'Diego Torres', last: '06/09/2026', streak: 3, tone: 'expiring' },
  { name: 'Martín González', initials: 'MG', status: 'Activa', membership: 'Plan Pro', trainer: 'Sofía Martínez', last: '05/09/2026', streak: 7, tone: 'active' },
  { name: 'Valentina Suárez', initials: 'VS', status: 'Vencida', membership: 'Plan Base', trainer: 'Sin asignar', last: '28/08/2026', streak: 0, tone: 'expired' },
]

const tabs = ['Resumen', 'Membresía', 'Asistencia', 'Entrenamiento', 'Progreso']
type Member = typeof members[number]

function Badge({ tone, children }: { tone: string; children: React.ReactNode }) {
  return <span className={`ytufit-status-badge ytufit-status-membership-${tone}`}>{children}</span>
}

function SummaryCard({ eyebrow, title, children, action }: { eyebrow: string; title: string; children: React.ReactNode; action?: string }) {
  return <article className="member-info-card"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{children}{action && <button className="text-link">{action}<ChevronRight /></button>}</article>
}

function MemberDetail({ member, onBack }: { member: Member; onBack: () => void }) {
  const [tab, setTab] = useState('Resumen')
  return <div className="member-detail-shell">
    <button className="back-link" onClick={onBack}><ArrowLeft /> Volver a socios</button>
    <header className="member-detail-header">
      <div className="member-detail-identity"><div className="member-avatar member-avatar-large">{member.initials}</div><div><p className="eyebrow">Perfil del socio · ID YF-0248</p><h1>{member.name}</h1><p className="member-contact">juan.perez@mail.com · +54 9 11 4567-8901 · Socio desde marzo 2024</p></div></div>
      <div className="member-header-status"><Badge tone={member.tone}>{member.status}</Badge><span>Última actividad: hoy, 08:42</span></div>
    </header>
    <div className="member-tabs" role="tablist" aria-label="Secciones del socio">{tabs.map(item => <button key={item} role="tab" aria-selected={tab === item} className={tab === item ? 'member-tab-active' : ''} onClick={() => setTab(item)}>{item}</button>)}</div>
    {tab === 'Resumen' ? <>
      <div className="member-summary-grid">
        <SummaryCard eyebrow="Membresía actual" title={member.membership}><Badge tone={member.tone}>{member.status}</Badge><p className="card-muted">Vence el 30/09/2026 · ARS 32.000/mes</p></SummaryCard>
        <SummaryCard eyebrow="Rutina activa" title="Fuerza e hipertrofia" action="Ver rutina"><p className="card-muted">4 sesiones semanales · Actualizada hace 3 días</p></SummaryCard>
        <SummaryCard eyebrow="Profesor a cargo" title={member.trainer} action="Ver perfil"><div className="trainer-row"><div className="avatar avatar-purple">SM</div><p className="card-muted">Entrenadora personal</p></div></SummaryCard>
        <article className="member-info-card streak-detail-card"><div className="member-card-heading"><div><p className="eyebrow">Racha de constancia</p><h2 className="streak-value">{member.streak} semanas</h2></div><span className="streak-mini-mark">↗</span></div><div className="streak-week">{['L','M','X','J','V','S','D'].map((day, i) => <span key={day} className={i < 5 ? 'streak-day-done' : ''}>{i < 5 ? '✓' : day}</span>)}</div><p className="card-muted">Objetivo semanal: 4 asistencias</p></article>
      </div>
      <section className="member-activity-panel"><div className="panel-heading"><div><p className="eyebrow">Seguimiento</p><h2>Actividad reciente</h2></div><button className="text-link">Ver todo<ChevronRight /></button></div><div className="member-activity-list"><div><span className="activity-icon"><CalendarCheck2 /></span><p><strong>Sesión completada</strong><small>Hoy, 08:42 · Tren superior</small></p></div><div><span className="activity-icon"><Dumbbell /></span><p><strong>Rutina actualizada</strong><small>Hace 3 días · Sofía Martínez</small></p></div><div><span className="activity-icon"><BarChart3 /></span><p><strong>Progreso registrado</strong><small>Hace 1 semana · +8% de fuerza</small></p></div></div></section>
    </> : <div className="member-tab-placeholder"><p className="eyebrow">{tab}</p><h2>Información de {tab.toLowerCase()}</h2><p className="card-muted">Los datos de este módulo se mostrarán aquí.</p></div>}
  </div>
}

export function MembersModule() {
  const [selected, setSelected] = useState<Member | null>(null)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('Todos los estados')
  const filtered = useMemo(() => members.filter(member => member.name.toLowerCase().includes(search.toLowerCase()) && (status === 'Todos los estados' || member.status === status)), [search, status])
  if (selected) return <MemberDetail member={selected} onBack={() => setSelected(null)} />
  return <div className="members-module"><div className="page-heading"><div><p className="eyebrow">Potencia Fitness · Gestión</p><h1>Socios <span className="count-pill">248</span></h1><p className="subtitle">Administrá los socios, sus membresías y actividad.</p></div><button className="primary-button"><UserPlus /> Agregar socio</button></div><div className="members-toolbar"><label className="member-search"><Search /><input aria-label="Buscar socios" placeholder="Buscar por nombre o email" value={search} onChange={e => setSearch(e.target.value)} /></label><select aria-label="Filtrar por estado" value={status} onChange={e => setStatus(e.target.value)}><option>Todos los estados</option><option>Activa</option><option>Por vencer</option><option>Vencida</option></select><button className="filter-button"><Filter /> Más filtros</button></div><div className="members-table-card"><div className="table-toolbar"><div><h2>Todos los socios</h2><p className="card-muted">{filtered.length} resultados visibles</p></div><button className="icon-button" aria-label="Más opciones"><MoreHorizontal /></button></div><div className="members-table-wrap"><table className="members-table"><thead><tr><th>Socio</th><th>Estado</th><th>Membresía</th><th>Entrenador</th><th>Última asistencia</th><th>Streak semanal</th><th aria-label="Acciones" /></tr></thead><tbody>{filtered.map(member => <tr key={member.name} onClick={() => setSelected(member)}><td><div className="member-name-cell"><div className="member-avatar">{member.initials}</div><div><strong>{member.name}</strong><span>{member.name.toLowerCase().replace(' ', '.')}@mail.com</span></div></div></td><td><Badge tone={member.tone}>{member.status}</Badge></td><td>{member.membership}</td><td>{member.trainer}</td><td>{member.last}</td><td><span className="table-streak">{member.streak > 0 ? `🔥 ${member.streak} sem.` : '—'}</span></td><td><button className="row-action" aria-label={`Ver a ${member.name}`} onClick={e => { e.stopPropagation(); setSelected(member) }}><ChevronRight /></button></td></tr>)}</tbody></table></div></div></div>
}
