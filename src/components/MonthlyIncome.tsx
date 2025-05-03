import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts";
import DataBadge from "./DataBadge";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import MonthSelect from "./MonthSelect";
import { usePaymentsContext } from "../hooks/usePaymentsContext";
import { useUserContext } from "../hooks/useUserContext";
import useMonthYear from "../hooks/useMonthYear";
import { MenuItem } from "@mui/material";

/**
 * MonthlyIncome component
 * This component displays a badge for monthly income with a chart-line.
 * @returns {JSX.Element}
 */
const MonthlyIncome = () => {
  const { payments } = usePaymentsContext();
  const { gym } = useUserContext();
  const { getEarliestMonthYear, getUniqueMonths, getChartData } =
    useMonthYear();

  const filtered = payments.filter((p) => p.gymId === gym?.id);
  const [selectedMonth, setSelectedMonth] = useState<string>("");

  useEffect(() => {
    if (!selectedMonth) {
      const earliest = getEarliestMonthYear(filtered);
      if (earliest) setSelectedMonth(earliest);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered]);

  const months = getUniqueMonths(filtered);
  const chartData = selectedMonth ? getChartData(filtered, selectedMonth) : [];

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
        xAxis={[{ data: chartData.map((d) => d.month || "") }]}
        yAxis={[
          {
            min: 0,
            max: 1000000,
            tickLabelStyle: { fill: "#fff" },
            tickFontSize: 10,
          },
        ]}
        series={[
          { data: chartData.map((d) => d.total || 0) },
        ]}
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
