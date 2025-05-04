import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts";
import DataBadge from "./DataBadge";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import MonthSelect from "./MonthSelect";
import { usePaymentsContext } from "../hooks/usePaymentsContext";
import useMonthYear from "../hooks/useMonthYear";
import { MenuItem } from "@mui/material";

/**
 * MonthlyIncome component
 * This component displays a badge for monthly income with a chart-line.
 * @returns {JSX.Element}
 */
const MonthlyIncome = () => {
  const { payments } = usePaymentsContext();
  const { getUniqueMonths, getChartData } =
    useMonthYear();

  const [selectedMonth, setSelectedMonth] = useState<string>("");

  useEffect(() => {
    if (!selectedMonth) {
      const months = getUniqueMonths(payments);
      if (months.length > 0) {
        setSelectedMonth(months[months.length - 1]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payments]);

  const months = getUniqueMonths(payments);
  const chartData = selectedMonth ? getChartData(payments, selectedMonth) : [];

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
      <MonthSelect
        value={selectedMonth}
        handleChange={(e) => setSelectedMonth(e.target.value)}
      >
        {months.map((m) => (
          <MenuItem key={m} value={m}>
            {m}
          </MenuItem>
        ))}
      </MonthSelect>
      <LineChart
        xAxis={[
          {
            scaleType: "point",
            data: chartData.map((d) => d.month || ""),
            tickLabelStyle: { fill: "#fff" },
            tickFontSize: 10,
          },
        ]}
        yAxis={[
          {
            tickLabelStyle: { fill: "#fff" },
            tickFontSize: 10,
          },
        ]}
        series={[{ data: chartData.map((d) => d.total || 0) }]}
        sx={{
          "& .MuiChartsAxis-line": {
            stroke: "#fff",
          },
          "& text": {
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
