import request from '@/utils/request'

export function getMenu(params) {
  return request({
    url: '/menu2/list',
    method: 'get',
    params
  })
}
