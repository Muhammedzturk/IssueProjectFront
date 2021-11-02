<template>
  <Button icon="pi pi-pencil" class=" ml-auto mr-2 p-button-rounded p-button-warning p-mr-2 p-button-outlined" @click="editUser()" />
  <!--kullanıcı güncelleme  işlemi -->
  <Dialog v-model:visible="userDialogUpdate" :style="{width: '450px'}" header="Kullanıcı Güncelle" :modal="true" class="p-fluid">
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
        <InputMask mask="(999) 999-9999"  id="userPhoneNumber" v-model="state.userPhoneNumber" required="true" autofocus  />
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
      <Button label="Güncelle" icon="pi pi-check" class="p-button-text" @click="updateUser" />
    </template>

  </Dialog>

  <Button icon="pi pi-trash" class=" p-button-rounded p-button-danger p-button-outlined" @click="singleDeleteUser(data)" />
  <!-- tek satırdaki kullanıcıyı silme işlemi -->
  <Dialog v-model:visible="singleDeleteUserDialog" :style="{width: '450px'}" header=" Kullanıcıyı Sil" :modal="true">
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="user">{{userUserName}} adlı kullanıcıyı silmek istediğinizden emin misiniz?</span>
    </div>
    <template #footer>
      <Button label="Hayır" icon="pi pi-times" class="p-button-text" @click="singleDeleteUserDialog = false"/>
      <Button label="Evet" icon="pi pi-check" class="p-button-text" @click="deleteSingleUser" />
    </template>
  </Dialog>

</template>

<script>
import {computed, reactive, ref} from 'vue';
import { useToast } from 'primevue/usetoast';
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
export default {
  emits:['send-data-update-user','send-data-delete-user'],
  props:['data','userUserName'],
  setup(props,{emit}){

    const toast = useToast();
    const users = ref(null);
    const user =ref({});
    const added=ref(false);
    const userDialogUpdate =ref(false);
    const singleDeleteUserDialog =ref(false);
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
      id:props.data.id ,
      userUserName:props.data.userUserName,
      registrationNumber:props.data.registrationNumber,
      userPhoneNumber:props.data.userPhoneNumber,
      userEmail:props.data.userEmail,
      role:props.data.role,
    })
    const hideDialog = () =>{
      userDialogUpdate.value=false;
    }

    const editUser = () => {
      userDialogUpdate.value = true;
    };
    const updateUser = () => {
      v$.value.$validate();
      if(!v$.value.$error){
        emit("sendDataUpdateUser",state)
        toast.add({severity: 'success', summary: 'Başarılı', detail: 'Kullanıcı Güncellendi', life: 3000});
        userDialogUpdate.value = false;

      }
    }
    //tek satırdaki kullanıcıları silme butonu click i
    const singleDeleteUser = (us) => {
      user.value=us;
      singleDeleteUserDialog.value = true;
    }

    //tek satırdaki kullanıcıyı silme işlemi
    const deleteSingleUser = () => {
     emit("sendDataDeleteUser",state.id)

    }

    const v$ = useVuelidate(rules, state);


    return{
      toast,users,user,v$,editUser,userDialogUpdate,hideDialog,added,updateUser,state,singleDeleteUser,deleteSingleUser,
      singleDeleteUserDialog

    }
  }
}
</script>

<style scoped>

</style>