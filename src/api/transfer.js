import request from "@/utils/request";
import store from "@/store";

export function getTransfer() {
    return request({
        method: 'get',
        url: '/transfer',
        data: {
            address: store.state.address
        }
    })
}

export function getPreviousTransfers() {
    return request({
        method: 'get',
        url: '/transfer/previous',
        data: {
            address: store.state.address
        }
    })
}

export function getAdminTransfers() {
    return request({
        method: 'get',
        url: '/transfer/admin',
        data: {
            address: store.state.address
        }
    })
}

export function transfer(transactions) {
    return request({
        method: 'post',
        url: '/transfer',
        data: {
            a: transactions[0].id,
            b: transactions[1].id,
            privateKey: store.state.privateKey
        }
    })
}

export function verifyTransfer(transferId) {
    return request({
        method: 'post',
        url: '/verify/transfer',
        data: {
            privateKey: store.state.privateKey,
            id: transferId
        }
    })
}

export function cancelTransfer(transferId) {
    return request({
        method: 'post',
        url: '/cancel/transfer',
        data: {
            privateKey: store.state.privateKey,
            id: transferId
        }
    })
}
