import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'macro-css';

import theme from '../src/theme';
import '../src/styles/global.scss'
import User from '../src/store/User';
import { AppProps } from 'next/dist/shared/lib/router/router';
import { useRouter } from 'next/dist/client/router';
import { observer } from 'mobx-react-lite';
import { LoadingLayout } from '../components/layouts/LoadingLayout/indext';

export default observer(function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter()
  React.useEffect(()=>{
    async function checkAuth() {
      try {
        if(localStorage.getItem('token')){
          await User.checkAuth()
          if (!User.user.isActivated) {
            router.replace('/auth')
          }
        } else {
          router.replace('/auth')
        }
      } catch (e) {
        console.error(e)
      }
    }
    checkAuth()
  },[])

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }

  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Загрузка...</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        { (User.user.isActivated || router.pathname === "/auth" ) ?
            <Component {...pageProps} /> :
            <LoadingLayout />
        }
      </ThemeProvider>
    </React.Fragment>
  );
})
