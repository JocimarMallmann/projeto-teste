import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';
import { lowerCaseValidator } from 'src/app/shared/components/validators/lower-case.validator';
import { NewUser } from './new-user';
import { SignupService } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [ UserNotTakenValidatorService ]
})
export class SignupComponent implements OnInit, AfterViewInit {

  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userNotTakenValidatorService: UserNotTakenValidatorService,
    private signupService: SignupService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService
  ) { }

  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    // vai retornar uma função, QUE É UM VALIDATOR ASSINCRONO
    // const fn = this.userNotTakenValidatorService.checkUserNameTaken();

    // dentro dos arrays do 2° parâmetro de validadores SÓ ENTRAM OS VALIDADORES SÍNCRONOS, assíncronos não
    // dentro dos arryas do 3° parâmetro de validadores É QUE ENTRAM OS VALIDADORES ASSÍNCRONOS
    this.signupForm = this.formBuilder.group({
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      fullName: ['',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40)
        ]
      ],
      userName: ['',
        [
          Validators.required,
          // Validators.pattern(/^[a-z0-9_\-]+$/), // podemos passar um Regex para o campo
          // ou nosso próprio Validator
          lowerCaseValidator,
          Validators.minLength(2),
          Validators.maxLength(30)
        ],
        // 3° parâmetro, validadores ASSÍNCRONOS
        [
          this.userNotTakenValidatorService.checkUserNameTaken()
        ]
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(14)
        ]
      ]
    });
  }
  ngAfterViewInit() {
    this.isPlatformBrowser();
  }

  signup() {
    // getRawValue(), vai devolver um objeto javascript com os nomes dos campos do formulário com seus respectivos valores.
    const newUser: NewUser = this.signupForm.getRawValue();
    this.signupService.signup(newUser)
        .subscribe(() => {
          this.router.navigate(['']);
        }, (err) => {
          console.log('Erro: ', err);
        });
  }

  isPlatformBrowser() {
    if(this.platformDetectorService.isPlataformBrowser()) {
      this.emailInput.nativeElement.focus();
    }
  }

}
