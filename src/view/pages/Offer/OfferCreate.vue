<template>
  <div>
    <div class="p-grid">
      <div class=" p-md-6 p-fluid">
        <h6>Yeni Teklif Oluştur</h6>

        <offer-top
        :items="items"
        ></offer-top>
        <offer-add
        :buttons="buttons"
        ></offer-add>

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
data(){
    return{
      items: [
        {label: 'Berlin', value: 'Berlin'},
        {label: 'Frankfurt', value: 'Frankfurt'},
        {label: 'Hamburg', value: 'Hamburg'},
        {label: 'Munich', value: 'Munich'}
      ],
      buttons: [
        {
          label: 'Update',
          icon: 'pi pi-refresh',
          command: () => {
            this.$toast.add({severity:'success', summary:'Updated', detail:'Data Updated', life: 3000});
          }
        },
        {
          label: 'Delete',
          icon: 'pi pi-times',
          command: () => {
            this.$toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000});
          }
        },
      ]
    };
}


}
</script>


