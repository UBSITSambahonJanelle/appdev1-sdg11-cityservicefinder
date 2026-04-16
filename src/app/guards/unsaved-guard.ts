import { CanDeactivateFn } from '@angular/router';

export interface HasUnsavedChanges {
  hasUnsavedChanges(): boolean;
}
export const unsavedGuard: CanDeactivateFn<HasUnsavedChanges> = (component) => {
  if (component.hasUnsavedChanges()) {
    return window.confirm(
      'You have an unsubmitted report. Leave this page? Your progress will be lost.'
    );
  }
  return true;
};