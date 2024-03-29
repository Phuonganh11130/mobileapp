'use strict';

// ワークエリア
var wkFirst = "1" 
var wkTotal = 0;  
var wkInput = ""; 
var wkCalc = "+";
var wkBefore = "1"; 

// ページ上の要素（Element)を参照

const elementcalcLog= document.getElementById("calcLog");
const elementResult= document.getElementById("result");
const num1= document.getElementById("num1");
const num2= document.getElementById("num2");
const num3= document.getElementById("num3");
const num4= document.getElementById("num4");
const num5= document.getElementById("num5");
const num6= document.getElementById("num6");
const num7= document.getElementById("num7");
const num8= document.getElementById("num8");
const num9= document.getElementById("num9");
const num0= document.getElementById("num0");
const elementAdd= document.getElementById("add");
const elementSub= document.getElementById("sub");
const elementMult= document.getElementById("mult");
const elementDiv= document.getElementById("div");
const elementEqual= document.getElementById("equal");
const elementCancel= document.getElementById("cancel");

// イベントを登録
num1.addEventListener("click",function(){edit(1)});
num2.addEventListener("click",function(){edit(2)});
num3.addEventListener("click",function(){edit(3)});
num4.addEventListener("click",function(){edit(4)});
num5.addEventListener("click",function(){edit(5)});
num6.addEventListener("click",function(){edit(6)});
num7.addEventListener("click",function(){edit(7)});
num8.addEventListener("click",function(){edit(8)});
num9.addEventListener("click",function(){edit(9)});
num0.addEventListener("click",function(){edit(0)});
elementAdd.addEventListener("click",function(){update("+")});
elementSub.addEventListener("click",function(){update("-")});
elementMult.addEventListener("click",function(){update("*")});
elementDiv.addEventListener("click",function(){update("/")});
elementEqual.addEventListener("click",dspResult);
elementCancel.addEventListener("click",clear);


function edit(wkInput) {
  
  if (wkBefore === "0") {
      elementResult.innerHTML = Number(elementResult.innerHTML + wkInput); //入力値の結合（ゼロサプレスして結合）
  } 
  else {
    elementResult.innerHTML = wkInput;
  }
  wkFirst = "0" 
  wkBefore = "0"
}

function update(calcType) {
  if (wkBefore === "0") {
    elementcalcLog.innerHTML = elementcalcLog.innerHTML + Number(elementResult.innerHTML) + calcType; 
    calculator();
  } 
  else {
    if (wkFirst === "1") {
      elementcalcLog.innerHTML = "0" + calcType;
    }
    else {
      let wkLogLastWord = elementcalcLog.innerHTML.slice(-1); 
      if (["+","-","*","/"].includes(wkLogLastWord)) {
        elementcalcLog.innerHTML = elementcalcLog.innerHTML.slice(0, -1) + calcType; 
      }
      else{
        elementcalcLog.innerHTML = elementcalcLog.innerHTML + calcType;
      }
    }
  }
  wkCalc = calcType;  
  wkBefore = "1";
}

/** =がクリックされたときの処理 */
function dspResult(){
  if(wkFirst === "0" && wkBefore === "0"){
    elementcalcLog.innerHTML=elementcalcLog.innerHTML + Number(elementResult.innerHTML);
    calculator();
    wkCalc = "=";
    wkBefore = "1";
  }
}

/** 計算結果をクリアします。(clear Result) */
function clear() {
  elementResult.innerHTML=0;
  elementcalcLog.innerHTML="";
  wkFirst = "1";
  wkTotal = 0;
  wkCalc = "+";
  wkBefore = "1";
}

// 計算
function calculator() {
  switch(wkCalc){
    case "+":
      wkTotal = Number(wkTotal) + Number(elementResult.innerHTML);
      break;
    case "-":
      wkTotal = Number(wkTotal) - Number(elementResult.innerHTML);
      break; 
    case "*":
      wkTotal = Number(wkTotal) * Number(elementResult.innerHTML);
      break; 
    case "/":
      wkTotal = Number(wkTotal) / Number(elementResult.innerHTML);
      break;    
  }
  elementResult.innerHTML = wkTotal;
}

document.body.addEventListener("keydown", keydownEvent, false);
function keydownEvent(event){
  if(event.key === "1") edit(1);
  if(event.key === "2") edit(2);
  if(event.key === "4") edit(4);
  if(event.key === "5") edit(5);
  if(event.key === "6") edit(6);
  if(event.key === "7") edit(7);
  if(event.key === "8") edit(8);
  if(event.key === "9") edit(9);
  if(event.key === "0") edit(0);

  if(event.key === "+") update("+");
  if(event.key === "-") update("-");
  if(event.key === "*") update("*");
  if(event.key === "/") update("/");

  if(event.key === "Delete") clear();
  if(event.key === "Enter") dspResult();
}
