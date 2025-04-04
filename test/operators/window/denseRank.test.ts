import { aggregate } from "../../../src";
import { ProcessingMode } from "../../../src/core";
import { DEFAULT_OPTS } from "../../support";

const options = {
  ...DEFAULT_OPTS,
  processingMode: ProcessingMode.CLONE_INPUT
};

const data = [
  {
    _id: 0,
    type: "chocolate",
    orderDate: new Date("2020-05-18T14:10:30Z"),
    state: "CA",
    price: 13,
    quantity: 120
  },
  {
    _id: 1,
    type: "chocolate",
    orderDate: new Date("2021-03-20T11:30:05Z"),
    state: "WA",
    price: 14,
    quantity: 140
  },
  {
    _id: 2,
    type: "vanilla",
    orderDate: new Date("2021-01-11T06:31:15Z"),
    state: "CA",
    price: 12,
    quantity: 145
  },
  {
    _id: 3,
    type: "vanilla",
    orderDate: new Date("2020-02-08T13:13:23Z"),
    state: "WA",
    price: 13,
    quantity: 104
  },
  {
    _id: 4,
    type: "strawberry",
    orderDate: new Date("2019-05-18T16:09:01Z"),
    state: "CA",
    price: 41,
    quantity: 162
  },
  {
    _id: 5,
    type: "strawberry",
    orderDate: new Date("2019-01-08T06:12:03Z"),
    state: "WA",
    price: 43,
    quantity: 134
  }
];

describe("operators/window/denseRank", () => {
  describe("$denseRank", () => {
    it("Dense Rank Partitions by an Integer Field", () => {
      const result = aggregate(
        data,
        [
          {
            $setWindowFields: {
              partitionBy: "$state",
              sortBy: { quantity: -1 },
              output: {
                denseRankQuantityForState: {
                  $denseRank: {}
                }
              }
            }
          }
        ],
        options
      );

      expect(result).toStrictEqual([
        {
          _id: 4,
          type: "strawberry",
          orderDate: new Date("2019-05-18T16:09:01Z"),
          state: "CA",
          price: 41,
          quantity: 162,
          denseRankQuantityForState: 1
        },
        {
          _id: 2,
          type: "vanilla",
          orderDate: new Date("2021-01-11T06:31:15Z"),
          state: "CA",
          price: 12,
          quantity: 145,
          denseRankQuantityForState: 2
        },
        {
          _id: 0,
          type: "chocolate",
          orderDate: new Date("2020-05-18T14:10:30Z"),
          state: "CA",
          price: 13,
          quantity: 120,
          denseRankQuantityForState: 3
        },
        {
          _id: 1,
          type: "chocolate",
          orderDate: new Date("2021-03-20T11:30:05Z"),
          state: "WA",
          price: 14,
          quantity: 140,
          denseRankQuantityForState: 1
        },
        {
          _id: 5,
          type: "strawberry",
          orderDate: new Date("2019-01-08T06:12:03Z"),
          state: "WA",
          price: 43,
          quantity: 134,
          denseRankQuantityForState: 2
        },
        {
          _id: 3,
          type: "vanilla",
          orderDate: new Date("2020-02-08T13:13:23Z"),
          state: "WA",
          price: 13,
          quantity: 104,
          denseRankQuantityForState: 3
        }
      ]);
    });

    it("Dense Rank Partitions by a Date Field", () => {
      const result = aggregate(
        data,
        [
          {
            $setWindowFields: {
              partitionBy: "$state",
              sortBy: { orderDate: 1 },
              output: {
                denseRankOrderDateForState: {
                  $denseRank: {}
                }
              }
            }
          }
        ],
        options
      );

      expect(result).toStrictEqual([
        {
          _id: 5,
          type: "strawberry",
          orderDate: new Date("2019-01-08T06:12:03Z"),
          state: "WA",
          price: 43,
          quantity: 134,
          denseRankOrderDateForState: 1
        },
        {
          _id: 3,
          type: "vanilla",
          orderDate: new Date("2020-02-08T13:13:23Z"),
          state: "WA",
          price: 13,
          quantity: 104,
          denseRankOrderDateForState: 2
        },
        {
          _id: 1,
          type: "chocolate",
          orderDate: new Date("2021-03-20T11:30:05Z"),
          state: "WA",
          price: 14,
          quantity: 140,
          denseRankOrderDateForState: 3
        },
        {
          _id: 4,
          type: "strawberry",
          orderDate: new Date("2019-05-18T16:09:01Z"),
          state: "CA",
          price: 41,
          quantity: 162,
          denseRankOrderDateForState: 1
        },
        {
          _id: 0,
          type: "chocolate",
          orderDate: new Date("2020-05-18T14:10:30Z"),
          state: "CA",
          price: 13,
          quantity: 120,
          denseRankOrderDateForState: 2
        },
        {
          _id: 2,
          type: "vanilla",
          orderDate: new Date("2021-01-11T06:31:15Z"),
          state: "CA",
          price: 12,
          quantity: 145,
          denseRankOrderDateForState: 3
        }
      ]);
    });

    it("Dense Rank Duplicate Values", () => {
      const result = aggregate(
        [
          { name: "John", age: 13 },
          { name: "Peter", age: 21 },
          { name: "Marta", age: 12 },
          { name: "Sam", age: 12 },
          { name: "Raul", age: 13 },
          { name: "Penny", age: 12 },
          { name: "Penny", age: 12 }
        ],
        [
          {
            $setWindowFields: {
              partitionBy: "$age",
              sortBy: { name: 1 },
              output: {
                rank: {
                  $denseRank: {}
                }
              }
            }
          }
        ],
        options
      );

      expect(result).toStrictEqual([
        { name: "John", age: 13, rank: 1 },
        { name: "Raul", age: 13, rank: 2 },
        { name: "Marta", age: 12, rank: 1 },
        { name: "Penny", age: 12, rank: 2 },
        { name: "Penny", age: 12, rank: 2 },
        { name: "Sam", age: 12, rank: 3 },
        { name: "Peter", age: 21, rank: 1 }
      ]);
    });
  });
});
