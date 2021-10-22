<template>
  <div class="card">
    <div class="p-grid p-formgrid">
      <TabView v-model:activeIndex="active">
        <TabPanel header="Teklif Bilgisi">
                <DataTable :value="offers" :reorderableColumns="true" @rowReorder="onRowReorder" editMode="row" dataKey="id" v-model:editingRows="editingRows"  responsiveLayout="scroll" >
                  <Column :rowReorder="true" headerStyle="width: 2rem" :reorderableColumn="false" />
                  <Column field="rowNumber" header="S.No" style="width:50px">
                  </Column>
                  <Column field="offerDefinition" header="Tanımı" style="width:200px">
                  </Column>
                  <Column field="quantity" header="Miktar" style="width:50px">
                  </Column>
                  <Column field="unitCurrency" header="Para Birimi" style="width:50px">
                  </Column>
                  <Column field="unitCost" header="Birim Maliyet" style="width:50px">
                  </Column>
                  <Column field="unitProfit" header="Birim Kar" style="width:50px">
                  </Column>
                  <Column field="unitPrice" header="Birim Fiyat" style="width:70px">
                  </Column>
                  <Column field="salePrice" header="Satış Fiyatı" style="width:50px">
                  </Column>
                  <Column field="totalPrice" header="Toplam Fiyat " style="width:50px" >
                  </Column>
                  <Column field="optionNo" header="Seçenek No " style="width:50px" ></Column>
                  <Column headerStyle="width:5rem">
                    <template #body="slotProps">
                      <offer-update-form
                      :offer="slotProps.data"
                      :id="id"
                      :profitTop="profitTop"
                      @update-value="updatedValue"
                      @delete-offer="deleteOffer($event)"
                      ></offer-update-form>

                    </template>
                  </Column>
                </DataTable>
        </TabPanel>
        <TabPanel header="Ticari Koşullar">
            <div>
              <span class="p-error " v-if="v$.commercialTerms.$error ">
             Ticari Koşullar Alanını Lütfen Doldurunuz.
            </span>
              <Editor  v-model="state.commercialTerms" editorStyle="height: 320px" placeholder="Ticari Koşullar"/>
            </div>
        </TabPanel>
        <TabPanel header=" Teklif Süre Bilgisi">
            <div >
              <span class="p-error " v-if="v$.deliveryTime.$error ">
             Ticari Süre Bilgisi Alanını Lütfen Doldurunuz.
            </span>
              <Editor v-model="state.deliveryTime" editorStyle="height: 320px" placeholder="Teklif Süre Bilgisi"/>
            </div>
        </TabPanel>
        <TabPanel header="Teklif Açıklamaları">
            <div>
              <span class="p-error " v-if="v$.offerDescription.$error ">
             Teklif Açıklamaları Alanını Lütfen Doldurunuz.
            </span>
              <Editor v-model="state.offerDescription" editorStyle="height: 320px" placeholder="Teklif Açıklamaları"/>
            </div>
        </TabPanel>
      </TabView>
      <offer-modal-form  @dialog-data="CalcPrice" :profitTop="profitTop" @error-info="errorInfo">
        <Button label="Kaydet" class="p-button-help" @click="save"/>
      </offer-modal-form>
    </div>

  </div>
</template>

<script>
import {ref, onMounted, computed, reactive} from "vue";
import { useToast } from 'primevue/usetoast';
import ProductService from "../../service/ProductService";
import OfferModalForm from "./OfferModalForm";
import OfferUpdateForm from "./OfferUpdateForm";
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";

export default {
  name: "OfferAdd",
  components:{
    OfferModalForm,
    OfferUpdateForm
  },
  props:['profitTop'],
  emits:['error-check'],
  setup(props,{emit}) {
    onMounted(() => {
      productService.value.getProductsSmall().then(data => offers.value = data);
    });
    const toast = useToast();
    const productService = ref(new ProductService());
    const editingRows = ref([]);
    const id = ref(0)
    const active = ref(0);
    const offers = ref(null);
    const unit = ref([
      {label: 'TL', value: 'TL'},
      {label: 'Euro', value: 'EURO'},
      {label: 'Dolar', value: 'DOLAR'}
    ]);
    const rules = computed(() => {
      return{
        commercialTerms:{required},
        offerDescription:{required},
        deliveryTime:{required},
      }
    })
    const state = reactive({
      commercialTerms:'',
      offerDescription:'',
      deliveryTime:'',
    })

    const v$ = useVuelidate(rules, state);
    v$.value.$validate();
    //methods
    const save = () => {
      emit("error-check",true)
      if(v$.value.commercialTerms.$error){
        active.value=1
      }else if (v$.value.deliveryTime.$error){
        active.value=2
      }else if (v$.value.offerDescription.$error){
        active.value=3
      }else{
        active.value=0
      }
    }
    const deleteOffer = (deleteId) => {
      console.log()
      let index = offers.value.findIndex(i =>{
        return i.id ==deleteId
      });
      offers.value.splice(index,1)
      toast.add({severity:'warn', summary: 'Teklif Detay Silindi.', life: 3000});
    }
    const updatedValue = (data) => {
      console.log("offers.valuesss",offers.value)
      //let findValue = offers.value.filter(f => f.id == data.id);
      let index = findIndexById(data.id)
      console.log("index",index)
      offers.value[index] = data;
      console.log("dataaaa",data)
      console.log("offers.value[index]",offers.value[index])
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
    const errorInfo = (check) => {
      emit("error-check",check)
    }
    const onRowReorder = (event) => {
      offers.value = event.value;
      toast.add({severity:'success', summary: 'Satır Değiştirildi.', life: 3000});
    };
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
      console.log("CalcPriceData",data)
      const calcTopProfitRate = data.totalPrice*(props.profitTop.value/100);
       id.value +=1,
      offers.value.push({
        id:id.value,
        offerDefinition : data.selectedCompany.value,
        unitCost : data.cost,
        unitProfit : data.profit,
        unitPrice : data.totalPrice+' '+getUnitLabel(data.selectedCurrency.toString()),
        unitCurrency : data.selectedCurrency,
        quantity : data.quantity,
        salePrice:(data.totalPrice+calcTopProfitRate).toFixed(2),
        totalPrice:((data.totalPrice+calcTopProfitRate).toFixed(2)*data.quantity).toFixed(2),
        optionNo:data.selectedOption
      })
    };
    //end methods

    return {
      v$,
      rules,
      state,
      id,
      productService, editingRows,  offers, unit,active,
      CalcPrice,
      getUnitLabel,
      save,
      errorInfo,
      updatedValue,
      findIndexById,
      onRowReorder,
      deleteOffer,


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