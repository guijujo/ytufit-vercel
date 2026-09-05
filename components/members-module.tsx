'use client'

import { useMemo, useState } from 'react'
import { ArrowLeft, ChevronRight, Filter, MoreHorizontal, Search, UserPlus, X } from 'lucide-react'

const members = [
  { name: 'Luciano Romero', initials: 'LR', status: 'Activa', membership: 'Plan Pro', trainer: 'Sofía Martínez', last: '07/09/2026', streak: 5, tone: 'active' },
  { name: 'Camila Fernández', initials: 'CF', status: 'Por vencer', membership: 'Plan Plus', trainer: 'Diego Torres', last: '06/09/2026', streak: 3, tone: 'expiring' },
  { name: 'Martín González', initials: 'MG', status: 'Activa', membership: 'Plan Pro', trainer: 'Sofía Martínez', last: '05/09/2026', streak: 7, tone: 'active' },
  { name: 'Valentina Suárez', initials: 'VS', status: 'Vencida', membership: 'Plan Base', trainer: 'Sin asignar', last: '28/08/2026', streak: 0, tone: 'expired' },
  { name: 'Tomás Benítez', initials: 'TB', status: 'Activa', membership: 'Plan Plus', trainer: 'Diego Torres', last: '04/09/2026', streak: 4, tone: 'active' },
  { name: 'Julieta Acosta', initials: 'JA', status: 'Activa', membership: 'Plan Pro', trainer: 'Sofía Martínez', last: '03/09/2026', streak: 2, tone: 'active' },
]

const tabs = ['Resumen', 'Membresía', 'Asistencia', 'Entrenamiento', 'Progreso']

function Badge({ tone, children }: { tone: string; children: React.ReactNode }) { return <span className={`ytufit-status-badge ytufit-status-membership-${tone}`}>{children}</span> }

function MemberSummary({ member, onBack }: { member: typeof members[number]; onBack: () => void }) {
  const [tab, setTab] = useState('Resumen')
  return <div className="member-detail-shell">
    <button className="back-link" onClick={onBack}><ArrowLeft /> Volver a socios</button>
    <div className="member-detail-header"><div className="flex items-center gap-4"><div className="member-avatar member-avatar-large">{member.initials}</div><div><p className="eyebrow">Perfil del socio</p><h1>{member.name}</h1><p className="member-contact">{member.name.toLowerCase().replace(' ', '.')}@mail.com · +54 9 11 4567-8901</p></div></div><div className="member-header-status"><Badge tone={member.tone}>{member.status}</Badge><span>Socio desde marzo 2024</span></div></div>
    <div className="member-tabs" role="tablist">{tabs.map(item => <button key={item} role="tab" aria-selected={tab === item} className={tab === item ? 'member-tab-active' : ''} onClick={() => setTab(item)}>{item}</button>)}</div>
    {tab === 'Resumen' ? <div className="member-summary-grid"><div className="member-info-card"><p className="eyebrow">Membresía actual</p><h2>{member.membership}</h2><Badge tone={member.tone}>{member.status}</Badge><p className="card-muted">Vence el 30/09/2026 · ARS 32.000/mes</p></div><div className="member-info-card"><p className="eyebrow">Rutina activa</p><h2>Fuerza e hipertrofia</h2><p className="card-muted">4 sesiones semanales · Actualizada hace 3 días</p><button className="text-link">Ver rutina <ChevronRight /></button></div><div className="member-info-card"><p className="eyebrow">Profesor a cargo</p><div className="trainer-row"><div className="avatar avatar-purple">SM</div><div><h2>{member.trainer}</h2><p className="card-muted">Entrenadora personal</p></div></div><button className="text-link">Ver perfil <ChevronRight /></button></div><div className="member-info-card streak-detail-card"><div className="flex items-start justify-between"><div><p className="eyebrow">Racha de constancia</p><h2 className="streak-value">{member.streak} semanas</h2></div><span className="streak-mini-mark">{member.streak > 0 ? '↗' : '—'}</span></div><div className="streak-week">{['L','M','X','J','V','S','D'].map((day, i) => <span key={day} className={i < member.streak ? 'streak-day-done' : ''}>{i < member.streak ? '✓' : day}</span>)}</div><p className="card-muted">Objetivo semanal: 4 asistencias</p></div></div> : <div className="member-tab-placeholder"><p className="eyebrow">{tab}</p><h2>Información de {tab.toLowerCase()}</h2><p className="card-muted">Los datos de este módulo se mostrarán aquí.</p></div>}
  </div>
}

export function MembersModule() {
  const [selected, setSelected] = useState<typeof members[number] | null>(null)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('Todos los estados')
  const filtered = useMemo(() => members.filter(member => member.name.toLowerCase().includes(search.toLowerCase()) && (status === 'Todos los estados' || member.status === status)), [search, status])
  if (selected) return <MemberSummary member={selected} onBack={() => setSelected(null)} />
  return <div className="members-module"><div className="page-heading"><div><p className="eyebrow">Potencia Fitness · Gestión</p><h1>Socios <span className="count-pill">248</span></h1><p className="subtitle">Administrá los socios, sus membresías y actividad.</p></div><button className="primary-button"><UserPlus /> Agregar socio</button></div><div className="members-toolbar"><label className="member-search"><Search /><input aria-label="Buscar socios" placeholder="Buscar por nombre o email" value={search} onChange={e => setSearch(e.target.value)} /></label><select aria-label="Filtrar por estado" value={status} onChange={e => setStatus(e.target.value)}><option>Todos los estados</option><option>Activa</option><option>Por vencer</option><option>Vencida</option></select><button className="filter-button"><Filter /> Más filtros</button></div><div className="members-table-card"><div className="table-toolbar"><div><h2>Todos los socios</h2><p className="card-muted">{filtered.length} resultados visibles</p></div><button className="icon-button" aria-label="Más opciones"><MoreHorizontal /></button></div><div className="members-table-wrap"><table className="members-table"><thead><tr><th>Socio</th><th>Estado</th><th>Membresía</th><th>Entrenador</th><th>Última asistencia</th><th>Streak semanal</th><th aria-label="Acciones" /></tr></thead><tbody>{filtered.map(member => <tr key={member.name} onClick={() => setSelected(member)}><td><div className="member-name-cell"><div className="member-avatar">{member.initials}</div><div><strong>{member.name}</strong><span>{member.name.toLowerCase().replace(' ', '.')}@mail.com</span></div></div></td><td><Badge tone={member.tone}>{member.status}</Badge></td><td>{member.membership}</td><td>{member.trainer}</td><td>{member.last}</td><td><span className="table-streak">{member.streak > 0 ? `🔥 ${member.streak} sem.` : '—'}</span></td><td><button className="row-action" aria-label={`Ver a ${member.name}`} onClick={e => { e.stopPropagation(); setSelected(member) }}><ChevronRight /></button></td></tr>)}</tbody></table></div></div></div>
}
