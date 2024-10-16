import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MenubarModule } from 'primeng/menubar';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { ToastModule } from 'primeng/toast';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AvatarModule } from 'primeng/avatar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuModule } from 'primeng/menu';
import { AuthActivateRouteGuard } from './routeGuard/auth.routeguard';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { TabViewModule } from 'primeng/tabview';
import { MovieManagementComponent } from './components/admin-profile/movie-management/movie-management.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { MovieDetailComponent } from './components/admin-profile/movie-management/movie-detail/movie-detail.component';
import { EditorModule } from 'primeng/editor';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { CalendarModule } from 'primeng/calendar';
import { DatePipe } from '@angular/common';
import { DirectorManagementComponent } from './components/admin-profile/director-management/director-management.component';
import { DirectorDetailComponent } from './components/admin-profile/director-management/director-detail/director-detail.component';
import { ActorManagementComponent } from './components/admin-profile/actor-management/actor-management.component';
import { ActorDetailComponent } from './components/admin-profile/actor-management/actor-detail/actor-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    UserProfileComponent,
    AdminProfileComponent,
    MovieManagementComponent,
    MovieDetailComponent,
    DirectorManagementComponent,
    DirectorDetailComponent,
    ActorManagementComponent,
    ActorDetailComponent
  ],
  imports: [
    CalendarModule,
    ImageModule,
    FileUploadModule,
    RadioButtonModule,
    EditorModule,
    TableModule,
    PaginatorModule,
    InputNumberModule,
    MultiSelectModule,
    TabViewModule,
    MenuModule,
    OverlayPanelModule,
    AvatarModule,
    ToastModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    ProgressSpinnerModule,
    ButtonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    MenubarModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    DialogService,
    ConfirmationService,
    MessageService,
    AuthActivateRouteGuard,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
