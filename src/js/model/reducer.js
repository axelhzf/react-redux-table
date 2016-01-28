import {Map} from "immutable";
import Cursor from "immutable/contrib/cursor";

const reducers = {

  TABLE_SORT: (state, action) =>{
    let {statePath, columnId} = action;

    var cursor = Cursor.from(state, statePath);
    const currentColumn = cursor.getIn(["sort", "column"]);
    const currentOrder = cursor.getIn(["sort", "order"]);

    if (columnId !== currentColumn) {
      cursor = cursor.set("sort", Map({column: columnId, order: "desc"}))
    } else {
      cursor = cursor.setIn(["sort", "order"], currentOrder === "asc" ? "desc": "asc");
    }
    cursor = cursor.setIn(["pagination", "offset"], 0);

    return cursor._rootData; //TODO remove or isolate internals?
  },

  TABLE_SET_PAGE: (state, {statePath, page}) =>{
    var cursor = Cursor.from(state, statePath);
    const pagination = cursor.get("pagination");
    cursor = cursor.setIn(["pagination", "offset"], page * pagination.get("limit"));

    return cursor._rootData;
  },

  TABLE_FILTER: (state, {query, statePath}) => {
    var cursor = Cursor.from(state, statePath);
    cursor = cursor.set("query", query);
    cursor = cursor.setIn(["pagination", "offset"], 0);

    return cursor._rootData;
  },

  TABLE_TOGGLE_HIGHLIGHT: (state, {statePath, rowId}) => {
    const path = [statePath, "highlightIds", rowId];
    const currentlyHighlighted = state.getIn(path);
    if (currentlyHighlighted) {
      state = state.deleteIn(path);
    } else {
      state = state.setIn(path, true)
    }
    return state;
  }

};

export default (state, action) => {
  const reducer = reducers[action.type];
  if (reducer) return reducer(state, action);
  return state;
}


