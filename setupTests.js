import React from 'react';


// Setup adapter to work with enzyme 3.2.0
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

/* ====== Use this if you use internationalization ===== */


// `intl` prop is required when using injectIntl HOC
// const nodeWithIntlProp = node => React.cloneElement(node, { intl });
//
// // shallow() with React Intl context
// global.shallowWithIntl = (node, { context, ...options } = {}) => {
//   return Enzyme.shallow(nodeWithIntlProp(node), {
//     ...options,
//     context: {
//       ...context,
//       intl
//     }
//   });
// };
// mount() with React Intl context
// global.mountWithIntl = (
//   node,
//   { context, childContextTypes, ...options } = {}
// ) => {
//   return Enzyme.mount(nodeWithIntlProp(node), {
//     ...options,
//     context: {
//       ...context,
//       intl
//     },
//     childContextTypes: {
//       intl: intlShape,
//       ...childContextTypes
//     }
//   });
// };
