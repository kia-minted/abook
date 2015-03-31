var AddressbookDispatcher = require('../dispatchers/addressbookDispatcher.js');
var { EventEmitter } = require('events');
var AppConstants = require('../constants/addressbookConstants.js');
var assign = require('object-assign');

const CHANGE_EVENT = 'change';

var _state = {
  friendEmails: [],
  friendAddresses: []
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
      _state = action.data;
      AddressbookStore.emitChange();
    }

    return true;
  })
});

export default AddressbookStore;
