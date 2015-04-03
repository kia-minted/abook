var AddressbookDispatcher = require('../dispatchers/addressbookDispatcher.js');
var { EventEmitter } = require('events');
var AppConstants = require('../constants/addressbookConstants.js');
var assign = require('object-assign');

const CHANGE_EVENT = 'change';

var _state = {
  //properties of the addresbook instance
  hasGuestList: true,
  isSelectable: true,
  displayType: 'email',

  //data sent to and from server
  friendEmails: [],
  friendAddresses: [],
  selectedAddresses: [],

  //filtering state
  filterBy: 'lastName',
  filterMatch: '',

  //sorting state
  sortBy: 'name',

  //search state
  searchField: '',

  //all selected state
  allSelected: false,
};

function setSearchField(newSearchField){
  _state.searchField = newSearchField;
}

function toggleSelectAll(){
  _state.allSelected = !_state.allSelected;
  _state.selectedAddresses = [];
  if(_state.allSelected){
    //TODO: Currently only selecting emails
    _state.selectedAddresses = _state.friendEmails.concat([]);
  }
}

function setFilterMatch(newMatch){
  _state.filterMatch = newMatch === _state.filterMatch ?
    '' : newMatch;
}

function extendState(data){
  _state = assign(_state, data);
}

function addEmail(newEmail){
  //TODO: ID SHOULD COME FROM SERVER
  newEmail.id = _state.friendEmails.length+1;
  _state.friendEmails.push(newEmail);
}

function editEmail(editedEmail){
  var targetEmail = _state.friendEmails.filter(function(email){
    return email.id === editedEmail.id;
  })[0];
  targetEmail = assign(targetEmail, editedEmail);
}

function selectEmail(selectedId){
  var selectedEmail = _state.friendEmails
    .filter(function(email){
      return email.id === selectedId;
    })[0];
  _state.selectedAddresses.push(selectedEmail);
}
function deselectEmail(deselectId){
  _state.selectedAddresses = _state.selectedAddresses
    .filter(function(address){
      return address.id !== deselectId;
    });
}

function setSortBy(sortBy){
  _state.sortBy = sortBy;
}

var AddressbookStore = assign(new EventEmitter(), {
  getState: function(){
    return _state;
  },
  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  },
  dispatcherIndex: AddressbookDispatcher.register((payload)=>{
    var action = payload.action;

    switch(action.actionType){
      case AppConstants.RECEIVE_SERVER_DATA:
        extendState(action.data);
        AddressbookStore.emitChange();
        break;

      case AppConstants.ADD_EMAIL:
        addEmail(action.data);
        AddressbookStore.emitChange();
        break;

      case AppConstants.EDIT_EMAIL:
        editEmail(action.data);
        AddressbookStore.emitChange();
        break;

      case AppConstants.SELECT_EMAIL:
        selectEmail(action.emailId);
        AddressbookStore.emitChange();
        break;

      case AppConstants.DESELECT_EMAIL:
        deselectEmail(action.emailId);
        AddressbookStore.emitChange();
        break;

      case AppConstants.FILTER_BY_LETTER:
        setFilterMatch(action.letter);
        AddressbookStore.emitChange();
        break;

      case AppConstants.CHANGE_SORT_BY:
        setSortBy(action.sortBy);
        AddressbookStore.emitChange();
        break;

      case AppConstants.SEARCH_FOR:
        setSearchField(action.searchField);
        AddressbookStore.emitChange();
        break;

      case AppConstants.TOGGLE_SELECT_ALL:
        toggleSelectAll();
        AddressbookStore.emitChange();
        break;
    }

    return true;

  })
});

export default AddressbookStore;
