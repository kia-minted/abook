var React = require('react');

//var EditableField = require('../common/editablField.jsx');

const propTypes = {
  id: React.PropTypes.number.isRequired,
  owningUserId: React.PropTypes.number.isRequired,
  email: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  displayName: React.PropTypes.string.isRequired,
};

export default class Guest extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div>
        <p>{this.props.name}</p>
        <p>{this.props.email}</p>
      </div>
    );
  }
}

Guest.propTypes = propTypes;
