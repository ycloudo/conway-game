var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var map = {
    x: 120,
    y: 60
}
var speed = 100;
canvas.width = map.x * 8;
canvas.height = map.y * 8;

var cells = new Array();
for (let i = 0; i < map.y; i++) {
    cells[i] = new Array();
    for (let j = 0; j < map.x; j++) {
        cells[i][j] = "";
    }
}

var next = new Array();
for (let n = 0; n < map.y; n++) {
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
//畫出方格
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    var new_cells = cells.flat();
    for (let i = 0; i < new_cells.length; i++) {
        var color = new_cells[i];
        context.fillStyle = color;
        context.fillRect((i % map.x) * 8, parseInt(i / map.x) * 8, 7, 7);
    }
    life();
}
//設定初始細胞
function seed() {
    var seeds = 800;
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
seed();
setInterval(draw, speed);

