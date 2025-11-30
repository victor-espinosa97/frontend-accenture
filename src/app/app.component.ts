import { Component } from '@angular/core';
import { RemoteConfigService } from 'src/app/infraestructure/services/remote-config.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private remote: RemoteConfigService) {
    this.init();
  }

  async init() {
    await this.remote.load();
  }
}
