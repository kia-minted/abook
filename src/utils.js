export function toProperCase(str){
  var newStr = str[0].toUpperCase() + str.substring(1);
  return newStr.split('').map(function(letter){
    if(letter.toUpperCase() === letter){
      letter = ' ' + letter;
    }
    return letter;
  }).join('');
}

export function getLastName(name){
  var nameArr = name.split(' ');
  return nameArr[nameArr.length - 1];
}

export function removeLastName(name){
  var nameArr = name.split(' ');
  return nameArr.slice(0, -1).join(' ');
}

export function compareByLastName(reactAddress1, reactAddress2){
  var lastName1 = getLastName(reactAddress1.props.name).toUpperCase();
  var lastName2 = getLastName(reactAddress2.props.name).toUpperCase();
  if(lastName1 < lastName2){ return -1; }
  if(lastName1 > lastName2){ return 1; }
  return 0;
}

export function compareByIsSelected(reactAddress1, reactAddress2){
  var selected1 = reactAddress1.props.isSelected;
  var selected2 = reactAddress2.props.isSelected;
  if(selected1  === selected2){ return 0; }
  if(selected1){ return -1; }
  return 1;
}

