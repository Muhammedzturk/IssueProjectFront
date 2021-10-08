<template>
  <div>
    <div class="p-grid">
      <div class=" p-md-6 p-fluid">
        <h6>Yeni Teklif Oluştur</h6>
        <div class="card">
          <small class="ml-2">Teklif Numarası </small>
          <div class="grid formgrid col-12">

            <div class="col-2 mb-4 ">
              <span class="p-float-label">
              <InputText class="p-inputtext-sm" type="text"></InputText>
                <label for="username">Username</label>
              </span>
            </div>
            <div class="col-2 ">
              <InputText type="text" class="p-inputtext-sm" placeholder="Disabled" :disabled="true"></InputText>
            </div>
            <div class="col-2 ">
              <InputText type="text"  placeholder="Invalid" class="p-invalid p-inputtext-sm" />
            </div>
            <div class="col-2  ">
              <label class=" col" for="offerdate">Teklif Tarihi</label>
            </div>
            <div class="col-4">
              <Calendar id="offerdate"  class="p-lg-4" v-model="value" :showButtonBar="true" />
            </div>
            </div>
          </div>
        <div class="card">
          <h5>Icons</h5>
          <div class="p-grid p-formgrid">
            <div class="p-col-12 p-mb-2 p-lg-4 p-mb-lg-0">
                            <span class="p-input-icon-left">
                                <i class="pi pi-user" />
                                <InputText type="text" placeholder="Username" />
                            </span>
            </div>
            <div class="p-col-12 p-mb-2 p-lg-4 p-mb-lg-0">
                            <span class="p-input-icon-right">
                                <InputText type="text" placeholder="Search" />
                                <i class="pi pi-search" />
                            </span>
            </div>
            <div class="p-col-12 p-mb-2 p-lg-4 p-mb-lg-0">
                            <span class="p-input-icon-left p-input-icon-right">
                                <i class="pi pi-user" />
                                <InputText type="text" placeholder="Search" />
                                <i class="pi pi-search" />
                            </span>
            </div>
          </div>
</div>
          <h5>Float Label</h5>
          <span class="p-float-label">
                        <InputText id="username" type="text" v-model="floatValue"/>
                        <label for="username">Username</label>
                    </span>
        </div>

        <div class="card">
          <h5>Slider</h5>
          <InputText v-model.number="sliderValue" />
          <Slider v-model="sliderValue" />
        </div>
      </div>
    </div>

</template>
<style scoped>
</style>

