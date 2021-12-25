import { createTheme } from '@mui/material/styles';


const paletteTheme = createTheme({
  palette: {
    primary: {
      light: '#ffffff',
      main: '#ffffff',
      dark: '#cccccc',
      contrastText: '#000000',
    },
    secondary: {
      light: '#5387dc',
      main: '#005baa',
      dark: '#00337a',
      contrastText: '#ffffff',
    },
    error: {
      light: '#ff8077',
      main: '#eb4d4b',
      dark: '#b20b23',
      contrastText: '#ffffff',
    },
    text: {
      default: '#333333',
      error: '#eb4d4b',
    },
    textField: {
      placeholder: '#9F9F9F',
      borderDefault: '#9F9F9F',
      borderFocused: '#1E78C7',
      emptyBackground: '#F9F9F9',
    },
    action: {
      disabledBackground: '#f4f4f4',
    }
  },
});

 export default createTheme({
  components : {
    MuiTypography : {
      root : {
        color : paletteTheme.palette.text.default,
        fontStyle : "normal",
        fontWeight : "normal"
      },
      colorPrimary : {
        color : `${paletteTheme.palette.text.default} !important`,
      }
    },
    MuiOutlinedInput : {
      root : {
        width : "100%",
        color : paletteTheme.palette.text.default,
        fontSize: "14px",
        lineHeight: "150%",
        backgroundColor : paletteTheme.palette.primary.main,
        "&$disabled" :{
          backgroundColor : paletteTheme.palette.action.disabledBackground,
        },
        "& $notchedOutline": {
          borderColor: paletteTheme.palette.textField.borderDefault,
          borderWidth: "1px",
        },
        "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
          borderColor: paletteTheme.palette.textField.borderFocused,
          borderWidth: "1px",
        },
        "&$focused $notchedOutline": {
          borderColor: paletteTheme.palette.textField.borderFocused,
          borderWidth: "1px",
        },
        '&$error $notchedOutline': {
          borderColor: paletteTheme.palette.error.main,
          borderWidth: "1px",
        },
        "&$input": {
          paddingTop: "13px",
          paddingLeft: "12px",
          paddingBottom: "10px",
        },
        "&$multiline": {
          paddingTop: "13px",
          paddingLeft: "12px",
          paddingBottom: "10px",
        },
        "&$input::-webkit-input-placeholder": {
          color : paletteTheme.palette.textField.placeholder,
        },
        "&$input:-ms-input-placeholder": {
          color : paletteTheme.palette.textField.placeholder,
        },
        "&$input::moz-placeholder": {
          color : paletteTheme.palette.textField.placeholder,
        },
        "&$input:moz-placeholder": {
          color : paletteTheme.palette.textField.placeholder,
        },
        "&$input::placeholder": {
          color : paletteTheme.palette.textField.placeholder,
        },
      }
    },
  },
  palette: paletteTheme.palette,
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'VAG Rounded Std Light',
      'Arial',
      'Helvetica',
      'sans-serif' 
    ].join(','),
    h1: {
      fontFamily: [
        'VAG Rounded Std Bold',
        'Arial',
        'Helvetica',
        'sans-serif' 
      ].join(','),
      fontWeight: 700
    },
    h2: {
      fontFamily: [
        'VAG Rounded Std Bold',
        'Arial',
        'Helvetica',
        'sans-serif' 
      ].join(','),
      fontWeight: 700
    },
    h3: {
      fontFamily: [
        'VAG Rounded Std Bold',
        'Arial',
        'Helvetica',
        'sans-serif' 
      ].join(','),
      fontWeight: 700
    },
    h4: {
      fontFamily: [
        'VAG Rounded Std Bold',
        'Arial',
        'Helvetica',
        'sans-serif' 
      ].join(','),
      fontWeight: 700
    },
    h5: {
      fontFamily: [
        'VAG Rounded Std Bold',
        'Arial',
        'Helvetica',
        'sans-serif' 
      ].join(','),
      fontWeight: 700
    },
    h6: {
      fontFamily: [
        'VAG Rounded Std Bold',
        'Arial',
        'Helvetica',
        'sans-serif' 
      ].join(','),
      fontWeight: 700
    },
    button: {
      fontFamily: [
        'VAG Rounded Std Bold',
        'Arial',
        'Helvetica',
        'sans-serif' 
      ].join(','),
      fontWeight: 700
    }
  },
});