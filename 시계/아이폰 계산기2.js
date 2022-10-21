const output = document.getElementById("output");
const form = document.getElementById("calc_form");
const hourEl = document.querySelector('.hour'); // 지금 시간 시
const minuteEl = document.querySelector('.minute'); // 지금 시간 분
const operand_btns = document.querySelectorAll("button[data-type=operand") // 피연산자
const operator_btns = document.querySelectorAll("button[data-type=operator") // 연산자


form.addEventListener("submit", (e) => {
    e.preventDefault();
});

let is_operator = false;
let equation = [];

const remove_active = () => {
    operator_btns.forEach((btn) =>{
        btn.classList.remove("active");
    });
};

operand_btns.forEach((btn) =>{
    btn.addEventListener("click",(e)=>{
        remove_active();
        if(output.value == "0"){
            output.value = e.target.value;
        }else if(output.value.includes(".")){
            output.value= output.value+ ""+ e.target.value.replace(".","");
        }else if(is_operator){
            is_operator=false;
            output.value=e.target.value;
        }else{
            output.value = output.value+""+e.target.value;
        }
    });
});

operator_btns.forEach((btn) =>{
    btn.addEventListener("click",(e)=>{
        switch(e.target.value){
            case "%" : output.value = parseFloat(output.value)/100;
            break;
            case "invert" : output.value = parseFloat(output.value)*-1;
            break;
            case "=" : equation.push(output.value);
            output.value = eval(equation.join(""));
            equation = [];
            break;
            default:
                let last_item = equation[equation.length -1];
            if(["/","*","+","-"].includes(last_item)&& is_operator){
                equation.pop();
                equation.push(e.target.value);
            }else{
                equation.push(output.value);
                equation.push(e.target.value);
            }
            is_operator = true;
            break;
 
            //0으로 나눗셈이 있을 때 막기위한 플래그 초기화
              let zeroDivisionFlag=false;

             // 나누기 0 예외처리
             if ( operator_btns == "÷" && operand_btns == 0){
              zeroDivisionFlag=true; 
             } 
              if (zeroDivisionFlag=true) {
              console.log("0으로 나누는 식이 있습니다.");
              // 0으로 나누면 Infinity 가 출력 되어서 콘솔창에 알림이 뜨고 0이 출력 되도록 초기화(C 버튼)로 변경
              form();
             }
        }
    })
})

// 지금 시간
const updateTime = () => {
    const currentTime = new Date();
  
    let currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
  
    if (currentHour > 12) {
      currentHour -= 12;
    }
    hourEl.textContent = currentHour.toString();
    minuteEl.textContent = currentMinute.toString().padStart(2, '0');
  }
  setInterval(updateTime, 1000);
  updateTime();









// 키보드 입력 (연산자 입력"*","/","=","ac"가 실행이 안됨.)
window.addEventListener("keydown",(e)=>{
    if(
        e.key === "0" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9" ||
        e.key === "."
    ) {
        clicknum(e.key);
    } else if(e.key ==="*") {
        clickOperation("*");
    } else if(e.key ==="-") {
        clickOperation("-");
    } else if(e.key ==="/") {
        clickOperation("/");
    } else if(e.key ==="+") {
        clickOperation("+");
    } else if(e.key === "Enter") {
        ClickEqual("=");
    }
});

  // 숫자 클릭
function clicknum(key) {
    operand_btns.forEach(button => {
        if(button.innerText === key) {
            button.click();
        }
    })
  };

  // 기호 클릭
  function clickOperation(key) {
    operator_btns.forEach(button => {
        if(button.innerText === key) {
            button.click();
        }
    })
  };
  function ClickEqual() {
   operator_btns.click();
  };