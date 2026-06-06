import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Pencil, Trash2, Users } from 'lucide-react'
import { teacherService } from '@/services/teacherService'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import Table, { Pagination } from '@/components/ui/Table'
import { useAdminToast } from '@/components/layout/AdminLayout'
import TeacherForm from './TeacherForm'
import { formatDate, getInitials } from '@/utils/formatters'

export default function TeachersList() {
  const toast = useAdminToast()
  const [data, setData] = useState({ items: [], total: 0, pages: 0 })
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [modal, setModal] = useState({ open: false, teacher: null })
  const [deleting, setDeleting] = useState(null)

  const load = () => {
    setLoading(true)
    teacherService.list({ page, size: 10 })
      .then(setData).finally(() => setLoading(false))
  }

  useEffect(load, [page])

  const handleDelete = async (id) => {
    if (!confirm('Delete this teacher?')) return
    setDeleting(id)
    try {
      await teacherService.delete(id)
      toast.success('Teacher deleted')
      load()
    } catch { toast.error('Failed to delete') }
    finally { setDeleting(null) }
  }

  const columns = [
    {
      key: 'name', label: 'Teacher',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {row.photo_url
              ? <img src={row.photo_url} alt="" className="w-full h-full object-cover" />
              : <span className="text-primary text-xs font-bold">{getInitials(row.name)}</span>}
          </div>
          <span className="font-medium text-text">{row.name}</span>
        </div>
      )
    },
    {
      key: 'bio', label: 'Bio',
      render: (row) => <span className="text-muted text-sm line-clamp-1 max-w-xs">{row.bio}</span>
    },
    { key: 'created_at', label: 'Added', render: (row) => <span className="text-muted">{formatDate(row.created_at)}</span> },
    {
      key: 'actions', label: '', className: 'w-24',
      render: (row) => (
        <div className="flex items-center gap-1">
          <button onClick={() => setModal({ open: true, teacher: row })}
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
          <h1 className="page-title">Teachers</h1>
          <p className="text-muted mt-1">{data.total} total teachers</p>
        </div>
        <Button onClick={() => setModal({ open: true, teacher: null })}>
          <Plus className="w-4 h-4" /> New Teacher
        </Button>
      </motion.div>
      <div className="card p-6">
        <Table columns={columns} data={data.items} loading={loading} emptyText="No teachers yet." />
        <Pagination page={page} pages={data.pages} onPage={setPage} />
      </div>
      <Modal open={modal.open} onClose={() => setModal({ open: false, teacher: null })}
        title={modal.teacher ? 'Edit Teacher' : 'New Teacher'}>
        <TeacherForm
          teacher={modal.teacher}
          onSuccess={() => { setModal({ open: false, teacher: null }); load(); toast.success(modal.teacher ? 'Teacher updated' : 'Teacher created') }}
          onCancel={() => setModal({ open: false, teacher: null })}
        />
      </Modal>
    </div>
  )
}
