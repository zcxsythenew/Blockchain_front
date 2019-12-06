import request from "@/utils/request";

export function getNicknames() {
    return request({
        method: 'get',
        url: '/nickname'
    });
}

export function addNickname(nickname) {
    return request({
        method: 'post',
        url: '/nickname',
        data: nickname
    })
}
