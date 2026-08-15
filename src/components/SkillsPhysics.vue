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

const containerRef = ref<HTMLDivElement>()
const canvasRef = ref<HTMLCanvasElement>()

let engine: Matter.Engine
let render: Matter.Render
let runner: Matter.Runner
let mouse: Matter.Mouse
let mouseConstraint: Matter.MouseConstraint

const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = () => resolve(img)
    img.src = src
  })
}

const init = async () => {
  if (!containerRef.value || !canvasRef.value) return

  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight

  engine = Matter.Engine.create({
    gravity: { x: 0, y: 0.8, scale: 0.001 },
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

  const wallThickness = 60
  const walls = [
    Matter.Bodies.rectangle(width / 2, -wallThickness / 2, width + wallThickness * 2, wallThickness, { isStatic: true, render: { visible: false } }),
    Matter.Bodies.rectangle(width / 2, height + wallThickness / 2, width + wallThickness * 2, wallThickness, { isStatic: true, render: { visible: false } }),
    Matter.Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, { isStatic: true, render: { visible: false } }),
    Matter.Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, { isStatic: true, render: { visible: false } }),
  ]

  Matter.Composite.add(engine.world, walls)

  const bodySize = Math.min(55, width / 12)
  const images = await Promise.all(
    props.skills.map((s) => loadImage(props.resolveImg(s.img)))
  )

  const bodies = props.skills.map((skill, i) => {
    const x = Math.random() * (width - bodySize * 2) + bodySize
    const y = bodySize + Math.random() * (height * 0.3)

    return Matter.Bodies.circle(x, y, bodySize / 2, {
      restitution: 0.5,
      friction: 0.3,
      frictionAir: 0.01,
      density: 0.002,
      render: {
        sprite: {
          texture: '',
          xScale: 1,
          yScale: 1,
        },
      },
      label: skill.titulo,
      plugin: { imageIndex: i },
    })
  })

  Matter.Composite.add(engine.world, bodies)

  mouse = Matter.Mouse.create(render.canvas)
  mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0.2,
      render: { visible: false },
    },
  })

  Matter.Composite.add(engine.world, mouseConstraint)
  render.mouse = mouse

  mouse.element.removeEventListener('wheel', (mouse as any).mousewheel)
  mouse.element.removeEventListener('DOMMouseScroll', (mouse as any).mousewheel)

  mouse.element.removeEventListener('touchstart', (mouse as any).mousedown)
  mouse.element.removeEventListener('touchmove', (mouse as any).mousemove)
  mouse.element.removeEventListener('touchend', (mouse as any).mouseup)

  mouse.element.addEventListener('touchstart', (e: Event) => {
    const touch = (e as TouchEvent).touches[0]
    if (!touch) return
    const rect = render.canvas.getBoundingClientRect()
    mouse.position.x = touch.clientX - rect.left
    mouse.position.y = touch.clientY - rect.top
    mouse.button = 0
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
  }, { passive: true })

  runner = Matter.Runner.create()
  Matter.Runner.run(runner, engine)
  Matter.Render.run(render)

  Matter.Events.on(render, 'afterRender', () => {
    const ctx = render.context
    for (const body of bodies) {
      const idx = (body.plugin as { imageIndex: number }).imageIndex
      const img = images[idx]
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
        : 'rgba(26, 26, 26, 0.9)'
      ctx.fill()
      ctx.strokeStyle = props.isLightTheme
        ? 'rgba(100, 181, 246, 0.3)'
        : 'rgba(100, 181, 246, 0.2)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      ctx.drawImage(img, -size / 2, -size / 2, size, size)
      ctx.restore()
    }
  })
}

const handleResize = () => {
  if (!containerRef.value || !render) return
  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight
  render.canvas.width = width * (window.devicePixelRatio || 1)
  render.canvas.height = height * (window.devicePixelRatio || 1)
  render.options.width = width
  render.options.height = height

  const walls = Matter.Composite.allBodies(engine.world).filter((b) => b.isStatic)
  for (const w of walls) Matter.Composite.remove(engine.world, w)

  const wallThickness = 60
  Matter.Composite.add(engine.world, [
    Matter.Bodies.rectangle(width / 2, -wallThickness / 2, width + wallThickness * 2, wallThickness, { isStatic: true, render: { visible: false } }),
    Matter.Bodies.rectangle(width / 2, height + wallThickness / 2, width + wallThickness * 2, wallThickness, { isStatic: true, render: { visible: false } }),
    Matter.Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, { isStatic: true, render: { visible: false } }),
    Matter.Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, { isStatic: true, render: { visible: false } }),
  ])
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  init()
  resizeObserver = new ResizeObserver(handleResize)
  if (containerRef.value) resizeObserver.observe(containerRef.value)
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  if (render) Matter.Render.stop(render)
  if (runner) Matter.Runner.stop(runner)
  if (engine) Matter.Engine.clear(engine)
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
}

@media (max-width: 768px) {
  .physics-container {
    height: 300px;
  }
}
</style>
