import Button from "primevue/button";
import RadioButton from "primevue/radiobutton";
import InputSwitch from "primevue/inputswitch";
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import InputText from 'primevue/inputtext';
export const prime = (app) => {

    app.component('Button',Button);
    app.component('InputText',InputText);
    app.component('TabView',TabView);
    app.component('TabPanel',TabPanel);
    app.component('RadioButton',RadioButton);
    app.component('InputSwitch',InputSwitch);
}