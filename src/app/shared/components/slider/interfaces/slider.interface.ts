
export const sliderDefaultWidth: number = 160;

export interface ISlider {
    id: string
    label: string
    value: number
    minValue: number
    maxValue: number
    step: number
    width: number
}