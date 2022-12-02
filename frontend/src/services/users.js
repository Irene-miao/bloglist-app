import axios from 'axios'
const baseUrl = '/api/users'


const userService = {

  create: async (newObject) => {
    console.log(newObject)
    const object = {
      'username': newObject.username,
      'password': newObject.password,
      'name': newObject.name
    }
    const response = await axios.post(baseUrl, object)
    return response.data
  },

  remove: async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`)
    return response.data
  },

  getOne: async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
  },

  getAll: async () => {
    const response = await axios.get(baseUrl)
    return response.data
  },
}


export default userService