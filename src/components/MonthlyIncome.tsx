import { LineChart } from "@mui/x-charts";
import DataBadge from "./DataBadge";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";

/**
 * MonthlyIncome component
 * This component displays a badge for monthly income with a chart-line.
 * @returns {JSX.Element}
 */
const MonthlyIncome = () => {
  const data = [
    { month: "DIC", value: 150000 },
    { month: "ENE", value: 200000 },
    { month: "FEB", value: 400000 },
    { month: "MAR", value: 600000 },
    { month: "ABR", value: 750000 },
    { month: "MAY", value: 950000 },
    { month: "JUN", value: 1000000 },
  ];

  const months = data.map((d) => d.month);
  const values = data.map((d) => d.value);

  return (
    <DataBadge
      variant="normal"
      icon={
        <AssessmentOutlinedIcon
          sx={{ color: "primary.contrastText", fontSize: 30 }}
        />
      }
      title="GANANCIAS MENSUALES"
      large
    >
      <LineChart
        xAxis={[
          {
            scaleType: "point",
            data: months,
            tickLabelStyle: { fill: "#fff" },
            tickFontSize: 16,
          },
        ]}
        yAxis={[
          {
            min: 0,
            max: 1000000,
            tickLabelStyle: { fill: "#fff" },
            tickFontSize: 10,
          },
        ]}
        series={[
          {
            data: values,
          },
        ]}
        sx={{
          "& .MuiChartsAxis-line": {
            stroke: "#fff",
          },
          "& .MuiChartsAxis-tickLabel": {
            fill: "#fff",
          },
        }}
        width={500}
        height={300}
      />
    </DataBadge>
  );
};

export default MonthlyIncome;
