import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File;
  preview: string;

  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.photoForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true] // com o input marcado. checkbox
    });
  }

  upload() {
    // por conta do arquivo file, vamos fazer da forma verbosa tradicional ao invés de usar o getRawValue()
    // const dados = this.photoForm.getRawValue(); // pega os dados do form
    // console.log(dados);
    const description = this.photoForm.get('description').value;
    const allowComments = this.photoForm.get('allowComments').value;
    // file, está recebendo o valor pelo evento change, lá no input do template mesmo
    this.photoService
      .upload(description, allowComments, this.file)
      .subscribe(
        (res) => this.router.navigate(['']),
        (err) => {
          console.log('ERRO: ', err);
        }
      );

  }

  handleFile(file: File) {
    this.file = file;
    // Vamos ter que converter pra base64, para podermos realizar o preview da imagem p/ o usuário visualizar
    // Isso é coisa de javascript puro, nada de Angular
    const reader = new FileReader();
    // Como estamos lidando com uma operação assíncrona, o resultado dela coletaremos com callback. Logo, escreveremos reader.onload = event => this.preview = event.target.result, afinal o target.result na documentação do FileReader() está especificado que é nele que encontremos o resultado de readAsDataURL()
    /** ONLOAD um manipulador para o evento load. Este evento é chamado cada vez que a operação de leitura é completada com sucesso. */
    reader.onload = (event: any) => this.preview = event.target.result; // quando terminar de fazer o trabalho
    // Encontraremos um erro de compilação em result, isso se dá porque o tipescript o considera um event, que por padrão não possui a propriedade result. Para solucionarmos essa questão declararemos que (event:any).
    reader.readAsDataURL(file); // convertendo pra base64
  }

}
