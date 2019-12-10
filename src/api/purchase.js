import request from "@/utils/request";
import store from "@/store";

export function purchase(form) {
    return request({
        method: 'post',
        url: '/purchase',
        data: {
            privateKey: store.state.privateKey,
            ...form
        }
    });
}
