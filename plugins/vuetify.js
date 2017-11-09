import Vue from 'vue'
import { default as Ripple } from 'vuetify/es5/directives/ripple'
import {
  Vuetify,
  VApp,
  VAlert,
  VAvatar,
  VBtn,
  VBtnToggle,
  VCard,
  VCheckbox,
  VDataTable,
  // VDatePicker,
  VDialog,
  VDivider,
  VExpansionPanel,
  VGrid,
  VIcon,
  VList,
  VMenu,
  VNavigationDrawer,
  VProgressCircular,
  VProgressLinear,
  VRadioGroup,
  VSelect,
  VStepper,
  VSubheader,
  VSwitch,
  VTabs,
  VTextField,
  VSnackbar,
  VToolbar,
  VTooltip
} from 'vuetify'

// Vue.directive('ripple', Ripple)

Vue.use(Vuetify, {
  theme: {
    primary: '#2196F3',
    accent: '#42A5F5',
    secondary: '#757575',

    info: '#1976D2',
    warning: '#ffab00',
    error: '#D50000',
    success: '#00C853'
  },
  directives: { Ripple },
  components: {
    VAlert,
    VApp,
    VAvatar,
    VBtn,
    VBtnToggle,
    VCard,
    VCheckbox,
    VDataTable,
    // VDatePicker,
    VDialog,
    VDivider,
    VExpansionPanel,
    VGrid,
    VIcon,
    VList,
    VMenu,
    VNavigationDrawer,
    VProgressCircular,
    VProgressLinear,
    VRadioGroup,
    VSelect,
    VStepper,
    VSubheader,
    VSwitch,
    VTabs,
    VTextField,
    VSnackbar,
    VToolbar,
    VTooltip
  }
})
