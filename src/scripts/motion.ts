// The page is fully visible and still until this progressive enhancement runs.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
const regions = [...document.querySelectorAll<HTMLElement>('[data-motion]')]
const controls = [...document.querySelectorAll<HTMLButtonElement>('[data-motion-toggle]')]
const visibleRegions = new Set<Element>()
let paused = false

function syncMotion() {
  for (const region of regions) {
    const playing = !paused && !reducedMotion.matches && !document.hidden && visibleRegions.has(region)
    region.style.setProperty('--ambient-play-state', playing ? 'running' : 'paused')
  }
  for (const button of controls) {
    button.textContent = reducedMotion.matches ? 'Reduced motion' : paused ? 'Play animation' : 'Pause animation'
    button.disabled = reducedMotion.matches
    button.setAttribute('aria-label', reducedMotion.matches ? 'System reduced motion is enabled' : paused ? 'Play animation' : 'Pause animation')
  }
}

const reveals = [...document.querySelectorAll<HTMLElement>('[data-reveal]')]
// Unsupported browsers keep the static page.
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      entry.target.classList.add('is-revealed')
      revealObserver.unobserve(entry.target)
    }
  }, { threshold: 0.08 })

  // Only below-viewport elements wait for a reveal; first-screen content never
  // flashes from visible to hidden while the script is loading.
  for (const element of reveals) {
    if (element.getBoundingClientRect().top >= window.innerHeight && !reducedMotion.matches) {
      element.classList.add('reveal-pending')
      revealObserver.observe(element)
    } else {
      element.classList.add('reveal-enter')
    }
    element.addEventListener('focusin', () => {
      element.classList.add('is-revealed')
      revealObserver.unobserve(element)
    }, { once: true })
  }

  const motionObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) visibleRegions.add(entry.target)
      else visibleRegions.delete(entry.target)
    }
    syncMotion()
  })
  regions.forEach((region) => motionObserver.observe(region))
  controls.forEach((button) => {
    button.hidden = false
    button.addEventListener('click', () => { paused = !paused; syncMotion() })
  })

  document.addEventListener('visibilitychange', syncMotion)
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) {
      reveals.forEach((element) => element.classList.add('is-revealed'))
      revealObserver.disconnect()
    }
    syncMotion()
  })
  syncMotion()
}
