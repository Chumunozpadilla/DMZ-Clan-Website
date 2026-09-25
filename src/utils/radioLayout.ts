export const radioLayoutEvent = 'dmz-radio-layout';

export type RadioLayoutRequest = {
  compact: boolean;
  align?: 'left' | 'right';
};

export const requestCompactRadio = (compact: boolean, align: RadioLayoutRequest['align'] = 'right') => {
  if (compact) {
    document.documentElement.dataset.dmzRadioCompact = align;
  } else {
    delete document.documentElement.dataset.dmzRadioCompact;
  }

  window.dispatchEvent(new CustomEvent<RadioLayoutRequest>(radioLayoutEvent, { detail: { compact, align } }));
};
