var calculator = /** @class */ (function () {
    function calculator(prev_data, curr_data) {
        this.memory = [];
        this.curr_data = curr_data;
        this.prev_data = prev_data;
        this.clear();
        this.memory = [];
    }
    calculator.prototype.clear = function () {
        this.dummy = false;
        this.current_display = " ";
        this.previous_display = " ";
        this.par = " ";
        this.process_operand = undefined;
    };
    calculator.prototype["delete"] = function () {
        if (this.current_display != '') {
            this.current_display = this.current_display.toString().slice(0, -1);
        }
        else if (this.previous_display != '') {
            this.previous_display = this.previous_display.toString().slice(0, -1);
        }
        else if (this.process_operand != '') {
            this.process_operand = this.process_operand.toString().slice(0, -1);
        }
    };
    calculator.prototype.appendnum = function (number) {
        if (number == '.' && this.current_display.includes('.'))
            return;
        if (this.dummy) {
            this.current_display = number.toString();
            this.dummy = false;
        }
        else {
            this.current_display = this.current_display.toString() + number.toString();
        }
    };
    calculator.prototype.operations = function (process_operand) {
        if (this.current_display === '')
            return;
        if (this.previous_display != '') {
            this.process();
        }
        this.process_operand = process_operand;
        if (process_operand == 'xy') {
            this.process_operand = '^';
        }
        else if (process_operand == '10x') {
            this.process_operand = '10^';
        }
        else if (process_operand == 'log') {
            this.process_operand = 'log()';
        }
        else if (process_operand == 'ln') {
            this.process_operand = 'ln()';
        }
        else if (process_operand == '|x|') {
            this.process_operand = 'abs()';
        }
        else if (process_operand == '⌊x⌋') {
            this.process_operand = 'floor()';
        }
        else if (process_operand == '⌈x⌉') {
            this.process_operand = 'ceil()';
        }
        else if (process_operand == 'rand') {
            this.process_operand = 'rand()';
        }
        else if (process_operand == '→dms') {
            this.process_operand = 'dms';
        }
        else if (process_operand == '←deg') {
            this.process_operand = 'deg';
        }
        this.previous_display = this.current_display;
        this.current_display = ' ';
    };
    calculator.prototype.fe = function () {
        var len = this.current_display.length;
        var curr_value = Number(this.current_display);
        var num = (curr_value / Math.pow(10, len - 2));
        //console.log(num);
        this.current_display = num.toString();
        //console.log(this.curr_data);
    };
    calculator.prototype.process = function () {
        var answer;
        var prev_value = parseFloat(this.previous_display);
        var curr_value = parseFloat(this.current_display);
        //if (isNaN(prev_value || isNaN(curr_value))) return
        switch (this.process_operand) {
            case '+':
                answer = prev_value + curr_value;
                break;
            case '-':
                answer = prev_value - curr_value;
                break;
            case '*':
                answer = prev_value * curr_value;
                break;
            case '÷':
                answer = prev_value / curr_value;
                break;
            case 'π':
                answer = Math.PI;
                break;
            case 'mod':
                answer = prev_value % curr_value;
                break;
            case '^':
                answer = Math.pow(prev_value, curr_value);
                break;
            case '10^':
                answer = Math.pow(10, curr_value);
                break;
            case 'log()':
                answer = Math.log10(curr_value);
                break;
            case 'ln()':
                answer = Math.log2(curr_value);
                break;
            case 'Sin':
                answer = Math.sin(curr_value);
                break;
            case 'Cos':
                answer = Math.cos(curr_value);
                break;
            case 'Tan':
                answer = Math.tan(curr_value);
                break;
            case 'Csc':
                answer = 1 / Math.sin(curr_value);
                break;
            case 'Sec':
                answer = 1 / Math.cos(curr_value);
                break;
            case 'Cot':
                answer = 1 / Math.tan(curr_value);
                break;
            case 'ceil()':
                answer = Math.ceil(curr_value);
                break;
            case 'floor()':
                answer = Math.floor(curr_value);
                break;
            case 'rand()':
                answer = 10 * Math.random();
                break;
            default:
                return;
        }
        this.current_display = answer;
        this.dummy = true;
        this.process_operand = undefined;
        this.previous_display = " ";
    };
    calculator.prototype.getdisplaynumber = function (number) {
        var stringnum = number.toString();
        var intnum = parseFloat(stringnum.split('.')[0]);
        var decimalnum = stringnum.split('.')[1];
        var intdisplay;
        if (isNaN(intnum)) {
            intdisplay = '';
        }
        else {
            intdisplay = intnum.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalnum != null) {
            return "".concat(intdisplay, ".").concat(decimalnum);
        }
        else {
            return intdisplay;
        }
    };
    calculator.prototype.sqr = function () {
        var answer;
        var prev_value = parseFloat(this.previous_display);
        var curr_value = parseFloat(this.current_display);
        if (curr_value != null) {
            answer = Math.pow(curr_value, 2);
            this.current_display = answer;
            this.process_operand = undefined;
            this.previous_display = " ";
        }
    };
    calculator.prototype.negat = function () {
        var answer;
        var prev_value = parseFloat(this.previous_display);
        var curr_value = parseFloat(this.current_display);
        if (curr_value != null) {
            answer = (-1) * curr_value;
            console.log(answer);
            this.current_display = answer;
            this.process_operand = undefined;
            this.previous_display = " ";
        }
    };
    calculator.prototype.appendParenthesis = function (par1) {
        this.par = this.par.toString() + par1.toString();
    };
    calculator.prototype.updateDisplayParenthesis = function () {
        prev_data.innerText = this.par;
        curr_data.innerText = '';
    };
    calculator.prototype.absolone_num = function () {
        var answer;
        var prev_value = parseFloat(this.previous_display);
        var curr_value = parseFloat(this.current_display);
        if (curr_value != null) {
            answer = Math.abs(curr_value);
            this.current_display = answer;
            this.process_operand = undefined;
            this.previous_display = " ";
        }
    };
    calculator.prototype.exponentional_num = function () {
        var answer;
        var prev_value;
        var curr_value = parseFloat(this.current_display);
        if (curr_value != null) {
            prev_value = 1;
            answer = curr_value.toExponential();
            this.current_display = answer;
            this.process_operand = undefined;
            this.previous_display = " ";
        }
    };
    calculator.prototype.updateDisplay = function () {
        var opr1 = ['  '];
        var opr2 = ['abs', 'negative', 'floor', 'ceil', 'sqr', 'cube', '1/'];
        curr_data.innerText = this.getdisplaynumber(this.current_display);
        if (this.process_operand != null) {
            if (opr1.includes(this.process_operand)) {
                prev_data.innerText = "".concat(this.process_operand, " (").concat(this.getdisplaynumber(this.current_display), ")");
                curr_data.innerText = ' ';
                return;
            }
            else if (opr2.includes(this.process_operand)) {
                prev_data.innerText = "".concat(this.process_operand, " (").concat(this.getdisplaynumber(this.previous_display), ")");
                curr_data.innerText = ' ';
                return;
            }
        }
        else {
            prev_data.innerText = ' ';
        }
    };
    calculator.prototype.deg = function () {
        var prev_value = parseFloat(this.previous_display);
        var curr_value = parseFloat(this.current_display);
        var num = ((curr_value / Math.PI) * 180);
        curr_data.innerText = "".concat(num);
    };
    calculator.prototype.divide = function () {
        var answer;
        var prev_value = parseFloat(this.previous_display);
        var curr_value = parseFloat(this.current_display);
        if (curr_value != null) {
            answer = 1 / curr_value;
        }
        else {
            answer = 0;
        }
        this.current_display = answer;
        this.process_operand = undefined;
        this.previous_display = " ";
    };
    calculator.prototype.sqrt = function () {
        var answer;
        var prev_value = parseFloat(this.previous_display);
        var curr_value = parseFloat(this.current_display);
        if (curr_value != null) {
            answer = Math.sqrt(curr_value);
            this.current_display = answer;
            this.process_operand = undefined;
            this.previous_display = " ";
        }
    };
    calculator.prototype.num_fact = function () {
        var answer = 1;
        var prev_value = parseFloat(this.previous_display);
        var curr_value = parseFloat(this.current_display);
        if (curr_value != null) {
            for (var i = 1; i <= curr_value; i++) {
                answer *= i;
            }
            this.current_display = answer.toString();
            this.process_operand = undefined;
            this.previous_display = " ";
        }
    };
    calculator.prototype.show_result = function () {
        curr_data.innerText = this.getdisplaynumber(this.current_display);
        if (this.process_operand != null) {
            prev_data.innerText = "".concat(this.getdisplaynumber(this.previous_display), " ").concat(this.process_operand);
        }
        else {
            prev_data.innerText = '';
        }
    };
    calculator.prototype.clearMemory = function () {
        this.memory = [];
        this.current_display = "0";
        this.curr_data = "0";
    };
    calculator.prototype.added = function () {
        var index = this.memory.length;
        if (this.current_display != ' ' && index == 0) {
            this.memory.push(parseFloat(this.current_display));
        }
        index = this.memory.length;
        if (index > 0) {
            this.memory[index - 1] -= parseFloat(this.current_display);
            console.log(this.memory);
        }
    };
    calculator.prototype.re_call = function () {
        var ind = this.memory.length;
        if (ind != 0) {
            this.current_display = (this.memory[ind - 1]);
            curr_data.innerText = this.memory[ind - 1];
        }
    };
    calculator.prototype.minus = function () {
        var index = this.memory.length;
        if (index > 0) {
            this.memory[index - 1] -= parseFloat(this.current_display);
            console.log(this.memory);
        }
    };
    calculator.prototype.stored = function () {
        if (this.current_display == ' ') {
            return;
        }
        this.memory.push(this.current_display);
        console.log(this.memory);
    };
    return calculator;
}());
var num1 = document.querySelectorAll('[numeric]');
var operand = document.querySelectorAll('[operation]');
var ans = document.querySelector('[equals]');
var del = document.querySelector('[clear]');
var p_i = document.querySelector('[pi]');
var sqr_num = document.querySelector('[sqr]');
var fact_num = document.querySelector('[fact]');
var sqrt_num = document.querySelector('[sqrt]');
var divide_num = document.querySelector('[divide]');
var pow_num = document.querySelector('[power]');
var abs_num = document.querySelectorAll('[absolone]');
var exp_num = document.querySelector('[exponentiional]');
var mod_num = document.querySelector('[modulo]');
var e_button = document.querySelector('[ebutton]');
var allclear = document.querySelector('[cleaner]');
var memory_mr = document.querySelector('[memory-mr]');
var memory_mc = document.querySelector('[memory-mc]');
var memory_mplus = document.querySelector('[memory-m-plus]');
var memory_m_minus = document.querySelector('[memory-m-]');
var memory_ms = document.querySelector('[memory-ms]');
var prev_data = document.querySelector('[previous-data]');
var curr_data = document.querySelector('[current-data]');
var parenth_data = document.querySelectorAll('[parenthesis]');
var fe_data = document.querySelector('[FE]');
var deg_data = document.querySelector('[DEG]');
var negative_data = document.querySelector('[plusminus]');
var cal = new calculator(prev_data, curr_data);
num1.forEach(function (button) {
    button.addEventListener('click', function () {
        cal.appendnum(button.innerText);
        cal.show_result();
    });
});
operand.forEach(function (button) {
    button.addEventListener('click', function () {
        cal.operations(button.innerText);
        cal.updateDisplay();
        cal.show_result();
    });
});
parenth_data.forEach(function (button) {
    button.addEventListener('click', function () {
        cal.appendParenthesis(button.innerText);
        cal.updateDisplayParenthesis();
    });
});
ans.addEventListener('click', function (button) {
    cal.process();
    cal.updateDisplay();
    cal.show_result();
});
allclear.addEventListener('click', function (button) {
    cal.clear();
    cal.show_result();
});
del.addEventListener('click', function (button) {
    cal["delete"]();
    cal.show_result();
});
fe_data.addEventListener('click', function (button) {
    cal.fe();
    cal.show_result();
});
deg_data.addEventListener('click', function (button) {
    cal.deg();
    cal.show_result();
});
p_i.addEventListener('click', function (button) {
    cal.appendnum(Math.PI);
    cal.show_result();
});
e_button.addEventListener('click', function (button) {
    cal.appendnum(Math.E);
    cal.show_result();
});
sqr_num.addEventListener('click', function (button) {
    cal.sqr();
    cal.show_result();
});
negative_data.addEventListener('click', function (button) {
    cal.negat();
    console.log("hi");
    cal.show_result();
});
divide_num.addEventListener('click', function (button) {
    cal.divide();
    cal.show_result();
});
memory_mc.addEventListener('click', function (button) {
    cal.clearMemory();
});
memory_mr.addEventListener('click', function (button) {
    cal.re_call();
});
memory_m_minus.addEventListener('click', function (button) {
    cal.minus();
});
memory_mplus.addEventListener('click', function (button) {
    cal.added();
});
memory_ms.addEventListener('click', function (button) {
    cal.stored();
});
abs_num.forEach(function (button) {
    button.addEventListener('click', function () {
        cal.absolone_num();
        cal.show_result();
    });
});
exp_num.addEventListener('click', function (button) {
    cal.exponentional_num();
    cal.show_result();
});
sqrt_num.addEventListener('click', function (button) {
    cal.sqrt();
    cal.show_result();
});
fact_num.addEventListener('click', function (button) {
    cal.num_fact();
    cal.show_result();
});
