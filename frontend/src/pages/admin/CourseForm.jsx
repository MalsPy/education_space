import { useState } from 'react'
import { courseService } from '@/services/courseService'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Input'

export default function CourseForm({ course, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    title: course?.title || '',
    description: course?.description || '',
    image_url: course?.image_url || '',
    is_active: course?.is_active ?? true,
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.title.trim()) e.title = 'Title is required'
    if (!form.description.trim()) e.description = 'Description is required'
    return e
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length) return setErrors(e)
    setLoading(true)
    try {
      if (course) {
        await courseService.update(course.id, form)
      } else {
        await courseService.create(form)
      }
      onSuccess()
    } catch (err) {
      setErrors({ submit: err?.response?.data?.detail || 'Something went wrong' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <Input label="Title" placeholder="e.g. Full-Stack Web Development"
        value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
        error={errors.title} />
      <Textarea label="Description" placeholder="What will students learn?"
        value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
        error={errors.description} rows={4} />
      <Input label="Image URL (optional)" placeholder="https://..."
        value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
      <label className="flex items-center gap-3 cursor-pointer">
        <div className="relative">
          <input type="checkbox" className="sr-only" checked={form.is_active}
            onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />
          <div className={`w-10 h-6 rounded-full transition-colors ${form.is_active ? 'bg-primary' : 'bg-border'}`} />
          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${form.is_active ? 'translate-x-5' : 'translate-x-1'}`} />
        </div>
        <span className="text-sm text-muted">Active (visible to students)</span>
      </label>
      {errors.submit && <p className="text-sm text-danger">{errors.submit}</p>}
      <div className="flex gap-3 pt-2">
        <Button onClick={handleSubmit} loading={loading} className="flex-1">
          {course ? 'Save Changes' : 'Create Course'}
        </Button>
        <Button variant="secondary" onClick={onCancel} className="flex-1">Cancel</Button>
      </div>
    </div>
  )
}
