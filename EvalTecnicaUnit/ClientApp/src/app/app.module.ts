import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerUpdateComponent } from './components/customer-update/customer-update.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PhoneUpdateComponent } from './components/phone-update/phone-update.component';
import { NgSelectModule } from '@ng-select/ng-select';

export let InjectorInstance: Injector;

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent, 
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    CustomerListComponent,
    CustomerUpdateComponent,
    PhoneUpdateComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'customer-list', component: CustomerListComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CustomerUpdateComponent, PhoneUpdateComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    InjectorInstance = this.injector;
  }
}
