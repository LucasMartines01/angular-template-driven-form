import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { ViacepService } from '../service/viacep.service';

@Directive({
  selector: '[appValidaCep]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: ValidaCepDirective,
    multi: true,
  }],
})
export class ValidaCepDirective implements AsyncValidator {

  constructor(private consultaCepService: ViacepService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const cep = control.value;

    return this.consultaCepService.getAdress(cep).pipe(map((dados: any) => {
      if (dados.erro) {
        return { cepInvalido: true };
      }
      return null;
    }));
  }

}
