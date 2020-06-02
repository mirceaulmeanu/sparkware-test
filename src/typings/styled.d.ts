// import original module declarations
import 'styled-components'
import { ITheme } from "../theme/theme";

// and extend them!
declare module 'styled-components' {
    export interface DefaultTheme extends ITheme  {
    }
}
