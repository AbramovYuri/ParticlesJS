resize();
addEventListener("resize", resize);
addEventListener("orientationchange", resize);
particles();


function particles() {

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var pointDistance = 150;                              // Максимальное расстояние между точками для отрисовки линии

    mainFrame();


//!!!!!!!!!!!!!        Основной цикл       !!!!!!!!!!!!!!!!!!

    function mainFrame() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        point();
        line();
        newPointCoord();
        requestAnimationFrame(mainFrame);
    }

//!!!!!!!!!!!!!!!!!!!    Вычисляем новые координаты точки      !!!!!!!!!!!!!!!!!

    function newPointCoord() {

        for (var i = 0; i < pointCount; i++) {
            pointCoord[i][0] = pointCoord[i][0] + pointCoord[i][2];
            if (pointCoord[i][0] > canvasWidth) {
                pointCoord[i][0] = 0
            }
            if (pointCoord[i][0] < 0) {
                pointCoord[i][0] = canvasWidth
            }
            pointCoord[i][1] = pointCoord[i][1] + pointCoord[i][3];
            if (pointCoord[i][1] > canvasHeight) {
                pointCoord[i][1] = 0
            }
            if (pointCoord[i][1] < 0) {
                pointCoord[i][1] = canvasHeight
            }

        }

    }

//!!!!!!!!!!!!!!!!!!      Рисуем точки      !!!!!!!!!!!!!!!!!!

    function point() {

        for (var i = 0; i < pointCount; i++) {
            ctx.beginPath();
            ctx.arc(pointCoord[i][0], pointCoord[i][1], (Math.abs(pointCoord[i][2]) + Math.abs(pointCoord[i][3])) * 1.1, 0, 2 * Math.PI);
            ctx.fillStyle = "rgba(255,255,255,.5)";
            ctx.fill();

        }

    }

//!!!!!!!!!!!!!!!!!      Рисуем линии если точки близко       !!!!!!!!!!!!!!

    function line() {
        var vector, xCord, yCord;

        for (var i = 0; i < pointCount - 1; i++) {

            var a = pointCoord[i][0];
            var b = pointCoord[i][1];

            for (var q = 1; q < pointCount; q++) {

                xCord = Math.abs(a - pointCoord[q][0]);
                yCord = Math.abs(b - pointCoord[q][1]);

                vector = Math.sqrt((xCord * xCord) + (yCord * yCord));

                if (vector > 0 && vector < pointDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = 'rgba(255,255,255,' + ((1 - vector / pointDistance) / 4) + ')';
                    ctx.moveTo(a, b);
                    ctx.lineTo(pointCoord[q][0], pointCoord[q][1]);
                    ctx.stroke();
                }

            }
        }

    }

}

function resize() {
    var particlesDiv = document.getElementsByClassName("particles");
    canvas.width = particlesDiv[0].offsetWidth;                         //Устанавливаем размеры CANVAS из CSS свойств DIV particles
    canvas.height = particlesDiv[0].offsetHeight;
    canvasWidth = canvas.clientWidth;
    canvasHeight = canvas.clientHeight;
    pointCount = (canvasWidth * canvasHeight) / 13824;    // Количество точек (автоматически) на FullHD примерно 150
    console.log(pointCount);
    pointGenerator();
}

//!!!!!!!!!!!!!!!!!!!!!     Генератор случайных точек   !!!!!!!!!!!!!!!!!!!!!

function pointGenerator() {
    pointCoord = [];
    var pointSpeed = 1;                                  // Скорость точек


    var x, y, vX, vY, negative;

    for (var i = 0; i < pointCount; i++) {

        x = Math.random() * canvasWidth;

        y = Math.random() * canvasHeight;

        vX = Math.random() * pointSpeed;
        if (vX === 0) {
            vX = Math.random() + .1;
        }
        negative = Math.random();
        if (negative < .5) {
            vX = vX * -1
        }

        vY = Math.random() * pointSpeed;
        negative = Math.random();
        if (vY === 0) {
            vY = Math.random() + .1;
        }
        if (negative < .5) {
            vY = vY * -1
        }

        pointCoord.push([x, y, vX, vY]);
    }
}
