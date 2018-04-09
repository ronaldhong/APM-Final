import { Component } from '@angular/core';
import * as Rx from 'rxjs/Rx';

// const myInterval = Rx.Observable.interval(1000);
// const bufferBy = Rx.Observable.fromEvent(document,'click');
//
// const myBufferedInterval: any = myInterval.buffer(bufferBy);
// const subscribe = myBufferedInterval.subscribe(val=>{
//   console.log('Buffer')
// })


///////
let source = [1,2,3,4,5,6,7];
let observableOne = Rx.Observable.from(source);

observableOne
  .subscribe(
    value=> console.log(value),
    error=>console.log(error)
  );

//////
//BehaviorSubject
//////
// let bs = new Rx.BehaviorSubject(0);
// let observableTwo = bs.asObservable();
//
// observableTwo.subscribe(value=>console.log(value))
// let increment= function(){
//   let value = bs.getValue();
//   bs.next(value+1);
// }
/////
// let search_b = (document.getElementById("search_b") as HTMLTextAreaElement).value
let userClicksSearchButton = Rx.Observable.fromEvent(
        document.getElementById("search_b"),
        'click'
    )
    .map((event) => {
      // (document.getElementById("tsn_list") as HTMLTextAreaElement).value
        return (document.getElementById("tsn_list") as HTMLTextAreaElement).value
    });

userClicksSearchButton
    .flatMap((searchTerm) => {
        return Rx.Observable.fromPromise(
          fetch('https://api.github.com/users/ronaldhong')
            // $.get('https://api.github.com/users/' + searchTerm)
        )
        .catch((response) => {
            renderError(response.statusText);
            return Rx.Observable.empty();
        });
    })
    .subscribe((response) => {
        renderUser(
            response.login,
            response.html_url,
            response.avatar_url
        );
    });

function renderUser(login, href, imgSrc) {
  (document.getElementById("search-result")as HTMLTextAreaElement).style.display = 'block';
  (document.getElementById("error")as HTMLTextAreaElement).style.display = 'none';;
  (document.getElementById("search-result")as HTMLTextAreaElement).setAttribute("href",href);
  (document.getElementById("search-result__avatar")as HTMLTextAreaElement).setAttribute('src',imgSrc);
  (document.getElementById("search-result__login")as HTMLTextAreaElement).textContent(login);
    $("#search-result").show();
    $("#error").hide();
    $("#search-result").attr("href", href);
    $("#search-result__avatar").attr('src', imgSrc);
    $('#search-result__login').text(login);
}

function renderError(message) {
    $("#search-result").hide();




////
@Component({
    templateUrl: './welcome.component.html'
})
export class WelcomeComponent {
    public pageTitle: string = 'Welcome';
}
