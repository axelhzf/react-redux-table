import React, {PropTypes, Children} from "react";
import ReactDom from "react-dom";
import {connect} from "react-redux";
import _ from "lodash";

export default class Pagination extends React.Component {

  static propTypes = {
    total: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
  };

  onClickPage(page) {
    return (e) => {
      e.preventDefault();
      this.props.onPageChange(page);
    };
  };

  render() {
    const {total, current} = this.props;

    const first = <li><button disabled={current === 0} onClick={this.onClickPage(0)}>First</button></li>;
    const previous = <li><button disabled={current === 0} onClick={this.onClickPage(current - 1)}>Previous</button></li>;
    const next = <li><button disabled={current === total - 1} onClick={this.onClickPage(current + 1)}>Next</button></li>;
    const last = <li><button disabled={current === total -1} onClick={this.onClickPage(total - 1)}>Last</button></li>;

    const visiblePages = _.range(total);
    const pages = _.map(visiblePages, page => {
      return <li key={page}><button disabled={page === current} onClick={this.onClickPage(page)}>{page + 1}</button></li>
    });

    return (
      <ul className="pagination">
        {first}
        {previous}
        {pages}
        {next}
        {last}
      </ul>
    )
  }
}

