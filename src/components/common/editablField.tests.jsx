// Copyright (C) 2015 Minted Inc.
// All Rights Reserved

'use strict';

var proxyquire = require('proxyquire').noCallThru();
var EditableField = require('./editablField.jsx');

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils');
var assign = require('object-assign');

describe('editablField', function(){
  var module;
  var exProps;
  var parent = {
    name: ''
  };

  before(function(){
    module = proxyquire('./editablField.jsx', {});
    exProps = {
      'update': function(field, value){
        parent[field] = value;
      },
      'field': 'name',
      'value': 'kia fathi',
      'placeholder': 'Enter name'
    };
  });

  beforeEach(function(){
  });

  it('should exist', function(){
    expect(module).to.not.equal(undefined);
  });

  it('should render correctly', function(){
    var editableField = React.render(<EditableField {...exProps}/>, document.body);
    var node = React.findDOMNode(editableField);

    expect(node.getAttribute('type')).to.equal('text');
    expect(node.value).to.equal('kia fathi');
    expect(node.getAttribute('placeholder')).to.equal('Enter name');
  });

  it('defaults placeholder to upper case field', function(){
    exProps = assign(exProps, {placeholder: ''});
    var editableField = React.render(<EditableField {...exProps}/>, document.body);
    var node = React.findDOMNode(editableField);
    expect(node.getAttribute('type')).to.equal('text');
    expect(node.value).to.equal('kia fathi');
    expect(node.getAttribute('placeholder')).to.equal('Name');
  });

  it('should handle change events with updateValue method', function(){
    var editableField = React.render(<EditableField {...exProps}/>, document.body);
    var node = React.findDOMNode(editableField);
    TestUtils.Simulate.change(node, { target: { value: 'change event' } });
    expect(parent.name).to.equal('change event');

  });


  afterEach(function(){
    React.unmountComponentAtNode(document.body);
    document.body.innerHTML = '';
    exProps = {
      'update': function(field, value){
        parent[field] = value;
      },
      'field': 'name',
      'value': 'kia fathi',
      'placeholder': 'Enter name'
    };

  });

});
