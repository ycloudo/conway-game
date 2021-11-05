$(document).ready(function () {
    $("#start").click(function () {
        document.getElementById("seeds").disabled = true;
        document.getElementById("start").disabled = true;
    });
    $("#pass").click(function () {
        document.getElementById("start").disabled = false;
    });
    $("#restart").click(function () {
        document.getElementById("start").disabled = false;
        document.getElementById("seeds").disabled = false;
    });
});
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var map = {
    x: 230,
    y: 144
}
var speed = 100;
var size = 5;
canvas.width = map.x * size;
canvas.height = map.y * size;
var cells = new Array();
var next = new Array();
//建立初始陣列
function construct() {
    for (let i = 0; i < map.y; i++) {
        cells[i] = new Array();
        for (let j = 0; j < map.x; j++) {
            cells[i][j] = "";
        }
    } for (let n = 0; n < map.y; n++) {
        next[n] = new Array();
        for (let p = 0; p < map.x; p++) {
            next[n][p] = "";
        }
    }
    //填充初始顏色
    for (let i = 0; i < map.y; i++) {
        for (let j = 0; j < map.x; j++) {
            cells[i][j] = "white";
        }
    }
}
//畫出方格
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    var new_cells = cells.flat();
    for (let i = 0; i < new_cells.length; i++) {
        var color = new_cells[i];
        context.fillStyle = color;
        context.fillRect((i % map.x) * size, parseInt(i / map.x) * size, size - 1, size - 1);
    }
}
//onload
function onload() {
    construct();
    seed();
    draw();
}
function play() {
    draw();
    life();
}
//設定初始細胞
function seed() {
    var seeds = 8000;
    for (let i = 0; i < seeds; i++) {
        cells[parseInt(Math.random() * map.y)][parseInt(Math.random() * map.x)] = "black";
    }
}
//生命模式
//存活:黑色
//死亡:白色
function life() {
    var count = 0//統計周圍有幾個細胞存活
    for (let i = 0; i < map.y; i++) {
        for (let j = 0; j < map.x; j++) {
            count = 0;
            var temp = cells[i][j];
            // console.log(temp);
            if (temp == "black") {//如果此細胞狀態為存活
                count += check_cell(i - 1, j - 1);//左上
                count += check_cell(i - 1, j);//中上
                count += check_cell(i - 1, j + 1);//右上
                count += check_cell(i, j - 1);//左
                count += check_cell(i, j + 1);//右
                count += check_cell(i + 1, j - 1);//左下
                count += check_cell(i + 1, j);//中下
                count += check_cell(i + 1, j + 1);//右下
                // console.log(count);
                if (count < 2 || count > 3) {
                    next[i][j] = "white";
                } else {
                    next[i][j] = "black";
                }
                // console.log(next[i][j]);

            } else {//細胞為死亡狀態
                count += check_cell(i - 1, j - 1);//左上
                count += check_cell(i - 1, j);//中上
                count += check_cell(i - 1, j + 1);//右上
                count += check_cell(i, j - 1);//左
                count += check_cell(i, j + 1);//右
                count += check_cell(i + 1, j - 1);//左下
                count += check_cell(i + 1, j);//中下
                count += check_cell(i + 1, j + 1);//右下
                // console.log(count);
                if (count == 3) {
                    next[i][j] = "black";
                } else {
                    next[i][j] = "white";
                }
                // console.log(next[i][j]);
            }
        }
    }
    for (let l = 0; l < map.y; l++) {
        for (let m = 0; m < map.x; m++) {
            cells[l][m] = next[l][m];
        }
    }
}
function check_cell(a, b) {//檢查cells有無生命
    if (a < 0 || b < 0) {
        return 0;
    } else if (a > map.y - 1) {
        return 0;
    } else if (b > map.x - 1) {
        return 0;
    } else if (cells[a][b] == "black") {
        return 1;
    } else {
        return 0;
    }
}
//開始
function start() {
    p = setInterval(play, speed);
}
//重新開始
function restart() {
    pass();
    construct();
    draw();
}
//暫停
function pass() {
    clearInterval(p);
}
//產生隨機細胞
function random_seed() {
    construct();
    seed();
    draw();
}
function seed_gun() {
    construct();
    cells[5][1] = "black";
    cells[5][2] = "black";
    cells[6][1] = "black";
    cells[6][2] = "black";
    cells[5][11] = "black";
    cells[6][11] = "black";
    cells[7][11] = "black";
    cells[4][12] = "black";
    cells[8][12] = "black";
    cells[3][13] = "black";
    cells[9][13] = "black";
    cells[3][14] = "black";
    cells[9][14] = "black";
    cells[6][15] = "black";
    cells[4][16] = "black";
    cells[8][16] = "black";
    cells[5][17] = "black";
    cells[6][17] = "black";
    cells[7][17] = "black";
    cells[6][18] = "black";
    cells[3][21] = "black";
    cells[4][21] = "black";
    cells[5][21] = "black";
    cells[3][22] = "black";
    cells[4][22] = "black";
    cells[5][22] = "black";
    cells[2][23] = "black";
    cells[6][23] = "black";
    cells[1][25] = "black";
    cells[2][25] = "black";
    cells[6][25] = "black";
    cells[7][25] = "black";
    cells[3][35] = "black";
    cells[4][35] = "black";
    cells[3][36] = "black";
    cells[4][36] = "black";
    draw();
}
function selectSeed(evt) {
    if (evt.target.value === "random") {
        random_seed();
    } else if (evt.target.value === "gun") {
        seed_gun();
    }
}

