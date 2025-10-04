import { Component } from '@angular/core';
import { environment } from '../environments/environment.development';
import { SettingsViewComponent } from "./features/settings/views/settings-view/settings-view.component";

@Component({
  selector: 'app-root',
  imports: [SettingsViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  public version = environment.version;

}
