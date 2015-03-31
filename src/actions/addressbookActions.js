var serverData = require('../serverStub.js');
var AddressbookDispatcher = require('../dispatchers/addressbookDispatcher.js');
var AddressbookConstants = require('../constants/addressbookConstants.js');


var AddressbookActions = {
  fetchServerData: function(){
    //TODO: Rig up actual server querying!
    AddressbookActions.receiveServerData();
  },
  receiveServerData: function(){
    AddressbookDispatcher.handleServerAction({
      actionType: AddressbookConstants.RECEIVE_SERVER_DATA,
      data: serverData
    });
  }
};

export default AddressbookActions;
