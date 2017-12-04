import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  answers = [
    {
      type: 'Yes',
      text: 'yes'
    },
    {
      type: 'No',
      text: 'no'
    }
    ];

  symbolCount = 8;
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      user: new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email], this.checkForEmail),
        pass: new FormControl('', [Validators.required, this.checkForPasswordLength.bind(this)])
      }),

      country: new FormControl('ru'),
      answer: new FormControl('no')
    });
  }

  onSubmit() {
    console.log(this.form);
  }
  checkForPasswordLength(control: FormControl) {
    if (control.value.length <= this.symbolCount) {
      return {
        'lengthError': true
      };
    }
    return null;
  }

  checkForEmail(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
       setTimeout(() => {
         if (control.value === 'test@mail.ru') {
          resolve(
            {
              'emailIsUsed': true
            });
         } else {
          resolve(null);
          }
          }, 3000);
  });
  }

}
