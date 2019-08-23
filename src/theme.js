
import { createMuiTheme } from '@material-ui/core/styles';

const palette = { 
    type: 'dark',
    background: {
        default: '#0f171e'
    },
    text: {
        primary: '#fff',
        secondary: '#CCCCCC',
        selected: '#fff'
    },
    primary: { 
        main: '#49BA8E',  
    },
    secondary: {
        main: '#333333'
    }
}

const themeName = 'Lima Razzmatazz Pronghorn';

export default createMuiTheme({ palette, themeName });