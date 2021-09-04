import { createTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

// Create a theme instance.
const theme = createTheme({
    overrides: {
      MuiStepIcon: {
        root: {
          '&$completed': {
            color: 'pink',
          },
          '&$active': {
            color: 'white',
          },
          
            color: '#AEAEAE',
        
        
        },
        active: {},
        completed: {},
   }
  },
  palette: {
    type: "dark",
    
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '',
    },
    
  },
  
});

export default theme;
