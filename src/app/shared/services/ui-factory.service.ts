import { Injectable } from '@angular/core';
import { Checkbox } from '../components/checkbox/classes/checkbox.class';
import { Slider, sliderDefaultWidth } from '../components/slider/classes/slider.class';
import { Dropdown, DropdownOption } from '../components/dropdown/classes/dropdown.class';
import { GuidService } from '../../core/services/guid.service';

@Injectable({
  providedIn: 'root'
})
export class UiFactoryService {

  private static _instance: UiFactoryService = null;

  constructor() {
    if (UiFactoryService._instance === null) {
      UiFactoryService._instance = this;
    }
  }

  public static get instance(): UiFactoryService {
    if (UiFactoryService._instance === null) {
      UiFactoryService._instance = new UiFactoryService();
    }
    return UiFactoryService._instance;
  }

  public buildCheckbox(
    label: string,
    uniformName: string,
    checked: boolean = false): Checkbox {
    return new Checkbox(
      GuidService.new,
      uniformName,
      label,
      checked
    );
  }

  public buildSlider(
    label: string,
    uniformName: string,
    value: number = 0,
    minValue: number = 0,
    maxValue: number = 1,
    step: number = 0.1,
    width: number = sliderDefaultWidth
  ): Slider {
    return new Slider(
      GuidService.new,
      uniformName,
      label,
      value,
      minValue,
      maxValue,
      step,
      width
    )
  }

  public buildDropdown(
    label: string,
    uniformName: string,
    value: string | number,
    options: DropdownOption[]
  ): Dropdown {
    return new Dropdown(
      GuidService.new,
      uniformName,
      label,
      value,
      options
    );
  }
}
