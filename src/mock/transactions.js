import Mock from 'mockjs'
import store from "@/store";

export const template = [{
    'obligor|1': ['1', '2', '3', '4'],
    'obligee|1': ['1', '2', '3', '4'],
    'datetime|1': [
        '2019-12-05T08:18:15.000Z',
        '2019-12-05T20:18:15.000Z',
        '2019-12-06T08:18:15.000Z',
        '2019-12-06T20:18:15.000Z',
        '2019-12-07T08:18:15.000Z',
        '2019-12-07T20:18:15.000Z',
        '2019-12-08T08:18:15.000Z',
        '2019-12-08T20:18:15.000Z'
    ],
    'amount|95-100': 1,
    'verified|1': true,
    'transfer|1': [0, 1, 2], // 0 - 不转让 1 - 转让责任人 2 - 转让债权人
    'transferTo|1': ['1', '2', '3', '4'],
    'transferVerified|1': false,
    'discount|1': true,
    'discountVerified|1': true,
    'settle|1': true,
    'settleVerified|1': true,
    'note': 'Some note'
}];

export default function response() {
    const data =  Mock.mock({ 'arr|100-150': template });
    let res = [];
    let counter = 0;
    for (let i in data['arr']) {
        if (!data['arr'].hasOwnProperty(i)) continue;
        if (data['arr'][i]['obligee'] === store.state.address
            || data['arr'][i]['obligor'] === store.state.address
            || (data['arr'][i]['verified'] && data['arr'][i]['transfer'] === 1 && data['arr'][i]['transferTo'] === store.state.address)
            || store.state.admin) {
            res.push({
                'id': (counter++).toString(),
                ...data['arr'][i]
            });
        }
    }
    return {
        message: "success",
        data: res
    };
}
