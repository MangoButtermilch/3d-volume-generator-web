
export type DropdownOption = {
    value: string | number
    label: string
}

export class Dropdown {
    constructor(
        public id: string,
        public uniformName: string,
        public label: string,
        public value: string | number | null,
        public options: DropdownOption[]) {

        if (options.length === 0) {
            throw new DOMException("No options provided");
        }

        if (value === null) {
            value = options[0].value;
        }
    }
}