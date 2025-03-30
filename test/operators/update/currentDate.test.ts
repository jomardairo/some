import { $currentDate } from "../../../src/operators/update";

describe("operators/update/currentDate", () => {
  it("should set field to current date", () => {
    let state = { _id: 1, status: "a", lastModified: 100 };
    let past = state.lastModified;
    expect(
      $currentDate(state, {
        lastModified: true,
        "cancellation.date": true
      })
    ).toEqual(["lastModified", "cancellation.date"]);
    expect(state.lastModified).toBeGreaterThan(past);
    expect(state["cancellation"]).toEqual({ date: state.lastModified });
  });
});
