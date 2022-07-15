import { Injectable } from '@angular/core';
import { INgxLoadingConfig } from 'ngx-loading';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public loader$ = new BehaviorSubject(false);
  private loaderConfigDefaults: INgxLoadingConfig = {
    backdropBorderRadius: '3px',
    primaryColour: '#EF3829',
    secondaryColour: '#EF3829',
    tertiaryColour: '#EF3829',
  }

  public get loaderIstance() {
    return this.loader$.asObservable();
  }

  public get loaderConfig() {
    return this.loaderConfigDefaults;
  }

  show(): void {
    this.loader$.next(true);
  }

  hide(): void {
    this.loader$.next(false);
  }
}
