var React = require('react');

var AddressbookActions = require('../actions/addressbookActions.js');

var EditableField = require('./common/editablField.jsx');

export default class FriendEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }
  toggleEdit(e){
    if(e){
      e.preventDefault();
    }
    this.setState({isEditing: !this.state.isEditing});
  }
  updateField(field, value){
    var newState = {};
    newState[field] = value;
    this.setState(newState);
  }
  saveEdits(e){
    e.preventDefault();
    AddressbookActions.editEmail(this.state);
    this.toggleEdit();
  }
  render() {
    var divStyle = {border: '1px solid green'};
    var children = this.state.isEditing ? (
      <div>
        <EditableField
          field='name'
          value={this.state.name}
          update={this.updateField.bind(this)}
        />
        <EditableField field='email'
          value={this.state.email}
          update={this.updateField.bind(this)}
        />
        <a onClick={this.saveEdits.bind(this)} href=''>Save</a>
    </div>
    ):(
    <div>
      <p>{this.state.name}{' '}{this.state.email}</p>
      <a onClick={this.toggleEdit.bind(this)} href=''>Edit</a>
    </div>
    );
    return (
      <div style={divStyle}>
        {children}
      </div>
    );
  }
}

FriendEmail.propTypes = {
  email: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
};
