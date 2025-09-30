
export const inputDefaultWidth: number = 160;

export class CustomInput {
    constructor(
        public id: string,
        public uniformName: string,
        public label: string,
        public value: string | number,
        public minAndMax: { min: number, max: number },
        public maxLength: number,
        public width: number = inputDefaultWidth) {
    }
}