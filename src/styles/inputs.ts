import { Components, Theme } from "@mui/material"

/**
 * MUI input props
 */
const textField: Components["MuiTextField"] = {
  styleOverrides: {
    root: {
      variants: [
        {
          props: { variant: "outlined" },
          style: ({ theme }: { theme: Theme }) => ({
            "& label": {
              color: theme.palette.primary.contrastText,
              "&.Mui-focused": {
                color: theme.palette.primary.contrastText
              },
              "&.Mui-disabled": {
                color: theme.palette.primary.dark
              }
            },
            "& .MuiOutlinedInput-root.Mui-disabled .MuiInputBase-input": {
              WebkitTextFillColor: theme.palette.primary.contrastText
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: theme.palette.primary.contrastText
            },
            "& .MuiOutlinedInput-root": {
              color: theme.palette.primary.contrastText,
              "& fieldset": {
                color: theme.palette.primary.contrastText,
                borderColor: theme.palette.primary.contrastText
              },
              "&:hover fieldset": {
                borderColor: theme.palette.primary.contrastText
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.primary.contrastText
              },
              "&.Mui-disabled fieldset": {
                borderColor: theme.palette.primary.contrastText
              }
            }
          })
        }
      ]
    }
  }
}

export { textField }