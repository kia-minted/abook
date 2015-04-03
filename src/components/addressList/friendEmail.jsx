var React = require('react');
var classNames = require('classnames');

var { getLastName, removeLastName } = require('../../utils.js');

var AddressbookActions = require('../../actions/addressbookActions.js');

var EditableField = require('../common/editablField.jsx');

var propTypes = {
  email: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  isSelectable: React.PropTypes.bool.isRequired,
  isSelected: React.PropTypes.bool
};

var defaultProps = {
  isSelectable: false,
  isSelected: false
};

export default class FriendEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }
  componentWillReceiveProps(nextProps){
    this.setState(nextProps);
  }
  toggleEdit(e){
    if(e){
      e.preventDefault();
    }
    this.setState({
      isEditing: !this.state.isEditing
    });
  }
  updateField(field, value){
    var newState = {};
    newState[field] = value;
    this.setState(newState);
  }
  saveEdits(e){
    e.preventDefault();
    var newState = this.state;
    newState.isEditing = false;
    AddressbookActions.editEmail(this.state);
  }
  toggleSelect(){
    var id = this.props.id;
    if(this.props.isSelected){
      AddressbookActions.deselectEmail(id);
    } else {
      AddressbookActions.selectEmail(id);
    }
  }
  render() {
    var children = this.state.isEditing ? (
      [
        <div className='medium-4 column' key='name'>
          <EditableField
            field='name'
            value={this.state.name}
            update={this.updateField.bind(this)}
            />
        </div>,
        <div className='medium-5 column' key='email'>
          <EditableField field='email'
            value={this.state.email}
            update={this.updateField.bind(this)}
          />
        </div>,
        <div className='medium-2 column'>
          <a key='edit' onClick={this.saveEdits.bind(this)} href=''>Save</a>
        </div>
      ]
    ):(
      [
        <div key='name' className='medium-4 column'>
          {removeLastName(this.state.name)}{' '}
          <strong>{getLastName(this.state.name)}</strong>
        </div>,
        <div key='email' className='medium-5 column'>
          {this.state.email}
        </div>,
        <div key='edit' className='medium-2 column'>
          <a onClick={this.toggleEdit.bind(this)} href=''>Edit</a>
        </div>
      ]
    );
    var selectableContent = this.props.isSelectable ? (
      <div className='ABCheckbox medium-1 column'>
        <input
          type='checkbox'
          onChange={this.toggleSelect.bind(this)}
          checked={this.props.isSelected}
        />
      </div>
      ): '';

    var cx = classNames(['ABFriendEmail', 'row']);
    return (
      <div className={cx}>
        {selectableContent}
        {children}
      </div>
    );
  }
}

FriendEmail.propTypes = propTypes;
FriendEmail.defaultProps = defaultProps;
