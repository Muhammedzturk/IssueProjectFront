export default class UserService {

    getUsers() {
        return fetch('/data/user-table.json').then(res => res.json())
            .then(d => d.data);
    }
}