import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://backend-project-solab.onrender.com/api/sundata'
})
