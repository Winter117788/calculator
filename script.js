function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multipy(num1, num2){
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0){
        return 'X, Denominator = 0';
    }
    return num1 / num2;
}


function operate(operater, num1, num2){
    switch(operater) {
        case '+':
            return add(num1, num2);
        
        case '-':
            return subtract(num1, num2);
        
        case '*':
            return multipy(num1, num2);

        case '/':
            return divide(num1, num2);

        default:
            return null;
    }
}


let firstNumber = '';
let secondNumber = '';
let currentOperator = '';
let resultDisplayed = false;

const display = document.getElementById('display');

// 数字按钮逻辑
document.querySelectorAll('.digit').forEach(button => {
    button.addEventListener('click', () => {
        if (resultDisplayed) {
            display.textContent = ''; // 清除之前结果
            resultDisplayed = false;
        }
        //display.textContent = '';
        if (display.textContent === '0') {  
            display.textContent = button.textContent;
        } else if (button.textContent === '.') {
            if (!display.textContent.includes('.')) {
                display.textContent += button.textContent; // 添加小数点
            }
        } else {
            display.textContent += button.textContent; // 否则继续添加新数字
        }
    });
});

function handleOperation() {
    if (firstNumber !== '' && currentOperator !== '') {
        secondNumber = parseFloat(display.textContent);
        const result = operate(currentOperator, firstNumber, secondNumber);
        display.textContent = result;
        resultDisplayed = true;
        firstNumber = result; // 结果成为下一次操作的第一个数字
        currentOperator = ''; // 清空运算符
    }
}

// 运算符按钮逻辑
document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => {
        if (firstNumber === '') {
            firstNumber = parseFloat(display.textContent);
            currentOperator = button.textContent;
            display.textContent = '';
        } else if (!resultDisplayed) {
            handleOperation(); // 调用新函数处理计算
            currentOperator = button.textContent; // 更新运算符
        }
    });
});

// 等号按钮逻辑
document.getElementById('equals').addEventListener('click', () => {
    handleOperation(); // 调用新函数处理计算
});


// 清除按钮逻辑
document.getElementById('clear').addEventListener('click', () => {
    firstNumber = '';
    secondNumber = '';
    currentOperator = '';
    display.textContent = 0;
    resultDisplayed = false;
});

document.getElementById('delete').addEventListener('click', () => {
    if (!resultDisplayed){
        if (display.textContent.length > 1) {
            display.textContent = display.textContent.slice(0, -1);
        }
        else {
            display.textContent = '0';
        }
    }
})

// 添加键盘监听
document.addEventListener('keydown', (event) => {
    const key = event.key;

    // 判断是否是数字键或小数点
    if ((key >= '0' && key <= '9') || key === '.') {
        const button = document.querySelector(`.digit[data-value="${key}"]`);
        if (button) {
            button.click();
        }
    }

    // 判断运算符
    if (['+', '-', '*', '/'].includes(key)) {
        const button = document.querySelector(`.operator[data-value="${key}"]`);
        if (button) {
            button.click();
        }
    }

    // 判断等号键
    if (key === 'Enter') {
        const button = document.getElementById('equals');
        button.click();
    }

    if (key === 'Backspace') {
        const button = document.getElementById('delete');
        button.click();
    }

    if (key === 'Escape') {
        const button = document.getElementById('clear');
        button.click();
    }
});