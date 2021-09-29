import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserSettings } from './user-settings';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  postUserSettingsForm(userSettings: UserSettings): Observable<any> {
    return this.http.post(
      'https://www.putsreq.com/twepp00RPWfmY5scH7mC',
      userSettings
    );
  }

  getSubscriptionTypes(): Observable<any> {
    return this.http.get('https://www.putsreq.com/TMiUvm7eiMhYPir4xfO4');
  }
}
