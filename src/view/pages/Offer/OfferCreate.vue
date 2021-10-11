<template>
  <div>
    <div class="p-grid">
      <div class=" p-md-6 p-fluid">
        <h6>Yeni Teklif Oluştur</h6>
        <div class="card">
          <small class="ml-2">Teklif Numarası</small>
          <div class="grid formgrid col-12">

            <div class="col-2 mb-4 ">
              <span class="p-float-label">
              <InputText class="p-inputtext-sm" type="text"></InputText>
                <label for="username">Username</label>
              </span>
            </div>
            <div class="col-2 ">
              <InputText type="text" class="p-inputtext-sm" placeholder="Disabled" :disabled="true"></InputText>
            </div>
            <div class="col-2 ">
              <InputText type="text"  placeholder="Invalid" class="p-invalid p-inputtext-sm" />
            </div>
            <div class="col-2  ">
              <label class=" col" for="offerdate">Teklif Tarihi</label>
            </div>
            <div class="col-4">
              <Calendar id="offerdate"  class="p-lg-4" v-model="value" :showButtonBar="true" :showIcon="true" />
            </div>
            </div>
          </div>
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
                      <Column field="profitRate" header="KarOranı"></Column>
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
                <SplitButton label="Save" icon="pi pi-plus" :model="items"></SplitButton>
                </div>
              </div>
              </TabPanel>
            </TabView>

          </div>
</div>

        </div>
      </div>
    </div>

</template>
<script>
import { ref } from 'vue';
export default {
  data() {
    return {
      products: null,
      commercialTerms:'',
      offerTimeInformation:'',
      offerDescriptions:'',
      paymentCondition:'',
      deliveryTime:'',
      offerValidityDate:'',
      offerDescription:'',
      offerNotes:'',
      offerContract:'',
      offerCoverLetter:'',

      items: [
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
      ]
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

