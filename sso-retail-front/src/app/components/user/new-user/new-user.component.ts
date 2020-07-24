import { UserService } from 'src/app/services/user.service';
import { Address } from './../../../model/address';
import { User } from './../../../model/user';
import { CepAddressService } from './../../../services/cep-address.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from '../../../base/base.component';
import { Perfil } from './../../../model/perfil';
import { PerfilService } from './../../../services/perfil.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent<T extends BaseComponent> implements OnInit {

  public hide: boolean = true;
  public hideConfirmation: boolean = true;
  public passwordConfirmation: string;
  public formGroup: FormGroup;

  isReadonly = false;
  submitted = false;
  loading: Boolean;

  public user: User;
  public address: Address;

  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private cepService: CepAddressService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.passwordConfirmation = "";
    this.toastr.clear();
    this.user = new User();
    this.createForm()
    this.address = new Address();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      name: [null, Validators.required],
      lastname: [null, Validators.required],
      cpf: [null, Validators.required],
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: [null, Validators.required],
      passwordConfirmation: [null, Validators.required],

      cep: [null, Validators.required],
      logradouro: [null, Validators.required],
      complemento: [null],
      bairro: [null, Validators.required],
      uf: [null, Validators.required],
      localidade: [null, Validators.required],
    });
  }

  onNoClick(): void {

  }

  save(formDirective: FormGroupDirective): void {
    this.submitted = true;
    this.loading = true

    if (this.formGroup.invalid) {
      return;
    }

    this.user.address = this.address;
    let service = this.isReadonly ? this.userService.update(this.user) : this.userService.save(this.user);

    service.subscribe( (user: User) => {
        this.toastr.success("Operação realizada com sucesso");
        this.onReset(formDirective);
        this.isReadonly = false;
        this.loading = false;
      },
      (err) => {
        console.log(err.error.message);
        this.toastr.error(err.error.message, "Erro ao salvar o usuário");
        this.isReadonly = false;
      }
    );

  }

  checkCep() {
    const cep = this.address.cep.replace(/\D/g, '');
    if (cep != "") {
      const validacep = /^[0-9]{8}$/;
      if (validacep.test(cep)) {
        this.fillAddress();
      } else {
        console.log("Errro cpf")
      }
    }
  }

  fillAddress(): void {
    this.cepService.getAddressByCep(this.address.cep.trim()).subscribe((response: Address) => {
      this.address = response;
    });
  }

  onReset(formDirective: FormGroupDirective) {
    this.submitted = false;
    this.formGroup.reset();
    formDirective.resetForm();
  }

}
