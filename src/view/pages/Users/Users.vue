<template>
  <div class="card">
    <h5>Kullanıcı Listesi</h5>
    <div class="card"  style="height: calc(100vh - 143px)">
      <DataTable :value="users" v-model:selection="selectedUsers"
                 selectionMode="single" dataKey="id"
                 showGridlines responsiveLayout="scroll"
                 :scrollable="true" scrollHeight="flex"
                 v-model:filters="filters3" filterDisplay="menu" class="p-datatable-users"
                 :globalFilterFields="['userUserName','registrationNumber','userPhoneNumber','userEmail','role']">

        <!-- DatatTable üst kısımdaki butonlar ve filtreleme inputu -->
        <template #header>
          <div class="p-d-flex p-jc-between">
            <!-- kullanıcı oluşturma componenti -->

          <create-user

              @send-data-create-user="sendDataCreateUser"

          ></create-user>

            <Button type="button" icon="pi pi-filter-slash" label="Filtreleri Temizle" class="p-button-mr-2 p-button-outlined"
                    @click="clearFilter3()" style="border-radius: 0.5rem"/>
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

            <update-user

             @send-data-update-user="sendDataUpdateUser"
             :data="slotProps.data"
             :userUserName="slotProps.data.userUserName"
             @send-data-delete-user="sendDataDeleteUser"

            ></update-user>


          </template>
        </Column>
      </DataTable>
    </div>




  </div>
    </template>

<script>


import {FilterMatchMode,FilterOperator} from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import CreateUser from "../../../components/Users/CreateUser";
import UpdateUser from "../../../components/Users/UpdateUser";
import {onMounted, ref} from "vue";
import UsersService from "../../../service/users.service";

export default {
  components: {UpdateUser, CreateUser},
  setup() {
    onMounted(async() => {
      await UsersService.getUserList().then(r =>{
        users.value= r.payload.map((data,index) =>{
          return {
            index:index,
            id:data.id,
            userName:data.userName,
            task:data.task,
            contactPhoneNumber:data.contactPhoneNumber,
            email:data.email

          }
        })
      })

    });

    const added = ref();
    const user = ref();
    const selectedUsers = ref();
    const userDialogUpdate = ref(false);

    const singleDeleteUserDialog = ref(false);
    const toast = useToast();


    //dialog kapama click i
    const hideDialog = () => {
      userDialogUpdate.value = false;
      added.value = false;
    }
    //yeni kullanıcı oluşturma güncelleştirme işlemi

      const sendDataCreateUser = (data) => {
        users.value.push({
          id:data.id,
          userUserName: data.userUserName,
          registrationNumber: data.registrationNumber,
          userPhoneNumber: data.userPhoneNumber,
          userEmail: data.userEmail,
          role: data.role,

        })
      };
    const sendDataUpdateUser = (data) =>{
      let index = findIndexById(data.id)
      users.value[index] = data;
    }
    const sendDataDeleteUser = (deleteId) => {

      let index = findIndexById(deleteId);
      users.value.splice(index,1)
      toast.add({severity:'warn', summary: 'Kullanıcı Silindi.', life: 3000});
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
        for (var i = 0; i < 5; i++) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
      }
      //filtreleme işlemi
      const filters3 = ref({
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},

      });
      //filtreleri temizleme işlemi
      const clearFilter3 = () => {
        initFilters3();

      };
      const initFilters3 = () => {
        filters3.value = {
          'global': {value: null, matchMode: FilterMatchMode.CONTAINS},

        }
      };
      //kullanıcı güncelleme dialogu açma click i


      const users = ref(null);
      return {
        added,
        user,
        users,
        createId,
        filters3,
        clearFilter3,
        sendDataCreateUser,
        initFilters3,
        userDialogUpdate,
        hideDialog,
        selectedUsers,
        FilterOperator,
        FilterMatchMode,
        singleDeleteUserDialog,
        toast,
        sendDataUpdateUser,
        sendDataDeleteUser,
        findIndexById
      }
    }
  }

</script>
<style lang="scss" scoped>

</style>
