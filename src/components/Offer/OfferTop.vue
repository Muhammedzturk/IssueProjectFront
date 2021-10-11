<template>
  <div class="card">
    <div class="grid formgrid">
      <label class=" ml-2 mt-2">Teklif Numarası: </label>
      <div class="col-4 mb-4 ">
              <span class="p-float-label">
              <InputText id="offerPrefix" class="p-inputtext-sm"  type="text" v-model="offerPrefix" disabled="true"></InputText>
                <label for="offerPrefix">Ön Ek/Teklif No/Rev. No</label>
              </span>
      </div>

      <div class="ml-auto mr-2 mt-2" >
        <label  for="offerdate">Teklif Tarihi:</label>
      </div>
      <div class="col-3 mr-6">
        <Calendar  v-model="offerDate" class="p-inputtext-sm" :showButtonBar="true" :showIcon="true" />
      </div>
    </div>

    <div class="grid formgrid">
      <label class=" ml-2 mt-2 ">Teklifin Konusu: </label>
      <div class="col-4 mb-4 ">

        <InputText id="offerPrefix" class="p-inputtext-sm"  type="text" v-model="offerDefinition"></InputText>

      </div>
      <div class="ml-auto mr-2 mt-2" >
        <label  for="offerdate">Teklif Geçerlilik Tarihi:</label>
      </div>
      <div class="col-3 mr-6">
        <Calendar  v-model="offerValidityDate" class="p-inputtext-sm" :showButtonBar="true" :showIcon="true" />
      </div>
    </div>

    <div class="grid formgrid">
      <label class=" ml-2 mt-2 mr-7 ">Firma: </label>
      <div class="col-4 p-inputgroup">

        <AutoComplete
            v-model="selectedCompany"
            :suggestions="filteredCompany"
            @complete="searchOffer($event)"
            field="label"
            :dropdown="true"
            placeholder="Firma ismini yazınız."
        />
        <span class="p-inputgroup-addon p-ripple purple" style="cursor: pointer" v-ripple @click="CompanyPage">
                        <i class="pi pi-plus"></i>
                    </span>
      </div>
      <div class="col-4 ml-8 " v-show="IsShow">
        <Dropdown v-model="selectedAccount" :options="items" option-value="value" optionLabel="label" placeholder="Firma İlgili Seç" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props:['items'],
  data(){
    return{
      offerDate:null,
      offerValidityDate:null,
      offerPrefix:'',
      offerNumber:'',
      offerDefinition:'',
      revisionNumber:'',
      selectedOffer:'',
      selectedCompany:'',
      selectedAccount:'',
      filteredOffers:null,
      filteredCompany:null,
      IsShow:false,


    };
  },
  methods:{
    addDays(theDate, days) {
      return new Date(theDate.getTime() + days*24*60*60*1000);
    },
    CompanyPage(){
      this.$router.push('/companyCreate')
    },
    searchOffer(event){
      console.log("event",event)
      setTimeout(() => {
        if (!event.query.trim().length) {
          this.filteredCompany = [...this.items];
        }
        else {
          this.filteredCompany = this.items.filter((c) => {
            return c.label.toLowerCase().startsWith(event.query.toLowerCase());
          });
        }
      },50)
    }
  },
  watch:{
    selectedCompany(value){
      console.log("value",value)
      const selectValue = this.items.filter( f => f.label == value.label)
      console.log("selectValue",selectValue)

      if(selectValue.length>0){
        this.IsShow = true
      }else{
        this.IsShow = false
      }
    },
    offerDate(dateValue){
      const nowDate = this.addDays(dateValue,15);
      console.log("nowDate",nowDate)
      if(this.offerValidityDate < nowDate){
        console.log("date burası")
      }
      this.offerValidityDate=nowDate
    }
  }
}
</script>
<style scoped>
.p-ripple.purple .p-ink {
  background: rgba(256,39,176,.3);
}
</style>