const tiles = [];
const tileImages = [];

let grid = [];

const DIM = 20;

const BLANK = 0;
const UP = 1;
const RIGHT = 2;
const DOWN = 3;
const LEFT = 4;

const RSEED = 10;
const CANVASSIZE = 1200;

function preload() {
    // path = "tiles";
    // tileImages[0] = loadImage(`${path}/blank.png`);
    // tileImages[1] = loadImage(`${path}/up.png`);

    // circuit Tile
    // path = "circuits";
    // for (let i = 0; i < 13; i++) {
    //     tileImages[i] = loadImage(`${path}/${i}.png`);
    // }

    //
    path = "CrossWalk";
    for (let i = 0; i < 42; i++) {
        tileImages[i] = loadImage(`${path}/${i}.png`);
    }
}

function setup() {
    // 랜덤 시드
    // randomSeed(RSEED);

    // canvas 생성
    createCanvas(CANVASSIZE, CANVASSIZE);

    // New Method
    const sc1 = 'ABAAAABA';
    const sc2 = 'AABAABAA';
    const sn = 'AAAAAAAA';
    const sb = 'CCCCCCCC';
    const sb1 = 'ACCCCCCC';
    const sb2 = 'CCCCCCCA';
    const sbc1 = 'AACCCCCC';
    const sbc2 = 'CCCCCCAA';
    tiles[0] = new Tile(tileImages[0], [sc1, sc1, sc1, sc1]);
    tiles[1] = new Tile(tileImages[1], [sc1, sc1, sc1, sn]);
    tiles[2] = new Tile(tileImages[2], [sc1, sc1, sn, sn]);
    tiles[3] = new Tile(tileImages[3], [sc1, sn, sc1, sn]);
    tiles[4] = new Tile(tileImages[4], [sc1, sn, sn, sn]);
    tiles[5] = new Tile(tileImages[5], [sn, sn, sn, sn]);
    tiles[6] = new Tile(tileImages[6], [sc1, sc1, sb1, sb2]);
    tiles[7] = new Tile(tileImages[7], [sc1, sn, sb1, sb2]);
    tiles[8] = new Tile(tileImages[8], [sn, sc1, sb1, sb2]);
    tiles[9] = new Tile(tileImages[9], [sn, sn, sb1, sb2]);
    tiles[10] = new Tile(tileImages[10], [sc1, sb1, sb, sb2]);
    tiles[11] = new Tile(tileImages[11], [sn, sb1, sb, sb2]);
    tiles[12] = new Tile(tileImages[12], [sc2, sc1, sc2, sc1]);
    tiles[13] = new Tile(tileImages[13], [sc2, sc1, sc2, sn]);
    tiles[14] = new Tile(tileImages[14], [sc2, sc1, sn, sc1]);
    tiles[15] = new Tile(tileImages[15], [sc2, sc1, sn, sn]);
    tiles[16] = new Tile(tileImages[16], [sc2, sn, sc2, sn]);
    tiles[17] = new Tile(tileImages[17], [sc2, sn, sn, sc1]);
    tiles[18] = new Tile(tileImages[18], [sn, sc1, sn, sc1]);
    tiles[19] = new Tile(tileImages[19], [sc2, sn, sn, sn]);
    tiles[20] = new Tile(tileImages[20], [sc1, sn, sn, sn]);
    tiles[21] = new Tile(tileImages[21], [sn, sn, sn, sn]);
    tiles[22] = new Tile(tileImages[22], [sc2, sc1, sbc1, sb2]);
    tiles[23] = new Tile(tileImages[23], [sc2, sn, sbc1, sb2]);
    tiles[24] = new Tile(tileImages[24], [sn, sc1, sbc1, sb2]);
    tiles[25] = new Tile(tileImages[25], [sn, sn, sbc1, sb2]);
    tiles[26] = new Tile(tileImages[26], [sc1, sc2, sb1, sbc2]);
    tiles[27] = new Tile(tileImages[27], [sc1, sn, sb1, sbc2]);
    tiles[28] = new Tile(tileImages[28], [sn, sc2, sb1, sbc2]);
    tiles[29] = new Tile(tileImages[29], [sn, sn, sb1, sbc2]);
    tiles[30] = new Tile(tileImages[30], [sc2, sc2, sc2, sc2]);
    tiles[31] = new Tile(tileImages[31], [sc2, sc2, sc2, sn]);
    tiles[32] = new Tile(tileImages[32], [sc2, sc2, sn, sn]);
    tiles[33] = new Tile(tileImages[33], [sc2, sn, sc2, sn]);
    tiles[34] = new Tile(tileImages[34], [sc2, sn, sn, sn]);
    tiles[35] = new Tile(tileImages[35], [sn, sn, sn, sn]);
    tiles[36] = new Tile(tileImages[36], [sc2, sc2, sbc1, sbc2]);
    tiles[37] = new Tile(tileImages[37], [sc2, sn, sbc1, sbc2]);
    tiles[38] = new Tile(tileImages[38], [sn, sc2, sbc1, sbc2]);
    tiles[39] = new Tile(tileImages[39], [sn, sn, sbc1, sbc2]);
    tiles[40] = new Tile(tileImages[40], [sc1, sbc1, sb, sbc2]);
    tiles[41] = new Tile(tileImages[41], [sn, sbc1, sb, sbc2]);

    for (let i = 1; i < 4; i++) {
        for (let j = 0; j < 42; j++) {
            tiles.push(tiles[j].rotate(i));
        }
    }

    // Generate the adjacency rules based on edges
    for (let i = 0; i < tiles.length; i++) {
        const tile = tiles[i];
        tile.analyze(tiles);
    }

    startOver();
}

function startOver() {
    background(128);
    // Create cell for each spot on the grid
    for (let i = 0; i < DIM * DIM; i++) {
        grid[i] = new Cell(tiles.length);
        grid[i].setPos(parseInt(i % DIM), parseInt(i / DIM));
    }
}

function checkValid(arr, valid) {
    for (let i = arr.length - 1; i >= 0; i--) {
        // VALID: [BLANK, RIGHT]
        // ARR : [BLANK, UP, RIGHT, DOWN, LEFT]
        // result in removing UP, DOWN, LEFT
        let element = arr[i];
        if (!valid.includes(element)) {
            arr.splice(i, 1);
        }
    }
}

function draw() {

    //Pick cell with least entropy
    let gridCopy = grid.slice();
    gridCopy = gridCopy.filter((a) => !a.collapsed);
    gridCopy.sort(((a, b) => {
        return a.options.length - b.options.length;
    }));

    if (gridCopy.length === 0) {
        return;
    }

    let len = gridCopy[0].options.length;
    let stopIndex = 0;
    for (let i = 1; i < gridCopy.length; i++) {
        if (gridCopy[i].options.length > len) {
            stopIndex = i;
            break;
        }
    }
    if (stopIndex > 0) gridCopy.splice(stopIndex);

    // 기본 코드
    const cell = random(gridCopy);
    cell.collapsed = true;
    const pick = random(cell.options);
    if (pick === undefined) {
        startOver();
        return;
    }
    cell.options = [pick];

    const w = width / DIM;
    const h = height / DIM;
    // cell이 픽됐으므로 바로 그리면 됨.
    image(tiles[cell.options[0]].img, cell.pos[0] * w, cell.pos[1] * h, w, h);

    // for (let j = 0; j < DIM; j++) {
    //     for (let i = 0; i < DIM; i++) {
    //         let cell = grid[i + DIM * j];
    //         // 붕괴한건 그대로 그리기
    //         // 근데 한번 그리면 안바뀌는 p5특성상 붕괴할때 딱 한번 그리는 거로 하는게 더 나을 듯
    //         if (cell.collapsed) {
    //             let index = cell.options[0];
    //             // 실제로 그리는 함수
    //             image(tiles[index].img, i * w, j * h, w, h);
    //         }
    //         // 아닌 부분 그리기
    //         // else {
    //         //     fill(0);
    //         //     stroke(255);
    //         //     rect(i * w, j * h, w, h);
    //         // }
    //     }
    // }

    // 다음번 그리드 갱신하는 함수
    const nextGrid = [];
    for (let j = 0; j < DIM; j++) {
        for (let i = 0; i < DIM; i++) {
            let index = i + j * DIM;
            if (grid[index].collapsed) {
                nextGrid[index] = grid[index];
            } else {
                let options = new Array(tiles.length).fill(0).map((x, i) => i);
                // LOOK UP
                if (j > 0) {
                    let up = grid[i + (j - 1) * DIM];
                    let validOptions = [];
                    for (let option of up.options) {
                        let valid = tiles[option].down;
                        validOptions = validOptions.concat(valid);
                    }
                    checkValid(options, validOptions);
                }
                // LOOK RIGHT
                if (i < DIM - 1) {
                    let right = grid[i + 1 + j * DIM];
                    let validOptions = [];
                    for (let option of right.options) {
                        let valid = tiles[option].left;
                        validOptions = validOptions.concat(valid);
                    }
                    checkValid(options, validOptions);
                }
                // LOOK DOWN
                if (j < DIM - 1) {
                    let down = grid[i + (j + 1) * DIM];
                    let validOptions = [];
                    for (let option of down.options) {
                        let valid = tiles[option].up;
                        validOptions = validOptions.concat(valid);
                    }
                    checkValid(options, validOptions);
                }
                // LOOK LEFT
                if (i > 0) {
                    let left = grid[i - 1 + j * DIM];
                    let validOptions = [];
                    for (let option of left.options) {
                        let valid = tiles[option].right;
                        validOptions = validOptions.concat(valid);
                    }
                    checkValid(options, validOptions);
                }
                nextGrid[index] = new Cell(options);
                // 각각의 셀이 자신의 인덱스를 포함함, 예전 자신의 위치를 가져오면 그걸 넣는것도 좋다.
                nextGrid[index].setPos(parseInt(index % DIM), parseInt(index / DIM));
            }
        }
    }
    grid = nextGrid;
}

// function mousePressed() {
//     redraw();
// }
