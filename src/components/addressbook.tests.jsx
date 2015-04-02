// Copyright (C) 2015 Minted Inc.
// All Rights Reserved

'use strict';

var proxyquire = require('proxyquire').noCallThru();

describe('addressbook', function(){
  var module;

  before(function(){
    module = proxyquire('./addressbook.jsx', {});
  });

  it('should exist', function(){
    expect(module).to.not.equal(undefined);
  });
});