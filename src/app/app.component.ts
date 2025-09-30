import { Component } from '@angular/core';
import { UiFactoryService } from './shared/services/ui-factory.service';
import { Slider } from './shared/components/slider/classes/slider.class';
import { SliderComponent } from './shared/components/slider/slider.component';
import { CheckboxComponent } from "./shared/components/checkbox/checkbox.component";
import { SettingsViewComponent } from "./features/settings/views/settings-view/settings-view.component";

@Component({
  selector: 'app-root',
  imports: [ SettingsViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '3d-volume-generator-web';



}
