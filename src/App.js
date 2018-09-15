import React, { Component } from 'react';
import bgVideo from './media/formula.mp4';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      display:'0', //Main display
      memoryDisplay:'', //Display all of the numbers we entered with their operations
      mode: 'start', //Modes that help us tell what state we are in
      operation:'', //What operation is being executed. This will allow us to evaluate equations on the calculator
      temp:0, // Temporary variable to store the previous number entered to perform operations on
      result:0 //The total answer so far
    }
    this.styleKeyPress = this.styleKeyPress.bind(this);
  }

  setOperation(value){
    switch(value){
      case "/":
        this.setState({operation:"/",temp:this.state.display})
        break;
      case "*":
        this.setState({operation:"*",temp:this.state.display})
        break;
      case "+":
        this.setState({operation:"+",temp:this.state.display})
        break;
      case "-":
        this.setState({operation:"-",temp:this.state.display})
        break;
      case "^":
        this.setState({operation:"^",temp:this.state.display})
        break;
      default:
        break;
    }
  }
  calculateOperation(){
    switch(this.state.operation){
      case "/":
        return parseFloat(this.state.temp) / parseFloat(this.state.display);
        break;
      case "*":
        return parseFloat(this.state.temp) * parseFloat(this.state.display);
        break;
      case "+":
        return parseFloat(this.state.temp) + parseFloat(this.state.display);
        break;
      case "-":
        return parseFloat(this.state.temp) - parseFloat(this.state.display);
        break;
      case "^":
        return Math.pow(parseFloat(this.state.temp), parseFloat(this.state.display))
        break;
      default:
        break;
    }
  }

  handleEquals(){
    if(this.state.mode != "equals" && this.state.operation != ""){
    let answer = this.calculateOperation();
      this.setState({
        display: answer,
        result:answer,
        operation:"",
        temp:0,
        memoryDisplay:this.state.memoryDisplay + " = " + answer,
        mode:"equals"
      })
    }
  }

  //When an operator is pressed the program should save the previous number value to the temp in state. 
  //This will allow us to perfrom the calculations while entering more symbols
  handleDisplayOperator(value){
    if(this.state.mode != "operator")
    {
      this.setOperation(value);
      if(this.state.operation != ""){
        let answer=this.calculateOperation();
        this.setState({
          result:answer,
          temp:answer
        })
      }
    } 
    //If the operation state is empty we need to set it to an operation without assigning a value to temp since temp needs to stay the same while no numbers are entered
    //into the calculator
    else{
      switch(value){
        case "/":
          this.setState({operation:"/"})
          break;
        case "*":
          this.setState({operation:"*"})
          break;
        case "+":
          this.setState({operation:"+"})
          break;
        case "-":
          this.setState({operation:"-"})
          break;
        case "^":
          this.setState({operation:"^"})
          break;
        default:
          break;
      }
      
    }
      //Set the display to display the operator in the memory and display.
      this.setState({
        memoryDisplay:this.state.memoryDisplay + " " + value + " "  ,
        display:value,
        mode:"operator"
      })
   
  }

  handleDecimal(){
    let found_decimal = false;
    for(let i=0; i< this.state.display.length;++i){
      if(this.state.display[i] == ".")
       found_decimal = true;
    }
    if(!found_decimal) 
      this.setState({
        display:this.state.display + ".",
        memoryDisplay:this.state.memoryDisplay +"."
      });
  }

  handleZero(){
    if(this.state.mode == "operator")
      this.setState({display:"0",memoryDisplay:this.state.memoryDisplay +"0"})
    else if(this.state.display[0] != "0" && this.state.mode != "equals")
      this.setState({display:this.state.display+"0",memoryDisplay:this.state.memoryDisplay +"0"})
    else
      this.setState({display:"0", mode:"start",memoryDisplay:"0"})
  }

  handleClear(){
    this.setState({display:"0", mode:"start",memoryDisplay:"0"});
  }

  handleDisplayNumbers(value){
    if(this.state.display.toString().length < 20){
      switch(this.state.mode){
        case "number":
          this.setState({display:this.state.display+value,memoryDisplay:this.state.memoryDisplay +value})
          break;
        case "operator":
          this.setState({display:value, mode:"number",memoryDisplay:this.state.memoryDisplay + " " + value })
          break; 
        case "start": 
          this.setState({display:value, mode:"number",memoryDisplay:value})
          break; 
        case "equals":
          this.setState({display:value, mode:"number",memoryDisplay:value})
          break;
        default:
          break;
      }
    }
  }

  styleKeyPress(name){
    document.getElementById(name).click()
    document.getElementById(name).className = "btn btn-default active";
    document.querySelector("body").style.transition = "0.2s"
  }

  handleKeyOff(event){
    switch( event.keyCode ) {
    case 48:
        document.getElementById("zero").className = "btn number"
         break;
    case 49:
        document.getElementById("one").className = "btn number"
        break;
    case 50:
         document.getElementById("two").className = "btn number"
        break;
    case 51:
         document.getElementById("three").className = "btn number"
        break;
    case 52:
         document.getElementById("four").className = "btn number"
        break;
    case 53:
         document.getElementById("five").className = "btn number"
        break;
    case 54:
         document.getElementById("six").className = "btn number"
        break;
   case 55:
         document.getElementById("seven").className = "btn number"
        break;
    case 56:
         document.getElementById("eight").className = "btn number"
        break;
    case 57:
         document.getElementById("nine").className = "btn number"
        break;
    case 107:
        document.getElementById("add").className = "operator btn-secondary"
        break;
    case 106:
        document.getElementById("multiply").className = "operator btn-secondary"
        break;
    case 111:
        document.getElementById("divide").className = "operator btn-secondary"
        break;
    case 109:
        document.getElementById("subtract").className = "operator btn-secondary"
        break;
    case 190: case 110:
        document.getElementById("decimal").className = "btn number"
        break;
    case 187:
        document.getElementById("equals").className = "btn-primary";
        break;
    case 46:
        document.getElementById("clear").className = "btn btn-danger";
        break;
    default: 
        break;
    }

  }
  handleKeyPress(event){
    switch( event.keyCode ) {
      case 48:
          document.getElementById("zero").click()
          document.getElementById("zero").className = "btn btn-default active";
          break;
      case 49:
          document.getElementById("one").click()
          document.getElementById("one").className = "btn btn-default active";
          break;
      case 50:
          document.getElementById("two").click()
          document.getElementById("two").className = "btn btn-default active";
          break;
      case 51:
          document.getElementById("three").click()
          document.getElementById("three").className = "btn btn-default active";
          break;
      case 52:
          document.getElementById("four").click()
          document.getElementById("four").className = "btn btn-default active";
          break;
      case 53:
          document.getElementById("five").click()
          document.getElementById("five").className = "btn btn-default active";
          break;
      case 54:
          document.getElementById("six").click()
          document.getElementById("six").className = "btn btn-default active";
          break;
     case 55:
          document.getElementById("seven").click()
          document.getElementById("seven").className = "btn btn-default active";
          break;
      case 56:
          document.getElementById("eight").click()
          document.getElementById("eight").className = "btn btn-default active";
          break;
      case 57:
          document.getElementById("nine").click()
          document.getElementById("nine").className = "btn btn-default active";
          break;
      case 107:
          document.getElementById("add").click()
          document.getElementById("add").className = "btn btn-default active";
          break;
      case 106:
          document.getElementById("multiply").click()
          document.getElementById("multiply").className = "btn btn-default active";
          break;
      case 111:
          document.getElementById("divide").click()
          document.getElementById("divide").className = "btn btn-default active";
          break;
      case 109:
          document.getElementById("subtract").click()
          document.getElementById("subtract").className = "btn btn-default active";
          break;
      case 190: case 110:
          document.getElementById("decimal").click()
          document.getElementById("decimal").className = "btn btn-default active";
          break;
      case 187:
          document.getElementById("equals").click()
          document.getElementById("equals").className = "btn btn-default active";
          break;
      case 46:
          document.getElementById("clear").click()
          document.getElementById("clear").className = "btn btn-default active";
          break;
      default: 
          break;
    }
  }

  componentWillMount(){
    document.addEventListener("keydown", this.handleKeyPress);
    document.addEventListener("keyup", this.handleKeyOff);
  }


  render() {
    return (
      <div className="container-fluid">
        <video playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop" src={bgVideo}> </video>
        <div className="row">
          <div className="col-sm filler"></div>
          <div className="col-sm app-header rounded-top">
            <h4>jCalc</h4>
            <span id="author">By Ramon Arredondo</span>
          </div>
          <div className="col-sm filler"></div>
        </div>
        <div className="row">
          <div className="col-sm filler"></div>
          <div className="col-sm">
            <div id="formula">{this.state.memoryDisplay}</div>
            <div id="display">{this.state.display}</div>
          </div>
          <div className="col-sm filler"></div>
        </div>
        <div className="row" id="calculator">
          <div className="col-sm filler"></div>
          <div className="col-sm">
            <div className="row">
              <div className="col-sm-6"><button className="btn-danger" id="clear" onClick={() => { this.handleClear() }}>AC</button></div>
              <div className="col-sm-3"><button className="operator btn-secondary" id="divide" onClick={() => { this.handleDisplayOperator("/") }}>/</button></div>
              <div className="col-sm-3"><button className="operator btn-secondary" id="multiply" onClick={() => { this.handleDisplayOperator("*") }}>X</button></div>
            </div>
            <div className="row">
              <div className="col-sm-3"><button className="btn number" id="seven" onClick={() => { this.handleDisplayNumbers("7") }}>7</button></div>
              <div className="col-sm-3"><button className="btn number" id="eight" onClick={() => { this.handleDisplayNumbers("8") }}>8</button></div>
              <div className="col-sm-3"><button className="btn number" id="nine" onClick={() => { this.handleDisplayNumbers("9") }}>9</button></div>
              <div className="col-sm-3"><button className="operator btn-secondary" id="subtract" onClick={() => { this.handleDisplayOperator("-") }}>-</button></div>
            </div>
            <div className="row">
              <div className="col-sm-3"><button className="btn number" id="four" onClick={() => { this.handleDisplayNumbers("4") }}>4</button></div>
              <div className="col-sm-3" > <button className="btn number" id="five" onClick={() => { this.handleDisplayNumbers("5") }}>5</button></div>
              <div className="col-sm-3"><button className="btn number" id="six" onClick={() => { this.handleDisplayNumbers("6") }}>6</button></div>
              <div className="col-sm-3 "> <button className="operator btn-secondary" id="add" onClick={() => { this.handleDisplayOperator("+") }}>+</button></div>
            </div>
            <div className="row">
              <div className="col-sm-3 "><button className="btn number" id="one" onClick={() => { this.handleDisplayNumbers("1") }}>1</button></div>
              <div className="col-sm-3 "><button className=" btn number" id="two" onClick={() => { this.handleDisplayNumbers("2") }}>2</button></div>
              <div className="col-sm-3 "><button className="btn number" id="three" onClick={() => { this.handleDisplayNumbers("3") }}>3</button></div>
              <div className="col-sm-3 "><button className="operator btn-secondary" id="exponent" onClick={() => { this.handleDisplayOperator("^") }}>^</button></div>
            </div>
            <div className="row">
              <div className="col-sm-6" ><button className="btn number" id="zero" onClick={() => { this.handleZero() }}>0</button></div>
              <div className="col-sm-3 "><button className="btn number" id="decimal" onClick={() => { this.handleDecimal() }}>.</button></div>
              <div className="col-sm-3 "><button className="btn-primary" id="equals" onClick={() => { this.handleEquals() }}>=</button></div>
            </div>
          </div>
          <div className="col-sm filler"></div>
        </div>
      </div>
    );
  }
}

export default App;
