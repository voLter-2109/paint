// добавление функций для взаимодействия с текущим рисунком
let func = document.querySelector(".func");
let btnSave = document.querySelector(".btnSave");
let btnPlay = document.querySelector(".btnPlay");
let btnReset = document.querySelector(".btnReset");

// сохранить
btnSave.addEventListener("click", function () {
  localStorage.setItem("cords", JSON.stringify(cord));
});
// воспроизвести
btnPlay.addEventListener("click", function (e) {
  cord = JSON.parse(localStorage.getItem("cords"));
  function clear() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = "black";
  }
  clear();
  function replay() {
    let timer = setInterval(function () {
      if (localStorage.getItem("cords") !== null) {
        clearInterval(timer);
        ctx.beginPath();
        return;
      } else {
        if (cord.length > 0) {
          // как убрать переполнение стека при повторном нажатии на кнопку play???????????
          // как добавить повторное сохранение , пока работает только при перезагрузке стрицы
          let crd = cord.shift();
          e = {
            clientX: crd["0"],
            clientY: crd["1"],
            // test
            lineWid: crd["2"],
            fillStyle: crd["3"],
            strokeStyle: crd["4"]
            // 
          };
          // не понимаю как менять размер толщины линии , если изначально рисовали разной толщиной
          // как вариант дизейблить кнопку play пока не нажата кнопка сохранения и дизейблить кнопку play для повторного нажатия 
          ctx.lineTo(e.clientX, e.clientY);
          ctx.stroke();
          // test
          ctx.fillStyle = e.fillStyle;
          ctx.strokeStyle = e.strokeStyle;
          // 
          ctx.beginPath();
          ctx.arc(e.clientX, e.clientY, e.lineWid/2, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(e.clientX, e.clientY);
        } else {
          return;
        }
      }
    }, 30);
  }

  replay();
  localStorage.clear();
  //
});
// пока сброс локальной памяти и воспроизведение нового рисунка работает через перезагрузку страницы при нажатии на кнопку reset
// очистить
btnReset.addEventListener("click", function (e) {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.fillStyle = "black";
  localStorage.clear();
  location.reload();
});