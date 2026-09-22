// The story needs a long scroll runway to play its journey on the way down —
// but that runway is dead space on the way back up, where the scene is parked
// on its opening view. So it collapses once the visitor has passed it: the page
// follows by as much as it shrank, nothing moves on screen, and climbing back
// takes one screen instead of five.
const SHORT = { height: '130vh', min: '900px' }

export function createRunway(node) {
  // Read the starting state off the element, so a remount picks up where the
  // page actually is rather than assuming a full runway.
  let collapsed = node.style.getPropertyValue('--story-height') === SHORT.height
  return short => {
    if (short === collapsed) return
    const height = node.offsetHeight
    // Read the scroll position before the change: browsers that anchor scroll
    // move it themselves, and an absolute target lands right either way.
    const anchor = window.scrollY
    node.style.setProperty('--story-height', short ? SHORT.height : '')
    node.style.setProperty('--story-min', short ? SHORT.min : '')
    const delta = node.offsetHeight - height
    // Only the collapse can move what the visitor is looking at: it happens
    // with the story above the viewport, so follow the page up. Growing it back
    // always happens with the runway below the fold. (On small screens and with
    // reduced motion the stylesheet lets the story flow: nothing changes here.)
    if (delta && short) {
      const root = document.documentElement
      const behavior = root.style.scrollBehavior
      root.style.scrollBehavior = 'auto'   // the page scrolls smoothly by default
      window.scrollTo(0, anchor + delta)
      root.style.scrollBehavior = behavior
    }
    collapsed = short
  }
}

export function createHouseScrollProgress(setRunway = () => {}) {
  let reached = 0
  let returning = false

  return (rect, viewportHeight) => {
    // Passed the story: park on the opening view and shorten the runway.
    if (rect.bottom <= 0) {
      reached = 0
      returning = true
      setRunway(true)
      return 0
    }
    // Still below, or back above the start: the full runway waits.
    if (rect.top >= viewportHeight) {
      reached = 0
      returning = false
      setRunway(false)
      return 0
    }
    // Climbing back through it: keep the opening view. Only a fresh descent
    // from the start plays the journey again.
    if (returning) {
      if (rect.top < 0) return 0
      returning = false
      setRunway(false)
    }

    const progress = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - viewportHeight)))
    reached = Math.max(reached, progress)
    return reached
  }
}
