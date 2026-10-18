import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min';

export class SceneDebugger {
  private gui: GUI;
  private stats: Stats;
  private axesHelper: THREE.AxesHelper | null = null;
  private scene: THREE.Scene;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.gui = new GUI();
    this.stats = new Stats();
    this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(this.stats.dom);
  }

  // Add axes helper to the scene
  addAxesHelper(size: number = 5): void {
    if (this.axesHelper) {
      this.scene.remove(this.axesHelper);
    }
    this.axesHelper = new THREE.AxesHelper(size);
    this.scene.add(this.axesHelper);
  }

  // Add transform controls for any object
  addTransformControls(object: THREE.Object3D, name: string = 'Object'): GUI {
    const folder = this.gui.addFolder(name);

    // Position controls
    const positionFolder = folder.addFolder('Position');
    positionFolder.add(object.position, 'x', -10, 10, 0.01).name('X');
    positionFolder.add(object.position, 'y', -10, 10, 0.01).name('Y');
    positionFolder.add(object.position, 'z', -10, 10, 0.01).name('Z');

    // Rotation controls
    const rotationFolder = folder.addFolder('Rotation');
    rotationFolder.add(object.rotation, 'x', 0, Math.PI * 2, 0.01).name('X');
    rotationFolder.add(object.rotation, 'y', 0, Math.PI * 2, 0.01).name('Y');
    rotationFolder.add(object.rotation, 'z', 0, Math.PI * 2, 0.01).name('Z');

    // Scale controls
    const scaleFolder = folder.addFolder('Scale');
    scaleFolder.add(object.scale, 'x', 0.1, 3, 0.01).name('X');
    scaleFolder.add(object.scale, 'y', 0.1, 3, 0.01).name('Y');
    scaleFolder.add(object.scale, 'z', 0.1, 3, 0.01).name('Z');

    return folder;
  }

  // Add material controls
  addMaterialControls(
    material: THREE.Material,
    name: string = 'Material'
  ): GUI {
    const folder = this.gui.addFolder(name);

    if (material instanceof THREE.MeshStandardMaterial) {
      folder.add(material, 'wireframe');
      folder.add(material, 'roughness', 0, 1, 0.01);
      folder.add(material, 'metalness', 0, 1, 0.01);

      // Add color control
      const params = { color: '#' + material.color.getHexString() };
      folder.addColor(params, 'color').onChange((value: string) => {
        material.color.set(value);
      });
    }

    return folder;
  }

  // Add light controls
  addLightControls(light: THREE.Light, name: string = 'Light'): GUI {
    const folder = this.gui.addFolder(name);

    folder.add(light, 'intensity', 0, 2, 0.01);

    if (light instanceof THREE.PointLight || light instanceof THREE.SpotLight) {
      folder.add(light.position, 'x', -10, 10, 0.1);
      folder.add(light.position, 'y', -10, 10, 0.1);
      folder.add(light.position, 'z', -10, 10, 0.1);
    }

    return folder;
  }

  // Begin performance measurement
  beginPerformance(): void {
    this.stats.begin();
  }

  // End performance measurement
  endPerformance(): void {
    this.stats.end();
  }

  // Clean up resources
  dispose(): void {
    if (this.axesHelper) {
      this.scene.remove(this.axesHelper);
    }
    this.gui.destroy();
    document.body.removeChild(this.stats.dom);
  }
}
