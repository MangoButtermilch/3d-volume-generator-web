export interface IVector2 { x: number, y: number };

export interface IVector3 { x: number, y: number, z: number };

export interface ShaderUvConfig {
    numCells: number
    tilingPerCell: number
    positionOffset: IVector3
    growAndShrinkCells: boolean,
    borderStrength: number,
    centerStrength: number,
    centerRadius: number,
    hideFirstCell: boolean,
    hideLastCell: boolean
}

export const defaultUvConfig: ShaderUvConfig = {
    numCells: 8,
    tilingPerCell: 1.,
    positionOffset: { x: 0, y: 0, z: 0 },
    growAndShrinkCells: false,
    borderStrength: .5,
    centerStrength: .2,
    centerRadius: .3,
    hideFirstCell: false,
    hideLastCell: false
}