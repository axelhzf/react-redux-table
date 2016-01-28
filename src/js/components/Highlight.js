import React, {PropTypes} from "react";
import ReactDom from "react-dom";
import shouldPureComponentUpdate from 'react-pure-render/function';

export default class Highlight extends React.Component {

  static propsTypes = {
    text: PropTypes.string.isRequired,
    filter: PropTypes.string.isRequired
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    const {text, filter} = this.props;
    const textLowerCase = text.toLowerCase();
    const filterLowerCase = filter.toLowerCase();

    const startIndex = textLowerCase.indexOf(filterLowerCase);
    if (startIndex < 0) {
      return <span>{text}</span>
    } else {
      const endIndex = startIndex + filter.length;
      const before = text.slice(0, startIndex);
      const highlight = text.slice(startIndex, endIndex);
      const after = text.slice(endIndex);
      return <span>{before}<span className="highlight">{highlight}</span>{after}</span>
    }
  }
}
