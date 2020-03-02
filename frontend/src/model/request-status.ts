import { RequestStatus } from './get/request-status';

export function RequestStatuses(t: (s: string) => string) {
  return [
    {
      key: RequestStatus.NEW.toString(),
      value: t('requestPage.status.new'),
    },
    {
      key: RequestStatus.IN_PROGRESS.toString(),
      value: t('requestPage.status.inWork'),
    },
    {
      key: RequestStatus.PROCESSED.toString(),
      value: t('requestPage.status.executed'),
    },
    {
      key: RequestStatus.CANCELED.toString(),
      value: t('requestPage.status.canceled'),
    },
    {
      key: RequestStatus.PAUSED.toString(),
      value: t('requestPage.status.paused'),
    },
  ];
}
