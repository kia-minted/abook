module.exports = {

  toProperCase: function(str){
    var newStr = str[0].toUpperCase() + str.substring(1);
    return newStr.split('').map(function(letter){
      if(letter.toUpperCase() === letter){
        letter = ' ' + letter;
      }
      return letter;
    }).join('');
  },

  getLastName: function(name){
    var nameArr = name.split(' ');
    return nameArr[nameArr.length - 1];
  },

  removeLastName: function(name){
    var nameArr = name.split(' ');
    return nameArr.slice(0, -1).join(' ');
  }

};
