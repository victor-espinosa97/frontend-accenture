import { Injectable } from '@angular/core';
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import {
  getRemoteConfig,
  fetchAndActivate,
  getValue,
  RemoteConfig,
} from 'firebase/remote-config';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface FeatureFlags {
  enableCategories: boolean;
  enableColorSelection: boolean;
  enableDarkMode: boolean;
  enableQuickAdd: boolean;
}

@Injectable({ providedIn: 'root' })
export class FeatureFlagService {
  private rc!: RemoteConfig;
  private app!: FirebaseApp;

  // ====== DEFAULTS ======
  private defaultFlags: FeatureFlags = {
    enableCategories: true,
    enableColorSelection: true,
    enableDarkMode: false,
    enableQuickAdd: true
  };

  // ====== STREAM PRINCIPAL ======
  private _flags$ = new BehaviorSubject<FeatureFlags>(this.defaultFlags);
  public flags$ = this._flags$.asObservable();

  constructor() {
    // inicializar Firebase solo una vez
    if (!getApps().length) {
      this.app = initializeApp(environment.firebaseConfig);
    } else {
      this.app = getApps()[0];
    }

    this.rc = getRemoteConfig(this.app);

    // intervalos RC
    this.rc.settings = {
      minimumFetchIntervalMillis: environment.production ? 3600_000 : 5_000,
      fetchTimeoutMillis: 60_000,
    };

    // cargar RC
    void this.refresh();
  }

  /**
   * Carga y aplica flags remotos.
   */
  async refresh(): Promise<void> {
    try {
      await fetchAndActivate(this.rc);

      const fetched: FeatureFlags = {
        enableCategories: this.getBoolean('enableCategories', this.defaultFlags.enableCategories),
        enableColorSelection: this.getBoolean('enableColorSelection', this.defaultFlags.enableColorSelection),
        enableDarkMode: this.getBoolean('enableDarkMode', this.defaultFlags.enableDarkMode),
        enableQuickAdd: this.getBoolean('enableQuickAdd', this.defaultFlags.enableQuickAdd),
      };

      this._flags$.next(fetched);

    } catch (e) {
      console.warn('Remote Config fetch failed', e);
      // se mantienen los defaults
    }
  }

  /**
   * Devuelve un flag individual como observable (para plantillas)
   */
  flag$(name: keyof FeatureFlags): Observable<boolean> {
    return this.flags$.pipe(map(flags => !!flags[name]));
  }

  /**
   * Devuelve el valor actual (síncrono)
   */
  get current(): FeatureFlags {
    return this._flags$.value;
  }

  // utilidades
  private getBoolean(key: string, fallback: boolean): boolean {
    try {
      return getValue(this.rc, key).asString() === 'true';
    } catch {
      return fallback;
    }
  }
}
