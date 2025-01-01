import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStateService {

  private formData: any = null; // This will hold the data

  constructor() {}

  // Set data in service
  setFormData(data: any): void {
    this.formData = data;
  }

  // Get data from service
  getFormData(): any {
    return this.formData;
  }
}
