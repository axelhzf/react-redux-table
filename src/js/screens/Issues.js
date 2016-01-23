import React, {PropTypes} from "react";
import ReactDom from "react-dom";
import {connect} from "react-redux";
import Table from "../components/Table";
import Cursor from "immutable/contrib/cursor";

class Issues extends React.Component {

  render() {
    const {issues} = this.props;

    const columns = [
      {
        id: 1,
        name: "title",
        cell: (issue) => issue.get("title"),
        sort: "title"
      },
      {
        id: 2,
        name: "author",
        cell: (issue) => issue.get("author"),
        sort: "author"
      },
      {
        id: 3,
        name: "body",
        cell: (issue) => issue.get("body"),
        sort: "body"
      }
    ];

    return (
      <Table cursor={issues} columns={columns} />
    )
  }

}

const mapStateToProps = (state) => {
  return {
    issues: Cursor.from(state, "issues")
  }
};

export default connect(mapStateToProps)(Issues);