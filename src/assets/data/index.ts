/* These lines of code are importing and exporting various modules in a TypeScript file. Here's a
breakdown of what each line is doing: */
import { pathToTitle } from "./routes/pathToTitle";
import { pagesMap } from "./routes/pagesMap";
import { textLogin } from "./pages/Login";
import { textCurrencies } from "./pages/Dashboard/CryptoCurrencies";
import { textUsers } from "./pages/Dashboard/Users";
import { icons } from "./components/Dashboard/Sidebar/icons";
import { itemsPerPageOptions } from "./pages/Dashboard/shared/ItemsPerPageOptions";
import { countryCodes } from "./pages/Dashboard/Users/UserDetails";
import { INTERVALS } from "./pages/Dashboard/CryptoCurrencies/CryptoCharts";
export { pathToTitle, pagesMap, textLogin, icons, textCurrencies, textUsers, itemsPerPageOptions, countryCodes, INTERVALS }