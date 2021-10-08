import Button from "primevue/button";
import RadioButton from "primevue/radiobutton";
import InputSwitch from "primevue/inputswitch";
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import Calendar from 'primevue/calendar';
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Textarea from 'primevue/textarea';
import Editor from 'primevue/editor';
import SplitButton from 'primevue/splitbutton';


export const prime = (app) => {

    app.component('Button',Button);
    app.component('InputText',InputText);
    app.component('TabView',TabView);
    app.component('TabPanel',TabPanel);
    app.component('RadioButton',RadioButton);
    app.component('InputSwitch',InputSwitch);
    app.component('Dialog',Dialog);
    app.component('Calendar',Calendar);
    app.component('DataTable',DataTable);
    app.component('Column',Column);
    app.component('Textarea',Textarea);
    app.component('Editor',Editor);
    app.component('SplitButton',SplitButton);
}