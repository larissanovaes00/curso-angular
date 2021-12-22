import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  @Input() title: string = ''
  @Input() message: string = ''
  @Input() cancelTxt: string = 'Cancelar'
  @Input() saveTxt: string = 'Salvar'

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {}

  onClose(){
    this.bsModalRef.hide()
  }


}
