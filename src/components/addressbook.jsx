var React = require('react');
var AddressbookStore = require('../stores/addressbookStore.js');
var { friendEmails, friendAddresses } = require('../serverStub.js');
var AddressList = require('./addressList.jsx');
var AddressEntry = require('./addressEntry.jsx');
var GuestList = require('./guestList.jsx');

var { fetchServerData } = require('../actions/addressbookActions.js');

export default class Addressbook extends React.Component {
  constructor(props) {
    super(props);
    this.state = AddressbookStore.getState();
  }
  render() {
    console.log(this.state);
    var divStyle = { border: '1px solid black' };
    var guestList = this.state.hasGuestList ? (
      <GuestList {...this.state}/>
    ) : '';
    return (
      <div style={divStyle}>Addressbook
        <AddressEntry/>
        <AddressList {...this.state}/>
        {guestList}
      </div>
    );
  }
  componentWillMount() {
    AddressbookStore.addChangeListener(this._onChange.bind(this))
    fetchServerData();
  }
  componentDidUnmount() {
    AddressbookStore.removeChangeListener(this._onChange.bind(this))
  }
  _onChange() {
    this.setState(AddressbookStore.getState());
  }
}
