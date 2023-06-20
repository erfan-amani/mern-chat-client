import { forwardRef, useImperativeHandle, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";

const AppModal = forwardRef((props, ref) => {
  const [open, setOpen] = useState(null);
  const [title, setTitle] = useState(null);
  const [disableBackDropClose, setDisableBackdropClose] = useState(false);
  const [noCloseButton, setNoCloseButton] = useState(false);

  useImperativeHandle(ref, (...rest) => ({
    show(component, disableBackDropClose, title, noClose) {
      setTitle(title);
      setOpen(component);
      setDisableBackdropClose(disableBackDropClose);
      setNoCloseButton(noClose);
    },
    hide() {
      setOpen(null);
    },
  }));

  const close = () => {
    setOpen(null);
  };

  const closeModal = (e, reason) => {
    if (!disableBackDropClose) {
      close(null);
    } else if (reason !== "backdropClick") {
      close(null);
    }
  };

  return (
    <Transition appear show={!!open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          // leave="ease-in duration-200"
          // leaveFrom="opacity-100"
          // leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              // leaveFrom="opacity-100 scale-100"
              // leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="p-4 w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all">
                {(!!title || !noCloseButton) && (
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      {title && (
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          {title}
                        </Dialog.Title>
                      )}
                    </div>

                    {!noCloseButton && (
                      <button onClick={() => close(null)}>
                        <XMarkIcon className="w-6 h-6 text-neutral-800" />
                      </button>
                    )}
                  </div>
                )}

                <div className="">{open && open}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
});

export default AppModal;
