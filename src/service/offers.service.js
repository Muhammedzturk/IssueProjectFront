import axios from "axios";

const OfferService ={

   async  getListOffer(){
        return await axios.get('/api/offers/GetListOffer').then(r=>{
            console.log("r.data",r.data)
            return r.data

        }).catch(e =>{
            console.log(e)
        })
    },
    OfferGetById(value){
        return axios.get(`/Offers/${value}`)
            .then(r =>{
                return r.data
            }).catch(e=>{
                console.log(e)
            })
    },
    offerPost(model){
        return axios.post(`Offers`, model)
            .then(r=>{
                return r.data
            }).catch(e=>{
                console.log(e)
            })
    },
    offerPut(value){
        return axios.put(`Offers`,value)
            .then(r=>{
                return r.data
            }).catch(e =>{
                console.log(e)
            })
    },
    deleteOffer(id){
        return axios.delete(`/api/offers/DeleteOffer/${id}`)
            .then(r=>{
                return r.data
            }).catch(e=>{
                console.log(e)
            })
    }
};

export default OfferService;