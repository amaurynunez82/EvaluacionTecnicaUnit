import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../../customer.service';
import { ErrorHandler } from '../../Helper/ErrorHandler';
import { CustomerModel } from '../../models/CustomerModel';
import { PhoneModel } from '../../models/PhoneModel';
import { PhoneService } from '../../services/phone.service';
import { ValidatorHelperService } from '../../services/validator-helper.service';
import { PhoneUpdateComponent } from '../phone-update/phone-update.component';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html'
})
export class CustomerUpdateComponent implements OnInit {

  _form: FormGroup;
  @Input('id') id: string;
  record: CustomerModel = new CustomerModel();
  loading: boolean = false;
  cl: string;
  messageExito: string = "";
  messageError: string = "";

  clearMessages() {
    this.messageError = "";
    this.messageExito = "";
  }


  genders: any[] = [{ id: "", value: "-Seleccione Genero-" }, { id: "M", value: "Masculino" }, { id: "F", value: "Femenimo" }]


  clearDate(): void {
    this._form.patchValue({ finishDate: null });
  }


  constructor(private _customerService: CustomerService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public vh: ValidatorHelperService,
    private modalService: NgbModal,
    public modal: NgbActiveModal,
    public calendar: NgbCalendar,
    public _phoneSerice: PhoneService

  ) {
    this.createForm();
  }

  createForm() {

    this._form = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(80)]],
      lastName: ['', [Validators.required, Validators.maxLength(80)]],
      emailAddress: ['', [Validators.required, Validators.maxLength(255)]],
      contactPhoneNumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      gender: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      phones: this.fb.array([])
    });

  }

  changeGender(e) {
    this._form.get('gender').setValue(e.target.value, {
      onlySelf: true,
    });
  }

  ngOnInit() {

    if (this.id && this.id !== "" && this.id !== "0") {

      this._customerService.getById(this.id).subscribe(result => {
        this.record = result;

        this._form.patchValue(result);
        this._form.controls.phones = this.fb.array(result.phones);

        var datex = new Date(result.dateOfBirth).toISOString().substring(0, 10);

        this._form.patchValue({ dateOfBirth: datex });
        this._form.controls['gender'].setValue(result.gender);

        var formArray = new FormArray([]);
        result.phones.forEach(p => {
          const fg = this.fb.group({ id: [0], customerId: [0], phone: [''] });
          fg.patchValue(this);
          formArray.push(fg);
        });
        this._form.addControl("phones", formArray);


      }, (error) => {

        this.messageError = ErrorHandler.handle(error);
      })
    }
  }


  save() {
    this.clearMessages();
    this.loading = true;
    if (this._form.invalid) {

      Object.values(this._form.controls).forEach(control => {
        control.markAsTouched();
      });
      this.loading = false;
      return false;
    }

    let creating: Boolean = (this._form.value.id == null || this._form.value.id == 0);
    this._customerService.save(this._form.value).subscribe(result => {
      this.loading = false;
      this.modal.close({ creating: creating, result: "ok", record: result });

    }, (error) => {
      this.loading = false;
      this.messageError = ErrorHandler.handle(reason);
    });

  }




  creatOreditPhone(phone: PhoneModel) {
    this.clearMessages();
    const modalRef = this.modalService.open(PhoneUpdateComponent, { ariaLabelledBy: 'modal-basic-title', size: 'md', backdrop: 'static', windowClass: "modalphone" });
    modalRef.componentInstance.tel = phone;

    modalRef.result.then((result) => {

      if (result == 'CloseClick') {

      }
      else {

        if (result.result == 'ok') {

          if (result.creating == true) {

            const fg = this.fb.group({ id: [0], customerId: [0], phone: [''] });
            fg.patchValue(result.record);
            this._form.controls.phones.push(fg);
            this._form.setControl("phones", this._form.controls.phones);
          }
          else {
            phone = result.record;
          }
        }
      }
    }, (reason) => {
      this.messageError = ErrorHandler.handle(reason);
    });

  }



  openCustomerModal(_id: number) {
    this.clearMessages();
    const modalRef = this.modalService.open(CustomerUpdateComponent, { ariaLabelledBy: 'modal-basic-title', size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.id = _id;

    modalRef.result.then((result) => {

      if (result == 'CloseClick') {
        //Por aqui entra cuando se le da al boton de cancelar
      }
      else {
        //Por aqui cuando se le da al boton de guardar
        if (result.result == 'ok') {
          this.messageExito = "Registro creado exitosamente";
          if (result.creating == true) {

          }
        }
      }
    }, (reason) => {
      this.messageError = ErrorHandler.handle(reason);
    });

  }

  deletePhone(phone: PhoneModel, indice: number) {
    this.clearMessages();
    if (phone.id != null && phone.id > 0) {
      this._phoneSerice.delete(phone.id.toString()).subscribe((result) => {
        if (result == true) {
          this._form.controls.phones.removeAt(indice);
          this.messageExito = "El telefono fue borrado exitosamente"
          this.ngOnInit();
        }
        else {
        }
      }, (reason) => {
        this.messageError = "El teléfono presentó inconvenientes a la hora de ser borrado";

      });
    }
    else {
      this._form.controls.phones.removeAt(indice);
    }

  }
}
