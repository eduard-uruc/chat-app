import LightModeIcon from "@mui/icons-material/LightMode"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LogoutIcon from "@mui/icons-material/Logout"
import Person3Icon from "@mui/icons-material/Person3"
import { PROFILE, THEME, LOGOUT } from "../constants/settings"
import { LIGHT_THEME } from "../constants/theme"

const getSettings = (theme, toggleTheme, logout) => [
  {
    name: THEME,
    action: toggleTheme,
    icon: theme === LIGHT_THEME ? LightModeIcon : DarkModeIcon,
  },
  { name: PROFILE, action: null, icon: Person3Icon },

  { name: LOGOUT, action: logout, icon: LogoutIcon },
]

export default getSettings
