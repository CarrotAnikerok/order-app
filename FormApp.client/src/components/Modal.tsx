import { useEffect, type ReactNode } from 'react';

type ModalProps = {
  children?: ReactNode;
  isOpen: boolean;
  close: () => void;
};

function HandleKey(event: KeyboardEvent, close: () => void) {
  if (event.key === 'Escape') {
    close();
  }

  if (event.key !== 'Tab') {
    return;
  }

  const modal = document.querySelector('.modal-content');

  if (!modal) {
    return;
  }

  const focusableSelectors =
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]';
  const focusableElements: HTMLElement[] = Array.from(
    modal.querySelectorAll(focusableSelectors)
  );

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey) {
    if (document.activeElement === firstElement) {
      lastElement.focus();
      event.preventDefault();
    }
  } else {
    if (document.activeElement === lastElement) {
      firstElement.focus();
      event.preventDefault();
    }
  }
}

export default function Modal({ children, isOpen, close }: ModalProps) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => HandleKey(event, close);

    document.body.addEventListener('keydown', onKey);
    return () => {
      document.body.removeEventListener('keydown', onKey);
    };
  }, [close]);

  function closeOnOutsideClick(event: React.MouseEvent) {
    if (event.target === event.currentTarget) {
      close();
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed z-50 flex items-center justify-center px-40 py-20 inset-0 bg-black/70" onClick={closeOnOutsideClick}>
      <div
        className="relative m-auto bg-lime-50 rounded-2xl p-8"
        role="dialog"
        aria-modal="true"
        aria-label="Modal"
        tabIndex={-1}
      >
        <button
          type="button"
          onClick={close}
          className="absolute cursor-pointer bg-transparent right-0 text-pink-400 bottom-full text-xl"
          aria-label="Close"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
}