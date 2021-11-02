import axios from "axios"

const CompanyContactService = {

   async getCompanyContact(companyId){
        return await axios.get(`/CompanyContact/GetCompanyList/${companyId}`).then(response =>{
            console.log('data4',response.data)
            return response.data
        }).catch(e =>{
            console.log(e)
        })
    },
    addContact(data){
        console.log('stadssadwe',data)
        return axios.post(`/CompanyContact/AddContact`, data)
            .then(r=>{
                console.log('datsewrwa',data)
                return r.data
            }).catch(e=>{
                console.log(e)
            })
    },

};
export default CompanyContactService;