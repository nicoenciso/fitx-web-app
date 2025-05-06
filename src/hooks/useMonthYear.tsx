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
    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    const set = new Set(
      payments
        .map((p) => p.period)
        .filter((period): period is string => !!period)
    );

    const result = Array.from(set).sort((a, b) => {
      const [monthA, yearA] = a.split("-");
      const [monthB, yearB] = b.split("-");
      const dateA = new Date(parseInt(yearA), monthNames.indexOf(monthA));
      const dateB = new Date(parseInt(yearB), monthNames.indexOf(monthB));
      return dateA.getTime() - dateB.getTime();
    });

    return result;
  };

  const getLastSixMonths = (fromMonthYear: string): string[] => {
    const [monthName, year] = fromMonthYear.split("-");
    const monthIndex = monthNames.findIndex(
      (name) => name.toLowerCase() === monthName.toLowerCase()
    );

    if (monthIndex === -1) {
      throw new Error(`Mes inválido: ${monthName}`);
    }

    const start = dayjs(`${year}-${monthIndex + 1}-01`);

    return Array.from({ length: 6 }, (_, i) => {
      const date = start.subtract(5 - i, "month");
      const monthName = monthNames[date.month()];
      return `${monthName}-${date.year()}`;
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
