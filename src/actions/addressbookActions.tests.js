// Copyright (C) 2015 Minted Inc.
// All Rights Reserved

'use strict';

var proxyquire = require('proxyquire').noCallThru();

describe('addressbookActions', function(){
  var module;

  before(function(){
    module = proxyquire('./addressbookActions.js', {});
  });

  it('should exist', function(){
    expect(module).to.not.equal(undefined);
  });
});