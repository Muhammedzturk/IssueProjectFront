import axios from "axios";
import {parse} from "./responseErrorParser.service";
const CompanyService ={

    getCompanyList(){
        return axios.get('api/company/GetCompanyList').then(r=>{
            return r.data
        }).catch(e =>{
            console.log(e)
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
    companiesPost(data){
        return axios.post(`api/company/AddCompany`, data)
            .then(r=>{
                return r.data
            }).catch(e=>{
                console.log(e)
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