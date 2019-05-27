var iTooltip=function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(o,i,function(e){return t[e]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="js/",n(n.s=0)}([function(t,e){function n(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var o=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"*";!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t);var n="*[title]";"*"!==e&&(n=e),this.objects=document.querySelectorAll(n)}var e,o,i;return e=t,(o=[{key:"init",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.settings=Object.assign({className:"tooltip",indentX:10,indentY:15},e),this.objects.forEach(function(e){e.getAttribute("title")&&(e.addEventListener("mouseenter",function(e){return t.createTooltip(e)}),e.addEventListener("mouseleave",function(e){return t.removeTooltip(e)}))})}},{key:"createTooltip",value:function(t){var e=this,n=t.target;this.tooltip=document.createElement("div"),this.tooltip.classList.add(this.settings.className),this.tooltip.innerHTML=n.getAttribute("title"),this.tooltip.style.position="absolute",this.tooltip.style.left="".concat(t.clientX+this.settings.indentX,"px"),this.tooltip.style.top="".concat(t.clientY+this.settings.indentY,"px"),n.removeAttribute("title"),document.body.appendChild(this.tooltip),n.addEventListener("mousemove",function(t){return e.moved(t)})}},{key:"removeTooltip",value:function(t){t.target.setAttribute("title",this.tooltip.innerHTML),this.tooltip.remove()}},{key:"moved",value:function(t){var e=this.tooltip.getBoundingClientRect(),n=e.right-e.left,o=e.bottom-e.top,i=document.documentElement.clientWidth-t.clientX,l=document.documentElement.clientHeight-t.clientY;i<=n?(this.tooltip.style.left=null,this.tooltip.style.right="".concat(i+this.settings.indentX,"px")):(this.tooltip.style.right=null,this.tooltip.style.left="".concat(t.clientX+this.settings.indentX,"px")),l<=o?(this.tooltip.style.top=null,this.tooltip.style.bottom="".concat(l,"px")):(this.tooltip.style.bottom=null,this.tooltip.style.top="".concat(t.clientY+this.settings.indentY,"px"))}}])&&n(e.prototype,o),i&&n(e,i),t}();t.exports=o}]);