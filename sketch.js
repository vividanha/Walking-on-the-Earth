// 인터렉티브디자인 기말과제 - C135177 백단하 
//---------------------------------------------------------------------------------------------------------
// Walking on the Earth
// 2021년 1월 1일부터 2024년 6월 18일까지 아이폰에 저장된 걸음 수 데이터를 시각화했습니다.
//---------------------------------------------------------------------------------------------------------
// 기획 의도: 방대한 양의 데이터를 하나의 화면에 '기록'하고자 데이터 시각화를 진행했습니다. 
//          재미있게 보여주기 위해 지구 한 바퀴를 돌기 위해 매일 걷는다는 컨셉으로 디자인했습니다.
//---------------------------------------------------------------------------------------------------------
// 출처 - 아래 요소들은 ChatGPT의 도움을 받아 작성했습니다.
// (1) 누적 걸음수와 거리를 계산하는 함수
// (2) 객체 배열을 사용하여 마우스 오버 기능을 구현하는 아이디어
// (3) 사각형을 클릭했을 때 정보가 나타나고, 빈 공간을 클릭했을 때 사라지는 기능
//---------------------------------------------------------------------------------------------------------

let stepDate = [];
let stepDistance = [];
let stepCount = [];
let stepWidth = [];
let stepH = [];
let stepS = [];
let stepB = [];
let rects = [];
let rectHeight = 15;
let rectGap = 5;
let g = 200;
let spd = -1;
let textX = 0;
let textY;
let textSpd = 4;
let clickedDate = null;
let clickedDistance = null;
let clickedCount = null;
let ang = 0;

function preload() {
    table = loadTable('asset/stepData_final.csv', 'csv', 'header');
    headfont = loadFont('asset/SnellBT-Bold.otf');
    leadfont = loadFont('asset/Garnett-Regular.ttf');
    movefont = loadFont('asset/SM견출고딕-Regular.otf');
    clickfont = loadFont('asset/Disclaimer-Classic.ttf');
    bgImg = loadImage('asset/background.png');
}

function setup() {
    createCanvas(1790, 1000);
    colorMode(HSB, 360, 100, 100);
    angleMode(DEGREES);

    for (let i = 0; i < table.getRowCount(); i++) {

        let dates = table.getString(i, 'Date');
        stepDate.push(dates);
        let distances = table.getNum(i, 'Distance walking');
        stepDistance.push(distances);
        let steps = int(table.getNum(i, 'Step count'));
        stepCount.push(steps);

        let width = map(stepCount[i], 0, 25000, 1, 58);
        stepWidth.push(width);
        let h = map(stepCount[i], 0, 23545, 250, 0);
        stepH.push(h);
        let s = map(stepCount[i], 0, 23545, 20, 100);
        stepS.push(s);
        let b = map(stepCount[i], 0, 23545, 90, 100);
        stepB.push(b);
    }

//---------------------------------------------------------------------------------------------------------
// (2) 객체 배열을 사용하여 마우스 오버 기능을 구현하는 아이디어 - ChatGPT를 활용하여 작성
    let rectX21 = 40;
    let rectX22 = 40;
    let rectX23 = 40;
    let rectX24 = 40;
    let rectY21 = 420;
    let rectY22 = rectY21 + 150;
    let rectY23 = rectY22 + 150;
    let rectY24 = rectY23 + 150;

    for (let i = 0; i < 1; i++) {
        let rectWidth = stepWidth[i];
        rects.push({ x: -200, y: -200, width: rectWidth, hue: stepH[i], sat: stepS[i], brt: stepB[i] });
        rectX21 += rectWidth + rectGap;
    }
    rectX21 = 40;
    for (let i = 1; i < 60; i++) {
        let rectWidth = stepWidth[i];
        rects.push({ x: rectX21, y: rectY21, width: rectWidth, hue: stepH[i], sat: stepS[i], brt: stepB[i], date: stepDate[i], distance: stepDistance[i], count: stepCount[i] });
        rectX21 += rectWidth + rectGap;
    }
    rectX21 = 40;
    for (let i = 60; i < 121; i++) {
        let rectWidth = stepWidth[i];
        rects.push({ x: rectX21, y: rectY21 + 25, width: rectWidth, hue: stepH[i], sat: stepS[i], brt: stepB[i], date: stepDate[i], distance: stepDistance[i], count: stepCount[i] });
        rectX21 += rectWidth + rectGap;
    }
    rectX21 = 40;
    for (let i = 121; i < 182; i++) {
        let rectWidth = stepWidth[i];
        rects.push({ x: rectX21, y: rectY21 + 50, width: rectWidth, hue: stepH[i], sat: stepS[i], brt: stepB[i], date: stepDate[i], distance: stepDistance[i], count: stepCount[i] });
        rectX21 += rectWidth + rectGap;
    }
    rectX21 = 40;
    for (let i = 182; i < 244; i++) {
        let rectWidth = stepWidth[i];
        rects.push({ x: rectX21, y: rectY21 + 75, width: rectWidth, hue: stepH[i], sat: stepS[i], brt: stepB[i], date: stepDate[i], distance: stepDistance[i], count: stepCount[i] });
        rectX21 += rectWidth + rectGap;
    }
    rectX21 = 40;
    for (let i = 244; i < 305; i++) {
        let rectWidth = stepWidth[i];
        rects.push({ x: rectX21, y: rectY21 + 100, width: rectWidth, hue: stepH[i], sat: stepS[i], brt: stepB[i], date: stepDate[i], distance: stepDistance[i], count: stepCount[i] });
        rectX21 += rectWidth + rectGap;
    }
    rectX21 = 40;
    for (let i = 305; i < 366; i++) {
        let rectWidth = stepWidth[i];
        rects.push({ x: rectX21, y: rectY21 + 125, width: rectWidth, hue: stepH[i], sat: stepS[i], brt: stepB[i], date: stepDate[i], distance: stepDistance[i], count: stepCount[i] });
        rectX21 += rectWidth + rectGap;
    }

    for (let i = 366; i < 425; i++) {
        let rectWidth = stepWidth[i];
        rects.push({ x: rectX22, y: rectY22, width: rectWidth, hue: stepH[i], sat: stepS[i], brt: stepB[i], date: stepDate[i], distance: stepDistance[i], count: stepCount[i] });
        rectX22 += rectWidth + rectGap;
    }
    rectX22 = 40;
    for (let i = 425; i < 486; i++) {
        let rectWidth = stepWidth[i];
        rects.push({ x: rectX22, y: rectY22 + 25, width: rectWidth, hue: stepH[i], sat: stepS[i], brt: stepB[i], date: stepDate[i], distance: stepDistance[i], count: stepCount[i] });
        rectX22 += rectWidth + rectGap;
    }
    rectX22 = 40;
    for (let i = 486; i < 547; i++) {
        let rectWidth = stepWidth[i];
        rects.push({ x: rectX22, y: rectY22 + 50, width: rectWidth, hue: stepH[i], sat: stepS[i], brt: stepB[i], date: stepDate[i], distance: stepDistance[i], count: stepCount[i] });
        rectX22 += rectWidth + rectGap;
    }
    rectX22 = 40;
    for (let i = 547; i < 609; i++) {
        let rectWidth = stepWidth[i];
        rects.push({ x: rectX22, y: rectY22 + 75, width: rectWidth, hue: stepH[i], sat: stepS[i], brt: stepB[i], date: stepDate[i], distance: stepDistance[i], count: stepCount[i] });
        rectX22 += rectWidth + rectGap;
    }
    rectX22 = 40;
    for (let i = 609; i < 670; i++) {
        let rectWidth = stepWidth[i];
        rects.push({ x: rectX22, y: rectY22 + 100, width: rectWidth, hue: stepH[i], sat: stepS[i], brt: stepB[i], date: stepDate[i], distance: stepDistance[i], count: stepCount[i] });
        rectX22 += rectWidth + rectGap;
    }
    rectX22 = 40;
    for (let i = 670; i < 731; i++) {
        let rectWidth = stepWidth[i];
        rects.push({ x: rectX22, y: rectY22 + 125, width: rectWidth, hue: stepH[i], sat: stepS[i], brt: stepB[i], date: stepDate[i], distance: stepDistance[i], count: stepCount[i] });
        rectX22 += rectWidth + rectGap;
    }

    for (let i = 731; i < 790; i++) {
        let rectWidth = stepWidth[i];
        rects.push({ x: rectX23, y: rectY23, width: rectWidth, hue: stepH[i], sat: stepS[i], brt: stepB[i], date: stepDate[i], distance: stepDistance[i], count: stepCount[i] });
        rectX23 += rectWidth + rectGap;
    }
    rectX23 = 40;
    for (let i = 790; i < 851; i++) {
        let rectWidth = stepWidth[i];
        rects.push({ x: rectX23, y: rectY23 + 25, width: rectWidth, hue: stepH[i], sat: stepS[i], brt: stepB[i], date: stepDate[i], distance: stepDistance[i], count: stepCount[i] });
        rectX23 += rectWidth + rectGap;
    }
    rectX23 = 40;
    for (let i = 851; i < 912; i++) {
        let rectWidth = stepWidth[i];
        rects.push({ x: rectX23, y: rectY23 + 50, width: rectWidth, hue: stepH[i], sat: stepS[i], brt: stepB[i], date: stepDate[i], distance: stepDistance[i], count: stepCount[i] });
        rectX23 += rectWidth + rectGap;
    }
    rectX23 = 40;
    for (let i = 912; i < 974; i++) {
        let rectWidth = stepWidth[i];
        rects.push({ x: rectX23, y: rectY23 + 75, width: rectWidth, hue: stepH[i], sat: stepS[i], brt: stepB[i], date: stepDate[i], distance: stepDistance[i], count: stepCount[i] });
        rectX23 += rectWidth + rectGap;
    }
    rectX23 = 40;
    for (let i = 974; i < 1035; i++) {
        let rectWidth = stepWidth[i];
        rects.push({ x: rectX23, y: rectY23 + 100, width: rectWidth, hue: stepH[i], sat: stepS[i], brt: stepB[i], date: stepDate[i], distance: stepDistance[i], count: stepCount[i] });
        rectX23 += rectWidth + rectGap;
    }
    rectX23 = 40;
    for (let i = 1035; i < 1096; i++) {
        let rectWidth = stepWidth[i];
        rects.push({ x: rectX23, y: rectY23 + 125, width: rectWidth, hue: stepH[i], sat: stepS[i], brt: stepB[i], date: stepDate[i], distance: stepDistance[i], count: stepCount[i] });
        rectX23 += rectWidth + rectGap;
    }

    for (let i = 1096; i < 1156; i++) {
        let rectWidth = stepWidth[i];
        rects.push({ x: rectX24, y: rectY24, width: rectWidth, hue: stepH[i], sat: stepS[i], brt: stepB[i], date: stepDate[i], distance: stepDistance[i], count: stepCount[i] });
        rectX24 += rectWidth + rectGap;
    }
    rectX24 = 40;
    for (let i = 1156; i < 1217; i++) {
        let rectWidth = stepWidth[i];
        rects.push({ x: rectX24, y: rectY24 + 25, width: rectWidth, hue: stepH[i], sat: stepS[i], brt: stepB[i], date: stepDate[i], distance: stepDistance[i], count: stepCount[i] });
        rectX24 += rectWidth + rectGap;
    }
    rectX24 = 40;
    for (let i = 1217; i < stepCount.length; i++) {
        let rectWidth = stepWidth[i];
        rects.push({ x: rectX24, y: rectY24 + 50, width: rectWidth, hue: stepH[i], sat: stepS[i], brt: stepB[i], date: stepDate[i], distance: stepDistance[i], count: stepCount[i] });
        rectX24 += rectWidth + rectGap;
    }
//---------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------------
// (1) 누적 걸음수와 거리를 계산하는 함수 - ChatGPT를 활용하여 작성
    totalStep = sumColumn(table, 'Step count', table.getRowCount());
    totalDistance = sumColumn(table, 'Distance walking', table.getRowCount()).toLocaleString();
}

function sumColumn(table, columnName, num) {
    let sum = 0;
    for (let i = 0; i < num; i++) {
        sum += int(table.getNum(i, columnName));
    }
    return sum;
}
//---------------------------------------------------------------------------------------------------------

function draw() {
    background(bgImg);

    // ---- Texts ----
    let textX1 = 15 * cos(ang);
    let textY1 = 15 * sin(ang);
    let textX2 = textX1 + 165;
    let textY2 = textY1 + 79;
    let points1 = headfont.textToPoints('Walking', textX1, textY1, 100);
    let points2 = headfont.textToPoints('on the Earth', textX2, textY2, 100);
    ang += 1;

    push();
    translate(390, 105);
    textFont(headfont);
    textSize(100);
    fill(160, 100, 100);
    stroke(160, 100, 100);
    text('Walking', textX1, textY1);
    text('on the Earth', textX2, textY2);
    text('Walking', textX1 + 1, textY1);
    text('on the Earth', textX2 + 1, textY2);
    text('Walking', textX1 - 1, textY1);
    text('on the Earth', textX2 - 1, textY2);
    fill(0, 0, 100);
    text('Walking', textX1 + 2, textY1 + 1);
    text('on the Earth', textX2 + 2, textY2 + 1);
    pop();

    let textX3 = 445;
    let textY3 = 235;
    textFont(leadfont);

    push();
    textSize(52);
    fill(0, 0, 100);
    text(`${totalStep.toLocaleString()} steps`, textX3, textY3 + 64);
    text(`${totalDistance} km`, textX3, textY3 + 129);
    textFont(headfont);
    textSize(27);
    fill(160, 100, 100);
    text('/ 60,000,000 steps', textX3 + 265, textY3 + 102);
    text('/ 40,000 km', textX3 + 255, textY3 + 130);
    pop();

    push();
    translate(textX3 - 20, textY3 + 25)
    rotate(-30);
    noStroke();
    fill(0, 0, 100);
    rect(-5, -19.5, 58, 25);
    textFont(leadfont);
    textSize(18);
    fill(228, 100, 100);
    stroke(228, 100, 100);
    strokeWeight(0.5);
    text('Total', 0, 0);
    pop();

    push();
    let str = '지구 한 바퀴는 약 40,000km, 약 6,000만보를 걷는 것과 같다고 합니다.'
    textY = 972;
    for (let x = textX; x < width; x += 680) {
        textFont(movefont);
        fill(160, 100, 100);
        textSize(16);
        text(str, x, textY);
    }
    if (textX >= width || textX >= 0) {
        textX -= 1000;
    }
    textX += textSpd;
    pop();

    // ---- Graphics ----
    push();
    let circleX = 200;
    let circleY = 190;
    let r = 280;
    noFill();
    strokeWeight(1);
    stroke(160, 100, 100);
    circle(circleX, circleY, r);
    line(circleX, circleY - r / 2, circleX, circleY + r / 2);

    for (i = 0; i <= 30; i++) {
        push();
        translate(circleX, circleY);
        rotate(90 * i);
        ellipse(0, 0, r - 10 * i, r);
        pop();
    }

    for (let i = 0; i < 6; i++) {
        stroke(160, 100, 100);
        strokeWeight(2);
        ellipse(circleX, circleY, g - 50 * i, r);
    }
    g += spd;
    if (g <= 0 || g >= r) {
        spd *= -1;
    }
    pop();

    push();
    translate(circleX, circleY);
    rotate(-90);
    noFill();
    let num = 25;
    temp = frameCount * 0.5;
    for (let i = 0; i <= num; i++) {
        stroke(0, 0, 100);
        strokeWeight(i * (num - 8) / num);
        point(cos(temp * i / num) * (r + 40) / 2, sin(temp * i / num) * (r + 40) / 2);
    }
    pop();

//---------------------------------------------------------------------------------------------------------
// (2) 객체 배열을 사용하여 마우스 오버 기능을 구현하는 아이디어 - ChatGPT를 활용하여 작성
// 마우스 오버했을 때 테두리가 나타나는 부분은 교수님의 도움으로 작성

    let tempi = 0;
    for (let i = 0; i < rects.length; i++) {
        let r = rects[i];

        if (mouseX > r.x && mouseX < r.x + r.width && mouseY > r.y && mouseY < r.y + rectHeight) {
            tempi = i;
        }
        push();
        fill(r.hue, r.sat, r.brt);
        stroke(r.hue, r.sat, r.brt);
        strokeWeight(1);
        rect(r.x, r.y, r.width, rectHeight);
        pop();
    }
    push();
    noFill();
    stroke(0, 0, 100);
    strokeWeight(3);
    rect(rects[tempi].x, rects[tempi].y, rects[tempi].width, rectHeight);
    pop();
//---------------------------------------------------------------------------------------------------------

    // --- Box ---
    push();
    fill(0, 0, 100);
    noStroke();
    rect(rects[tempi].x + rects[tempi].width, rects[tempi].y - 25, 200, 25);
    textFont(leadfont);
    textSize(13);
    fill(228, 100, 100);
    stroke(228, 100, 100);
    strokeWeight(0.5);
    text(stepDate[tempi], rects[tempi].x + rects[tempi].width + 5, rects[tempi].y - 8.5);
    textAlign(RIGHT);
    text(`${stepCount[tempi].toLocaleString()} steps`, rects[tempi].x + rects[tempi].width + 195, rects[tempi].y - 8.5);
    pop();

//---------------------------------------------------------------------------------------------------------
// (3) 사각형을 클릭했을 때 정보가 나타나고, 빈 공간을 클릭했을 때 사라지는 기능 - ChatGPT를 활용하여 작성
    if (clickedDate !== null && clickedDistance !== null && clickedCount !== null) {
//---------------------------------------------------------------------------------------------------------

        push();
        fill(clickedHue, clickedSat, clickedBrt);
        noStroke();
        rect(1190, 36, 250, 50);
        textFont(clickfont);
        textSize(200);
        text(`${clickedCount.toLocaleString()} steps`, 1200, 235);
        text(`${clickedDistance} km`, 1200, 400);
        textFont(leadfont);
        textSize(36);
        fill(228, 100, 100);
        text(`${clickedDate}`, 1200, 75);

        push();
        noStroke();
        translate(1530, 400);
        fill(225, 100, 100);
        circle(0, 0, 200);
        let k = map(clickedCount, 0, 23545, 0, 360);
        let t = map(k, 0, totalStep, 0, 360);
        rotate(-90);
        fill(clickedHue, clickedSat, clickedBrt);
        stroke(225, 100, 100);
        strokeWeight(8);
        arc(0, 0, 230, 230, 0, k, PIE);
        stroke(clickedHue, clickedSat, clickedBrt);
        pop();
    }
}

//---------------------------------------------------------------------------------------------------------
// (3) 사각형을 클릭했을 때 정보가 나타나고, 빈 공간을 클릭했을 때 사라지는 기능 - ChatGPT를 활용하여 작성
function mousePressed() {
    let clicked = false;
    for (let i = 0; i < rects.length; i++) {
        let r = rects[i];
        if (mouseX > r.x && mouseX < r.x + r.width && mouseY > r.y && mouseY < r.y + rectHeight) {
            clickedDate = r.date;
            clickedDistance = nf(r.distance, 1, 1)
            clickedCount = r.count;
            clickedHue = r.hue;
            clickedSat = r.sat;
            clickedBrt = r.brt;
            clicked = true;
            break;
        }
    }

    if (!clicked) {
        clickedDate = null;
        clickedDistance = null;
        clickedCount = null;
    }
}
//---------------------------------------------------------------------------------------------------------