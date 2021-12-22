import { ConfirmModalComponent } from './../confirm-modal/confirm-modal.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

@NgModule({
  declarations: [AlertModalComponent],
  imports: [CommonModule],
  exports: [AlertModalComponent],
  entryComponents: [AlertModalComponent, ConfirmModalComponent],
})
export class SharedModule {}
