export default function ({ app }) {
  // onBeforeLanguageSwitch called right before setting a new locale
  app.i18n.onBeforeLanguageSwitch = (
    oldLocale,
    newLocale,
    isInitialSetup,
    context
  ) => {};
  // onLanguageSwitched called right after a new locale has been set
  // When language is switched, recollect all the meta data for the correct locale
  app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
    app.store.dispatch('getMetaData');
    app.store.dispatch('getNavigation');
  };
}
