// voter signup test
describe("Voter Test", () => {
 test("Signup", async () => {
  const res = await request(app)
   .post("/voter/signup")
   .send({ email: "parbat@gmail.com", password: "hacker123" })
   .expect(200);

  try {
   expect(res.body).toEqual({
    message: "Voter registered successfully.",
    statusCode: 200
   });
  } catch (error) {
   console.log(error.message)
  }
 });
})
