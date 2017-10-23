import defaultConfiguration from '../../data/configuration'

// window.OAX = window.OAX || {}

// export const configuration = window.OAX.cfg = {
export const configuration = {
  ...defaultConfiguration,
  // ...(window.OAX.cfg || {}),
  ...{
    components: {
      dialogHeaders: process.FEATURE_DIALOG_HEADERS,
      dialogMethods: process.OAX_FEATURE_DIALOG_METHODS,
      dialogStatuses: process.OAX_FEATURE_DIALOG_STATUSES,
      pageHeaders: process.OAX_FEATURE_PAGE_HEADERS,
      pageMethods: process.OAX_FEATURE_PAGE_METHODS,
      pageStatuses: process.OAX_FEATURE_PAGE_STATUSES,
      pageStats: process.OAX_FEATURE_PAGE_STATS,
      pageAbout: process.OAX_FEATURE_PAGE_ABOUT,
      pageAboutKeyboard: process.OAX_FEATURE_PAGE_ABOUT_KEYBOARD,
      github: process.OAX_FEATURE_GITHUB,
      edit: process.OAX_FEATURE_EDIT,
      directory: process.OAX_FEATURE_DIRECTORY,
      editor: process.OAX_FEATURE_EDITOR,
      markdown: process.OAX_FEATURE_MARKDOWN,
      highlight: process.OAX_FEATURE_HIGHLIGHT
    }
  }
}
