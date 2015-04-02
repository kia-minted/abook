// Copyright (C) 2015 Minted Inc.
// All Rights Reserved

'use strict';

var proxyquire = require('proxyquire').noCallThru();

describe('alphabetPicker', function(){
  var module;

  before(function(){
    module = proxyquire('./alphabetPicker.jsx', {});
  });

  it('should exist', function(){
    expect(module).to.not.equal(undefined);
  });
});