'use client'

import { useState } from 'react'
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  Dumbbell,
  Flame,
  HeartPulse,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Play,
  Plus,
  Search,
  Settings,
  Snowflake,
  Sparkles,
  Target,
  Users,
  WalletCards,
  X,
} from 'lucide-react'

type Role = 'admin' | 'trainer' | 'member'

const members = [
  { name: 'Juan Pérez', initials: 'JP', status: 'Activo', plan: 'Plan 3x semana', trainer: 'Luciano Romero', last: 'Hoy, 08:42', streak: '4 sem.' },
  { name: 'María González', initials: 'MG', status: 'Por vencer', plan: 'Pase libre', trainer: 'Sofía Benítez', last: 'Ayer, 19:10', streak: '8 sem.' },
  { name: 'Luciano Romero', initials: 'LR', status: 'Activo', plan: '12 accesos', trainer: '—', last: '05/09/2026', streak: '2 sem.' },
  { name: 'Camila Duarte', initials: 'CD', status: 'Sin membresía', plan: '—', trainer: 'Sofía Benítez', last: '03/09/2026', streak: '0 sem.' },
  { name: 'Tomás Acosta', initials: 'TA', status: 'Suspendido', plan: 'Plan 3x semana', trainer: 'Luciano Romero', last: '28/08/2026', streak: '6 sem.' },
]

const nav = [
  { label: 'Dashboard', icon: LayoutDashboard }, { label: 'Socios', icon: Users }, { label: 'Membresías', icon: WalletCards },
  { label: 'Asistencia', icon: CalendarDays }, { label: 'Entrenamiento', icon: Dumbbell }, { label: 'Entrenadores', icon: HeartPulse },
  { label: 'Fidelización', icon: Flame }, { label: 'Clases', icon: Activity }, { label: 'Reservas', icon: CalendarDays },
  { label: 'Tienda', icon: WalletCards }, { label: 'Estadísticas', icon: BarChart3 }, { label: 'Configuración', icon: Settings },
]

function Brand() {
  return <div className="flex items-center gap-3 px-2"><div className="brand-mark">Y</div><div><p className="font-semibold tracking-tight text-slate-950">YtuFit</p><p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Tu progreso</p></div></div>
}

function Status({ children }: { children: string }) {
  const tone = children === 'Activo' ? 'status-green' : children === 'Por vencer' ? 'status-orange' : children === 'Suspendido' ? 'status-red' : 'status-gray'
  return <span className={`status ${tone}`}><span className="status-dot" />{children}</span>
}

function AdminShell({ role, setRole }: { role: Role; setRole: (r: Role) => void }) {
  const [active, setActive] = useState('Dashboard')
  const [query, setQuery] = useState('')
  const [memberModal, setMemberModal] = useState(false)
  const isTrainer = role === 'trainer'
  const filtered = members.filter((member) => member.name.toLowerCase().includes(query.toLowerCase()))

  return <div className="admin-shell">
    <aside className="sidebar">
      <Brand />
      <div className="gym-switch"><div className="gym-avatar">PF</div><div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold text-slate-800">Potencia Fitness</p><p className="truncate text-[11px] text-slate-400">{isTrainer ? 'Vista entrenador' : 'Villa Crespo'}</p></div><ChevronDown className="size-4 text-slate-400" /></div>
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">{(isTrainer ? nav.filter((n) => ['Dashboard','Socios','Entrenamiento','Clases','Estadísticas'].includes(n.label)) : nav).map(({ label, icon: Icon }) => <button key={label} onClick={() => setActive(label)} className={`nav-item ${active === label ? 'nav-active' : ''}`}><Icon className="size-[17px]" />{label}{label === 'Estadísticas' && !isTrainer ? <span className="ml-auto rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-400">Pro</span> : null}</button>)}</nav>
      <div className="sidebar-foot"><div className="flex items-center gap-3"><div className="avatar avatar-purple">AG</div><div className="min-w-0"><p className="truncate text-xs font-semibold">Agustín García</p><p className="truncate text-[11px] text-slate-400">{isTrainer ? 'Trainer' : 'Gym Admin'}</p></div><MoreHorizontal className="ml-auto size-4 text-slate-400" /></div></div>
    </aside>
    <main className="admin-main">
      <header className="topbar"><button className="mobile-menu"><Menu className="size-5" /></button><div className="flex items-center gap-2 text-sm text-slate-400"><span>Potencia Fitness</span><span>/</span><span className="font-medium text-slate-700">{active}</span></div><div className="ml-auto flex items-center gap-2"><div className="search-box"><Search className="size-4 text-slate-400" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar..." /></div><button className="icon-button"><CircleHelp className="size-[18px]" /></button><button className="icon-button relative"><Bell className="size-[18px]" /><span className="notification-dot" /></button><button className="role-button" onClick={() => setRole(isTrainer ? 'admin' : 'trainer')}><span className="avatar avatar-purple avatar-small">AG</span><span className="hidden text-xs font-medium sm:block">{isTrainer ? 'Trainer' : 'Admin'}</span><ChevronDown className="size-3.5 text-slate-400" /></button></div></header>
      <div className="content-wrap">
        <div className="page-heading"><div><p className="eyebrow">{isTrainer ? 'Tu espacio de coaching' : 'Lunes, 7 de septiembre de 2026'}</p><h1>{isTrainer ? 'Hola, Agustín' : 'Buen día, Agustín'}</h1><p className="subtitle">{isTrainer ? 'Estos son tus socios y su progreso esta semana.' : 'Acá tenés lo más importante de tu gimnasio hoy.'}</p></div><button className="primary-button" onClick={() => setMemberModal(true)}><Plus className="size-4" />{isTrainer ? 'Nueva rutina' : 'Agregar socio'}</button></div>
        {active === 'Socios' || isTrainer ? <MembersView members={filtered} isTrainer={isTrainer} onAdd={() => setMemberModal(true)} /> : <Dashboard isTrainer={isTrainer} onAdd={() => setMemberModal(true)} />}
      </div>
    </main>
    {memberModal && <div className="modal-backdrop" onClick={() => setMemberModal(false)}><div className="modal-card" onClick={(e) => e.stopPropagation()}><div className="flex items-start justify-between"><div><p className="eyebrow">Nuevo registro</p><h2>{isTrainer ? 'Crear rutina' : 'Agregar socio'}</h2></div><button className="icon-button" onClick={() => setMemberModal(false)}><X className="size-4" /></button></div><div className="modal-fields"><label>Nombre completo<input placeholder="Ej. Juan Pérez" /></label><label>{isTrainer ? 'Objetivo' : 'Email'}<input placeholder={isTrainer ? 'Ej. Fuerza e hipertrofia' : 'nombre@email.com'} /></label><label>{isTrainer ? 'Ejercicios' : 'Membresía'}<select><option>{isTrainer ? 'Seleccionar ejercicios' : 'Plan 3x semana'}</option><option>Pase libre</option></select></label></div><div className="flex justify-end gap-2"><button className="secondary-button" onClick={() => setMemberModal(false)}>Cancelar</button><button className="primary-button" onClick={() => setMemberModal(false)}><Check className="size-4" />Guardar</button></div></div></div>}
  </div>
}

function Dashboard({ isTrainer, onAdd }: { isTrainer: boolean; onAdd: () => void }) {
  return <div className="flex flex-col gap-6"><div className="stats-grid">{(isTrainer ? [['Socios asignados','24','+3 este mes', Users],['Entrenamientos esta semana','38','+12%', Dumbbell],['Sin actividad','3','Requieren atención', Activity],['Rutinas activas','18','+2 esta semana', Target]] : [['Socios activos','248','+8.4%', Users],['Por vencer','18','En los próximos 7 días', WalletCards],['Asistencias hoy','86','+12.5% vs. ayer', CalendarDays],['Tasa semanal','78.4%','+4.2% vs. semana anterior', BarChart3]]).map(([title, value, hint, Icon]) => <div className="stat-card" key={title as string}><div className="flex items-start justify-between"><span className="stat-icon"><Icon className="size-4" /></span><ArrowUpRight className="size-4 text-emerald-500" /></div><p className="mt-5 text-sm text-slate-500">{title as string}</p><p className="stat-number">{value as string}</p><p className="text-xs text-slate-400">{hint as string}</p></div>)}</div><div className="dashboard-grid"><div className="panel chart-panel"><PanelHeading title="Asistencia" action="Últimos 7 días"/><div className="chart-legend"><span><i className="legend-dot bg-indigo-500" />Asistencias</span><span><i className="legend-dot bg-slate-200" />Capacidad</span></div><div className="chart"><div className="chart-lines"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div><div className="bars">{[62,78,54,88,72,95,68].map((h, i) => <div className="bar-group" key={i}><div className="bar-bg"><div className="bar-fill" style={{ height: `${h}%` }} /></div><span>{['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'][i]}</span></div>)}</div></div></div><div className="panel"><PanelHeading title="Alertas" action="Ver todas"/><div className="alert-list"><AlertItem color="orange" title="18 membresías por vencer" detail="Revisar antes del 14/09" /><AlertItem color="blue" title="4 solicitudes pendientes" detail="Nuevos ingresos de esta semana" /><AlertItem color="red" title="3 socios sin actividad" detail="Hace más de 14 días" /></div></div></div><div className="bottom-grid"><div className="panel"><PanelHeading title="Actividad reciente" action="Ver historial"/><div className="activity-list"><ActivityItem icon="check" title="Juan Pérez registró asistencia" detail="Hoy, 08:42 · Manual" /><ActivityItem icon="user" title="Nueva socia: Camila Duarte" detail="Ayer, 18:30 · Plan 3x semana" /><ActivityItem icon="dumbbell" title="Rutina asignada a María González" detail="Ayer, 16:12 · Por Sofía Benítez" /><ActivityItem icon="wallet" title="Membresía renovada: Tomás Acosta" detail="Ayer, 14:05 · Pase libre" /></div></div><div className="panel"><PanelHeading title="Acciones rápidas"/><div className="quick-actions"><button onClick={onAdd}><span className="quick-icon purple"><Plus /></span><span><b>Agregar socio</b><small>Cargar sus datos</small></span><ArrowUpRight /></button><button><span className="quick-icon blue"><CalendarDays /></span><span><b>Registrar asistencia</b><small>Ingreso manual</small></span><ArrowUpRight /></button><button><span className="quick-icon coral"><Dumbbell /></span><span><b>Crear rutina</b><small>Desde cero o plantilla</small></span><ArrowUpRight /></button></div></div></div></div>
}

function MembersView({ members, isTrainer, onAdd }: { members: typeof members; isTrainer: boolean; onAdd: () => void }) {
  return <div className="flex flex-col gap-5"><div className="filter-row"><div className="filter-search"><Search className="size-4 text-slate-400" /><input placeholder="Buscar por nombre..." /></div><button className="filter-button">Estado <ChevronDown /></button><button className="filter-button hidden md:flex">Membresía <ChevronDown /></button><button className="filter-button hidden lg:flex">Entrenador <ChevronDown /></button><button className="filter-button ml-auto">Filtros <span className="filter-count">2</span></button></div><div className="panel overflow-hidden"><div className="table-toolbar"><div><h2>{isTrainer ? 'Mis socios' : 'Socios'}</h2><p>{members.length} personas en tu gimnasio</p></div><button className="primary-button" onClick={onAdd}><Plus className="size-4" />Agregar socio</button></div><div className="table-wrap"><table><thead><tr><th>Socio</th><th>Estado</th><th>Membresía</th><th>{isTrainer ? 'Rutina' : 'Entrenador'}</th><th>Última asistencia</th><th>Streak</th><th /></tr></thead><tbody>{members.map((member) => <tr key={member.name}><td><div className="flex items-center gap-3"><div className="avatar">{member.initials}</div><div><p className="font-medium text-slate-800">{member.name}</p><p className="text-xs text-slate-400">ID #YT-{member.initials}24</p></div></div></td><td><Status>{member.status}</Status></td><td><span className="text-sm text-slate-600">{member.plan}</span></td><td><span className="text-sm text-slate-600">{isTrainer ? 'Fuerza · 4 días' : member.trainer}</span></td><td><span className="text-sm text-slate-500">{member.last}</span></td><td><span className="inline-flex items-center gap-1 text-sm font-medium text-orange-500"><Flame className="size-3.5" />{member.streak}</span></td><td><button className="icon-button"><MoreHorizontal className="size-4" /></button></td></tr>)}</tbody></table></div></div></div>
}

function PanelHeading({ title, action }: { title: string; action?: string }) { return <div className="panel-heading"><h2>{title}</h2>{action && <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">{action}<ChevronDown className="ml-1 inline size-3" /></button>}</div> }
function AlertItem({ color, title, detail }: { color: string; title: string; detail: string }) { return <div className="alert-item"><span className={`alert-icon ${color}`}>{color === 'orange' ? <WalletCards /> : color === 'blue' ? <Users /> : <Activity />}</span><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-slate-700">{title}</p><p className="text-xs text-slate-400">{detail}</p></div><ArrowUpRight className="size-4 text-slate-300" /></div> }
function ActivityItem({ icon, title, detail }: { icon: string; title: string; detail: string }) { return <div className="activity-item"><span className="activity-icon">{icon === 'check' ? <Check /> : icon === 'user' ? <Users /> : icon === 'dumbbell' ? <Dumbbell /> : <WalletCards />}</span><div><p className="text-sm font-medium text-slate-700">{title}</p><p className="text-xs text-slate-400">{detail}</p></div></div> }

function MemberMobile() {
  const [tab, setTab] = useState('Inicio')
  const [workout, setWorkout] = useState(false)
  if (workout) return <div className="mobile-frame"><div className="mobile-top"><button onClick={() => setWorkout(false)} className="mobile-back">‹</button><span>Entrenamiento activo</span><span className="text-xs text-slate-400">12:48</span></div><div className="workout-progress"><div style={{ width: '43%' }} /><span>3 de 7 ejercicios</span></div><div className="workout-hero"><div className="exercise-visual"><Dumbbell /></div><p className="eyebrow">Ejercicio 3</p><h2>Press banca</h2><p className="text-sm text-slate-500">Pecho · Barra olímpica</p></div><div className="set-list"><div className="set-header"><span>Serie</span><span>Kg</span><span>Reps</span><span>Estado</span></div>{[['1','50','10',true],['2','50','10',true],['3','55','—',false]].map(([set, kg, reps, done]) => <div className="set-row" key={set as string}><b>{set as string}</b><span>{kg as string}</span><span>{reps as string}</span><span className={done ? 'set-done' : 'set-open'}>{done ? <Check /> : 'Registrar'}</span></div>)}</div><div className="rest-card"><div><p className="text-xs font-medium text-slate-500">Descanso sugerido</p><p className="text-xl font-semibold text-slate-800">01:30</p></div><button className="secondary-button">Iniciar timer</button></div><div className="mobile-bottom-action"><button className="primary-button w-full justify-center" onClick={() => setWorkout(false)}>Siguiente ejercicio <ArrowUpRight className="size-4" /></button></div></div>
  return <div className="mobile-frame"><div className="mobile-header"><div><p className="eyebrow">Potencia Fitness · Villa Crespo</p><h2>Hola, Juan</h2></div><button className="mobile-bell"><Bell /><span /></button></div><div className="mobile-scroll"><div className="membership-mobile"><div><p className="text-xs font-medium text-indigo-100">MEMBRESÍA ACTIVA</p><h3>Plan 3x semana</h3><p className="mt-2 text-xs text-indigo-100">Vence el 28/09/2026</p></div><div className="mini-y">Y</div></div><div className="mobile-section-heading"><h3>Tu entrenamiento</h3><button>Ver rutina</button></div><div className="workout-card-mobile"><div className="workout-card-top"><span className="tag tag-blue">HOY · DÍA B</span><span className="text-xs text-slate-400">45 min</span></div><h3>Fuerza e hipertrofia</h3><p>7 ejercicios · Tren superior</p><div className="workout-card-footer"><div className="exercise-avatars"><span>BP</span><span>RD</span><span>FC</span><span>+4</span></div><button className="primary-button" onClick={() => setWorkout(true)}><Play className="size-3.5 fill-current" />Comenzar</button></div></div><div className="streak-mobile"><div className="flex items-start justify-between"><div className="flex items-center gap-3"><span className="streak-flame"><Flame /></span><div><p className="text-sm font-semibold text-slate-800">Tu constancia</p><p className="text-xs text-slate-400">Racha actual</p></div></div><span className="text-right"><b className="block text-2xl text-orange-500">4</b><small className="text-[10px] text-slate-400">semanas</small></span></div><div className="week-days">{['L','M','X','J','V','S','D'].map((day, i) => <div key={day}><span className={i < 4 ? 'day-done' : i === 4 ? 'day-today' : ''}>{i < 4 ? <Check /> : day}</span><small>{day}</small></div>)}</div><div className="flex items-center justify-between border-t border-orange-100 pt-3 text-xs"><span className="text-slate-500">Meta semanal <b className="text-slate-800">3 / 3 días</b></span><span className="flex items-center gap-1 font-medium text-blue-500"><Snowflake className="size-3.5" />1 freeze disponible</span></div></div><div className="mobile-section-heading mt-6"><h3>Tu progreso</h3><button onClick={() => setTab('Progreso')}>Ver todo</button></div><div className="progress-mini"><div><p>Entrenamientos</p><b>12</b><span>este mes</span></div><div><p>Asistencias</p><b>18</b><span>este mes</span></div><div><p>Mejor racha</p><b>8</b><span>semanas</span></div></div></div><div className="mobile-nav">{[['Inicio',LayoutDashboard],['Entrenar',Dumbbell],['Progreso',BarChart3],['Beneficios',Sparkles],['Perfil',Users]].map(([label, Icon]) => <button key={label as string} className={tab === label ? 'mobile-nav-active' : ''} onClick={() => setTab(label as string)}><Icon /><span>{label as string}</span></button>)}</div></div>
}

export default function Page() {
  const [role, setRole] = useState<Role>('admin')
  return role === 'member' ? <div className="member-stage"><div className="surface-switcher"><button className="brand-mark">Y</button><button onClick={() => setRole('admin')}>Admin Web</button><button onClick={() => setRole('trainer')}>Trainer Web</button><button className="switch-active">Member Mobile</button></div><MemberMobile /></div> : <><AdminShell role={role} setRole={setRole} /><button className="floating-member" onClick={() => setRole('member')}><span className="brand-mark">Y</span> Ver Member Mobile <ArrowUpRight /></button></>
}
