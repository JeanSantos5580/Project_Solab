import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://ec2-3-209-174-215.compute-1.amazonaws.com/api/sundata'
})
