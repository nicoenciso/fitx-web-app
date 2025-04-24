import { Paper, Typography } from "@mui/material";
import theme from "../styles/theme";

interface DataBadgeProps {
  variant?: "normal" | "warning" | "special";
  icon?: React.ReactNode;
  children?: React.ReactNode;
  title?: string;
  large?: boolean;
}

/**
 * Data Badge component
 * @param {variant} - The variant of the badge. Can be "normal", "warning", or "special".
 * @param {icon} - The icon to be displayed in the badge.
 * @param {children} - The content to be displayed inside the badge.
 * @param {title} - The title to be displayed in the badge.
 * @param {large} - To apply the custom size.
 * @returns
 */
const DataBadge: React.FC<DataBadgeProps> = ({
  variant = "normal",
  icon,
  title,
  children,
  large = false,
}) => {
  const bg =
    variant === "special"
      ? `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main} 50%,${theme.palette.primary.main} 100%)`
      : `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.main} 50%,${theme.palette.primary.dark} 100%)`;
  const borderColor =
    variant === "special"
      ? `${theme.palette.secondary.contrastText}`
      : variant === "normal"
      ? `${theme.palette.primary.light}`
      : `${theme.palette.secondary.light}`;

  return (
    <Paper
      sx={{
        background: bg,
        width: { xs: 220, sm: large ? "100%" : 220 },
        height: { xs: "15rem", sm: large ? "27rem" : "15rem" },
        borderRadius: 2,
        borderBottom: `2px solid ${borderColor}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        gap: 1,
        px: { xs: 2, sm: large ? 10 : 2 },
        py: 2,
      }}
      elevation={0}
    >
      {icon && icon}
      {children}
      <Typography
        color="primary.contrastText"
        variant="h6"
        fontWeight="bold"
        align="center"
        sx={{ fontFamily: "Instrument Sans, sans-serif" }}
      >
        {title}
      </Typography>
    </Paper>
  );
};

export default DataBadge;
