var React = require('react');

var FriendEmail = require('./friendEmail.jsx');
var AddressCounter = require('./addressCounter.jsx');

export default class AddressList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var selectedAddresses = this.props.selectedAddresses;
    var friendEmails = [];
    var friendAddresses = [];
    var displayAddresses;

    if(this.props.displayType === 'all' || this.props.displayType === 'email'){
      friendEmails = this.props.friendEmails
        .map(function(email, index){
          return (
            <FriendEmail
              isSelected={selectedAddresses.indexOf(email) >= 0}
              key={'FriendEmail#' + email.id}
              isSelectable={this.props.isSelectable} {...email}
            />
          );
        }.bind(this));
    }

    if(this.props.displayType === 'all' || this.props.displayType === 'address'){
      friendAddresses = this.props.friendAddresses
        .map(function(address, index){
          return (<li key={'FriendAddress#' + address.id}>{address.name}</li>);
        });
    }
    displayAddresses = friendEmails.concat(friendAddresses);
    var divStyle = {border: '1px solid yellow'}
    return (
      <div style={divStyle}>Address List
        <AddressCounter displayAddresses={displayAddresses} {...this.props}/>
        <div>Search Bar</div>
        <div>Alphabet Picker</div>
        <ul>Addresses
          {displayAddresses}
        </ul>
      </div>
    );
  }
}

AddressList.propTypes = {
  friendAddresses: React.PropTypes.array.isRequired,
  friendEmails: React.PropTypes.array.isRequired,
  displayType: React.PropTypes.string.isRequired,
  filterBy: React.PropTypes.string.isRequired,
  filterMatch: React.PropTypes.string.isRequired,
  isSelectable: React.PropTypes.bool.isRequired,
  selectedAddresses: React.PropTypes.array
};

AddressList.defaultProps = {
  isSelectable: false,
  selectedAddresses: []
};
