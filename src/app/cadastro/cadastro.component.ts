import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ViacepService } from '../service/viacep.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(private router: Router, private viacepService: ViacepService) { }

  ngOnInit(): void {
  }

  cadastrar(form: NgForm){
    if(form.valid){
      this.router.navigate(['/sucesso']);
    }else{
      alert('formulário inválido')
    }
    
      console.log(form.controls);
  }

  buscaEndereco(event: any, form: NgForm){
    const cep = event.target.value;
    if(cep.length === 8){
      this.viacepService.getAdress(cep).subscribe((dados: any) => {
        form.form.patchValue({
          endereco: dados.logradouro,
          bairro: dados.bairro,
          complemento: dados.complemento,
          cidade: dados.localidade,
          estado: dados.uf,
      });
    });
  }
}
}