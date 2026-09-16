for (const stage of document.querySelectorAll<HTMLElement>('[data-showcase]')) {
  const tablist = stage.querySelector<HTMLElement>('[data-stage-tabs]')!
  const tabs = [...stage.querySelectorAll<HTMLButtonElement>('[data-stage-tab]')]
  const panels = [...stage.querySelectorAll<HTMLElement>('[data-stage-panel]')]
  function select(index: number, focus = false) {
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index))
      tab.tabIndex = i === index ? 0 : -1
      panels[i].hidden = i !== index
    })
    if (focus) tabs[index].focus()
  }
  tablist.setAttribute('role', 'tablist')
  tabs.forEach((tab, index) => {
    tab.setAttribute('role', 'tab')
    tab.setAttribute('aria-controls', panels[index].id)
    panels[index].setAttribute('role', 'tabpanel')
    panels[index].setAttribute('aria-labelledby', tab.id)
    panels[index].tabIndex = 0
    tab.addEventListener('click', () => select(index))
    tab.addEventListener('keydown', (event) => {
      const next = event.key === 'ArrowRight' ? (index + 1) % tabs.length
        : event.key === 'ArrowLeft' ? (index + tabs.length - 1) % tabs.length
        : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : null
      if (next !== null) { event.preventDefault(); select(next, true) }
    })
  })
  select(0)
  tablist.hidden = false
  stage.dataset.enhanced = 'true'
}
