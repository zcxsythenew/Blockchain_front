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
    'transferDatetime|1': [
        '2019-12-09T08:18:15.000Z',
        '2019-12-09T20:18:15.000Z',
        '2019-12-10T08:18:15.000Z',
        '2019-12-10T20:18:15.000Z',
        '2019-12-11T08:18:15.000Z',
        '2019-12-11T20:18:15.000Z',
        '2019-12-12T08:18:15.000Z',
        '2019-12-12T20:18:15.000Z',
        ''
    ],
    'transferVerified|1': false,
    'discount|1': true,
    'discountVerified|1': true,
    'discountDatetime|1': [
        '2019-12-13T08:18:15.000Z',
        '2019-12-13T20:18:15.000Z',
        '2019-12-14T08:18:15.000Z',
        '2019-12-14T20:18:15.000Z',
        '2019-12-15T08:18:15.000Z',
        '2019-12-15T20:18:15.000Z',
        '2019-12-16T08:18:15.000Z',
        '2019-12-16T20:18:15.000Z',
        ''
    ],
    'settle|1': true,
    'settleVerified|1': true,
    'settleDatetime|1': [
        '2019-12-17T08:18:15.000Z',
        '2019-12-17T20:18:15.000Z',
        '2019-12-18T08:18:15.000Z',
        '2019-12-18T20:18:15.000Z',
        '2019-12-19T08:18:15.000Z',
        '2019-12-19T20:18:15.000Z',
        '2019-12-20T08:18:15.000Z',
        '2019-12-20T20:18:15.000Z',
        ''
    ],
    'note': 'Some note'
}];

export default function response() {
    const data =  Mock.mock({ 'arr|450-550': template });
    let res = [];
    let counter = 0;
    for (let i in data['arr']) {
        if (!data['arr'].hasOwnProperty(i)) continue;
        if (data['arr'][i]['obligee'] === store.state.username
            || data['arr'][i]['obligor'] === store.state.username
            || (data['arr'][i]['verified'] && data['arr'][i]['transfer'] === 1 && data['arr'][i]['transferTo'] === store.state.username)) {
            res.push({
                'id': (counter++).toString(),
                ...data['arr'][i]
            });
        }
    }
    return res;
}
