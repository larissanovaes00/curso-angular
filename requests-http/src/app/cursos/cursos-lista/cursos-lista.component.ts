import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { catchError, empty, Observable, Subject } from 'rxjs';
import { Curso } from '../cursos.model';
import { CursosService } from '../cursos.service';
import { AlertService } from './../../shared/alert-modal.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
})
export class CursosListaComponent implements OnInit {
  @ViewChild('deleteModal') deleteModal: any;

  cursos$: Observable<Curso[]> | undefined;
  error$ = new Subject<boolean>();

  cursoSelecionado!: Curso;

  deleteModalRef!: BsModalRef;

  constructor(
    private service: CursosService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.service.list().pipe(
      catchError((error) => {
        console.error(error);
        this.handleError();
        return empty();
      })
    );

    this.service.list().subscribe((dados) => {
      return true;
    });
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar cursos.');
  }

  onEdit(id: number) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  onDelete(curso: Curso) {
    this.cursoSelecionado = curso;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {
      class: 'modal-sm',
    });
  }

  onConfirmDelete() {
    this.service.delete(this.cursoSelecionado.id).subscribe(
      success => {
        this.onRefresh()
        this.hideModal()
      },
      error => {
        this.alertService.showAlertDanger('Erro ao excluir curso')
        this.hideModal()
      }
    );
  }

  onDeclineDelete() {
    this.hideModal()
  }

  hideModal() {
    this.deleteModalRef.hide();
  }
}
