import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorHandler } from '../../Helper/ErrorHandler';
import { CustomerModel } from '../../models/CustomerModel';
import { PhoneModel } from '../../models/PhoneModel';
import { CustomerService } from '../../services/customer.service';
import { PhoneService } from '../../services/phone.service';
import { CustomerUpdateComponent } from '../customer-update/customer-update.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  loading: boolean = false;
  records: CustomerModel[];
  record: CustomerModel;
  phones: PhoneModel[];
  messageExito: string = "";
  messageError: string = "";
  state: number = 0;  //0 normal, 1 inserting, 2 editing

  constructor(private _customerService: CustomerService, private _customerTypeService: PhoneService,
    private modalService: NgbModal) {
  }

  ngOnInit() {
    this.loadData();
  }

  clearMessages() {
    this.messageError = "";
    this.messageExito = "";
  }

  beginCreate() {

    this.clearMessages();
    this.record = new CustomerModel();
    this.state = 1;
    this.record.gender = "";
    setTimeout(function () {
      document.getElementById("txtName").focus();
    }, 300);
  }

  cancel() {
    this.clearMessages();
    this.state = 0;
  }

  edit(rec: CustomerModel) {

    this.clearMessages();
    this.state = 2;
    this.openCustomerModal(rec.id);
  }

  delete(rec: CustomerModel) {
    this.record = rec;
    this.clearMessages();
    this.loading = true;

    this._customerService.delete(rec.id.toString()).subscribe(result => {
      this.loading = false;
      this.messageError = "Registro borrado exitosamente";
      this.loadData();
    }, error => {
      this.loading = false;
      this.messageError = ErrorHandler.handle(error);
    });

  }

  save(form: NgForm) {

    this.clearMessages();
    this.loading = true;
    this._customerService.save(this.record).subscribe(result => {

      this.loading = false;
      if (this.state == 1) {
        this.messageExito = "El registro fue creado exitosamente";  
      }
      else {
        this.messageExito = "El registro fue actualizado exitosamente";
      }
      this.state = 0;
      this.loadData();

    }, error => {
      this.loading = false;
      this.messageError = ErrorHandler.handle(error);
    });

  }
   
  loadData() {
    this.loading = true;
    this._customerService.getAll().subscribe(result => {
      this.records = result;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.messageError = ErrorHandler.handle(error);
    });
  }


  openCustomerModal(_id: number) {
    const modalRef = this.modalService.open(CustomerUpdateComponent, { ariaLabelledBy: 'modal-basic-title', size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.id = _id;

    modalRef.result.then((result) => {

      if (result == 'CloseClick') {

      }
      else {
        if (result.result == 'ok') {
          if (result.creating == true) {
            this.messageExito = "El cliente fue creado exitosamente";
     
          }
          else {
            this.messageExito = "El cliente fue actualizado exitosamente";
          }
                 this.loadData();
        }
      }
    }, (error) => {
      this.messageError = ErrorHandler.handle(error);
    });

  }
}
