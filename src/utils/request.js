import axios from 'axios'
import qs from 'qs'

const service = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 30000,
});

export default function serve(config) {
    return new Promise(((resolve, reject) => {
        let x;
        if (config.method === 'get') {
            x = {
                method: config.method,
                url: config.url,
                params: config.data
            };
        } else {
            x = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: config.method,
                url: config.url,
                data: (config.data ? qs.stringify(config.data) : undefined)
            };
        }
        service(x).then(result => {
            resolve(result.data);
        }).catch(reason => {
            reject(reason);
        });
    }));
}

/*
import user from '../mock/user'
import transactions from "@/mock/transactions";
import settle, {previousSettles} from "@/mock/settle";
import discount, {previousDiscounts} from "@/mock/discount";
import transfer, {adminTransfers, previousTransfers} from "@/mock/transfer";
import nickname from "@/mock/nickname";
export default function service(api) {
    switch (api.url) {
        case '/login':
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(user(api.data));
                }, 1000);
            });
        case '/signin':
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve({
                        'message': 'success',
                        'data': {
                            'address': '100',
                            'privateKey': '200',
                            'publicKey': '300'
                        }
                    });
                }, 1000);
            });
        case '/shift':
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve({
                        'message': 'success',
                        'user': {
                            'address': '100',
                            'privateKey': '200',
                            'publicKey': '300',
                            'admin': true
                        },
                        'transactionAddress': '400'
                    });
                }, 1000);
            });
        case '/transactions':
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(transactions());
                }, 1000);
            });
        case '/verify':
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve({ message: "success" });
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
        case '/verify/settle':
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve({ message: "success" });
                }, 1000);
            });
        case '/cancel/settle':
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve({ message: "success" });
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
        case '/verify/discount':
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve({ message: "success" });
                }, 1000);
            });
        case '/cancel/discount':
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve({ message: "success" });
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
        case '/transfer/admin':
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(adminTransfers());
                }, 1000);
            });
        case '/verify/transfer':
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve({ message: "success" });
                }, 1000);
            });
        case '/cancel/transfer':
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve({ message: "success" });
                }, 1000);
            });
        case '/purchase':
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
} */
