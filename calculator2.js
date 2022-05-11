"use strict;"

var input = document.getElementById('input'), //input/output button
    numar = document.querySelectorAll('.numere div'), //numere butoane
    operator = document.querySelectorAll('.operatori div'), //operatori butoane
    rezultat = document.getElementById('rezultat'), //egal buton
    clear = document.getElementById('clear'), //Del buton
    rezultatAfisat = false; //flag to keep an eye on what output is displayed
//adding click handlers to numbers buttons


for (var i = 0; i < numar.length; i++) {
    numar[i].addEventListener("click", function(e) {

        //storing current input string and its last character in variables - used later
        var stringulCurent = input.innerHTML; 
        var ultimulCaracter = stringulCurent[stringulCurent.length -1];

        //if results is not displayed, just keep adding
        if (rezultatAfisat === false) {
            input.innerHTML += e.target.innerHTML;
        } else if (rezultatAfisat === true && ultimulCaracter === "+" || ultimulCaracter === "-" || ultimulCaracter === "×" || ultimulCaracter === "÷")  { 
        //if results is currently displayed and user pressed a number
        //we need to keep on adding to the string for next operation 
            rezultatAfisat = false;
            input.innerHTML += e.target.innerHTML;    
        } else {
            //if results is currently displayed and user pressed a number
            //we need clear the input string and add the new input to start the new operation
            rezultatAfisat = false;
            input.innerHTML = "";
            input.innerHTML += e.target.innerHTML;  
        }

    });
}

// adding click handlers to number buttons
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function(e) {

        //storing current input string and its last character in variablrd - used later
        var stringulCurent = input.innerHTML;
        var ultimulCaracter = stringulCurent[stringulCurent.length - 1];

        //if last character entered is an operator, replace it with the currently pressed one
        if (ultimulCaracter === "+" || ultimulCaracter === "-" || ultimulCaracter === "×" || ultimulCaracter === "÷") {
            var stringNou = stringulCurent.substring(0, stringulCurent.length - 1) + e.target.innerHTML;
            input.innerHTML = stringNou;
        } else if (stringulCurent.length == 0) {
            //if first key pressed is an operator, don't do anything
            alert("Introdu un numar inainte!"); 
        } else {
            //else just add the operator pressed to the input
            input.innerHTML += e.target.innerHTML;
        }
    });
}

// on click of equal button
rezultat.addEventListener("click", function() {

    //this is the string that we will be processing eg. -10+26+33-56*34/23
    var introduceString = input.innerHTML;

    //forming an array of numbers. eg for above string it will be: numbers = ["10", "26", "33", "56", "34", "23"]
    var numere = introduceString.split(/\+|\-|\×|\÷/g);//||cauta--eplicatia-->split(/\+|\-|\x|\÷/g)<--||

    //forming an aray of operators. for above string it will be: operators = ["+", "-", "*", "/"]
     //first we replace all the numbers and dot with empty string and then split
    var operatori = introduceString.replace(/[0-9]|\./g, "").split("");

    console.log(introduceString);
    console.log(operatori);
    console.log(numere);
    console.log("---------------------------");

    // now we are looping through the array and doing one operation at a time.
    // first divide, then multiply, then subtraction and then addition
    // as we move we are alterning the original numbers and operators array
    // the final element remaining in the array will be the output

    var imparte = operatori.indexOf("÷");
    while (imparte != -1) {
        numere.splice(imparte, 2, numere[imparte] / numere[imparte + 1]);
        operatori.splice(imparte, 1);
        imparte = operatori.indexOf("÷");
    }


    var inmulteste = operatori.indexOf("×");
    while (inmulteste != -1) {
        numere.splice(inmulteste, 2, numere[inmulteste] * numere[inmulteste + 1]);
        operatori.splice(inmulteste, 1);
        inmulteste = operatori.indexOf("×");
    }

    var scade = operatori.indexOf("-");
    while (scade != -1) {
        numere.splice(scade, 2, numere[scade] - numere[scade + 1]);
        operatori.splice(scade, 1);
        scade = operatori.indexOf("-");
    }

    var aduna = operatori.indexOf("+");
    while (aduna != -1) { 
        //using parseFloat is necessary, otherwise it will result in strig concaternation :)
        numere.splice(aduna, 2, parseFloat(numere[aduna]) + parseFloat(numere[aduna + 1]));
        operatori.splice(aduna, 1);
        aduna = operatori.indexOf("+");
    }

    input.innerHTML = numere[0]; // displaying the output

    rezultatAfisat = true; // turning flag if results is displayed
});

//clearing the input on press of Del(clear)
clear.addEventListener("click", function() {
    input.innerHTML = "";
})