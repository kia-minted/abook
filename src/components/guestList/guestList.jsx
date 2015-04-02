var React = require('react');
var classNames = require('classnames');

var AddressbookActions = require('../../actions/addressbookActions.js');

var { compareByLastName } = require('../../utils.js');

var Guest = require('./guest.jsx');

const propTypes = {
  selectedAddresses: React.PropTypes.array.isRequired
};

export default class GuestList extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  editAddress(address, field, value){
    address[field] = value;
    AddressbookActions.editEmail(address);
  }
  render(){
    var guests = this.props.selectedAddresses.map(function(address, index){
      return (
        <Guest key={index} {...address}/>
      );
    }).sort(compareByLastName);
    var noGuestsMessage = (
      <div>
        <p>You have not added any guests yet.</p>
        <p>Select contacts on the left to add them to the list.</p>
      </div>
    );
    var cx = classNames(['col-sm-6']);
    return (
      <div className={cx}>
        <h4>YOUR GUEST LIST: {' '}
          <small>
            {this.props.selectedAddresses.length}
          </small>
        </h4>
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

GuestList.propTypes = propTypes;
