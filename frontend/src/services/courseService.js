import api from './api'

export const courseService = {
  list: (params = {}) => api.get('/courses', { params }).then((r) => r.data),
  get: (id) => api.get(`/courses/${id}`).then((r) => r.data),
  create: (data) => api.post('/courses', data).then((r) => r.data),
  update: (id, data) => api.patch(`/courses/${id}`, data).then((r) => r.data),
  delete: (id) => api.delete(`/courses/${id}`),
}
