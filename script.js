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

var kogelX = 0;    // x-positie van kogel
var kogelY = 0;    // y-positie van kogel
var aanwezigKogel = false;
/* 
variabele triangle vijand
*/
var vijandX = 67; // x-positie vijand
var vijandY = 90; // y-positie vijand
var vijandWachtTijd = 100; //aantal 50e van een seconde 


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
  fill(135, 206, 235);
  rect(0, 0, 1280, 1280);
  fill(0,0,0);
  text("Levens: " + levens, 50, 50);
  console.log("tekenVeld");
  text("Score: " + score, 150, 50);  
};


/**
 * Tekent de vijand
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenVijand = function(x, y) {
    noStroke();
    fill(255,0,0);
     triangle (x, y, x + 60, y, x + 30, y + 30);
};

     
/**
 * Tekent de kogel of de bal
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenKogel = function(x, y) {
    fill(255, 0, 0);

    if (aanwezigKogel === true){
         ellipse (x, y, 5, 15);
     }
  
   
};

/**
 * Updatet globale variabelen met positie van kogel of bal
 */
var beweegKogel = function() {
    kogelY = kogelY - 8;
    if ((aanwezigKogel === false) && (mouseIsPressed)) {
        aanwezigKogel = true;
        kogelY = spelerY; 
        kogelX = spelerX; 
    }
    if (kogelY < 30) {
        aanwezigKogel = false;
    }
};

/**
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenSpeler = function(x, y) {
    
fill(0, 0, 0);
  triangle(x - 30, y + 15, x, y - 15, x + 30, y + 15);

   
};


/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
var beweegVijand = function() {
        if(vijandWachtTijd === 0){
     vijandY += 3;
        }
        else{
        vijandWachtTijd -= 1;
        }
        if (vijandY === 670){
            vijandY -=1;
        }
  
};

/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */
var beweegSpeler = function() {
    
    spelerY = mouseY;
    spelerX = mouseX;

if(mouseX <= 50){
      spelerX = 50;
    } else if(mouseX >= 1230){
          spelerX = 1230;  
    } else { 
          spelerX = mouseX;
        }

if(mouseY >= 685){
       spelerY = 685;  
    } else if(mouseY <= 500){
       spelerY = 500;
    } else { 
        spelerY= mouseY;
    }   
};



/**
 * Zoekt uit of de vijand is geraakt
 * @returns {boolean} true als vijand is geraakt
 */
var checkVijandGeraakt = function() {
    if ((abs(kogelY - (vijandY + 15)) < 30) && (abs((vijandX + 30) - kogelX) < 40)){
        vijandY = random(-30, -130);
        vijandX = random(30, 1250);
        aanwezigKogel = false;
        score = score + 1;
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
    if(( abs((spelerX - 30) - vijandX) < 60) && ((spelerY - 15) <= vijandY) || (abs(vijandY) > 671)) {
        levens = levens - 1; 
        vijandY = random (-50, -100); 
        vijandX = random (60, 1220);
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
    }
    break;  
    case SPELEN:
      beweegVijand();
      beweegKogel();
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
      tekenVijand(vijandX, vijandY);
      tekenKogel(kogelX, kogelY);
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