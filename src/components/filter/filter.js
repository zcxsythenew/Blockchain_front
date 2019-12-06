import {formatDate} from "@/components/formatter/formatter";

export function generalFilter(data, property) {
    let filter = [];
    let thisFilter;
    for (let i in data) {
        if (!data.hasOwnProperty(i)) continue;
        thisFilter = { text: data[i][property], value: data[i][property] };
        if (!filter.find(f => f.text === thisFilter.text)) filter.push(thisFilter);
    }
    filter.sort((a, b) => {
        if (a.text < b.text) return -1;
        if (a.text === b.text) return 0;
        return 1;
    });
    return filter;
}

export function dateFilter(data, field='datetime') {
    let filter = [];
    let thisFilter;
    for (let i in data) {
        if (!data.hasOwnProperty(i)) continue;
        thisFilter = { text: formatDate(data[i][field]), value: data[i][field] };
        if (!filter.find(f => f.text === thisFilter.text)) filter.push(thisFilter);
    }
    filter.sort((a, b) => {
        if (a.text < b.text) return -1;
        if (a.text === b.text) return 0;
        return 1;
    });
    return filter;
}
