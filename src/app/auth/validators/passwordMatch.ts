import { AbstractControl } from "@angular/forms";

export function passwordMatch(password: string, cPassword: string){

    return function(form: AbstractControl){
        const passwordValue = form.get(password)?.value
        const confirmPasswordValue = form.get(cPassword)?.value

        if(passwordValue === confirmPasswordValue){
            return null;
        }
        return{ passwordMismatchError: true}
    }
}