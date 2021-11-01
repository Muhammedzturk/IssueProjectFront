import axios from "axios";

const offerDetailsService={
    GetOfferDetailsByOffer(id){
        return axios.get(`/offerDetails/GetDetailByOfferId/${id}`)
            .then(r=>{
                console.log("offerDetailsService",r.data)
                return r.data
        }).catch(e =>{
            console.log(e)
        })
    }
};

export default offerDetailsService;