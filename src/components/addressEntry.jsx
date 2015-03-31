var React = require('react');
var AddressbookActions = require('../actions/addressbookActions.js');

var EditableField = require('./common/editablField.jsx');

export default class AddressEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: ''
    };
  }
  updateField(field, value){
    var newState = {};
    newState[field] =  value;
    this.setState(newState);
  }
  submitEmail(e){
    e.preventDefault();
    var newEmail = {
      name: this.state.name,
      email: this.state.email,
      displayName: '',
      //TODO: owningUserId should come from server
      owningUserId: 1
    };
    this.setState({
      name: '',
      email: ''
    });
    AddressbookActions.addEmail(newEmail);
  }
  render() {
    var divStyle= {border: '1px solid red'};
    return (
      <div style={divStyle}>AddressEntry
        <p>Single Entry
          <EditableField field='name'
            value={this.state.name}
            update={this.updateField.bind(this)}
          />
          <EditableField field='email'
            value={this.state.email}
            update={this.updateField.bind(this)}
          />
          <a
            href=''
            onClick={this.submitEmail.bind(this)}
            >Add
          </a>
        </p>
        <p>Multiple Entry</p>
      </div>
    );
  }
}
