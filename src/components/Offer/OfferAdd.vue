<template>
  <div class="card">
    <div class="p-grid p-formgrid">
      <TabView>
        <TabPanel header="Teklif Bilgisi">
                <DataTable :value="products2" editMode="row" dataKey="id" v-model:editingRows="editingRows"  responsiveLayout="scroll">
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
                </DataTable>
        </TabPanel>
        <TabPanel header="Ticari Koşullar">
            <div>
              <Editor v-model="value3" editorStyle="height: 320px" placeholder="Ticari Koşullar"/>
            </div>
        </TabPanel>
        <TabPanel header=" Teklif Süre Bilgisi">
            <div>
              <Editor v-model="value1" editorStyle="height: 320px" placeholder="Teklif Süre Bilgisi"/>
            </div>
        </TabPanel>
        <TabPanel header="Teklif Açıklamaları">
            <div>
              <Editor v-model="value2" editorStyle="height: 320px" placeholder="Teklif Açıklamaları"/>
            </div>
        </TabPanel>
      </TabView>


      <offer-modal-form  @dialog-data="CalcPrice" :profitTop="profitTop" @error-info="errorInfo">
        <Button   label="Kaydet" class=" p-button-help" @click="save"/>
      </offer-modal-form>
    </div>

  </div>
</template>

<script>
import { ref,onMounted  } from "vue";
import ProductService from "../../service/ProductService";
import OfferModalForm from "./OfferModalForm";

export default {
  name: "OfferAdd",
  components:{
    OfferModalForm
  },
  props: ['profitTop'],
  emits:['error-check'],
  setup(props,{emit}) {
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

    //methods
    const save = () => {
      emit("error-check",true)
    }
    const errorInfo = (check) => {
      emit("error-check",check)
    }
    const getUnitLabel = (unit) => {
      switch(unit) {
        case 'EURO':
          return '€';

        case 'TL':
          return '₺';

        case 'DOLAR':
          return '$';

        default:
          return ' ';
      }
    };
    const CalcPrice = (data) => {
      const calcTopProfitRate = data.totalPrice*(props.profitTop.value/100);
      products2.value.push({
        offerDefinition : data.selectedCompany.value,
        unitCost : data.cost,
        unitProfit : data.profit,
        unitPrice : data.totalPrice+' '+getUnitLabel(data.selectedCurrency.toString()),
        unitCurrency : data.selectedCurrency,
        quantity : data.quantity,
        salePrice:(data.totalPrice+calcTopProfitRate).toFixed(2),
        totalPrice:((data.totalPrice+calcTopProfitRate).toFixed(2)*data.quantity).toFixed(2)
      })
    };

    //end methods
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
      productService, editingRows,  products2, unit,
      CalcPrice,
      getUnitLabel,
      save,
      errorInfo

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