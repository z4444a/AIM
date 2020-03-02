import { WithTranslation } from 'react-i18next';

export function getMockWithTranslationProps(): WithTranslation {
  // eslint-disable-next-line
  const t = ((key: string) => `${key}_i18n`) as any;
  // eslint-disable-next-line
  const i18n = {} as any;
  const props: WithTranslation = {
    tReady: true,
    t,
    i18n,
  };

  return props;
}
