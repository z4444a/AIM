export enum DateFormat {
  ISO_DATE_TIME = 'YYYY-MM-DD HH:mm:ss',
  ISO_DATE = 'DD.MM.YYYY',
}

export const DATE_PLACEHOLDER = 'ДД.ММ.ГГГГ';

export const DATE_MASK = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];
