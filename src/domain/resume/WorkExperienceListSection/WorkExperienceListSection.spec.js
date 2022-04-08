import React from "react";
import { shallow } from "enzyme";
import WorkExperienceListSection from "./";

describe("The work-experience-list-section component", () => {
  it("renders a list of work experiences and a title", () => {
    const props = {
      experienceList: [
        {
          node: {
            id: "aaabbb123",
            frontmatter: {
              company: "Company A",
              location: "London, UK",
              role: "Senior Fullstack Developer",
              from_date: "Mar 2020",
              to_date: "Sep 2020",
              technologies: ["Node.js", "React"],
            },
            html: "<p>Some html here</p>",
          },
        },
        {
          node: {
            id: "aaabbb1234",
            frontmatter: {
              company: "Company B",
              location: "London, UK",
              role: "Senior Fullstack Developer",
              from_date: "Mar 2019",
              to_date: "Sep 2021",
              technologies: ["Node.js", "React"],
            },
            html: "<p>Some other html here</p>",
          },
        },
      ],
    };
    const wrapper = shallow(<WorkExperienceListSection {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
