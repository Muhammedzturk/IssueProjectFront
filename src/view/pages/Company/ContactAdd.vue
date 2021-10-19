<template>

      <div class="form-demo">
        <div class="p-d-flex p-jc-center">

            <h5 class="p-text-center">Firma İlgili Ekle</h5>
            <form @submit.prevent="handleSend(!v$.$invalid)" class="p-fluid">
              <div class="grid">
              <div class="p-field col-6">
                <div class="p-float-label p-input-icon-right ">
                  <i class="pi pi-user" />
                  <InputText id="name" v-model="v$.name.$model" :class="{'p-invalid':v$.name.$invalid && sended}" />
                  <label for="name" :class="{'p-error':v$.name.$invalid && sended}">Ad Soyad*</label>
                </div>
                <small v-if="(v$.name.$invalid && sended) || v$.name.$pending.$response" class="p-error">Ad Soyad alanı boş bırakılamaz...</small>
              </div>
              <div class="p-field col-6">
                <div class="p-float-label p-input-icon-right ">
                  <i class="pi pi-briefcase" />
                  <InputText id="name" v-model="v$.task.$model" :class="{'p-invalid':v$.task.$invalid && sended}" />
                  <label for="task" :class="{'p-error':v$.task.$invalid && sended}">Görev*</label>
                </div>
                <small v-if="(v$.task.$invalid && sended) || v$.task.$pending.$response" class="p-error">Görev alanı boş bırakılamaz...</small>
              </div>
              <div class="p-field col-6">
                <div class="p-float-label p-input-icon-right">
                  <i class="pi pi-phone"/>
                  <InputMask id="name" mask="(999) 999-9999" v-model="v$.phoneNumber.$model" :class="{'p-invalid':v$.phoneNumber.$invalid && sended}"/>
                  <label for="phoneNumber" :class="{'p-error':v$.phoneNumber.$invalid && sended}">Telefon*</label>
                </div>
                <small v-if="(v$.phoneNumber.$invalid && sended) || v$.phoneNumber.$pending.$response" class="p-error">Telefon alanı boş bırakılamaz...</small>
              </div>
              <div class="p-field col-6">
                <div class="p-float-label p-input-icon-right">
                  <i class="pi pi-envelope" />
                  <InputText id="email" v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && sended}" aria-describedby="email-error"/>
                  <label for="email" :class="{'p-error':v$.email.$invalid && sended}">Email*</label>
                </div>
                <span v-if="v$.email.$error && sended">
                            <span id="email-error" v-for="(error, index) of v$.email.$errors" :key="index">
                            <small class="p-error">E-mail tipinde olmalıdır...</small>
                            </span>
                        </span>
                <small v-else-if="(v$.email.$invalid && sended) || v$.email.$pending.$response" class="p-error">E-mail alanı boş bırakılamaz...</small>
              </div>
              </div>

              <div class="col-2 ml-auto">
                <Button type="submit"  label="Ekle" class="col-2" />
              </div>
            </form>

            <Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
              <div class="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
                <i class="pi pi-check-circle" :style="{fontSize: '5rem', color: 'var(--green-500)' }"></i>
                <h5>Firma Personeli Eklendi!</h5>
                <p :style="{lineHeight: 1.5, textIndent: '1rem'}">
                  Firma ilgili listesine <b>{{state.name}}</b> başarıyla eklendi. Firma personeli bilgileri firma ilgili listesinden düzenlenebilir.
                </p>
              </div>
              <template #footer>
                <div class="p-d-flex p-jc-center">
                  <Button label="OK" @click="viewDialog" class="p-button-text" />
                </div>
              </template>
            </Dialog>
          </div>
      </div>
    </template>


    <script>
      import { reactive, ref } from 'vue';
      import { email, required } from "@vuelidate/validators";
      import { useVuelidate } from "@vuelidate/core";


      export default {
        setup() {
          const displayBasic = ref(false);

          const openBasic = () => {
            displayBasic.value = true;
          };

          const state = reactive({
            name: '',
            task:'',
            phoneNumber:'',
            email: '',
          });

          const rules = {
            name: { required },
            task: { required },
            phoneNumber: { required },
            email: { required, email },
          };


          const sended = ref(false);
          const showMessage = ref(false);


          const v$ = useVuelidate(rules, state);


          const handleSend = (isContactValid) => {
            sended.value = true;

            if (!isContactValid) {

              return;
            }

            viewDialog();
          }
          const viewDialog = () => {
            showMessage.value = !showMessage.value;

            if(!showMessage.value) {
              resetForm();
            }
          }
         const resetForm = () => {
            state.name = '';
            state.task = '';
            state.phoneNumber = '';
            state.email = '';
            sended.value = false;
          }

          return { state, v$, handleSend, viewDialog, sended, showMessage,openBasic,displayBasic}
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