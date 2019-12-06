import {template} from './transactions';
import store from '../store/index';
import Mock from "mockjs";

function getSettles(settled) {
    const data =  Mock.mock({ 'arr|850-950': template });
    let res = [];
    let counter = 0;
    let userValid, statusValid;
    for (let i in data['arr']) {
        if (!data['arr'].hasOwnProperty(i)) continue;

        userValid = data['arr'][i]['obligee'] === store.state.username && data['arr'][i]['transfer'] !== 2;

        statusValid = !!(data['arr'][i]['verified']
            && (data['arr'][i]['transfer'] === 0 || data['arr'][i]['transferVerified'])
            && (data['arr'][i]['discount'] === 0 || data['arr'][i]['discountVerified'])
            && (data['arr'][i]['settle']) === settled);

        if (settled) statusValid = statusValid && data['arr'][i]['settleDatetime'] !== '';

        if (userValid && statusValid) res.push({
            id: (counter++).toString(),
            ...data['arr'][i]
        });
    }
    return res;
}

export default function response() {
    return getSettles(false);
}

export function previousSettles() {
    return getSettles(true);
}
