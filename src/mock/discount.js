import {template} from "@/mock/transactions";
import store from "@/store";
import Mock from 'mockjs'

function getDiscounts(discounted) {
    const data = Mock.mock({'arr|850-950': template});
    let res = [];
    let counter = 0;
    let userValid, statusValid;
    for (let i in data['arr']) {
        if (!data['arr'].hasOwnProperty(i)) continue;

        userValid = data['arr'][i]['obligee'] === store.state.username && data['arr'][i]['transfer'] !== 2;

        statusValid = !!(data['arr'][i]['verified']
            && (data['arr'][i]['transfer'] === 0 || data['arr'][i]['transferVerified'])
            && (!data['arr'][i]['settle'] || discounted)
            && data['arr'][i]['discount'] === discounted);

        if (discounted) statusValid = statusValid && data['arr'][i]['discountDatetime'] !== '';

        if (userValid && statusValid) res.push({
            id: (counter++).toString(),
            ...data['arr'][i]
        });
    }
    return res;
}

export default function response() {
    return getDiscounts(false);
}

export function previousDiscounts() {
    return getDiscounts(true);
}
