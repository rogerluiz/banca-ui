type Status = 'loaded' | 'error';

const originalImage = window.Image;

export function mockImage() {
  let status: Status;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  window.Image = class Image {
    // eslint-disable-next-line class-methods-use-this
    onload = () => {
      // eslint-disable-next-line no-console
      console.log('called');
    };

    // eslint-disable-next-line class-methods-use-this
    onerror = () => {
      // eslint-disable-next-line no-console
      console.log('error');
    };

    src = '';

    alt = '';

    hasAttribute(name: string) {
      return name in this;
    }

    getAttribute(name: string) {
      return name in this ? (this as any)[name] : null;
    }

    constructor() {
      setTimeout(() => {
        if (status === 'error') {
          this.onerror();
        } else {
          this.onload();
        }
      }, mockImage.DELAY);

      // eslint-disable-next-line no-constructor-return
      return this;
    }
  };

  return {
    simulate(value: Status) {
      status = value;
    },
    restore() {
      window.Image = originalImage;
    },
  };
}

mockImage.restore = () => {
  window.Image = originalImage;
};

mockImage.DELAY = 100;
