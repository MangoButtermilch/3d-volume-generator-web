import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { ShaderLoaderService } from '../../shared/services/shader-loader.service';
import { defaultUvConfig, IVector2, ShaderUvConfig } from '../../shared/interfaces/shader-configs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  private canvas: HTMLCanvasElement = null;

  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private light: THREE.DirectionalLight;
  private animationFrameId: number;

  private material: THREE.ShaderMaterial;
  private resolution: IVector2;

  private uvConfig: ShaderUvConfig = defaultUvConfig;

  constructor(private shaderLoader: ShaderLoaderService) {
    window.addEventListener("resize", this.onResize)
  }

  private onResize = (): void => {
    const bounds = this.canvas.getBoundingClientRect();
    const width = bounds.width;
    const height = bounds.height;
    const res = { x: width, y: height };

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  public async setup(element: HTMLCanvasElement): Promise<void> {
    this.canvas = element;
    const bounds = this.canvas.getBoundingClientRect();
    const width = bounds.width;
    const height = bounds.height;

    this.resolution = { x: width, y: height };

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("#362136");

    this.camera = new THREE.PerspectiveCamera(50, this.resolution.x / this.resolution.y, 0.1, 100);
    this.camera.position.set(0, 0, 5);
    this.camera.updateProjectionMatrix();


    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: false
    });
    this.renderer.setSize(width, height);

    const geometry = new THREE.PlaneGeometry(2, 2);

    const [vertex, fragment] = await this.shaderLoader.loadShaders(
      "/assets/shaders/vertex.glsl",
      "/assets/shaders/fragment.glsl"
    );
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
    });
    this.setupShaderUvUniforms(this.uvConfig);
    const quad = new THREE.Mesh(geometry, this.material);
    this.scene.add(quad);

    this.animate();
  }

  public updateShaderUvUniform(uniformName: string, value: any): void {
    this.uvConfig[uniformName] = value;
    if (this.material.uniforms[uniformName]) {
      this.material.uniforms[uniformName].value = value;
    } else {
      console.warn("Unknown uniform: " + uniformName);
    }
  }

  private setupShaderUvUniforms(uvConfig: ShaderUvConfig): void {
    this.material.uniforms = {
      time: { value: 0.0 },
      resolution: { value: new THREE.Vector2(this.resolution.x, this.resolution.y) },
      numCells: { value: uvConfig.numCells },
      tilingPerCell: { value: uvConfig.tilingPerCell },
      positionOffset: {
        value: new THREE.Vector3(
          uvConfig.positionOffset.x,
          uvConfig.positionOffset.y,
          uvConfig.positionOffset.z
        )
      },
      doGrow: { value: uvConfig.doGrow },
      borderStrength: { value: uvConfig.borderStrength },
      centerStrength: { value: uvConfig.centerStrength },
      centerRadius: { value: uvConfig.centerRadius },
      hideFirstCell: { value: uvConfig.hideFirstCell },
      hideLastCell: { value: uvConfig.hideLastCell }
    };
    this.material.needsUpdate = true;
  }

  private animate = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  };

  public cleanup(): void {
    cancelAnimationFrame(this.animationFrameId);
    if (this.renderer) this.renderer.dispose();
  }
}
