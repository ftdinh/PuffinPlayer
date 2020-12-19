import { Provider } from 'next-auth/client';
import { ThemeProvider } from '@material-ui/core/styles';
import '../styles/globals.css'
import "fontsource-roboto/300-normal.css";
import "fontsource-roboto/400-normal.css";
import "fontsource-roboto/500-normal.css";
import "fontsource-roboto/700-normal.css";
import theme from '../src/theme';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
