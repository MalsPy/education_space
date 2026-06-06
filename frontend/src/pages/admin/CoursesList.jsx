import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Pencil, Trash2, BookOpen } from 'lucide-react'
import { courseService } from '@/services/courseService'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import Table, { Pagination } from '@/components/ui/Table'
import { useAdminToast } from '@/components/layout/AdminLayout'
import CourseForm from './CourseForm'
import { formatDate } from '@/utils/formatters'

export default function CoursesList() {
  const toast = useAdminToast()
  const [data, setData] = useState({ items: [], total: 0, pages: 0 })
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [modal, setModal] = useState({ open: false, course: null })
  const [deleting, setDeleting] = useState(null)

  const load = () => {
    setLoading(true)
    courseService.list({ page, size: 10 })
      .then(setData)
      .finally(() => setLoading(false))
  }

  useEffect(load, [page])

  const handleDelete = async (id) => {
    if (!confirm('Delete this course?')) return
    setDeleting(id)
    try {
      await courseService.delete(id)
      toast.success('Course deleted')
      load()
    } catch {
      toast.error('Failed to delete course')
    } finally {
      setDeleting(null)
    }
  }

  const columns = [
    {
      key: 'title', label: 'Course',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-surface-2 border border-border flex items-center justify-center flex-shrink-0 overflow-hidden">
            {row.image_url
              ? <img src={row.image_url} alt="" className="w-full h-full object-cover" />
              : <BookOpen className="w-4 h-4 text-muted/40" />}
          </div>
          <span className="font-medium text-text line-clamp-1">{row.title}</span>
        </div>
      )
    },
    {
      key: 'is_active', label: 'Status',
      render: (row) => <Badge variant={row.is_active ? 'success' : 'default'}>{row.is_active ? 'Active' : 'Inactive'}</Badge>
    },
    { key: 'created_at', label: 'Created', render: (row) => <span className="text-muted">{formatDate(row.created_at)}</span> },
    {
      key: 'actions', label: '', className: 'w-24',
      render: (row) => (
        <div className="flex items-center gap-1">
          <button onClick={() => setModal({ open: true, course: row })}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:text-text hover:bg-surface-2 transition-colors">
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => handleDelete(row.id)} disabled={deleting === row.id}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:text-danger hover:bg-danger/10 transition-colors">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )
    },
  ]

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8">
        <div>
          <h1 className="page-title">Courses</h1>
          <p className="text-muted mt-1">{data.total} total courses</p>
        </div>
        <Button onClick={() => setModal({ open: true, course: null })}>
          <Plus className="w-4 h-4" /> New Course
        </Button>
      </motion.div>

      <div className="card p-6">
        <Table columns={columns} data={data.items} loading={loading} emptyText="No courses yet." />
        <Pagination page={page} pages={data.pages} onPage={setPage} />
      </div>

      <Modal open={modal.open} onClose={() => setModal({ open: false, course: null })}
        title={modal.course ? 'Edit Course' : 'New Course'} size="lg">
        <CourseForm
          course={modal.course}
          onSuccess={() => { setModal({ open: false, course: null }); load(); toast.success(modal.course ? 'Course updated' : 'Course created') }}
          onCancel={() => setModal({ open: false, course: null })}
        />
      </Modal>
    </div>
  )
}
