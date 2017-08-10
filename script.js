var app = new Vue({
  el: "#calc",
  delimiters: ["${", "}"],
  data: {
    dec: 0,
    float: false,
    memory: 0,
    type: "",
    operands: [],
    print_out: "",
    input: "",
    operated: false,
    result: 0
  },

  methods: {
    
    canTrip: function() {
      this.result = "";
      this.print_out = "THANK YOU! BE SURE TO STAR ON GITHUB!";
    },

    clearNum: function() {
      this.dec = 0;
      this.float = false;
      this.memory = 0;
      this.type = "";
      this.operands = [];
      this.print_out = "";
      this.input = "";
      this.operated = false;
      this.result = 0;
    },

    erraseNum: function() {
      this.clearNum();
    },

    getNum: function(n) {
      //if integers
      if (!this.float) {
        //commit integer to memory
        this.memory = (this.memory * 10) + n;
        this.input = this.memory.toString();
        this.printOut(this.input);
        //if floats above .000
      } else if (this.float) {
        this.memory = ((this.memory * this.dec) + n) / this.dec;
        this.input = this.memory.toString();
        this.printOut(this.input);
        this.dec *= 10;
        if (this.dec >= 100000) {
        this.input = "MAX. DECIMAL ERROR";
        this.printOut(this.input);
        }
      }
      
    },
    
    makeFloat: function() {
      this.float = true;
      this.dec += 10;
    },
    
    printOut: function(input){
      this.print_out = input;
    },
    
    pushOperand: function(){
      if(!this.operated){
        //set second operator from memory
        this.operands.push(this.memory);
        console.log("Push level: " + this.operands + " Type: " + this.type);
      } else {
        //on flushed memory, set result as first operand
        this.operands[0] = Number(this.result);
        console.log("Push level: " + this.operands + " Type: " + this.type);
        this.operated = false;
      }
    },
    
    sumOp: function() {
        //Set operator type, reflect on display
        this.type = "sum";
        this.print_out += " + ";
        //push seconf operand argument and flush memory
        this.pushOperand();
        this.flushMem();
    },

    subOp: function() {
      //Set operator type, reflect on display
      this.type = "sub";
      this.print_out += " - ";
      //push seconf operand argument and flush memory
      this.pushOperand();
      this.flushMem();
    },

    timesOp: function() {
      //Set operator type, reflect on display
      this.type = "mult";
      this.print_out += " * ";
      //push seconf operand argument and flush memory
      this.pushOperand();
      this.flushMem();
    },

    divideOp: function() {
      //Set operator type, reflect on display
      this.type = "div";
      this.print_out += " / ";
      //push seconf operand argument and flush memory
      this.pushOperand();
      this.flushMem();
    },

    getResult: function() {
      this.pushOperand();
      //operate
      switch (this.type) {
        case "sum":
          //Add
          this.result = this.operands.reduce(function(sum, value){return sum + value});
          this.flushOp();
          break;
        case "sub":
          //Substract
          this.result = this.operands.reduce(function(sum, value){return sum - value});
          this.flushOp();
          break;
        case "mult":
          //Multiply
          this.result = this.operands.reduce(function(sum, value){return sum * value});
          this.float ? this.result.toFixed(3) : this.result;
          this.flushOp();
          break;
        case "div":
          //Divide
          this.result = this.operands.reduce(function(sum, value){return sum / value}).toFixed(3);
          this.flushOp();
          break;
        default:
          this.result = "NAN";
          this.print_out = "OPERATION TYPE ERROR";
          break;
      }
    },
    
//flushers
    flushMem: function (){
      //flush memory
      this.memory = 0;
      this.dec = 0;
      this.float = false;
    },
    
    flushOp: function(){
      //flush operands memory
      this.operands = [];
      this.operated = true;
    }
    
  }
});
