<template>
<div>
  <router-view></router-view>
  <base-card><h2>This</h2></base-card>

</div>
</template>

<script>
import BaseCard from "../../../components/UI/BaseCard";
export default {
  name: "OfferCreate",
  components: {BaseCard}
}
</script>

<style scoped>

</style>