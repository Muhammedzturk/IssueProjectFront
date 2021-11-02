<template>

  <Button label=" Yeni Kullanıcı Oluştur" icon="pi pi-user-plus" class="p-button-success mr-2 p-button-outlined"
          @click="openNewUser" style="border-radius: 0.5rem" />

  <!--Yeni kullanıcı oluştur işlemi -->
  <Dialog v-model:visible="newCreateUserDialog" :style="{width: '450px'}" header="Yeni Kullanıcı Oluştur"
          :modal="true" class="p-fluid">
    <div class="card">
      <div class="p-field">
        <label for="userUserName">Ad Soyad*</label>
        <InputText id="userUserName" v-model="state.userUserName" required="true" autofocus />
        <small class="p-error" v-if="v$.userUserName.$error">Ad Soyad Boş Bırakılamaz.</small>
      </div>
      <div class="p-field">
        <label for="registrationNumber">Sicil Numarası*</label>
        <InputText id="registrationNumber" v-model="state.registrationNumber" required="true" autofocus />
        <small class="p-error" v-if="v$.registrationNumber.$error">Sicil Numarası Boş Bırakılamaz.</small>
      </div>
      <div class="p-field">
        <label for="userPhoneNumber">Telefon*</label>
        <InputMask mask="9999999999"  id="userPhoneNumber" v-model="state.userPhoneNumber" required="true" autofocus  />
        <small class="p-error" v-if="v$.userPhoneNumber.$error">Telefon Boş Bırakılamaz.</small>
      </div>
      <div class="p-field">
        <label for="userEmail">E-mail*</label>
        <InputText id="userEmail" v-model="state.userEmail" required="true" autofocus  />
        <small class="p-error" v-if="v$.userEmail.$error">E-mail Boş Bırakılamaz.</small>
      </div>

      <div class="p-field">
        <label for="role">Rol*</label>
        <InputText id="role" v-model="state.role" required="true" autofocus  />
        <small class="p-error" v-if="v$.role.$error">Rol Boş Bırakılamaz.</small>
      </div>
    </div>
    <template #footer>
      <Button label="İptal" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
      <Button label="Kaydet" icon="pi pi-check" class="p-button-text" @click="saveUser" />
    </template>

  </Dialog>
</template>

<script>
import {computed, reactive, ref} from "vue";
import {useToast} from "primevue/usetoast";
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";

export default {
  emits:['send-data-create-user'],
  props:['data'],
  setup(props,{emit}) {

    const user=ref({});
    const users=ref(null);
    const added=ref();
    const newCreateUserDialog=ref(false);
    const toast = useToast();
    const rules = computed(() => {
      return{
        userUserName:{required},
        registrationNumber:{required},
        userPhoneNumber:{required},
        userEmail:{required},
        role:{required},
      }
    })
    const state = reactive({

      userUserName:'',
      registrationNumber:'',
      userPhoneNumber:'',
      userEmail:'',
      role:'',

    })

    const v$ = useVuelidate(rules, state);

    const openNewUser= () =>{
      v$.value.$reset();
      added.value = true;
      newCreateUserDialog.value=true;
    }
    const hideDialog = () =>{
      newCreateUserDialog.value=false;
      added.value = false;
    }
    //kullanıcı oluşturma işlemi
    const saveUser = () => {
      v$.value.$validate();
      added.value = true;
      if(!v$.value.$error){
          user.value.id = createId();
        emit("sendDataCreateUser",state)
         // users.value.push(user.value);
          toast.add({severity:'success', summary: 'Başarılı', detail:'Kullanıcı Oluşturuldu', life: 3000});

        newCreateUserDialog.value = false;
        resetForm();
      }
    }
    const resetForm =() =>{
      v$.value.$reset();
          state.userUserName='',
          state.registrationNumber='',
          state.userPhoneNumber='',
          state.userEmail='',
          state.role=''
    }
    const createId = () => {
      let id = '';
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for ( var i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
    }


    return{
    rules,toast,user,v$,openNewUser,newCreateUserDialog,added,hideDialog,saveUser,state,users,createId,resetForm
    }
  }
}
</script>

<style scoped>

</style>