'use strict';

var proxyquire = require('proxyquire').noCallThru();

describe('index', function(){
  var module;
  var renderCalls = 0;
  var renderTarget;
  var renderedComponent;

  before(function(){
    module = proxyquire('./index.js', {
       './components/addressbook.jsx': function(){
         return 'addressbook';
       },
       'react': {
         render: function(component, target){
           renderCalls++;
           renderTarget = target;
           renderedComponent = component;
         },
         createElement: function(reactClass){
           return reactClass();
         }
       }
    });
  });

  it('should exits', function(){
    expect(module).to.eql({});
  });

  it('should call React.render on the correct class', function(){
    expect(renderCalls).to.equal(1);
    expect(renderTarget).to.equal(document.body);
    expect(renderedComponent).to.equal('addressbook');
  });

});
