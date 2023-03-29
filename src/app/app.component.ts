import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '5_local_storage';
  form: any;
  index = -1;
  id: any;
  formArray: any = [];

  ngOnInit(): void {
    this.formArray = JSON.parse(localStorage.getItem('array') || '[]')
    this.load();
  }

  load() {

    this.form = new FormGroup({
      date: new FormControl("", Validators.required),
      time: new FormControl("", Validators.required),
      text: new FormControl("", Validators.required)
    })
  }

  save(data: any) {
    if (this.index == -1) {
      // console.log(data);
      this.formArray.push(data);
      console.log(this.formArray);
    }
    else {
      // console.log(this.formArray[this.index]);
      this.formArray[this.index] = data;
    }
    this.index = -1;

    localStorage.setItem('array', JSON.stringify(this.formArray))
    this.load();

  }

  edit(i: any) {
    this.index = i;
    this.form = new FormGroup({
      date: new FormControl(this.formArray[i].date, Validators.required),
      time: new FormControl(this.formArray[i].time, Validators.required),
      text: new FormControl(this.formArray[i].text, Validators.required)
    })
  }

  remove(id: number) {
    // alert(id)
    // this.formArray.splice(id,1);
    if (confirm('Sure to delete ?')) {
      this.formArray = this.formArray.filter((value: any, index: number) => {
        if (index != id) {
          // console.log(value);
          return value;
        }
      })
    }


  }
}
