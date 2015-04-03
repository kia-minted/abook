var React = require('react');
var classNames = require('classnames');

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
    var cx = classNames(['ABAddressEntry', 'row']);
    var singleEntryCx = classNames(['medium-6', 'column']);
    var multipleEntryCx = classNames(['medium-6', 'column']);
    return (
      <div className={cx}>
        <div className={singleEntryCx}>
          <h5>ENTER A NEW CONTACT</h5>
          <div className="medium-5 column">
            <EditableField field='name'
              value={this.state.name}
              update={this.updateField.bind(this)}
            />
          </div>
          <div className="medium-5 column">
            <EditableField field='email'
              value={this.state.email}
              update={this.updateField.bind(this)}
            />
        </div>
        <div className="medium-2 column">
          <a
            href=''
            onClick={this.submitEmail.bind(this)}
            >Add
          </a>
        </div>
        </div>
        <div className={multipleEntryCx}>
          <h5>ENTER MULTIPLE CONTACTS AT ONCE</h5>
          <p>TODO</p>
        </div>
      </div>
    );
  }
}
