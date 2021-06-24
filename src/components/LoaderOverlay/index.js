import LoaderComponent from 'react-fullpage-custom-loader';
import React from 'react';
import './index.scss'

export default function LoaderOverlay(props) {
  const defaultProps = {
    sentences: ['Waziki'],
    loaderType: 'ball-atom', // a nice one
    loaderSize: 'big', // small, medium or big?
    color: '#01BCCD', // your default color for the loader
    textStyles: { // Any CSS style!
      fontSize: 24,
      fontWeight: 'bold',
      height: '3em',
      color: '##112B42',
    },
    wrapperBackgroundColor: 'linear-gradient(to bottom, white 0%, #e5e5e5 100%)', // any valid CSS background string works (gradients here!)
    fadeIn: true, // controlled on top level
    startFadeOut: false, // controlled on top level
  };
  return (<LoaderComponent {...defaultProps} {...props} />);
}