declare module 'three/examples/jsm/controls/OrbitControls' {
  import { Camera, Vector3 } from 'three';

  export class OrbitControls {
    constructor(camera: Camera, domElement?: HTMLElement);

    enabled: boolean;
    target: Vector3;
    enableDamping: boolean;
    dampingFactor: number;

    update(): void;
    dispose(): void;
  }
}
