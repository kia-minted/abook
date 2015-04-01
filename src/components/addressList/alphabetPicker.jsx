var React = require('react');
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
      return (
        <a
          key={y}
          onClick={this.onLetterClick.bind(this, letter)}
          children={letter}
          {...letterProps}/>
      );

    }.bind(this));

    return (
      <div>AlphabetPicker
        {letters}
      </div>
    );
  }
}

AlphabetPicker.letterProperties = {
  enabled: {
    style: {
      fontWeight: 'normal',
      color: 'black',
    },
    href: ''
  },
  active: {
    style: {
      fontWeight: 'bolder',
      color: 'black',
    },
    href: ''
  },
  disabled: {
    style: {
      fontWeight: 'lighter',
      color: 'gray',
      cursor: 'default'
    },
    onClick: function(e){
      e.stopPropagation();
    },
    disabled: true
  }
};

