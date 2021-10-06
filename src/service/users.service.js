import axios from "axios";
import {parse} from "./responseErrorParser.service";


const UsersService ={

    usersGetAll(){
        return axios.get('/Users').then(r=>{
            return r.data
        }).catch(e =>{
            return parse(e);
        })
    },
    userGetById(value){
        return axios.get(`/Users/${value}`)
            .then(r =>{
                return r.data
            }).catch(e=>{
                parse(e);
            })
    },
    userPost(model){
        return axios.post(`Users`, model)
            .then(r=>{
                return r.data
            }).catch(e=>{
                parse(e);
            })
    },
    userPut(value){
        return axios.put(`Users`,value)
            .then(r=>{
                return r.data
            }).catch(e =>{
                parse(e);
            })
    },
    userDelete(ID){
        return axios.delete(`Users/${ID}`)
            .then(r=>{
                return r.data
            }).catch(e=>{
                parse(e);
            })
    }
};

export default UsersService;