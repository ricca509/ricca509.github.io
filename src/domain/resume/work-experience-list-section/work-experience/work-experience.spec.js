import React from "react";
import { shallow } from "enzyme";
import WorkExperience from "./";

describe("The work-experience component", () => {
  it("renders a work experience", () => {
    const props = {
      company: "Company A",
      location: "London, UK",
      role: "Senior Fullstack Developer",
      fromDate: "Mar 2020",
      toDate: "Sep 2020",
      technologies: ["Node.js", "React"],
    };
    const wrapper = shallow(
      <WorkExperience {...props}>
        <p>Some html here</p>
      </WorkExperience>
    );

    expect(wrapper).toMatchSnapshot();
  });

  describe("when there is no end date for a work experience", () => {
    it("renders a work experience with an end date of 'present'", () => {
      const props = {
        company: "Company A",
        location: "London, UK",
        role: "Senior Fullstack Developer",
        fromDate: "Mar 2020",
        technologies: ["Node.js", "React"],
      };
      const wrapper = shallow(
        <WorkExperience {...props}>
          <p>Some html here</p>
        </WorkExperience>
      );

      expect(wrapper).toMatchSnapshot();
    });
  });
});
