import DataBadge from "./DataBadge";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import { Gauge, gaugeClasses } from "@mui/x-charts";
import { useCustomerContext } from "../hooks/useCustomerContext";

/**
 * ActiveCustomersBadge component
 * This component displays the active customers in a badge format.
 * @returns {JSX.Element}
 */
const ActiveCustomersBadge = () => {
  const { activeCustomers } = useCustomerContext();

  return (
    <DataBadge
      variant="normal"
      icon={
        <HowToRegOutlinedIcon
          sx={{ color: "primary.contrastText", fontSize: 30 }}
        />
      }
      title="CLIENTES ACTIVOS"
    >
      <Gauge
        width={150}
        height={100}
        value={activeCustomers}
        valueMax={160}
        startAngle={-90}
        endAngle={90}
        sx={(theme) => ({
          "& svg text": {
            fill: `${theme.palette.primary.contrastText}`,
            fontSize: "2rem",
            fontWeight: "bold",
            fontFamily: "Instrument Sans, sans-serif",
          },
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 80,
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: `${theme.palette.primary.light}`,
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: theme.palette.primary.dark,
          },
        })}
      />
    </DataBadge>
  );
};

export default ActiveCustomersBadge;
