import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  cursos$: Observable<Curso[]> | undefined;
  error$ = new Subject<boolean>();

  constructor(
    private service: CursosService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
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
}
