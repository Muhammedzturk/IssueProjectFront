<template>
  <div class="card">
    <div class="p-grid p-formgrid">
      <TabView>
        <TabPanel header="Teklif Bilgisi">

            <div class="col-4">
                    <span class="p-buttonset">
                      <Button style="border-radius: 6px; background-color: green" class="mr-1"  label="Kaydet" icon="pi pi-check" />
                      <Button style="border-radius: 6px; background-color: dodgerblue"  class="mr-1" label="Güncelle" icon="pi pi-refresh" />
                      <Button style="border-radius: 6px; background-color: darkred" label="Sil" icon=" pi pi-trash" />
                    </span>

            </div>
<!--            <div>
              <DataTable :value="cars" class="p-datatable-sm">
                <Column v-for="col of columns" :field="col.field"  :header="col.header" :style="{'width':col.width,'text-align':col.align}"  :key="col.field"></Column>
              </DataTable>
            </div>-->


                <DataTable :value="products2" editMode="row" dataKey="id" v-model:editingRows="editingRows" @row-edit-save="onRowEditSave" responsiveLayout="scroll">
                  <Column field="rowNumber" header="S.No" style="width:50px">
                    <template #editor="{ data, field }">
                      <InputText v-model="data[field]" autofocus />
                    </template>
                  </Column>
                  <Column field="offerDefinition" header="Tanımı" style="width:250px">
                    <template #editor="{ data, field }">
                      <InputText v-model="data[field]" />
                    </template>
                  </Column>
                  <Column field="quantity" header="Miktar" style="width:50px">
                    <template #editor="{ data, field }">
                      <InputText v-model="data[field]" style="width:50px"/>
                    </template>

                  </Column>
                  <Column field="unitCurrency" header="Birim Para Birimi" style="width:80px">
                    <template #editor="{ data, field }">
                      <Dropdown v-model="data[field]" :options="unit" optionLabel="label" optionValue="value"  style="width:100px">
                        <template #option="slotProps">
                          <span :class="'product-badge status-' + slotProps.option.value.toLowerCase()">{{slotProps.option.label}}</span>
                        </template>
                      </Dropdown>
                    </template>
                  </Column>
                  <Column field="unitCost" header="Birim Maliyet" style="width:50px">
                    <template #editor="{ data, field }">
                      <InputText v-model="data[field]" />
                    </template>
                  </Column>
                  <Column field="unitProfit" header="Birim Kar" style="width:50px">
                    <template #editor="{ data, field }">
                      <InputText v-model="data[field]" style="width:50px"/>
                    </template>
                  </Column>
                  <Column field="unitPrice" header="Birim Fiyat" style="width:70px">
                    <template #editor="{ data, field }">
                      <InputText v-model="data[field]" style="width:70px"/>
                    </template>
                  </Column>
                  <Column field="profitRate" header="Kar Oranı" style="width:50px">
                    <template #editor="{ data, field }">
                      <InputText v-model="data[field]" style="width:50px"/>
                    </template>
                  </Column>
                  <Column field="salePrice" header="Satış Fiyatı" style="width:50px">
                    <template #editor="{ data, field }">
                      <InputText v-model="data[field]" style="width:70px"/>
                    </template>
                  </Column>

                  <Column field="totalPrice" header="Toplam Fiyat " style="width:50px" >
                    <template #editor="{ data, field }">
                      <InputText v-model="data[field]" style="width:70px"/>
                    </template>
                  </Column>
                  <Column :rowEditor="true" style="width:50px;" bodyStyle="text-align:center"></Column>
                </DataTable>



        </TabPanel>
        <TabPanel header="Ticari Koşullar">
          <div class="card">
            <div>
              <Editor v-model="value3" editorStyle="height: 320px" placeholder="Ticari Koşullar"/>
            </div>
            <div class="col-2 ml-auto mt-1 ">
              <SplitButton label="Save" icon="pi pi-plus" :model="buttons"></SplitButton>
            </div>
          </div>
        </TabPanel>

        <TabPanel header=" Teklif Süre Bilgisi">
          <div class="card">
            <div>
              <Editor v-model="value1" editorStyle="height: 320px" placeholder="Teklif Süre Bilgisi"/>
            </div>
            <div class="col-2 ml-auto mt-1 ">
              <SplitButton label="Save" icon="pi pi-plus" :model="buttons"></SplitButton>
            </div>
          </div>
        </TabPanel>

        <TabPanel header="Teklif Açıklamaları">
          <div class="card">
            <div>
              <Editor v-model="value2" editorStyle="height: 320px" placeholder="Teklif Açıklamaları"/>
            </div>
            <div class="col-2 ml-auto mt-1 ">
              <SplitButton label="Save" icon="pi pi-plus" :model="buttons"></SplitButton>
            </div>
          </div>
        </TabPanel>
      </TabView>

    </div>
  </div>
</template>

<script>
import { ref,onMounted  } from "vue";
import ProductService from "../../service/ProductService";

export default {
  name: "OfferAdd",
  setup() {
    onMounted(() => {
      productService.value.getProductsSmall().then(data => products2.value = data);
    });

    const productService = ref(new ProductService());
    const editingRows = ref([]);

    const products2 = ref(null);
    const unit = ref([
      {label: 'TL', value: 'TL'},
      {label: 'Euro', value: 'EURO'},
      {label: 'Dolar', value: 'DOLAR'}
    ]);

    const onRowEditSave = (event) => {
      let { newData, index } = event;
      products2.value[index] = newData;
    };
/*    const columns = ref([
      {field: 'rowNumber', header: 'S.No', width: '50px',align:'center' },
      {field: 'offerDefinition', header: 'Teklif Tanımı',width: '300px',align:'center'},
      {field: 'quantity', header: 'Miktar',width: '',align:'center'},
      {field: 'unitCost', header: 'Birim Maliyet',width: '',align:'center'},
      {field: 'unitProfit', header: 'Birim Kar',width: '',align:'center'},
      {field: 'unitPrice', header: 'Birim Fiyat',width: '',align:'center'},
      {field: 'profitRate', header: 'Kar Oranı',width: '',align:'center'},
      {field: 'salePrice', header: 'Satış Fiyatı',width: '',align:'center'},
      {field: 'currency', header: 'Para Birimi',width: '',align:'center'},
      {field: 'totalPrice', header: 'Toplam Fiyat',width: '150px',align:'center'},
    ]);*/
    const buttons = ref([
      {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => {
          this.$toast.add({severity:'success', summary:'Updated', detail:'Data Updated', life: 3000});
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
        command: () => {
          this.$toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000});
        }
      },
    ]);
    const offerModel = ref({
      offerDescription:'',
      offerNotes:'',
      offerContract:'',
      offerCoverLetter:'',
      offerTimeInformation:'',
      offerDescriptions:'',
    });
    const products = ref(null);
    const commercialTerms = ref('');
    const paymentCondition = ref('');
    const deliveryTime = ref('');

    const value1 = ref('');
    const value2 = ref('');
    const value3 = ref('');
    return {
      value1,
      value2,
      value3,
      deliveryTime,
      paymentCondition,
      commercialTerms,
      products,
      offerModel,
      buttons,
      productService, editingRows,  products2, unit
      , onRowEditSave
    };
  },
}
</script>

<style lang="scss" scoped>
::v-deep(.editable-cells-table td.p-cell-editing) {
  padding-top: 0;
  padding-bottom: 0;
}
</style>