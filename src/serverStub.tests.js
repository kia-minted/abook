// Copyright (C) 2015 Minted Inc.
// All Rights Reserved

'use strict';

var proxyquire = require('proxyquire').noCallThru();

describe('serverStub', function(){
  var module;

  before(function(){
    module = proxyquire('./serverStub.js', {});
  });

  it('should exist', function(){
    expect(module).to.not.equal(undefined);
  });

  it('should have friendEmails', function(){
    expect(module.friendEmails).to.be.an('array');
    expect(module.friendEmails.length).to.not.equal(0);
    expect(module.friendEmails[0]).to.be.a('object');
  });

  it('should have friendAddresses', function(){
    expect(module.friendAddresses).to.be.an('array');
    expect(module.friendAddresses.length).to.not.equal(0);
    expect(module.friendAddresses[0]).to.be.a('object');
  });
});
