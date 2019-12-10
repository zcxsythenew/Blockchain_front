export default function response(form) {
    const users = [
        { address: '1', privateKey: '1', publicKey: '1', admin: true },
        { address: '2', privateKey: '2', publicKey: '2', admin: false },
        { address: '3', privateKey: '3', publicKey: '3', admin: false },
        { address: '4', privateKey: '4', publicKey: '4', admin: false }
    ];

    let i;
    for (i in users) {
        if (!users.hasOwnProperty(i)) continue;
        if (users[i].privateKey === form.privateKey) {
            return {
                message: 'success',
                data: users[i]
            };
        }
    }
    return {
        message: 'fail'
    };
}
