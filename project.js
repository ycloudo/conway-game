var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var map = {
    x: 160,
    y: 80
}
var speed = 50;
canvas.width = map.x * 8;
canvas.height = map.y * 8;
var cells = new Array();
for (var i = 0; i < map.x; i++) {
    cells[i] = new Array();
    for (var j = 0; j < map.y; j++) {
        cells[i][j] = "";
    }
}
//填充初始顏色
for (var i = 0; i < map.x; i++) {
    for (var j = 0; j < map.y; j++) {
        cells[i][j] = "white";
    }
}
//畫出方格
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    var new_cells = cells.flat();
    for (var i = 0; i < new_cells.length; i++) {
        color = new_cells[i];
        context.fillStyle = color;
        context.fillRect((i % map.x) * 8, i / map.x * 8, 7, 7);
    }
    life();
}
//設定初始細胞
function seed() {
    var seeds = 800;
    for (var i = 0; i < seeds; i++) {
        cells[parseInt(Math.random() * map.x)][parseInt(Math.random() * map.y)] = "black";
    }
}
//生命模式
//存活:黑色
//死亡:白色
function life() {
    for (var i = 0; i < map.x; i++) {
        for (var j = 0; j < map.y; j++) {
            var temp = cells[i][j];
            if (temp == "black") {//如果此細胞狀態為存活
                var count = 0;//統計周圍有幾個細胞存活
                count += check_cell(i - 1, j - 1);//左上
                count += check_cell(i - 1, j);//中上
                count += check_cell(i - 1, j + 1);//右上
                count += check_cell(i, j - 1);//左
                count += check_cell(i, j + 1);//右
                count += check_cell(i + 1, j - 1);//左下
                count += check_cell(i + 1, j);//中下
                count += check_cell(i + 1, j + 1);//右下
                // console.log(count);
                if (count < 2) {
                    cells[i][j] = "white";
                } else if (count == 2 || count == 3) {
                    cells[i][j] = cells[i][j];
                } else if (count > 3) {
                    cells[i][j] = "white";
                }
            } else {//細胞為死亡狀態
                var count = 0;//統計周圍有幾個細胞存活
                count += check_cell(i - 1, j - 1);//左上
                count += check_cell(i - 1, j);//中上
                count += check_cell(i - 1, j + 1);//右上
                count += check_cell(i, j - 1);//左
                count += check_cell(i, j + 1);//右
                count += check_cell(i + 1, j - 1);//左下
                count += check_cell(i + 1, j);//中下
                count += check_cell(i + 1, j + 1);//右下
                if (count == 3) {
                    cells[i][j] = "black";
                }
            }
        }
    }
}
function check_cell(i, j) {//檢查cells有無生命
    if (i < 0 || j < 0) {
        return 0;
    } else if (i > cells.length) {
        return 0;
    } else if (j > cells[j].length) {
        return 0;
    } else if (cells[i][j] == "black") {
        return 1;
    } else {
        return 0;
    }
}

seed();
setInterval(draw, speed);

