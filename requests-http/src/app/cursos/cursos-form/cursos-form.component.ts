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
    const curso = this.route.snapshot.data['curso'];

    this.form = this.fb.group({
      id: [curso.id],
      nome: [
        curso.nome,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
    });
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      let messageSuccess = 'Curso criado com sucesso';
      let messageError = 'Erro ao criar curso, tente novamente mais tarde';

      if (this.form.value.id) {
        messageSuccess = 'Curso atualizado com sucesso';
        messageError = 'Erro ao atualizar curso, tente novamente mais tarde';
      }

      this.service.save(this.form.value).subscribe(
        (success) => {
          this.modal.showAlertSuccess(messageSuccess);
          this.location.back();
        },
        (error) => {
          this.modal.showAlertDanger(messageError);
        }
      );
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }
}
