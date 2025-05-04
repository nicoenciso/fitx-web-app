import dayjs from "dayjs";
import { Payment } from "../interfaces/Payment";
import { monthNames } from "../utils/MonthNames";

const useMonthYear = () => {
  const getEarliestMonthYear = (payments: Payment[]): string | null => {
    if (!payments.length) return null;
    const sorted = [...payments].sort((a, b) =>
      (a.period || "").localeCompare(b.period || "")
    );
    return sorted[0]?.period || null;
  };

  const getUniqueMonths = (payments: Payment[]): string[] => {
    const set = new Set(
      payments
        .map((p) => p.period)
        .filter((period): period is string => !!period)
    );
    const result = Array.from(set).sort((a, b) => a.localeCompare(b));
    return result
  };

  const getLastSixMonths = (fromMonthYear: string): string[] => {
    // Dividir el formato "Mayo-2025" en mes y año
    const [monthName, year] = fromMonthYear.split("-");
    const monthIndex = monthNames.findIndex((name) => name.toLowerCase() === monthName.toLowerCase());

    if (monthIndex === -1) {
      throw new Error(`Mes inválido: ${monthName}`);
    }

    // Crear la fecha inicial en formato "YYYY-MM-DD"
    const start = dayjs(`${year}-${monthIndex + 1}-01`); // monthIndex + 1 porque los meses en dayjs son 1-based

    return Array.from({ length: 6 }, (_, i) => {
      const date = start.subtract(5 - i, "month");
      const monthName = monthNames[date.month()]; // Obtener el nombre del mes
      return `${monthName}-${date.year()}`; // Formatear como Mes-Año
    });
  };

  const getChartData = (payments: Payment[], selectedMonth: string) => {
    const months = getLastSixMonths(selectedMonth);
    return months.map((month) => {
      const total = payments
        .filter((p) => p.period === month)
        .reduce((sum, p) => sum + (p.amount || 0), 0);
      return { month, total };
    });
  };

  return { getEarliestMonthYear, getUniqueMonths, getChartData };
};

export default useMonthYear;
