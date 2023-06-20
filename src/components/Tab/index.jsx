import { Tab as HLTab } from "@headlessui/react";

const Tab = ({ headers = [], contents }) => {
  return (
    <HLTab.Group>
      <HLTab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
        {headers.map(header => (
          <HLTab
            key={header}
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5 ${
                selected
                  ? "bg-white text-neutral-500 shadow"
                  : "text-white hover:bg-white/[0.12] hover:text-white"
              }`
            }
          >
            {header}
          </HLTab>
        ))}
      </HLTab.List>

      <HLTab.Panels className="mt-2 min-h-[100px]">
        {contents.map((component, i) => (
          <HLTab.Panel key={i} className="rounded-xl bg-white p-3">
            {component}
          </HLTab.Panel>
        ))}
      </HLTab.Panels>
    </HLTab.Group>
  );
};

export default Tab;
