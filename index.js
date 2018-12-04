// 坐标计算
// (a, b) 圆心坐标， r 圆半径， d 度数
function makeLocation(a, b, r, d) {
  let x = parseInt(a + Math.sin(2 * d * Math.PI / 360) * r)
  let y = parseInt(b + Math.cos(2 * d * Math.PI / 360) * r)
  return {x: x, y: y}
}

// 画图, 注：list 数组长度必须大于3
function canvasData(list) {
  if (!Array.isArray(list)){
    return
  }
  var maxScore = Math.max.apply(null,list)
  if (maxScore) {
    if ((maxScore%10) != 0) {
      maxScore = maxScore + 10 - maxScore%10
    }
  }
  var d = 141;
  var r = d / 2;    // 半径
  var lineWidth = 1
  var img = new Image();
  img.src = 'assets/radar-bg.png';
  img.onload = function () {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    let newScore = []
    for (var i = 0; i < list.length; i++) {
      newScore.push(parseInt(list[i] * r / maxScore))
    }
    // 默认背景
    ctx.scale(2, 2)
    ctx.rect(0, 0, d, d);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    // 圆圈
    ctx.drawImage(img, 0, 0, 282, 282, 0, 0, d, d)

    // 画背景线
    ctx.beginPath()
    ctx.strokeStyle = "#B5DCFF"
    ctx.lineWidth = "1"
    let len = newScore.length

    ctx.moveTo(0, r) // 已中上点为基准点
    let degree = 360 / len

    for (let i = 0; i< len; i++) {
      let _d = degree * (i + 1)
      let _loca1 = makeLocation(r, r, r, _d)
      ctx.moveTo(_loca1.x, _loca1.y)
      ctx.lineTo(r, r)
    }
    
    ctx.closePath()
    ctx.stroke()
    
    // 背景线画完，开始画填充背景线
    ctx.beginPath()
    let _locat = makeLocation(r, r, newScore[0], degree)
    ctx.moveTo(_locat.x, _locat.y)

    for (let i = 0; i< len; i++) {
      let _d = degree * (i + 1)
      let _loca2 = makeLocation(r, r, newScore[i], _d)
      ctx.lineTo(_loca2.x, _loca2.y)
    }

    // 背景填充完，结束路径
    ctx.closePath()
    ctx.fillStyle = "rgba(0,135,255,.5)";
    ctx.fill();
    ctx.stroke();
  }
}
