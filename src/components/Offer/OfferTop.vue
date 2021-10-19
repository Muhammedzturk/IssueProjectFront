<template>
  <div class="card">
    <div class="grid formgrid">
      <div class="col-4 mb-4 ">
      <div class="p-inputgroup">
        <AutoComplete
            v-model="state.selectedCompany"
            :suggestions="filteredCompany"
            @complete="searchOffer($event)"
            field="label"
            :dropdown="true"
            placeholder="Firma ismini yazınız."
        />
        <span class="p-inputgroup-addon p-ripple purple" style="cursor: pointer" v-ripple @click="companyPage">
                        <i class="pi pi-plus"></i>
                    </span>
      </div>
        <span class="p-error" v-if="v$.selectedCompany.$error && errorCheck">
          {{errorCheck}}
             Lütfen Firma Seçiniz.
            </span>
      </div>



      <div class="col-4">
        <Dropdown v-model="state.selectedAccount" :options="items.values" option-value="value" optionLabel="label" placeholder="Firma İlgili Seç" />
        <span class="p-error" v-if="v$.selectedAccount.$error && errorCheck">
             Seçili Firmaya Ait Bir İlgili Seçiniz.
            </span>
      </div>
    </div>
    <div class="grid formgrid">
      <div class="col-4 mb-4 ">
        <label class=" mt-2">Teklif Numarası: </label>
              <span class="p-float-label">
              <InputText id="offerPrefix" class="p-inputtext-sm"  type="text" v-model="state.offerNumber" disabled="true"></InputText>
                <label for="offerPrefix">Ön Ek/Teklif No/Rev. No</label>
              </span>
        <span class="p-error" v-if="v$.offerNumber.$error && errorCheck">
             Teklif Numarası Boş Olamaz.
            </span>
      </div>
      <div class="col-4 mr-6">
        <label class="  mr-2 mt-2" for="offerdate">Teklif Tarihi:</label>
        <Calendar  v-model="state.offerDate" dateFormat="dd.mm.yy" class="p-inputtext-sm" :showButtonBar="true" :showIcon="true" />
        <span class="p-error" v-if="v$.offerDate.$error && errorCheck">
             Teklif Tarihi Boş Olamaz.
            </span>
      </div>
      <div class="col-3 ">
        <label  for="offerdate">Teklif Geçerlilik Tarihi:</label>
        <Calendar  v-model="state.offerValidityDate" dateFormat="dd.mm.yy" class="p-inputtext-sm" :showButtonBar="true" :showIcon="true" />
        <span class="p-error" v-if="v$.offerValidityDate.$error && errorCheck">
             Teklif Geçerlilik Tarihi Boş Olamaz.
            </span>
      </div>
    </div>
    <div class="grid formgrid">
      <div class="col-12 mb-4 ">
        <span class="p-float-label">
          <InputText id="offerPrefix" class="p-inputtext-lg"  type="text" v-model="state.offerDefinition"></InputText>
                <label for="offerPrefix">Teklifin Konusu</label>
        </span>
        <span class="p-error" v-if="v$.offerDefinition.$error && errorCheck">
             Teklifin Konusu Boş Olamaz.
            </span>
      </div>
    </div>
    <div class="grid formgrid">
      <div class="col-2 mb-4 ">
        <Dropdown v-model="state.selectedCurrency" :options="unit" optionLabel="label" optionValue="value" placeholder="Para Birimi" />
        <span class="p-error" v-if="v$.selectedCurrency.$error && errorCheck">
             Lütfen Para Birimini Seçiniz.
            </span>
      </div>
      <div class="col-2 mr-6">
              <InputNumber prefix="%" mode="decimal"  :minFractionDigits="2" id="profit" v-model="state.profit" placeholder="Kar"/>
        <span class="p-error" v-if="v$.profit.$error && errorCheck">
             Kar Oranı Boş Geçilemez.
            </span>
      </div>
    </div>
  </div>
</template>

<script>
import {ref,watch,reactive,computed } from 'vue';
import router from "../../router";
import { useVuelidate } from "@vuelidate/core";
import {  required } from "@vuelidate/validators";
export default {
  emits: ['profit-data' ],
  props:['check'],
  setup(props,{ emit }){
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
    const filteredOffers=ref(null);
    const filteredCompany=ref(null);
    const errorCheck=ref(computed(() => props.check));
    const profit=ref(null);
    const state = reactive({
      offerValidityDate:null,
      //offerPrefix:null,
      offerNumber:null,
      offerDefinition:null,
     // revisionNumber:null,
      offerDate:new Date(),
      selectedOffer:'',
      selectedCompany:'',
      selectedAccount:'',
      selectedCurrency:'',
      profit:null
    })
     const rules = computed(() => {
       return{
         offerValidityDate:{required},
         offerNumber:{required},
         offerDefinition:{required},
         offerDate:{required},
         selectedCompany:{required},
         selectedCurrency:{required},
         selectedAccount:{required},
         profit:{required},

       }
     })
      const v$ = useVuelidate(rules, state);
      console.log("v$ top",v$)
      v$.value.$validate();

    console.log("errorcheck",errorCheck)
    console.log("v$.value.$error",v$.value.$error)
    console.log("v$.value.$validate();",v$.value.$validate())

    console.log("props.check",props.check)


        //watch
        watch(() => state.selectedCompany,(value) =>{
          console.log("value",value)
          const selectValue = items.value.filter( f => f.label == value.label)
          console.log("selectValue",selectValue)
        });

        watch(() => [state.profit,state.selectedCurrency],([value,currency]) =>{
          console.log("profitdata",value)
          console.log("currency",currency)
          const profitObject={
            value:value,
            currency:currency
          }
          emit("profit-data",profitObject)
        });
        watch(() => state.offerDate,(dateValue) => {
          const nowDate = addDays(dateValue,15);
          console.log("nowDate",nowDate)
          if(state.offerValidityDate < nowDate){
            console.log("date burası")
          }
          state.offerValidityDate = nowDate

        });
        //watch end

    //methods
        const addDays = (theDate, days) => {
          return new Date(theDate.getTime() + days*24*60*60*1000);
        };
        const companyPage = () =>{
          router.push('/companyCreate')
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
        //methods end

        return {
          state,
          filteredOffers,
          filteredCompany,
          errorCheck,
          items,
          unit,
          profit,
          v$,
          addDays,
          companyPage,
          searchOffer
        }
  }

}
</script>
<style scoped>
.p-ripple.purple .p-ink {
  background: rgba(256,39,176,.3);
}
</style>