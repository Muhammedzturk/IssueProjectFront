<template>
  <div class="col-3" >
    <!-- yeni firma ilgilisi oluşturma işlemi dialogu -->
    <Button type="button" icon="pi pi-user-plus" label="Firma İlgilisi Oluştur" class="p-button-success mr-2 p-button-outlined"  @click="openNewContact" style="border-radius: 0.5rem"/>
  </div>
  <Dialog v-model:visible="contactDialog" :style="{width: '450px'}" header="Firma İlgili Oluştur" :modal="true" class="p-fluid">

    <div class="p-field">
      <label for="userName">Ad Soyad*</label>
      <InputText id="userName" v-model="state.userName" required="true" autofocus />
      <small class="p-error" v-if="v$.userName.$error">Ad Soyad Boş Bırakılamaz.</small>
    </div>

    <div class="p-field">
      <label for="task">Görevi*</label>
      <InputText id="task" v-model="state.task" required="true" autofocus  />
      <small class="p-error" v-if="v$.task.$error">Görevi Boş Bırakılamaz.</small>
    </div>
    <div class="p-field">
      <label for="contactPhoneNumber">Telefon*</label>
      <InputMask mask="9999999999" id="contactPhoneNumber" v-model="state.contactPhoneNumber" required="true" autofocus  />
      <small class="p-error" v-if="v$.contactPhoneNumber.$error">Adres Boş Bırakılamaz.</small>
    </div>

    <div class="p-field">
      <label for="email">E-mail*</label>
      <InputText id="email" v-model="state.email" required="true" autofocus />
      <small class="p-error" v-if="v$.email.$error">E-mail Boş Bırakılamaz.</small>
    </div>

    <template #footer>
      <Button label="İptal" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
      <Button label="Kaydet" icon="pi pi-check" class="p-button-text" @click="saveContact" />
    </template>
  </Dialog>

</template>

<script>
import {computed, reactive, ref} from "vue";
import {useToast} from "primevue/usetoast";
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";

export default {

    emits:['send-data-create-contact'],
    props:['data'],
    setup(props,{emit}) {
      const contactDialog = ref(false);
      const contact = ref({});
      const contacts = ref();
      const sended = ref(false);
      const toast = useToast();
      const rules = computed(() => {
        return{
          userName:{required},
          task:{required},
          contactPhoneNumber:{required},
          email:{required},
        }
      })
      const state = reactive({

        userName:'',
        task:'',
        contactPhoneNumber:'',
        email:'',
      })

      const v$ = useVuelidate(rules, state);


      //firma ilgilisi oluşturma işlemi
      const saveContact = () => {
        v$.value.$validate();
        sended.value = true;
        if(!v$.value.$error){
          contact.value.id = createId();
          emit("sendDataCreateContact",state)
          //contacts.value.push(contact.value);
          toast.add({severity: 'success', summary: 'Başarılı', detail: 'Firma İlgili Oluşturuldu', life: 3000});

          contactDialog.value = false;
          resetForm();
        }
      };
      //iptal butonu işlemi
      const hideDialog = () => {
        contactDialog.value = false;
      }
      //yeni firma ilgilisi oluşturma butonu click i
      const openNewContact = () => {
        v$.value.$reset();
        sended.value = false;
        contactDialog.value = true;
      };

      //id oluşturma işlemi
      const createId = () => {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for ( var i = 0; i < 5; i++ ) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
      }
      const resetForm =() =>{
            v$.value.$reset();
            state.userName='',
            state.task='',
            state.contactPhoneNumber='',
            state.email=''
      }


      return {
        saveContact,contacts,state,rules,v$,resetForm, contact,contactDialog,hideDialog,toast,createId,openNewContact,


      }
    }
  };

</script>

<style scoped>

</style>