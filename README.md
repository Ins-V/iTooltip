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
    indentY: 3
})
```

### Options:
* **className** - Sets the class name for a block with a hint. Default: 'tooltip';
* **indentX** - Horizontal indent from the cursor (in pixels). Default: 10;
* **indentY** - Vertical indent from the cursor (in pixels). Default: 15;
