import axios from 'axios';

export default () => {
            return axios.create({
                baseURL:"http://localhost:44357",
                headers:{
                    "Content-Type" : "application/json",
                }
            })
        }