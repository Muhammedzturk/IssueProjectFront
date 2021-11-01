import axios from "axios"

const CompanyContactService = {

   async getCompanyContact(value){
        return await axios.get(`CompanyContact/GetCompanyList/${value}`).then(response =>{
            return response.data
        }).catch(e =>{
            console.log(e)
        })
    }
};
export default CompanyContactService;