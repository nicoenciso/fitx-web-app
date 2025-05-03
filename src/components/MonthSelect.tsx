import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

interface MonthSelectProps {
  value: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange: (e: any) => void;
  children: React.ReactNode;
}

const MonthSelect: React.FC<MonthSelectProps> = ({
  value,
  handleChange,
  children,
}) => {
  return (
    <Box
      sx={{
        minWidth: 120,
        position: "absolute",
        right: -30,
        top: 8,
      }}
    >
      <FormControl size="small" sx={{ width: 80 }}>
        <InputLabel
          id="select-small-label"
          sx={{
            color: "primary.contrastText", // Color del label en estado normal
            "&.Mui-focused": {
              color: "primary.contrastText", // Color del label cuando el Select está enfocado
            },
            "& .MuiInputLabel-shrink": {
              color: "primary.contrastText", // Color del label al colocarse arriba
            },
          }}
        >
          Meses
        </InputLabel>
        <Select
          labelId="select-small-label"
          label="Months"
          size="small"
          onChange={handleChange}
          value={value}
          MenuProps={{
            disableScrollLock: true,
          }}
          sx={{
            color: "primary.contrastText",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.contrastText", // Cambia el color de las líneas del borde
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.contrastText", // Cambia el color al pasar el mouse
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.contrastText", // Cambia el color al estar enfocado
            },
            "& .MuiSvgIcon-root": {
              color: "primary.contrastText", // Cambia el color del ícono de flecha
            },
          }}
        >
          {children}
        </Select>
      </FormControl>
    </Box>
  );
};

export default MonthSelect;
