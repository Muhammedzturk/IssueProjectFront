import axios from "axios";


const ApiService = {
    init(){
        axios.defaults.baseURL ="http://localhost:44357";
        console.log("burası",axios.defaults.baseURL)
    },

    setHeader() {
        axios.defaults.headers.common[
            "Content-Type"
            ] = `application/json`;
        // todo:JwtService yazılıp headere eklenecek..
    },



//Burası kullanılmayacak şimdilik...



    query(resource, params) {
        return new Promise(resolve => {
            axios.get(resource, params).then(r=>{
                resolve(r.data)
            }).catch(e =>{
                return e;
                //todo : parse error yazılacak.
            })
        })

    },

  /*  get(resource, params = "") {
        return new Promise(resolve => {
            axios.get(`${resource}/${params}`).then(r=>{
                resolve(r.data)
            }).catch(e => {
                return e;
                //todo : parse error yazılacak.
            })
        })
    },*/
    get(resource, params = "") {
        return axios.get(`${resource}/${params}`).catch(error => {
            throw new Error(` ApiService ${error}`);
        });
    },

    post(resource, params) {
        return new Promise(resolve => {
            axios.post(`${resource}`, params).then(r => {
                resolve(r.data)
            }).catch(e => {
                return e;
                //todo : parse error yazılacak.
            })
        })

    },

    update(resource, slug, params) {
        return new Promise(resolve => {
            axios.put(`${resource}/${slug}`, params).then(r =>{
                resolve(r.data)
            }).catch(e =>{
                return e;
                //todo : parse error yazılacak.
            })

        })
    },

    put(resource, params) {
        return new Promise(resolve => {
            axios.put(`${resource}`, params).then(r=>{
                resolve(r.data)
            }).catch(e=>{
                return e;
                //todo : parse error yazılacak.
            })
        })

    },

    delete(resource) {
        return new Promise(resolve => {
            axios.delete(resource).then(r=>{
                resolve(r.data)
            }).catch(e=>{
                return e;
                //todo : parse error yazılacak.
            })
        })

    }
};

export default ApiService;



