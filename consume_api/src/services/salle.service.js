import http from '../http-common'
class SalleDataService {
  getAll() {
    return http.get('/salle/')
  }
  get(id) {
    return http.get(`/salle/${id}`)
  }
  create(data) {
    return http.post('/salle', data)
  }
  update(id, data) {
    return http.put(`/salle/${id}`, data)
  }
  modifier(id, x) {
    return http.put(`/salle/${id}/${x}`)
  }
  delete(id) {
    return http.delete(`/salle/${id}`)
  }
  deleteAll() {
    return http.delete(`/salle`)
  }
}
export default new SalleDataService()
