import React, { useState } from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import RtlLayout from 'layouts/rtl';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';

// Importing Context
import { GameListProvider } from 'contexts/GameListContext';

// Importing components
import Contact from 'components/footer/comp/Contact';
import License from 'components/footer/comp/License';
import TermsOfUse from 'components/footer/comp/TermsOfUse';
import PrivacyPolicy from 'components/footer/comp/PrivacyPolicy';

// Importing styles
import 'assets/css/App.css';

export default function App() {
  const [account, setAccount] = useState(localStorage.getItem('account') || '0x0');

  return (
    <ChakraProvider theme={theme}>
      <React.StrictMode>
        <ThemeEditorProvider>
          <GameListProvider>
            <BrowserRouter>
              <Switch>
                <Route path={`/auth`} component={AuthLayout} />
                <Route
                  path={`/admin`}
                  render={(props) => <AdminLayout {...props} account={account} setAccount={setAccount} />}
                />
                <Route
                  path={`/rtl`}
                  render={(props) => <RtlLayout {...props} account={account} setAccount={setAccount} />}
                />
                <Route path={`/contact`} component={Contact} />
                <Route path={`/license`} component={License} />
                <Route path={`/terms-of-use`} component={TermsOfUse} />
                <Route path={`/privacy-policy`} component={PrivacyPolicy} />
                <Redirect from='/' to='/admin' />
              </Switch>
            </BrowserRouter>
          </GameListProvider>
        </ThemeEditorProvider>
      </React.StrictMode>
    </ChakraProvider>
  );
};