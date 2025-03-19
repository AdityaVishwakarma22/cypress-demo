it("Test api with simple intercept", () => {
  cy.visit("https://jsonplaceholder.typicode.com/");
  cy.intercept("GET", "/posts", {
    statusCode: 200,
    body: [
      { id: 1, title: "Intercepted Post", body: "This is a mocked response" },
    ],
  }).as("posts");
  cy.get('table:nth-of-type(1) td a[href="/posts"]').click();
  cy.wait("@posts");
});
