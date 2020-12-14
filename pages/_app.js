import { ThemeProvider } from '@material-ui/core/styles';
import '../styles/globals.css'
import "fontsource-roboto/300-normal.css";
import "fontsource-roboto/400-normal.css";
import "fontsource-roboto/500-normal.css";
import "fontsource-roboto/700-normal.css";
import theme from '../src/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
