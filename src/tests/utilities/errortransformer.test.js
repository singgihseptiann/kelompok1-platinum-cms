import { describe, expect, test } from "@jest/globals";
import { transformError } from "../../utilities/errortransformer";

describe("ErrorTransformer", () => {
  test("transformError should return default error when error is empty", () => {
    const actual = transformError(undefined);
    expect(actual.code).toBe(0);
    expect(actual.message).toBe("Unknown");
  });
  test(`transformError should return the same as error data`, () => {
    const dummyCode = 404;
    const dummyMessage = "Data Not Found";
    const dummyError = { code: dummyCode, message: dummyMessage };
    const actual = transformError(dummyError);
    expect(actual.code).toBe(404);
    expect(actual.message).toBe("Data Not Found");
  });
});
