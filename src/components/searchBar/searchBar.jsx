var React = require('react');
var classNames = require('classnames');

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
    var cx = classNames('DIAddressBookSearchBar', 'row');
    var searchFieldCx = classNames('medium-6', 'column');
    var sortByCx = classNames('medium-6', 'column');
    return (
      <div className={cx}>
        <div className={searchFieldCx}>
          <input
            type='text'
            value={this.props.searchField}
            onChange={this.updateSearchField.bind(this)}
            placeholder='Search names'/>
        </div>
        <div className={sortByCx}>
          <label>Sort By
            <select
              value={this.props.sortBy}
              onChange={this.updateSelection.bind(this)}>
              <option value="name">Name</option>
              <option value="selected">Selected</option>
            </select>
          </label>
        </div>
      </div>
    );
  }
}
