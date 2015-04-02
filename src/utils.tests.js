// Copyright (C) 2015 Minted Inc.
// All Rights Reserved

'use strict';

var proxyquire = require('proxyquire').noCallThru();

describe('utils', function(){
  var module;

  var addresses;

  before(function(){
    module = proxyquire('./utils.js', {});
    addresses = [
      { props: {
        name: 'kia fathi',
        isSelected: false}
      },
      { props: {
        name: 'bao nguyen',
        isSelected: false}
      },
      { props: {
        name: 'andrew zey',
        isSelected: true}
      }
    ];
  });

  it('should exist', function(){
    expect(module).to.not.equal(undefined);
  });

  describe('toProperCase', function(){
    it('should be a function', function(){
      expect(module.toProperCase).to.be.a('function');
    });

    it('should convert a string from camel to proper case', function(){
      expect(module.toProperCase('kiaFathi')).to.equal('Kia Fathi');
      expect(module.toProperCase('kia')).to.equal('Kia');
    });
  });

  describe('getLastName', function(){
    it('should be a function', function(){
      expect(module.getLastName).to.be.a('function');
    });

    it('should return the last word in a string', function(){
      expect(module.getLastName('kia fathi')).to.equal('fathi');
      expect(module.getLastName('kia')).to.equal('kia');
    });
  });

  describe('removeLastName', function(){
    it('should be a function', function(){
      expect(module.removeLastName).to.be.a('function');
    });

    it('should return all but the last word in a string', function(){
      expect(module.removeLastName('kia fathi')).to.equal('kia');
      expect(module.removeLastName('kia')).to.equal('');
    });
  });

  describe('compareByLastName', function(){
    it('should be a function', function(){
      expect(module.compareByLastName).to.be.a('function');
    });
    it('should sort last names alphabetically', function(){
      expect(module.compareByLastName(addresses[0], addresses[1])).to.equal(-1);
      expect(module.compareByLastName(addresses[2], addresses[1])).to.equal(1);
      expect(module.compareByLastName(addresses[0], addresses[0])).to.equal(0);
    });
  });

  describe('compareByIsSelected', function(){
    it('should have compareByIsSelected', function(){
      expect(module.compareByIsSelected).to.be.a('function');
    });
    it('should sort last names by selection', function(){
      expect(module.compareByIsSelected(addresses[0], addresses[1])).to.equal(0);
      expect(module.compareByIsSelected(addresses[2], addresses[1])).to.equal(-1);
      expect(module.compareByIsSelected(addresses[1], addresses[2])).to.equal(1);
    });
  });

});
