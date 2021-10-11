<template>
  <div class="card">
    <h5>Teklif Ekle</h5>
    <div class="p-grid p-formgrid">
      <TabView>
        <TabPanel header="Teklif Bilgisi">
          <div  class="card">
            <div class="col-4">
                    <span class="p-buttonset">
                      <Button style="border-radius: 6px; background-color: green" class="mr-1"  label="Kaydet" icon="pi pi-check" />
                      <Button style="border-radius: 6px; background-color: dodgerblue"  class="mr-1" label="Güncelle" icon="pi pi-refresh" />
                      <Button style="border-radius: 6px; background-color: darkred" label="Sil" icon=" pi pi-trash" />
                    </span>

            </div>
            <div>
              <DataTable >
                <Column field="rowNumber" header="Sıra No"></Column>
                <Column field="offerDefinition" header="Teklif Tanımı"></Column>
                <Column field="currency" header="Para Birimi"></Column>
                <Column field="unitPrice" header="Birim Fiyat"></Column>
                <Column field="profitRate" header="Kar Oranı"></Column>
                <Column field="quantity" header="Miktar"></Column>
                <Column field="totalprice" header="Toplam Fiyat"></Column>
              </DataTable>
            </div>
          </div>

        </TabPanel>
        <TabPanel header="Ticari Koşullar">
          <div class="card">
            <div>
              <Editor v-model="value3" editorStyle="height: 320px" placeholder="Ticari Koşullar"/>
            </div>
            <div class="col-2 ml-auto mt-1 ">
              <SplitButton label="Save" icon="pi pi-plus" :model="items"></SplitButton>
            </div>
          </div>
        </TabPanel>

        <TabPanel header=" Teklif Süre Bilgisi">
          <div class="card">
            <div>
              <Editor v-model="value1" editorStyle="height: 320px" placeholder="Teklif Süre Bilgisi"/>
            </div>
            <div class="col-2 ml-auto mt-1 ">
              <SplitButton label="Save" icon="pi pi-plus" :model="items"></SplitButton>
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
import {ref} from "vue";

export default {
  name: "OfferAdd",
  props:['buttons'],
  data(){
    return{
      products: null,
      commercialTerms:'',
      offerTimeInformation:'',
      offerDescriptions:'',
      paymentCondition:'',
      deliveryTime:'',
      offerDescription:'',
      offerNotes:'',
      offerContract:'',
      offerCoverLetter:'',

    };
  },
  setup() {
    const value1 = ref('');
    const value2 = ref('');
    const value3 = ref('');
    return {value1,value2,value3 };
  },
}
</script>

<style scoped>

</style>