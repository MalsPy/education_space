import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, BookOpen, Users, UserCheck,
  LogOut, BookMarked,
} from 'lucide-react'
import { useAuth } from '@/features/auth/AuthContext'
import clsx from 'clsx'

const nav = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/courses', label: 'Courses', icon: BookOpen },
  { to: '/admin/teachers', label: 'Teachers', icon: Users },
  { to: '/admin/leads', label: 'Leads', icon: UserCheck },
]

export default function Sidebar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col bg-surface border-r border-border h-screen sticky top-0">
      {/* Logo */}
      <div className="px-6 h-16 flex items-center border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
            <BookMarked className="w-4 h-4 text-primary" />
          </div>
          <span className="font-display font-bold text-text text-sm">
            Education<span className="text-primary">Space</span>
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 flex flex-col gap-1 overflow-y-auto">
        <p className="text-muted/50 text-xs font-medium uppercase tracking-widest px-4 mb-3">Menu</p>
        {nav.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              clsx('sidebar-link', isActive && 'active')
            }
          >
            <Icon className="w-4 h-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-4 py-4 border-t border-border">
        <button onClick={handleLogout}
          className="sidebar-link w-full text-danger/70 hover:text-danger hover:bg-danger/10">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
