export const radioLayoutEvent = 'dmz-radio-layout';

export type RadioLayoutRequest = {
  compact: boolean;
  align?: 'left' | 'right';
};

const compactRequests = new Map<string, NonNullable<RadioLayoutRequest['align']>>();

export const getCurrentRadioLayoutRequest = (): RadioLayoutRequest => {
  const activeRequests = Array.from(compactRequests.values());
  const activeAlign = activeRequests[activeRequests.length - 1];

  return { compact: Boolean(activeAlign), align: activeAlign ?? 'right' };
};

export const requestCompactRadio = (
  compact: boolean,
  align: RadioLayoutRequest['align'] = 'right',
  requester = 'default',
) => {
  if (compact) {
    compactRequests.delete(requester);
    compactRequests.set(requester, align);
  } else {
    compactRequests.delete(requester);
  }

  const currentRequest = getCurrentRadioLayoutRequest();

  if (currentRequest.compact) {
    document.documentElement.dataset.dmzRadioCompact = currentRequest.align;
  } else {
    delete document.documentElement.dataset.dmzRadioCompact;
  }

  window.dispatchEvent(
    new CustomEvent<RadioLayoutRequest>(radioLayoutEvent, {
      detail: currentRequest,
    }),
  );
};
