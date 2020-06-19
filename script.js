/// @ts-check
/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";

/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library
   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */




/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const UITLEG = 0;
const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = UITLEG;

var spelerX = 0; // x-positie van speler
var spelerY = 0; // y-positie van speler

var kogelX = [];    // x-positie van kogel
var kogelY = [];    // y-positie van kogel
var kogelTijd = 0; // tijd tussen kogels

var sterrenX = [67, 160, 240, 368, 490, 500, 657, 753, 815, 956, 1034, 1110, 301, 134, 237, 543, 743, 154, 950, 1124, 40, 449, 756, 150];
var sterrenY = [90, 200, 400, 500, 650, 700, 190, 506, 135, 9, 453, 309, 352, 639, 108, 371, 743, 209, 56, 680, 40, 147, 400, 360];
/* 
variabele triangle vijand
*/
var vijandX = [67, 160, 240, 368, 490, 500]; // x-positie vijand
var vijandY = [-90, -200, -400, -500, -650, -700]; // y-positie vijand
//var vijandWachtTijd = 100; //aantal 50e van een seconde 


var score = 0; // aantal behaalde punten
var levens = 3; //aantal levens

var beginScherm = function(){
    fill(0,0,0);
    rect(0, 0, 1280, 720);
    fill(255,255,255);
    textSize(50);
    text("Ruimte Kapers", 460, 100);
    textSize(30);
    text("Benodigde toetsen:", 490, 300);
    text("De muis om te bewegen", 460, 350);
    text("De linkermuisknop om te schieten", 400, 400);
    text("Druk op enter om te beginnen", 420, 500 )
}


var tekenEindScherm = function() {
    fill (0,0,0);
    rect (0, 0, 1280, 720); 
    fill (255,255,255);
    textSize(50);
    text ("Game Over", 465, 100);
    textSize (30);
    text ("Score: " + score, 550, 300);
    text ("Druk spatie om naar het beginscherm te gaan", 340 , 500);
};

/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */


/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
    fill(0, 0, 0);
    rect(0, 0, 1280, 1280);
    fill(255,255,255);
    text("Levens: " + levens, 50, 50);
    console.log("tekenVeld");
    text("Score: " + score, 150, 50);  
    for (var p=0; p < sterrenX.length; p++) {
    rect(sterrenX[p], sterrenY[p], 5, 5);
    }
};


/**
 * Tekent de vijand
 */
var tekenAlleVijanden = function() {
    noStroke();
    fill(255,0,0);
    for (var i=0; i < vijandX.length; i++) {
     triangle (vijandX[i], vijandY[i], vijandX[i] + 60, vijandY[i], vijandX[i] + 30, vijandY[i] + 30);
    }
};

//tekent de kogels    
var tekenKogels = function() {
    fill('blue');
      for(var o = 0; o < kogelX.length; o++){ // Voor o < vijandX.length oneindig veel kogels??
        ellipse (kogelX[o], kogelY[o], 5, 15);
    }    
};
    
/**
 * Updatet globale variabelen met positie van kogel of bal
 */
var beweegKogels = function() {
    
    kogelTijd = kogelTijd + 1;

    if ((mouseIsPressed) && (kogelTijd >= 25)) { // LETOP: als je de muis continue indrukt, dan komen er 50 kogels per seconde bij
        kogelX.push(spelerX); // voeg kogel toe aan het einde van de array
        kogelY.push(spelerY); // voeg kogel toe aan het einde van de array
        kogelTijd = 0;
    }
    for(var o = 0; o < kogelX.length; o++){
        if (kogelY[o] < 25) {
            kogelY.splice(o,1); // verwijder kogel uit de array
            kogelX.splice(o,1); // verwijder kogel uit de array
        } else {
            kogelY[o] = kogelY[o] - 8;
        }
    }
};

/**
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenSpeler = function(x, y) {
    
fill(255, 255, 255);
  triangle(x - 30, y + 15, x, y - 15, x + 30, y + 15);
};


/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
var beweegAlleVijanden = function() {
    for (var i=0; i < vijandX.length; i++) {
     vijandY[i] += 3;
        }
        if (vijandY[i] === 670){
            vijandY[i] = random(-10, -160);
            vijandX[i] = random(60, 1200);
        }
    };

/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */
var beweegSpeler = function() {
    
    spelerY = mouseY;
    spelerX = mouseX;

if(mouseX <= 30){
      spelerX = 30;
    } else if(mouseX >= 1250){
          spelerX = 1250;  
    } else { 
          spelerX = mouseX;
        }

if(mouseY >= 685){
       spelerY = 685;  
    } else if(mouseY <= 15){
       spelerY = 15;
    } else { 
        spelerY= mouseY;
    }   
};



/**
 * Zoekt uit of de vijand is geraakt
 * @returns {boolean} true als vijand is geraakt
 */
var checkVijandGeraakt = function() {
    for (var i = 0; i < vijandX.length; i++) {
        for(var o = 0; o < kogelX.length; o++){
            if (( abs(kogelY[o] - (vijandY[i] + 15)) < 30) && (abs((vijandX[i] + 30) - kogelX[o]) < 40)){
            vijandY[i] = random(-30, -300);
            vijandX[i] = random(30, 1230);

            kogelY.splice(o,1); // verwijder kogel uit de array
            kogelX.splice(o,1); // verwijder kogel uit de array        
            score = score + 1;
                if (i >= 10){
                i = 0;
                }
            }      
        }
    }
  return false;
};


/**
 * Zoekt uit of de speler is geraakt
 * bijvoorbeeld door botsing met vijand
 * @returns {boolean} true als speler is geraakt
 */
var checkSpelerGeraakt = function() {
    console.log("checkSpelerGeraakt: levens =",levens);
    for (var i = 0; i < vijandX.length; i++) {
        if(( abs((spelerX - 30) - vijandX[i]) < 60) && ((spelerY - 15) < vijandY[i]) || (abs(vijandY[i]) > 720)) {
            levens = levens - 1;
            vijandX[i] = random(30, 1200);
            vijandY[i] = random(-10, -500);
        }
    }
  return false;
};

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('black');
}


/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
    noStroke();
  switch (spelStatus) {
    case UITLEG:
        beginScherm();
    if (keyIsDown (13)){
        spelStatus = SPELEN;
        textSize(20);
        levens = 3;
        score = 0;
    vijandX = [67, 160, 240, 368, 490, 500]; // x-positie vijand
    vijandY = [-90, -200, -400, -500, -650, -700]; // y-positie vijand
    }
    break;  
    case SPELEN:
      beweegAlleVijanden();
      beweegKogels();
      beweegSpeler();
      
      if (checkVijandGeraakt()) {
        // punten erbij
        // nieuwe vijand maken
      }
      
      if (checkSpelerGeraakt()) {
        // leven eraf of gezondheid verlagen
        // eventueel: nieuwe speler maken
      }

      tekenVeld();
      tekenAlleVijanden();
      tekenKogels();
      tekenSpeler(spelerX, spelerY);

      if (levens === 0) {
        spelStatus = GAMEOVER;
      }
      break;
      case GAMEOVER:
      tekenEindScherm();
      if (keyIsDown (32)) {
          spelStatus = UITLEG;
      }
      break;
  }
}