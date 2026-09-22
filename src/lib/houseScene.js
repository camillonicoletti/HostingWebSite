// A small low-poly house rendered with three.js. The scroll progress (0 → 1)
// drives one continuous camera path: outside → the door opens → the check-in
// sheet on the desk → the Wi-Fi router → the house-rules board → the door
// closes and shows the check-out sheet hung on its inner face → the door opens
// again, we walk out, turn to look back at the house (the door shutting behind
// us) and return to the opening view. From there the camera pulls straight
// away until the whole house is small enough to sit on the phone's screen.
import * as THREE from 'three'

const C = {
  plinth: 0xc0cbb3, lawn: 0xdbe2cd, path: 0xe9e5d8,
  wall: 0xf7eedd, trim: 0xd9cbb4,
  roof: 0xe08467, roofEdge: 0xb75b45, chimney: 0xf1e4ce,
  door: 0x5f7657, doorFrame: 0xd8cbb7, glass: 0x8ea69c, glassLit: 0xffe9b4,
  floor: 0xe4cba3, ceiling: 0xfbf6ea, rug: 0xd39a82, wood: 0xa1704f,
  sofa: 0x91a483, cushion: 0xf0e2c8, plant: 0x8fa374, plantDark: 0x71865e, pot: 0xbe7c61,
  suitcase: 0xbd7054, suitcaseDark: 0x98543e, router: 0xf4f0e6, led: 0x7bd68c,
  frame: 0x2f352f, paper: 0xfdf9ef, ink: 0x272b28, coral: 0xee785a, sage: 0x465940,
}

// Camera keyframes: scroll progress → position, look-at point, vertical fov.
const HOME = { pos: [14.6, 9.9, 15.9], at: [0.2, 0.45, 0.3], fov: 28 }
// Pulling away along the opening view's own axis shrinks the house in place.
const away = k => ({ pos: HOME.pos.map(v => v * k), at: HOME.at, fov: HOME.fov })
const KEYS = [
  { p: 0.00, ...HOME },
  { p: 0.05, pos: [5.4, 3.9, 9.6], at: [-0.9, 1.0, 0.8], fov: 38 },
  { p: 0.11, pos: [-1.4, 1.55, 4.9], at: [-1.4, 1.35, 0.4], fov: 46 },
  { p: 0.15, pos: [-1.4, 1.5, 2.35], at: [0.6, 1.1, 0.6], fov: 56 },
  { p: 0.19, pos: [-0.6, 1.55, 0.95], at: [0.9, 0.85, 1.95], fov: 50 },
  { p: 0.235, pos: [0.6, 1.62, 1.22], at: [0.85, 0.8, 1.93], fov: 44 },
  { p: 0.30, pos: [0.5, 1.4, 1.2], at: [2.45, 1.05, 0.3], fov: 48 },
  { p: 0.35, pos: [1.25, 1.2, 1.0], at: [2.62, 0.98, 0.34], fov: 44 },
  { p: 0.41, pos: [0.6, 1.5, 0.9], at: [-0.7, 1.7, -2.3], fov: 52 },
  { p: 0.48, pos: [-0.7, 1.72, 0.0], at: [-0.7, 1.58, -2.3], fov: 44 },
  { p: 0.56, pos: [-0.5, 1.55, 0.3], at: [-1.4, 1.4, 2.3], fov: 52 },
  { p: 0.62, pos: [-1.4, 1.55, 0.85], at: [-1.4, 1.48, 2.3], fov: 44 },
  { p: 0.66, pos: [-1.4, 1.55, 1.05], at: [-1.4, 1.47, 2.3], fov: 42 },
  // Leaving: the door swings open, we step out onto the path, then turn back
  // toward the house while climbing to the opening view.
  { p: 0.72, pos: [-1.4, 1.5, 1.6], at: [-1.4, 1.15, 3.4], fov: 46 },
  { p: 0.76, pos: [-1.35, 1.6, 3.3], at: [1.2, 0.6, 3.6], fov: 44 },
  { p: 0.80, pos: [2.6, 2.7, 6.6], at: [0.9, 1.1, 2.0], fov: 40 },
  { p: 0.82, pos: [8.0, 5.5, 10.5], at: [0.4, 0.8, 0.8], fov: 33 },
  { p: 0.84, ...HOME },
  { p: 0.86, ...away(1.01) },
  { p: 0.90, ...away(1.9) },
  { p: 0.93, ...away(3.0) },
  { p: 1.00, ...away(3.05) },
]

const smooth = (v, a, b) => { const t = Math.max(0, Math.min(1, (v - a) / (b - a))); return t * t * (3 - 2 * t) }
const mat = (color, extra) => new THREE.MeshStandardMaterial({ color, roughness: .94, metalness: 0, ...extra })

function box(w, h, d, material, x = 0, y = 0, z = 0) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material)
  mesh.position.set(x, y, z)
  mesh.castShadow = mesh.receiveShadow = true
  return mesh
}
function sphere(r, material, x, y, z, sx = 1, sy = 1, sz = 1) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(r, 18, 14), material)
  mesh.position.set(x, y, z); mesh.scale.set(sx, sy, sz)
  mesh.castShadow = mesh.receiveShadow = true
  return mesh
}
function cylinder(rt, rb, h, material, x, y, z, seg = 24) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), material)
  mesh.position.set(x, y, z)
  mesh.castShadow = mesh.receiveShadow = true
  return mesh
}

// Text is painted on canvases so the boards use the site's own typography.
function paintedTexture(width, height, draw) {
  const canvas = document.createElement('canvas')
  canvas.width = width; canvas.height = height
  const ctx = canvas.getContext('2d')
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  const paint = () => { draw(ctx, width, height); texture.needsUpdate = true }
  paint()
  return { texture, paint }
}
const SANS = '"DM Sans", Arial, sans-serif'
const SERIF = '"Instrument Serif", Georgia, serif'

function drawRules(ctx, w, h) {
  ctx.fillStyle = '#fdf9ef'; ctx.fillRect(0, 0, w, h)
  ctx.fillStyle = '#465940'; ctx.font = `600 22px ${SANS}`; ctx.letterSpacing = '4px'
  ctx.fillText('LA CASA', 60, 78)
  ctx.beginPath(); ctx.arc(w - 74, 68, 8, 0, Math.PI * 2); ctx.fillStyle = '#ee785a'; ctx.fill()
  ctx.letterSpacing = '0px'; ctx.fillStyle = '#272b28'; ctx.font = `italic 84px ${SERIF}`
  ctx.fillText('Regole della casa', 58, 170)
  ctx.strokeStyle = '#dcded4'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(60, 206); ctx.lineTo(w - 60, 206); ctx.stroke()
  const lines = ['Check-out entro le 10:00', 'Silenzio dopo le 22:00', 'Raccolta differenziata sul balcone', 'Scarpe fuori, ciabatte dentro']
  ctx.font = `450 32px ${SANS}`
  lines.forEach((line, i) => {
    const y = 268 + i * 66
    ctx.fillStyle = '#ee785a'; ctx.beginPath(); ctx.arc(76, y - 11, 7, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = '#272b28'; ctx.fillText(line, 104, y)
  })
  ctx.fillStyle = '#73766f'; ctx.font = `450 20px ${SANS}`
  ctx.fillText('Grazie e buon soggiorno ✳', 60, h - 52)
}

function drawWifi(ctx, w, h) {
  ctx.fillStyle = '#fdf9ef'; ctx.fillRect(0, 0, w, h)
  ctx.strokeStyle = '#657956'; ctx.lineWidth = 9; ctx.lineCap = 'round'
  const cx = 110, cy = 128
  ;[62, 42, 22].forEach(r => { ctx.beginPath(); ctx.arc(cx, cy, r, Math.PI * 1.25, Math.PI * 1.75); ctx.stroke() })
  ctx.fillStyle = '#657956'; ctx.beginPath(); ctx.arc(cx, cy - 4, 8, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#465940'; ctx.font = `600 22px ${SANS}`; ctx.letterSpacing = '4px'
  ctx.fillText('WI-FI', 200, 92)
  ctx.letterSpacing = '0px'; ctx.fillStyle = '#272b28'; ctx.font = `550 46px ${SANS}`
  ctx.fillText('LaMiaCasa_Ospiti', 200, 150)
  ctx.fillStyle = '#73766f'; ctx.font = `450 24px ${SANS}`
  ctx.fillText('PASSWORD', 62, 262)
  ctx.fillStyle = '#272b28'; ctx.font = `italic 64px ${SERIF}`
  ctx.fillText('benvenuti2026', 60, 332)
  ctx.fillStyle = '#e7eadd'; ctx.beginPath(); ctx.roundRect(w - 214, 236, 154, 54, 27); ctx.fill()
  ctx.fillStyle = '#465940'; ctx.font = `600 20px ${SANS}`; ctx.letterSpacing = '2px'
  ctx.fillText('COPIA', w - 168, 271)
}

// A4-ish sheets share one layout: eyebrow, serif title, a short list.
function drawSheet(ctx, w, h, { eyebrow, title, lines, note }) {
  ctx.fillStyle = '#fdf9ef'; ctx.fillRect(0, 0, w, h)
  ctx.fillStyle = '#465940'; ctx.font = `600 24px ${SANS}`; ctx.letterSpacing = '5px'
  ctx.fillText(eyebrow, 64, 96)
  ctx.beginPath(); ctx.arc(w - 78, 86, 9, 0, Math.PI * 2); ctx.fillStyle = '#ee785a'; ctx.fill()
  ctx.letterSpacing = '0px'; ctx.fillStyle = '#272b28'; ctx.font = `italic 84px ${SERIF}`
  ctx.fillText(title, 62, 196)
  ctx.strokeStyle = '#dcded4'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(64, 236); ctx.lineTo(w - 64, 236); ctx.stroke()
  ctx.font = `450 34px ${SANS}`
  lines.forEach((line, i) => {
    const y = 316 + i * 86
    ctx.fillStyle = '#ee785a'; ctx.beginPath(); ctx.arc(82, y - 12, 8, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = '#272b28'; ctx.fillText(line, 114, y)
  })
  ctx.fillStyle = '#73766f'; ctx.font = `450 24px ${SANS}`
  ctx.fillText(note, 64, h - 70)
}
const drawCheckin = (ctx, w, h) => drawSheet(ctx, w, h, {
  eyebrow: 'CHECK-IN', title: 'Benvenuti!',
  lines: ['Arrivo dalle 15:00', 'Codice del portone: 2406', 'Le chiavi sono qui accanto', 'Interno 4, secondo piano', 'Dubbi? Scrivici su WhatsApp'],
  note: 'Fate come a casa vostra ✳',
})
const drawCheckout = (ctx, w, h) => drawSheet(ctx, w, h, {
  eyebrow: 'CHECK-OUT', title: 'Prima di partire',
  lines: ['Check-out entro le 10:00', 'Chiavi sul gancio qui accanto', 'Finestre chiuse, luci spente', 'Rifiuti nel bidone in cortile', 'Un messaggio quando uscite'],
  note: 'Grazie e buon viaggio ✳',
})

function buildHouse(scene) {
  const W = 6, D = 5, H = 2.8, T = 0.22
  const wall = mat(C.wall, { side: THREE.DoubleSide })
  const roof = mat(C.roof, { side: THREE.DoubleSide })
  const trim = mat(C.trim)
  const wood = mat(C.wood)
  const plant = mat(C.plant), plantDark = mat(C.plantDark), pot = mat(C.pot)

  // Ground: a soft plinth, a lawn and the path to the door.
  const ground = new THREE.Group()
  ground.add(box(10.4, 0.5, 9.2, mat(C.plinth), 0, -0.25, 0.3))
  ground.add(box(10, 0.06, 8.8, mat(C.lawn), 0, 0.03, 0.3))
  ground.add(box(1.5, 0.05, 2.5, mat(C.path), -1.4, 0.07, 3.8))
  scene.add(ground)

  // Shell.
  const house = new THREE.Group()
  house.add(box(W - 0.1, 0.1, D - 0.1, mat(C.floor), 0, 0.06, 0))
  house.add(box(W, H, T, wall, 0, H / 2, -D / 2 + T / 2))
  house.add(box(T, H, D, wall, -W / 2 + T / 2, H / 2, 0))
  house.add(box(T, H, D, wall, W / 2 - T / 2, H / 2, 0))
  // Front wall with the doorway cut out (door spans x −1.9 … −0.9, 2.15 tall).
  house.add(box(1.1, H, T, wall, -2.45, H / 2, D / 2 - T / 2))
  house.add(box(3.9, H, T, wall, 1.05, H / 2, D / 2 - T / 2))
  house.add(box(1.0, H - 2.15, T, wall, -1.4, 2.15 + (H - 2.15) / 2, D / 2 - T / 2))
  house.add(box(W - 0.1, 0.06, D - 0.1, mat(C.ceiling, { side: THREE.DoubleSide }), 0, H + 0.02, 0))

  // Gables and roof (ridge runs along x).
  const rise = 1.7
  const gableShape = new THREE.Shape([new THREE.Vector2(-D / 2, H), new THREE.Vector2(D / 2, H), new THREE.Vector2(0, H + rise)])
  const gableGeo = new THREE.ExtrudeGeometry(gableShape, { depth: T, bevelEnabled: false })
  ;[-W / 2, W / 2 - T].forEach(x => {
    const gable = new THREE.Mesh(gableGeo, wall)
    gable.rotation.y = Math.PI / 2; gable.position.x = x
    gable.castShadow = gable.receiveShadow = true
    house.add(gable)
  })
  const overhang = 0.55, run = D / 2 + overhang, drop = rise * run / (D / 2)
  const slope = Math.atan2(drop, run), length = Math.hypot(run, drop) + 0.1
  ;[1, -1].forEach(dir => {
    const slab = box(W + 1.1, 0.14, length, roof, 0, H + rise - drop / 2 + 0.05, dir * run / 2)
    slab.rotation.x = dir * slope
    house.add(slab)
    const fascia = box(W + 1.1, 0.24, 0.1, mat(C.roofEdge), 0, H + rise - drop - 0.02, dir * (run + 0.02))
    house.add(fascia)
  })
  house.add(box(W + 1.2, 0.14, 0.42, mat(C.roofEdge), 0, H + rise + 0.09, 0))
  house.add(box(0.55, 1.5, 0.55, mat(C.chimney), 1.7, H + rise - 0.55, -1.0))
  house.add(box(0.68, 0.14, 0.68, trim, 1.7, H + rise + 0.2, -1.0))

  // Windows appear on both faces of the wall so the room feels closed.
  const glass = mat(C.glass, { roughness: .35, metalness: .1 })
  const glassLit = new THREE.MeshStandardMaterial({ color: C.glassLit, emissive: C.glassLit, emissiveIntensity: .35, roughness: .5 })
  const windowPane = (w, h, lit) => {
    const g = new THREE.Group()
    g.add(box(w + 0.16, h + 0.16, 0.06, trim, 0, 0, 0))
    g.add(box(w, h, 0.05, lit ? glassLit : glass, 0, 0, 0.02))
    g.add(box(0.05, h, 0.03, trim, 0, 0, 0.05)); g.add(box(w, 0.05, 0.03, trim, 0, 0, 0.05))
    g.add(box(w + 0.3, 0.08, 0.14, trim, 0, -h / 2 - 0.1, 0.03))
    return g
  }
  const placeWindow = (w, h, x, y, z, ry, lit) => { const p = windowPane(w, h, lit); p.position.set(x, y, z); p.rotation.y = ry; house.add(p) }
  placeWindow(1.05, 1.15, 1.3, 1.55, D / 2 + 0.01, 0, false)
  placeWindow(1.05, 1.15, 1.3, 1.55, D / 2 - T - 0.01, Math.PI, true)
  placeWindow(1.15, 1.15, W / 2 + 0.01, 1.55, -0.3, Math.PI / 2, false)
  placeWindow(1.15, 1.15, W / 2 - T - 0.01, 1.55, -0.3, -Math.PI / 2, true)
  placeWindow(0.7, 0.55, W / 2 + 0.01, H + 0.75, 0, Math.PI / 2, false)

  // Door: hinged on the left jamb, swings into the house.
  // The frame overlaps the doorway reveal by a centimetre (two faces on one
  // plane flicker) and, seen from a hand's width away while the camera walks
  // through, receives no shadow map either.
  const jamb = mat(C.doorFrame)
  ;[box(0.11, 2.25, T + 0.08, jamb, -1.945, 1.125, D / 2 - T / 2), box(0.11, 2.25, T + 0.08, jamb, -0.855, 1.125, D / 2 - T / 2),
    box(1.2, 0.11, T + 0.08, jamb, -1.4, 2.195, D / 2 - T / 2), box(1.3, 0.06, 0.5, trim, -1.4, 0.1, D / 2 + 0.2)]
    .forEach(part => { part.receiveShadow = false; house.add(part) })
  const door = new THREE.Group()
  door.position.set(-1.9, 0, D / 2 - T / 2)
  // Everything on the leaf sits a little proud of its faces: coplanar faces
  // z-fight and shimmer while the door turns.
  const leaf = box(0.96, 2.14, 0.08, mat(C.door), 0.5, 1.07, 0)
  door.add(leaf)
  door.add(box(0.72, 0.9, 0.02, mat(0x718a68), 0.5, 1.45, 0.06))
  door.add(box(0.72, 0.7, 0.02, mat(0x718a68), 0.5, 0.5, 0.06))
  const brass = new THREE.MeshStandardMaterial({ color: 0xe6c886, roughness: .3, metalness: .6 })
  door.add(sphere(0.045, brass, 0.9, 1.05, 0.08))
  door.add(sphere(0.045, brass, 0.9, 1.05, -0.08))
  const checkout = paintedTexture(640, 840, drawCheckout)
  const checkoutSheet = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.525), new THREE.MeshStandardMaterial({ map: checkout.texture, roughness: .85 }))
  checkoutSheet.position.set(0.5, 1.5, -0.052); checkoutSheet.rotation.y = Math.PI
  door.add(checkoutSheet)
  door.add(box(0.07, 0.022, 0.004, mat(C.coral), 0.5, 1.755, -0.058))
  // The moving leaf casts a shadow but does not receive one: shadow-map acne
  // crawls over a rotating surface, so its colour stays flat and steady.
  door.traverse(node => { if (node.isMesh) node.receiveShadow = false })
  house.add(door)

  // Key hooks beside the door: keys wait here at arrival and at departure.
  const keyRing = (x, y, z, ry) => {
    const g = new THREE.Group()
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.007, 8, 24), brass)
    g.add(ring)
    g.add(box(0.16, 0.024, 0.008, brass, 0, -0.09, 0)); g.add(box(0.03, 0.05, 0.008, brass, 0.06, -0.12, 0))
    g.add(box(0.14, 0.024, 0.008, mat(0x9aa78d, { metalness: .4, roughness: .4 }), 0.02, -0.08, 0.012))
    g.position.set(x, y, z); g.rotation.y = ry
    return g
  }
  const hooks = new THREE.Group()
  hooks.add(box(0.3, 0.1, 0.03, wood, -0.62, 1.58, D / 2 - T - 0.015))
  hooks.add(box(0.02, 0.02, 0.06, mat(0x3a3f38), -0.7, 1.55, D / 2 - T - 0.04)); hooks.add(box(0.02, 0.02, 0.06, mat(0x3a3f38), -0.54, 1.55, D / 2 - T - 0.04))
  hooks.add(keyRing(-0.7, 1.5, D / 2 - T - 0.07, 0))
  house.add(hooks)

  // Interior: rug, sofa, console with the router and the Wi-Fi card, the rules board.
  const rug = new THREE.Mesh(new THREE.CylinderGeometry(1.35, 1.35, 0.03, 40), mat(C.rug))
  rug.position.set(-0.2, 0.12, 0.2); rug.scale.z = 0.72; rug.receiveShadow = true
  house.add(rug)
  const sofa = new THREE.Group()
  sofa.add(box(0.95, 0.42, 2.1, mat(C.sofa), -2.3, 0.35, -0.7))
  sofa.add(box(0.28, 0.85, 2.1, mat(C.sofa), -2.64, 0.55, -0.7))
  sofa.add(box(0.55, 0.16, 0.85, mat(C.cushion), -2.2, 0.64, -1.2))
  sofa.add(box(0.55, 0.16, 0.85, mat(C.cushion), -2.2, 0.64, -0.2))
  house.add(sofa)

  // Writing desk under the front window: the check-in sheet, keys, a lamp.
  const desk = new THREE.Group()
  desk.add(box(1.3, 0.05, 0.6, wood, 0.9, 0.78, 1.95))
  desk.add(box(1.18, 0.14, 0.5, mat(0x8d6146), 0.9, 0.68, 1.97))
  desk.add(box(0.2, 0.012, 0.012, brass, 0.9, 0.68, 1.71))
  ;[[0.3, 1.7], [1.5, 1.7], [0.3, 2.2], [1.5, 2.2]].forEach(([x, z]) => desk.add(box(0.05, 0.76, 0.05, wood, x, 0.38, z)))
  const checkin = paintedTexture(640, 840, drawCheckin)
  const checkinSheet = new THREE.Group()
  const sheet0 = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.55), new THREE.MeshStandardMaterial({ map: checkin.texture, roughness: .85 }))
  sheet0.rotation.x = -Math.PI / 2; sheet0.receiveShadow = true
  checkinSheet.add(sheet0)
  checkinSheet.position.set(0.8, 0.808, 1.95); checkinSheet.rotation.y = Math.PI + 0.14
  desk.add(checkinSheet)
  desk.add(keyRing(1.22, 0.818, 1.8, 0).rotateX(-Math.PI / 2))
  const pen = cylinder(0.008, 0.008, 0.16, mat(0x3a3f38), 0.5, 0.815, 2.12, 8)
  pen.rotation.set(Math.PI / 2, 0, 0.6, 'ZXY')
  desk.add(pen)
  const lampMat = mat(0x465940, { roughness: .7 })
  desk.add(cylinder(0.09, 0.1, 0.03, lampMat, 1.42, 0.82, 2.18))
  desk.add(cylinder(0.012, 0.012, 0.38, lampMat, 1.42, 1.02, 2.18, 8))
  const shade = cylinder(0.05, 0.12, 0.13, lampMat, 1.36, 1.22, 2.1)
  shade.rotation.z = 0.5
  desk.add(shade)
  const deskLight = new THREE.PointLight(0xfff1d6, 1.1, 2.2, 2)
  deskLight.position.set(1.3, 1.12, 2.05)
  desk.add(deskLight)
  house.add(desk)

  const console_ = new THREE.Group()
  console_.add(box(0.5, 0.06, 1.15, wood, 2.5, 0.86, 0.3))
  ;[[2.32, 0.78], [2.68, 0.78], [2.32, -0.18], [2.68, -0.18]].forEach(([x, z]) => console_.add(box(0.05, 0.83, 0.05, wood, x, 0.45, z)))
  house.add(console_)
  const router = new THREE.Group()
  router.add(box(0.13, 0.25, 0.36, mat(C.router, { roughness: .6 }), 2.52, 1.02, 0.02))
  router.add(cylinder(0.012, 0.012, 0.24, mat(0x3a3f38), 2.52, 1.26, -0.1, 8))
  router.add(cylinder(0.012, 0.012, 0.24, mat(0x3a3f38), 2.52, 1.26, 0.14, 8))
  router.add(box(0.012, 0.03, 0.03, new THREE.MeshStandardMaterial({ color: C.led, emissive: C.led, emissiveIntensity: 1.4 }), 2.45, 1.08, 0.12))
  house.add(router)
  const wifi = paintedTexture(768, 420, drawWifi)
  const wifiCard = new THREE.Mesh(new THREE.PlaneGeometry(0.52, 0.285), new THREE.MeshStandardMaterial({ map: wifi.texture, roughness: .8 }))
  wifiCard.position.set(2.62, 1.03, 0.58); wifiCard.rotation.set(-0.14, -Math.PI / 2, 0, 'YXZ')
  wifiCard.castShadow = true
  house.add(wifiCard)

  const rules = paintedTexture(1024, 720, drawRules)
  const board = new THREE.Group()
  board.add(box(1.52, 1.12, 0.05, mat(C.frame, { roughness: .6 }), 0, 0, 0))
  const sheet = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.985), new THREE.MeshStandardMaterial({ map: rules.texture, roughness: .85 }))
  sheet.position.z = 0.03
  board.add(sheet)
  board.position.set(-0.7, 1.75, -D / 2 + T + 0.03)
  house.add(board)

  // Plants inside and out, and the suitcase that says "arrival".
  const plantAt = (x, z, scale = 1) => {
    const g = new THREE.Group()
    g.add(cylinder(0.24, 0.19, 0.42, pot, 0, 0.21, 0))
    g.add(cylinder(0.03, 0.04, 0.8, plantDark, 0, 0.75, 0, 8))
    g.add(sphere(0.34, plant, 0, 1.25, 0, 1, 1.25, 1))
    g.add(sphere(0.22, plantDark, 0.22, 1.02, 0.1))
    g.add(sphere(0.2, plant, -0.2, 1.1, -0.12))
    g.position.set(x, 0.08, z); g.scale.setScalar(scale)
    return g
  }
  house.add(plantAt(2.35, -2.0, 0.9))
  scene.add(plantAt(-2.55, 3.35, 1.15))
  const bush = new THREE.Group()
  bush.add(sphere(0.42, plant, 2.5, 0.42, 3.3)); bush.add(sphere(0.3, plantDark, 2.95, 0.3, 3.5)); bush.add(sphere(0.28, plant, 2.2, 0.3, 3.75))
  scene.add(bush)
  const suitcase = new THREE.Group()
  suitcase.add(box(0.48, 0.66, 0.3, mat(C.suitcase), 0, 0.4, 0))
  suitcase.add(box(0.5, 0.05, 0.32, mat(C.suitcaseDark), 0, 0.5, 0))
  suitcase.add(box(0.06, 0.28, 0.04, mat(0x5d6750), -0.12, 0.85, 0)); suitcase.add(box(0.06, 0.28, 0.04, mat(0x5d6750), 0.12, 0.85, 0))
  suitcase.add(box(0.3, 0.05, 0.04, mat(0x5d6750), 0, 0.99, 0))
  suitcase.position.set(-2.95, 0.06, 4.2); suitcase.rotation.y = 0.35
  scene.add(suitcase)

  // Ceiling pendant with a warm light for the room.
  house.add(cylinder(0.02, 0.02, 0.5, mat(0x3a3f38), 0.2, H - 0.25, 0, 6))
  house.add(cylinder(0.26, 0.12, 0.22, mat(C.paper, { side: THREE.DoubleSide }), 0.2, H - 0.55, 0))
  scene.add(house)

  return {
    door, paint: () => { wifi.paint(); rules.paint(); checkin.paint(); checkout.paint() },
    anchors: { checkin: new THREE.Vector3(0.8, 0.96, 1.9), wifi: new THREE.Vector3(2.52, 1.3, 0.02), rules: new THREE.Vector3(-0.7, 2.36, -2.3), checkout: new THREE.Vector3(-1.4, 1.86, 2.34) },
  }
}

export function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(window.WebGL2RenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')))
  } catch { return false }
}

export function createHouseScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setClearColor(0x000000, 0)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.NeutralToneMapping
  renderer.toneMappingExposure = 1.05
  renderer.shadowMap.enabled = true
  // Variance shadows blur the edge instead of stepping through texels, so the
  // roof's shadow stays soft even on a wall the camera is brushing past.
  renderer.shadowMap.type = THREE.VSMShadowMap

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(34, 1, 0.06, 160)

  scene.add(new THREE.HemisphereLight(0xfff8ea, 0xb5c0a8, 1.2))
  scene.add(new THREE.AmbientLight(0xfff4e6, 0.55))
  const sun = new THREE.DirectionalLight(0xfff0d8, 2.4)
  sun.position.set(7, 10, 8)
  sun.castShadow = true
  // A finer shadow map on capable desktops keeps shadow edges smooth even when
  // the camera brushes past a wall.
  const fine = renderer.capabilities.maxTextureSize >= 4096 && window.innerWidth > 900
  sun.shadow.mapSize.set(fine ? 4096 : 2048, fine ? 4096 : 2048)
  Object.assign(sun.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8, near: 2, far: 40 })
  sun.shadow.bias = -0.0002; sun.shadow.normalBias = 0.02
  sun.shadow.radius = 5; sun.shadow.blurSamples = 12
  scene.add(sun)
  const lamp = new THREE.PointLight(0xffe2b8, 18, 12, 2)
  lamp.position.set(0.2, 2.15, 0)
  scene.add(lamp)
  const fill = new THREE.PointLight(0xfff4e4, 9, 9, 2)
  fill.position.set(0.6, 1.9, -0.9)
  scene.add(fill)

  const { door, paint, anchors } = buildHouse(scene)
  document.fonts?.ready.then(paint)
  Promise.all([document.fonts?.load(`italic 40px ${SERIF}`), document.fonts?.load(`550 40px ${SANS}`)]).then(paint).catch(() => {})

  const posCurve = new THREE.CatmullRomCurve3(KEYS.map(k => new THREE.Vector3(...k.pos)), false, 'centripetal')
  const atCurve = new THREE.CatmullRomCurve3(KEYS.map(k => new THREE.Vector3(...k.at)), false, 'centripetal')
  const pos = new THREE.Vector3(), at = new THREE.Vector3(), tmp = new THREE.Vector3()
  const segments = KEYS.length - 1

  let progress = 0
  const setProgress = p => {
    p = progress = Math.max(0, Math.min(1, p))
    let i = 0
    while (i < segments - 1 && p >= KEYS[i + 1].p) i++
    const local = (p - KEYS[i].p) / (KEYS[i + 1].p - KEYS[i].p)
    const u = (i + local) / segments
    posCurve.getPoint(u, pos); atCurve.getPoint(u, at)
    // On tall canvases the chapter card covers the lower part, so aim a little
    // lower and let the subject sit higher in the frame.
    at.y -= Math.max(0, 0.95 - camera.aspect) * 1.2
    camera.position.copy(pos)
    camera.lookAt(at)
    // Keyframes are framed for a roughly square canvas; narrower canvases keep
    // the same horizontal field of view instead of cropping the sides.
    const fov = KEYS[i].fov + (KEYS[i + 1].fov - KEYS[i].fov) * local
    const squeeze = Math.min(1, camera.aspect / 0.95)
    camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(fov / 2)) / squeeze))
    camera.updateProjectionMatrix()
    // Opens for the arrival, closes for the check-out sheet, opens again to
    // leave and shuts behind us once we are outside.
    door.rotation.y = (smooth(p, 0.045, 0.13) - smooth(p, 0.515, 0.59) + smooth(p, 0.67, 0.72) - smooth(p, 0.79, 0.83)) * 1.95
    lamp.intensity = 8 + smooth(p, 0.09, 0.2) * 12
  }
  const setSize = (w, h) => {
    renderer.setSize(w, h, false)
    camera.aspect = w / Math.max(1, h)
    setProgress(progress)
  }
  const project = (name, w, h) => {
    tmp.copy(anchors[name]).project(camera)
    return { x: (tmp.x + 1) / 2 * w, y: (1 - tmp.y) / 2 * h, visible: tmp.z < 1 && Math.abs(tmp.x) < 1.1 && Math.abs(tmp.y) < 1.1 }
  }
  const render = () => renderer.render(scene, camera)
  const dispose = () => {
    scene.traverse(node => {
      node.geometry?.dispose()
      const materials = Array.isArray(node.material) ? node.material : node.material ? [node.material] : []
      materials.forEach(m => { m.map?.dispose(); m.dispose() })
    })
    renderer.dispose()
  }
  setProgress(0)
  const api = { setProgress, setSize, project, render, dispose }
  if (import.meta.env.DEV) canvas.addEventListener('house:debug', () => { setProgress(parseFloat(canvas.dataset.debugProgress) || 0); render() })
  return api
}
