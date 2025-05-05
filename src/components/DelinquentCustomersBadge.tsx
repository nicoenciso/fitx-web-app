import { Gauge, gaugeClasses } from "@mui/x-charts";
import DataBadge from "./DataBadge";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { useCustomerContext } from "../hooks/useCustomerContext";

/**
 * DelinquentCustomersBadge component
 * This component displays a badge for delinquent customers with a gauge.
 * @returns {JSX.Element}
 */
const DelinquentCustomersBadge = () => {
  const { delinquentCustomers, registeredCustomers } = useCustomerContext();

  return (
    <DataBadge
      variant="warning"
      icon={
        <WarningAmberOutlinedIcon
          sx={{ color: "primary.contrastText", fontSize: 30 }}
        />
      }
      title="CLIENTES MOROSOS"
    >
      <Gauge
        width={150}
        height={100}
        value={delinquentCustomers}
        valueMax={registeredCustomers}
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
            fill: `${theme.palette.secondary.light}`,
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: theme.palette.primary.dark,
          },
        })}
      />
    </DataBadge>
  );
};

export default DelinquentCustomersBadge;
