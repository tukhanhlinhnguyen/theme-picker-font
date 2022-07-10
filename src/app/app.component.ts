import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Theme } from './model/theme.model';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'theme-picker-front';
  panelOpenState = true;
  theme : Theme[] = [];
  color : FormGroup;

  constructor(
    private _http: HttpClient, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.panelOpenState = false;
    this.color = this._formBuilder.group({
      black: false,
      white: false,
      brown: false,
      grey: false,
      red: false,
      orange: false,
      green: false,
      blue: false,
      pink: false,
      yellow: false,
      purple: false
    });
  }

  goTo(url : string){
    window.open(url, "_blank");
  }

  filter(){
    let colorList = []
    for (var c in this.color.value) {
      if(this.color.value[c]) colorList.push(c)
    }
    console.log('colorList:', colorList)
    this._http.post(environment.apiUrl+'/color', { color: colorList })
    .subscribe(
      {
        next: (v) => {
          this.theme = JSON.parse(JSON.stringify(v))
          this.panelOpenState = false;
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
      }
    )
  }

  showAll(){
    this._http.get(environment.apiUrl+'/color')
    .subscribe(
      {
        next: (v) => {
          this.theme = JSON.parse(JSON.stringify(v))
          this.panelOpenState = false;
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
      }
    )
  }

  scrollToTop(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
