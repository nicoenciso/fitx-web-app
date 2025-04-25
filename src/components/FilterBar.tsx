import { Button, Stack } from "@mui/material";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import FilterListOffOutlinedIcon from "@mui/icons-material/FilterListOffOutlined";
import theme from "../styles/theme";

type Filter = "all" | "active" | "inactive";

interface FilterBarProps {
  actualFilter: Filter;
  setFilter: (filter: Filter) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ actualFilter, setFilter }) => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="end"
      spacing={1}
      sx={{
        "& .MuiButton-root": {
          color: theme.palette.primary.contrastText,
          textTransform: "capitalize",
          width: 100,
          height: 22,
          border: `1px solid ${theme.palette.primary.dark}`,
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
            border: `1px solid ${theme.palette.primary.dark}`,
          },
        },
      }}
    >
      <Button
        onClick={() => setFilter("active")}
        variant="outlined"
        size="small"
        startIcon={<HowToRegOutlinedIcon />}
        sx={{
          backgroundColor:
            actualFilter === "active"
              ? theme.palette.primary.dark
              : theme.palette.primary.main,
        }}
      >
        Activos
      </Button>
      <Button
        onClick={() => setFilter("inactive")}
        variant="outlined"
        size="small"
        startIcon={<WarningAmberOutlinedIcon />}
        sx={{
          backgroundColor:
            actualFilter === "inactive"
              ? theme.palette.primary.dark
              : theme.palette.primary.main,
        }}
      >
        Deudores
      </Button>
      <Button
        onClick={() => setFilter("all")}
        variant="outlined"
        size="small"
        startIcon={<FilterListOffOutlinedIcon />}
        sx={{
          backgroundColor:
            actualFilter === "all"
              ? theme.palette.primary.dark
              : theme.palette.primary.main,
        }}
      >
        Todos
      </Button>
    </Stack>
  );
};

export default FilterBar;
