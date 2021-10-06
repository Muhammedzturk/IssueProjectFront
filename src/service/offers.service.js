import axios from "axios";
import {parse} from "./responseErrorParser.service";


const OfferService ={

    offersGetAll(){
        return axios.get('/Offers').then(r=>{
            return r.data
        }).catch(e =>{
            parse(e);
        })
    },
    OfferGetById(value){
        return axios.get(`/Offers/${value}`)
            .then(r =>{
                return r.data
            }).catch(e=>{
                parse(e);
            })
    },
    offerPost(model){
        return axios.post(`Offers`, model)
            .then(r=>{
                return r.data
            }).catch(e=>{
                parse(e);
            })
    },
    offerPut(value){
        return axios.put(`Offers`,value)
            .then(r=>{
                return r.data
            }).catch(e =>{
                parse(e);
            })
    },
    offerDelete(ID){
        return axios.delete(`Offers/${ID}`)
            .then(r=>{
                return r.data
            }).catch(e=>{
                parse(e);
            })
    }
};

export default OfferService;