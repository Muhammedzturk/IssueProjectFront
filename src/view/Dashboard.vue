<template>
    <base-card>
      <div class="grid">
        <Button @click="gittim">Apiye git bakalım!</Button>
      </div>
    </base-card>

</template>

<script>

import ApiService from "../service/api.service";
import BaseCard from "../components/UI/BaseCard";

export default {
  components: {BaseCard},
  data() {
		return {

		}
	},
methods:{
    gittim(){
      ApiService.get('Demo')
           .then(({data}) => {
             console.log("response yeri",data)
           })
           .catch(({response}) => {
               return response;
           });
      console.log(ApiService.get('Demo'))
    }
}

}
</script>