const result = document.getElementsByClassName("result")[0];
const calculations = {
    firstNo: "",
    secondNo: "",
    operator: ""
};

function changeTheme(){
    const bodyClasses = document.getElementsByTagName("body")[0].classList
    if(bodyClasses.contains("theme-1")){
        bodyClasses.remove("theme-1");
        bodyClasses.add("theme-2");
    } else if(bodyClasses.contains("theme-2")){
        bodyClasses.remove("theme-2");
        bodyClasses.add("theme-3");
    } else if(bodyClasses.contains("theme-3")){
        bodyClasses.remove("theme-3");
        bodyClasses.add("theme-1")
    }
}

function reset(){
    result.textContent = "";
    calculations.firstNo = "";
    calculations.operator = "";
    calculations.secondNo = "";
}

function del(){
    result.textContent = result.textContent.substring(0, result.textContent.length - 1);
    formatNumber();
}

function decimal(){
    if (!result.textContent.includes(".")){
        if (result.textContent === ""){
            result.textContent += "0.";
        } else {
            result.textContent += ".";
        }
    }
}

function formatNumber(){
    const substrings = result.textContent.split(".");
    let wholenumber = substrings[0].split(",").join("");
    if (wholenumber.length > 3){
        let thousandGrps = [];
        for (let j = 0; j < Math.floor(wholenumber.length / 3); j++){
            thousandGrps.push(wholenumber.slice(wholenumber.length-(3 * (j + 1)),wholenumber.length - (3 * j)));
        } 
        const firstNumbers = wholenumber.slice(0 , wholenumber.length % 3);
        if (firstNumbers !== ""){
            thousandGrps.push(wholenumber.slice(0 , wholenumber.length % 3));
        }
        substrings[0] = thousandGrps.reverse().join(",");
        result.textContent = substrings.join(".");
    } else {
        result.textContent = result.textContent.split(",").join("");
    }
}

function eval(){
    switch (calculations.operator){
        case "multiply":
            result.textContent = calculations.firstNo * calculations.secondNo; 
            calculations.firstNo = calculations.firstNo * calculations.secondNo;
            calculations.secondNo = "";
            formatNumber();
            break;
        case "add":
            result.textContent = calculations.firstNo + calculations.secondNo; 
            calculations.firstNo = calculations.firstNo + calculations.secondNo;
            calculations.secondNo = "";
            formatNumber();
            break;
        case "minus":
            result.textContent = calculations.firstNo - calculations.secondNo; 
            calculations.firstNo = calculations.firstNo - calculations.secondNo;
            calculations.secondNo = "";
            formatNumber();
            break;
        case "divide":
            result.textContent = calculations.firstNo / calculations.secondNo; 
            calculations.firstNo = calculations.firstNo / calculations.secondNo;
            calculations.secondNo = "";
            formatNumber();
            break;
    }
}

function equal(){
    eval();
    calculations.operator = "equal";
}

const keys = document.getElementsByClassName("number-key");
for(let i = 0; i < keys.length; i++){
    keys[i].addEventListener("click", () => {
        if (calculations.operator === ""){
            if (result.textContent.length < 12){
                if (parseFloat(result.textContent) !== 0){
                    result.textContent += keys[i].value;
                } else {
                    result.textContent = keys[i].value;
                }
            }
            formatNumber();
            calculations.firstNo = parseFloat(result.textContent.split(",").join(""));
        } else {
            if (calculations.operator === "equal"){
                reset();
                result.textContent = keys[i].value;
            } else {
                if (calculations.secondNo === ""){
                    result.textContent = keys[i].value;
                } else {
                    if (parseFloat(result.textContent) !== 0){
                        result.textContent += keys[i].value;
                    } else {
                        result.textContent = keys[i].value;
                    }
                }
                formatNumber();
                calculations.secondNo = parseFloat(result.textContent.split(",").join(""));
            }

        }
    });
}

const operators = document.getElementsByClassName("operator");
for(let i = 0; i < operators.length; i++){
    operators[i].addEventListener("click", () => {
        if (calculations.operator === ""){
            calculations.operator = operators[i].value;
        } else {
            eval();
            calculations.operator = operators[i].value;
            console.log(calculations);
        }
    });
}
