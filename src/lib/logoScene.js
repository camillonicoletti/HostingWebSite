// The brand mark rebuilt as a small 3D object: a gradient disc, a white house
// outline and an arrow that enters at the top and leaves through the wall.
// Scroll progress (0 → 1) flies the pieces in one after another.
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

// Logo space: 100 units across, y up, the disc lying in the xy plane.
const R = 50, DEEP = 6, LIFT = 5
const smooth = (v, a, b) => { const t = Math.max(0, Math.min(1, (v - a) / (b - a))); return t * t * (3 - 2 * t) }
const back = t => { const s = 1.4; return 1 + (s + 1) * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2) }

// Colourways drawn from the site's own palette. `disc` is a diagonal gradient
// (top-left → bottom-right); `house` paints the outline; `core` is the arrow's
// filling — 'disc' reuses the gradient, a colour paints it flat; `sides`, when
// given, darkens the arrow's flanks so its relief reads on a matching top.
export const PALETTES = {
  terracotta: { disc: ['#EAA184', '#DB8A6E', '#C9755B'], house: '#F4F0E6', core: '#F4F0E6', sides: '#94503E' },
  corallo: { disc: ['#f7b79c', '#ee785a', '#c85a41', '#a93924'], house: '#f8f6ef', core: 'disc' },
  salvia: { disc: ['#e3ebdc', '#a9bc9e', '#6f8766', '#465940'], house: '#f8f6ef', core: 'disc' },
  doppio: { disc: ['#f4b39a', '#ee785a', '#8a9e7c', '#465940'], house: '#f8f6ef', core: 'disc' },
  carta: { disc: ['#fbf9f3', '#f0ebdd', '#e2dccb', '#cfc8b4'], house: '#272b28', core: '#ee785a' },
}
export const DEFAULT_PALETTE = 'terracotta'

function gradientTexture(colors) {
  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')
  const g = ctx.createLinearGradient(0, 0, size, size)
  colors.forEach((color, i) => g.addColorStop(i / (colors.length - 1), color))
  ctx.fillStyle = g; ctx.fillRect(0, 0, size, size)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  return texture
}

// Map every vertex to the gradient by where it sits on the mark, so a piece
// keeps the colours of the spot it covers whatever its own shape.
function projectUv(geometry, matrix) {
  const position = geometry.getAttribute('position')
  const uv = new Float32Array(position.count * 2)
  const v = new THREE.Vector3()
  for (let i = 0; i < position.count; i++) {
    v.fromBufferAttribute(position, i).applyMatrix4(matrix)
    uv[i * 2] = (v.x + R) / (2 * R)
    uv[i * 2 + 1] = 1 - (v.y + R) / (2 * R)
  }
  geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2))
  return geometry
}

export function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(window.WebGL2RenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')))
  } catch { return false }
}

export function createLogoScene(canvas, paletteName = DEFAULT_PALETTE) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setClearColor(0x000000, 0)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.NoToneMapping
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.VSMShadowMap

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(30, 1, 1, 1000)
  camera.position.set(0, 0, 250)
  camera.lookAt(0, 0, 0)

  // Soft studio light: a broad key with blurred shadows, a warm fill, no specular glare.
  scene.add(new THREE.HemisphereLight(0xfff6ec, 0x2c332c, 1.15))
  const key = new THREE.DirectionalLight(0xfff4e8, 2.0)
  key.position.set(-60, 90, 120)
  key.castShadow = true
  key.shadow.mapSize.set(2048, 2048)
  Object.assign(key.shadow.camera, { left: -80, right: 80, top: 80, bottom: -80, near: 20, far: 400 })
  key.shadow.radius = 11; key.shadow.blurSamples = 16; key.shadow.bias = -0.0005
  scene.add(key)
  const fill = new THREE.DirectionalLight(0xffe4d2, 0.55)
  fill.position.set(80, -30, 90)
  scene.add(fill)

  // Matte ceramic: rough, no metal, the faintest glaze.
  const ceramic = () => new THREE.MeshPhysicalMaterial({ roughness: .74, metalness: 0, clearcoat: .15, clearcoatRoughness: .75 })
  const tinted = ceramic()        // the disc
  const white = ceramic()         // the house, and the arrow outline's top
  const outlineSide = ceramic()   // the arrow outline's flanks
  const core = ceramic()          // the arrow core's top
  const coreSide = ceramic()      // the arrow core's flanks
  // Box faces run +x −x +y −y +z −z; extrusions are [caps, walls].
  const boxed = (top, side) => [side, side, side, side, top, top]
  const extruded = (top, side) => [top, side]
  let gradient = null, hue = 0, current = paletteName
  // Every colour of the palette turns together around the hue wheel, so any
  // tint the visitor picks keeps the same light/dark balance as the original.
  const shift = value => {
    if (!hue || value === 'disc') return value
    const c = new THREE.Color(value), hsl = {}
    c.getHSL(hsl)
    return '#' + c.setHSL((hsl.h + hue / 360 + 1) % 1, hsl.s, hsl.l).getHexString()
  }
  const paint = name => {
    const base = PALETTES[name] || PALETTES[DEFAULT_PALETTE]
    current = name
    const palette = { disc: base.disc.map(shift), house: shift(base.house), core: shift(base.core), sides: base.sides && shift(base.sides) }
    gradient?.dispose()
    gradient = gradientTexture(palette.disc)
    tinted.map = gradient; tinted.needsUpdate = true
    const flat = (material, value) => { material.map = value === 'disc' ? gradient : null; material.color.set(value === 'disc' ? '#ffffff' : value); material.needsUpdate = true }
    flat(core, palette.core)
    flat(coreSide, palette.sides || palette.core)
    white.color.set(palette.house)
    outlineSide.color.set(palette.sides || palette.house)
    // A touch of self-light keeps a pale surface reading as its true colour.
    ;[white, outlineSide, core, coreSide].forEach(m => m.emissive.copy(m.color).multiplyScalar(m.map ? 0 : 0.12))
  }
  paint(paletteName)

  const rig = new THREE.Group()
  scene.add(rig)
  const pieces = []
  // Each piece remembers where it rests and where it flies in from.
  const place = (mesh, { x = 0, y = 0, z = 0, rz = 0 }, from, range) => {
    mesh.position.set(x, y, z); mesh.rotation.z = rz
    mesh.castShadow = mesh.receiveShadow = true
    mesh.userData = { home: { x, y, z, rz }, from, range }
    rig.add(mesh); pieces.push(mesh)
    return mesh
  }
  const tintedBox = (w, h, d, x, y, z, rz = 0, radius = 1.2) => {
    const geometry = new RoundedBoxGeometry(w, h, d, 3, radius)
    const m = new THREE.Matrix4().makeRotationZ(rz).setPosition(x, y, z)
    projectUv(geometry, m)
    return new THREE.Mesh(geometry, boxed(core, coreSide))
  }
  const whiteBox = (w, h, d, radius = 1.6) => new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 3, radius), white)
  const outlineBox = (w, h, d, radius = 1.6) => new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 3, radius), boxed(white, outlineSide))
  const whiteDrum = (r, d) => new THREE.Mesh(new THREE.CylinderGeometry(r, r, d, 32).rotateX(Math.PI / 2), white)

  // 1 · The disc, bottom layer, its rim carrying the gradient too.
  const discGeometry = new THREE.CylinderGeometry(R, R, DEEP, 96).rotateX(Math.PI / 2)
  projectUv(discGeometry, new THREE.Matrix4())
  place(new THREE.Mesh(discGeometry, tinted), { z: -DEEP / 2 }, { x: 0, y: 0, z: -140, rz: -1.2, scale: .5 }, [0, 0.3])

  // 2 · The roof: two slabs meeting under a rounded ridge, rounded eaves.
  const H = 9, X = -3, zw = LIFT / 2
  const slope = Math.atan2(31, 36), span = Math.hypot(36, 31)
  place(whiteBox(span + 6, H, LIFT), { x: X - 18, y: 17.5, z: zw, rz: slope }, { x: -70, y: 60, z: 30, rz: .5 }, [0.24, 0.46])
  place(whiteBox(span + 6, H, LIFT), { x: X + 18, y: 17.5, z: zw, rz: -slope }, { x: 70, y: 60, z: 30, rz: -.5 }, [0.28, 0.5])
  place(whiteDrum(H / 2, LIFT), { x: X, y: 33, z: zw }, { x: 0, y: 90, z: 40 }, [0.4, 0.56])

  // 3 · Walls and floor. The right wall stops where the arrow leaves.
  place(whiteBox(H, 36, LIFT), { x: X - 25, y: -9.5, z: zw }, { x: -90, y: -10, z: 20, rz: -.4 }, [0.38, 0.58])
  place(whiteBox(H, 9, LIFT), { x: X + 25, y: 3.5, z: zw }, { x: 90, y: 20, z: 20, rz: .4 }, [0.42, 0.62])
  place(whiteBox(55, H, LIFT), { x: X - 2, y: -27, z: zw }, { x: 0, y: -90, z: 30 }, [0.46, 0.66])

  // 4 · The arrow: a white outline (wider, lower) under a gradient core.
  const zo = LIFT / 2, zc = LIFT / 2 + 0.5, coreW = 8, line = 13
  const elbow = (inner, outer, material, depth, project) => {
    const shape = new THREE.Shape()
    shape.absarc(0, 0, outer, Math.PI, Math.PI * 1.5, false)
    shape.absarc(0, 0, inner, Math.PI * 1.5, Math.PI, true)
    const geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false }).translate(0, 0, -depth / 2)
    if (project) projectUv(geometry, new THREE.Matrix4().setPosition(X + 10, -6, 0))
    return new THREE.Mesh(geometry, material)
  }
  // outline
  place(outlineBox(line, 24.5, LIFT, 2), { x: X, y: 5.25, z: zo }, { x: 0, y: 70, z: 50 }, [0.56, 0.74])
  place(elbow(3.5, 16.5, extruded(white, outlineSide), LIFT), { x: X + 10, y: -6, z: zo }, { x: 0, y: 70, z: 50 }, [0.56, 0.74])
  place(outlineBox(17, line, LIFT, 2), { x: X + 18, y: -16, z: zo }, { x: 0, y: 70, z: 50 }, [0.56, 0.74])
  const headShape = (w, h) => { const s = new THREE.Shape(); s.moveTo(0, -h / 2); s.lineTo(w, 0); s.lineTo(0, h / 2); s.closePath(); return s }
  const head = (w, h, material, depth, x) => {
    const geometry = new THREE.ExtrudeGeometry(headShape(w, h), { depth, bevelEnabled: true, bevelSize: 1, bevelThickness: .6, bevelSegments: 3 }).translate(0, 0, -depth / 2)
    projectUv(geometry, new THREE.Matrix4().setPosition(x, -16, 0))
    return new THREE.Mesh(geometry, material)
  }
  place(head(24, 26, extruded(white, outlineSide), LIFT, X + 23.5), { x: X + 23.5, y: -16, z: zo }, { x: 110, y: 0, z: 40, rz: .3, scale: .6 }, [0.72, 0.92])
  // core
  place(tintedBox(coreW, 22, LIFT + 1, X, 5, zc, 0, 1), { x: X, y: 5, z: zc }, { x: 0, y: 70, z: 50 }, [0.58, 0.76])
  place(elbow(6, 14, extruded(core, coreSide), LIFT + 1, true), { x: X + 10, y: -6, z: zc }, { x: 0, y: 70, z: 50 }, [0.58, 0.76])
  place(tintedBox(17, coreW, LIFT + 1, X + 18, -16, zc, 0, 1), { x: X + 18, y: -16, z: zc }, { x: 0, y: 70, z: 50 }, [0.58, 0.76])
  place(head(19, 20, extruded(core, coreSide), LIFT + 1, X + 26), { x: X + 26, y: -16, z: zc }, { x: 110, y: 0, z: 40, rz: .3, scale: .6 }, [0.74, 0.94])

  let progress = 0
  const setProgress = p => {
    p = progress = Math.max(0, Math.min(1, p))
    pieces.forEach(mesh => {
      const { home, from, range } = mesh.userData
      const t = back(smooth(p, range[0], range[1]))
      const away = 1 - t
      mesh.position.set(home.x + (from.x || 0) * away, home.y + (from.y || 0) * away, home.z + (from.z || 0) * away)
      mesh.rotation.z = home.rz + (from.rz || 0) * away
      const s = (from.scale ?? 1) + (1 - (from.scale ?? 1)) * t
      mesh.scale.setScalar(s)
    })
    // The whole mark turns from a steep, edge-on angle to a gentle 3/4 view.
    const e = smooth(p, 0, 1)
    rig.rotation.set(0.55 - e * 0.27, -1.15 + e * 0.75, 0.18 - e * 0.1)
  }
  const setSize = (w, h) => {
    renderer.setSize(w, h, false)
    camera.aspect = w / Math.max(1, h)
    // Keep the mark the same on-screen size whatever the box's aspect.
    const fit = Math.min(1, camera.aspect / 1.05)
    camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(15)) / fit))
    camera.updateProjectionMatrix()
    setProgress(progress)
  }
  const render = () => renderer.render(scene, camera)
  const dispose = () => {
    scene.traverse(node => { node.geometry?.dispose(); [].concat(node.material || []).forEach(m => m.dispose?.()) })
    gradient?.dispose()
    renderer.dispose()
  }
  setProgress(0)
  if (import.meta.env.DEV) canvas.addEventListener('logo:debug', () => { if (canvas.dataset.debugPalette) paint(canvas.dataset.debugPalette); setProgress(parseFloat(canvas.dataset.debugProgress) || 0); render() })
  const setHue = degrees => { hue = degrees; paint(current) }
  return { setProgress, setSize, render, dispose, paint, setHue }
}
