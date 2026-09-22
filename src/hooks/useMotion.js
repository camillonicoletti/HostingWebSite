import { useEffect } from 'react'
import { createHouseScrollProgress, createRunway } from '../lib/houseScroll.js'

export default function useMotion() {
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const scenes = [...document.querySelectorAll('[data-scroll-scene]')]
    const houseProgress = new Map(scenes.filter(node => node.hasAttribute('data-house-scroll')).map(node => [node, createHouseScrollProgress(createRunway(node))]))
    const reveals = [...document.querySelectorAll('[data-reveal]')]
    let frame = 0
    const update = () => {
      frame = 0
      const reduced = media.matches
      const height = window.innerHeight
      const readings = scenes.map(node => ({ node, rect: node.getBoundingClientRect() }))
      readings.forEach(({ node, rect }) => {
        const progress = reduced ? 1 : houseProgress.has(node)
          ? houseProgress.get(node)(rect, height)
          : Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - height)))
        const arrival = reduced ? 1 : Math.max(0, Math.min(1, (height - rect.top) / (height * 1.15)))
        const previous = node.style.getPropertyValue('--progress')
        node.style.setProperty('--progress', progress.toFixed(4))
        node.style.setProperty('--arrival', arrival.toFixed(4))
        node.dataset.stage = String(Math.min(2, Math.floor(progress * 3)))
        // Notify the renderer after writing progress, including offscreen resets.
        if (houseProgress.has(node) && previous !== progress.toFixed(4)) node.dispatchEvent(new Event('sceneprogress'))
      })
      document.documentElement.style.setProperty('--page-progress', String(window.scrollY / Math.max(1, document.documentElement.scrollHeight - height)))
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) }
    }), { threshold: .1 })
    reveals.forEach(node => observer.observe(node))
    const preference = () => {
      if (media.matches) reveals.forEach(node => node.classList.add('is-visible'))
      schedule()
    }
    preference()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    media.addEventListener('change', preference)
    update()
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      media.removeEventListener('change', preference)
    }
  }, [])
}
