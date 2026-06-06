import api from './api'

export const leadService = {
  list: (params = {}) => api.get('/leads', { params }).then((r) => r.data),
  get: (id) => api.get(`/leads/${id}`).then((r) => r.data),
  create: (data) => api.post('/leads', data).then((r) => r.data),
  update: (id, data) => api.patch(`/leads/${id}`, data).then((r) => r.data),
  updateStatus: (id, status, notes) =>
    api.patch(`/leads/${id}/status`, { status, notes }).then((r) => r.data),
  delete: (id) => api.delete(`/leads/${id}`),
  stats: () => api.get('/leads/stats').then((r) => r.data),
}
