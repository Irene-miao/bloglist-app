import axios from 'axios'
const baseUrl = '/api/blogs'




const commentService = {

  create: async (id, newObject) => {
    const object = { content: newObject }
    const response = await axios.post(`${baseUrl}/${id}/comments`, object)
    return response.data
  },

  /*remove: async (id, newObject) => {
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.delete(`${baseUrl}/${id}/comments/${id}`, config, newObject)
    return response.data
  },

  update: async (id, object) => {
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.put(`${baseUrl}/${id}`, config, object)
    return response.data
  },

  getOne: async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
  },*/

  getAll: async (id) => {
    const response = await axios.get(`${baseUrl}/${id}/comments`)
    return response.data
  },

}

export default commentService
