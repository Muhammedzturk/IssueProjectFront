export default class CustomerService {

    getCustomersLarge() {
        return fetch('/data/customers-large.json').then(res => res.json())
            .then(d => d.data);
    }
    getCustomersXLarge() {
        return fetch('/data/company-contacts.json').then(res => res.json())
            .then(d => d.data);
    }

}