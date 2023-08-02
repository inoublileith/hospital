import http from '../http-common'
class InfermierDataService {
  getAll() {
    return http.get('/infermier/')
  }
  get(id) {
    return http.get(`/infermier/${id}`)
  }
  create(data) {
    return http.post('/infermier', data)
  }
  update(id, data) {
    return http.put(`/infermier/${id}`, data)
  }
  delete(id) {
    return http.delete(`/infermier/${id}`)
  }
  deleteAll() {
    return http.delete(`/infermier`)
  }
}
export default new InfermierDataService()
