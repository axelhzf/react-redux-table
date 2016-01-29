import React from "react";
import {shallow} from "enzyme";

import Highlight from '../../src/js/components/Highlight'

describe("Highlight", () => {

  it("shouldn't highlight a text that didn't match the filter", () => {
    const props = {
      text: "doesn't match",
      filter: "wut"
    };

    const component = renderComponent(props);
    expect(findHighlightText(component)).toEqual(undefined);
  });

  it("should highlight part that match with filter", () => {
    const props = {
      text: "this will match",
      filter: "will"
    };

    const component = renderComponent(props);
    expect(findHighlightText(component)).toEqual("will");
  });

  it("should highlight ignoring case", () => {
    const props = {
      text: "this will match",
      filter: "WILL"
    };

    const component = renderComponent(props);
    expect(findHighlightText(component)).toEqual("will");
  });

  function renderComponent(props) {
    return shallow(<Highlight {...props} ></Highlight>);
  }

  function findHighlightText(component) {
    const highlights = component.find(".highlight");

    if (highlights.length === 0) {
      return;
    }
    if (highlights.length === 1) {
      return highlights.text();
    }
    throw new Error("Too much highlight nodes");
  }

});

