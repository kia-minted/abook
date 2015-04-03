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
    var isEditing = !this.state.isEditing;
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
        <EditableField
          key='name'
          field='name'
          value={this.state.name}
          update={this.updateField.bind(this)}
        />,
        <EditableField field='email'
          key='email'
          value={this.state.email}
          update={this.updateField.bind(this)}
        />,
        <a onClick={this.saveEdits.bind(this)} href=''>Save</a>
      ]
    ):(
      [
        <div key='name' className='col-sm-4'>
          {removeLastName(this.state.name)}{' '}
          <strong>{getLastName(this.state.name)}</strong>
        </div>,
        <div key='email' className='col-sm-5'>
          {this.state.email}
        </div>,
        <div key='edit' className='col-sm-2'>
          <a onClick={this.toggleEdit.bind(this)} href=''>Edit</a>
        </div>
      ]
    );
    var selectableContent = this.props.isSelectable ? (
      <div className='ABCheckbox col-sm-1'>
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
