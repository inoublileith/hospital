import http from '../http-common'
const register = (nom, prenom, tel, email,adresse, login, password, profil) => {
  return http.post('/auth/signup', {
    nom,
    prenom,
    tel,
    email,
    adresse,
    login,
    password,
    profil,
  })
}
const login = async (login, password) => {
  const response = await http
    .post('/auth/signin', {
      login,
      password,
    })
  if (response.data.accessToken) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}
const logout = () => {
  localStorage.removeItem('user')
}
export default {
  register,
  login,
  logout,
}
