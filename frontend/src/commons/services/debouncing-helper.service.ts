import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/internal/operators';

export class DebouncingHelperService {
  private debouncedSubject: Subject<object> | null = null;
  private debouncedSubjectSubs: Subscription | null = null;

  public initDebouncedValueHandler(dueTime = 500, callbackFn: Function) {
    this.destroy();
    this.debouncedSubject = new Subject();
    this.debouncedSubjectSubs = this.debouncedSubject
      .pipe(debounceTime(dueTime))
      .subscribe(value => callbackFn(value));
  }

  public nextValue(value: object) {
    if (!this.debouncedSubject) {
      return;
    }
    this.debouncedSubject.next(value);
  }

  public destroy() {
    if (this.debouncedSubjectSubs) {
      this.debouncedSubjectSubs.unsubscribe();
    }
  }
}
