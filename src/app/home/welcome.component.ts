import { Component, OnInit } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import { Http, RequestOptionsArgs } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';



////
@Component({
    templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit  {
    public pageTitle: string = 'Welcome';

    options= {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
    }



    constructor(private http: Http){
    }

    ngOnInit(){
        this.prepareOptions()
        // this.userClicksSearchButton
        // .subscribe(s=>{
        //     console.log(s)
        // })
        // this.userClicksSearchButton
        // .flatMap((searchTerm) => {
        //     return Rx.Observable.fromPromise(
        //     fetch('https://api.github.com/users/ronaldhong')
        //         //('https://api.github.com/users/' + searchTerm)
        //     )
        //     .catch((response) => {
        //         this.renderError(response.statusText);
        //         return Rx.Observable.empty();
        //     });
        // })
        // .subscribe((response:any) => {
        //     let x = response;
        //     console.log(x)
        //     // this.renderUser(

        //     //     response.login,
        //     //     response.html_url,
        //     //     response.avatar_url
        //     // );
        // });
    }
    public searchEvent(event){
         this.http.get('https://api.github.com/users/ronaldhong',new HttpHeaders().set('Content-Type', 'application/json') )
            //('https://api.github.com/users/' + searchTerm)
        .subscribe(response =>{
            let x = response;
            console.log(x)
        },(error)=>{
            console.log(error);
        })
        // .catch(e => {
        //     this.renderError(response.statusText);
        //     return Rx.Observable.empty();
        // };
    }


    private renderUser(login, href, imgSrc) {
    (document.getElementById("search-result")as HTMLTextAreaElement).style.display = 'block';
    (document.getElementById("error")as HTMLTextAreaElement).style.display = 'none';
    //   (document.getElementById("search-result")as HTMLTextAreaElement).setAttribute("href",href);
    (document.getElementById("search-result__avatar")as HTMLTextAreaElement).setAttribute('src',imgSrc);

    }

    private renderError(message) {
        (document.getElementById("search-result")as HTMLTextAreaElement).style.display = 'none';
    }
    private prepareOptions(){
        this.options.headers.set('Content-Type', 'application/json');
        // options.headers.append('Authorization','Bearer ' + AuthService.currentAuth());

    }

}
