//Happy flow

describe("Formulo testing", () => {
  it("User Authentication", () => {
    cy.visit("https://test.formulo.in/");

    cy.window().then((win) => {
      const currentWidth = win.innerWidth;

      if (currentWidth >= 1025) {
        cy.contains("Log In").click();
        cy.contains("Send OTP").click();
      } else {
        cy.get(
          '#navbar-expanded:nth-of-type(1) div button[data-bs-toggle="offcanvas"]'
        ).click();

        cy.get(".navbar-nav button").eq(0).click();

        // updated script for mobile validation
        cy.get("input[type='number']")
          .should("not.be.disabled")
          .should("be.visible")
          .then(($input) => {
            cy.wrap($input).should("not.be.disabled").type("9306504386");
          });
        cy.contains("Send OTP").click();
        cy.pause();
        cy.contains("Sign In").click();
        cy.get(
          '#navbar-expanded:nth-of-type(1) div button[data-bs-toggle="offcanvas"]'
        ).click();

        cy.contains("Start Treatment").wait(2000).click();
        cy.contains("Please provide the following details:").should(
          "be.visible"
        );
        const name = cy.contains("Full Name").siblings("div");
        name
          .get(".text-question input")
          .eq(0)
          .should("not.be.disabled", { timeout: 2000 })
          .should("be.visible")
          .click()
          .wait(3000)
          .type("Aditya");
        const email = cy.contains("Email").siblings("div");
        email.find("input").type("aditya@formulo.in");
        const age = cy.contains("Age").siblings("div");
        age.find("input").type("34");
        cy.contains("Male").click();
        cy.contains("Continue").click();

        cy.contains("Contact Number")
          .should("exist")
          .then(() => {
            cy.get("input[type='number']").wait(60000).type("9306504386");
            cy.contains("Send OTP").click();
          });

        cy.pause();
        cy.contains("Continue").click();
        cy.contains("What is your skin concern?").should("be.visible");
        cy.contains("Dark Circles").click();
        cy.contains("Continue").click();
        cy.contains("More than 6 months").click();
        cy.contains("Continue").click();
        cy.contains("Any other goal you want to achieve?").should("be.visible");
        cy.contains("Continue").click();
        cy.contains("What area is affected?").should("be.visible");
        cy.contains("Face").click();
        cy.contains("Continue").click();
        cy.contains("What is your skin type?").should("be.visible");
        cy.contains("Dry").click();
        cy.contains("Continue").click();
        cy.contains("On a scale of 1 to 5 how sensitive is your skin?").should(
          "be.visible"
        );
        cy.contains("3").click();
        cy.contains("Continue").click();
        cy.contains(
          "Are you pregnant / breastfeeding / planning pregnancy?"
        ).should("be.visible");
        cy.contains("Yes").click();
        cy.get(".yes-no-question textarea")
          .should("be.visible")
          .type("Just testing");
        cy.contains("Continue").click();
        cy.contains(
          "Do you drink alcohol or smoke? If yes on any. Mention frequency : Eg Occasionally, Rarely"
        ).should("be.visible");
        cy.contains("No").click();
        cy.contains("Continue").click();
        cy.contains(
          "How is your diet? Eg: Home cooked food mostly, mostly eat outside, dairy intake present/absent"
        ).should("be.visible");
        cy.get('input[type="text"]').click().type("Home cooked food");
        cy.contains("Continue").click();
        cy.contains("No").click();
        cy.contains("Continue").click();
        cy.contains("No").click();
        cy.contains("Continue").click();
        cy.get('.text-question input[type="text"]')
          .click()
          .type("SunScreen cream");
        cy.contains("Continue").click();
        cy.contains("No").click();
        cy.contains("Continue").click();
        cy.contains("Submit").click();
      }
    });
  });
});

// Tips : to increase wait tiime before typing in input, 2nd OTP is rarely giving errors it has waiting time of 1 minute
