import React from "react";
import {shallow, mount} from "enzyme";
import ReactTestUtils from "react-addons-test-utils";
import SearchInput from "../../src/js/components/SearchInput";

describe("SearchInput", () => {

  var props;
  var component;
  var input;
  var form;

  beforeEach(() => {
    props = {value: "abc", onChange: expect.createSpy()};
    component = mount(<SearchInput {...props}/>);
    input = component.find("input");
    form = component.find("form");
  });

  it("should render the current value", () => {
    expect(input.get(0).value).toEqual("abc");
  });

  it("should call callback when input change", () => {
    input.get(0).value = 'giraffe';
    input.simulate("change");
    expect(props.onChange.calls[0].arguments).toEqual(["giraffe"]);
  });

  it("should call callback when form submit", () => {
    input.get(0).value = 'giraffe';
    form.simulate("submit");
    expect(props.onChange.calls[0].arguments).toEqual(["giraffe"]);
  });

});