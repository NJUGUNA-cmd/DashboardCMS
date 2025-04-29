<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, reactive } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const canvasContainer = ref<HTMLDivElement | null>(null)
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let controls: OrbitControls
let cube: THREE.Mesh

// Cube control parameters
const cubeControls = reactive({
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  scale: { x: 1, y: 1, z: 1 },
  color: '#6b4bff',
  wireframe: false
})

// Initialize Three.js scene
const initThree = () => {
  if (!canvasContainer.value) return

  // Create scene
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0.5, 0.5, 0.5)

  // Create camera
  const aspect = canvasContainer.value.clientWidth / canvasContainer.value.clientHeight
  camera = new THREE.PerspectiveCamera(110, aspect, 0.1, 1000)
  camera.position.set(0, 2, 5) // Adjusted camera position

  // Create renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  })
  renderer.setSize(canvasContainer.value.clientWidth, canvasContainer.value.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  canvasContainer.value.appendChild(renderer.domElement)

  // Add OrbitControls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05

  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(5, 5, 5)
  scene.add(directionalLight)

  // Add grid helper
  const gridHelper = new THREE.GridHelper(10, 10, 0.8, 0.8)
  scene.add(gridHelper)

  // Add a cube
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshPhongMaterial({
    color: cubeControls.color,
    wireframe: cubeControls.wireframe
  })
  cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  // Handle window resize
  const handleResize = () => {
    if (!canvasContainer.value) return
    const width = canvasContainer.value.clientWidth
    const height = canvasContainer.value.clientHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }
  window.addEventListener('resize', handleResize)
}

// Update cube properties based on controls
const updateCube = () => {
  if (!cube) return

  // Update position
  cube.position.set(
    cubeControls.position.x,
    cubeControls.position.y,
    cubeControls.position.z
  )

  // Update rotation (convert degrees to radians)
  cube.rotation.set(
    THREE.MathUtils.degToRad(cubeControls.rotation.x),
    THREE.MathUtils.degToRad(cubeControls.rotation.y),
    THREE.MathUtils.degToRad(cubeControls.rotation.z)
  )

  // Update scale
  cube.scale.set(
    cubeControls.scale.x,
    cubeControls.scale.y,
    cubeControls.scale.z
  )

  // Update material
  if (cube.material instanceof THREE.MeshPhongMaterial) {
    cube.material.color.set(cubeControls.color)
    cube.material.wireframe = cubeControls.wireframe
    cube.material.needsUpdate = true
  }
}

// Animation loop
const animate = () => {
  requestAnimationFrame(animate)
  if (controls) controls.update()
  updateCube()
  if (renderer && scene && camera) {
    renderer.render(scene, camera)
  }
}

onMounted(() => {
  initThree()
  animate()
})

onBeforeUnmount(() => {
  if (renderer) {
    renderer.dispose()
    canvasContainer.value?.removeChild(renderer.domElement)
  }
  window.removeEventListener('resize', () => {})
})
</script>

<template>
  <div class="canvas-wrapper">
    <div class="controls-panel">
      <h3>Cube Controls</h3>

      <div class="control-group">
        <h4>Position</h4>
        <div class="control-row">
          <label>X: <input type="range" min="-5" max="5" step="0.1" v-model.number="cubeControls.position.x" /></label>
          <span>{{ cubeControls.position.x.toFixed(1) }}</span>
        </div>
        <div class="control-row">
          <label>Y: <input type="range" min="-5" max="5" step="0.1" v-model.number="cubeControls.position.y" /></label>
          <span>{{ cubeControls.position.y.toFixed(1) }}</span>
        </div>
        <div class="control-row">
          <label>Z: <input type="range" min="-5" max="5" step="0.1" v-model.number="cubeControls.position.z" /></label>
          <span>{{ cubeControls.position.z.toFixed(1) }}</span>
        </div>
      </div>

      <div class="control-group">
        <h4>Rotation (degrees)</h4>
        <div class="control-row">
          <label>X: <input type="range" min="0" max="360" step="1" v-model.number="cubeControls.rotation.x" /></label>
          <span>{{ cubeControls.rotation.x }}°</span>
        </div>
        <div class="control-row">
          <label>Y: <input type="range" min="0" max="360" step="1" v-model.number="cubeControls.rotation.y" /></label>
          <span>{{ cubeControls.rotation.y }}°</span>
        </div>
        <div class="control-row">
          <label>Z: <input type="range" min="0" max="360" step="1" v-model.number="cubeControls.rotation.z" /></label>
          <span>{{ cubeControls.rotation.z }}°</span>
        </div>
      </div>

      <div class="control-group">
        <h4>Scale</h4>
        <div class="control-row">
          <label>X: <input type="range" min="0.1" max="3" step="0.1" v-model.number="cubeControls.scale.x" /></label>
          <span>{{ cubeControls.scale.x.toFixed(1) }}</span>
        </div>
        <div class="control-row">
          <label>Y: <input type="range" min="0.1" max="3" step="0.1" v-model.number="cubeControls.scale.y" /></label>
          <span>{{ cubeControls.scale.y.toFixed(1) }}</span>
        </div>
        <div class="control-row">
          <label>Z: <input type="range" min="0.1" max="3" step="0.1" v-model.number="cubeControls.scale.z" /></label>
          <span>{{ cubeControls.scale.z.toFixed(1) }}</span>
        </div>
      </div>

      <div class="control-group">
        <h4>Appearance</h4>
        <div class="control-row">
          <label>Color: <input type="color" v-model="cubeControls.color" /></label>
        </div>
        <div class="control-row">
          <label><input type="checkbox" v-model="cubeControls.wireframe" /> Wireframe</label>
        </div>
      </div>
    </div>

    <div class="canvas-container" ref="canvasContainer"></div>
  </div>
</template>

<style scoped>
.canvas-wrapper {
  width: 100%;
  height: calc(100vh - 80px); /* Subtract header height */
  background: var(--primary-dark);
  display: flex;
  position: relative;
}

.controls-panel {
  width: 250px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 15px;
  overflow-y: auto;
  height: 100%;
  z-index: 10;
}

.control-group {
  margin-bottom: 20px;
}

.control-group h4 {
  margin: 5px 0;
  font-size: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 5px;
}

.control-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;
}

.control-row input[type="range"] {
  width: 150px;
}

.control-row span {
  min-width: 40px;
  text-align: right;
}

.canvas-container {
  flex: 1;
  height: 100%;
  position: relative;
}

canvas {
  display: block;
}
</style>
