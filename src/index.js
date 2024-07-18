import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import RtlLayout from 'layouts/rtl';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';

// Importing components
import Contact from 'components/footer/comp/Contact';
import License from 'components/footer/comp/License';
import TermsOfUse from 'components/footer/comp/TermsOfUse';
import PrivacyPolicy from 'components/footer/comp/PrivacyPolicy';

// Importing styles
import 'assets/css/App.css';

ReactDOM.render(
	<ChakraProvider theme={theme}>
		<React.StrictMode>
			<ThemeEditorProvider>
				<BrowserRouter>
					<Switch>
						<Route path={`/auth`} component={AuthLayout} />
						<Route path={`/admin`} component={AdminLayout} />
						<Route path={`/rtl`} component={RtlLayout} />
						<Route path={`/contact`} component={Contact} />
						<Route path={`/license`} component={License} />
						<Route path={`/terms-of-use`} component={TermsOfUse} />
						<Route path={`/privacy-policy`} component={PrivacyPolicy} />
						<Redirect from='/' to='/admin' />
					</Switch>
				</BrowserRouter>
			</ThemeEditorProvider>
		</React.StrictMode>
	</ChakraProvider>,
	document.getElementById('root')
);
