import { Injectable } from "@angular/core";

@Injectable()
export class DataService {
  constructor() {
  }

  public setBearer(token: string) {
    localStorage.setItem('travelGuideUserBearer', token);
  }

  public getBearer(): string {
    const data: any = localStorage.getItem('travelGuideUserBearer');
    let token: string = (data) ? data : '';
    return token;
  }

  public removeBearer(): void {
    localStorage.removeItem('travelGuideUserBearer');
  }
}
