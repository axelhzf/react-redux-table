import React, {PropTypes} from "react";
import ReactDom from "react-dom";

export default class SearchInput extends React.Component {

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  onSubmit = (e) => {
    e.preventDefault();
    const value = this.refs.input.value;
    this.props.onChange(value);
  };

  onChange = (e) => {
    const value = this.refs.input.value;
    this.props.onChange(value);
  };

  render() {
    const {value} = this.props.value;
    return (
      <form onSubmit={this.onSubmit} className="search-input">
        <input type="search" value={value} onChange={this.onChange} ref="input" placeholder="Filter..."/>
      </form>
    )
  }

}