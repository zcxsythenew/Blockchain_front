import Mock from 'mockjs'
import {template} from "@/mock/transactions";
import store from "@/store";

function getTransfers(transferred) {
    const data = Mock.mock({'arr|100-150': template});
    let res = [];
    let counter = 0;
    let userValid, statusValid;
    for (let i in data['arr']) {
        if (!data['arr'].hasOwnProperty(i)) continue;

        userValid = data['arr'][i]['obligee'] === store.state.address
            || data['arr'][i]['obligor'] === store.state.address
            || (transferred && data['arr'][i]['transfer'] === 1 && data['arr'][i]['transferTo'] === store.state.address);

        statusValid = !!(data['arr'][i]['verified']
            && ((data['arr'][i]['transfer'] === 0) === !transferred)
            && (!data['arr'][i]['discount'] || transferred)
            && (!data['arr'][i]['settle'] || transferred));

        if ((userValid || store.state.admin) && statusValid) res.push({
            id: (counter++).toString(),
            ...data['arr'][i]
        });
    }
    if (!transferred) {
        res.push({
            'id': '10000',
            'obligor': '2',
            'obligee': '1',
            'datetime': '2019-12-05T08:18:15.000Z',
            'amount': 105,
            'verified': true,
            'transfer': 0, // 0 - 不转让 1 - 转让责任人 2 - 转让债权人
            'transferTo': '',
            'transferDatetime': '',
            'transferVerified': false,
            'discount': false,
            'discountVerified': false,
            'discountDatetime': '',
            'settle': false,
            'settleVerified': false,
            'settleDatetime': ''
        });
        res.push({
            'id': '10001',
            'obligor': '1',
            'obligee': '3',
            'datetime': '2019-12-05T08:18:15.000Z',
            'amount': 105,
            'verified': true,
            'transfer': 0, // 0 - 不转让 1 - 转让责任人 2 - 转让债权人
            'transferTo': '',
            'transferDatetime': '',
            'transferVerified': false,
            'discount': false,
            'discountVerified': false,
            'discountDatetime': '',
            'settle': false,
            'settleVerified': false,
            'settleDatetime': ''
        });
    }
    return {
        message: "success",
        data: res
    };
}

export default function response() {
    return getTransfers(false);
}

export function previousTransfers() {
    return getTransfers(true);
}

export function adminTransfers() {
    const msg = getTransfers(true);
    let count = 0;
    for (let i in msg.data) {
        if (!msg.data.hasOwnProperty(i)) continue;
        msg.data[i].transferId = Math.floor(count / 2);
        count++;
    }
    return msg;
}
