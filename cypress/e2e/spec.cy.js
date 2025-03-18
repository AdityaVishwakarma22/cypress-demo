describe("Intercept with Cypress", () => {
  it("Test api with simple intercept", () => {
    cy.visit("https://jsonplaceholder.typicode.com/");

    cy.intercept({
      path: "/posts",
    }).as("posts");

    cy.get('table:nth-of-type(1) td a[href="/posts"]').click();
    cy.wait("@posts").then((inter) => {
      cy.log(JSON.stringify(inter));
      console.log(JSON.stringify(inter));
      expect(inter.response.body).to.have.length(100);
    });
  });
});

// it.only("Test api with simple intercept", () => {
//   cy.visit("https://jsonplaceholder.typicode.com/");
//   cy.intercept("GET", "https://jsonplaceholder.typicode.com/posts", {
//     statusCode: 200,
//     body: [
//       { id: 1, title: "Intercepted Post", body: "This is a mocked response" },
//     ],
//   }).as("posts");
//   cy.get('table:nth-of-type(1) td a[href="/posts"]').click();
//   cy.wait("@posts");
// });
