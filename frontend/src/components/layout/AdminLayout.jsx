import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useToast } from '@/hooks/useToast'
import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'

function ToastContainer({ toasts }) {
  const typeStyles = {
    success: 'border-success/30 bg-success/10 text-success',
    error: 'border-danger/30 bg-danger/10 text-danger',
    warning: 'border-warning/30 bg-warning/10 text-warning',
    info: 'border-info/30 bg-info/10 text-info',
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 w-80">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            className={clsx('px-4 py-3 rounded-xl border text-sm font-medium shadow-card', typeStyles[t.type])}
          >
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// Create a toast context so child pages can access it
import { createContext, useContext } from 'react'
export const ToastContext = createContext(null)
export const useAdminToast = () => useContext(ToastContext)

export default function AdminLayout() {
  const { toasts, toast } = useToast()

  return (
    <ToastContext.Provider value={toast}>
      <div className="flex h-screen bg-bg overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <Outlet />
          </div>
        </div>
        <ToastContainer toasts={toasts} />
      </div>
    </ToastContext.Provider>
  )
}
