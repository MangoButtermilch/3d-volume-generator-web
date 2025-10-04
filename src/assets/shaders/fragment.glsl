varying vec2 vUv; 

uniform float numCells;
uniform float tilingPerCell;
uniform vec3 positionOffset;

uniform bool doGrow;
uniform float borderStrength;
uniform float centerStrength;
uniform float centerRadius;

uniform bool hideFirstCell;
uniform bool hideLastCell;

void main() {
    vec2 uv = vUv;

    vec3 outputPosition;
    float outputMask;

    //Values need to increase from left to right and top to bottom since each tile will later be stacked in the 3D texture.
    //Therefore y component needs to be remapped.
    vec2 uvRemapped = vec2(uv.x, 1. - uv.y);
    uv = uvRemapped;


    vec2 cells = fract(uv * numCells);
    vec2 coords = uv * numCells;

    float frameIndex1D = coords.y * numCells + coords.x;
    float zFrameIndex = (frameIndex1D / (numCells * numCells) * tilingPerCell);

    vec2 uvPerCell = cells * tilingPerCell;
    vec3 noisePosition = vec3(uvPerCell.x, uvPerCell.y, zFrameIndex) + positionOffset;

    outputPosition = noisePosition;

    bool isFirstCell = coords.x <= 1. && coords.y <= 1.;
    bool isLastCell = coords.x >= numCells - 1. && coords.y >= numCells - 1.;

    //To create a padding for stacked noice slices since engines like Unity create weird artifacts on these. 
    if (hideFirstCell && isFirstCell)  {
        outputMask = 0.;
        return;
    }
    if (hideLastCell && isLastCell)  {
        outputMask = 0.;
        return;
    }

     //Another padding inside each cell. Also to avoid weird behaviour from Unity.
    float borderLeftTop = cells.x * cells.y;
    float borderRightBot = (1. - cells.x) * (1. - cells.y);
    float border = borderLeftTop * borderRightBot;
    float borderMask = smoothstep(border, 0.,  borderStrength * 0.01);

    float growFactorMult = 2.37;
    float growFactor = sin((zFrameIndex  - .5)) * centerRadius * 2.;
    growFactor = 1. - abs(growFactor); 
    growFactor *= growFactorMult;

    if (!doGrow) growFactor = 0.;

    vec2 cellCenter = (cells - .5) * 2.;
    float centerMask = (1. - length(cellCenter) * centerRadius * 2.  + growFactor) / (1. - centerStrength * 2.);

    float completeMask = clamp(borderMask * centerMask, 0., 1.);
    outputMask = completeMask;

    gl_FragColor = vec4(outputMask, 0, 0, 1.0);
}