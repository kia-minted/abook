var React = require('react');
var AddressbookStore = require('../stores/addressbookStore.js');
var { friendEmails, friendAddresses } = require('../serverStub.js');
var AddressList = require('./addressList.jsx');
var AddressEntry = require('./addressEntry.jsx');

var { fetchServerData } = require('../actions/addressbookActions.js');

export default class Addressbook extends React.Component {
  constructor(props) {
    super(props);
    this.state = AddressbookStore.getState();
  }
  render() {
    console.log(this.state);
    var divStyle = {border: '1px solid black'}
    return (
      <div style={divStyle}>Addressbook
        <AddressEntry/>
        <AddressList
          friendEmails={this.state.friendEmails}
          friendAddresses={this.state.friendAddresses}
        />
        <div>Guest List
          <div>Guest Counter</div>
          <div>Guests</div>
        </div>
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

