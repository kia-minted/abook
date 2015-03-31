var React = require('react');
var AddressbookStore = require('../stores/addressbookStore.js');
var { friendEmails, friendAddresses } = require('../serverStub.js');

var { fetchServerData } = require('../actions/addressbookActions.js');

export default class Addressbook extends React.Component {
  constructor(props) {
    super(props);
    this.state = AddressbookStore.getState();
  }
  render() {
    return (
      <div>
        Hello Addressbook
        <p>{ friendEmails[0].name }</p>
        <p>{ friendAddresses[0].name }</p>
        <p>{this.state}</p>
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
};

Addressbook.propTypes = {
  friendEmails
}
