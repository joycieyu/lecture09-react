'use strict';

// <h1 id="hello" class="myClass">Hello Word</h1>
// var message = React.createElement('h1', {id:'hello', className:'myClass'},
//      'Hello World!');
var header = <header className='well'><h1 id="hello" className="myClass">Hello JSX</h1></header>;

//define a JS variable
var imgUrl = 'http://goo.gl/n1tBtn';

//include the URL in the JSX
var pic = <img src={imgUrl} alt="A picture" />;


//include an element variable inside JSX
var main = <div>{header}<main>{pic}</main></div>;


//declare a new class that IS A Component
class HelloMessage extends React.Component {
  render() {

     return <h1>Hello Component!</h1>;
  }
}

//show the content in the web page (inside #root)
ReactDOM.render(<HelloMessage />, document.querySelector('#root'));