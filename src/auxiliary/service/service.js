import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";

export const servce = (app) =>{
    app.use(ConfirmationService);
    app.use(ToastService);
}