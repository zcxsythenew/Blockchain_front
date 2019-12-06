export default function response(form) {
    const users = [
        { username: '1', privateKey: '0' },
        { username: '2', privateKey: '0' },
        { username: '3', privateKey: '0' },
        { username: '4', privateKey: '0' }
    ];

    let i;
    for (i in users) {
        if (!users.hasOwnProperty(i)) continue;
        if (users[i].username === form.username && users[i].privateKey === form.privateKey) {
            return true;
        }
    }
    return false;
}
