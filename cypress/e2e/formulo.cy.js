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
      cy.get("input[type='number']").click({ force: true }).type("9306504386");
      cy.contains("Send OTP").click();

      cy.intercept("GET", "/user/otp-auth/authenticate-with-otp", {
        statusCode: 200,
        body: { message: "OTP sent successfully to 9306504386" },
      }).as("sentOtp");
      cy.wait("@sentOtp");

      cy.get('input[type = "text"]').type("0000");
      cy.intercept("POST", "/user/otp-auth/validate-otp*", {
        statusCode: 200,
        body: {
          message: "SUCCESS",
          data: {
            jwt_token:
              "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjZmUxMTc0OC1hYjM5LTRlM2MtOTI4Yi05N2Q1NWY4M2Q0OGMiLCJhdWQiOiIwMDUxOTYyYTEyZjk5Yjc3OTZkYjRiY2U1YjY0NzM4NDdmM2ExYTNkMWM1Mzk4MjgzMDNlNTk5NTNhZGE2MWQzIiwiaWF0IjoxNzQyNDY2ODQxLCJleHAiOjE3NDUwNTg4NDEsInR5cGUiOiJhY2Nlc3MiLCJ1c2VyIjp7InVzZXJfcHVibGljX2lkIjoiZjZkOWUxN2QzZTZlYzJmNWRhMmNkNWNjNDJkZThjMzMifX0.Tie9VDlJgYRPFw1OhjCU7q7oGIJDbmXn97CNRdSPUK8S0iVznLAPbtJNHSTguOgoan-OIEuQ4ry5woxcITlA3o0tMNmLiqDlrDokLCtXM-_VIrtVz2bIfRgb1UhYn9MKtnc-MpJiw9lCSVyIH2O5U11FnOhxG5rJzJXl6fjXeSM",
          },
        },
      }).as("otpValidation");
      cy.intercept("GET", "/user/formulo-user/user-info*", {
        statusCode: 200,
        body: {
          age: 25,
          email: "vamsi@formulo.in",
          full_name: "vamsi",
          gender: "Male",
          phn_no: "9676886681",
          user_status: "SIGNUP_COMPLETED",
        },
      }).as("userInfo");
      cy.intercept("GET", "/medical-emr/medical-history", {
        statusCode: 200,
        body: {
          created_at: "2025-02-18T19:29:08.666000",
          current_question: {
            options: [
              {
                option_image: "medical-quiz-other.png",
                option_text: "Acne / Pimples",
              },
              {
                option_image: "medical-quiz-other.png",
                option_text: "Pigmentation",
              },
              {
                option_image: "medical-quiz-other.png",
                option_text: "Skin Dullness",
              },
              {
                option_image: "medical-quiz-other.png",
                option_text: "Open Pores",
              },
              {
                option_image: "medical-quiz-other.png",
                option_text: "Fine Lines / Anti Ageing",
              },
              {
                option_image: "medical-quiz-other.png",
                option_text: "Dark Circles",
              },
              {
                option_image: "medical-quiz-other.png",
                option_text: "Something else",
              },
            ],
            question_id: "skin_concern",
            question_text: "What is your skin concern?",
            question_type: "single_choice",
            required: true,
          },
          current_question_index: 1,
          medical_history_id: "7297698674413408256",
          plan_id: null,
          question_count: 14,
          state: "UPDATED",
          updated_at: "2025-02-18T19:31:43.076000",
          user_id: "guest_7297698566657544193",
          user_responses: {
            basic_details: {
              age: 30,
              full_name: "John",
              gender: "Male",
            },
          },
        },
      }).as("medicalHistory");

      cy.get(".text-center button").click();
      cy.wait("@otpValidation").its("response.statusCode").should("eq", 200);
      cy.wait(2000);
      cy.wait("@userInfo").its("response.statusCode").should("eq", 200);
      cy.wait("@medicalHistory").its("response.statusCode").should("eq", 200);
    });
  });
});
