import request from "@/utils/request";
import store from "@/store";

export function getNicknames() {
    return request({
        method: 'get',
        url: '/nickname',
        data: {
            address: store.state.address
        }
    });
}

export function addNickname(nickname) {
    return request({
        method: 'post',
        url: '/nickname',
        data: {
            privateKey: store.state.privateKey,
            ...nickname
        }
    })
}
