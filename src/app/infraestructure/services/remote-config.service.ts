import { Injectable } from '@angular/core';
import { initializeApp, getApps } from 'firebase/app';
import { getRemoteConfig, fetchAndActivate, getValue, RemoteConfig } from 'firebase/remote-config';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RemoteConfigService {
  private rc!: RemoteConfig;

  constructor() {
    // Inicializar Firebase primero
    if (!getApps().length) {
      initializeApp(environment.firebaseConfig);
    }

    this.rc = getRemoteConfig();   // AHORA sí podemos obtener RemoteConfig

    this.rc.settings.minimumFetchIntervalMillis = 5000;
  }

  async load() {
    return await fetchAndActivate(this.rc);
  }

  adsEnabled() {
    return getValue(this.rc, 'ads_enabled').asBoolean();
  }

  adsRefreshRate() {
    return getValue(this.rc, 'ads_refresh_rate').asNumber();
  }

  showCategories() {
    return getValue(this.rc, 'show_categories').asBoolean();
  }
}
