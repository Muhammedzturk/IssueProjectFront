<template>
<div class="card">
<h5>Firma Listesi</h5>
<div class="card"  style="height: calc(100vh - 143px)">

<DataTable  :value="customers2" v-model:selection="selectedProduct1"  selectionMode="single" dataKey="id" showGridlines responsiveLayout="scroll" :scrollable="true" scrollHeight="flex"
           v-model:filters="filters1" filterDisplay="menu" class="p-datatable-customers"  :globalFilterFields="['companyName','address','phoneNumber','faxNumber','companyContact']"
             :loading="loading2">
  <template #header>
    <div class="p-d-flex p-jc-between">
      <Button type="button" icon="pi pi-filter-slash" label="Filtreleri Temizle" class="p-button-outlined" @click="clearFilter1()"/>
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText v-model="filters1['global'].value" placeholder="Genel arama" />
      </span>
    </div>
  </template>
  <template #empty>
    Bir sonuç bulunamadı...
  </template>
  <template #loading>
    Yükleniyor. Lütfen Bekleyiniz...
  </template>
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
  <Column field="companyContact" header="Firma İlgilisi" style="width: 200px">
   <template #body="{data}">
    {{data.companyContact}}
</template>
<template #filter="{filterModel,filterCallback}">
  <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" placeholder="Firma İlgili Ara" v-tooltip.top.focus="'Yazarken filtreleyin'"/>
</template>
  </Column>
</DataTable>
</div>
  <SplitButton label="Save" icon="pi pi-plus" :model="items" class="p-button-secondary p-mb-2"></SplitButton>
</div>

</template>

<script>
import { ref, onMounted } from 'vue';
import {FilterMatchMode,FilterOperator} from 'primevue/api';
import CustomerService from './CustomerService';
import { useToast } from 'primevue/usetoast';
import ProductService from './productService';
import router from "../../../router";
export default {
  setup() {
    onMounted(() => {
      customerService.value.getCustomersLarge().then(data => {
        customers1.value = data;
        loading1.value = false;
        customers1.value.forEach(customer => customer.date = new Date(customer.date));
      });

      customerService.value.getCustomersLarge().then(data => {
        customers2.value = data;
        loading2.value = false;
        customers2.value.forEach(customer => customer.date = new Date(customer.date));
      });
    })
    onMounted(() => {
      productService.value.getProductsSmall().then(data => products.value = data);
    })
    const toast = useToast();
    const products = ref();
    const selectedProduct1 = ref();
    const selectedProduct2 = ref();
    const selectedProduct3 = ref();
    const selectedProducts1 = ref();
    const selectedProducts2 = ref();
    const selectedProducts3 = ref();
    const productService = ref(new ProductService());

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
      'companyName': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
      'address': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
      'phoneNumber': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
      'faxNumber': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
      'companyContact': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
    });
    const filters2 = ref({
      'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
      'companyName': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
      'address': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
      'phoneNumber': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
      'faxNumber': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
      'companyContact': {value: null, matchMode: FilterMatchMode.STARTS_WITH}
    });

    const clearFilter1 = () => {
      initFilters1();
    };
    const initFilters1 = () => {
      filters1.value = {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        'companyName': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        'address': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        'phoneNumber': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        'faxNumber': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        'companyContact': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
      }
    };
    const loading1 = ref(true);
    const loading2 = ref(true);
    const items = ref([
      {
        label: 'Düzenle',
        icon: 'pi pi-pencil',
        command: () => {
          toast.add({severity:'success', summary:'Updated', detail:'Data Updated', life: 3000});
        }
      },
      {
        label: 'Sil',
        icon: 'pi pi-times',
        command: () => {
          toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000});
        }
      },
      {   label: 'Firma İlgili Ekle',
        icon: 'pi pi-user-plus',
        command: () => {
          router.push('/CompanyCreate');
        }
      }
    ]);
    return {items,clearFilter1, initFilters1,  customers1, customers2, filters1, filters2,FilterMatchMode,FilterOperator,
      selectedProduct1,selectedProduct2,selectedProduct3,selectedProducts1,selectedProducts2,selectedProducts3,
      onRowSelect,onRowUnselect,loading1,loading2}
  }
}
</script>
