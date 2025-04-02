// Checks Error Validation
describe("Formulo testing", () => {
  it("User Authentication", () => {
    cy.visit("https://test.formulo.in/");

    cy.window().then((win) => {
      const currentWidth = win.innerWidth;

      if (currentWidth >= 1025) {
        cy.contains("log in").click();
        cy.contains("send otp").click();
      } else {
        cy.get(
          '#navbar-expanded:nth-of-type(1) div button[data-bs-toggle="offcanvas"]'
        ).click();

        cy.get(
          "#offcanvasNavbarLight li:nth-child(3) a:nth-child(2) button"
        ).click();
      }
      cy.url().should("include", "authentication?tab=Sign+In");
      cy.get("input[type='number']")
        .click()
        .should("be.enabled")
        .wait(5000)
        .then(($input) => {
          if ($input.is(":enabled")) {
            cy.get("input[type='number']").type("2306504386");
          } else {
          }
        });
      cy.contains("Send OTP").click();

      // Intercept error from backend
      // cy.intercept("GET", "/user/otp-auth/authenticate-with-otp", {
      //   statusCode: 200,
      //   body: { error: "Please enter a valid phone number." },
      // }).as("failedRequest");

      // cy.wait("@failedRequest").then((interception) => {
      //   expect(interception.response.statusCode).to.eq(200);
      //   expect(interception.response.body.error).to.eq(
      //     "Please enter a valid phone number."
      //   );
      // });

      //   Incorrect mobile number
      cy.get(".text-danger").should(
        "contain.text",
        "Please enter a valid phone number."
      );

      //   Incomplete mobile number
      cy.get("input[type='number']").clear().type("306504386");
      cy.get(".text-danger").should(
        "have.text",
        "This field should be at least 10 characters long"
      );
    });
  });
});
