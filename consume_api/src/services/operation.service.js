import http from '../http-common'
class OperationDataService {
  getAll() {
    return http.get('/operation/')
  }
  get(id) {
    return http.get(`/operation/${id}`)
  }
  create(data) {
    return http.post('/operation', data)
  }
  update(id, data) {
    return http.put(`/operation/${id}`, data)
  }
  delete(id) {
    return http.delete(`/operation/${id}`)
  }
  deleteAll() {
    return http.delete(`/operation`)
  }
}
export default new OperationDataService()
