import request from "@/utils/request";

export function getSettle() {
    return request({
        method: 'get',
        url: '/settle',
    })
}

export function getPreviousSettles() {
    return request({
        method: 'get',
        url: '/settle/previous'
    })
}

export function settle(transaction) {
    return request({
        method: 'post',
        url: '/settle',
        data: {
            id: transaction.id
        }
    })
}
