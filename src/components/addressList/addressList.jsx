var React = require('react');
var classNames = require('classnames');

var { getLastName, compareByLastName, compareByIsSelected } = require('../../utils.js');

var FriendEmail = require('./friendEmail.jsx');
var AddressCounter = require('./addressCounter.jsx');
var AlphabetPicker = require('./alphabetPicker.jsx');
var SearchBar = require('../searchBar/searchBar.jsx');

var propTypes = {
  friendAddresses: React.PropTypes.array.isRequired,
  friendEmails: React.PropTypes.array.isRequired,
  displayType: React.PropTypes.string.isRequired,
  filterBy: React.PropTypes.string.isRequired,
  filterMatch: React.PropTypes.string.isRequired,
  isSelectable: React.PropTypes.bool.isRequired,
  selectedAddresses: React.PropTypes.array,
  sortBy: React.PropTypes.string.isRequired,
  searchField: React.PropTypes.string.isRequired,
  allSelected: React.PropTypes.bool,
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
            <div key={'FriendAddress#' + address.id + index}>
              {address.name}
            </div>
          );
        });
    }

    //concatting addresses into one array
    displayAddresses = friendEmails.concat(friendAddresses);

    //filtering
    if(this.props.filterMatch && this.props.filterBy === 'lastName'){
      filteredAddresses = displayAddresses.filter(function(address){
        var lastName = getLastName(address.props.name);
        return lastName.match(new RegExp('^' + this.props.filterMatch, 'i'));
      }.bind(this));
    } else {
      filteredAddresses = displayAddresses;
    }

    //sorting
    //TODO: Sorting should be done here
    if(this.props.sortBy === 'name'){
      filteredAddresses = filteredAddresses.sort(compareByLastName);
    } else if(this.props.sortBy === 'selected'){
      filteredAddresses = filteredAddresses
        .sort(compareByLastName)
        .sort(compareByIsSelected);
    }

    //search functionality
    filteredAddresses = filteredAddresses.filter(function(address){
      return address.props.name.match(new RegExp(this.props.searchField, 'gi'));
    }.bind(this));

    if(!displayAddresses.length){
      filteredAddresses = (
        <div>You have not added any addresses! Add some!</div>
      );
    } else if(!filteredAddresses.length){
      filteredAddresses = (
        <div>No addresses match that search</div>
      );
    }

    var cx = classNames(['ABAddressList', 'medium-6', 'column']);
    var filteredAddressesCx = classNames(['ABAddressListFilteredAddresses', 'row']);
    return (
      <div className={cx}>
        <AddressCounter displayAddresses={displayAddresses} {...this.props}/>
        <SearchBar sortBy={this.props.sortBy}/>
        <AlphabetPicker
          allSelected={this.props.allSelected}
          isSelectable={this.props.isSelectable}
          displayAddresses={displayAddresses}
          filterMatch={this.props.filterMatch}/>
        <div className={filteredAddressesCx}>
          {filteredAddresses}
        </div>
      </div>
    );
  }
}

AddressList.propTypes = propTypes;
AddressList.defaultProps = defaultProps;
