import React, {PropTypes, Children} from "react";
import ReactDom from "react-dom";
import {connect} from "react-redux";
import _ from "lodash";
import Pager from "react-pager";

import Pagination from "./Pagination";

class Table extends React.Component {

  static propTypes = {
    columns: PropTypes.array.isRequired,
    cursor: PropTypes.any.isRequired // Cursor PropType?
  };

  onClickHeader = (e, columnId) => {
    e.preventDefault();

    const {dispatch, cursor} = this.props;

    dispatch({type: "TABLE_SORT", cursor: cursor, columnId});
  };

  renderHeader = (column, index) => {
    let sortSymbol = "";
    const sortColumn = this.props.cursor.getIn(["sort", "column"]);

    if (sortColumn === column.id) {
      const sortOrder = this.props.cursor.getIn(["sort", "order"]);
      sortSymbol = sortOrder === "asc" ? "▲" : "▼";
    }

    return (
      <th key={index}><a href="" onClick={(e) => this.onClickHeader(e, column.id)}>{column.name} {sortSymbol}</a></th>
    );
  };

  renderRow = (row, rowIndex) => {
    const {columns} = this.props;
    const renderCell = (child, childIndex) => <td key={childIndex}>{child.cell(row, rowIndex)}</td>;
    return <tr key={rowIndex}>{columns.map(renderCell)}</tr>;
  };

  comparator(key, order) {
    return (a, b) => {
      const aValue = a.get(key);
      const bValue = b.get(key);
      const isAsc = order === "asc";
      if (aValue > bValue) {
        return isAsc ? 1 : -1;
      } else if (aValue < bValue) {
        return isAsc ? -1 : 1;
      }
      return 0;
    }
  }

  onPageChange = (page) => {
    const {cursor, dispatch} = this.props;
    dispatch({type: "TABLE_SET_PAGE", cursor, page});
  };

  visibleRows() {
    const {cursor, columns} = this.props;

    const rows = cursor.get("rows");
    const sort = cursor.get("sort").toJS();

    const sortColumn = _.find(columns, {id: sort.column});
    let visibleRows = rows;
    if (sortColumn) {
      visibleRows = rows.sort(this.comparator(sortColumn.sort, sort.order));
    }

    const offset = cursor.getIn(["pagination", "offset"]);
    const limit = cursor.getIn(["pagination", "limit"]);
    visibleRows = visibleRows.slice(offset, offset + limit);

    return visibleRows;
  }

  paginationOptions() {
    const {cursor} = this.props;
    const rows = cursor.get("rows");
    const offset = cursor.getIn(["pagination", "offset"]);
    const limit = cursor.getIn(["pagination", "limit"]);

    return {
      total: Math.ceil(rows.count() / limit),
      current : Math.floor(offset / limit)
    };
  }

  render() {
    const {columns} = this.props;

    const visibleRows = this.visibleRows();
    const paginationOptions = this.paginationOptions();

    return (
      <div>
        <table>
          <thead>
          <tr>
            { columns.map(this.renderHeader) }
          </tr>
          </thead>
          <tbody>
          { visibleRows.map(this.renderRow) }
          </tbody>
        </table>
        <Pagination {...paginationOptions} onPageChange={this.onPageChange}/>
      </div>
    )
  }
}

export default connect()(Table);
