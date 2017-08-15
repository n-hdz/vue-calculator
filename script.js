//Re-work
var app = new Vue({
  el: "#calc",
  delimiters: ["${", "}"],
  data: {
    memory: [],
    operands: [],
    operand: "",
    operator: "",
    print_out: "",
    evaluated: false,
    result: 0
  },

  methods: {
    
    canTrip: function() {
      this.result = "";
      this.print_out = "THANK YOU! BE SURE TO STAR ON GITHUB!";
    },

    clearNum: function() {;
    },

    erraseNum: function() {
    },

    getNum: function(n) {
      this.memory.push(n);
      this.print_out += n.toString();
    },
    
    pushOperand: function(memory, operator){
      this.operand = this.memory.join('');
      if(this.operator !== ""){
        this.operands.push(this.operand.toString(), this.operator);
        if(this.operands.length >= 3) {
          this.operands.pop();
          this.evalOperands();
        }
      } else { 
        this.operands.push(this.operand.toString());
      }
      console.log("In operands at call: " + this.operands + " Length: " + this.operands.length);
      if(this.evaluated){this.operands.push(this.result.toString(), this.operator)}
      console.log("In operands after call: " + this.operands + " Length: " + this.operands.length);
      this.flushMem();
    },
    
    switchOperator: function(op){
      switch(op){
          case('add'):
          this.operator = " + ";
          this.pushOperand(this.operator);
          this.print_out += this.operator;
          break;
          
          case('sub'):
          this.operator = " - ";
          this.pushOperand(this.operator);
          this.print_out += this.operator;
          break;
          
          case('mult'):
          this.operator = " * ";
          this.pushOperand(this.operator);
          this.print_out += this.operator;
          break;
          
          case('div'):
          this.operator = " / ";
          this.pushOperand(this.operator);
          this.print_out += this.operator;
          break;
          
        default:
          break;
               }
    },

    getResult: function() {
     //empty operator position
      this.operator = "";
      //push last operand in memory
      this.pushOperand(this.memory);
      this.evalOperands();
    },
    
    evalOperands: function(){
      console.log(this.operands);
      this.result = eval(this.operands.join(''));
      this.flushOp();
      this.flushMem();
      this.print_out = this.result.toString();
      this.evaluated = true
    },
    
//flushers
    flushMem: function (){
      this.memory = [];
    },
    
    flushOp: function(){
      this.operands = [];
    }
  }
});
