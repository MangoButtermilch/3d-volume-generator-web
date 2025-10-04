import { IconDefinition } from "@fortawesome/angular-fontawesome";
import { IconPosition } from "../enum/button.enum";


export class Button {
    constructor(
        public id: string,
        public label: string,
        public cssClass?: string,
        public icon?: IconDefinition,
        public iconPosition: IconPosition = IconPosition.LEFT,
    ) { }
}