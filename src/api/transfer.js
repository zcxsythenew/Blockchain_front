import request from "@/utils/request";

export function getTransfer() {
    return request({
        method: 'get',
        url: '/transfer'
    })
}

export function getPreviousTransfers() {
    return request({
        method: 'get',
        url: '/transfer/previous'
    })
}

export function transfer(transactions) {
    return request({
        method: 'post',
        url: '/transfer',
        data: {
            id: [ transactions[0].id, transactions[1].id ]
        }
    })
}
