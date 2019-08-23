import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Container from './components/App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme'


const App = () => (
    <React.Fragment>
        <ThemeProvider theme={theme}>
            <Container/>
        </ThemeProvider>
    </React.Fragment>
)



ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();