/* import axios from 'axios'

const service = axios.create({
    timeout: 5000
});

export default service; */

import user from '../mock/user'
import transactions from "@/mock/transactions";
import settle, {previousSettles} from "@/mock/settle";
import discount, {previousDiscounts} from "@/mock/discount";
import transfer, {previousTransfers} from "@/mock/transfer";
import nickname from "@/mock/nickname";

export default function service(api) {
    switch (api.url) {
        case '/login':
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(user(api.data));
                }, 1000);
            });
        case '/transactions':
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(transactions());
                }, 1000);
            });
        case '/settle':
            if (api.method === 'get') {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(settle());
                    }, 1000);
                })
            } else {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve({ message: "success" });
                    }, 1000);
                })
            }
        case '/settle/previous':
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(previousSettles());
                }, 1000);
            });
        case '/discount':
            if (api.method === 'get') {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(discount());
                    }, 1000);
                })
            } else {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve({ message: "success" });
                    }, 1000);
                })
            }
        case '/discount/previous':
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(previousDiscounts());
                }, 1000);
            });
        case '/transfer':
            if (api.method === 'get') {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(transfer());
                    }, 1000);
                });
            } else {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve({ message: "success" });
                    }, 1000);
                });
            }
        case '/transfer/previous':
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(previousTransfers());
                }, 1000);
            });
        case '/purchase':
            // eslint-disable-next-line no-console
            console.log(JSON.stringify(api.data));
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve({ message: "success" });
                }, 1000);
            });
        case '/nickname':
            if (api.method === 'get') {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(nickname());
                    }, 1000);
                });
            } else {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve({ message: "success" });
                    }, 1000);
                });
            }
        default:
            return new Promise((resolve, reject) => {
                reject('Not found');
            })
    }
}
