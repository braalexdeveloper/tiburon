import { Injectable } from '@angular/core';
declare let alertify:any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { 
    // Configuración de la posición de las alertas
    alertify.set('notifier', 'position', 'top-right'); // Cambia 'top-right' por la posición deseada
  }

  error(message:string){
   alertify.error(message);
  }

  warning(message:string){
   alertify.warning(message);
  }

  message(message: string) {
    alertify.message(message);
  }

  success(message: string) {
    alertify.success(message)
  }

  alert(message: string) {
    alertify.alert(message)
  }

 
  confirm({ title, message, callback_delete }: { title: string, message: string, callback_delete: () => any; }) {
   
    alertify.confirm(title, message,
      function () {
        callback_delete();
        alertify.success('Eliminado Correctamente')
      }
      , function () { alertify.error('Cancel') });

  }

}
