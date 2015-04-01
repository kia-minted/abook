var React = require('react');
var AddressbookActions = require('../../actions/addressbookActions.js');

export default class AlphabetPicker extends React.Component {
  onLetterClick(letter, e){
    e.preventDefault();
    AddressbookActions.filterByLetter(letter.toLowerCase());
  }
  render() {
    var letters = Array.apply(0, Array(26)).map(function(x, y){
      var letter = String.fromCharCode(y + 65);
      return (
      <a
        key={y}
        href=''
        onClick={this.onLetterClick.bind(this, letter)}
        children={letter}/>
      );
    }.bind(this));

    return (
      <div>AlphabetPicker
        {letters}
      </div>
    );
  }
}
