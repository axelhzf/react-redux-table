import React from "react";
import {mount} from "enzyme";

import Pagination from "../../src/js/components/Pagination"
import sinon from "sinon";

describe("Pagination", () => {

  it("should show pagination buttons", () => {
    const props = {total: 3, current: 1, onPageChange: expect.createSpy()};
    const component = mount(<Pagination {...props}/>);

    const texts = component.children().map(node => node.text());
    expect(texts).toEqual([
      'First', 'Previous', '1', '2', '3', 'Next', 'Last'
    ]);
  });

  it("should call callback on click buttons", () => {
    const onPageChange = expect.createSpy();
    const props = {total: 5, current: 3, onPageChange};
    const component = mount(<Pagination {...props}/>);

    component.find("button").map(button => button.simulate("click"));

    const callsArguments = onPageChange.calls.map(call => call.arguments[0]);
    expect(callsArguments).toEqual([0, 2, 0, 1, 2, 4, 4, 4]);
  });

});

