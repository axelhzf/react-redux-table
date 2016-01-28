import React, {PropTypes} from "react";
import ReactDom from "react-dom";
import {connect} from "react-redux";
import Table from "../components/Table";
import Cursor from "immutable/contrib/cursor";
import Highlight from "../components/Highlight";

class Issues extends React.Component {

  renderHighlightCellForKey(key) {
    return (issue) => {
      const {issues} = this.props;
      const filter = issues.get("query");
      return <Highlight text={issue.get(key)} filter={filter}/>
    }
  }

  render() {
    const columns = [
      {
        id: 1,
        name: "title",
        cell: this.renderHighlightCellForKey("title"),
        sort: "title"
      },
      {
        id: 2,
        name: "author",
        cell: this.renderHighlightCellForKey("author"),
        sort: "author"
      },
      {
        id: 3,
        name: "body",
        cell: this.renderHighlightCellForKey("body"),
        sort: "body"
      }
    ];

    return <Table statePath="issues" columns={columns} />;
  }

}


const mapStateToProps = (state) => {
  return {
    issues: state.get("issues")
  }
};

export default connect(mapStateToProps)(Issues);