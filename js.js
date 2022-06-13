let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

canvas.width = "900";
canvas.height = "900";
canvas.block = "block";

let cord = [];

// добавление нового свойства для блоков с цветоами, для обработчика событий
let divColor = document.querySelectorAll(".colorDiv");
divColor.forEach((item) => {
  item.myName = "blockColor";
});

//  добавление обработчика события по изменению цвета линии
function hoverDiv() {
  let arrColor = ["black", "red", "green"];
  let parent = document.querySelector(".color");
  let divColor = document.querySelectorAll(".colorDiv");

  parent.addEventListener("click", function (e) {
    if (e.target && e.target.myName === "blockColor") {
      divColor.forEach(function (etem, i) {
        etem.classList.remove("border");

        if (e.target == etem) {
          // линия
          ctx.fillStyle = arrColor[i];
          // круг
          ctx.strokeStyle = arrColor[i];
        }
      });

      e.target.classList.add("border");
    }
  });
}
hoverDiv();

// document.addEventListener("click", function (e) {
//   console.dir(e.target);
// })

class ColorPaint {
  constructor(selectorCanvas, inputSelectorWidth, myRangeText, cord) {
    this.canvas = document.querySelector(selectorCanvas);
    this.ctx = canvas.getContext("2d");
    this.isMouseDown;
    this.inputValueWidth = document.querySelector(inputSelectorWidth);
    this.lineWid = myRangeText.innerHTML;
    this.parentMargin = canvas.parentElement.getBoundingClientRect();
    this.myRangeText = document.querySelector(myRangeText);
    this.cords = cord;
  }

  // добавляет текущую толщину линии на стараницу в виде текста
  lineW() {
    let that = this;
    this.inputValueWidth.addEventListener("input", function () {
      that.lineWid = +that.inputValueWidth.value;
      that.myRangeText.innerHTML = that.lineWid;
    });
  }

  // mousedown и mouseup лайфхак, при добавлении которого в массив не пушатся
  // координаты без нажатия мыши
  mousedown() {
    let that = this;
    this.canvas.addEventListener("mousedown", function () {
      that.isMouseDown = true;
    });
  }

  mouseup() {
    let that = this;
    this.canvas.addEventListener("mouseup", function () {
      that.isMouseDown = false;
      that.ctx.beginPath();
      that.cords.push("mouseup");
    });
  }

  mousemove() {
    let that = this;
    this.canvas.addEventListener("mousemove", function (e) {
      that.ctx.lineWidth = that.lineWid;
      if (that.isMouseDown) {
        that.cords.push([
          e.clientX - that.parentMargin.left,
          e.clientY - that.parentMargin.top,
          // test
          that.lineWid,
          that.ctx.fillStyle,
          that.ctx.strokeStyle
          // 
        ]);
        that.ctx.lineTo(
          e.clientX - that.parentMargin.left,
          e.clientY - that.parentMargin.top
        );
        that.ctx.stroke();

        that.ctx.beginPath();
        that.ctx.arc(
          e.clientX - that.parentMargin.left,
          e.clientY - that.parentMargin.top,
          that.lineWid / 2,
          0,
          Math.PI * 2
        );
        that.ctx.fill();

        that.ctx.beginPath();
        that.ctx.moveTo(
          e.clientX - that.parentMargin.left,
          e.clientY - that.parentMargin.top
        );
        return that.cords;
      }
    });
  }

  start() {
    console.log("start");
    this.lineW();
    this.mousedown();
    this.mouseup();
    this.mousemove();
  }
}

const paint = new ColorPaint(
  "#canvas",
  ".myRange",
  ".myRangeText",
  cord
).start();

// вывод массива с координатами из класса
// let qwe = document.querySelector(".qwe");
// qwe.addEventListener("click", function (e) {
//   e.preventDefault();
//   console.log(cord);
// });


