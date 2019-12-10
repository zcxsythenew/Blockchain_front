import store from "@/store";

export const statusList = [
    { text: '等待认证', value: 0 },
    { text: '已认证', value: 1 },
    { text: '等待出账', value: 2 },
    { text: '已出账', value: 3 },
    { text: '等待变更责任人', value: 4 },
    { text: '已变更责任人', value: 5 },
    { text: '等待变更债权人', value: 6 },
    { text: '交易已转移', value: 7 },
    { text: '等待转让权利', value: 8 },
    { text: '权利已转让', value: 9 },
    { text: '等待转让责任', value: 10 },
    { text: '责任已转让', value: 11 },
    { text: '等待责任被转让', value: 12 },
    { text: '责任被转让', value: 13 },
    { text: '等待贴现', value: 14 },
    { text: '已贴现', value: 15 },
    { text: '等待结算', value: 16 },
    { text: '已结算', value: 17 },
    { text: '等待还款', value: 18 },
    { text: '已还款', value: 19 }
];

export function formatDate(str) {
    const date = new Date(str);
    return date.getFullYear().toString()
        + '-'
        + (date.getMonth() + 1).toString()
        + '-'
        + (date.getDate() < 10 ? '0' : '')
        + date.getDate().toString();
}

export function formatTime(str) {
    const date = new Date(str);
    return date.getFullYear().toString()
        + '-'
        + (date.getMonth() + 1 < 10 ? '0' : '')
        + (date.getMonth() + 1).toString()
        + '-'
        + (date.getDate() < 10 ? '0' : '')
        + date.getDate().toString()
        + ' '
        + (date.getHours() < 10 ? '0' : '')
        + date.getHours().toString()
        + ':'
        + (date.getMinutes() < 10 ? '0' : '')
        + date.getMinutes().toString()
        + ':'
        + (date.getSeconds() < 10 ? '0' : '')
        + date.getSeconds().toString();
}

export function formatStatus(transaction) {
    if (transaction['obligor'] === store.state.address) {
        if (!transaction['verified']) return '等待出账';
        switch (transaction['transfer']) {
            case 2:
                if (transaction['transferVerified']) {
                    return '交易已转移';
                } else {
                    return '等待变更债权人';
                }
            case 0:
                if (transaction['settle']) {
                    if (transaction['settleVerified']) {
                        return '已还款';
                    } else {
                        return '等待还款';
                    }
                }

                return '已出账';
            case 1:
                if (transaction['transferVerified']) {
                    return '责任已转让';
                } else {
                    return '等待转让责任';
                }
            default:
                return '错误';
        }
    } else if (transaction['verified']
        && transaction['transfer'] === 1
        && transaction['transferTo'] === store.state.address) {

        if (transaction['transferVerified']) {
            if (transaction['settle']) {
                if (transaction['settleVerified']) {
                    return '已还款';
                } else {
                    return '等待还款';
                }
            } else {
                return '责任被转让';
            }
        }

        return '等待责任被转让';
    } else {
        if (!transaction['verified']) return '等待认证';
        switch (transaction['transfer']) {
            case 1:
                if (!transaction['transferVerified']) {
                    return '等待变更责任人';
                }
            // fallthrough
            case 0:
                if (transaction['settle']) {
                    if (transaction['settleVerified']) {
                        return '已结算';
                    } else {
                        return '等待结算';
                    }
                }

                if (transaction['discount']) {
                    if (transaction['discountVerified']) {
                        return '已贴现';
                    } else {
                        return '等待贴现';
                    }
                }

                return (transaction['transfer'] === 0) ? '已认证' : '已变更责任人';
            case 2:
                if (transaction['transferVerified']) {
                    return '权利已转让';
                } else {
                    return '等待转让权利';
                }
            default:
                return '错误';
        }
    }
}

export function transactionDetail(transaction, decryptedNote) {
    if (!transaction || !transaction.datetime) return [];
    let transfer;
    switch (transaction.transfer) {
        case 0:
            transfer = '否';
            break;
        case 1:
            transfer = '转让责任人';
            break;
        case 2:
            transfer = '转让债权人';
            break;
        default:
            transfer = '错误';
            break;
    }
    return [
        { title: '债务人', content: transaction['obligor'] },
        { title: '债务人名称', content: transaction['obligorNickname'] },
        { title: '债权人', content: transaction['obligee'] },
        { title: '债权人名称', content: transaction['obligeeNickname'] },
        { title: '交易时间', content: formatTime(transaction['datetime']) },
        { title: '金额', content: transaction['amount'].toString() },
        { title: '银行认证', content: transaction['verified'] ? '是' : '否' },
        { title: '转让', content: transfer },
        { title: '转让给', content: transaction['transferTo'] },
        { title: '转让给名称', content: transaction['transferToNickname'] },
        { title: '转让已认证', content: transaction['transferVerified'] ? '是' : '否' },
        { title: '贴现', content: transaction['discount'] ? '是' : '否' },
        { title: '贴现已认证', content: transaction['discountVerified'] ? '是' : '否' },
        { title: '结算', content: transaction['settle'] ? '是' : '否' },
        { title: '结算已认证', content: transaction['settleVerified'] ? '是' : '否' },
        { title: '备注', content: transaction['note'] },
        { title: '解密备注', content: decryptedNote }
    ];
}
