import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''
let config = {}

const setToken = tokenval => {
  token = `bearer ${tokenval}`

  config = {
    headers: { Authorization: token }
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async data => {
  const response = await axios.post(baseUrl, data, config)
  return response.data
}

const update = async (data) => {
  const response = await axios.put(`${baseUrl}/${data.id}`, data, config)
  return response.data
}

const remove = async (id) => {
  console.log(`config when removing ${id}, ${config}`)
  await axios.delete(`${baseUrl}/${id}`, config)
}

const blogServices = { getAll, create, setToken, update, remove }
export default blogServices