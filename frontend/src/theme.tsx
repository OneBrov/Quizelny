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
      main: '#fffffe',
    },
    secondary: {
      main: '#ff8906',
    },
    success: {
      main: '#81c784',
    },

    error: {
      main: "#f44336",
    },
    background: {
      default: '',
    },
    
  },
  
});

export default theme;
