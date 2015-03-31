/*global React, Addressbook */
import React from 'react';

import Addressbook from './components/addressbook.jsx';

var TARGET = 'targetId';
var MOUNTNODE = document.getElementById(TARGET);


React.render(<Addressbook/>, MOUNTNODE);
