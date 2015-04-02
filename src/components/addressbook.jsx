var React = require('react');
var classNames = require('classnames');

var AddressbookStore = require('../stores/addressbookStore.js');

var AddressList = require('./addressList/addressList.jsx');
var AddressEntry = require('./addressEntry.jsx');
var GuestList = require('./guestList/guestList.jsx');

var { fetchServerData } = require('../actions/addressbookActions.js');

export default class Addressbook extends React.Component {
  constructor(props) {
    super(props);
    this.state = AddressbookStore.getState();
  }
  render() {
    console.log(this.state);
    var cx = classNames(['AB', 'container']);
    var guestList = this.state.hasGuestList ? (
      <GuestList selectedAddresses={this.state.selectedAddresses}/>
    ) : '';
    return (
      <div className={cx}>
        <h4>Address Book</h4>
        <AddressEntry/>
        <AddressList {...this.state}/>
        {guestList}
      </div>
    );
  }
  componentWillMount() {
    AddressbookStore.addChangeListener(this._onChange.bind(this));
    fetchServerData();
  }
  componentDidUnmount() {
    AddressbookStore.removeChangeListener(this._onChange.bind(this));
  }
  _onChange() {
    this.setState(AddressbookStore.getState());
  }
}
