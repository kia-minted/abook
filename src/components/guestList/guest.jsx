var React = require('react');
var classNames = require('classnames');
var assign = require('object-assign');

var AddressbookActions = require('../../actions/addressbookActions.js');

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
  updateGuestDisplayName(e){
    var newName = e.target.value;
    var email = assign(this.props, {displayName: newName});
    AddressbookActions.editEmail(email);
  }
  render(){
    var cx = classNames(['ABGuest', 'row']);
    return (
      <div className={cx}>
        {this.props.name !== '' ? (
        <div className='medium-6 column'>{this.props.name}</div>
        ):(
        <div className='medium-6 column'>
          <p>{this.props.email}</p>
          <p>Add a name!</p>
        </div>
        )}
        <div className='medium-4 column'>
          <input type='text'
            onChange={this.updateGuestDisplayName.bind(this)}
            value={this.props.displayName}/>
        </div>
      </div>
    );
  }
}

Guest.propTypes = propTypes;
