import logger from "./logger";
test("check", () => {
  console.log("OK");
});

test("メッセージに加工する", () => {
  const result = new logger().messageAddApendix("文章");
  expect(result).toBe("logger : 文章");
});
