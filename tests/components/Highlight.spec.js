import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Highlight from '../../src/js/components/Highlight'

describe("Highlight", () => {

  it("shouldn't highlight a text that didn't match the filter", () => {
    const props = {
      text: "doesn't match",
      filter: "wut"
    };

    const component = renderComponent(props);
    expect(findHighlightText(component)).to.equal(undefined);
  });

  it("should highlight part that match with filter", () => {
    const props = {
      text: "this will match",
      filter: "will"
    };

    const component = renderComponent(props);
    const highlight = TestUtils.findRenderedDOMComponentWithClass(component, "highlight");
    expect(findHighlightText(component)).to.equal("will");
  });

  it("should highlight ignoring case", () => {
    const props = {
      text: "this will match",
      filter: "WILL"
    };

    const component = renderComponent(props);
    expect(findHighlightText(component)).to.equal("will");
  });

  function renderComponent(props) {
    return TestUtils.renderIntoDocument(<Highlight {...props} ></Highlight>)
  }

  function findHighlightText(component) {
    const highlights = TestUtils.scryRenderedDOMComponentsWithClass(component, "highlight");
    if (highlights.length === 0) {
      return;
    }
    if (highlights.length === 1) {
      return highlights[0].textContent;
    }
    throw new Error("Too much highlight nodes");
  }

});

