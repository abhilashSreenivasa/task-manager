import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/24/outline";

interface Props<T> {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: T[];
  displayValue: (value: T) => string;
}

export default function FormListBox<T>({ 
  label, 
  value, 
  onChange, 
  options, 
  displayValue 
}: Props<T>) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <ListboxButton className="w-full border border rounded px-3 py-2 flex justify-between items-center text-left">
            <span className="text-[grey]">{displayValue(value)}</span>
            <ChevronUpDownIcon className="h-5 w-5 text-gray-500" />
          </ListboxButton>
          <ListboxOptions className="absolute z-10 mt-1 w-full bg-white rounded border shadow max-h-60 overflow-y-auto">
            {options.map((option, index) => (
              <ListboxOption
                key={index}
                value={option}
                className="cursor-pointer px-3 py-2 hover:bg-gray-100 flex items-center justify-between"
              >
                {({ selected }) => (
                  <>
                    <span className="text-[grey]">{displayValue(option)}</span>
                    {selected && <CheckIcon className="h-4 w-4 text-green-600" />}
                  </>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
}