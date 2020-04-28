describe("The Home Page", () => {
  before(() => {
    cy.visit("/");
  });

  it("should include the right header", () => {
    const headLinks = [
      "https://github.com/ricca509",
      "https://www.linkedin.com/in/riccardocoppola/",
      "https://twitter.com/onefiniteloop",
      "https://www.instagram.com/ricca509/",
      "https://500px.com/ricca509",
      "https://onefiniteloop.io",
      "mailto:riccardo@onefiniteloop.io",
    ];
    headLinks.forEach(link => {
      cy.get("header").find(`a[href="${link}"]`);
    });
  });

  describe("the 'About me' section", () => {
    it("Should include the key content", () => {
      cy.contains("I'm Riccardo Coppola. I write code");
      cy.contains("Get my CV").should("exist");
    });

    it("should download the right file (cv) when clicked on the cta", () => {
      cy.contains("Get my CV")
        .should("have.attr", "href")
        .and("equal", "/riccardo-coppola-cv.pdf");
    });
  });

  it("should include the 'Experience' section", () => {
    const experienceList = [
      "Burberry",
      "Trainline",
      "Lastminute.com",
      "F1000",
      "KLM",
      "Prometeo",
    ];

    cy.get("h2").contains("Experience");

    return experienceList.some(experience => {
      cy.get("article").contains(experience);
    });
  });

  it("should include the 'Side projects' section", () => {
    const sideProjectsList = ["ricca509.github.io", "F", "Triptapp [Closed]"];

    cy.get("h2").contains("Side projects");

    return sideProjectsList.some(project => {
      cy.contains(project);
    });
  });

  it("should include the 'Interests' section", () => {
    cy.get("h2").contains("Interests");
  });

  it("should include the 'Languages' section", () => {
    cy.get("h2").contains("Spoken languages");
  });

  it("should include the 'Education' section", () => {
    cy.get("h2").contains("Education");
  });
});
