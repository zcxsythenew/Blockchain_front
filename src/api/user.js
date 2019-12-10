import request from '../utils/request'

export function login(form) {
    return request({
        method: 'post',
        url: '/login',
        data: {
            privateKey: form.privateKey
        }
    })
}

export function signIn() {
    return request({
        method: 'get',
        url: '/signin',
    })
}

export function shiftDatabase() {
    return request({
        method: 'get',
        url: '/shift'
    })
}
