<template>
  <div class="form-demo">

    <div class="p-d-flex p-jc-center">
      <div class="card">
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