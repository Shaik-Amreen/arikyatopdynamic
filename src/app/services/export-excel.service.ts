import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {
  exportExcel(reportData: { title: string; data: any; headers: string[]; backAlpha: string; }) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
