// Copyright (C) 2015 Minted Inc.
// All Rights Reserved

'use strict';

var proxyquire = require('proxyquire').noCallThru();

describe('editablField', function(){
  var module;

  before(function(){
    module = proxyquire('./editablField.jsx', {});
  });

  it('should exist', function(){
    expect(module).to.not.equal(undefined);
  });
});