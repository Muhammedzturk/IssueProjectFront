<template>
  <!-- Firma İlgili Tablosu -->

  <Button type="button" label="Görüntüle" icon="pi pi-users" class=" p-button-info p-button-outlined"  @click="showContactTable()" style="border-radius: 0.5rem"/>

  <Dialog v-model:visible="companyContactsDialog" :style="{width: '1000px'}"  :modal="true" class="p-fluid">
    <h5><b>{{companyName}}</b> Firması İlgilileri</h5>

    <div class="card"  style="height: calc(100vh - 143px)">
      <DataTable  :value="companyContacts"  ref="dt"  v-model:selection="selectedContacts"  selectionMode="single" dataKey="id" showGridlines responsiveLayout="scroll"
                  :scrollable="true" scrollHeight="flex"
                  v-model:filters="filters2" filterDisplay="menu" class="p-datatable-companyContacts"
                  :globalFilterFields="['userName','task','contactPhoneNumber','email']">
        <template #header>
          <div class="grid">
            <!-- firma ilgili ekleme componenti -->
            <create-contact

                @send-data-create-contact="sendDataCreateContact"

            ></create-contact>

            <div class="col-3">
              <Button type="button" icon="pi pi-filter-slash" label="Filtreleri Temizle" class="p-button-mr-2 p-button-outlined" @click="clearFilter2()" style="border-radius: 0.5rem"/>
            </div>
            <div class="col-3">
      <span class="p-input-icon-left">
        <i class="pi pi-search ml-auto"  />
        <InputText class=" ml-auto " v-model="filters2['global'].value" placeholder="Genel arama" />
      </span>
            </div>
          </div>

        </template>
        <template #empty>
          Bir sonuç bulunamadı...
        </template>

        <Column field="userName" header="Ad Soyad"  >
          <template #body="{data}">
            {{data.userName}}
          </template>
        </Column>

        <Column field="task" header="Görevi"  >
          <template #body="{data}">
            {{data.task}}
          </template>
        </Column>

        <Column field="contactPhoneNumber" header="Telefon"  >
          <template #body="{data}">
            {{data.contactPhoneNumber}}
          </template>
        </Column>

        <Column field="email" header="E-mail"  >
          <template #body="{data}">
            {{data.email}}
          </template>
        </Column>

        <Column :exportable="false" style="min-width:8rem" header="Güncelle ve Sil">
          <template #body="slotProps">

            <!-- firma ilgili güncelleme componenti -->
            <update-contact

                @send-data-update-contact="sendDataUpdateContact"
                :data="slotProps.data"
                @send-data-delete-contact="sendDataDeleteContact"

            ></update-contact>

          </template>
        </Column>

      </DataTable>

    </div>

  </Dialog>
  <!-- Firma ilgili tablosu bitiş -->

</template>

<script>
import CreateContact from "../../../components/Contacts/CreateContact";
import UpdateContact from "../../../components/Contacts/UpdateContact";
import {onMounted, ref} from "vue";
import {FilterMatchMode, FilterOperator} from "primevue/api";
import CustomerService from "../Company/CustomerService";
import { useToast } from 'primevue/usetoast';

export default {
  emits:['send-data-contact-list'],
  props:['data','companyName'],
  components: {UpdateContact, CreateContact},
  setup(props,{emit}) {
    onMounted(() => {
      customerService.value.getCustomersXLarge().then(data => {
        companyContacts.value = data;
        companyContacts.value.forEach(companyContacts => companyContacts.date = new Date(companyContacts.date));
      });

    })


    const toast = useToast();
    const contacts = ref();
    const companyContacts = ref();
    const companyContactsDialog = ref(false);
    const deleteContactDialog = ref(false);
    const contact = ref({});
    const customerService = ref(new CustomerService());
    const selectedContacts = ref();

    //tek satırdaki firma ilgilisi silme işlemi
    const sendDataDeleteContact = (deleteId) => {
      console.log("dataaa",deleteId)
      let index = companyContacts.value.findIndex(i =>{
        return i.id == deleteId
      });
      companyContacts.value.splice(index,1)
      toast.add({severity:'warn', summary: 'Firma İlgilisi Silindi.', life: 3000});
    };
    //firma ilgilisi güncelleme işlemi
    const sendDataUpdateContact = (data) => {
      console.log("dataaa",data)
      let index = findIndexByIdContact(data.id)
      console.log("index",index)
      companyContacts.value[index] = data;
    };
    //yeni firma ilgilisi oluşturma
    const sendDataCreateContact = (data) => {
      companyContacts.value.push({
        userName:data.userName,
        task:data.task,
        contactPhoneNumber:data.contactPhoneNumber,
        email:data.email

      })
    };
    //firma ilgilisi kısmında göster butonunun click i
    const showContactTable = (cont) => {
      console.log('burdada')
      emit("sendDataContactList",contact.value)
      contact.value = cont;
      companyContactsDialog.value = true;
    };

    //firma ilgili tablosunda güncelleme işleminde id bulma işlemi
    const findIndexByIdContact = (id) => {
      let index = -1;
      for (let i = 0; i < companyContacts.value.length; i++) {
        if (companyContacts.value[i].id === id) {
          index = i;
          break;
        }
      }

      return index;
    };
    //firma ilgilisi filtreleme işlemi
    const filters2 = ref({
      'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
      'userName':{value: null, matchMode: FilterMatchMode.CONTAINS},
      'task': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
      'contactPhoneNumber': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
      'email': {value: null, matchMode: FilterMatchMode.STARTS_WITH}
    });
    //firma ilgili tablosu filtreleri temizle butonu işlemi
    const clearFilter2 = () => {
      initFilters2();

    };
    //firma ilgili tablosu filtreleri temizle işleminde temizlenecek değerler
    const initFilters2 = () => {
      filters2.value = {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        'userName':{value: null, matchMode: FilterMatchMode.CONTAINS},
        'task': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        'contactPhoneNumber': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        'email': {value: null, matchMode: FilterMatchMode.STARTS_WITH}
      }
    };

    return {FilterMatchMode, FilterOperator,companyContacts,contacts,sendDataUpdateContact,sendDataDeleteContact,companyContactsDialog,
      deleteContactDialog,contact,findIndexByIdContact,sendDataCreateContact,CustomerService,showContactTable,selectedContacts,
      filters2,clearFilter2,initFilters2
    }
  }
}

</script>

<style scoped>

</style>