'use client'

import { useState } from 'react'
import { Check, ChevronDown, Copy, Edit3, MoreHorizontal, Plus, Search, ToggleLeft, X } from 'lucide-react'

type AccessType = 'weekly' | 'monthly' | 'total' | 'unlimited'
type Plan = { name: string; price: string; duration: string; access: string; accessType: AccessType; members: number; active: boolean }

const initialPlans: Plan[] = [
  { name: 'Plan 3x semana', price: '$25.000', duration: '30 días', access: '3 veces por semana', accessType: 'weekly', members: 68, active: true },
  { name: 'Plan 5x semana', price: '$32.000', duration: '30 días', access: '5 veces por semana', accessType: 'weekly', members: 41, active: true },
  { name: 'Pase libre', price: '$38.000', duration: '30 días', access: 'Acceso ilimitado', accessType: 'unlimited', members: 73, active: true },
  { name: '12 accesos', price: '$22.000', duration: '30 días', access: '12 accesos mensuales', accessType: 'monthly', members: 19, active: true },
  { name: '20 accesos', price: '$35.000', duration: '60 días', access: '20 accesos totales', accessType: 'total', members: 13, active: true },
  { name: 'Plan prueba', price: '$15.000', duration: '15 días', access: '3 veces por semana', accessType: 'weekly', members: 0, active: false },
  { name: 'Plan corporativo', price: '$45.000', duration: '30 días', access: 'Acceso ilimitado', accessType: 'unlimited', members: 0, active: false },
]

const accessOptions: { value: AccessType; label: string; hint: string }[] = [
  { value: 'weekly', label: 'Frecuencia semanal', hint: 'Accesos por semana' },
  { value: 'monthly', label: 'Límite mensual', hint: 'Accesos por mes' },
  { value: 'total', label: 'Cantidad de accesos', hint: 'Accesos totales' },
  { value: 'unlimited', label: 'Pase libre', hint: 'Sin límite de accesos' },
]

function accessLabel(type: AccessType, quantity: string) {
  if (type === 'weekly') return `${quantity || '3'} veces por semana`
  if (type === 'monthly') return `${quantity || '12'} accesos mensuales`
  if (type === 'total') return `${quantity || '20'} accesos totales`
  return 'Acceso ilimitado'
}

function PlanMenu({ plan, onToggle }: { plan: Plan; onToggle: () => void }) {
  return <details className="plan-menu"><summary aria-label={`Acciones para ${plan.name}`}><MoreHorizontal /></summary><div className="plan-menu-popover"><button><Edit3 />Editar</button><button><Copy />Duplicar</button><button onClick={onToggle}><ToggleLeft />{plan.active ? 'Desactivar' : 'Activar'}</button></div></details>
}

function NewPlanSheet({ onClose, onCreate }: { onClose: () => void; onCreate: (plan: Plan) => void }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('25000')
  const [duration, setDuration] = useState('30')
  const [type, setType] = useState<AccessType>('weekly')
  const [quantity, setQuantity] = useState('3')
  const access = accessLabel(type, quantity)
  const valid = name.trim().length > 0 && Number(price) >= 0 && Number(duration) > 0 && (type === 'unlimited' || Number(quantity) > 0)
  return <div className="plan-sheet-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}><section className="plan-sheet" role="dialog" aria-modal="true" aria-labelledby="new-plan-title"><div className="plan-sheet-header"><div><p className="eyebrow">Planes de membresía</p><h2 id="new-plan-title">Nuevo plan</h2></div><button className="icon-button" onClick={onClose} aria-label="Cerrar"><X /></button></div><div className="plan-form"><div className="plan-form-section"><p className="plan-form-label">Información general</p><label>Nombre<input value={name} onChange={event => setName(event.target.value)} placeholder="Ej. Plan 3x semana" /></label><label>Descripción opcional<textarea placeholder="Contá qué incluye este plan" /></label><div className="plan-form-row"><label>Precio (ARS)<input type="number" min="0" value={price} onChange={event => setPrice(event.target.value)} /></label><label>Duración (días)<input type="number" min="1" value={duration} onChange={event => setDuration(event.target.value)} /></label></div></div><div className="plan-form-section"><p className="plan-form-label">Tipo de acceso</p><div className="access-options">{accessOptions.map(option => <button type="button" key={option.value} className={type === option.value ? 'access-option access-option-active' : 'access-option'} onClick={() => setType(option.value)}><span>{type === option.value ? <Check /> : <span className="access-radio" />}</span><strong>{option.label}</strong><small>{option.hint}</small></button>)}</div>{type !== 'unlimited' && <label className="quantity-field">Cantidad<input type="number" min="1" value={quantity} onChange={event => setQuantity(event.target.value)} /></label>}</div><div className="plan-preview"><p className="eyebrow">Vista previa</p><div><strong>{name || 'Nombre del plan'}</strong><b>{price ? `$${Number(price).toLocaleString('es-AR')}` : '$0'}</b></div><span>{duration || '0'} días <i /> {access}</span></div></div><div className="plan-sheet-footer"><button className="secondary-button" onClick={onClose}>Cancelar</button><button className="primary-button" disabled={!valid} onClick={() => onCreate({ name, price: `$${Number(price).toLocaleString('es-AR')}`, duration: `${duration} días`, access, accessType: type, members: 0, active: true })}><Plus />Crear plan</button></div></section></div>
}

export function MembershipPlansModule({ onBackToMemberships }: { onBackToMemberships: () => void }) {
  const [plans, setPlans] = useState(initialPlans)
  const [sheet, setSheet] = useState(false)
  const [query, setQuery] = useState('')
  const filtered = plans.filter(plan => plan.name.toLowerCase().includes(query.toLowerCase()))
  const togglePlan = (name: string) => setPlans(current => current.map(plan => plan.name === name ? { ...plan, active: !plan.active } : plan))
  return <div className="plans-module"><div className="page-heading"><div><p className="eyebrow">Potencia Fitness · Membresías</p><h1>Planes de membresía</h1><p className="subtitle">Configurá los planes disponibles para tus socios.</p></div><div className="plans-header-actions"><button className="secondary-button" onClick={onBackToMemberships}>Ver membresías</button><button className="primary-button" onClick={() => setSheet(true)}><Plus />Nuevo plan</button></div></div><div className="plans-summary"><div><span>Planes activos</span><strong>{plans.filter(plan => plan.active).length}</strong></div><div><span>Socios asignados</span><strong>214</strong></div><div><span>Planes inactivos</span><strong>{plans.filter(plan => !plan.active).length}</strong></div></div><div className="plans-toolbar"><div className="member-search"><Search /><input aria-label="Buscar planes" placeholder="Buscar plan" value={query} onChange={event => setQuery(event.target.value)} /></div><span className="plans-count">{filtered.length} planes configurados</span></div><div className="plans-grid">{filtered.map(plan => <article className={`plan-card ${!plan.active ? 'plan-card-inactive' : ''}`} key={plan.name}><div className="plan-card-top"><span className={`ytufit-status-badge ${plan.active ? 'ytufit-status-membership-active' : 'ytufit-status-membership-expired'}`}>{plan.active ? 'Activo' : 'Inactivo'}</span><PlanMenu plan={plan} onToggle={() => togglePlan(plan.name)} /></div><h2>{plan.name}</h2><div className="plan-price"><strong>{plan.price}</strong><span>ARS · {plan.duration}</span></div><div className={`plan-access plan-access-${plan.accessType}`}><span>{plan.accessType === 'unlimited' ? '∞' : plan.accessType === 'weekly' ? '↻' : plan.accessType === 'monthly' ? '◷' : '↗'}</span><div><small>Tipo de acceso</small><b>{plan.access}</b></div></div><div className="plan-card-footer"><span><strong>{plan.members}</strong> socios activos</span><span>{plan.duration}</span></div></article>)}</div>{sheet && <NewPlanSheet onClose={() => setSheet(false)} onCreate={plan => { setPlans(current => [plan, ...current]); setSheet(false) }} />}</div>
}
