import request from "@/utils/request";
import store from "@/store";

export function transactions() {
    return request({
        method: 'get',
        url: '/transactions',
        data: {
            address: store.state.address
        }
    })
}

export function verifyTransaction(transaction) {
    return request({
        method: 'post',
        url: '/verify',
        data: {
            privateKey: store.state.privateKey,
            id: transaction.id
        }
    })
}
