import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PhoneModel } from '../../models/PhoneModel';
import { PhoneService } from '../../services/phone.service';
import { ValidatorHelperService } from '../../services/validator-helper.service';

@Component({
  selector: 'app-phone-update',
  templateUrl: './phone-update.component.html'
})
export class PhoneUpdateComponent implements OnInit {

  _form: FormGroup;
  @Input('tel') tel: PhoneModel;
  loading: boolean = false;
  cl: string; 

  clearDate(): void {
    this._form.patchValue({ finishDate: null });
  }


  constructor(private _phomeService: PhoneService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public vh: ValidatorHelperService,
    private modalService: NgbModal,
    public modal: NgbActiveModal,
    public calendar: NgbCalendar

  ) {
    this.createForm();
  }

  createForm() {

    this._form = this.fb.group({
      id: ['0'],
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      customerId: ['0']
    });

  }

  ngOnInit() {

    this._form.patchValue(this.tel);

    setTimeout(function () { document.getElementById("txtPhone").focus(); }, 200);

  }


  save() {

    if (this._form.invalid) {

      Object.values(this._form.controls).forEach(control => {
        control.markAsTouched();
      });
      this.loading = false;
      return false;
    }

    let creating: Boolean = (this._form.value.id == null || this._form.value.id == 0);
    this.modal.close({ creating: creating, result: "ok", record: this._form.value });

  }
}

