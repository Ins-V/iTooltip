export default class iTooltip {
    constructor (selector=false) {
        if (!selector || selector === '*') {
            selector = '*[title]'
        }

        this.objects = document.querySelectorAll(selector)
    }

    init (options={}) {
        let defaultOptions = {
            className: 'tooltip',
            indentX: 10,
            indentY: 15
        }

        this.settings = Object.assign(defaultOptions, options)

        this.objects.forEach(obj => {
            obj.addEventListener('mouseenter', event => this.createTooltip(event))
            obj.addEventListener('mouseleave', event => this.removeTooltip(event))
        })
    }

    createTooltip (event) {
        let elem = event.target
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
        let tooltipClientRect = this.tooltip.getBoundingClientRect()
        let tooltipWidth = tooltipClientRect.right - tooltipClientRect.left,
            tooltipHeight = tooltipClientRect.bottom - tooltipClientRect.top,
            rightEdge = document.documentElement.clientWidth - event.clientX,
            bottomEdge = document.documentElement.clientHeight - event.clientY
        
        if (rightEdge <= tooltipWidth) {
            this.tooltip.style.left = null
            this.tooltip.style.right = `${rightEdge - this.settings.indentX}px`
        } else {
            this.tooltip.style.right = null
            this.tooltip.style.left = `${event.clientX - this.settings.indentX}px`
        }

        if (bottomEdge <= tooltipHeight) {
            this.tooltip.style.top = null
            this.tooltip.style.bottom = `${bottomEdge}px`
        } else {
            this.tooltip.style.bottom = null
            this.tooltip.style.top = `${event.clientY - this.settings.indentY}px`
        }
    }
}

let tooltip = new iTooltip()
tooltip.init()
