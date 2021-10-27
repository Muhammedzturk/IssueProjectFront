<template>
  <!-- yeni firma oluşturma işlemi dialogu -->
  <Button label=" Yeni Firma Oluştur" icon="pi pi-plus" class="p-button-success mr-2" @click="openNewCompany" style="border-radius: 0.5rem" />
  <Dialog v-model:visible="companyDialog" :style="{width: '450px'}" header="Listeye Firma Ekle" :modal="true" class="p-fluid">

    <div class="p-field">
      <label for="offerPrefix">Teklif Ön Ek*</label>
      <InputText id="offerPrefix" v-model="state.offerPrefix" required="true" autofocus  />
      <small class="p-error" v-if="v$.offerPrefix.$error">Teklif Ön Ek Boş Bırakılamaz.</small>
    </div>

    <div class="p-field">
      <label for="companyName">Firma Adı*</label>
      <InputText id="companyName" v-model="state.companyName" required="true" autofocus  />
      <small class="p-error" v-if="v$.companyName.$error">Firma Adı Boş Bırakılamaz.</small>
    </div>
    <div class="p-field">
      <label for="address">Adres*</label>
      <Textarea id="address" v-model="state.address" required="true" rows="3" cols="20" />
      <small class="p-error" v-if="v$.address.$error">Adres Boş Bırakılamaz.</small>
    </div>
    <div class="p-field">
      <label for="phoneNumber" class="p-mb-3">Telefon*</label>
      <InputMask mask="(999) 999-9999" id="phoneNumber" v-model="state.phoneNumber" required="true" autofocus  />
      <small class="p-error" v-if="v$.phoneNumber.$error">Telefon Boş Bırakılamaz.</small>
    </div>

    <div class="p-field">
      <label for="faxNumber" class="p-mb-3">Fax</label>
      <InputMask mask="(999) 999-9999" id="faxNumber" v-model="state.faxNumber" required="true" autofocus  />
    </div>

    <template #footer>
      <Button label="İptal" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
      <Button label="Kaydet" icon="pi pi-check" class="p-button-text" @click="saveCompany" />
    </template>
  </Dialog>

</template>

<script>
import {computed, reactive, ref} from "vue";
import {useToast} from "primevue/usetoast";
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";

export default {
  emits:['send-data'],
  props:['data'],
  setup(props,{emit}) {
    const companyDialog = ref(false);
    const company = ref({});
    const companies = ref(null);
    const submitted = ref(false);
    const toast = useToast();
    const rules = computed(() => {
      return{
        offerPrefix:{required},
        companyName:{required},
        address:{required},
        phoneNumber:{required},
      }
    })
    const state = reactive({

      offerPrefix:'',
      companyName:'',
      address:'',
      phoneNumber:'',
      faxNumber:'',
    })

    const v$ = useVuelidate(rules, state);


    //firma oluşturma kısımlarındam kaydet butonlarının işlemi
    const saveCompany = () => {
      v$.value.$validate();
      submitted.value = true;
      if(!v$.value.$error){
        company.value.id = createId();
        emit("sendData",state)
       //companies.value.push(company.value);
        toast.add({severity: 'success', summary: 'Başarılı', detail: 'Firma Oluşturuldu', life: 3000});


      companyDialog.value = false;
      resetForm();
      }
    };
    const hideDialog = () => {
      companyDialog.value = false;
    }
    //firma oluştur butonunun click i
    const openNewCompany = () => {
      v$.value.$reset();
      submitted.value = false;
      companyDialog.value = true;
    };


    const createId = () => {
      let id = '';
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for ( var i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
    }
    //firma bilgilerinin girildiği inputların resetleme işlemi
    const resetForm =() =>{
          v$.value.$reset();
          state.offerPrefix='',
          state.companyName='',
          state.address='',
          state.phoneNumber='',
          state.faxNumber=''
    }


    return {
      saveCompany,state,rules,v$,resetForm, company, companies,companyDialog,hideDialog,toast,createId,openNewCompany,


    }
  }
};

</script>

<style scoped>

</style>