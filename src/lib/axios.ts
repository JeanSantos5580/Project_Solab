import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://3.209.174.215/api/sundata'
})
