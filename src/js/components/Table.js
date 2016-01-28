import React, {PropTypes, Children} from "react";
import ReactDom from "react-dom";
import {connect} from "react-redux";
import _ from "lodash";
import Pager from "react-pager";
import classnames from "classnames";

import Pagination from "./Pagination";
import SearchInput from "./SearchInput";

import Cursor from "immutable/contrib/cursor";

class Table extends React.Component {

  static propTypes = {
    columns: PropTypes.array.isRequired,
    statePath: PropTypes.string.isRequired,

    //connect
    cursor: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  onClickHeader = (e, columnId) => {
    e.preventDefault();

    const {dispatch, statePath} = this.props;

    dispatch({type: "TABLE_SORT", statePath, columnId});
  };

  renderHeader = (column, index) => {
    let sortSymbol = "";
    const sortColumn = this.props.cursor.getIn(["sort", "column"]);

    if (sortColumn === column.id) {
      const sortOrder = this.props.cursor.getIn(["sort", "order"]);
      sortSymbol = sortOrder === "asc" ? "▲" : "▼";
    }

    return (
      <th key={index} style={column.style}><a href="" onClick={(e) => this.onClickHeader(e, column.id)}>{column.name} {sortSymbol}</a></th>
    );
  };

  renderRow = (row, rowIndex) => {
    const {cursor, columns} = this.props;
    const renderCell = (child, childIndex) => <td key={childIndex}>{child.cell(row, rowIndex)}</td>;
    const isHighlighted = cursor.getIn(["highlightIds", row.get("id")]);
    const className = classnames({"row-highlighted": isHighlighted});
    return <tr className={className} onClick={(e) =>this.onSelectRow(e, row)} key={rowIndex}>{columns.map(renderCell)}</tr>;
  };

  onSelectRow = (e, row) => {
    e.stopPropagation();

    const {dispatch, statePath} = this.props;
    const rowId = row.get("id");

    dispatch({type: "TABLE_TOGGLE_HIGHLIGHT", statePath, rowId});
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
    const {statePath, dispatch} = this.props;
    dispatch({type: "TABLE_SET_PAGE", statePath, page});
  };

  visibleRows(rows) {
    const {cursor, columns} = this.props;

    const sort = cursor.get("sort").toJS();

    let visibleRows = rows;

    // sort
    const sortColumn = _.find(columns, {id: sort.column});
    if (sortColumn) {
      visibleRows = rows.sort(this.comparator(sortColumn.sort, sort.order));
    }

    // pagination
    const offset = cursor.getIn(["pagination", "offset"]);
    const limit = cursor.getIn(["pagination", "limit"]);

    visibleRows = visibleRows.slice(offset, Math.min(offset + limit, visibleRows.count()));

    return visibleRows;
  }

  paginationOptions(rows) {
    const {cursor} = this.props;
    const offset = cursor.getIn(["pagination", "offset"]);
    const limit = cursor.getIn(["pagination", "limit"]);
    return {
      total: Math.ceil(rows.count() / limit),
      current: Math.floor(offset / limit)
    };
  }

  filterRows() {
    const {cursor} = this.props;
    const rows = cursor.get("rows");
    const query = cursor.get("query");

    // filter
    if (query.length === 0) {
      return rows;
    }

    const keys = _.map(this.props.columns, "sort"); //TODO rename sort to key

    const ignoreCaseMatch = (a, b) => a.toLowerCase().indexOf(b.toLowerCase()) >= 0;
    const rowMatch = (row) =>  _.some(keys, key => ignoreCaseMatch(row.get(key), query));

    return rows.filter(rowMatch);
  }

  onChangeQuery = (query) => {
    const {dispatch, statePath} = this.props;
    dispatch({type: "TABLE_FILTER", statePath, query});
  };

  render() {
    const {cursor, columns} = this.props;

    const filteredRows = this.filterRows();
    const visibleRows = this.visibleRows(filteredRows);
    const paginationOptions = this.paginationOptions(filteredRows);

    const query = cursor.get("query");

    return (
      <div>
        <SearchInput value={query} onChange={this.onChangeQuery}/>
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
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    cursor: Cursor.from(state, ownProps.statePath)
  }
};

export default connect(mapStateToProps)(Table);
