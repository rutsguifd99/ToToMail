import { createTheme, ThemeProvider } from "@mui/material";
import { createContext, FC, useContext, useMemo, useState } from "react";

interface MyPaletteOptions {
  additional: {
    borderColor: string;
    shadowColor: string;
  };
}

declare module "@mui/material/styles/createPalette" {
  interface Palette extends MyPaletteOptions {}
  interface PaletteOptions extends MyPaletteOptions {}
}

interface IColorModeContext {
  toggleColorMode: () => void;
  mode: "dark" | "light";
}

const ColorModeContext = createContext<IColorModeContext>({
  toggleColorMode: () => {},
  mode: "light",
});

interface ColorModeContextProviderProps {
  children: React.ReactNode;
}

export const ColorModeContextProvider: FC<ColorModeContextProviderProps> = ({
  children,
}) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode,
    }),
    [mode]
  );

  const Theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: "Noto Sans,sans-serif",
          fontSize: 16,
        },
        palette: {
          mode,
          primary: {
            light: "#D7DEFF",
            main: "#f7f8ff",
            //dark: "#002884",
            contrastText: "#000",
          },
          secondary: {
            //light: "#ff7961",
            main: "#3459E5",
            //dark: "#ba000d",
            contrastText: "#fff",
          },
          additional: {
            borderColor: "#EFEFEF",
            shadowColor: "#EFEFEF",
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={Theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => useContext(ColorModeContext);
