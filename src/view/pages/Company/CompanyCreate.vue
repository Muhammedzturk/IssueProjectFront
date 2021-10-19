<template>
  <div class="form-demo">

    <div class="p-d-flex p-jc-center">
      <div class="card">
      <div class="card">
        <h5 class="p-text-center">Firma Ekle</h5>
        <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
          <div class="grid">
          <div class="col-4 mb-5">
            <div class="p-float-label p-input-icon-right">
              <i class="pi pi-home" />
              <InputText id="companyName" v-model="v$.companyName.$model" :class="{'p-invalid':v$.companyName.$invalid && submitted}" />
              <label for="companyName" :class="{'p-error':v$.companyName.$invalid && submitted}">Firma Adı*</label>
            </div>
            <small v-if="(v$.companyName.$invalid && submitted) || v$.companyName.$pending.$response" class="p-error">
              Firma Adı alanı boş bırakılamaz...</small>

          </div>
            <div class="col-4">
              <div class="p-float-label">
                <Textarea id="address" v-model="v$.address.$model" :class="{'p-invalid':v$.address.$invalid && submitted}" />
                <label for="address" :class="{'p-error':v$.address.$invalid && submitted}">Adres*</label>
              </div>
              <small v-if="(v$.address.$invalid && submitted) || v$.address.$pending.$response" class="p-error">
                Adres alanı boş bırakılamaz...</small>

            </div>
            <div class="col-4">
              <div class="p-float-label p-input-icon-right">
                <i class="pi pi-phone" />
                <InputMask  mask="(999) 999-9999" id="phoneNumber" v-model="v$.phoneNumber.$model"
                            :class="{'p-invalid':v$.phoneNumber.$invalid && submitted}" />
                <label for="phoneNumber" :class="{'p-error':v$.phoneNumber.$invalid && submitted}">Telefon*</label>
              </div>
              <small v-if="(v$.phoneNumber.$invalid && submitted) || v$.phoneNumber.$pending.$response" class="p-error">
                Telefon alanı boş bırakılamaz...</small>

            </div>
          </div>
          <div class="pl-0 mt-2 grid">

            <div class="col-4">
              <div class="p-float-label p-input-icon-right">
                <i class="pi pi-folder-open" />
                <InputText id="offerPrefix" v-model="v$.offerPrefix.$model"
                           :class="{'p-invalid':v$.offerPrefix.$invalid && submitted}" />
                <label for="offerPrefix" :class="{'p-error':v$.offerPrefix.$invalid && submitted}">Teklif Ön Ek*</label>
              </div>
              <small v-if="(v$.offerPrefix.$invalid && submitted) || v$.offerPrefix.$pending.$response" class="p-error">
              Teklif Ön Ek alanı boş bırakılamaz...</small>

            </div>
            <div class="col-4">
              <div class="p-float-label p-input-icon-right">
                <i class="pi pi-book" />
                <InputNumber id="offerNumber" mode="decimal" v-model="v$.offerNumber.$model" :class="{'p-invalid':v$.offerNumber.$invalid && submitted}" />
                <label for="offerNumber" :class="{'p-error':v$.offerNumber.$invalid && submitted}">Teklif Numarası*</label>
              </div>
              <small v-if="(v$.offerNumber.$invalid && submitted) || v$.offerNumber.$pending.$response" class="p-error">
                 Teklif Numarası alanı boş bırakılamaz...</small>

            </div>

            <div class="col-4">
              <div class="p-float-label p-input-icon-right">
                <i class="pi pi-phone" />
                <InputMask  mask="(999) 999-9999" id="faxNumber" v-model="v$.faxNumber.$model"
                            :class="{'p-invalid':v$.faxNumber.$invalid && submitted}" />
                <label for="faxNumber">Fax</label>
              </div>
            </div>
          </div>
          <div class="pl-0 mt-3 grid ">
          <div class="col-4">
            <div class="p-float-label p-input-icon-right">
              <i class="pi pi-user-plus"/>
              <InputText id="companyContact" v-model="v$.companyContact.$model"
                         :class="{'p-invalid':v$.companyContact.$invalid && submitted}" />
              <label for="companyContact" :class="{'p-error':v$.companyContact.$invalid && submitted}">Firma İlgilisi*</label>
            </div>
            <small v-if="(v$.companyContact.$invalid && submitted) || v$.companyContact.$pending.$response" class="p-error">
              Firma İlgilisi alanı boş bırakılamaz...</small>
          </div>
          </div>


          <div class="grid">
            <div class="col-2 ml-auto">
              <Button type="submit" @click="sendList" label="Ekle" class="col-2" />
            </div>
          </div>
        </form>

        <Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
          <div class="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
            <i class="pi pi-check-circle" :style="{fontSize: '5rem', color: 'var(--green-500)' }"></i>
            <h5>{{state.companyName}} Firması Eklendi!</h5>
            <p :style="{lineHeight: 1.5, textIndent: '1rem'}">
              Firma Listesine  <b>{{state.companyName}}</b> Firması başarıyla eklendi. Firma bilgileri düzenlenmesi firma listesinden yapılabilir.
            </p>
          </div>
          <template #footer>
            <div class="p-d-flex p-jc-center">
              <Button label="OK" @click="toggleDialog" class="p-button-text" />
            </div>
          </template>
        </Dialog>


      </div>
      <div class="card">
        <contact-add></contact-add>
      </div>

    </div>
    </div>
  </div>
</template>



<script>
import { reactive, ref } from 'vue';
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import ContactAdd from "./ContactAdd";


export default {
  components:{
    ContactAdd
  },
  emits:['sendCompanyList'],
  setup(props,{emit}) {


    const state = reactive({
      companyName: '',
      address: '',
      phoneNumber: '',
      faxNumber:'',
      offerPrefix: '',
      offerNumber:null,
      companyContact: '',
    });

    const rules = {
      companyName: { required },
      address: { required },
      phoneNumber: { required },
      offerPrefix: { required },
      offerNumber: { required },
      faxNumber:'',
      companyContact: { required },
    };

    const submitted = ref(false);
    const showMessage = ref(false);

    const v$ = useVuelidate(rules, state);
    const  sendList=()=>{
      emit('sendCompanyList',state)
    }
    const handleSubmit = (isFormValid) => {
      submitted.value = true;
      if (!isFormValid) {

        return ;
      }


      toggleDialog();

    }
    const toggleDialog = () => {
      showMessage.value = !showMessage.value;

      if(!showMessage.value) {
        resetForm();
      }
    }
    const resetForm = () => {
      state.companyName = '';
      state.address = '';
      state.phoneNumber = '';
      state.faxNumber = '';
      state.offerPrefix = '';
      state.offerNumber = null;
      state.companyContact = '';
      submitted.value = false;
    }

    return { state, v$, handleSubmit, toggleDialog, submitted, showMessage,sendList }
  }
}
</script>

<style lang="scss" scoped>
.form-demo {
  .card {
    min-width: 450px;

    form {
      margin-top: 2rem;
    }

    .p-field {
      margin-bottom: 1.5rem;
    }
  }

  @media screen and (max-width: 960px) {
    .card {
      width: 80%;
    }
  }
}

</style>