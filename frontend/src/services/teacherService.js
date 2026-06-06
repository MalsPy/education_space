import api from './api'

export const teacherService = {
  list: (params = {}) => api.get('/teachers', { params }).then((r) => r.data),
  get: (id) => api.get(`/teachers/${id}`).then((r) => r.data),
  create: (data) => api.post('/teachers', data).then((r) => r.data),
  update: (id, data) => api.patch(`/teachers/${id}`, data).then((r) => r.data),
  delete: (id) => api.delete(`/teachers/${id}`),
}
