import i18n from 'i18next';
import ru from './translations/ru.json';

i18n.init({
  lng: 'ru',
  resources: {
    ru: {
      common: ru,
    },
  },

  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },

  react: {
    wait: true,
  },
});

export default i18n;
