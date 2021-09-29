import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { UserSettings } from '../data/user-settings';
import { DataService } from '../data/data.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css'],
})
export class UserSettingsFormComponent implements OnInit {
  originalUserSettings: UserSettings = {
    name: null,
    emailOffers: null,
    interfaceStyle: null,
    subscriptionType: null,
    notes: null,
  };

  userSettings: UserSettings = { ...this.originalUserSettings };
  postError = false;
  postErrorMessage = '';
  subscriptionTypes: Observable<string[]>;

  constructor(private dataService: DataService) {
    this.subscriptionTypes = of([]);
  }

  ngOnInit(): void {
    this.subscriptionTypes = this.dataService.getSubscriptionTypes();
  }

  onSubmit(form: NgForm): void {
    console.log('in onSubmit: ', form.valid);

    if (form.valid) {
      this.dataService.postUserSettingsForm(this.userSettings).subscribe(
        (result) => console.log('success: ', result),
        (error) => this.onHttpError(error)
      );
    } else {
      this.postError = true;
      this.postErrorMessage = 'Please fix the above errors';
    }
  }

  onBlur(field: NgModel): void {
    console.log('in onBlur: ', field.valid);
  }

  onHttpError(errorResponse: any): void {
    console.error('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }
}
