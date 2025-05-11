import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Label } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useState } from 'react'
import { ComboBoxData } from '../types/basetype'

interface NewComboBoxProps{
  label?: string
  data: ComboBoxData[]
}
export default function NewComboBox({label, data}: NewComboBoxProps) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<ComboBoxData>(data[0]); 

  const filteredPeople =
    query === ''
      ? data
      : data.filter((d) => {
          return d.value.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <div className="w-full"> {/* Removed mx-auto, h-screen, w-52, pt-20 */}
      {label ? <Label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</Label> : null}
      
      <Combobox value={selected} onChange={(d:ComboBoxData) => setSelected(d)}>
        <div className="relative">
          <ComboboxInput
            className={clsx(
              'w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 py-1.5 pr-8 pl-3 text-sm/6 text-gray-900 dark:text-white', // Adjusted styles for better visibility
              'focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600' // Adjusted focus styles
            )}
            displayValue={(d: ComboBoxData) => d?.value ?? ""}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-4 fill-gray-500 dark:fill-white/60 group-data-hover:fill-gray-700 dark:group-data-hover:fill-white" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            'w-[var(--input-width)] mt-1 rounded-xl border border-gray-200 dark:border-white/5 bg-white dark:bg-neutral-800 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible', // Adjusted styles
            'transition duration-100 ease-in data-leave:data-closed:opacity-0 z-[60] shadow-lg' // Increased z-index from z-20 to z-[60]
          )}
        >
          {filteredPeople.map((d) => (
            <ComboboxOption
              key={d.id}
              value={d}
              className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-blue-100 dark:data-focus:bg-white/10" // Removed z-20 from here, it belongs on the options container
            >
              <CheckIcon className="invisible size-4 fill-blue-600 dark:fill-white group-data-selected:visible" />
              <div className="text-sm/6 text-gray-900 dark:text-white">{d.value}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  )
}
