const chart = document.getElementById("chart");
const chartContext = chart.getContext('2d')
const chartOffset = {
  x: chart.width / 2,
  y: chart.height / 2 
}

const graph = document.getElementById("graph")
const graphContext = graph.getContext('2d')
const graphOffset = {
  x: graph.width / 2,
  y: graph.height / 2
}

const A = { x: 0, y: 0 }
const B = { x: 0, y: 0 }
const C = { x: 0, y: 0 }

setup()

function setup() {
  // NOTE: Chart
  chartContext.translate(chartOffset.x, chartOffset.y)
  layoutCoordinateSystem(chartContext, chartOffset)

  chart.onmousemove = (event) => {
    B.x = event.offsetX - chartOffset.x
    B.y = event.offsetY - chartOffset.y
  
    C.x = B.x
  
    update()
  }

  // NOTE: Graph
  graphContext.translate(graphOffset.x, graphOffset.y)
  layoutCoordinateSystem(graphContext, graphOffset)
}

function update() {
  // NOTE: Chart
  chartContext.clearRect(-chartOffset.x, -chartOffset.y, chart.width, chart.height)
  layoutCoordinateSystem(chartContext, chartOffset)

  drawPoint(chartContext, 10, A)
  drawPoint(chartContext, 10, B)
  drawPoint(chartContext, 10, C)

  drawText(chartContext, 'A', A)
  drawText(chartContext, 'B', B)
  drawText(chartContext, 'C', C)

  drawLine(chartContext, C, B, 'red')
  drawLine(chartContext, C, A, 'blue')
  drawLine(chartContext, A, B)

  const sin = distance(C, B) / distance(A, B)
  const cos = distance(A, C) / distance(A, B)
  const tan = sin / cos

  const rad = Math.asin(sin)
  const deg = rad * 180 / Math.PI
  
  drawText(chartContext, `sin: ${sin.toFixed(3)}`, { x: chart.width / 4, y: chart.height / 4 }, 'red')
  drawText(chartContext, `cos: ${cos.toFixed(3)}`, { x: chart.width / 4, y: chart.height / 4 + 25 }, 'blue')
  drawText(chartContext, `tan: ${tan.toFixed(3)}`, { x: chart.width / 4, y: chart.height / 4 + 50 })
  drawText(chartContext, `deg/rad: ${deg.toFixed(0).toString().padStart(2)}/${rad.toFixed(2)}`, { x: chart.width / 4, y: chart.height / 4 + 75 })

  // NOTE: Graph
  
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
  context.font = "bold 14px Courier"
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
}




