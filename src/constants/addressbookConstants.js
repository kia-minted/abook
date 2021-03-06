var keyMirror = require('react/lib/keyMirror');

module.exports = keyMirror({
  //Server Related Actions
  RECEIVE_SERVER_DATA: null,

  //Email Related Actions
  ADD_EMAIL: null,
  EDIT_EMAIL: null,
  DELETE_EMAIL: null,
  SELECT_EMAIL: null,
  DESELECT_EMAIL: null,

  //All Emails Actions
  TOGGLE_SELECT_ALL: null,

  //Address Actions
  ADD_ADDRESS: null,

  //Filtering Actions
  FILTER_BY_LETTER: null,

  //Sorting Actions
  CHANGE_SORT_BY: null,
});
