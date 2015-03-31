var React = require('react');

export default class AddressCounter extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    var divStyle = {border: '1px solid orange'};
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
};
