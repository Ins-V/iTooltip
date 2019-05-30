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
    this.tooltip.style.left = `${event.clientX + this.settings.indentX}px`
    this.tooltip.style.top = `${event.clientY + this.settings.indentY}px`
    elem.removeAttribute('title')

    document.body.appendChild(this.tooltip)

    elem.addEventListener('mousemove', event => this.moved(event))
  }

  removeTooltip (event) {
    event.target.setAttribute('title', this.tooltip.innerHTML)
    this.tooltip.remove()
  }

  moved (event) {
    const [tooltipWidth, tooltipHeight] = this.getSizeTooltip()
    const rightEdge = document.documentElement.clientWidth - event.clientX
    const bottomEdge = document.documentElement.clientHeight - event.clientY

    if (rightEdge <= tooltipWidth) {
      this.tooltip.style.left = null
      this.tooltip.style.right = `${rightEdge + this.settings.indentX}px`
    } else {
      this.tooltip.style.right = null
      this.tooltip.style.left = `${event.clientX + this.settings.indentX}px`
    }

    if (bottomEdge <= tooltipHeight) {
      this.tooltip.style.top = null
      this.tooltip.style.bottom = `${bottomEdge}px`
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
}

module.exports = iTooltip
