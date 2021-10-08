import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
import Graph from './components/Graph';
// import { TransitionGroup, CSSTransition as Transition } from 'react-transition-group';
import Navigation from './components/Navigation';

export default () => (
  <>
    {/* render a navigation component */}
    {/* render routing logic of react-router-dom */}
    <Navigation />
    <Graph />
  </>
);
