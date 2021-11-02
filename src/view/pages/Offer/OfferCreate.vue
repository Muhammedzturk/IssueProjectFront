<template>
  <div>
    <div class="p-grid">
      <div class=" p-md-6 p-fluid">
        <offer-top
        @profit-data="profitDataValue"
        :check="check"
        ></offer-top>
        <offer-add
        :profitTop="profitTop"
        @error-check="errorCheck"
        ></offer-add>
        </div>
      </div>
    </div>

</template>

<script>

import OfferTop from '../../../components/Offer/OffersCreate/OfferTop'
import OfferAdd from '../../../components/Offer/OffersCreate/OfferAdd'
import {ref} from 'vue'
export default {
  components:{
    OfferTop,
    OfferAdd
  },
  setup(){
    const profitTop=ref('')

    const check=ref('')
    const errorCheck = (checkData) => {
      check.value=checkData
    }
    const profitDataValue = (data) => {
      profitTop.value = data
    }

    return{
      profitDataValue,
      errorCheck,
      profitTop,
      check,
    }
  }


}
</script>


