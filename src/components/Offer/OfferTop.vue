<template>
  <div class="card">
    <div class="grid formgrid">
      <div class="col-4 mb-4 p-inputgroup">

        <AutoComplete
            v-model="selected.selectedCompany"
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
      <div class="col-4  "  >
        <Dropdown v-model="selected.selectedAccount" :options="items.values" option-value="value" optionLabel="label" placeholder="Firma İlgili Seç" />
      </div>
    </div>
    <div class="grid formgrid">

      <div class="col-4 mb-4 ">
        <label class=" mt-2">Teklif Numarası: </label>
              <span class="p-float-label">
              <InputText id="offerPrefix" class="p-inputtext-sm"  type="text" v-model="offerModel.offerPrefix" disabled="true"></InputText>
                <label for="offerPrefix">Ön Ek/Teklif No/Rev. No</label>
              </span>
      </div>

      <div class="col-4 mr-6">
        <label class="  mr-2 mt-2" for="offerdate">Teklif Tarihi:</label>
        <Calendar  v-model="offerModel.offerDate" class="p-inputtext-sm" :showButtonBar="true" :showIcon="true" />
      </div>


      <div class="col-3 ">
        <label  for="offerdate">Teklif Geçerlilik Tarihi:</label>
        <Calendar  v-model="offerModel.offerValidityDate" class="p-inputtext-sm" :showButtonBar="true" :showIcon="true" />
      </div>
    </div>

    <div class="grid formgrid">
      <div class="col-12 mb-4 ">
        <span class="p-float-label">
          <InputText id="offerPrefix" class="p-inputtext-lg"  type="text" v-model="offerModel.offerDefinition"></InputText>
                <label for="offerPrefix">Teklifin Konusu</label>
        </span>
      </div>
    </div>
    <div class="grid formgrid">

      <div class="col-2 mb-4 ">
        <Dropdown v-model="selected.selectedCurrency" :options="unit" optionLabel="label" optionValue="value" placeholder="Para Birimi" />
      </div>

      <div class="col-2 mr-6">
         <span class="p-float-label">
          <InputText id="offerPrefix"    type="text" v-model="profit" ></InputText>
                <label for="offerPrefix">Kar</label>
        </span>

      </div>
      <div class="col-2 ">

        <IFRAME name="doviz-fiyat" src="http://www.altinpiyasa.com/site/doviz-fiyatlari.asp" width="200" height="70" allowtransparency="true" scrolling="no" frameborder="0"
        marginwidth="0" marginheight="0"></IFRAME>

      </div>
    </div>

  </div>
</template>

<script>
import {ref,watch} from 'vue';
import router from "../../router";
export default {

  setup(){
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

    const offerModel= ref({
      offerValidityDate:null,
      offerPrefix:null,
      offerNumber:null,
      offerDefinition:null,
      revisionNumber:null,
      offerDate:new Date(),
    });
    const selected = ref({
      selectedOffer:'',
      selectedCompany:'',
      selectedAccount:'',
      selectedCurrency:''
    });
        const filteredOffers=ref(null);
        const filteredCompany=ref(null);
        const IsShow=ref(false);
        const profit=ref('');

        //watch
        watch(() => selected.value.selectedCompany,(value) =>{
          console.log("value",value)
          const selectValue = items.value.filter( f => f.label == value.label)
          console.log("selectValue",selectValue)

          if(selectValue.length>0){
            IsShow.value = true
          }else{
            IsShow.value = false
          }
        });
        watch(() => offerModel.value.offerDate,(dateValue) => {
          const nowDate = addDays(dateValue,15);
          console.log("nowDate",nowDate)
          if(offerModel.value.offerValidityDate < nowDate){
            console.log("date burası")
          }
          offerModel.value.offerValidityDate = nowDate

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
          offerModel ,
          selected,
          filteredOffers,
          filteredCompany,
          IsShow,
          items,
          unit,
          profit,
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