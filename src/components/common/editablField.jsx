var React = require('react');

var { toProperCase } = require('../../utils.js');

export default class EditableField extends React.Component {
  updateValue(e){
    var value = e.target.value;
    this.props.update(this.props.field, value);
  }
  render() {
    return (
      <input
        type='text'
        placeholder={toProperCase(this.props.field)}
        onChange={this.updateValue.bind(this)}
        value={this.props.value}
      />
    );
  }
}

EditableField.propTypes = {
  field: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  update: React.PropTypes.func.isRequired
};
