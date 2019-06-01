# iTooltip
The JavaScript library let’s you transform native tooltip’s into customizable overlays.

## Use:
```html
<script src="/path/to/iTooltip.js"></script>
<script>
    var tooltip = new iTooltip();
    tooltip.init();
</script>
```

### Change selector:
```js
var tooltip = new iTooltip('.my-selector')
tooltip.init()
```

### Set options:
```js
var tooltip = new iTooltip()
tooltip.init({
    className: 'my-class-name',
    indentX: 3,
    indentY: 3,
    positionX: 'left',
    positionY: 'center'
})
```

### Options:
* **className** - Sets the class name for a block with a hint. Default: 'tooltip';
* **indentX** - Horizontal indent from the cursor (in pixels). Default: 10;
* **indentY** - Vertical indent from the cursor (in pixels). Default: 15;
* **positionX** - The initial position of the tooltip horizontally. Default: 'right'. Variants: 'left', 'right', 'center';
* **positionY** - The initial position of the tooltip vertically. Default: 'bottom'. Variants: 'top', 'bottom', 'center';

> **WARNING!**
positionX and positionY can not simultaneously have the value "center".

### Change the style for the tooltip:
```css
.tooltip { /* or your class if changed */
    background-color: #282c34;
    color: #98c379;
    /* other styles */
}
```