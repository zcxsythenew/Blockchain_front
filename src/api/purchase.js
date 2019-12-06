import request from "@/utils/request";

export function purchase(form) {
    return request({
        method: 'post',
        url: '/purchase',
        data: form
    });
}
