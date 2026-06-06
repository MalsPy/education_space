import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Users, UserCheck, TrendingUp } from 'lucide-react'
import StatCard from '@/components/ui/StatCard'
import { courseService } from '@/services/courseService'
import { teacherService } from '@/services/teacherService'
import { leadService } from '@/services/leadService'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      courseService.list({ size: 1 }),
      teacherService.list({ size: 1 }),
      leadService.stats(),
    ]).then(([courses, teachers, leads]) => {
      setStats({
        courses: courses.total,
        teachers: teachers.total,
        leads,
      })
    }).finally(() => setLoading(false))
  }, [])

  const leadStats = stats?.leads || {}

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="page-title">Dashboard</h1>
        <p className="text-muted mt-1">Platform overview at a glance.</p>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        <StatCard icon={BookOpen} label="Total Courses" value={loading ? '…' : stats?.courses} color="primary" delay={0} />
        <StatCard icon={Users} label="Teachers" value={loading ? '…' : stats?.teachers} color="info" delay={0.08} />
        <StatCard icon={UserCheck} label="Total Leads" value={loading ? '…' : leadStats.total} color="success" delay={0.16} />
        <StatCard icon={TrendingUp} label="Registered" value={loading ? '…' : leadStats.registered} color="warning" delay={0.24} />
      </div>

      {/* Leads breakdown */}
      {!loading && stats && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="card p-6">
          <h2 className="font-display text-base font-semibold text-text mb-6">Leads Pipeline</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { key: 'new', label: 'New', color: 'bg-info' },
              { key: 'contacted', label: 'Contacted', color: 'bg-warning' },
              { key: 'registered', label: 'Registered', color: 'bg-success' },
              { key: 'rejected', label: 'Rejected', color: 'bg-danger' },
            ].map(({ key, label, color }) => {
              const val = leadStats[key] || 0
              const pct = leadStats.total ? Math.round((val / leadStats.total) * 100) : 0
              return (
                <div key={key} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">{label}</span>
                    <span className="text-text font-medium">{val}</span>
                  </div>
                  <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
                    <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-muted/60 text-xs">{pct}%</span>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}
    </div>
  )
}
