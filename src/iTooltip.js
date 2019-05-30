class iTooltip {
  constructor (selector = '*') {
    const qs = (selector !== '*') ? selector : '*[title]'
    this.objects = document.querySelectorAll(qs)
  }

  init (options = {}) {
    const defaultOptions = {
      className: 'tooltip', // Changes the class name for a block.
      indentX: 10, // Horizontal indent.
      indentY: 15, // Vertical indent.
      positionX: 'right', // Start horizontal position. Variants: left, center, right
      positionY: 'bottom', // Start vertical position. Variants: top, center, bottom
    }

    this.settings = Object.assign(defaultOptions, options)

    this.objects.forEach((obj) => {
      if (obj.getAttribute('title')) {
        obj.addEventListener('mouseenter', event => this.createTooltip(event))
        obj.addEventListener('mouseleave', event => this.removeTooltip(event))
      }
    })
  }

  createTooltip (event) {
    const elem = event.target
    this.tooltip = document.createElement('div')
    this.tooltip.classList.add(this.settings.className)
    this.tooltip.innerHTML = elem.getAttribute('title')
    this.tooltip.style.position = 'absolute'
    // this.tooltip.style.left = `${event.clientX + this.settings.indentX}px`
    // this.tooltip.style.top = `${event.clientY + this.settings.indentY}px`
    elem.removeAttribute('title')

    document.body.appendChild(this.tooltip)

    elem.addEventListener('mousemove', event => this.changePosition(event))
  }

  removeTooltip (event) {
    event.target.setAttribute('title', this.tooltip.innerHTML)
    this.tooltip.remove()
  }

  changePosition (event) {
    const [tooltipWidth, tooltipHeight] = this.getSizeTooltip()
    const edges = this.getEdges(event)

    if (edges.right <= tooltipWidth) {
      this.tooltip.style.left = null
      this.tooltip.style.right = `${edges.right + this.settings.indentX}px`
    } else {
      this.tooltip.style.right = null
      this.tooltip.style.left = `${event.clientX + this.settings.indentX}px`
    }

    if (edges.bottom <= tooltipHeight) {
      this.tooltip.style.top = null
      this.tooltip.style.bottom = `${edges.bottom}px`
    } else {
      this.tooltip.style.bottom = null
      this.tooltip.style.top = `${event.clientY + this.settings.indentY}px`
    }
  }

  getSizeTooltip () {
    const tooltipClientRect = this.tooltip.getBoundingClientRect()
    const tooltipWidth = tooltipClientRect.right - tooltipClientRect.left
    const tooltipHeight = tooltipClientRect.bottom - tooltipClientRect.top

    return [
      tooltipWidth,
      tooltipHeight,
    ]
  }

  getEdges = (event) => {
    const docElement = document.documentElement
    const left = event.clientX
    const right = docElement.clientWidth - event.clientX
    const top = event.clientY
    const bottom = docElement.clientHeight - event.clientY

    return {
      left,
      right,
      top,
      bottom,
    }
  }
}

module.exports = iTooltip
