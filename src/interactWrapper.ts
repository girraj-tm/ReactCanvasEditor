import interact from "@interactjs/interact";

function dragMoveListener(event: any) {
  var target = event.target;
  if (!target) {
    return;
  }
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform = target.style.transform =
    "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

const resizeListener = (event: any) => {
  const target = event.target;
  if (!target) {
    return;
  }
  let x = parseFloat(target.getAttribute("data-x")) || 0;
  let y = parseFloat(target.getAttribute("data-y")) || 0;

  // update the element's style
  target.style.width = event.rect.width + "px";
  target.style.height = event.rect.height + "px";

  // translate when resizing from top or left edges
  x += event.deltaRect.left;
  y += event.deltaRect.top;

  target.style.webkitTransform = target.style.transform =
    "translate(" + x + "px," + y + "px)";

  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
};

export function setupInteractable(item, callback: (event) => void) {
  item.resizable({
    // resize from all edges and corners
    edges: {
      left: ".left-handle",
      right: ".right-handle",
      bottom: ".bottom-handle",
      top: ".top-handle"
    },

    listeners: {
      move: resizeListener,
      end: (event) => callback?.(event)
    },
    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: "parent"
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: {
          width: 100,
          height: 50
        }
      })
    ],

    inertia: true
  });

  item.draggable({
    listeners: {
      move: dragMoveListener,
      end: (event) => callback?.(event)
    },
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: "parent"
      })
    ]
  });
}
