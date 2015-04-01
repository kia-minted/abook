var React = require('react');

var { getLastName } = require('../../utils.js');

var FriendEmail = require('./friendEmail.jsx');
var AddressCounter = require('./addressCounter.jsx');
var AlphabetPicker = require('./alphabetPicker.jsx');

var propTypes = {
  friendAddresses: React.PropTypes.array.isRequired,
  friendEmails: React.PropTypes.array.isRequired,
  displayType: React.PropTypes.string.isRequired,
  filterBy: React.PropTypes.string.isRequired,
  filterMatch: React.PropTypes.string.isRequired,
  isSelectable: React.PropTypes.bool.isRequired,
  selectedAddresses: React.PropTypes.array,
  sortBy: React.PropTypes.string.isRequired,
};

var defaultProps = {
  isSelectable: false,
  selectedAddresses: []
};

export default class AddressList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var selectedAddresses = this.props.selectedAddresses;
    var friendEmails = [];
    var friendAddresses = [];
    var displayAddresses;
    var filteredAddresses;

    //creating FriendEmails
    if(this.props.displayType === 'all' || this.props.displayType === 'email'){
      friendEmails = this.props.friendEmails
        .map(function(email, index){
          return (
            <FriendEmail
              isSelected={selectedAddresses.indexOf(email) >= 0}
              key={'FriendEmail#' + email.id + index}
              isSelectable={this.props.isSelectable} {...email}/>
          );
        }.bind(this));
    }

    //creating FriendAddresses
    if(this.props.displayType === 'all' || this.props.displayType === 'address'){
      friendAddresses = this.props.friendAddresses
        .map(function(address, index){
          return (
            <li key={'FriendAddress#' + address.id + index}>
              {address.name}
            </li>
          );
        });
    }

    //concatting addresses into one array
    displayAddresses = friendEmails.concat(friendAddresses);

    //filtering
    if(this.props.filterMatch && this.props.filterBy === 'lastName'){
      filteredAddresses = displayAddresses.filter(function(address){
        var lastName = getLastName(address.props.name);
        return lastName[0].match(new RegExp(this.props.filterMatch,'i'));
      }.bind(this));
    } else {
      filteredAddresses = displayAddresses;
    }

    //sorting
    //TODO: Sorting should be done here
    if(this.props.sortBy === 'name'){
      filteredAddresses = filteredAddresses.sort(function(address1, address2){
        var lastName1 = getLastName(address1.props.name);
        var lastName2 = getLastName(address2.props.name);
        if(lastName1 < lastName2) return -1;
        if(lastName1 > lastName2) return 1;
        return 0;
      });
    }

    var divStyle = {border: '1px solid yellow'};
    return (
      <div style={divStyle}>Address List
        <AddressCounter displayAddresses={displayAddresses} {...this.props}/>
        <div>Search Bar</div>
        <AlphabetPicker
          displayAddresses={displayAddresses}
          filterMatch={this.props.filterMatch}/>
        <ul>Addresses
          {filteredAddresses}
        </ul>
      </div>
    );
  }
}

AddressList.propTypes = propTypes; 
AddressList.defaultProps = defaultProps;
