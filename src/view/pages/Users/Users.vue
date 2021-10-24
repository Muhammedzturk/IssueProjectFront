<template>
  <div class="card">
    <h5>Kullanıcı Listesi</h5>
    <div class="card"  style="height: calc(100vh - 143px)">
      <DataTable :value="users" v-model:selection="selectedProducts"  selectionMode="single" dataKey="id" showGridlines responsiveLayout="scroll" :scrollable="true" scrollHeight="flex"
                 v-model:filters="filters3" filterDisplay="menu" class="p-datatable-users"
                 :globalFilterFields="['userUserName','registrationNumber','userPhoneNumber','userEmail','role']">

        <!-- DatatTable üst kısımdaki butonlar ve filtreleme inputu -->
        <template #header>
          <div class="p-d-flex p-jc-between">
            <Button label=" Yeni Kullanıcı Oluştur" icon="pi pi-user-plus" class="p-button-success mr-2 p-button-outlined" @click="openNewUser" style="border-radius: 0.5rem" />
            <Button label="Tüm Kullanıcıları Sil" icon="pi pi-trash" class="p-button-danger mr-2 p-button-outlined" @click="deleteAllUser" style="border-radius: 0.5rem" />
            <Button type="button" icon="pi pi-filter-slash" label="Filtreleri Temizle" class="p-button-mr-2 p-button-outlined" @click="clearFilter3()" style="border-radius: 0.5rem"/>
            <span class="p-input-icon-left">
        <i class="pi pi-search col-offset-8"  />
        <InputText class="col-offset-8" v-model="filters3['global'].value"  placeholder="Genel arama" />
      </span>
          </div>
        </template>

        <!-- filtreleme sonucunda herhangi bir değer bulunamadı kısmı -->
        <template #empty>
          Bir sonuç bulunamadı...
        </template>


        <!-- kullanıcı DataTable kısmı -->

        <Column field="userUserName" header="Ad Soyad"  >
          <template #body="{data}">
            {{data.userUserName}}
          </template>
        </Column>

        <Column field="registrationNumber" header="Sicil Numarası" style="width: 300px">
          <template #body="{data}">
            {{data.registrationNumber}}
          </template>
        </Column>

        <Column field="userPhoneNumber" header="Telefon">
          <template #body="{data}">
            {{data.userPhoneNumber}}
          </template>
        </Column>

        <Column field="userEmail" header="E-mail">
          <template #body="{data}">
            {{data.userEmail}}
          </template>
        </Column>

        <Column field="role" header="Rol">
          <template #body="{data}">
            {{data.role}}
          </template>
        </Column>

        <!-- kullanıcı tablosunu güncelle ve sil butonlarının olduğu sütun -->
        <Column :exportable="false" style="min-width:8rem" header="Güncelle ve Sil">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" class=" ml-auto mr-2 p-button-rounded p-button-success p-mr-2 p-button-outlined" @click="editUser(slotProps.data)" />
            <Button icon="pi pi-trash" class=" p-button-rounded p-button-danger p-button-outlined" @click="singleDeleteUser(slotProps.data)" />
          </template>
        </Column>
      </DataTable>
    </div>
    <!--Yeni kullanıcı oluştur işlemi -->
    <Dialog v-model:visible="newCreateUserDialog" :style="{width: '450px'}" header="Yeni Kullanıcı Oluştur" :modal="true" class="p-fluid">
      <div class="card">
        <div class="p-field">
          <label for="userUserName">Ad Soyad*</label>
          <InputText id="userUserName" v-model="user.userUserName" required="true" autofocus :class="{'p-invalid': added && !user.userUserName}" />
          <small class="p-error" v-if="added && !user.userUserName">Ad Soyad Boş Bırakılamaz.</small>
        </div>
        <div class="p-field">
          <label for="registrationNumber">Sicil Numarası*</label>
          <InputText id="registrationNumber" v-model="user.registrationNumber" required="true" autofocus :class="{'p-invalid': added && !user.registrationNumber}" />
          <small class="p-error" v-if="added && !user.registrationNumber">Sicil Numarası Boş Bırakılamaz.</small>
        </div>
        <div class="p-field">
          <label for="userPhoneNumber">Telefon*</label>
          <InputMask mask="(999) 999-9999"  id="userPhoneNumber" v-model="user.userPhoneNumber" required="true" autofocus :class="{'p-invalid': added && !user.userPhoneNumber}" />
          <small class="p-error" v-if="added && !user.userPhoneNumber">Telefon Boş Bırakılamaz.</small>
        </div>
        <div class="p-field">
          <label for="userEmail">E-mail*</label>
          <InputText id="userEmail" v-model="user.userEmail" required="true" autofocus :class="{'p-invalid': added && !user.userEmail}" />
          <small class="p-error" v-if="added && !user.userEmail">E-mail Boş Bırakılamaz.</small>
        </div>
        <div class="p-field">
          <label for="role">Rol*</label>
          <InputText id="role" v-model="user.role" required="true" autofocus :class="{'p-invalid': added && !user.role}" />
          <small class="p-error" v-if="added && !user.role">Rol Boş Bırakılamaz.</small>
        </div>
      </div>
      <template #footer>
        <Button label="İptal" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
        <Button label="Kaydet" icon="pi pi-check" class="p-button-text" @click="saveUser" />
      </template>

    </Dialog>
    <!--kullanıcı güncelleme  işlemi -->
    <Dialog v-model:visible="userDialogUpdate" :style="{width: '450px'}" header="Kullanıcı Güncelle" :modal="true" class="p-fluid">
      <div class="card">
        <div class="p-field">
          <label for="userUserName">Ad Soyad*</label>
          <InputText id="userUserName" v-model="user.userUserName" required="true" autofocus :class="{'p-invalid': added && !user.userUserName}" />
          <small class="p-error" v-if="added && !user.userUserName">Ad Soyad Boş Bırakılamaz.</small>
        </div>
        <div class="p-field">
          <label for="registrationNumber">Sicil Numarası*</label>
          <InputText id="registrationNumber" v-model="user.registrationNumber" required="true" autofocus :class="{'p-invalid': added && !user.registrationNumber}" />
          <small class="p-error" v-if="added && !user.registrationNumber">Sicil Numarası Boş Bırakılamaz.</small>
        </div>
        <div class="p-field">
          <label for="userPhoneNumber">Telefon*</label>
          <InputMask mask="(999) 999-9999"  id="userPhoneNumber" v-model="user.userPhoneNumber" required="true" autofocus :class="{'p-invalid': added && !user.userPhoneNumber}" />
          <small class="p-error" v-if="added && !user.userPhoneNumber">Telefon Boş Bırakılamaz.</small>
        </div>
        <div class="p-field">
          <label for="userEmail">E-mail*</label>
          <InputText id="userEmail" v-model="user.userEmail" required="true" autofocus :class="{'p-invalid': added && !user.userEmail}" />
          <small class="p-error" v-if="added && !user.userEmail">E-mail Boş Bırakılamaz.</small>
        </div>
        <div class="p-field">
          <label for="role">Rol*</label>
          <InputText id="role" v-model="user.role" required="true" autofocus :class="{'p-invalid': added && !user.role}" />
          <small class="p-error" v-if="added && !user.role">Rol Boş Bırakılamaz.</small>
        </div>
      </div>
      <template #footer>
        <Button label="İptal" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
        <Button label="Güncelle" icon="pi pi-check" class="p-button-text" @click="userUpdate" />
      </template>

    </Dialog>
      <!-- tüm kullanıcıları silme işlemi -->
    <Dialog v-model:visible="deleteAllUserDialog" :style="{width: '450px'}" header="Tüm Kullanıcıları Sil" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="user">Tüm Kullanıcıları silmek istediğinizden emin misiniz?</span>
      </div>
      <template #footer>
        <Button label="Hayır" icon="pi pi-times" class="p-button-text" @click="deleteAllUserDialog = false"/>
        <Button label="Evet" icon="pi pi-check" class="p-button-text" @click="deleteAllUsers" />
      </template>
    </Dialog>

    <!-- tek satırdaki kullanıcıyı silme işlemi -->
    <Dialog v-model:visible="singleDeleteUserDialog" :style="{width: '450px'}" header=" Kullanıcıyı Sil" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="user">{{user.userUserName}} adlı kullanıcıyı silmek istediğinizden emin misiniz?</span>
      </div>
      <template #footer>
        <Button label="Hayır" icon="pi pi-times" class="p-button-text" @click="singleDeleteUserDialog = false"/>
        <Button label="Evet" icon="pi pi-check" class="p-button-text" @click="deleteSingleUser" />
      </template>
    </Dialog>


  </div>
    </template>

<script>
import {ref,onMounted} from 'vue';
import UserService from "./UserService";
import {FilterMatchMode,FilterOperator} from 'primevue/api';


export default {
  setup() {
    onMounted(() => {
      userService.value.getUsers().then(data => {
        users.value = data;
        users.value.forEach(users => users.date = new Date(users.date));
      });
    })

    const added=ref();
    const user=ref();
    const selectedProducts=ref();
    const newCreateUserDialog = ref(false);
    const userDialogUpdate = ref(false);
    const userService = ref(new UserService());
    const deleteAllUserDialog = ref(false);
    const singleDeleteUserDialog = ref(false);

    const openNewUser= () =>{
      user.value = {};
      added.value = false;
      newCreateUserDialog.value = true;

    }
    const hideDialog = () =>{
      userDialogUpdate.value=false;
      newCreateUserDialog.value=false;
      added.value = false;
    }
    const saveUser = () => {
      added.value = true;
      if (user.value.userUserName) {
        if (user.value.id) {
          users.value[findIndexById(user.value.id)] = user.value;

        }
        else {
          user.value.id = createId();
          users.value.push(user.value);

        }

        newCreateUserDialog.value = false;
        user.value = {};
      }
    };
    const userUpdate = () => {
      added.value = true;
      if (user.value.userUserName) {
        if (user.value.id) {
          users.value[findIndexById(user.value.id)] = user.value;

        }
        else {
          user.value.id = createId();
          users.value.push(user.value);

        }

        userDialogUpdate.value = false;
        user.value = {};
      }
    };
    const findIndexById = (id) => {
      let index = -1;
      for (let i = 0; i < users.value.length; i++) {
        if (users.value[i].id === id) {
          index = i;
          break;
        }
      }
      return index;
    };
    const createId = () => {
      let id = '';
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for ( var i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
    }
    const filters3 = ref({
      'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
      'userUserName':{value: null, matchMode: FilterMatchMode.CONTAINS},
      'registrationNumber': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
      'userPhoneNumber': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
      'userEmail': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
      'role': {value: null, matchMode: FilterMatchMode.STARTS_WITH}
    });

    const clearFilter3 = () => {
      initFilters3();

    };
    const initFilters3 = () => {
      filters3.value = {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        'userUserName':{value: null, matchMode: FilterMatchMode.CONTAINS},
        'registrationNumber': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        'userPhoneNumber': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        'userEmail': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        'role': {value: null, matchMode: FilterMatchMode.STARTS_WITH}
      }
    };

    const editUser = (us) => {
      user.value = {...us};
      userDialogUpdate.value = true;
    };
    const deleteAllUser = () =>{
      deleteAllUserDialog.value=true;
    }
    const deleteAllUsers = () =>{
      users.value = users.value.filter (val => !users.value.includes(val));
      deleteAllUserDialog.value = false;
    }
    const singleDeleteUser =(us) =>{
      user.value=us;
      singleDeleteUserDialog.value=true;
    }
    const deleteSingleUser =() =>{
      users.value = users.value.filter(val => val.id !== user.value.id);
      singleDeleteUserDialog.value = false;
      user.value = {};
    }

    const users =ref(null);
    return {added,user,openNewUser,newCreateUserDialog,editUser,users,saveUser,createId,findIndexById,filters3,clearFilter3,
      initFilters3,userDialogUpdate,userUpdate,hideDialog,selectedProducts,FilterOperator,FilterMatchMode,deleteAllUser,
      deleteAllUserDialog,deleteAllUsers,singleDeleteUser,singleDeleteUserDialog,deleteSingleUser
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
