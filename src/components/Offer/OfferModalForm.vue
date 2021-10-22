<template>
  <div class="grid">
  <div class="col-2  ">
    <Button label="Detay Ekle" class="p-button-secondary" @click="openModal"/>
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
            <label  for="totalprice">Birim Fiyat</label>
            <InputNumber id="totalprice" v-model="state.totalPrice" disabled="true"/>
          </div>

        </div>
        <div class="grid mt-1">
          <div style="display: grid" class="p-fluid col-6  mt-2">
            <label  for="selectedOption">Seçenek</label>
            <Dropdown v-model="state.selectedOption" :options="optionsItem" optionLabel="label" optionValue="value" id="selectedOption" placeholder="Seçenek No" />
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
import {useToast} from "primevue/usetoast";

export default {
  name: "OfferModalForm",
  emits: ['dialog-data','error-info'],
  props:['profitTop'],
  setup(props,{ emit }){
    const toast = useToast();
    const rules = computed(() => {
      return {
        selectedCompany: {required},
        selectedOption: {required},
        selectedCurrency: {required},
        quantity: {required},
        cost: {required},
        //totalPrice: {required},
        profit: {required}
    }
    });
    const state = reactive({
      id:1,
      selectedCompany: "",
      selectedOption:  " ",
      selectedCurrency: " ",
      profit:null,
      quantity:null,
      cost:null,
      totalPrice:0
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
    const openModal = () => {
      displayModal.value = true;
      state.id+=1;
    };
    const addOfferData = () => {
      v$.value.$validate();
      submitted.value=true
      if(!v$.value.$error){
        //success
        if(props.profitTop.value == null && props.profitTop.currency ==null){
          displayModal.value = false;
          emit("error-info",true)
          window.scrollTo(0, 0);
          toast.add({severity:'error', summary: 'Ekleme İşlemi Başarısız',
            detail:'Lütfen Boş Yerleri Doldurun!', life: 4000});
          return;
        }
        emit("error-info",false)
        displayModal.value = false;
        toast.add({severity:'success', summary: 'Ekleme İşlemi Başarılı',
           life: 4000});

        emit("dialog-data",state)
        console.log("state",state)
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
    watch(  () =>[state.cost,state.profit],
        ([cost,profit] )=>{
      const calcProfit = cost+(cost*((profit)/100));
          state.totalPrice = calcProfit;
    });

    return{
      displayModal,
      definition,
      filteredOffers,
      filteredCompany,
      unit,
      items,
      optionsItem,
      openModal,
      addOfferData,
      searchOffer,
      v$,
      state,
      submitted
    }
  }
}
</script>

<style scoped>

</style>