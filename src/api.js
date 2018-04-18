import fetch from 'unfetch'
import storage from 'storage'

const apiBase = 'https://api.hackclub.com/'
const methods = ['GET', 'PUT', 'POST', 'PATCH', 'DELETE']

const generateMethod = method => (path, options = {}) => {
  const authToken = storage.get('authToken')
  let filteredOptions = {
    headers: {
      // If they have an authToken, automatically attach it
      Authorization: `Bearer ${authToken}`
    }
  }

  for (let [key, value] of Object.entries(options)) {
    switch (key) {
      case 'authToken':
        filteredOptions.headers = filteredOptions.headers || {}
        filteredOptions.headers['Authorization'] = `Bearer ${value}`
        break
      case 'data':
        if (value instanceof FormData) {
          filteredOptions.body = value
        } else {
          filteredOptions.body = JSON.stringify(value)
          filteredOptions.headers = filteredOptions.headers || {}
          filteredOptions.headers['Content-Type'] = 'application/json'
        }
        break
      default:
        filteredOptions[key] = value
        break
    }
  }
  return fetch(apiBase + path, { method, ...filteredOptions })
    .then(res => {
      if (res.ok) {
        const contentType = res.headers.get('content-type')
        if (contentType && contentType.indexOf('application/json') !== -1) {
          return res.json()
        } else {
          return res.text()
        }
      } else {
        throw res
      }
    })
    .catch(e => {
      throw e
    })
}

let api = {}

methods.forEach(method => {
  api[method.toLowerCase()] = generateMethod(method)
})

api.getCurrentUser = () => {
  if (storage.get('authToken')) {
    return api.get(`v1/users/current`)
  } else {
    return new Promise.reject(new Error('no current user'))
  }
}

export default api
