<template>
<div class="card">
<h5>Firma Listesi</h5>
    <div class="card"  style="height: calc(100vh - 143px)">
<DataTable  :value="customers2"  ref="dt"  v-model:selection="selectedProducts"  selectionMode="single" dataKey="id" showGridlines responsiveLayout="scroll" :scrollable="true" scrollHeight="flex"
           v-model:filters="filters1" filterDisplay="menu" class="p-datatable-customers"  :globalFilterFields="['offerPrefix','companyName','address','phoneNumber','faxNumber','companyContact']">
  <!-- DatatTable üst kısımdaki butonlar ve filtreleme inputu -->
  <template #header>
    <div class="p-d-flex p-jc-between">
      <Button label=" Yeni Firma Oluştur" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
      <Button label="Tüm Firmaları Sil" icon="pi pi-trash" class="p-button-danger mr-2" @click="confirmDeleteSelected" />
      <Button type="button" icon="pi pi-filter-slash" label="Filtreleri Temizle" class="p-button-mr-2" @click="clearFilter1()"/>
      <span class="p-input-icon-left">
        <i class="pi pi-search col-offset-8"  />
        <InputText class="col-offset-8" v-model="filters1['global'].value" placeholder="Genel arama" />
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
    <template #filter="{filterModel,filterCallback}">
      <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" :placeholder="`Firma Adı Ara - `"
                 v-tooltip.top.focus="'Yazarken filtreleyin'"/>
    </template>
  </Column>

  <Column field="companyName" header="Firma Adı"  >
    <template #body="{data}">
      {{data.companyName}}
    </template>
    <template #filter="{filterModel,filterCallback}">
      <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" :placeholder="`Firma Adı Ara - `"
                 v-tooltip.top.focus="'Yazarken filtreleyin'"/>
    </template>
  </Column>

  <Column field="address" header="Adres" style="width: 300px">
    <template #body="{data}">
      {{data.address}}
    </template>
    <template #filter="{filterModel,filterCallback}">
      <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" placeholder="Adres Ara" v-tooltip.top.focus="'Yazarken filtreleyin'"/>
    </template>
  </Column>
  <Column field="phoneNumber" header="Telefon">
    <template #body="{data}">
      {{data.phoneNumber}}
    </template>
    <template #filter="{filterModel,filterCallback}">
      <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" placeholder="Telefon Ara" v-tooltip.top.focus="'Yazarken filtreleyin'"/>
    </template>
  </Column>
  <Column field="faxNumber" header="Fax">
    <template #body="{data}">
      {{data.faxNumber}}
    </template>
    <template #filter="{filterModel,filterCallback}">
      <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" placeholder="Fax Ara" v-tooltip.top.focus="'Yazarken filtreleyin'"/>
    </template>
  </Column>
  <!-- Firma ilgili gösterme butonu -->
  <Column :exportable="false" style="min-width:8rem" header="Firma İlgilisi">
    <template #body="slotProps">
      <Button type="button" label="Göster" icon="pi pi-users" class=" p-button-info"  @click="showContactTable(slotProps.data)" />
    </template>
  </Column>
  <!-- Firma ilgili gösterme butonu bitişi -->

  <!-- Firma tablosunun güncelle ve sil butonlarının olduğu sütun -->
  <Column :exportable="false" style="min-width:8rem" header="Güncelle ve Sil">
    <template #body="slotProps">
      <Button icon="pi pi-pencil" class=" ml-auto mr-2 p-button-rounded p-button-success p-mr-2" @click="editProduct(slotProps.data)" />
      <Button icon="pi pi-trash" class=" p-button-rounded p-button-danger" @click="confirmDeleteProduct(slotProps.data)" />
    </template>
  </Column>
</DataTable>
    </div>

  <!-- Firma ilgili oluşturma kısmı -->

  <Dialog v-model:visible="contactDialog" :style="{width: '450px'}" header="Firma İlgili Oluştur" :modal="true" class="p-fluid">

    <div class="p-field">
      <label for="userName">Ad Soyad*</label>
      <InputText id="userName" v-model.trim="contact.userName" required="true" autofocus :class="{'p-invalid': sended && !contact.userName}" />
      <small class="p-error" v-if="sended && !contact.userName">Ad Soyad Boş Bırakılamaz.</small>
    </div>

    <div class="p-field">
      <label for="task">Görevi*</label>
      <InputText id="task" v-model="contact.task" required="true" autofocus :class="{'p-invalid': sended && !contact.task}" />
      <small class="p-error" v-if="sended && !contact.task">Görevi Boş Bırakılamaz.</small>
    </div>
    <div class="p-field">
      <label for="contactPhoneNumber">Telefon*</label>
      <InputMask mask="(999) 999-9999" id="contactPhoneNumber" v-model="contact.contactPhoneNumber" required="true" autofocus :class="{'p-invalid': sended && !contact.contactPhoneNumber}" />
      <small class="p-error" v-if="sended && !contact.contactPhoneNumber">Adres Boş Bırakılamaz.</small>
    </div>

    <div class="p-field">
      <label for="email">E-mail*</label>
      <InputText id="email" v-model="contact.email" required="true" autofocus :class="{'p-invalid': sended && !contact.email}" />
      <small class="p-error" v-if="sended && !contact.email">E-mail Boş Bırakılamaz.</small>
    </div>

    <template #footer>
      <Button label="İptal" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
      <Button label="Kaydet" icon="pi pi-check" class="p-button-text" @click="saveContact" />
    </template>
  </Dialog>

  <!-- firma ilgili oluşturma bitiş -->

  <!-- Firma İlgili Tablosu -->

  <Dialog v-model:visible="companyContactsDialog" :style="{width: '1000px'}"  :modal="true" class="p-fluid">
    <h5><b>{{contact.companyName}}</b> Firması İlgilileri</h5>

    <div class="card"  style="height: calc(100vh - 143px)">
  <DataTable  :value="companyContacts"  ref="dt"  v-model:selection="selectedProducts"  selectionMode="single" dataKey="id" showGridlines responsiveLayout="scroll" :scrollable="true" scrollHeight="flex"
              v-model:filters="filters2" filterDisplay="menu" class="p-datatable-companyContacts"  :globalFilterFields="['userName','task','contactPhoneNumber','email']">
    <template #header>
      <div class="grid">
        <div class="col-3" >
          <Button type="button" icon="pi pi-user-plus" label="Firma İlgilisi Oluştur" class="p-button-success mr-2"  @click="openNewContact"/>
        </div>
      <div class="col-3">
        <Button label="Tüm İlgilileri Sil" icon="pi pi-trash" class="p-button-danger mr-2" @click="deleteContacts" />
      </div>
        <div class="col-3">
          <Button type="button" icon="pi pi-filter-slash" label="Filtreleri Temizle" class="p-button-mr-2" @click="clearFilter2()"/>
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
        <Button icon="pi pi-pencil" class=" ml-auto mr-2 p-button-rounded p-button-success p-mr-2" @click="editContact(slotProps.data)" />
        <Button icon="pi pi-trash" class=" p-button-rounded p-button-danger" @click="confirmDeleteContact(slotProps.data)" />
      </template>
    </Column>

    </DataTable>
    </div>

    </Dialog>
    <!--  firma ilgilisi bilgisi güncelleme işlemi -->

    <Dialog v-model:visible="contactDialogUpdate" :style="{width: '450px'}" header="Firma İlgilisi Güncelle" :modal="true" class="p-fluid">

      <div class="p-field">
        <label for="userName">Ad Soyad*</label>
        <InputText id="userName" v-model.trim="contact.userName" required="true" autofocus :class="{'p-invalid': sended && !contact.userName}" />
        <small class="p-error" v-if="sended && !contact.userName">Ad Soyad Boş Bırakılamaz.</small>
      </div>

      <div class="p-field">
        <label for="task">Görevi*</label>
        <InputText id="task" v-model="contact.task" required="true" autofocus :class="{'p-invalid': sended && !contact.task}" />
        <small class="p-error" v-if="sended && !contact.task">Görevi Boş Bırakılamaz.</small>
      </div>

      <div class="p-field">
        <label for="contactPhoneNumber">Telefon*</label>
        <InputMask  id="contactPhoneNumber"  mask="(999) 999-9999" v-model="contact.contactPhoneNumber" required="true" autofocus :class="{'p-invalid': sended && !contact.contactPhoneNumber}" />
        <small class="p-error" v-if="sended && !contact.contactPhoneNumber">Telefon Boş Bırakılamaz.</small>
      </div>

      <div class="p-field">
        <label for="email" class="p-mb-3">E-mail*</label>
        <InputText id="email" v-model.trim="contact.email" required="true" autofocus :class="{'p-invalid': sended && !contact.email}" />
        <small class="p-error" v-if="sended && !contact.email">E-mail Boş Bırakılamaz.</small>
      </div>

      <template #footer>
        <Button label="İptal" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
        <Button label="Güncelle" icon="pi pi-check" class="p-button-text" @click="saveContact" />
      </template>
    </Dialog>

    <!-- firma ilgilisi bilgisi güncelleme işlemi bitişi -->

  <!-- Firma ilgili tablosu bitiş -->



  <!-- yeni firma oluşturma işlemi -->
  <Dialog v-model:visible="productDialog" :style="{width: '450px'}" header="Listeye Firma Ekle" :modal="true" class="p-fluid">

    <div class="p-field">
      <label for="offerPrefix">Teklif Ön Ek*</label>
      <InputText id="offerPrefix" v-model.trim="product.offerPrefix" required="true" autofocus :class="{'p-invalid': submitted && !product.offerPrefix}" />
      <small class="p-error" v-if="submitted && !product.offerPrefix">Teklif Ön Ek Boş Bırakılamaz.</small>
    </div>

    <div class="p-field">
      <label for="companyName">Firma Adı*</label>
      <InputText id="companyName" v-model="product.companyName" required="true" autofocus :class="{'p-invalid': submitted && !product.companyName}" />
      <small class="p-error" v-if="submitted && !product.companyName">Firma Adı Boş Bırakılamaz.</small>
    </div>
    <div class="p-field">
      <label for="address">Adres*</label>
      <Textarea id="address" v-model="product.address" required="true" rows="3" cols="20" :class="{'p-invalid': submitted && !product.address}" />
      <small class="p-error" v-if="submitted && !product.address">Adres Boş Bırakılamaz.</small>
    </div>
    <div class="p-field">
          <label for="phoneNumber" class="p-mb-3">Telefon*</label>
          <InputMask mask="(999) 999-9999" id="phoneNumber" v-model="product.phoneNumber" required="true" autofocus :class="{'p-invalid': submitted && !product.phoneNumber}" />
          <small class="p-error" v-if="submitted && !product.phoneNumber">Telefon Boş Bırakılamaz.</small>
    </div>

    <div class="p-field">
        <label for="faxNumber" class="p-mb-3">Fax</label>
        <InputMask mask="(999) 999-9999" id="faxNumber" v-model="product.faxNumber" required="true" autofocus :class="{'p-invalid': submitted && !product.faxNumber}" />
    </div>

    <div class="p-field">
      <label for="companyContact">Firma İlgilisi*</label>
      <InputText id="companyContact" v-model="product.companyContact" required="true" autofocus :class="{'p-invalid': submitted && !product.companyContact}" />
      <small class="p-error" v-if="submitted && !product.companyContact">Firma İlgilisi Boş Bırakılamaz.</small>
    </div>
    <template #footer>
      <Button label="İptal" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
      <Button label="Kaydet" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
    </template>
  </Dialog>

  <!--  firma bilgisi güncelleme işlemi -->
  <Dialog v-model:visible="productDialogUpdate" :style="{width: '450px'}" header="Firma Güncelle" :modal="true" class="p-fluid">

    <div class="p-field">
      <label for="offerPrefix">Teklif Ön Ek*</label>
      <InputText id="offerPrefix" v-model.trim="product.offerPrefix" required="true" autofocus :class="{'p-invalid': submitted && !product.offerPrefix}" />
      <small class="p-error" v-if="submitted && !product.offerPrefix">Teklif Ön Ek Boş Bırakılamaz.</small>
    </div>

    <div class="p-field">
      <label for="companyName">Firma Adı*</label>
      <InputText id="companyName" v-model="product.companyName" required="true" autofocus :class="{'p-invalid': submitted && !product.companyName}" />
      <small class="p-error" v-if="submitted && !product.companyName">Firma Adı Boş Bırakılamaz.</small>
    </div>
    <div class="p-field">
      <label for="address">Adres*</label>
      <Textarea id="address" v-model="product.address" required="true" rows="3" cols="20" :class="{'p-invalid': submitted && !product.address}" />
      <small class="p-error" v-if="submitted && !product.address">Adres Boş Bırakılamaz.</small>
    </div>
    <div class="p-field">
      <label for="phoneNumber" class="p-mb-3">Telefon*</label>
      <InputMask mask="(999) 999-9999" id="phoneNumber" v-model="product.phoneNumber" required="true" autofocus :class="{'p-invalid': submitted && !product.phoneNumber}" />
      <small class="p-error" v-if="submitted && !product.phoneNumber">Telefon Boş Bırakılamaz.</small>
    </div>

    <div class="p-field">
      <label for="faxNumber" class="p-mb-3">Fax</label>
      <InputMask mask="(999) 999-9999" id="faxNumber" v-model="product.faxNumber" required="true" autofocus :class="{'p-invalid': submitted && !product.faxNumber}" />
    </div>

    <div class="p-field">
      <label for="companyContact">Firma İlgilisi*</label>
      <InputText id="companyContact" v-model="product.companyContact" required="true" autofocus :class="{'p-invalid': submitted && !product.companyContact}" />
      <small class="p-error" v-if="submitted && !product.companyContact">Firma İlgilisi Boş Bırakılamaz.</small>
    </div>
    <template #footer>
      <Button label="İptal" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
      <Button label="Güncelle" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
    </template>
  </Dialog>

  <!-- Tek satırdaki firmayı silme işlemi -->
  <Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" header="Firma Sil" :modal="true">
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3 " style="font-size: 2rem" />
      <span v-if="product">{{product.companyName}} firmasını silmek istediğinizden emin misiniz<b></b>?</span>
    </div>
    <template #footer>
      <Button label="Hayır" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false"/>
      <Button label="Evet" icon="pi pi-check" class="p-button-text" @click="deleteProduct" />
    </template>
  </Dialog>
  <!-- Tüm Firmaları Silme İşlemi -->
  <Dialog v-model:visible="deleteProductsDialog" :style="{width: '450px'}" header="Tüm Firmaları Sil" :modal="true">
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="product">Tüm firmaları silmek istediğinizden emin misiniz?</span>
    </div>
    <template #footer>
      <Button label="Hayır" icon="pi pi-times" class="p-button-text" @click="deleteProductsDialog = false"/>
      <Button label="Evet" icon="pi pi-check" class="p-button-text" @click="deleteSelectedProducts" />
    </template>
  </Dialog>

  <!-- Tüm Firma İlgililerini Silme İşlemi -->
  <Dialog v-model:visible="deleteContactsDialog" :style="{width: '450px'}" header="Tüm Firma İlgililerini Sil" :modal="true">
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="contact">Tüm firma ilgililerini silmek istediğinizden emin misiniz?</span>
    </div>
    <template #footer>
      <Button label="Hayır" icon="pi pi-times" class="p-button-text" @click="deleteContactsDialog = false"/>
      <Button label="Evet" icon="pi pi-check" class="p-button-text" @click="deleteSelectedContacts" />
    </template>
  </Dialog>
  <!--  Tek satırdaki firma ilgilisi silme işlemi-->
  <Dialog v-model:visible="deleteContactDialog" :style="{width: '450px'}" header=" Firma İlgilisi Sil" :modal="true">
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3 " style="font-size: 2rem" />
      <span v-if="contact">{{contact.userName}} kişisini silmek istediğinizden emin misiniz<b></b>?</span>
    </div>
    <template #footer>
      <Button label="Hayır" icon="pi pi-times" class="p-button-text" @click="deleteContactDialog = false"/>
      <Button label="Evet" icon="pi pi-check" class="p-button-text" @click="deleteContact" />
    </template>
  </Dialog>



</div>

</template>

<script>
import { ref, onMounted } from 'vue';
import {FilterMatchMode,FilterOperator} from 'primevue/api';
import CustomerService from './CustomerService';
import { useToast } from 'primevue/usetoast';
import ProductService from './productService';
import { email, required } from "@vuelidate/validators";
export default {
  setup() {
    onMounted(() => {
      customerService.value.getCustomersXLarge().then(data => {
        companyContacts.value = data;
        companyContacts.value.forEach(companyContacts => companyContacts.date = new Date(companyContacts.date));
      });

      customerService.value.getCustomersLarge().then(data => {
        customers2.value = data;
        loading2.value = false;
        customers2.value.forEach(customers2 => customers2.date = new Date(customers2.date));
      });
    })
    onMounted(() => {
      productService.value.getProductsSmall().then(data => products.value = data);
    });
    onMounted(() => {
      productService.value.getProductsSmall().then(data => contacts.value = data);
    })
    const toast = useToast();
    const products = ref();
    const contacts = ref();
    const companyContacts = ref();
    const productService = ref(new ProductService());
    const productDialog = ref(false);
    const productDialogUpdate = ref(false);
    const contactDialog = ref(false);
    const contactDialogUpdate = ref(false);
    const companyContactsDialog = ref(false);
    const deleteProductDialog = ref(false);
    const deleteContactDialog = ref(false);
    const deleteProductsDialog = ref(false);
    const deleteContactsDialog = ref(false);
    const product = ref({});
    const contact = ref({});
    const selectedProducts = ref();
    const submitted = ref(false);
    const sended = ref(false);
    const rules = {
      email: { required, email },
    }
    const openNew = () => {
      product.value = {};
      submitted.value = false;
      productDialog.value = true;
    };
    const openNewContact = () => {
      contact.value = {};
      sended.value = false;
      contactDialog.value = true;
    };
    const hideDialog = () => {
      productDialog.value = false;
      contactDialog.value = false;
      contactDialogUpdate.value=false;
      productDialogUpdate.value=false;
      submitted.value = false;
      sended.value = false;

    };
    //firma bilgisi güncelleme ve oluşturma kısımlarındam güncelleme ve kaydet butonlarının işlemi
    const saveProduct = () => {
      submitted.value = true;
      if (product.value.companyName) {
        if (product.value.id) {
          customers2.value[findIndexById(product.value.id)] = product.value;
          toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        }
        else {
          product.value.id = createId();
          customers2.value.push(product.value);
          toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
        }

        productDialog.value = false;
        productDialogUpdate.value = false;
        product.value = {};
      }
    };
    //firma ilgilisi güncelleme ve oluşturma kısımlarındam güncelleme ve kaydet butonlarının işlemi
    const saveContact = () => {
      sended.value = true;
      console.log('contact.value',contact.value);
      if (contact.value.userName) {
        console.log('dsfsdf');
        if (contact.value.id) {
          console.log('contact.value.id',contact.value.id);
          console.log('contact.value',contact.value);
          companyContacts.value[findIndexByIdContact(contact.value.id)] = contact.value;
          console.log(' companyContacts.value[findIndexById(contact.value.id)]', companyContacts.value[findIndexById(contact.value.id)]);
          toast.add({severity:'success', summary: 'Successful', detail: 'Contact Updated', life: 3000});
        }
        else {
          contact.value.id = createId();
          companyContacts.value.push(contact.value);
          toast.add({severity:'success', summary: 'Successful', detail: 'Contact Created', life: 3000});
        }

        contactDialog.value=false;
        contactDialogUpdate.value = false;
        contact.value = {};
      }
    };
    //firma düzenleme kısmınında ki düzenle buton click'i
    const editProduct = (prod) => {
      product.value = {...prod};
      productDialogUpdate.value = true;
    };
    //firma ilgilisi düzenle kısmındaki düzenle butonunun click'i
    const editContact = (cont) => {
      contact.value = {...cont};
      contactDialogUpdate.value = true;
    };

    //firma tablosunda tek satırdaki firmayı sil butonunun click'i
    const confirmDeleteProduct = (prod) => {
      product.value = prod;
      deleteProductDialog.value = true;
    };
    //firma ilgili tablosunda tek satırdaki firmayı sil butonunun click'i
    const confirmDeleteContact = (cont) => {
      contact.value = cont;
      deleteContactDialog.value = true;
    };
    //firma ilgilisi kısmında göster butonunun click i
    const showContactTable = (cont) => {
      contact.value = cont;
      companyContactsDialog.value = true;
    };
    //firma tablosunda tek satırı silme işleminde evet butonunun işlemi
    const deleteProduct = () => {
      customers2.value = customers2.value.filter(val => val.id !== product.value.id);
      deleteProductDialog.value = false;
      product.value = {};
      toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
    };
    //firma ilgili tablosunda tek satırı silme işleminde evet butonunun işlemi
    const deleteContact = () => {
      companyContacts.value = companyContacts.value.filter(val => val.id !== contact.value.id);
      console.log('girdi')
      deleteContactDialog.value = false;
      contact.value = {};
      toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
    };
    const findIndexById = (id) => {
      let index = -1;
      for (let i = 0; i < customers2.value.length; i++) {
        if (customers2.value[i].id === id) {
          index = i;
          break;
        }
      }

      return index;
    };
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
    const createId = () => {
      let id = '';
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for ( var i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
    }

    //tüm firmaları sil butonunun click i
    const confirmDeleteSelected = () => {
      deleteProductsDialog.value = true;
    };

    //firma ilgililerinin hepsini silme butonunun click i
    const deleteContacts = () => {
      deleteContactsDialog.value = true;
    };
    //firmaların hepsini silen kısım
    const deleteSelectedProducts = () => {
      customers2.value = customers2.value.filter (val => !customers2.value.includes(val));
      deleteProductsDialog.value = false;
      toast.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
    };
    //firma ilgililerinin hepsini silen kısım
    const deleteSelectedContacts = () => {
      companyContacts.value = companyContacts.value.filter (val => !companyContacts.value.includes(val));
      deleteContactsDialog.value = false;
      toast.add({severity:'success', summary: 'Successful', detail: 'Contacts Deleted', life: 3000});
    };

    const onRowSelect = (event) => {
      toast.add({severity: 'info', summary: 'Product Selected', detail: 'Name: ' + event.data.name, life: 3000});
    };

    const onRowUnselect = (event) => {
      toast.add({severity: 'warn', summary: 'Product Unselected', detail: 'Name: ' + event.data.name, life: 3000});
    };

    const customers1 = ref(null);
    const customers2 = ref(null);
    const customerService = ref(new CustomerService());
    const filters1 = ref({
      'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
      'offerPrefix': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
      'companyName': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
      'address': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
      'phoneNumber': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
      'faxNumber': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
      'companyContact': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
    });
    const filters2 = ref({
      'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
      'userName':{value: null, matchMode: FilterMatchMode.CONTAINS},
      'task': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
      'contactPhoneNumber': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
      'email': {value: null, matchMode: FilterMatchMode.STARTS_WITH}
    });

    const clearFilter1 = () => {
      initFilters1();

    };
    const clearFilter2 = () => {
      initFilters2();

    };
    const initFilters2 = () => {
      filters2.value = {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        'userName':{value: null, matchMode: FilterMatchMode.CONTAINS},
        'task': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        'contactPhoneNumber': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        'email': {value: null, matchMode: FilterMatchMode.STARTS_WITH}
      }
    };
    const initFilters1 = () => {
      filters1.value = {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        'companyName': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        'offerPrefix': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        'address': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        'phoneNumber': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        'faxNumber': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        'companyContact': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
      }
    };
    const loading1 = ref(true);
    const loading2 = ref(true);
    return {clearFilter1,clearFilter2, initFilters1,initFilters2,customers1, customers2, filters1, filters2,FilterMatchMode,FilterOperator,
     onRowSelect,onRowUnselect,loading1,loading2,productDialog,productDialogUpdate,contactDialog,deleteProductDialog,deleteProductsDialog,
      deleteContactDialog,deleteContactsDialog,product,selectedProducts,submitted,sended,openNew,openNewContact,hideDialog,saveProduct,
      findIndexById,findIndexByIdContact, createId,confirmDeleteSelected, deleteContacts,deleteSelectedProducts,deleteSelectedContacts,
      editProduct,editContact,confirmDeleteProduct,confirmDeleteContact,deleteProduct,deleteContact,rules,companyContacts,companyContactsDialog,
      showContactTable,contact,saveContact,contactDialogUpdate}
  }
}
</script>
<style lang="scss" scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 960px) {
    align-items: start;
  }
}

.product-image {
  width: 50px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .product-image {
  width: 50px;
  margin: 0 auto 2rem auto;
  display: block;
}

.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
@media screen and (max-width: 960px) {
  ::v-deep(.p-toolbar) {
    flex-wrap: wrap;

    .p-button {
      margin-bottom: 0.25rem;
    }
  }
}
</style>
