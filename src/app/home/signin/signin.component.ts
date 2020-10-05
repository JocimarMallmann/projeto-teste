import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Validators é uma classe no angular
import { Router } from '@angular/router';

import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, AfterViewInit {

  loginForm: FormGroup; // esse formgroup é uma ligação com o formulário
  @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

  // FormBuilder - construtor de formulário
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService
  ) { }

  ngOnInit(): void {
    // escrevemos o código aqui ao invés de escrever no constructor
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required], // vamos associar aos inputs
      password: ['', Validators.required] // o primeiro parâmetro é o valor padrão do campo
    });
    //
    // setTimeout(() => {
    //   this.isPlatformBrowser();
    // }, 1000);
    // this.loginForm.patchValue({
    //   userName: [''],
    //   password: ['']
    // });
  }
  ngAfterViewInit() {
    this.isPlatformBrowser();
  }

  login() {

    // aqui é uma das formas de pegar os valores dos inputs
    const userName = this.loginForm.get('userName').value;
    const password = this.loginForm.get('password').value;
    // let authToken: any = null;

    // E já vai devolver um Observable
    this.authService
      .authenticate(userName, password)
      .subscribe((res) => {
        // posso usar este,
        // this.router.navigateByUrl('user/' + userName);
        // ou este mais elegante, para evitar fazer concatenação
        // authToken = res.headers.get('x-access-token'); // FIZ ISSO NO SERVICE TAMBÉM
        // console.log('Token no componente signin no subscribe: ', authToken);
        this.router.navigate(['user', userName]);
      }, (err) => {

        console.log('ERRO: ', err);
        // E limpar o formulário de uma maneira elegante
        this.loginForm.reset();
        this.isPlatformBrowser();

        alert('invalid user name or password');
      });
  }

  /** IMPORTANTE */
  /**
   * O Angular tem mecanismos que indentifica se minha aplicação está rodando no navegador ou em outra plataforma, podendo ser no server-side e  Angular universal e etc.
   * Então, já que atualmente não podemos usar o Renderer para acessar métodos dos elementos do template como fizemos na diretiva darken-on-hover, vamos usar está verificação, para não dar problema se o codigo rodar no back-end ou em outra plataforma que não seja o navegador.
   * Já que os metodos dos elementos html como input, userNameInput.nativeElement.focus(), só existe no navegador.
   */
  /**
   * VAMOS CRIAR ESSE ARQUIVO DE VERIFICAÇÃO DENTRO DA PASTA core, porque é o núcleo, e talvez usemos em vários lugares no código
   */

  isPlatformBrowser() {
    if (this.platformDetectorService.isPlataformBrowser()) {
      this.userNameInput.nativeElement.focus();
    }
  }

}
