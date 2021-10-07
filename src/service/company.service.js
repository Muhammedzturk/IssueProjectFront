import axios from "axios";
import {parse} from "./responseErrorParser.service";


const CompanyService ={

    companiesGet(){
        return axios.get('/Company').then(r=>{
            return r.data
        }).catch(e =>{
            parse(e);
        })
    },
    companiesGetById(value){
        return axios.get(`/Company/Summary/${value}`)
            .then(r =>{
                return r.data
            }).catch(e=>{
                parse(e);
            })
    },
    companiesPost(model){
        return axios.post(`Company`, model)
            .then(r=>{
                return r.data
            }).catch(e=>{
                parse(e);
            })
    },
    companiesPut(value){
        return axios.put(`Company`,value)
            .then(r=>{
                return r.data
            }).catch(e =>{
                parse(e);
            })
    },
    companiesDelete(ID){
        return axios.delete(`Company/${ID}`)
            .then(r=>{
                return r.data
            }).catch(e=>{
                parse(e);
            })
    }
};

export default CompanyService;