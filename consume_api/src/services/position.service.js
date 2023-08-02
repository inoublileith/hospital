import http from '../http-common'
class PositionDataService {
  getAll() {
    return http.get('/position/')
  }
  get(id) {
    return http.get(`/position/${id}`)
  }
  getOne(id) {
    return http.get(`/positions/${id}`)
  }
  getByEtat(id) {
    return http.get(`/salles/position/${id}`)
  }
  getDate(id) {
    return http.get(`/today/${id}`)
  }
  create(data) {
    return http.post('/position', data)
  }
  update(id, data) {
    return http.put(`/position/${id}`, data)
  }
  delete(id) {
    return http.delete(`/position/${id}`)
  }
  deleteAll() {
    return http.delete(`/position`)
  }
}
export default new PositionDataService()
