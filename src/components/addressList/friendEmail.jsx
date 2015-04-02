var React = require('react');

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
    var divStyle = {border: '1px solid green'};
    var children = this.state.isEditing ? (
      <div>
        <EditableField
          field='name'
          value={this.state.name}
          update={this.updateField.bind(this)}
        />
        <EditableField field='email'
          value={this.state.email}
          update={this.updateField.bind(this)}
        />
        <a onClick={this.saveEdits.bind(this)} href=''>Save</a>
    </div>
    ):(
    <div>
      <p>
        {removeLastName(this.state.name)}{' '}
        <strong>{getLastName(this.state.name)}</strong>
        {' '}{this.state.email}
      </p>
      <a onClick={this.toggleEdit.bind(this)} href=''>Edit</a>
    </div>
    );
    var selectableContent = this.props.isSelectable ? (
      <input
        type='checkbox'
        onChange={this.toggleSelect.bind(this)}
        checked={this.props.isSelected}
      />
      ): '';

    return (
      <div style={divStyle}>
        {selectableContent}
        {children}
      </div>
    );
  }
}

FriendEmail.propTypes = propTypes;

FriendEmail.defaultProps = defaultProps;
