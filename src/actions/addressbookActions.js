var serverData = require('../serverStub.js');
var AddressbookDispatcher = require('../dispatchers/addressbookDispatcher.js');
var AddressbookConstants = require('../constants/addressbookConstants.js');


var AddressbookActions = {
  fetchServerData: function(){
    //TODO: Rig up actual server querying!
    AddressbookActions.receiveServerData(serverData);
  },
  receiveServerData: function(response){
    AddressbookDispatcher.handleServerAction({
      actionType: AddressbookConstants.RECEIVE_SERVER_DATA,
      data: response
    });
  },
  addEmail: function(email){
    AddressbookDispatcher.handleViewAction({
      actionType: AddressbookConstants.ADD_EMAIL,
      data: email
    });
  },
  editEmail: function(email){
    AddressbookDispatcher.handleViewAction({
      actionType: AddressbookConstants.EDIT_EMAIL,
      data: email
    });
  },
  selectEmail: function(id){
    AddressbookDispatcher.handleViewAction({
      actionType: AddressbookConstants.SELECT_EMAIL,
      emailId: id
    });
  },
  deselectEmail: function(id){
    AddressbookDispatcher.handleViewAction({
      actionType: AddressbookConstants.DESELECT_EMAIL,
      emailId: id
    });
  },
  filterByLetter: function(letter){
    AddressbookDispatcher.handleViewAction({
      actionType: AddressbookConstants.FILTER_BY_LETTER,
      letter: letter
    });
  }
};

export default AddressbookActions;
