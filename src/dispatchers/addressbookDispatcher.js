var { Dispatcher } = require('flux');
var assign = require('object-assign');

var AddressbookDispatcher = assign(new Dispatcher(), {
  handleViewAction: function(action){
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  },
  handleServerAction: function(action){
    this.dispatch({
      source: 'SERVER_ACTION',
      action: action
    });
  }
});

export default AddressbookDispatcher;
