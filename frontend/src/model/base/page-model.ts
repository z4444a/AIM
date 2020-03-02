export default interface PageModel<T> {
  content: T[];
  totalElements: number;
  page: number;
}
