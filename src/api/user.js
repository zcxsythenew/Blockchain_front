import request from '../utils/request'

export function login(form) {
    return request({
        method: 'post',
        url: '/login',
        data: {
            username: form.username,
            privateKey: form.privateKey
        }
    })
}
