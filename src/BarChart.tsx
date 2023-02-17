import React from "react";
import { useMemo } from "react";
import { Chart, UserSerie } from "react-charts";

interface DataPoint {
  name: string;
  count: number;
}

export function BarChart({ data }: { data: UserSerie<DataPoint>[] }) {
  const primaryAxis = React.useMemo(
    () => ({
      getValue: (datum: DataPoint) => datum.name,
      showGrid: false,
      innerBandPadding: 0.3,
      innerSeriesBandPadding: 0.05,
    }),
    []
  );

  const secondaryAxes = useMemo(() => {
    return [
      {
        getValue: (d: DataPoint) => d.count,
        hardMin: 0,
        showGrid: false,
      },
    ];
  }, []);

  if (!data) {
    return null;
  }

  return (
    <div
      style={{
        aspectRatio: 1.56,
        display: "block",
        marginTop: "2rem",
        width: "100%",
      }}
    >
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes,
          interactionMode: "primary",
        }}
      />
    </div>
  );
}
