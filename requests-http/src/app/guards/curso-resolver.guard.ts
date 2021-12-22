import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Curso } from '../cursos/cursos.model';
import { CursosService } from './../cursos/cursos.service';

@Injectable({
  providedIn: 'root',
})
export class CursoResolverGuard implements Resolve<Curso> {
  constructor(private service: CursosService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Curso> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }

    return of({
      id: '',
      nome: '',
    });
  }
}
