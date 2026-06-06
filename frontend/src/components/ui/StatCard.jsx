import { motion } from 'framer-motion'
import clsx from 'clsx'

export default function StatCard({ icon: Icon, label, value, sub, color = 'primary', delay = 0 }) {
  const colors = {
    primary: 'text-primary bg-primary/10',
    success: 'text-success bg-success/10',
    warning: 'text-warning bg-warning/10',
    info: 'text-info bg-info/10',
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="card p-6 flex items-center gap-5"
    >
      <div className={clsx('w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0', colors[color])}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-muted text-sm font-medium">{label}</p>
        <p className="text-text text-2xl font-display font-bold mt-0.5">{value ?? '—'}</p>
        {sub && <p className="text-muted text-xs mt-0.5">{sub}</p>}
      </div>
    </motion.div>
  )
}
