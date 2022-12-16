import axios from 'axios'
const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/blogs`



export const create = async (token, newObject) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export const remove = async (id, newObject) => {

  const response = await axios.delete(`${baseUrl}/${id}`, newObject)
  return response.data
}

export const update = async (object) => {

  const newObject = { title: object.title, author: object.author, url: object.url, likes: Number(object.likes) + 1 }
  const response = await axios.put(`${baseUrl}/${object.id}`, newObject)
  return response.data
}

export const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}



