import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as THREE from 'three';
import { defaultConfig, IVector2, NoiseLayer, NoiseType, ShaderConfig } from '../interfaces/shader-configs.interfaces';
import { ShaderLoaderService } from './shader-loader.service';
import { NoiseSettingsComponent } from '../../features/settings/components/noise-settings/noise-settings.component';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  private canvas: HTMLCanvasElement = null;

  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private animationFrameId: number;

  private material: THREE.ShaderMaterial;
  private resolution: IVector2;

  private config$ = new BehaviorSubject<ShaderConfig>(defaultConfig);
  private config: ShaderConfig = defaultConfig;

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


    const noiseLibFiles = await this.shaderLoader.loadShaders(
      {
        noiseUtils: "/assets/shaders/noiselib/0-noise-utils.glsl",
        perlinNoise3d: "/assets/shaders/noiselib/1-perlin-noise.glsl",
        simplexNoise3d: "/assets/shaders/noiselib/2-simplex-noise.glsl",
        voronoi3d: "/assets/shaders/noiselib/3-voronoi-noise.glsl",
        nebula3d: "/assets/shaders/noiselib/4-nebula-noise.glsl",
      }
    );

    const shaderSetupFiles = await this.shaderLoader.loadShaders(
      {
        uniforms: "/assets/shaders/1-uniforms.glsl",
        uvUtils: "/assets/shaders/2-uv-utils.glsl",
        noiseUtils: "/assets/shaders/3-noise-utils.glsl"
      }
    );


    const shaderSetupFragment =
      noiseLibFiles['noiseUtils']
        .concat(noiseLibFiles['perlinNoise3d'])
        .concat(noiseLibFiles['simplexNoise3d'])
        .concat(noiseLibFiles['voronoi3d'])
        .concat(noiseLibFiles['nebula3d'])
        .concat(shaderSetupFiles['uniforms'])
        .concat(shaderSetupFiles['uvUtils'])
        .concat(shaderSetupFiles['noiseUtils'])

    const [fragment, vertex] = await this.shaderLoader.loadShadersDefault(
      "/assets/shaders/3-fragment.glsl",
      "/assets/shaders/4-vertex.glsl",
    );
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: shaderSetupFragment + fragment,
    });
    this.setupShaderUvUniforms(this.config);
    const quad = new THREE.Mesh(geometry, this.material);
    this.scene.add(quad);

    this.animate();
  }

  public updateShaderUniform(uniformName: string, value: any): void {
    this.config[uniformName] = value;
    if (this.material.uniforms[uniformName]) {
      this.material.uniforms[uniformName].value = value;
    } else {
      console.warn("Unknown uniform: " + uniformName);
    }
  }

  private setupShaderUvUniforms(config: ShaderConfig): void {
    this.material.uniforms = {
      time: { value: 0.0 },
      resolution: { value: new THREE.Vector2(this.resolution.x, this.resolution.y) },
      totalBrightness: { value: config.totalBrightness },
      depth: { value: config.depth },
      numCells: { value: config.numCells },
      tilingPerCell: { value: config.tilingPerCell },
      positionOffset: {
        value: new THREE.Vector3(
          config.positionOffset.x,
          config.positionOffset.y,
          config.positionOffset.z
        )
      },
      growAndShrinkCells: { value: config.growAndShrinkCells },
      borderStrength: { value: config.borderStrength },
      centerStrength: { value: config.centerStrength },
      centerRadius: { value: config.centerRadius },
      hideFirstCell: { value: config.hideFirstCell },
      hideLastCell: { value: config.hideLastCell },
      cellTwirlStrength: { value: config.cellTwirlStrength },
      cellSpherizeStrength: { value: config.cellSpherizeStrength },
      cellRadialShearStrength: { value: config.cellRadialShearStrength },
      noiseLayerDistortion: {
        value: new THREE.Vector4(
          config.noiseLayerDistortion.x,
          config.noiseLayerDistortion.y,
          config.noiseLayerDistortion.z,
          config.noiseLayerDistortion.w,
        )
      },
      noiseLayerEnabled: {
        value: new THREE.Vector4(
          config.noiseLayerDistortion.x,
          config.noiseLayerDistortion.y,
          config.noiseLayerDistortion.z,
          config.noiseLayerDistortion.w,
        )
      },
      noiseLayerInverted: {
        value: new THREE.Vector4(
          config.noiseLayerDistortion.x,
          config.noiseLayerDistortion.y,
          config.noiseLayerDistortion.z,
          config.noiseLayerDistortion.w,
        )
      }
    };

    for (let i = 0; i < config.noiseLayers.length; i++) {
      const uniformName = `noiseLayer${i + 1}`;
      const noiseLayer = config.noiseLayers[i];
      const type = this.noiseTypeToId(noiseLayer.noiseType);

      const vector = new THREE.Vector4(
        noiseLayer.scale,
        noiseLayer.power,
        noiseLayer.angleOffset ?? 0,
        type
      );

      if (!this.material.uniforms[uniformName]) {
        this.material.uniforms[uniformName] = { value: vector };
      } else {
        this.material.uniforms[uniformName].value = vector;
      }

      const distortion = noiseLayer.distortion;
      const vectorComponent = this.mapIndexToVec4Component(i);
      config.noiseLayerDistortion[vectorComponent] = distortion;
      config.noiseLayerEnabled[vectorComponent] = noiseLayer.enabled;
      config.noiseLayerInverted[vectorComponent] = noiseLayer.inverted;

      this.material.uniforms['noiseLayerDistortion'].value = new THREE.Vector4(
        config.noiseLayerDistortion.x,
        config.noiseLayerDistortion.y,
        config.noiseLayerDistortion.z,
        config.noiseLayerDistortion.w,
      );
      this.material.uniforms['noiseLayerEnabled'].value = new THREE.Vector4(
        config.noiseLayerEnabled.x,
        config.noiseLayerEnabled.y,
        config.noiseLayerEnabled.z,
        config.noiseLayerEnabled.w,
      );
      this.material.uniforms['noiseLayerInverted'].value = new THREE.Vector4(
        config.noiseLayerInverted.x,
        config.noiseLayerInverted.y,
        config.noiseLayerInverted.z,
        config.noiseLayerInverted.w,
      );
    }


    this.material.needsUpdate = true;
  }

  public onNoiseLayerChange(noiseLayer: NoiseLayer): void {
    const uniformName = noiseLayer.uniformName;
    const type = this.noiseTypeToId(noiseLayer.noiseType);

    const vector = new THREE.Vector4(
      noiseLayer.scale,
      noiseLayer.power,
      noiseLayer.angleOffset ?? 0,
      type
    );

    const layerIndex = uniformName.match(/\d+/)[0];
    const index = parseInt(layerIndex) - 1;
    const distortion = noiseLayer.distortion;
    const vectorComponent = this.mapIndexToVec4Component(index);
    this.config.noiseLayerDistortion[vectorComponent] = distortion;
    this.config.noiseLayerEnabled[vectorComponent] = noiseLayer.enabled;
    this.config.noiseLayerInverted[vectorComponent] = noiseLayer.inverted;


    this.material.uniforms['noiseLayerDistortion'].value = new THREE.Vector4(
      this.config.noiseLayerDistortion.x,
      this.config.noiseLayerDistortion.y,
      this.config.noiseLayerDistortion.z,
      this.config.noiseLayerDistortion.w,
    );
    this.material.uniforms['noiseLayerEnabled'].value = new THREE.Vector4(
      this.config.noiseLayerEnabled.x,
      this.config.noiseLayerEnabled.y,
      this.config.noiseLayerEnabled.z,
      this.config.noiseLayerEnabled.w,
    );
    this.material.uniforms['noiseLayerInverted'].value = new THREE.Vector4(
      this.config.noiseLayerInverted.x,
      this.config.noiseLayerInverted.y,
      this.config.noiseLayerInverted.z,
      this.config.noiseLayerInverted.w,
    );

    if (!this.material.uniforms[uniformName]) {
      this.material.uniforms[uniformName] = { value: vector };
    } else {
      this.material.uniforms[uniformName].value = vector;
    }
  }

  private mapIndexToVec4Component(index: number): string {
    switch (index) {
      case 0: return "x";
      case 1: return "y";
      case 2: return "z";
      case 3: return "w";
    }
    throw new Error("Invalid index");
  }

  private noiseTypeToId(noiseType: NoiseType) {
    switch (noiseType) {
      case NoiseType.PERLIN: return 0;
      case NoiseType.SIMPLEX: return 1;
      case NoiseType.VORONOI: return 2;
      case NoiseType.NEBULA: return 3;
      default: throw Error("Invalid noise type " + noiseType);
    }
  }

  private animate = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  };

  public cleanup(): void {
    cancelAnimationFrame(this.animationFrameId);
    if (this.renderer) this.renderer.dispose();
  }

  public getShaderConfig(): Observable<ShaderConfig> {
    return this.config$.asObservable();
  }
}
