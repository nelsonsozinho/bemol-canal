import { UserService } from 'src/app/services/user.service';
import { Address } from './../../../model/address';
import { User } from './../../../model/user';
import { CepAddressService } from './../../../services/cep-address.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from '../../../base/base.component';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.passwordConfirmation = "";
    this.toastr.clear();
    this.user = new User();
    this.address = new Address();

    this.createForm();
    this.loadUserData();
  }

  loadUserData() {
    this.route.params.subscribe((params) => {
      var id = params['id'];
      if (!id) {
        this.user = new User();
      } else {
        this.userService.findById(id).subscribe(
          (user: User) => {
            this.user = user;
            this.address = user.address;
            this.isReadonly = true;
          },
          (err) => {
            console.log('ocorreu um erro');
            this.toastr.error("Erro ao obter dados do usuário");
          }
        );
      }
    });
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      name: [null, Validators.required],
      lastname: [null, Validators.required],
      cpf: [null, Validators.required],
      sexo: [null, Validators.required],
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


  save(formDirective: FormGroupDirective): void {
    this.submitted = true;
    this.loading = true

    if (this.formGroup.invalid) {
      return;
    }

    if(!this.isValidCpf(this.user.cpf)) {
      this.toastr.error("Digite um cpf válido", "CPF Inválido");
      return;
    }

    if(this.user.password !== this.passwordConfirmation) {
      this.toastr.error("As senhas não conferem", "Senha inválida");
      return;
    }

    this.user.address = this.address;
    let service = this.isReadonly ? this.userService.update(this.user) : this.userService.save(this.user);

    service.subscribe((user: User) => {
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

  isValidCpf(cpf: String): boolean {
    if (cpf == null) {
      return false;
    }
    if (cpf.length != 11) {
      return false;
    }
    if ((cpf == '00000000000') || (cpf == '11111111111') || (cpf == '22222222222') || (cpf == '33333333333') || (cpf == '44444444444') || (cpf == '55555555555') || (cpf == '66666666666') || (cpf == '77777777777') || (cpf == '88888888888') || (cpf == '99999999999')) {
      return false;
    }
    let numero: number = 0;
    let caracter: string = '';
    let numeros: string = '0123456789';
    let j: number = 10;
    let somatorio: number = 0;
    let resto: number = 0;
    let digito1: number = 0;
    let digito2: number = 0;
    let cpfAux: string = '';
    cpfAux = cpf.substring(0, 9);
    for (let i: number = 0; i < 9; i++) {
      caracter = cpfAux.charAt(i);
      if (numeros.search(caracter) == -1) {
        return false;
      }
      numero = Number(caracter);
      somatorio = somatorio + (numero * j);
      j--;
    }
    resto = somatorio % 11;
    digito1 = 11 - resto;
    if (digito1 > 9) {
      digito1 = 0;
    }
    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;
    for (let i: number = 0; i < 10; i++) {
      caracter = cpfAux.charAt(i);
      numero = Number(caracter);
      somatorio = somatorio + (numero * j);
      j--;
    }
    resto = somatorio % 11;
    digito2 = 11 - resto;
    if (digito2 > 9) {
      digito2 = 0;
    }
    cpfAux = cpfAux + digito2;
    if (cpf != cpfAux) {
      return false;
    }
    else {
      return true;
    }
  }

}
