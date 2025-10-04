export function getMaxTextureSize(): number {
    const canvas = document.createElement('canvas');
    const gl =
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl');

    if (!gl) {
        console.error("WebGL not supported");
        return 0;
    }

    const maxTextureSize = (gl as any).getParameter((gl as any).MAX_TEXTURE_SIZE);
    return maxTextureSize;
}