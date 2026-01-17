import axios from 'axios'
import { BASE_URL } from './config'

class Api {
  #client

  constructor () {
    this.#client = axios.create({
      baseURL: BASE_URL
    })
  }

  async execute (method, url, { params = {}, data = {} }) {
    try {
      const headers = {
        'Accept-Language': 'ru',
        'Content-Type': 'text/plain'
      }
      const options = {
        method,
        url,
        params,
        data,
        headers
      }
      const result = await this.#client(options)

      return result?.data || {}
    } catch (error) {
      // Отдаем весь объект ошибки
      console.error('API error: ', error)
      throw error
    }
  }

  get (url, { params = {} } = {}) {
    return this.execute('get', url, { params })
  }

  post (url, { data = {} }) {
    return this.execute('post', url, { data })
  }

  put (url, { data = {} }) {
    return this.execute('put', url, { data })
  }

  delete (url, { data = {} }) {
    return this.execute('delete', url, { data })
  }
}

export default new Api()
