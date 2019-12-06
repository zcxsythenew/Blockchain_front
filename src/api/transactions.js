import request from "@/utils/request";

export function transactions() {
    return request({
        method: 'get',
        url: '/transactions',
    })
}
