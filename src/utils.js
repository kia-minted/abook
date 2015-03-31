module.exports = {
  toProperCase: function(str){
    var newStr = str[0].toUpperCase() + str.substring(1);
    return newStr.split('').map(function(letter){
      if(letter.toUpperCase() === letter){
        letter = ' ' + letter;
      }
      return letter;
    }).join('');
  }
}
