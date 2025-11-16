import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, take } from 'rxjs';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { IVector2 } from '../interfaces/shader-configs.interfaces';
import { ShaderLoaderService } from './shader-loader.service';

@Injectable({
  providedIn: 'root'
})
export class VolumePreviewService {
  private maxFPS = 30;
  private lastFrameTime = 0;

  private canvas: HTMLCanvasElement = null;
  private orbitControls: OrbitControls = null;

  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;

  private material: THREE.ShaderMaterial;
  private resolution: IVector2;

  private canvasLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private doRender: boolean = false;

  private onInit$: Subject<HTMLCanvasElement> = new Subject<HTMLCanvasElement>();
  private initialized: boolean = false;

  constructor(private shaderLoader: ShaderLoaderService) {
    this.handleOnInit();
  }

  public startInit(element: HTMLCanvasElement): void {
    if (this.initialized) return;
    this.onInit$.next(element);
  }

  public handleOnInit(): void {
    this.onInit$
      .pipe(take(1))
      .subscribe((element) => {
        window.addEventListener("resize", this.onResize);
        this.setup(element);
      })
  }

  public onDestroy(): void {
    this.renderer.dispose();
  }

  private async setup(element: HTMLCanvasElement): Promise<void> {
    this.setCanvasLoading(true);

    this.canvas = element;
    const bounds = this.canvas.getBoundingClientRect();

    this.resolution = { x: bounds.width, y: bounds.height };

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(50, bounds.width / bounds.height, 0.1, 100);  // aspect=1
    this.camera.position.set(0, 0, 3);
    this.camera.updateProjectionMatrix();

    this.orbitControls = new OrbitControls(this.camera, this.canvas);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: false
    });
    this.renderer.setSize(bounds.width, bounds.height);

    await this.loadShaderAndMaterialConfiguration();
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const quad = new THREE.Mesh(geometry, this.material);

    this.scene.add(quad);

    this.setCanvasLoading(false);
    this.startRenderLoop();
  }

  private async loadShaderAndMaterialConfiguration(): Promise<void> {
    const shaderFiles = await this.shaderLoader.loadShaders(
      {
        fragment: "/assets/shaders/volume-preview/fragment.glsl",
        vertex: "/assets/shaders/volume-preview/vertex.glsl",
      }
    );

    const shaderSetupFragment = shaderFiles['fragment'];

    this.material = new THREE.ShaderMaterial({
      vertexShader: shaderFiles['vertex'],
      fragmentShader: shaderSetupFragment
    });
  }

  private onResize = (): void => {
    const bounds = this.canvas.getBoundingClientRect();
    this.resolution = { x: bounds.width, y: bounds.height };

    this.camera.aspect = bounds.width / bounds.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(bounds.width, bounds.height);
  }

  private renderLoop = (time: number) => {
    const delta = time - this.lastFrameTime;
    const minFrameTime = 1000 / this.maxFPS;

    if (delta >= minFrameTime && this.doRender) {
      this.lastFrameTime = time;
      this.orbitControls.update();
      this.renderer.render(this.scene, this.camera);
    }

    requestAnimationFrame(this.renderLoop);
  };

  private startRenderLoop(): void {
    requestAnimationFrame(this.renderLoop);
  }

  public getCanvasLoading(): Observable<boolean> {
    return this.canvasLoading$.asObservable();
  }

  private setCanvasLoading(loading: boolean): void {
    this.canvasLoading$.next(loading);
  }

  public startRendering(): void {
    this.doRender = true;
  }

  public pauseRendering(): void {
    this.doRender = false;
  }
}
