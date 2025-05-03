import dayjs from "dayjs";
import { Payment } from "../interfaces/Payment";

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
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  };

  const getLastSixMonths = (fromMonthYear: string): string[] => {
    const [month, year] = fromMonthYear.split("-").map(Number);
    const start = dayjs(`${year}-${month}-01`);
    return Array.from({ length: 6 }, (_, i) =>
      start.subtract(5 - i, "month").format("MM-YYYY")
    );
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
