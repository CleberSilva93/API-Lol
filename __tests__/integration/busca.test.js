const request = require("supertest");

const invocador = require("../../src/models/invocador");
describe("Busca", () => {
  it("should to search a user", async () => {
    const invocado = await invocador.buscaPorNome("mefeu");
    console.log(invocado);
    expect(invocado.status).toBe(200);
  });
});
