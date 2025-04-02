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
        cy.get("input[type='number']")
          .should("not.be.disabled", { timeout: 2000 })
          .should("be.visible")
          .then(($input) => {
            cy.wrap($input).should("not.be.disabled").type("9306504386"); // Double-check before typing
          });
        // .type("9306504386");
        cy.contains("Send OTP").click();
        cy.pause();
        cy.contains("Sign In").click();
        cy.get(
          '#navbar-expanded:nth-of-type(1) div button[data-bs-toggle="offcanvas"]'
        ).click();
        cy.intercept("GET", "/medical-emr/medical-history/", {
          statusCode: 200,
          body: {
            created_at: "2025-04-02T02:28:00.744000",
            current_question: {
              question_id: "basic_details",
              question_text: "Please provide the following details:",
              question_type: "group",
              required: true,
              sub_questions: [
                {
                  question_id: "full_name",
                  question_text: "Full Name",
                  question_type: "text",
                  required: true,
                },
                {
                  min: 18,
                  question_id: "age",
                  question_text: "Age",
                  question_type: "number",
                  required: true,
                },
                {
                  options: [
                    {
                      option_text: "Male",
                    },
                    {
                      option_text: "Female",
                    },
                  ],
                  question_id: "gender",
                  question_text: "What is your gender?",
                  question_type: "single_choice",
                  required: true,
                },
              ],
            },
            current_question_index: 0,
            medical_history_id: "7313024376343891968",
            plan_id: null,
            question_count: 15,
            skin_progress: [],
            state: "STARTED",
            updated_at: "2025-04-02T02:28:00.744000",
            user_id: "f6d9e17d3e6ec2f5da2cd5cc42de8c33",
            user_responses: {},
          },
        }).as("fetchData");
        cy.contains("Start Treatment").wait(2000).click();
        cy.wait("@fetchData");
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
        cy.contains("Continue").wait(1000).click();

        // if (cy.contains("Contact Number")) {
        //   cy.get("input[type='number']").wait(60000).type("9306504386");
        //   cy.contains("Send OTP").click();
        // }
        // cy.pause();
        // cy.contains("Continue").click();
        cy.contains("What is your skin concern?")
          .wait(3000)
          .should("be.visible");
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

  it("User Authentication", () => {});
});
