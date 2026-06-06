import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookMarked, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/features/auth/AuthContext'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/admin'

  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e?.preventDefault()
    if (!form.email || !form.password) return setError('Please fill in all fields.')
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err?.response?.data?.detail || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg bg-noise flex items-center justify-center px-6">
      {/* bg glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/8 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-sm"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 justify-center mb-10">
          <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
            <BookMarked className="w-5 h-5 text-primary" />
          </div>
          <span className="font-display text-xl font-bold text-text">
            Education<span className="text-primary">Space</span>
          </span>
        </div>

        <div className="card p-8 glow-border">
          <h1 className="font-display text-2xl font-bold text-text mb-1">Admin Login</h1>
          <p className="text-muted text-sm mb-8">Sign in to manage your platform.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Input
              label="Email"
              type="email"
              placeholder="admin@educationspace.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              autoFocus
            />
            <div className="flex flex-col gap-1.5">
              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-field pr-12"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-text transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-danger text-sm bg-danger/10 border border-danger/20 rounded-lg px-4 py-2.5">
                {error}
              </motion.p>
            )}

            <Button type="submit" loading={loading} size="lg" className="w-full mt-1">
              Sign In
            </Button>
          </form>
        </div>

        <p className="text-center text-muted/40 text-xs mt-6">
          Education Space Admin Panel
        </p>
      </motion.div>
    </div>
  )
}
