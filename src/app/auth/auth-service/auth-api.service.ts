import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
// import { environment } from "src/environments/environment";

@Injectable({
    providedIn:'root'
})

export class AuthApiService{
    constructor(private httpClient: HttpClient){}
    base_url: string = environment.base_url;
    signIn(body: any) {
        var url = this.base_url + 'login';
        return this.httpClient.post<any>(url, body);
    }
    signUp(body: any) {
        var url = this.base_url + 'alumni/registration';
        return this.httpClient.post<any>(url, body);
    }
}