var React = require('react');

//var EditableField = require('../common/editablField.jsx');

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
