import http from '../http-common'
class DepartementDataService {
  getAll() {
    return http.get('/departement/')
  }
  get(id) {
    return http.get(`/departement/${id}`)
  }
  create(data) {
    return http.post('/departement', data)
  }
  update(id, data) {
    return http.put(`/departement/${id}`, data)
  }
  delete(id) {
    return http.delete(`/departement/${id}`)
  }
  deleteAll() {
    return http.delete(`/departement`)
  }
}
export default new DepartementDataService()
