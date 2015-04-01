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
  searchField: ''
};


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

    if(action.actionType === AppConstants.RECEIVE_SERVER_DATA){
      _state = assign(_state, action.data);
      AddressbookStore.emitChange();
    }

    if(action.actionType === AppConstants.ADD_EMAIL){
      var newEmail = action.data;
      //TODO: ID SHOULD COME FROM SERVER
      newEmail.id = _state.friendEmails.length+1;
      _state.friendEmails.push(newEmail);
      AddressbookStore.emitChange();
    }

    if(action.actionType === AppConstants.EDIT_EMAIL){
      var updatedEmail = action.data;
      var targetEmail = _state.friendEmails.filter(function(email){
        return email.id === updatedEmail.id;
      })[0];
      targetEmail = assign(targetEmail, updatedEmail);
      AddressbookStore.emitChange();
    }

    if(action.actionType === AppConstants.SELECT_EMAIL){
      var selectedId = action.emailId;
      var selectedEmail = _state.friendEmails
      .filter(function(email){
        return email.id === selectedId;
      })[0];
      _state.selectedAddresses.push(selectedEmail.id);
      AddressbookStore.emitChange();
    }

    if(action.actionType === AppConstants.DESELECT_EMAIL){
      var deselectId = action.emailId;
      _state.selectedAddresses = _state.selectedAddresses
        .filter(function(addressId){
          return addressId !== deselectId;
        });
      AddressbookStore.emitChange();
    }

    if(action.actionType === AppConstants.FILTER_BY_LETTER){
      _state.filterMatch = action.letter === _state.filterMatch ?
        '' : action.letter;
      AddressbookStore.emitChange();
    }

    if(action.actionType === AppConstants.CHANGE_SORT_BY){
      _state.sortBy = action.sortBy;
      console.log(_state.sortBy);
      AddressbookStore.emitChange();
    }

    if(action.actionType === AppConstants.SEARCH_FOR){
      _state.searchField = action.searchField;
      AddressbookStore.emitChange();
    }

    return true;
  })
});

export default AddressbookStore;
