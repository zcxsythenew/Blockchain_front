import request from "@/utils/request";
import store from "@/store";

export function getDiscount() {
    return request({
        method: 'get',
        url: '/discount',
        data: {
            address: store.state.address
        }
    })
}

export function getPreviousDiscounts() {
    return request({
        method: 'get',
        url: '/discount/previous',
        data: {
            address: store.state.address
        }
    })
}

export function discount(transaction) {
    return request({
        method: 'post',
        url: '/discount',
        data: {
            id: transaction.id,
            privateKey: store.state.privateKey
        }
    })
}

export function verifyDiscount(transaction) {
    return request({
        method: 'post',
        url: '/verify/discount',
        data: {
            privateKey: store.state.privateKey,
            id: transaction.id
        }
    })
}

export function cancelDiscount(transaction) {
    return request({
        method: 'post',
        url: '/cancel/discount',
        data: {
            privateKey: store.state.privateKey,
            id: transaction.id
        }
    })
}
