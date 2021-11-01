<template>
  <Button class="p-button p-button-success ml-4 mr-2" icon="pi pi-pencil" @click="updateModal"/>
  <Button class="p-button p-button-danger" icon="pi pi-trash"  @click="deleteOfferDialog=true"/>
  <Dialog v-model:visible="deleteOfferDialog" :style="{width: '450px'}" header="Teklif Sil" :modal="true">
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3 " style="font-size: 2rem" />
      <span class="mb-2" v-if="offer"> Teklifi silmek istediğinizden emin misiniz ?</span>
    </div>
    <template #footer>
      <Button label="Hayır" icon="pi pi-times" class="p-button-text" @click="deleteOfferDialog = false"/>
      <Button label="Evet" icon="pi pi-check" class="p-button-text" @click="$emit('offerDelete',offer.id)" />
    </template>
  </Dialog>
  <Dialog header="Teklif Listesi Güncelleme" v-model:visible="displayModal" :style="{width: '40vw' }" :modal="true">
    <div   style="padding: 1rem 1rem">
      <div class="grid">
        <div class="col-12" style="display: grid">
          <label  for="companyName">Firma</label>
          <AutoComplete
              v-model="state.companyName"
              :suggestions="filteredCompany"
              @complete="searchOffer($event)"
              field="label"
              :dropdown="true"
              placeholder="Stok Tanımı"
              :class="{'p-invalid':v$.companyName.$invalid && submitted}"
          />
          <span class="p-error" v-if="v$.companyName.$error">
             Lütfen stok tanımını yapınız.
            </span>
        </div>
      </div>
      <div class="grid mt-1">
        <div class="p-fluid col-4 mt-2">
          <label  for="offerNumber">Teklif Numarası</label>
          <InputText  class="p-inputtext-sm" id="offerNumber" v-model="state.offerNumber" :class="{'p-invalid':v$.offerNumber.$invalid && submitted}"/>
          <span class="p-error" v-if="v$.offerNumber.$error">
             Teklif Numarası Boş Bırakılamaz
            </span>
        </div>
        <div class="p-fluid col-4 mt-2">
          <label  for="offerDate">Teklif Tarihi</label>
          <InputText  :class="{'p-invalid':v$.offerDate.$invalid && submitted}"  class="p-inputtext-sm" id="offerDate" v-model="state.offerDate" />
          <span class="p-error" v-if="v$.offerDate.$error">
             Teklif Tarihi Boş Bırakılamaz
            </span>
        </div>
        <div class="p-fluid col-4 mt-2">
          <label  for="offerValidityDate">Teklif Geçerlilik Tarihi</label>
          <InputText  :class="{'p-invalid':v$.offerValidityDate.$invalid && submitted}" class="p-inputtext-sm" id="cost" v-model="state.offerValidityDate" />
          <span class="p-error" v-if="v$.offerValidityDate.$error">
             Teklif Geçerlilik Tarihi Boş Bırakılamaz
            </span>
        </div>

      </div>
      <div class="grid mt-1">
        <div class="p-fluid col-12 mt-1">
          <label  for="offerDefinition">Teklifin Konusu</label>
          <InputText  class="p-inputtext" id="offerDefinition" v-model="state.offerDefinition" :class="{'p-invalid':v$.offerDefinition.$invalid && submitted}"/>
          <span class="p-error" v-if="v$.offerDefinition.$error">
             Teklif Konusu Boş Bırakılamaz
            </span>
        </div>
      </div>
      <div class="grid mt-1">
        <div style="display: grid" class="p-fluid col-6  mt-2">
          <label  for="statuses">Status</label>
          <Dropdown v-model="state.status" :options="statuses" optionLabel="label" optionValue="value" id="statuses" />
        </div>
      </div>
    </div>

    <template #footer>
      <Button style="width: 100px" class="p-button-sm p-button-raised p-button-success" label="Güncelle" icon="pi pi-check" @click="updateOfferData" />
    </template>
  </Dialog>
</template>

<script>
import {computed, reactive, ref } from "vue";
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {useToast} from "primevue/usetoast";

export default {
  props:['offer','id' ],
  emits:['updateValue','offerDelete'],
  setup(props,{emit} ){
    const toast = useToast();
    /* const resetForm = () => {
       offerModel.value.selectedCompany ='',
           offerModel.value.selectedOption='',
           offerModel.value.selectedCurrency='',
           offerModel.value.profit=null,
           offerModel.value.quantity=null,
           offerModel.value.cost=null,
           offerModel.value.totalPrice=0
     }*/

    const rules = computed(() => {
      return {
        companyName: {required},
        offerDefinition: {required},
        offerValidityDate: {required},
        offerDate: {required},
        offerNumber: {required},
        status: {required},
      }
    });
    const state = reactive({
      id:props.offer.id!=null ? props.offer.id : props.id,
      companyName:props.offer.companyName,
      offerDefinition: props.offer.offerDefinition,
      offerDate:props.offer.offerDate,
      offerValidityDate:props.offer.offerValidityDate,
      offerNumber:props.offer.offerNumber,
      status:props.offer.status,
    })
    const statuses = ref([
      {label: 'OLUMSUZ', value: 'olumsuz'},
      {label: 'OLUMLU', value: 'olumlu'},
      {label: 'BEKLENIYOR', value: 'bekleniyor'}
    ]);
    const items = ref([
      {label: 'Berlin', value: 'Berlin'},
      {label: 'Frankfurt', value: 'Frankfurt'},
      {label: 'Hamburg', value: 'Hamburg'},
      {label: 'Munich', value: 'Munich'}]);
    const v$ = useVuelidate(rules, state);

    const submitted = ref(false);
    const deleteOfferDialog = ref(false);
    const displayModal = ref(false);
    const filteredOffers=ref(null);
    const filteredCompany=ref(null);
    //methods
    const updateModal = () => {
      console.log("offers55",props.offer)
      displayModal.value = true;
    };
    const updateOfferData = () => {
      v$.value.$validate();
      submitted.value=true
      if(!v$.value.$error){
        //success
        console.log("updateValue",state)
        emit("updateListValue",state)
        displayModal.value = false;
        toast.add({severity:'success', summary: 'Güncelleme İşlemi Başarılı', life: 4000});
      }
    };
    const searchOffer = (event) =>{
      console.log("event",event)
      setTimeout(() => {
        if (!event.query.trim().length) {
          filteredCompany.value = [...items.value];
        }
        else {
          filteredCompany.value = items.value.filter((c) => {
            return c.label.toLowerCase().startsWith(event.query.toLowerCase());
          });
        }
      },50)
    };
    //end methods

    //watch

    return{
      displayModal,
      filteredOffers,
      filteredCompany,
      items,
      updateModal,
      updateOfferData,
      searchOffer,
      v$,
      state,
      submitted,
      statuses,
      deleteOfferDialog
    }
  }
}
</script>

<style scoped>

</style>