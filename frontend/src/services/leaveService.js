import api from './api'

export const applyLeave = (payload) => api.post('/leaves/apply', payload)
export const getMyRequests = () => api.get('/leaves/my-requests')
export const getAllRequests = () => api.get('/leaves/all')
export const approveLeave = (id) => api.put(`/leaves/${id}/approve`)
export const rejectLeave = (id) => api.put(`/leaves/${id}/reject`)
