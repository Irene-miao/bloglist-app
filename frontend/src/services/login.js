import axios from 'axios'
const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/login`

const login = async (username, password) => {
  const credentials = { username, password }
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { login }