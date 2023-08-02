import http from '../http-common'
class MedecinDataService {
  getCountAll() {
    return http.get('/medecin/count')
  }
  getCountAllMedecin() {
    return http.get('/medecin/medecin')
  }
  getCountAllStaff() {
    return http.get('/medecin/staff')
  }
  getCountAllInfermier() {
    return http.get('/medecin/infermier')
  }
  getCountAllOperation() {
    return http.get('/medecin/operation')
  }
  getCountAllYear() {
    return http.get('/medecin/year')
  }
  getCountAllMonth() {
    return http.get('/medecin/month')
  }
  getCountAllDate() {
    return http.get('/medecin/date')
  }
  getAll() {
    return http.get('/medecin/')
  }
  get(id) {
    return http.get(`/medecin/${id}`)
  }
  create(data) {
    return http.post('/medecin', data)
  }
  update(id, data) {
    return http.put(`/medecin/${id}`, data)
  }
  delete(id) {
    return http.delete(`/medecin/${id}`)
  }
  deleteAll() {
    return http.delete(`/medecin`)
  }
}
export default new MedecinDataService()
