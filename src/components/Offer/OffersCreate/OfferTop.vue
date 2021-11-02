<template>
  <div class="card">
    <div class="grid formgrid">
      <div class="col-4 mb-4 ">
      <div class="p-inputgroup">
        <AutoComplete
            v-model="state.selectedCompany"
            :suggestions="filteredCompany"
            @complete="searchOffer($event)"
            field="companyName"
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
        <Dropdown v-model="state.selectedAccount" :options="itemsContact" option-value="firstName" optionLabel="firstName" placeholder="Firma İlgili Seç" />
        <span class="p-error" v-if="v$.selectedAccount.$error && errorCheck">
             Seçili Firmaya Ait Bir İlgili Seçiniz.
            </span>
      </div>
    </div>
    <div class="grid formgrid">
      <div class="col-4 mb-4 ">
        <label class=" mt-2">Ön Ek/Teklif No/Rev. No: </label>
              <InputText id="offerPrefix" class="p-inputtext"  type="text" v-model="state.offerNumber" disabled="true" ></InputText>

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
import {ref, watch, reactive, computed, onMounted} from 'vue';
import router from "../../../router";
import { useVuelidate } from "@vuelidate/core";
import {  required } from "@vuelidate/validators";
import CompanyService from "../../../service/company.service";
import CompanyContactService from "../../../service/companyContact.service";
export default {
  emits: ['profit-data','offer-top-data' ],
  props:['check'],
  setup(props,{ emit }){
    onMounted(async() => {
      await CompanyService.getCompanyList().then(r =>{
        companyList.value= r.payload
      })
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
    const filteredOffers=ref(null);
    const filteredCompany=ref(null);
    const errorCheck=ref(computed(() => props.check));
    const profit=ref(null);
    const companyList=ref(null);
    const getIdData=ref(null)
    const itemsContact=ref(null)
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
      v$.value.$validate();
      if(!v$.value.$error){
        emit("offer-top-data",state)
      }
      console.log("errorcheck",errorCheck)
      console.log("props.check",props.check)

        //watch
        watch( () => state.selectedCompany,(company) =>{
          console.log("company", company)
          if(company.id>0){
            CompanyContactService.getCompanyContact(company.id)
                .then(response => {
                  itemsContact.value = response.payload
                  state.offerNumber = company.offerPrefix +"/"+ company.offerNumber
                })
          }
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
          setTimeout(() => {
            if (!event.query.trim().length) {
              filteredCompany.value = [...companyList.value];
              console.log("filteredCompany.value1",filteredCompany.value)
            }
            else {
              filteredCompany.value = companyList.value.filter((c) => {
                return c.companyName.toLowerCase().startsWith(event.query.toLowerCase());
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
          getIdData,
          itemsContact,
          companyList,
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