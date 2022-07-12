// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    sectionColors: {
      [key: string]: { [key: string]: string };
    };
    toggleColors: {
      [key: string]: string;
    };
    textColor: {
      [key: string]: string;
    }
    symbolColor: {
      [key: string]: string;
    }
  }
} 