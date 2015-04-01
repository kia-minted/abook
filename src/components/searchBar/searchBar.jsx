var React = require('react');

var AddressbookActions = require('../../actions/addressbookActions.js');

export default class SearchBar extends React.Component {
  constructor(props){
    super(props);
  }
  updateSelection(e){
    AddressbookActions.changeSortBy(e.target.value);
  }
  updateSearchField(e){
    AddressbookActions.searchFor(e.target.value);
  }
  render(){
    var divStyle = { border: '1px solid purple' };
    return (
      <div style={divStyle}>
        <div>
          <input
            type='text'
            value={this.props.searchField}
            onChange={this.updateSearchField.bind(this)}
            placeholder='Search names'/>
        </div>
        <div>
          <span>Sort By
            <select
              value={this.props.sortBy}
              onChange={this.updateSelection.bind(this)}>
              <option value="name">Name</option>
              <option value="selected">Selected</option>
            </select>
          </span>
        </div>
      </div>
    );
  }
}
