import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const Dropdown = ({ items, header, headerComponent: HeaderComponent }) => {
  return (
    <Menu as="div" className="relative inline-block text-left h-fit">
      <div className="flex items-center">
        <Menu.Button>
          {HeaderComponent ? (
            <HeaderComponent />
          ) : (
            <>
              {header}
              <ChevronDownIcon
                className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                aria-hidden="true"
              />
            </>
          )}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-10 right-0 mt-2 min-w-[150px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {items.map(({ title, icon: Icon, onClick = () => {} }) => (
            <Menu.Item key={title}>
              {({ active }) => (
                <button
                  onClick={onClick}
                  className={`${
                    active ? "bg-indigo-400 text-white" : "text-gray-900"
                  } flex w-full gap-3 items-center rounded-md px-3 py-3 text-sm`}
                >
                  {!!Icon && <Icon className="w-5 h-5" />}
                  {title}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
