
export const sliderDefaultWidth: number = 160;

export class Slider {

    constructor(
        public id: string,
        public uniformName: string,
        public label: string,
        public value: number,
        public minValue: number,
        public maxValue: number,
        public step: number,
        public width: number) {
    }

}

