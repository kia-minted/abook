var React = require('react');
var EditableField = require('./common/editablField.jsx');
var AddressbookActions = require('../actions/addressbookActions.js');


export default class GuestList extends React.Component {
  constructor(props) {
    super(props);
  }
  editAddress(address, field, value){
    address[field] = value;
    AddressbookActions.editEmail(address);
  }
  render(){
    var divStyle = { border: '1px solid purple' };
    var guests = this.props.selectedAddresses.map(function(address, index){
      var addressName = Boolean(address.name) ? address.name: address.email;
      return (
        <p key={index}>{addressName}
          <EditableField
            field='displayName'
            value={address.displayName}
            update={this.editAddress.bind(this, address)}
          />
        </p>
      );
    }.bind(this));
    var noGuestsMessage = (
      <div>
        <p>You have not added any guests yet.</p>
        <p>Select contacts on the left to add them to the list.</p>
      </div>
    );
    return (
      <div style={divStyle}>
        <h3>YOUR GUEST LIST: {' '}
          <small>
            {this.props.selectedAddresses.length}
          </small>
        </h3>
        <div>
          {guests.length ?
            guests :
            noGuestsMessage
          }
        </div>
      </div>
    );
  }
}

