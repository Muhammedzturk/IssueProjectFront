import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'prismjs/themes/prism-coy.css';
import './assets/styles/layout.scss';
import './assets/demo/flags/flags.css';

import { createApp, reactive } from 'vue';
import router from './router';
import App from './App.vue';
import ApiService from '/src/service/api.service'

import PrimeVue from 'primevue/config';
import BadgeDirective from 'primevue/badgedirective';
import ConfirmationService from 'primevue/confirmationservice';
import Ripple from 'primevue/ripple';
import StyleClass from 'primevue/styleclass';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';
import CodeHighlight from './view/config/AppCodeHighlight';
import Button from 'primevue/button';
import RadioButton from "primevue/radiobutton";
import InputSwitch from "primevue/inputswitch";
router.beforeEach(function(to, from, next) {
    window.scrollTo(0, 0);
    next();
});

const app = createApp(App);

app.config.globalProperties.$appState = reactive({ theme: 'saga-blue' });
ApiService.init();
app.use(PrimeVue, { ripple: true, inputStyle: 'outlined' });
app.use(ConfirmationService);
app.use(ToastService);
app.use(router);

app.component('Button',Button);
app.component('RadioButton',RadioButton);
app.component('InputSwitch',InputSwitch);

app.directive('tooltip', Tooltip);
app.directive('ripple', Ripple);
app.directive('code', CodeHighlight);
app.directive('badge', BadgeDirective);
app.directive('styleclass', StyleClass);



app.mount('#app');