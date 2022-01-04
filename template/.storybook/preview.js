
import { muiTheme } from 'storybook-addon-material-ui'
import DefaultTheme from '../src/assets/styles/theme/Default.Theme'

export const decorators = [
	muiTheme([DefaultTheme])
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}