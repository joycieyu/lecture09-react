'use strict';

//example with React.createElement()
var header = React.createElement('header',{'className':'well'},
  React.createElement('h1', {}, 'Message Board')
);

class HelloMessage extends React.Component {
  render() {    
     return <li>Hello {this.props.greetee}!</li>;
  }
}

class GoodbyeMessage extends React.Component {
  render() {
    var choice = Math.floor(Math.random()*4);
    switch(choice){ //shortcut for if/else if/else if/...
      case 0: return <li>See you later, alligator!</li>;
      case 1: return <li>After a while, crocodile!</li>;
      case 2: return <li>Time to go, buffalo!</li>;
      case 3: return <li>Bye bye, butterfly!</li>;
    }
  }
}

class MessageList extends React.Component {
  constructor(props){
    super(props);
    this.state = {messages: this.props.messages}; //state is reference to model
  }

  //how to delete an item from the list
  deleteItem(msgId) {
    //remove item (via "controller")
    var newMessages = MessageController.removeItem(msgId);
    console.log(newMessages);
    this.setState({messages: newMessages});
  }

  addItem(msgStr) {
    //add item (via "controller")
    var newMessages = MessageController.addItem(msgStr);
    console.log(newMessages);
    this.setState({messages: newMessages});   
  }


  render() {
      var msgItems = this.state.messages.map(function(msgObj, index){
        return <MessageItem message={msgObj.msg} key={msgObj.id} msgId={msgObj.id} clickCallback={this.deleteItem.bind(this)} />; //key to help React
        //pass in the callback so child knows what to do on click
      }, this);
     return (
       <div>
         <ul className="list-unstyled">
            {/*<HelloMessage greetee="world" />
            <GoodbyeMessage /> */}
            {msgItems}
         </ul>
         <InputBox />
        </div>
     );
  }
}

class MessageItem extends React.Component {

  handleClick(){
    this.props.clickCallback(this.props.msgId);
  }

  render() {
    return <li onClick={this.handleClick.bind(this)}>{this.props.message}</li>; //use the variable
  }
}

class InputBox extends React.Component {

  constructor(props){
    super(props);
    this.state = {value:''}
  }

  handleChange(event){
    this.setState({value:event.target.value});
  }

  addMessage() {
    MessageController.addItem(this.state.value);
    this.setState({value:''});

    //don't do this (will change shortly)
    ReactDOM.render(<App messages={MessageController.messagesArray} />, document.querySelector('#root'));
  }

  render() {
    return (
      <form role="form">
        <div className="form-group">
          <input type="text" name="message" className="form-control" placeholder="Enter a message" value={this.state.value} onChange={this.handleChange.bind(this)}/>
        </div>
        <button type="button" className="btn btn-primary" onClick={this.addMessage.bind(this)}>Post message ({this.state.value.length} chars)</button>
      </form>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        {header}
        <main className="container">
          <MessageList messages={this.props.messages} />
        </main>
      </div>
    )
  }
}

//a global object to manage the model
var MessageController = {
  messagesArray: [ //the messages
    {id:1, msg:"Hello world"},
    {id:2, msg:"Black lives matter"},
    {id:3, msg:"Go huskies!"}
  ],
  lastId: 3, //incrementable id

  //function to remove item (in Object!)
  removeItem: function(msgId) {
    this.messagesArray = this.messagesArray.filter(function(msgObj){
      return msgObj.id !== msgId;
    });
    return this.messagesArray;
  },

  addItem: function(msgStr){
    this.lastId++;
    this.messagesArray.push({id:this.lastId, msg:msgStr});
    return this.messagesArray;
  }
}

//render the element
ReactDOM.render(<App messages={MessageController.messagesArray} />, document.querySelector('#root'));
