<template>

  <!--  firma ilgilisi bilgisi güncelleme işlemi -->
  <Button icon="pi pi-pencil" class=" ml-auto mr-2 p-button-rounded p-button-success p-mr-2 p-button-outlined" @click="editContact()" />
  <Dialog v-model:visible="contactDialogUpdate" :style="{width: '450px'}" header="Firma İlgilisi Güncelle" :modal="true" class="p-fluid">

    <div class="p-field">
      <label for="userName">Ad Soyad*</label>
      <InputText id="userName" v-model="state.userName" required="true" autofocus  />
      <small class="p-error" v-if="v$.userName.$error">Ad Soyad Boş Bırakılamaz.</small>
    </div>

    <div class="p-field">
      <label for="task">Görevi*</label>
      <InputText id="task" v-model="state.task" required="true" autofocus />
      <small class="p-error" v-if="v$.task.$error">Görevi Boş Bırakılamaz.</small>
    </div>

    <div class="p-field">
      <label for="contactPhoneNumber">Telefon*</label>
      <InputMask  id="contactPhoneNumber"  mask="(999) 999-9999" v-model="state.contactPhoneNumber" required="true" autofocus />
      <small class="p-error" v-if="v$.contactPhoneNumber.$error">Telefon Boş Bırakılamaz.</small>
    </div>

    <div class="p-field">
      <label for="email" class="p-mb-3">E-mail*</label>
      <InputText id="email" v-model="state.email" required="true" autofocus  />
      <small class="p-error" v-if="v$.email.$error">E-mail Boş Bırakılamaz.</small>
    </div>

    <template #footer>
      <Button label="İptal" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
      <Button label="Güncelle" icon="pi pi-check" class="p-button-text" @click="updateContact" />
    </template>
  </Dialog>

  <!--  Tek satırdaki firma ilgilisi silme işlemi dialogu-->
  <Button icon="pi pi-trash" class=" p-button-rounded p-button-danger p-button-outlined" @click="confirmDeleteContact(data)" />
  <Dialog v-model:visible="deleteContactDialog" :style="{width: '450px'}" header=" Firma İlgilisi Sil" :modal="true">
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3 " style="font-size: 2rem" />
      <span v-if="contact">{{contact.userName}} kişisini silmek istediğinizden emin misiniz<b></b>?</span>
    </div>
    <template #footer>
      <Button label="Hayır" icon="pi pi-times" class="p-button-text" @click="deleteContactDialog = false"/>
      <Button label="Evet" icon="pi pi-check" class="p-button-text" @click="deleteContact" />
    </template>
  </Dialog>

</template>

<script>
import {computed, reactive, ref} from 'vue';
import { useToast } from 'primevue/usetoast';
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";

export default {
  emits:['send-data-update-contact','send-data-delete-contact'],
  props:['data'],
  setup(props,{emit}){
    const contactDialogUpdate= ref(false);
    const deleteContactDialog= ref(false);
    const contact =ref({});
    const companyContacts =ref();
    const toast = useToast();
    const sended=ref(false);

    console.log("contact",props.data)


    const rules = computed(() => {
      return{
        userName:{required},
        task:{required},
        contactPhoneNumber:{required},
        email:{required},
      }
    })
    const state = reactive({
      id:props.data.id ,
      userName:props.data.userName,
      task:props.data.task,
      contactPhoneNumber:props.data.contactPhoneNumber,
      email:props.data.email,
    })

    const v$ = useVuelidate(rules, state);


    //firma ilgilisi güncelleme işlemi
    const updateContact = () => {
      v$.value.$validate();
      if(!v$.value.$error){
        emit("sendDataUpdateContact",state)
        toast.add({severity: 'success', summary: 'Başarılı', detail: 'Firma Güncellendi', life: 3000});
        contactDialogUpdate.value = false;

      }


    }

    const hideDialog = () => {
      contactDialogUpdate.value=false;
    }
    //firma ilgili güncelleme butonu click i
    const editContact = () => {
      console.log('contakta')
      //company.value={...data}
      sended.value = false;
      contactDialogUpdate.value = true;
    };
    //firma ilgili tablosunda tek satırdaki firma ilgilisi sil butonunun click'i
    const confirmDeleteContact = (cont) => {
      contact.value = cont;
      deleteContactDialog.value = true;
    };
    //tek satırdaki firma ilgilisi silme işlemi
    const deleteContact = () => {
     emit('send-data-delete-contact',state.id);
    };


    return{
      v$,state,rules, updateContact,contact,contactDialogUpdate,hideDialog,toast,sended,editContact,
      companyContacts,confirmDeleteContact,deleteContactDialog,deleteContact
    }
  }
};
</script>

<style scoped>

</style>