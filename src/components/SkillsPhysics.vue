<template>
  <div ref="containerRef" class="physics-container">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import Matter from 'matter-js'

const props = defineProps<{
  skills: { titulo: string; img: string }[]
  resolveImg: (path: string) => string
  isLightTheme: boolean
}>()

const emit = defineEmits<{
  'skill-click': [titulo: string]
  'sphere-escaped': []
}>()

const containerRef = ref<HTMLDivElement>()
const canvasRef = ref<HTMLCanvasElement>()

let engine: Matter.Engine
let render: Matter.Render
let runner: Matter.Runner
let bodySize = 0
let imagesCache: HTMLImageElement[] = []
const respawning = new Set<Matter.Body>()
const respawnTimers = new Set<ReturnType<typeof setTimeout>>()

const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const img = new Image()
    // Sin crossOrigin: los íconos son del mismo origen y nunca leemos píxeles
    // del canvas, pero el atributo creaba una entrada de caché aparte y hacía
    // que cada ícono se descargara dos veces (una por las tarjetas, otra acá).
    img.onload = () => resolve(img)
    img.onerror = () => resolve(img)
    img.src = src
  })
}

const destroy = () => {
  for (const timer of respawnTimers) clearTimeout(timer)
  respawnTimers.clear()
  respawning.clear()
  running = false
  if (render) Matter.Render.stop(render)
  if (runner) Matter.Runner.stop(runner)
  if (engine) {
    Matter.Engine.clear(engine)
    Matter.Composite.clear(engine.world, false)
  }
}

const init = async (loadImages = true) => {
  if (!containerRef.value || !canvasRef.value) return

  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight
  if (width <= 0 || height <= 0) return

  engine = Matter.Engine.create({
    gravity: { x: 0, y: 0.8, scale: 0.001 },
    enableSleeping: true,
  })

  render = Matter.Render.create({
    canvas: canvasRef.value,
    engine,
    options: {
      width,
      height,
      wireframes: false,
      background: 'transparent',
      pixelRatio: window.devicePixelRatio || 1,
    },
  })

  const t = 60
  Matter.Composite.add(engine.world, [
    Matter.Bodies.rectangle(width / 2, -t / 2, width + t * 2, t, { isStatic: true, render: { visible: false } }),
    Matter.Bodies.rectangle(width / 2, height + t / 2, width + t * 2, t, { isStatic: true, render: { visible: false } }),
    Matter.Bodies.rectangle(-t / 2, height / 2, t, height * 2, { isStatic: true, render: { visible: false } }),
    Matter.Bodies.rectangle(width + t / 2, height / 2, t, height * 2, { isStatic: true, render: { visible: false } }),
  ])

  bodySize = Math.min(65, width / 10)

  if (loadImages) {
    imagesCache = await Promise.all(
      props.skills.map((s) => loadImage(props.resolveImg(s.img)))
    )
  }

  const bodies = props.skills.map((skill, i) => {
    const x = Math.random() * (width - bodySize * 2) + bodySize
    const y = bodySize + Math.random() * (height * 0.3)

    return Matter.Bodies.circle(x, y, bodySize / 2, {
      restitution: 0.5,
      friction: 0.3,
      frictionAir: 0.01,
      density: 0.002,
      render: {
        sprite: { texture: '', xScale: 1, yScale: 1 },
      },
      label: skill.titulo,
      plugin: { imageIndex: i },
    })
  })

  Matter.Composite.add(engine.world, bodies)

  const mouse = Matter.Mouse.create(render.canvas)
  mouse.pixelRatio = window.devicePixelRatio || 1
  const mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0.2,
      render: { visible: false },
    },
  })

  Matter.Composite.add(engine.world, mouseConstraint)
  render.mouse = mouse

  let clickStart: { x: number; y: number; time: number } | null = null

  Matter.Events.on(mouseConstraint, 'mousedown', () => {
    clickStart = { x: mouse.position.x, y: mouse.position.y, time: Date.now() }
  })

  Matter.Events.on(mouseConstraint, 'mouseup', () => {
    if (!clickStart) return
    const dx = mouse.position.x - clickStart.x
    const dy = mouse.position.y - clickStart.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    const elapsed = Date.now() - clickStart.time
    if (dist < 10 && elapsed < 300) {
      const hitBody = bodies.find(b => {
        const cdx = mouse.position.x - b.position.x
        const cdy = mouse.position.y - b.position.y
        return Math.sqrt(cdx * cdx + cdy * cdy) <= bodySize / 2
      })
      if (hitBody) emit('skill-click', hitBody.label)
    }
    clickStart = null
  })

  mouse.element.removeEventListener('wheel', (mouse as any).mousewheel)
  mouse.element.removeEventListener('DOMMouseScroll', (mouse as any).mousewheel)

  mouse.element.removeEventListener('touchstart', (mouse as any).mousedown)
  mouse.element.removeEventListener('touchmove', (mouse as any).mousemove)
  mouse.element.removeEventListener('touchend', (mouse as any).mouseup)

  let touchStart: { x: number; y: number; time: number } | null = null

  mouse.element.addEventListener('contextmenu', (e: Event) => {
    e.preventDefault()
  })

  mouse.element.addEventListener('mousedown', wake)
  mouse.element.addEventListener('touchstart', wake, { passive: true })

  mouse.element.addEventListener('touchstart', (e: Event) => {
    const touch = (e as TouchEvent).touches[0]
    if (!touch) return
    const rect = render.canvas.getBoundingClientRect()
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top
    mouse.position.x = x
    mouse.position.y = y
    mouse.button = 0
    touchStart = { x, y, time: Date.now() }
  }, { passive: true })

  mouse.element.addEventListener('touchmove', (e: Event) => {
    const touch = (e as TouchEvent).touches[0]
    if (!touch) return
    const rect = render.canvas.getBoundingClientRect()
    mouse.position.x = touch.clientX - rect.left
    mouse.position.y = touch.clientY - rect.top
    if (mouseConstraint.body) {
      e.preventDefault()
    }
  }, { passive: false })

  mouse.element.addEventListener('touchend', () => {
    mouse.button = -1
    if (touchStart) {
      const ts = touchStart
      const dx = mouse.position.x - ts.x
      const dy = mouse.position.y - ts.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      const elapsed = Date.now() - ts.time
      if (dist < 15 && elapsed < 400) {
        const hitBody = bodies.find(b => {
          const cdx = ts.x - b.position.x
          const cdy = ts.y - b.position.y
          return Math.sqrt(cdx * cdx + cdy * cdy) <= bodySize / 2
        })
        if (hitBody) emit('skill-click', hitBody.label)
      }
      touchStart = null
    }
  }, { passive: true })

  runner = Matter.Runner.create()
  running = false
  syncRunning()

  // Si todas duermen y no hay nada agarrado, se detiene el loop.
  Matter.Events.on(engine, 'afterUpdate', () => {
    if (idle || mouseConstraint.body) return
    // Las que esperan respawn están en static y nunca reportan isSleeping,
    // así que se excluyen o el canvas no volvería a quedarse quieto.
    if (bodies.every((b) => b.isStatic || b.isSleeping)) {
      idle = true
      syncRunning()
    }
  })

  let sphereEscaped = false
  const initTime = Date.now()
  Matter.Events.on(engine, 'beforeUpdate', () => {
    const margin = bodySize * 2
    // Ignora los primeros instantes: al montar o tras un resize las esferas
    // pueden quedar fuera de los nuevos límites sin que nadie las lance.
    const settling = Date.now() - initTime < 1500
    for (const body of bodies) {
      if (respawning.has(body)) continue
      const pos = body.position
      if (pos.x < -margin || pos.x > width + margin || pos.y < -margin || pos.y > height + margin) {
        if (settling) {
          Matter.Body.setPosition(body, {
            x: Math.random() * (width - bodySize * 2) + bodySize,
            y: bodySize,
          })
          Matter.Body.setVelocity(body, { x: 0, y: 0 })
          continue
        }
        respawning.add(body)
        Matter.Body.setStatic(body, true)
        Matter.Body.setVelocity(body, { x: 0, y: 0 })
        Matter.Body.setPosition(body, { x: -width * 4, y: -height * 4 })

        const timer = setTimeout(() => {
          respawnTimers.delete(timer)
          Matter.Body.setStatic(body, false)
          // Dentro del canvas: el muro superior ocupa de -60 a 0, así que
          // reaparecer más arriba la empujaría fuera otra vez.
          Matter.Body.setPosition(body, {
            x: Math.random() * (width - bodySize * 2) + bodySize,
            y: bodySize + Math.random() * (height * 0.3),
          })
          Matter.Body.setVelocity(body, { x: 0, y: 0 })
          Matter.Body.setAngularVelocity(body, 0)
          Matter.Sleeping.set(body, false)
          respawning.delete(body)
          wake()
        }, 3000 + Math.random() * 7000)
        respawnTimers.add(timer)

        if (!sphereEscaped) {
          sphereEscaped = true
          emit('sphere-escaped')
        }
      }
    }
  })

  Matter.Events.on(render, 'afterRender', () => {
    const ctx = render.context
    for (const body of bodies) {
      if (respawning.has(body)) continue
      const idx = (body.plugin as { imageIndex: number }).imageIndex
      const img = imagesCache[idx]
      if (!img || !img.complete || !img.naturalWidth) continue

      const pos = body.position
      const angle = body.angle
      const size = bodySize * 0.75

      ctx.save()
      ctx.translate(pos.x, pos.y)
      ctx.rotate(angle)

      ctx.beginPath()
      ctx.arc(0, 0, bodySize / 2, 0, Math.PI * 2)
      ctx.fillStyle = props.isLightTheme
        ? 'rgba(255, 255, 255, 0.9)'
        : 'rgba(200, 200, 200, 0.9)'
      ctx.fill()
      ctx.strokeStyle = 'rgba(100, 181, 246, 0.3)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(0, 0, bodySize / 2 - 2, 0, Math.PI * 2)
      ctx.clip()
      ctx.drawImage(img, -size / 2, -size / 2, size, size)
      ctx.restore()
    }
  })
}

let resizeTimeout: ReturnType<typeof setTimeout> | null = null

const handleResize = () => {
  if (resizeTimeout) clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(() => {
    destroy()
    init(false)
  }, 200)
}

let resizeObserver: ResizeObserver | null = null

// El motor y el render corrían a 60fps toda la sesión, aunque el canvas
// estuviera fuera de pantalla o tapado por un modal. Un canvas repintando
// bajo un overlay con backdrop-filter obliga a recalcular el desenfoque en
// cada frame, así que se pausa cuando no se ve.
let visible = false
let running = false
// Cuando todas las esferas se duermen no hay nada que animar, así que se
// corta el loop hasta que el usuario interactúe.
let idle = false

const syncRunning = () => {
  const shouldRun = visible && !document.hidden && !idle
  if (shouldRun === running) return
  if (!engine || !render || !runner) return
  running = shouldRun
  if (shouldRun) {
    Matter.Runner.run(runner, engine)
    Matter.Render.run(render)
  } else {
    Matter.Runner.stop(runner)
    Matter.Render.stop(render)
  }
}

const handleVisibilityChange = () => syncRunning()

const wake = () => {
  if (!idle) return
  idle = false
  syncRunning()
}

let visibilityObserver: IntersectionObserver | null = null

const handleFlipGravity = () => {
  if (!engine) return
  const g = engine.gravity
  g.y = -g.y
  // Las dormidas no reaccionan a un cambio de gravedad si nadie las despierta.
  for (const body of Matter.Composite.allBodies(engine.world)) {
    if (!body.isStatic) Matter.Sleeping.set(body, false)
  }
  wake()
  setTimeout(() => {
    if (!engine) return
    engine.gravity.y = -g.y
    for (const body of Matter.Composite.allBodies(engine.world)) {
      if (!body.isStatic) Matter.Sleeping.set(body, false)
    }
    wake()
  }, 5000)
}

onMounted(() => {
  init()
  resizeObserver = new ResizeObserver(handleResize)
  if (containerRef.value) resizeObserver.observe(containerRef.value)

  visibilityObserver = new IntersectionObserver(
    ([entry]) => {
      visible = !!entry?.isIntersecting
      syncRunning()
    },
    { threshold: 0 }
  )
  if (containerRef.value) visibilityObserver.observe(containerRef.value)

  document.addEventListener('visibilitychange', handleVisibilityChange)
  window.addEventListener('flip-gravity', handleFlipGravity)
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  visibilityObserver?.disconnect()
  if (resizeTimeout) clearTimeout(resizeTimeout)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  window.removeEventListener('flip-gravity', handleFlipGravity)
  destroy()
})

watch(() => props.isLightTheme, () => {
  // theme change handled in afterRender
})
</script>

<style scoped>
.physics-container {
  width: 100%;
  height: 400px;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  border: 1px solid rgba(100, 181, 246, 0.1);
  margin-top: 2rem;
  cursor: grab;
}

.physics-container:active {
  cursor: grabbing;
}

.physics-container canvas {
  width: 100% !important;
  height: 100% !important;
  display: block;
  touch-action: pan-y;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}

@media (max-width: 768px) {
  .physics-container {
    height: 300px;
  }
}
</style>
