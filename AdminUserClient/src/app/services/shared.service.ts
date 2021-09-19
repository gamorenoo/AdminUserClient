import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { confirm } from 'devextreme/ui/dialog';

@Injectable({
    providedIn: 'root'
  })
  export class SharedService {

    public loader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    showLoader(valor: boolean) {
        return this.loader.next(valor);
    }
    
    async confirm(message: string): Promise<boolean> {
        const c = await confirm(message, 'Confirmar acción');
        return c;
    }
  }