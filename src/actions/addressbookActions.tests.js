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

    it('should trigger a dispatch with the correct arguments', function(){
      var serverData = {Waz: 'Zup'};
      module.receiveServerData(serverData);
      expect(serverActionSpy.calledOnce).to.equal(true);
      expect(serverActionSpy.calledWith({
        actionType: AddressbookConstants.RECEIVE_SERVER_DATA,
        data: serverData
      })).to.equal(true);

    });
  });

  describe('addEmail', function(){
    it('should be a function', function(){
      expect(module.addEmail).to.be.a('function');
    });

    it('should trigger a dispatch with the correct arguments', function(){
      var exEmail = 'im an email!';
      module.addEmail(exEmail);
      expect(viewActionSpy.calledOnce).to.equal(true);
      expect(viewActionSpy.calledWith({
        data: exEmail,
        actionType: AddressbookConstants.ADD_EMAIL
      })).to.equal(true);
    });
  });

  describe('editEmail', function(){
    it('should be a function', function(){
      expect(module.editEmail).to.be.a('function');
    });

    it('should trigger a dispatch with the correct arguments', function(){
      var exEmail = 'im an email!';
      module.editEmail(exEmail);
      expect(viewActionSpy.calledOnce).to.equal(true);
      expect(viewActionSpy.calledWith({
        data: exEmail,
        actionType: AddressbookConstants.EDIT_EMAIL
      })).to.equal(true);
    });
  });

  describe('selectEmail', function(){
    it('should be a function', function(){
      expect(module.editEmail).to.be.a('function');
    });

    it('should trigger a dispatch with the correct arguments', function(){
      var emailId = 1337;
      module.selectEmail(emailId);
      expect(viewActionSpy.calledOnce).to.equal(true);
      expect(viewActionSpy.calledWith({
        emailId: emailId,
        actionType: AddressbookConstants.SELECT_EMAIL
      })).to.equal(true);
    });
  });

  describe('deselectEmail', function(){
    it('should be a function', function(){
      expect(module.deselectEmail).to.be.a('function');
    });

    it('should trigger a dispatch with the correct arguments', function(){
      var emailId = 1337;
      module.deselectEmail(emailId);
      expect(viewActionSpy.calledOnce).to.equal(true);
      expect(viewActionSpy.calledWith({
        emailId: emailId,
        actionType: AddressbookConstants.DESELECT_EMAIL
      })).to.equal(true);
    });
  });

  describe('deselectEmail', function(){
    it('should be a function', function(){
      expect(module.deselectEmail).to.be.a('function');
    });

    it('should trigger a dispatch with the correct arguments', function(){
      var emailId = 1337;
      module.deselectEmail(emailId);
      expect(viewActionSpy.calledOnce).to.equal(true);
      expect(viewActionSpy.calledWith({
        emailId: emailId,
        actionType: AddressbookConstants.DESELECT_EMAIL
      })).to.equal(true);
    });
  });

  describe('filterByLetter', function(){
    it('should be a function', function(){
      expect(module.filterByLetter).to.be.a('function');
    });

    it('should trigger a dispatch with the correct arguments', function(){
      var letter = 'K';
      module.filterByLetter(letter);
      expect(viewActionSpy.calledOnce).to.equal(true);
      expect(viewActionSpy.calledWith({
        letter: letter,
        actionType: AddressbookConstants.FILTER_BY_LETTER
      })).to.equal(true);
    });
  });

  describe('changeSortBy', function(){
    it('should be a function', function(){
      expect(module.changeSortBy).to.be.a('function');
    });

    it('should trigger a dispatch with the correct arguments', function(){
      var letter = 'K';
      module.changeSortBy(letter);
      expect(viewActionSpy.calledOnce).to.equal(true);
      expect(viewActionSpy.calledWith({
        sortBy: letter,
        actionType: AddressbookConstants.CHANGE_SORT_BY
      })).to.equal(true);
    });
  });

  describe('searchFor', function(){
    it('should be a function', function(){
      expect(module.searchFor).to.be.a('function');
    });

    it('should trigger a dispatch with the correct arguments', function(){
      var letter = 'K';
      module.searchFor(letter);
      expect(viewActionSpy.calledOnce).to.equal(true);
      expect(viewActionSpy.calledWith({
        searchField: letter,
        actionType: AddressbookConstants.SEARCH_FOR
      })).to.equal(true);
    });
  });

  afterEach(function(){
    AddressbookDispatcher.handleServerAction.restore();
    AddressbookDispatcher.handleViewAction.restore();
  });


});

