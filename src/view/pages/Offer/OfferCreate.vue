<template>
<div>
  <router-view></router-view>
  <base-card>

  </base-card>

</div>
</template>

<script>
import BaseCard from "../../../components/UI/BaseCard";
export default {
  name: "OfferCreate",
  components: {BaseCard},
  data(){
    return{
      IsValid:false,
    };
  }
}
</script>

<style lang="scss" scoped>
.sizes {
  .p-inputtext {
    display: block;
    margin-bottom: .5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.p-field * {
  display: block;
}
</style>