import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorHelperService {

  constructor() { }

  public isValidField(form: FormGroup, field: string) {
    try {
      return form.get(field).invalid && form.get(field).touched;
    } catch (e) {
      console.log("Se ha lanzado un error en el campo '" + field + "'");
      return false;
    }
  }
}
