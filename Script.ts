class calculator {


    public curr_data: string;
    public prev_data: string;
    public dummy: boolean;
    public current_display: string;
    public previous_display: string;
    public process_operand: any;
    public memory: any[] = [];
    public par: any;



    constructor(prev_data, curr_data) {

        this.curr_data = curr_data;
        this.prev_data = prev_data;
        this.clear();
        this.memory = [];

    }

    clear() {
        this.dummy = false;
        this.current_display = " ";
        this.previous_display = " ";
        this.par = " ";
        this.process_operand = undefined;

    }

    delete() {
        if (this.current_display != '') {
            this.current_display = this.current_display.toString().slice(0, -1);

        }




        else if (this.previous_display != '') {

            this.previous_display = this.previous_display.toString().slice(0, -1);
        }
        else if (this.process_operand != '') {

            this.process_operand = this.process_operand.toString().slice(0, -1);

        }
    }
    appendnum(number:any) {

        if (number == '.' && this.current_display.includes('.')) return
        if (this.dummy) {

            this.current_display = number.toString();
            this.dummy = false;
        }
        else {

            this.current_display = this.current_display.toString() + number.toString();
        }

    }

    operations(process_operand:any) {
        if (this.current_display === '') return

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



    }

    fe() {
        let len:number = this.current_display.length;
        const curr_value = Number(this.current_display);
        let num: number = (curr_value / Math.pow(10, len - 2));
        //console.log(num);
        this.current_display = num.toString();
        //console.log(this.curr_data);
    }

    process() {

        let answer:any;
        const prev_value = parseFloat(this.previous_display);
        const curr_value = parseFloat(this.current_display);
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


    }


    getdisplaynumber(number:any) {
        const stringnum = number.toString();
        const intnum = parseFloat(stringnum.split('.')[0]);
        const decimalnum = stringnum.split('.')[1];

        let intdisplay:any;
        if (isNaN(intnum)) {
            intdisplay = '';

        }
        else {

            intdisplay = intnum.toLocaleString('en', { maximumFractionDigits: 0 })

        }
        if (decimalnum != null) {

            return `${intdisplay}.${decimalnum}`;



        }

        else {

            return intdisplay;


        }


    }


    sqr() {

        let answer:any;
        const prev_value = parseFloat(this.previous_display);
        const curr_value = parseFloat(this.current_display);
        if (curr_value != null) {
            answer = Math.pow(curr_value, 2);
            this.current_display = answer;
            this.process_operand = undefined;
            this.previous_display = " ";

        }



    }
    
    negat() {


        let answer;
        const prev_value = parseFloat(this.previous_display);
        const curr_value = parseFloat(this.current_display);
        if (curr_value != null) {
            answer = (-1) * curr_value;
            console.log(answer);
            this.current_display = answer;
            this.process_operand = undefined;
            this.previous_display = " ";

        }

    }


    appendParenthesis(par1:any) {


        this.par = this.par.toString() + par1.toString();


    }
    updateDisplayParenthesis() {
        (<HTMLElement>prev_data).innerText = this.par;
        (<HTMLElement>curr_data).innerText = '';
    }


    absolone_num() {

        let answer:any;
        const prev_value = parseFloat(this.previous_display);
        const curr_value = parseFloat(this.current_display);
        if (curr_value != null) {
            answer = Math.abs(curr_value);
            this.current_display = answer;
            this.process_operand = undefined;
            this.previous_display = " ";

        }
    }



    exponentional_num() {

        let answer:any;
        let prev_value:any;

        const curr_value = parseFloat(this.current_display);
        if (curr_value != null) {
            prev_value = 1;
            answer = curr_value.toExponential();

            this.current_display = answer;
            this.process_operand = undefined;
            this.previous_display = " ";

        }



    }


    updateDisplay() {


        const opr1 = ['  '];
        const opr2 = ['abs', 'negative', 'floor', 'ceil', 'sqr', 'cube', '1/'];
        (<HTMLElement>curr_data).innerText = this.getdisplaynumber(this.current_display);
        if (this.process_operand != null) {

            if (opr1.includes(this.process_operand)) {

                (<HTMLElement>prev_data).innerText = `${this.process_operand} (${this.getdisplaynumber(this.current_display)})`;
                (<HTMLElement>curr_data).innerText = ' ';
                return;

            }
            else if (opr2.includes(this.process_operand)) {
                (<HTMLElement>prev_data).innerText = `${this.process_operand} (${this.getdisplaynumber(this.previous_display)})`;
                (<HTMLElement>curr_data).innerText = ' ';

                return;
            }


        }
        else {

            (<HTMLElement>prev_data).innerText = ' ';

        }

    }

    deg() {


        const prev_value = parseFloat(this.previous_display);
        const curr_value = parseFloat(this.current_display);
        let num = ((curr_value / Math.PI) * 180);
        (<HTMLElement>curr_data).innerText = `${num}`;


    }

    divide() {
        let answer:any;
        const prev_value = parseFloat(this.previous_display);
        const curr_value = parseFloat(this.current_display);
        if (curr_value != null) {

            answer = 1 / curr_value;

        }
        else {

            answer = 0;

        }

        this.current_display = answer;
        this.process_operand = undefined;
        this.previous_display = " ";


    }

    sqrt() {


        let answer:any;
        const prev_value = parseFloat(this.previous_display);
        const curr_value = parseFloat(this.current_display);
        if (curr_value != null) {
            answer = Math.sqrt(curr_value);
            this.current_display = answer;
            this.process_operand = undefined;
            this.previous_display = " ";

        }


    }
    num_fact() {

        let answer = 1;
        const prev_value = parseFloat(this.previous_display);
        const curr_value = parseFloat(this.current_display);
        if (curr_value != null) {
            for (let i = 1; i <= curr_value; i++) {
                answer *= i;
            }
            this.current_display = answer.toString();
            this.process_operand = undefined;
            this.previous_display = " ";


        }
    }



    show_result() {

        (<HTMLElement>curr_data).innerText = this.getdisplaynumber(this.current_display);
        if (this.process_operand != null) {
            (<HTMLElement>prev_data).innerText = `${this.getdisplaynumber(this.previous_display)} ${this.process_operand}`;
        }

        else {

            (<HTMLElement>prev_data).innerText  = '';

      }

    }

    clearMemory() {

        this.memory = [];
        this.current_display = "0";
        this.curr_data = "0";


    }

    added() {

        let index = this.memory.length;
        if (this.current_display != ' ' && index == 0) {

            this.memory.push(parseFloat(this.current_display));


        }
        index = this.memory.length;
        if (index > 0) {


            this.memory[index - 1] -= parseFloat(this.current_display);
            console.log(this.memory);



        }

    }


    re_call() {

        let ind = this.memory.length;
        if (ind != 0) {


            this.current_display = (this.memory[ind - 1]);
            (<HTMLElement>curr_data).innerText = this.memory[ind - 1];
        }



    }
    minus() {

        let index = this.memory.length;
        if (index > 0) {


            this.memory[index - 1] -= parseFloat(this.current_display);
            console.log(this.memory);

        }


    }

    stored() {


        if (this.current_display == ' ') {
            return
        }
        this.memory.push(this.current_display);
        console.log(this.memory);

    }

}


const num1 = document.querySelectorAll('[numeric]')!;
const operand = document.querySelectorAll('[operation]')!;
const ans = document.querySelector('[equals]')!;
const del = document.querySelector('[clear]')!;
const p_i = document.querySelector('[pi]')!;
const sqr_num = document.querySelector('[sqr]')!;
const fact_num = document.querySelector('[fact]')!;
const sqrt_num = document.querySelector('[sqrt]')!;
const divide_num = document.querySelector('[divide]')!;
const pow_num = document.querySelector('[power]')!;
const abs_num = document.querySelectorAll('[absolone]')!;
const exp_num = document.querySelector('[exponentiional]')!;
const mod_num = document.querySelector('[modulo]')!;
const e_button = document.querySelector('[ebutton]')!;
const allclear = document.querySelector('[cleaner]')!;
const memory_mr = document.querySelector('[memory-mr]')!;
const memory_mc = document.querySelector('[memory-mc]')!;
const memory_mplus = document.querySelector('[memory-m-plus]')!;
const memory_m_minus = document.querySelector('[memory-m-]')!;
const memory_ms = document.querySelector('[memory-ms]')!;
const prev_data = document.querySelector('[previous-data]')!;
const curr_data = document.querySelector('[current-data]')!;
const parenth_data = document.querySelectorAll('[parenthesis]')!;
const fe_data = document.querySelector('[FE]')!;
const deg_data = document.querySelector('[DEG]')!;
const negative_data = document.querySelector('[plusminus]')!;


const cal = new calculator(prev_data, curr_data)

num1.forEach(button => {


    button.addEventListener('click', () => {


        cal.appendnum((<HTMLElement>button).innerText);
        cal.show_result();

    });


});


operand.forEach(button => {


    button.addEventListener('click', () => {


        cal.operations((<HTMLElement>button).innerText);
        cal.updateDisplay();
        cal.show_result();

    });


});
parenth_data.forEach(button => {


    button.addEventListener('click', () => {


        cal.appendParenthesis((<HTMLElement>button).innerText);
        cal.updateDisplayParenthesis();


    });


});



ans.addEventListener('click', button => {

    cal.process();
    cal.updateDisplay();
    cal.show_result();



});
allclear.addEventListener('click', button => {

    cal.clear();
    cal.show_result();


});

del.addEventListener('click', button => {

    cal.delete();
    cal.show_result();


});

fe_data.addEventListener('click', button => {

    cal.fe();
    cal.show_result();


});

deg_data.addEventListener('click', button => {

    cal.deg();
    cal.show_result();


});

p_i.addEventListener('click', button => {


    cal.appendnum(Math.PI)
    cal.show_result();



});

e_button.addEventListener('click', button => {
    cal.appendnum(Math.E)
    cal.show_result();




});

sqr_num.addEventListener('click', button => {

    cal.sqr();
    cal.show_result();




});

negative_data.addEventListener('click', button => {

    cal.negat();

    console.log("hi");

    cal.show_result();




});

divide_num.addEventListener('click', button => {

    cal.divide();
    cal.show_result();




});

memory_mc.addEventListener('click', button => {
    cal.clearMemory();
});

memory_mr.addEventListener('click', button => {
    cal.re_call();
});

memory_m_minus.addEventListener('click', button => {
    cal.minus();
});

memory_mplus.addEventListener('click', button => {
    cal.added();
});

memory_ms.addEventListener('click', button => {
    cal.stored();
});



abs_num.forEach(button => {


    button.addEventListener('click', () => {

        cal.absolone_num();
        cal.show_result();

    });


});



exp_num.addEventListener('click', button => {

    cal.exponentional_num();
    cal.show_result();


});

sqrt_num.addEventListener('click', button => {

    cal.sqrt();
    cal.show_result();

});

fact_num.addEventListener('click', button => {

    cal.num_fact();
    cal.show_result();

}); 
