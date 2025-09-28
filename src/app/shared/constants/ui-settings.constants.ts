import { Checkbox } from "../components/checkbox/classes/checkbox.class";
import { Slider } from "../components/slider/classes/slider.class";
import { UiFactoryService } from "../services/ui-factory.service";

const factory = UiFactoryService;

export const mainSliders: Slider[] = [
    factory.instance.buildSlider("Depth (z position offset", "depth"),
    factory.instance.buildSlider("Center radius", "centerRadius"),
    factory.instance.buildSlider("Center power", "centerPower"),
    factory.instance.buildSlider("Border power", "borderPower"),
    factory.instance.buildSlider("Total brightness", "totalBrightness"),
    factory.instance.buildSlider("Amount of cells", "amountOfCells"),
];

export const mainCheckboxes: Checkbox[] = [
    factory.instance.buildCheckbox("Hide first cell", "hideFirstCell"),
    factory.instance.buildCheckbox("Hide last cell", "hideLastCell"),
    factory.instance.buildCheckbox("Grow and shrink cells", "growAndShrinkCells")
];