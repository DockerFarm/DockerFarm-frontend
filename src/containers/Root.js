import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl-redux';
import { addLocaleData } from 'react-intl';
import { BrowserRouter as Router } from 'react-router-dom';
import App from 'containers/App';
import store from 'store';
import en from 'react-intl/locale-data/en'
import ko from 'react-intl/locale-data/ko'
import ja from 'react-intl/locale-data/ja'


addLocaleData([...en, ...ko, ...ja]);

const Root = () => (
    <Provider store={store}>
        <IntlProvider>
            <Router>
                <App/>
            </Router> 
        </IntlProvider>
    </Provider>
)


export default Root;