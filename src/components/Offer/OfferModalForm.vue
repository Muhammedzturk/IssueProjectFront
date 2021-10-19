<template>
  <div class="grid">
  <div class="col-2  ">
    <Button label="Teklif Ekle" class="p-button-secondary" @click="openModal"/>
  </div>
  <div class="col-2 ml-auto">
    <slot></slot>
  </div>
  </div>
    <Dialog header="Header" v-model:visible="displayModal" :style="{width: '40vw' }" :modal="true">
      <div   style="padding: 1rem 1rem">
        <div class="grid">
        <div class="col-12" style="display: grid">
          <AutoComplete
              v-model="state.selectedCompany"
              :suggestions="filteredCompany"
              @complete="searchOffer($event)"
              field="label"
              :dropdown="true"
              placeholder="Stok Tanımı"
              :class="{'p-invalid':v$.selectedCompany.$invalid && submitted}"
          />
          <span class="p-error" v-if="v$.selectedCompany.$error">
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
              <InputNumber prefix="%" mode="decimal" :class="{'p-invalid':v$.quantity.$invalid && submitted}" :minFractionDigits="2" class="p-inputtext-sm" id="profit" v-model="state.profit" />
              <span class="p-error" v-if="v$.profit.$error">
             Kar Boş Bırakılamaz
            </span>
            </div>
          <div class="p-fluid col-4 mt-2">
            <label  for="cost">Maliyet</label>
            <InputNumber mode="decimal" :minFractionDigits="2" :class="{'p-invalid':v$.quantity.$invalid && submitted}" class="p-inputtext-sm" id="cost" v-model="state.cost" />
            <span class="p-error" v-if="v$.cost.$error">
             Maliyet Boş Bırakılamaz
            </span>
          </div>

        </div>
        <div class="grid mt-1">
          <div class="p-fluid col-6">
            <label  for="currency">Para Birimi</label>
            <Dropdown v-model="state.selectedCurrency" :class="{'p-invalid':v$.selectedCurrency.$invalid && submitted}" :options="unit" optionLabel="label" optionValue="value" id="currency" placeholder="Para Birimini Seçiniz." />
            <span class="p-error" v-if="v$.selectedCurrency.$error">
             Para Birimini Seçiniz
            </span>
          </div>
          <div class="p-fluid col-6">
            <label  for="totalprice">Toplam Fiyat</label>
            <InputNumber id="totalprice" v-model="state.totalPrice" disabled="true"/>
          </div>

        </div>
        <div class="grid mt-1">
          <div style="display: grid" class="p-fluid col-6  mt-2">
            <label  for="selectedOption">Seçenek</label>
            <Dropdown v-model="offerModel.selectedOption" :options="items" optionLabel="label" optionValue="value" id="selectedOption" placeholder="Seçenek No" />
          </div>
        </div>
      </div>

      <template #footer>
        <Button style="width: 100px" class="p-button-sm p-button-raised p-button-success" label="Ekle" icon="pi pi-check" @click="addOfferData" />
      </template>
    </Dialog>


</template>

<script>
import {reactive, ref, watch,computed} from "vue";
import { useVuelidate } from "@vuelidate/core";
import {  required } from "@vuelidate/validators";
export default {
  name: "OfferModalForm",
  emits: ['dialog-data','error-info'],
  props:['profitTop'],
  setup(props,{ emit }){
    const resetForm = () => {
      offerModel.value.selectedCompany ='',
      offerModel.value.selectedOption='',
      offerModel.value.selectedCurrency='',
      offerModel.value.profit=null,
      offerModel.value.quantity=null,
      offerModel.value.cost=null,
      offerModel.value.totalPrice=0
    }

    const rules = computed(() => {
      return {
        selectedCompany: {required},
        //selectedOption: {required},
        selectedCurrency: {required},
        quantity: {required},
        cost: {required},
        //totalPrice: {required},
        profit: {required}
    }
    });
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

    const state = reactive({
      selectedCompany: "",
      selectedOption:  " ",
      selectedCurrency: " ",
      profit:null,
      quantity:null,
      cost:null,
      totalPrice:0
    })

    const offerModel = ref({
      selectedCompany :'',
      selectedOption:'',
      selectedCurrency:'',
      profit:null,
      quantity:null,
      cost:null,
      totalPrice:0

    })
    const v$ = useVuelidate(rules, state);

    console.log("v$22",v$)
    const definition = ref('')
    const submitted = ref(false);

    const displayModal = ref(false);
    const filteredOffers=ref(null);
    const filteredCompany=ref(null);
    //methods
    const openModal = () => {
      displayModal.value = true;
    };
    const addOfferData = () => {
      v$.value.$validate();
      submitted.value=true
      console.log("v$",v$)
      if(!v$.value.$error){
        //success
        if(props.profitTop.value == null && props.profitTop.currency ==null){
          displayModal.value = false;
          emit("error-info",true)
          return;
        }
        emit("error-info",false)
        displayModal.value = false;
        emit("dialog-data",state)
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

    //end methods

    //watch
    watch(  () =>[state.quantity,state.cost,state.profit],
        ([quantity,cost,profit] )=>{
      const calcProfit = cost+(cost*((profit)/100));
          state.totalPrice = quantity*calcProfit;
    });

    return{
      displayModal,
      definition,
      filteredOffers,
      filteredCompany,
      offerModel,
      unit,
      items,
      openModal,
      addOfferData,
      searchOffer,
      resetForm,
      v$,
      state,
      submitted
    }
  }
}
</script>

<style scoped>

</style>