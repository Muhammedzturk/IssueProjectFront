<template>
  <Button class="p-button p-button-help mr-1" icon="pi pi-pencil" @click="updateModal"/>
  <Button class="p-button p-button-danger" icon="pi pi-trash" @click="$emit('deleteOffer',offer.id)"/>
    <Dialog header="Teklif Güncelleme" v-model:visible="displayModal" :style="{width: '40vw' }" :modal="true">
      <div   style="padding: 1rem 1rem">
        <div class="grid">
          <div class="col-12" style="display: grid">
            <AutoComplete
                v-model="state.offerDefinition"
                :suggestions="filteredCompany"
                @complete="searchOffer($event)"
                field="label"
                :dropdown="true"
                placeholder="Stok Tanımı"
                :class="{'p-invalid':v$.offerDefinition.$invalid && submitted}"
            />
            <span class="p-error" v-if="v$.offerDefinition.$error">
             Lütfen stok tanımını yapınız.
            </span>
          </div>
        </div>
        <div class="grid mt-1">
          <div class="p-fluid col-4 mt-2">
            <label  for="quantity">Miktar</label>
            <InputNumber  class="p-inputtext-sm" id="quantity" v-model="state.quantity" :class="{'p-invalid':v$.quantity.$invalid && submitted}"/>
            <span class="p-error" v-if="v$.quantity.$error">
             Miktar Boş Bırakılamaz
            </span>
          </div>
          <div class="p-fluid col-4 mt-2">
            <label  for="profit">Kar</label>
            <InputNumber prefix="%" mode="decimal" :class="{'p-invalid':v$.unitProfit.$invalid && submitted}" :minFractionDigits="2" class="p-inputtext-sm" id="profit" v-model="state.unitProfit" />
            <span class="p-error" v-if="v$.unitProfit.$error">
             Kar Boş Bırakılamaz
            </span>
          </div>
          <div class="p-fluid col-4 mt-2">
            <label  for="cost">Maliyet</label>
            <InputNumber mode="decimal" :minFractionDigits="2" :class="{'p-invalid':v$.unitCost.$invalid && submitted}" class="p-inputtext-sm" id="cost" v-model="state.unitCost" />
            <span class="p-error" v-if="v$.unitCost.$error">
             Maliyet Boş Bırakılamaz
            </span>
          </div>

        </div>
        <div class="grid mt-1">
          <div class="p-fluid col-6">
            <label  for="currency">Para Birimi</label>
            <Dropdown v-model="state.unitCurrency" :class="{'p-invalid':v$.unitCurrency.$invalid && submitted}" :options="unit" optionLabel="label" optionValue="value" id="currency" placeholder="Para Birimini Seçiniz." />
            <span class="p-error" v-if="v$.unitCurrency.$error">
             Para Birimini Seçiniz
            </span>
          </div>
          <div class="p-fluid col-6">
            <label  for="totalprice">Toplam Fiyat</label>
            <InputText id="totalprice" v-model="state.unitPrice" disabled="true"/>
          </div>

        </div>
        <div class="grid mt-1">
          <div style="display: grid" class="p-fluid col-6  mt-2">
            <label  for="optionNo">Seçenek</label>
            <Dropdown v-model="state.optionNo" :options="optionsItem" optionLabel="label" optionValue="value" id="optionNo" placeholder="Seçenek No" />

          </div>
        </div>
      </div>

      <template #footer>
        <Button style="width: 100px" class="p-button-sm p-button-raised p-button-success" label="Güncelle" icon="pi pi-check" @click="updateOfferData" />
      </template>
    </Dialog>
  </template>

<script>
import {computed, reactive, ref, watch} from "vue";
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {useToast} from "primevue/usetoast";

export default {
  name: "OfferUpdateForm",
  props:['offer','id','profitTop'],
  emits:['updateValue','deleteOffer'],
  setup(props,{emit} ){
    const toast = useToast();
   /* const resetForm = () => {
      offerModel.value.selectedCompany ='',
          offerModel.value.selectedOption='',
          offerModel.value.selectedCurrency='',
          offerModel.value.profit=null,
          offerModel.value.quantity=null,
          offerModel.value.cost=null,
          offerModel.value.totalPrice=0
    }*/

    const rules = computed(() => {
      return {
        offerDefinition: {required},
        //selectedOption: {required},
        unitCurrency: {required},
        quantity: {required},
        unitCost: {required},
        //totalPrice: {required},
        unitProfit: {required}
      }
    });

    const state = reactive({
      id:props.offer.id!=null ? props.offer.id : props.id,
      offerDefinition:props.offer.offerDefinition,
      selectedOption:props.offer.selectedOption,
      unitCurrency: props.offer.unitCurrency,
      unitProfit:props.offer.unitProfit,
      quantity:props.offer.quantity,
      unitCost:props.offer.unitCost,
      unitPrice:props.offer.unitPrice,
      totalPrice:props.offer.totalPrice,
      salePrice:props.offer.salePrice,
      rowNumber:props.offer.rowNumber,
      optionNo:props.offer.optionNo
    })
    const unit = ref([
      {label: 'TL', value: 'TL'},
      {label: 'Euro', value: 'EURO'},
      {label: 'Dolar', value: 'DOLAR'}
    ]);
    const items = ref([
      {label: 'Berlin', value: 'Berlin'},
      {label: 'Frankfurt', value: 'Frankfurt'},
      {label: 'Hamburg', value: 'Hamburg'},
      {label: 'Munich', value: 'Munich'}]);
    const optionsItem = ref([
      {label: '1.Seçenek', value: '1.Seçenek'},
      {label: '2.Seçenek', value: '2.Seçenek'},
      {label: '3.Seçenek', value: '3.Seçenek'},
      {label: '4.Seçenek', value: '4.Seçenek'},
      {label: '5.Seçenek', value: '5.Seçenek'},
      {label: '6.Seçenek', value: '6.Seçenek'},
      {label: '7.Seçenek', value: '7.Seçenek'},
      {label: '8.Seçenek', value: '8.Seçenek'},
      {label: '9.Seçenek', value: '9.Seçenek'},
      {label: '10.Seçenek', value: '10.Seçenek'},
    ]);
    const v$ = useVuelidate(rules, state);

    const definition = ref('')
    const submitted = ref(false);

    const displayModal = ref(false);
    const filteredOffers=ref(null);
    const filteredCompany=ref(null);
    //methods
    const updateModal = () => {
      console.log("offers55",props.offer)
      displayModal.value = true;
    };
    const updateOfferData = () => {
      v$.value.$validate();
      submitted.value=true
      if(!v$.value.$error){
        //success
        console.log("updateValue",state)
        emit("updateValue",state)
        displayModal.value = false;
        toast.add({severity:'success', summary: 'Güncelleme İşlemi Başarılı', life: 4000});
      }
    };
    const searchOffer = (event) =>{
      console.log("event",event)
      setTimeout(() => {
        if (!event.query.trim().length) {
          filteredCompany.value = [...items.value];
        }
        else {
          filteredCompany.value = items.value.filter((c) => {
            return c.label.toLowerCase().startsWith(event.query.toLowerCase());
          });
        }
      },50)
    };
    const getUnitLabel = (unit) => {
      switch(unit) {
        case 'EURO':
          return '€';
        case 'TL':
          return '₺';
        case 'DOLAR':
          return '$';
        default:
          return ' ';
      }
    };
    //end methods

    //watch
    watch(  () =>[state.quantity,state.unitCost,state.unitProfit],
        ([quantity,cost,profit] )=>{
          const calcProfit = cost+(cost*((profit)/100));
          state.unitPrice=calcProfit+' '+getUnitLabel(state.unitCurrency.toString())
          const splitCurrency = state.unitPrice.split(" ")
          state.salePrice=(parseInt(splitCurrency[0])+(parseInt(splitCurrency[0])*(parseInt(props.profitTop.value)/100))).toFixed(2)
          state.totalPrice = (quantity*state.salePrice).toFixed(2);
        });

    return{
      displayModal,
      definition,
      filteredOffers,
      filteredCompany,
      unit,
      items,
      optionsItem,
      updateModal,
      updateOfferData,
      searchOffer,
      getUnitLabel,
      v$,
      state,
      submitted
    }
  }
}
</script>

<style scoped>

</style>