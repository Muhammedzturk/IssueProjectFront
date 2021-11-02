<template>
<div class="card">
<h5>Firma Listesi</h5>
    <div class="card"  style="height: calc(100vh - 143px)">
<DataTable  :value="companies"  v-model:selection="selectedCompanies"  selectionMode="single" dataKey="id"
            showGridlines responsiveLayout="scroll" :scrollable="true" scrollHeight="flex"
           v-model:filters="filters1" filterDisplay="menu" class="p-datatable-companies"
            :globalFilterFields="['offerPrefix','companyName','address','phoneNumber','faxNumber','companyContact']">
  <!-- DataTable üst kısımdaki butonlar ve filtreleme inputu -->
  <template #header>
    <div class="p-d-flex p-jc-between">

      <create-company

      @send-data="sendData"
      >
      </create-company>

      <Button type="button" icon="pi pi-filter-slash" label="Filtreleri Temizle" class="p-button-mr-2  p-button-outlined"
              @click="clearFilter1()" style="border-radius: 0.5rem"/>
      <span class="p-input-icon-left">
        <i class="pi pi-search col-offset-12" />
        <InputText class="col-offset-12" v-model="filters1['global'].value" placeholder="Genel arama" />
      </span>
    </div>
  </template>

  <!-- filtreleme sonucunda herhangi bir değer bulunamadı kısmı -->
  <template #empty>
    Bir sonuç bulunamadı...
  </template>

  <!-- Firma DataTable kısmı -->

  <Column field="offerPrefix" header="Teklif Ön Ek"  >
    <template #body="{data}">
      {{data.offerPrefix}}
    </template>
  </Column>

  <Column field="companyName" header="Firma Adı"  >
    <template #body="{data}">
      {{data.companyName}}
    </template>
  </Column>

  <Column field="address" header="Adres" style="width: 300px">
    <template #body="{data}">
      {{data.address}}
    </template>
  </Column>
  <Column field="phoneNumber" header="Telefon">
    <template #body="{data}">
      {{data.phoneNumber}}
    </template>
  </Column>
  <Column field="faxNumber" header="Fax">
    <template #body="{data}">
      {{data.faxNumber}}
    </template>
  </Column>
  <!-- Firma ilgili gösterme butonu -->
  <Column :exportable="false" style="min-width:8rem" header="Firma İlgilisi">
    <template #body="slotProps">
         <contact-list
         @send-data-contact-list="sendDataContactList"
         :companyName="slotProps.data.companyName"
          :data="slotProps.data"
         ></contact-list>
</template>
  </Column>
  <!-- Firma ilgili gösterme butonu bitişi -->

  <!-- Firma tablosunun güncelle ve sil butonlarının olduğu sütun -->
  <Column :exportable="false" style="min-width:8rem" header="Güncelle ve Sil">
    <template #body="slotProps">
      <update-company
          @send-data-update="sendDataUpdate"
          :data="slotProps.data"
          :companyName="slotProps.data.companyName"
          @send-data-delete="sendDataDelete"

      ></update-company>


    </template>
  </Column>
</DataTable>
    </div>


</div>

</template>

<script>
import {onMounted, ref} from 'vue';
import {FilterMatchMode,FilterOperator} from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import { email, required } from "@vuelidate/validators";
import CreateCompany from "../../../components/Company/CreateCompany";
import UpdateCompany from "../../../components/Company/UpdateCompany";
import ContactList from "../Contacts/ContactList";
import CompanyService from "../../../service/company.service";


export default {
  components: {ContactList, UpdateCompany, CreateCompany},
  setup() {
    onMounted(async() => {
      await CompanyService.getCompanyList().then(r =>{
        companies.value= r.payload.map((data,index) =>{
          return {
            index:index,
            id:data.id,
            offerPrefix:data.offerPrefix,
            companyName:data.companyName,
            address:data.address,
            phoneNumber:data.phoneNumber,
            faxNumber:data.faxNumber,
          }
        })
      })

    });
    const toast = useToast();
    const companyDialogUpdate = ref(false);
    const companyDialog = ref(false);
    const company = ref({});
    const selectedCompanies = ref();
    const submitted = ref(false);
    const rules = {
      email: { required, email },

    }
//company tablosunda firma bilgisi güncelleme işlemi
    const sendDataUpdate = (data) => {
      let index = findIndexById(data.id)
      companies.value[index] = data;
    };

// yeni firma oluşturma işlemi
    const sendData = (data) => {
      data.offerNumber = "1000"
    CompanyService.companiesPost(data).then()
      companies.value.push({
        offerPrefix:data.offerPrefix,
        companyName:data.companyName,
        address:data.address,
        phoneNumber:data.phoneNumber,
        faxNumber:data.faxNumber,

      })
    };
    const sendDataContactList = () =>{

    }

    //tek satırdaki firma silme işlemi
    const sendDataDelete = (deleteId) => {
      let index = findIndexById(deleteId)
      companies.value.splice(index,1)
      toast.add({severity:'warn', summary: 'Firma Silindi.', life: 3000});
    };


    //dialogları kapama işlemi
    const hideDialog = () => {
      companyDialogUpdate.value=false;
      submitted.value = false;
    };



    //firma tablosunda güncelleme işleminde id bulma işlemi
    const findIndexById = (id) => {
      let index = -1;
      for (let i = 0; i < companies.value.length; i++) {
        if (companies.value[i].id === id) {
          index = i;
          break;
        }
      }
      return index;
    };



    const companies = ref(null);
    const companyContacts = ref(null);
    //firma tablosu filtreleme işlemi
    const filters1 = ref({
      'global': {value: null, matchMode: FilterMatchMode.CONTAINS},

    });

    //firma tablosu filtreleri temizle butonu işlemi
    const clearFilter1 = () => {
      initFilters1();

    };

    //firma tablosu filtreleri temizle işleminde temizlenecek değerler
    const initFilters1 = () => {
      filters1.value = {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},

      }
    };

    return {clearFilter1, initFilters1, companies, filters1,FilterMatchMode,FilterOperator,
     companyDialogUpdate,selectedCompanies,submitted,hideDialog,rules,companyDialog,company,sendDataUpdate,
      sendData,findIndexById,sendDataDelete,sendDataContactList,companyContacts
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
