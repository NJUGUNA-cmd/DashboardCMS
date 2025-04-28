<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const canvasContainer = ref<HTMLDivElement | null>(null)
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let controls: OrbitControls

// Initialize Three.js scene
const initThree = () => {
  if (!canvasContainer.value) return

  // Create scene
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x1a1b2e)

  // Create camera
  const aspect = canvasContainer.value.clientWidth / canvasContainer.value.clientHeight
  camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
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
  const gridHelper = new THREE.GridHelper(10, 10, 0x444444, 0x444444)
  scene.add(gridHelper)

  // Add a test cube to verify scene is working
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshPhongMaterial({ color: 0x6b4bff })
  const cube = new THREE.Mesh(geometry, material)
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

// Animation loop
const animate = () => {
  requestAnimationFrame(animate)
  if (controls) controls.update()
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
    <div class="canvas-container" ref="canvasContainer"></div>
  </div>
</template>

<style scoped>
.canvas-wrapper {
  width: 100%;
  height: calc(100vh - 80px); /* Subtract header height */
  background: var(--primary-dark);
  display: flex;
  justify-content: center;
  align-items: center;
}

.canvas-container {
  width: 100%;
  height: 100%;
  position: relative;
}

canvas {
  display: block;
}
</style>
