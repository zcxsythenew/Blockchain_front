import request from "@/utils/request";

export function getDiscount() {
    return request({
        method: 'get',
        url: '/discount'
    })
}

export function getPreviousDiscounts() {
    return request({
        method: 'get',
        url: '/discount/previous'
    })
}

export function discount(transaction) {
    return request({
        method: 'post',
        url: '/discount',
        data: {
            id: transaction.id
        }
    })
}
