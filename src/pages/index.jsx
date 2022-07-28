import Head from "next/head";
import React, { useState } from "react";

const DayCell = ({ children, rowPos, colPos }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      gridArea: `${rowPos} / ${colPos}`,
      border: "1px dashed blue",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {children}
  </div>
);

const Home = () => {
  const [numberOfRows, setNumberOfRows] = useState(12);
  const [numberOfColumns, setNumberOfColumns] = useState(31);
  const [rowPos, setRowPos] = useState(1);
  const [colPos, setColPos] = useState(1);

  let cellArray = [];
  for (let row = 1; row <= numberOfRows; row++) {
    for (let col = 1; col <= numberOfColumns; col++) {
      cellArray.push(
        <DayCell key={row + "-" + col} rowPos={row} colPos={col}></DayCell>
      );
    }
  }

  return (
    <>
      <Head>
        <title>Linyear</title>
        <meta name="description" content="Linear Calendar Generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form>
        <fieldset>
          <label for="number-of-rows">
            Number of Rows:{" "}
            <input
              name="number-of-rows"
              type="number"
              min="1"
              placeholder={numberOfRows}
              onChange={(e) => setNumberOfRows(e.target.value)}
            />
          </label>
          <label for="number-of-columns">
            Number of Columns:{" "}
            <input
              name="number-of-columns"
              type="number"
              min="1"
              placeholder={numberOfColumns}
              onChange={(e) => setNumberOfColumns(e.target.value)}
            />
          </label>
        </fieldset>
        <fieldset>
          <label for="row-position">
            Row Position:{" "}
            <input
              name="row-position"
              type="number"
              min="1"
              max={numberOfRows}
              placeholder={rowPos}
              onChange={(e) => setRowPos(e.target.value)}
            />
          </label>
          <label for="column-position">
            Column Position:{" "}
            <input
              name="olumn-position"
              type="number"
              min="1"
              max={numberOfColumns}
              placeholder={colPos}
              onChange={(e) => setColPos(e.target.value)}
            />
          </label>
        </fieldset>
      </form>

      <div
        style={{
          height: "500px",
          border: "3px solid black",
          padding: "2px",
          display: "grid",
          gridTemplate: `repeat(${numberOfRows}, 1fr) / repeat(${numberOfColumns}, 1fr)`,
        }}
      >
        {cellArray}
        <DayCell rowPos={rowPos} colPos={colPos}>
          X
        </DayCell>
      </div>
    </>
  );
};

export default Home;
