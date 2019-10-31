import React, {Component} from 'react';
import './App.css';

import Pusher from 'pusher-js';

const API_URL = 'http://18.218.109.28:8000/api/' ;
const PUSHER_APP_KEY = "b17754f8854f59838893";
const PUSHER_APP_CLUSTER = "us2";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msgs: [],
      msg: ''
    };

    this.updateText = this.updateText.bind(this);
    this.postMsg = this.postMsg.bind(this);
    this.deleteMsg = this.deleteMsg.bind(this);
    this.addMsg = this.addMsg.bind(this);
    this.removeMsg = this.removeMsg.bind(this);
  }
    
  updateText(e) {
    this.setState({ msg: e.target.value });
  }

  postMsg(e) {
    e.preventDefault();
    if (!this.state.msg.length) {
      return;
    }
    const newMsg = {
      msg: this.state.msg
    };
    fetch(API_URL + 'new', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMsg)
    }).then(console.log);
  }
    
  deleteMsg(id) {
    fetch(API_URL + id, {
      method: 'delete'
    }).then(console.log);
  }

  addMsg(newMsg) {
    this.setState(prevState => ({
      msgs: prevState.msgs.concat(newMsg),
      msg: ''
    }));
  }
    
  removeMsg(id) {
    this.setState(prevState => ({
      msgs: prevState.msgs.filter(el => el.id !== id)
    }));
  }

  componentDidMount() {
    this.pusher = new Pusher(PUSHER_APP_KEY, {
	  cluster: PUSHER_APP_CLUSTER,
      encrypted: true,
    });
    this.channel = this.pusher.subscribe('msgs');
	
    this.channel.bind('inserted', this.addMsg);
    this.channel.bind('deleted', this.removeMsg);
  }
    
  render() {
    let msgs = this.state.msgs.map(item =>
      <Msg key={item.id} msg={item} onMsgClick={this.deleteMsg} />
    );

    return (
      <div className="todo-wrapper">
        <form>
          <div>This is a public chat. Anyone with access can leave a message here.</div>
          <input type="text" className="input-todo" placeholder="New Message" onChange={this.updateText} value={this.state.msg} />
          <div className="btn btn-add" onClick={this.postMsg}>Send</div>
        </form>
        
        <ul>
          {msgs}
        </ul>
      </div>
    );
  }
}

class Msg extends Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }
  _onClick() {
    this.props.onMsgClick(this.props.msg.id);
  }
  render() {
    return (
      <li key={this.props.msg.id}>
        <div className="text">{this.props.msg.msg}</div>
        <div className="delete" onClick={this._onClick}>-</div>
      </li>
    );
  }
}

export default App;