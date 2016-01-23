import Immutable from "immutable";

const reducers = {

  TABLE_SORT: (state, action) =>{
    let {cursor, columnId} = action;
    const currentColumn = cursor.getIn(["sort", "column"]);
    const currentOrder = cursor.getIn(["sort", "order"]);

    if (columnId !== currentColumn) {
      cursor = cursor.set("sort", Immutable.Map({column: columnId, order: "desc"}))
    } else {
      cursor = cursor.setIn(["sort", "order"], currentOrder === "asc" ? "desc": "asc");
    }
    cursor = cursor.setIn(["pagination", "offset"], 0);

    return cursor._rootData; //TODO remove or isolate internals?
  },

  TABLE_SET_PAGE: (state, {cursor, page}) =>{
    const pagination = cursor.get("pagination");
    cursor = cursor.setIn(["pagination", "offset"], page * pagination.get("limit"));

    return cursor._rootData;
  },

  TABLE_FILTER: (state, {query, cursor}) => {
    cursor = cursor.set("query", query);
    cursor = cursor.setIn(["pagination", "offset"], 0);

    return cursor._rootData;
  }

};

export default (state, action) => {
  const reducer = reducers[action.type];
  if (reducer) return reducer(state, action);
  return state;
}


