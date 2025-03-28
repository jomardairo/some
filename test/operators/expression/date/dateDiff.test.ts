import { flatten } from "../../../../src/util";
import { runTest, testPath } from "../../../support";

const unitLarge = ["day", "week", "month", "quarter", "year"];
const unitSmall = ["millisecond", "second", "minute", "hour"];

type Fixture = [number[], string[], string, string, string?, string?];
const fixtures: [number[], string[], string, string, string?, string?][] = [
  // [<Results>, <Args>,...]
  // [[day,week,month,quarter,year], []units, startDate, endDate, ?timezone, ?startOfWeek]
  [[365, 52, 12, 4, 1], "2010-01-01", "2011-01-01"],
  [[545, 78, 17, 5, 1], "2010-01-01", "2011-06-30"],
  [[60, 8, 1, 1, 0], "2010-03-01", "2010-04-30"],
  [[30, 5, 0], "2021-01-01", "2021-01-31", "+00", "sun"],
  [[30, 4, 0], "2021-01-01", "2021-01-31", "+00", "mon"],
  [[30, 4, 0], "2021-01-01", "2021-01-31", "+00", "wed"],
  [[30, 4, 0], "2021-01-01", "2021-01-31", "+00", "fri"],
  [[27, 4, 0], "2021-02-01", "2021-02-28", "+00", "sun"],
  [[27, 3, 0], "2021-02-01", "2021-02-28", "+00", "mon"],
  [[27, 4, 0], "2021-02-01", "2021-02-28", "+00", "wed"],
  [[27, 4, 0], "2021-02-01", "2021-02-28", "+00", "fri"],
  [[27, 3, 1], "2021-02-01", "2021-02-28", "-0730", "sun"],
  [[27, 4, 1], "2021-02-01", "2021-02-28", "-0730", "mon"],
  [[27, 4, 1], "2021-02-01", "2021-02-28", "-0730", "wed"],
  [[27, 4, 1], "2021-02-01", "2021-02-28", "-0730", "fri"],
  [[30, 4, 0], "2021-03-01", "2021-03-31", "+00", "sun"],
  [[30, 4, 0], "2021-03-01", "2021-03-31", "+00", "mon"],
  [[30, 5, 0], "2021-03-01", "2021-03-31", "+00", "wed"],
  [[30, 4, 0], "2021-03-01", "2021-03-31", "+00", "fri"],
  [[30, 4, 1], "2021-03-01", "2021-03-31", "-0730", "sun"],
  [[30, 5, 1], "2021-03-01", "2021-03-31", "-0730", "mon"],
  [[30, 4, 1], "2021-03-01", "2021-03-31", "-0730", "wed"],
  [[30, 4, 1], "2021-03-01", "2021-03-31", "-0730", "fri"],
  [[7092, 1013, 232, 78, 19], "2005-03-01", "2024-07-31"]
]
  .map(arr => [arr[0], unitLarge, ...arr.slice(1)] as Fixture)
  .concat([
    [
      [31536000000, 31536000, 525600, 8760],
      unitSmall,
      "2010-01-01",
      "2011-01-01"
    ],
    [
      [6330150, 6330, 105, 2],
      unitSmall,
      "2010-01-01T10:45:20.450Z",
      "2010-01-01T12:30:50.600Z"
    ]
  ]);

runTest(testPath(__filename), {
  $dateDiff: flatten(
    fixtures.map(([res, units, start, end, timezone, startOfWeek]) =>
      res.map((diff, i) => [
        {
          startDate: new Date(start),
          endDate: new Date(end),
          unit: units[i],
          timezone,
          startOfWeek
        },
        diff
      ])
    )
  )
});
