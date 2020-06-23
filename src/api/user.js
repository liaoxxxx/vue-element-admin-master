import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  console.log(token)
  /* if (token === undefined || token === '') {
    return
  }*/
  return request({
    url: '/admin/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}

export function exchangeToken(token) {
  return request({
    url: '/admin/exchangeToken',
    method: 'post',
    params: { token }
  })
}
