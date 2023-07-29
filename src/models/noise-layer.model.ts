interface NoiseLayer {
    scale: number
    power: number
    distortion: number
}

export interface NoiseLayerPerlin extends NoiseLayer {
}
export interface NoiseLayerSimplex extends NoiseLayer {
}
export interface NoiseLayerNebula extends NoiseLayer {
}
export interface NoiseLayerVoronoi extends NoiseLayer {
    invert: boolean
}