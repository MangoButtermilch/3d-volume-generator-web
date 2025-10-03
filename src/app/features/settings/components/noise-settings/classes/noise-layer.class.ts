import { NoiseType } from "../enum/noise-type.enum"


export class NoiseLayer {
    constructor(
        public id: string,
        public title: string,
        public scale: number,
        public power: number,
        public distortion: number,
        public noiseType: NoiseType,
        public inverted: boolean,
        public enabled: boolean,
        public angleOffset?: number,
    ) { }
}   