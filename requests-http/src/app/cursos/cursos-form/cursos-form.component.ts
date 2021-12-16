import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from './../../shared/alert-modal.service';
import { CursosService } from './../cursos.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
})
export class CursosFormComponent implements OnInit {
  form!: FormGroup;
  submitted!: boolean;

  constructor(
    private fb: FormBuilder,
    private service: CursosService,
    private modal: AlertService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.route.params.subscribe((params: any) => {
    //   const id = params['id'];
    //   const curso$ = this.service.loadById(id);
    //   curso$.subscribe((curso) => {
    //     this.updateForm(curso);
    //   });
    // });

    // this.route.params
    //   .pipe(
    //     map((params: any) => params['id']),
    //     switchMap((id) => this.service.loadById(id))
    //   )
    //   .subscribe((curso) => this.updateForm(curso));

    const curso = this.route.snapshot;

    this.form = this.fb.group({
      id: [null],
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
    });
  }

  updateForm(curso: any) {
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome,
    });
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.service.create(this.form.value).subscribe(
        (success) => {
          this.modal.showAlertSuccess('Curso criado com sucesso');
          this.location.back();
        },
        (error) =>
          this.modal.showAlertDanger(
            'Erro ao criar curso, tente novamente mais tarde'
          ),
        () => {
          console.log('finalizou');
        }
      );
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }
}
