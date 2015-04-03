var React = require('react');
var classNames = require('classnames');

var AddressbookActions = require('../../actions/addressbookActions.js');

var { getLastName } = require('../../utils.js');

export default class AlphabetPicker extends React.Component {
  constructor(props){
    super(props);
  }
  onLetterClick(letter, e){
    e.preventDefault();
    AddressbookActions.filterByLetter(letter);
  }
  onCheckboxClick(e){
    e.preventDefault();
  }
  render() {
    var lastNameLetters = new Set(
      this.props.displayAddresses.map(function(address){
        return getLastName(address.props.name)[0];
      })
    );

    var letters = Array.apply(0, Array(26)).map(function(x, y){
      var letter = String.fromCharCode(y + 65);
      var letterProps;
      if(letter === this.props.filterMatch){
        letterProps = AlphabetPicker.letterProperties.active;
      } else if(lastNameLetters.has(letter)) {
        letterProps = AlphabetPicker.letterProperties.enabled;
      } else {
        letterProps = AlphabetPicker.letterProperties.disabled;
      }
      var letterCx = classNames('ABAlphabetPickerLetter');
      return (
        <span
          className={letterCx}
          key={y}
          onClick={this.onLetterClick.bind(this, letter)}
          {...letterProps}>
          {letter}
        </span>
      );

    }.bind(this));

    var selectableContent = this.props.isSelectable ? (
      <span className='ABAlphabetPickerLetter'>
        <input
          type='checkbox'
          onChange={this.onCheckboxClick.bind(this)}
          checked={this.props.allSelected}
        />
      </span>
      ): '';

    var cx = classNames('row', 'ABAlphabetPicker');
    return (
      <div className={cx}>
        {selectableContent}
        {letters}
      </div>
    );
  }
}

//TODO: Refactor these into css classes? atleast the style portions
AlphabetPicker.letterProperties = {
  enabled: {
    style: {
      fontWeight: 'normal',
      color: '#8AC007',
      cursor: 'pointer'
    },
    href: ''
  },
  active: {
    style: {
      fontWeight: 'bolder',
      color: '#8AC007',
      cursor: 'pointer'
    },
    href: ''
  },
  disabled: {
    style: {
      fontWeight: 'lighter',
      color: 'gray',
      pointerEvents: 'none',
      cursor: 'default'
    },
    onClick: function(e){
      e.stopPropagation();
    },
    disabled: true
  }
};

