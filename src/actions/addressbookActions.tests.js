// Copyright (C) 2015 Minted Inc.
// All Rights Reserved

'use strict';

var AddressbookConstants = require('../constants/addressbookConstants.js');
var AddressbookDispatcher = require('../dispatchers/addressbookDispatcher.js');
var sinon = require('sinon');
var proxyquire = require('proxyquire').noCallThru();

describe('addressbookActions', function(){
  var module;
  var serverActionSpy;
  var viewActionSpy;

  before(function(){
    module = proxyquire('./addressbookActions.js', {
      '../serverStub.js': {
        isMe: true
      }
    });
  });

  beforeEach(function(){
    serverActionSpy = sinon.spy(AddressbookDispatcher, 'handleServerAction');
    viewActionSpy = sinon.spy(AddressbookDispatcher, 'handleViewAction');
  });

  it('should exist', function(){
    expect(module).to.not.equal(undefined);
  });

  describe('fetchServerData', function(){

    it('should be a function', function(){
      expect(module.fetchServerData).to.be.a('function');
    });

    it('should call receiveServerData', function(){
      var receiveDataSpy = sinon.spy(module, 'receiveServerData');
      module.fetchServerData();
      expect(receiveDataSpy.calledOnce).to.equal(true);
      expect(receiveDataSpy.withArgs({ isMe: true}));
      module.receiveServerData.restore();
    });
  });

  describe('receiveServerData', function(){
    it('should be a function', function(){
      expect(module.receiveServerData).to.be.a('function');
    });

    it('should trigger a serverAction with the correct arguments', function(){
      var serverData = {Waz: 'Zup'};
      module.receiveServerData(serverData);
      expect(serverActionSpy.calledOnce).to.equal(true);
      expect(serverActionSpy.calledWith({
        actionType: AddressbookConstants.RECEIVE_SERVER_DATA,
        data: serverData
      })).to.equal(true);

    });
  });
  afterEach(function(){
    AddressbookDispatcher.handleServerAction.restore();
    AddressbookDispatcher.handleViewAction.restore();
  });


});

