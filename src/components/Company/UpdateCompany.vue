<template>
  <!--  firma bilgisi güncelleme işlemi dialogu -->
  <Button icon="pi pi-pencil" class=" ml-auto mr-2 p-button-rounded p-button-success p-mr-2" @click="editCompany()" />

  <Dialog v-model:visible="companyDialogUpdate" :style="{width: '450px'}" header="Firma Güncelle" :modal="true" class="p-fluid">

    <div class="p-field">
      <label for="offerPrefix">Teklif Ön Ek*</label>
      <InputText id="offerPrefix" v-model="state.offerPrefix"/>
      <span class="p-error" v-if="v$.offerPrefix.$error">
             Teklif Ön Ek Boş Bırakılamaz.
            </span>
    </div>

    <div class="p-field">
      <label for="companyName">Firma Adı*</label>
      <InputText id="companyName" v-model="state.companyName" required="true" autofocus   />
      <small class="p-error" v-if="v$.companyName.$error">Firma Adı Boş Bırakılamaz.</small>
    </div>
    <div class="p-field">
      <label for="address">Adres*</label>
      <Textarea id="address" v-model="state.address" required="true" rows="3" cols="20"   />
      <small class="p-error" v-if="v$.address.$error">Adres Boş Bırakılamaz.</small>
    </div>
    <div class="p-field">
      <label for="phoneNumber" class="p-mb-3">Telefon*</label>
      <InputMask mask="(999) 999-9999" id="phoneNumber" v-model="state.phoneNumber" required="true" autofocus  />
      <small class="p-error" v-if="v$.phoneNumber.$error">Telefon Boş Bırakılamaz.</small>
    </div>

    <div class="p-field">
      <label for="faxNumber" class="p-mb-3">Fax</label>
      <InputMask mask="(999) 999-9999" id="faxNumber" v-model="state.faxNumber" required="true" autofocus   />
    </div>

    <template #footer>
      <Button label="İptal" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
      <Button label="Güncelle" icon="pi pi-check" class="p-button-text" @click="updateCompany" />
    </template>
  </Dialog>

  <!-- Tek satırdaki firmayı silme işlemi dialogu -->

  <Button icon="pi pi-trash" class=" p-button-rounded p-button-danger" @click="singleDeleteCompany(data)" />
  <Dialog v-model:visible="singleDeleteCompanyDialog" :style="{width: '450px'}" header="Firma Sil" :modal="true">
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3 " style="font-size: 2rem" />
      <span v-if="company">{{company.companyName}} firmasını silmek istediğinizden emin misiniz<b></b>?</span>
    </div>
    <template #footer>
      <Button label="Hayır" icon="pi pi-times" class="p-button-text" @click="singleDeleteCompanyDialog = false"/>
      <Button label="Evet" icon="pi pi-check" class="p-button-text" @click="deleteCompany" />
    </template>
  </Dialog>

  </template>

<script>
import {computed, reactive, ref} from 'vue';
import { useToast } from 'primevue/usetoast';
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
export default {
  emits:['send-data-update','send-data-delete'],
  props:['data'],
  setup(props,{emit}){
    const companyDialogUpdate= ref(false);
    const singleDeleteCompanyDialog = ref(false);
    const company =ref();
    const companies =ref();
    const toast = useToast();
    const submitted=ref(false);

    console.log("company",props.data)

//firma bilgilerinin inputlarının boş olup olmadığını kontrol etme işlemi
    const rules = computed(() => {
      return{
        offerPrefix:{required},
        companyName:{required},
        address:{required},
        phoneNumber:{required},
      }
    })
    const state = reactive({
      id:props.data.id ,
      offerPrefix:props.data.offerPrefix,
      companyName:props.data.companyName,
      address:props.data.address,
      phoneNumber:props.data.phoneNumber,
      faxNumber:props.data.faxNumber,
    })

    const v$ = useVuelidate(rules, state);

//firma güncelleme işlemi
    const updateCompany = () => {
      v$.value.$validate();
      if(!v$.value.$error){
        emit("sendDataUpdate",state)
        toast.add({severity: 'success', summary: 'Başarılı', detail: 'Firma Güncellendi', life: 3000});
        companyDialogUpdate.value = false;

      }


    }

    const hideDialog = () => {
      companyDialogUpdate.value=false;
    }
    //firma düzenleme kısmınında ki düzenle buton click'i
    const editCompany = () => {
      //company.value={...data}
      companyDialogUpdate.value = true;
    };
    //tek satırdaki firma sil butonunun click i
    const singleDeleteCompany = (comp) => {
      company.value = comp;
      singleDeleteCompanyDialog.value = true;
    };
    //tek satırdaki firmayı silme işlemi
    const deleteCompany = () => {
      console.log('slmeye girdi')
      emit("sendDataDelete",state.id)

    };

    return{
     v$,state,rules, updateCompany,company,companyDialogUpdate,hideDialog,toast,submitted,editCompany,
     companies,singleDeleteCompany,singleDeleteCompanyDialog,deleteCompany
    }
  }
}
</script>

<style scoped>

</style>