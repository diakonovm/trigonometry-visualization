const canvas = document.getElementById("chart");
const ctx = canvas.getContext('2d')
const offset = {
  x: canvas.width / 2,
  y: canvas.width / 2 
}

const A = { x: 0, y: 0 }
const B = { x: 0, y: 0 }
const C = { x: 0, y: 0 }

init()

function init() {
  ctx.translate(offset.x, offset.y)
  layoutCoordinateSystem(ctx, offset)

  canvas.onmousemove = (event) => {
    B.x = event.offsetX - offset.x
    B.y = event.offsetY - offset.y
  
    C.x = B.x
  
    update()
  }
}

function update() {
  ctx.clearRect(-offset.x, -offset.y, canvas.width, canvas.height)
  layoutCoordinateSystem(ctx, offset)

  drawPoint(ctx, 10, A)
  drawPoint(ctx, 10, B)
  drawPoint(ctx, 10, C)

  drawText(ctx, 'A', A)
  drawText(ctx, 'B', B)
  drawText(ctx, 'C', C)

  drawLine(ctx, C, B)
  drawLine(ctx, C, A)
  drawLine(ctx, A, B)

  const sin = distance(C, B) / distance(A, B)
  const cos = distance(A, C) / distance(A, B)
  const rad = Math.asin(sin)
  const deg = rad * 180 / Math.PI
  

  drawText(ctx, `sin: ${sin.toFixed(3)}`, { x: canvas.width / 4, y: canvas.height / 4 }, 'red')
  drawText(ctx, `cos: ${cos.toFixed(3)}`, { x: canvas.width / 4, y: canvas.height / 4 + 25 }, 'blue')
  drawText(ctx, `deg/rad: ${deg.toFixed(0).toString().padStart(2)}/${rad.toFixed(2)}`, { x: canvas.width / 4, y: canvas.height / 4 + 50 })
}

/**
 * Distance between coordinates
 * @param {Object} p1 
 * @param {Object} p2 
 * @returns 
 */
function distance(p1, p2) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y)
}

/**
 * Draw a line from coordinate to coordinate
 * @param {Object} context
 * @param {Object} p1
 * @param {Object} p2
 * @param {String} color 
 */
function drawLine(context, p1, p2, color = 'black') {
  context.beginPath()
  context.lineWidth = 1
  context.strokeStyle = color

  context.moveTo(p1.x, p1.y)
  context.lineTo(p2.x, p2.y)

  context.stroke()
}

/**
 * Draw a point at the specified coordinate
 * @param {Object} context 
 * @param {Number} size 
 * @param {Object} p 
 * @param {String} color 
 */
function drawPoint(context, size = 20, p, color = 'black') {
  context.beginPath()
  context.fillStyle = color
  context.arc(p.x, p.y, size / 2, 0, Math.PI * 2)
  context.fill()
}

/**
 * Draw text at specified coorindate
 * @param {Object} context 
 * @param {String} text 
 * @param {Object} p 
 * @param {String} color 
 */
function drawText(context, text, p, color = 'black') {
  context.beginPath()
  context.fillStyle = color
  context.textAlign = "center"
  context.textBaseline = "middle"
  context.font = "bold 18px Courier"
  context.strokeStyle = "white"
  context.lineWidth = 7
  context.strokeText(text, p.x, p.y)
  context.fillText(text, p.x, p.y)
}

/**
 * Layout the cartesian plane
 * @param {Obect} context
 * @param {Object} offset 
 */
function layoutCoordinateSystem(context, offset) {
  context.beginPath()
  context.lineWidth = 1
  context.strokeStyle = "lightgray"
  context.setLineDash([4, 2])

  context.moveTo(-offset.x, 0)
  context.lineTo(offset.x, 0)
  context.moveTo(0, -offset.y)
  context.lineTo(0, offset.y)
  
  context.stroke()

  context.setLineDash([])  

  drawPoint(context, 10, { x: 0, y: 0 })
}




