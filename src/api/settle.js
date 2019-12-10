import request from "@/utils/request";
import store from "@/store";

export function getSettle() {
    return request({
        method: 'get',
        url: '/settle',
        data: {
            address: store.state.address
        }
    })
}

export function getPreviousSettles() {
    return request({
        method: 'get',
        url: '/settle/previous',
        data: {
            address: store.state.address
        }
    })
}

export function settle(transaction) {
    return request({
        method: 'post',
        url: '/settle',
        data: {
            id: transaction.id,
            privateKey: store.state.privateKey
        }
    })
}

export function verifySettle(transaction) {
    return request({
        method: 'post',
        url: '/verify/settle',
        data: {
            privateKey: store.state.privateKey,
            id: transaction.id
        }
    })
}

export function cancelSettle(transaction) {
    return request({
        method: 'post',
        url: '/cancel/settle',
        data: {
            privateKey: store.state.privateKey,
            id: transaction.id
        }
    })
}
