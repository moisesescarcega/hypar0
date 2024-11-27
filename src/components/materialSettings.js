import * as THREE from 'three'

const MaterialSettings = {
  baseMatSettings: {
    depthWrite: false,
    depthTest: false,
    colorWrite: false,
    stencilWrite: true,
    stencilFunc: THREE.AlwaysStencilFunc,
  },
  mat0: {
    side: THREE.BackSide,
    stencilFail: THREE.IncrementWrapStencilOp,
    stencilZFail: THREE.IncrementWrapStencilOp,
    stencilZPass: THREE.IncrementWrapStencilOp,
  },
  mat1: {
    side: THREE.FrontSide,
    stencilFail: THREE.DecrementWrapStencilOp,
    stencilZFail: THREE.DecrementWrapStencilOp,
    stencilZPass: THREE.DecrementWrapStencilOp,
  },
  mainMaterial: {
    color: 0xff0000,
    metalness: 0.1,
    roughness: 0.75,
    clipShadows: true,
    shadowSide: THREE.DoubleSide,
  },
  planeMaterial: {
    color: 'yellow',
    roughness: 0.75,
    stencilWrite: true,
    stencilRef: 0,
    stencilFunc: THREE.NotEqualStencilFunc,
    stencilFail: THREE.ReplaceStencilOp,
    stencilZFail: THREE.ReplaceStencilOp,
    stencilZPass: THREE.ReplaceStencilOp,
  },
}
export default MaterialSettings
