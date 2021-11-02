<template>
  <div class="card">
    <DataTable  :value="offers"  ref="dt"  v-model:selection="selectedOffer"  selectionMode="single" dataKey="id" showGridlines responsiveLayout="scroll" :scrollable="true" scrollHeight="flex"
                v-model:filters="filters1" filterDisplay="menu" class="p-datatable-customers"  :globalFilterFields="['offerDefinition','companyName','offerNumber','offerDate','offerValidityDate','status','contactName' ]">
      <!-- DataTable üst kısımdaki butonlar ve filtreleme inputu -->
      <template #header>
        <div class="p-d-flex p-jc-between grid">
          <div class="col-4  ">
          <Button type="button" icon="pi pi-filter-slash" label="Filtreleri Temizle" class="p-button-mr-2" @click="clearFilter1()"/>
          </div>
          <div class="col-4 ml-auto mr-6">
          <span class="p-input-icon-left ">
         <i class="pi pi-search col-offset-9"  />
         <InputText class="col-offset-9" v-model="filters1['global'].value" placeholder="Genel arama" />
      </span>
            </div>
        </div>
      </template>
      <!-- filtreleme sonucunda herhangi bir değer bulunamadı kısmı -->
      <template #empty>
        Bir sonuç bulunamadı...
      </template>
      <!--   DataTable kısmı -->
      <Column field="companyName" header="Firma"  >
        <template #body="{data}" class="ml-3">
         <span class="ml-3">{{data.companyName}}</span>
        </template>
        <template #filter="{filterModel,filterCallback}">
          <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" :placeholder="`Firma Adı Ara `"
                     v-tooltip.top.focus="'Yazarken filtreleyin'"/>
        </template>
      </Column>
      <Column field="offerDefinition" header="Teklifin Konusu"  >
        <template #body="{data}" class="ml-3">
          <span class="ml-3">{{data.offerDefinition}}</span>
        </template>
        <template #filter="{filterModel,filterCallback}">
          <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" :placeholder="`Teklifin Konusu Ara `"
                     v-tooltip.top.focus="'Yazarken filtreleyin'"/>
        </template>
      </Column>
      <Column field="offerNumber" header="Teklif Numarası" style="width: 300px">
        <template #body="{data}" class="ml-3">
          <span class="ml-3">{{data.offerNumber}}</span>
        </template>
        <template #filter="{filterModel,filterCallback}">
          <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" placeholder="Teklif Numarası Ara" v-tooltip.top.focus="'Yazarken filtreleyin'"/>
        </template>
      </Column>
      <Column field="offerDate" header="Teklif Tarihi">
        <template #body="{data}" class="ml-3">
          <span class="ml-3">{{data.offerDate}}</span>
        </template>
        <template #filter="{filterModel,filterCallback}">
          <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" placeholder="Teklif Tarihi Ara" v-tooltip.top.focus="'Yazarken filtreleyin'"/>
        </template>
      </Column>
      <Column field="offerValidityDate" header="Teklif Geçerlilik Tarihi" style="width: 200px">
        <template #body="{data}" class="ml-3">
          <span class="ml-3">{{data.offerValidityDate}}</span>
        </template>
        <template #filter="{filterModel,filterCallback}">
          <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" placeholder="Teklif Geçerlilik Tarihi Ara" v-tooltip.top.focus="'Yazarken filtreleyin'"/>
        </template>
      </Column>
      <Column field="contactName"  header="Firma İlgilisi">
        <template #body="{data}" class="ml-3">
          <span class="ml-3">{{data.contactName}}</span>
        </template>
        <template #filter="{filterModel,filterCallback}">
          <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" placeholder="Firma İlgilisi Ara" v-tooltip.top.focus="'Yazarken filtreleyin'"/>
        </template>
      </Column>
      <Column field="status" header="Status" :filterMenuStyle="{'width':'5rem'}" style="min-width:5rem">
        <template #body="{data}" >
          <span :class="'offer-badge status-' + data.status" class="ml-3">{{data.status}}</span>
        </template>
        <template #filter="{filterModel}">
          <Dropdown v-model="filterModel.value" :options="statuses" placeholder="Any" class="p-column-filter" :showClear="true">
            <template #value="slotProps">
              <span :class="'offer-badge status-' + slotProps.value" v-if="slotProps.value">{{slotProps.value}}</span>
              <span v-else>{{slotProps.placeholder}}</span>
            </template>
            <template #option="slotProps">
              <span :class="'offer-badge status-' + slotProps.option">{{slotProps.option}}</span>
            </template>
          </Dropdown>
        </template>
      </Column>
      <Column  style="min-width:2rem" >
        <template #body="slotProps">
          <offer-list-edit-form
          :offer="slotProps.data"
          @update-list-value="updateData"
          @offer-delete="offerDelete"
          ></offer-list-edit-form>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import {FilterMatchMode,FilterOperator} from 'primevue/api';
import OfferListEditForm from "./OfferListEditForm";
import OfferService from "../../../service/offers.service";
import {useToast} from "primevue/usetoast";
export default {
  components: {OfferListEditForm},
  setup(){
    onMounted(async() => {
      await OfferService.getListOffer().then(r =>{
      offers.value= r.payload.map((data,index) =>{
        console.log("data offer",data)
        return {
          index:index,
          id:data.id,
          companyName:data.companyName,
          offerNumber:data.offerNumber,
          offerDate:data.date,
          offerValidityDate:data.validityDate,
          offerDefinition:data.definition,
          contactName:data.contactName,
          status:statusControl(data.status.toString())
        }
      })
    })

 });
    const toast = useToast();
    const selectedOffer=ref('');

    const offers = ref(null);
    const offerDetailsInfo = ref(null);
    const statuses = ref([
      'olumsuz', 'olumlu', 'beklemede',
    ]);
    const filters1 = ref({
      'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
      'offerDefinition': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
      'companyName': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
      'offerNumber': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
      'offerDate': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
      'offerValidityDate': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
      'status': {operator: FilterOperator.OR, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
      'contactName':{operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]}
    });
    const clearFilter1 = () => {
      initFilters1();
    };
    const offerDelete = async (deleteId) => {
     const result = await OfferService.deleteOffer(deleteId).then()
      console.log("result",result)
      let index = offers.value.findIndex(i =>{
        return i.id == deleteId
      })
      if(result.success){
        offers.value.splice(index,1)
        toast.add({severity:'warn', summary: 'Teklif Silindi.', life: 3000});
      }else{
        toast.add({severity:'error', summary: 'Teklif Silinemedi.',detail:result.information, life: 4000});
      }
    };
    const updateData = (data) => {
      let index = findIndexById(data.id)
      offers.value[index] = data;
    }
    const statusControl = (status) => {
      console.log("status",status)
      if(status === "0"){
        return status.replace(status,"olumsuz");
      }else if(status === "1"){
        return status.replace(status,"olumlu");
      }else {
        return status.replace(status,"beklemede")
      }
    }
    const findIndexById = (id) => {
      let index = -1;
      for (let i = 0; i < offers.value.length; i++) {
        if (offers.value[i].id === id) {
          index = i;
          break;
        }
      }
      return index;
    };
    const initFilters1 = () => {
      filters1.value = {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        'name': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        'country.name': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        'representative': {value: null, matchMode: FilterMatchMode.IN},
        'date': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.DATE_IS}]},
        'balance': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
        'status': {operator: FilterOperator.OR, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
        'activity': {value: null, matchMode: FilterMatchMode.BETWEEN},
        'verified': {value: null, matchMode: FilterMatchMode.EQUALS}
      }
    };
    return {
      selectedOffer,
      offers,
      filters1,
      statuses,
      offerDetailsInfo,
      clearFilter1,
      initFilters1,
      updateData,
      statusControl,
      offerDelete

    }
  }
}
</script>
<style  >
.offer-badge {
  border-radius: 2px;
  padding: 0.25rem 1rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: .3px;
}
.offer-badge.status-olumsuz {
  background-color: #ffcdd2;
  color: #c63737;
}
.offer-badge.status-olumlu {
  background-color: #c8e6c9;
  color: #256029;
}
.offer-badge.status-beklemede {
  background-color: #ffd8b2;
  color: #805b36;
}

</style>