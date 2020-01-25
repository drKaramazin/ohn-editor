import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule, MatTabsModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material';
import { MdePopoverModule } from '@material-extended/mde';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgJsonEditorModule } from 'ang-jsoneditor'

import { OhnApiService } from './services/ohn-api.service';
import { OhnAuthService } from './services/ohn-auth.service';
import { StorageService } from './services/storage.service';
import { ElementsTreeComponent } from './widgets/elements-tree/elements-tree.component';
import { ElementClassIconComponent } from './widgets/element-class-icon/element-class-icon.component';
import { CurrentElementComponent } from './widgets/current-element/current-element.component';
import { CredentialsComponent } from './pages/credentials/credentials.component';
import { StructureComponent } from './pages/structure/structure.component';
import { CurrentUserComponent } from './pages/current-user/current-user.component';

@NgModule({
  declarations: [
    AppComponent,
    ElementsTreeComponent,
    ElementClassIconComponent,
    CurrentElementComponent,
    CredentialsComponent,
    StructureComponent,
    CurrentUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatTreeModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MdePopoverModule,
    MatTooltipModule,
    NgJsonEditorModule,
    MatTabsModule,
  ],
  providers: [
    OhnApiService,
    OhnAuthService,
    StorageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
