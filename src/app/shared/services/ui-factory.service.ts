import { Injectable } from '@angular/core';
import { Checkbox } from '../components/checkbox/classes/checkbox.class';
import { Slider, sliderDefaultWidth } from '../components/slider/classes/slider.class';
import { Dropdown, DropdownOption } from '../components/dropdown/classes/dropdown.class';
import { GuidService } from '../../core/services/guid.service';
import { CustomInput } from '../components/input/classes/customInput.class';
import { IconDefinition } from '@fortawesome/angular-fontawesome';
import { IconPosition } from '../components/button/enum/button.enum';
import { Button } from '../components/button/classes/button.class';

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

  public buildButton(
    label: string,
    cssClass?: string,
    icon?: IconDefinition,
    iconPosition: IconPosition = IconPosition.LEFT
  ): Button {
    return new Button(
      GuidService.new,
      label,
      cssClass,
      icon,
      iconPosition
    )
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
    step: number = 0.01,
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

  public buildInput(
    label: string,
    uniformName: string,
    value: number | string = "",
    minAndMax: { min: number, max: number } = { min: 0, max: 99999 },
    maxLength: number = 256,
    width: number = sliderDefaultWidth
  ): CustomInput {
    return new CustomInput(
      GuidService.new,
      uniformName,
      label,
      value,
      minAndMax,
      maxLength,
      width
    )
  }
}
