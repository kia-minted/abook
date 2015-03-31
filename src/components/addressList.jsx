var React = require('react');

var FriendEmail = require('./friendEmail.jsx');

export default class AddressList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var friendEmails, friendAddresses, displayAddresses;
    friendEmails= this.props.friendEmails.map(function(email, index){
      return (<FriendEmail key={'FriendEmail#' + email.id} {...email}/>);
    });
    friendAddresses = this.props.friendAddresses.map(function(address, index){
      return (<li key={'FriendAddress#' + address.id}>{address.name}</li>);
    });
    //TODO: Conditional Logic to choose which addresses to display
    displayAddresses = friendEmails;
    var divStyle = {border: '1px solid yellow'}
    return (
      <div style={divStyle}>Address List
        <div>Address Counter</div>
        <div>Search Bar</div>
        <div>Alphabet Picker</div>
        <ul>Addresses
          {displayAddresses}
        </ul>
      </div>
    );
  }
}
