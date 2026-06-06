import { useState } from 'react'
import { teacherService } from '@/services/teacherService'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Input'

export default function TeacherForm({ teacher, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    name: teacher?.name || '',
    bio: teacher?.bio || '',
    photo_url: teacher?.photo_url || '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.bio.trim()) e.bio = 'Bio is required'
    return e
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length) return setErrors(e)
    setLoading(true)
    try {
      if (teacher) {
        await teacherService.update(teacher.id, form)
      } else {
        await teacherService.create(form)
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
      <Input label="Full Name" placeholder="e.g. Jane Smith"
        value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
        error={errors.name} />
      <Textarea label="Bio" placeholder="Professional background and expertise..."
        value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })}
        error={errors.bio} rows={3} />
      <Input label="Photo URL (optional)" placeholder="https://..."
        value={form.photo_url} onChange={(e) => setForm({ ...form, photo_url: e.target.value })} />
      {errors.submit && <p className="text-sm text-danger">{errors.submit}</p>}
      <div className="flex gap-3 pt-2">
        <Button onClick={handleSubmit} loading={loading} className="flex-1">
          {teacher ? 'Save Changes' : 'Create Teacher'}
        </Button>
        <Button variant="secondary" onClick={onCancel} className="flex-1">Cancel</Button>
      </div>
    </div>
  )
}
