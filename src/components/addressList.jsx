var React = require('react');

var FriendEmail = require('./friendEmail.jsx');

function toProperCase(str){
  return str[0].toUpperCase() + str.substring(1);
}

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
}

class AddressCounter extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    console.log('Counter props');
    console.log(this.props);
    var divStyle={border: '1px solid orange'};
    var addressType = this.props.displayType !== 'all' ?
      this.props.displayType.toUpperCase() : '';
    var totalAddressCount = this.props.displayType === 'all' ?
      this.props.friendAddresses.length + this.props.friendEmails.length:
      this.props.displayType === 'email' ?
        this.props.friendEmails.length :
        this.props.friendAddresses.length;
    var selectedCount = this.props.selectedAddresses ?
      this.props.selectedAddresses.length : 0;
    var selectableText = this.props.isSelectable ?
      `${selectedCount} out of ${totalAddressCount} selected` : '';
    return (
      <div style={divStyle}>Address Counter
        <h3>YOUR {addressType} ADDRESSES:{' '}<small>{selectableText}</small></h3>
      </div>
    );
  }
}

AddressCounter.propTypes = {
  friendAddresses: React.PropTypes.array.isRequired,
  friendEmails: React.PropTypes.array.isRequired,
  displayType: React.PropTypes.string.isRequired,
  filterBy: React.PropTypes.string.isRequired,
  filterMatch: React.PropTypes.string.isRequired,
  isSelectable: React.PropTypes.bool.isRequired,
  displayAddresses: React.PropTypes.array.isRequired,
  selectedAddresses: React.PropTypes.array
}
