<template>
  <div>
    <div class="p-grid">
      <div class=" p-md-6 p-fluid">

        <offer-top></offer-top>
        <offer-add></offer-add>

        </div>
      </div>
    </div>

</template>

<script>

import OfferTop from '../../../components/Offer/OfferTop'
import OfferAdd from '../../../components/Offer/OfferAdd'
export default {
  components:{
    OfferTop,
    OfferAdd
  },
}
</script>


