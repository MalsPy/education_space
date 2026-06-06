import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { courseService } from '@/services/courseService'
import { leadService } from '@/services/leadService'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Select } from '@/components/ui/Input'

export default function Apply() {
  const [params] = useSearchParams()
  const [courses, setCourses] = useState([])
  const [form, setForm] = useState({ name: '', phone: '', course_id: params.get('course') || '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    courseService.list({ active_only: true, size: 100 })
      .then((d) => setCourses(d.items || []))
      .catch(() => {})
  }, [])

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.phone.trim()) e.phone = 'Phone is required'
    return e
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length) return setErrors(e)
    setLoading(true)
    try {
      const payload = { name: form.name, phone: form.phone }
      if (form.course_id) payload.course_id = parseInt(form.course_id)
      await leadService.create(payload)
      setSuccess(true)
    } catch {
      setErrors({ submit: 'Something went wrong. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="card p-12 text-center max-w-md w-full glow-border">
          <div className="w-16 h-16 rounded-full bg-success/10 border border-success/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <h2 className="font-display text-2xl font-bold text-text mb-3">Application Received!</h2>
          <p className="text-muted leading-relaxed">
            Thanks for applying. Our team will reach out to you within 24 hours.
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-20">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl font-bold text-text mb-3">Apply Now</h1>
          <p className="text-muted">Fill out the form and we'll be in touch shortly.</p>
        </div>

        <div className="card p-8 flex flex-col gap-5">
          <Input
            label="Full Name"
            placeholder="John Doe"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            error={errors.name}
          />
          <Input
            label="Phone Number"
            placeholder="+1 555 000 0000"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            error={errors.phone}
          />
          {courses.length > 0 && (
            <Select
              label="Course (optional)"
              value={form.course_id}
              onChange={(e) => setForm({ ...form, course_id: e.target.value })}
            >
              <option value="">— Select a course —</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </Select>
          )}
          {errors.submit && <p className="text-sm text-danger">{errors.submit}</p>}
          <Button onClick={handleSubmit} loading={loading} size="lg" className="mt-2 w-full">
            Submit Application
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
