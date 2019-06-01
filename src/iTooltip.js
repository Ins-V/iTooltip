class DoubleCenterException {
  constructor () {
    const msg = 'iTooltip Error: positionX and positionY properties cannot be "center" at the same time.'
    window.console.error(msg)
  }
}

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

    if (this.settings.positionX === 'center'
        && this.settings.positionY === 'center') { throw new DoubleCenterException() }

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
    this.changePosition(event)
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
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    let horizontalPosition = event.pageY
    let verticalPosition = event.pageX

    if (this.settings.positionX === 'right') {
      verticalPosition = (edges.right <= tooltipWidth)
        ? event.clientX - tooltipWidth - this.settings.indentX
        : event.clientX + this.settings.indentX
    } else if (this.settings.positionX === 'left') {
      verticalPosition = (edges.left <= tooltipWidth)
        ? edges.left + this.settings.indentX
        : event.clientX - tooltipWidth - this.settings.indentX
    } else {
      verticalPosition = (edges.left <= Math.round(tooltipWidth / 2))
        ? event.clientX - edges.left
        : event.clientX - Math.round(tooltipWidth / 2)
    }

    if (this.settings.positionY === 'top') {
      horizontalPosition = (edges.top <= tooltipHeight)
        ? scrollTop + event.clientY + this.settings.indentY
        : event.pageY - tooltipHeight - this.settings.indentY
    } else if (this.settings.positionY === 'bottom') {
      horizontalPosition = (edges.bottom < tooltipHeight
        && edges.top > (tooltipHeight + this.settings.indentY))
        ? event.pageY - tooltipHeight - this.settings.indentY
        : scrollTop + event.clientY + this.settings.indentY
    } else {
      let half = Math.round(tooltipHeight / 2)

      if (edges.bottom <= half) {
        half = Math.round(tooltipHeight - edges.bottom)
      }
      if (edges.top <= half) { half = edges.top }

      horizontalPosition -= half
    }

    this.tooltip.style.top = `${horizontalPosition}px`
    this.tooltip.style.left = `${verticalPosition}px`
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

    return {
      left: event.clientX,
      right: docElement.clientWidth - event.clientX,
      top: event.clientY,
      bottom: docElement.clientHeight - event.clientY,
    }
  }
}

module.exports = iTooltip
