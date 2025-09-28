
export type DropdownOption = {
    value: string | number
    label: string
}

export interface IDropdown {
    id: string
    label: string
    value: string | number
    options: DropdownOption[]
}