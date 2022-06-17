import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const setToken = tokenval => {
  token = `bearer ${tokenval}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async data => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.post(baseUrl, data, config)
  return response.data
}

const blogServices = { getAll, create, setToken}
export default blogServices