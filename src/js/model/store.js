import Immutable from "immutable";
import {createStore, compose} from "redux";
import reducer from "./reducer";
import _ from "lodash";
import DevTools from "../DevTools";

const initialState = Immutable.fromJS({
  issues: {
    query: "",
    sort: {
      column: undefined,
      order: "desc"
    },
    pagination: {
      limit: 5,
      offset: 0
    },
    rows: mockRows(50)
  }
});

function mockRows(numberOfRows) {
  return _.map(_.range(0, numberOfRows), i => (
  {title: `title ${i}`, author: `author ${i}`, body: `body ${i}`}
  ));
}

const finalCreateStore = compose(
  DevTools.instrument()
)(createStore);

export default finalCreateStore(reducer, initialState);



