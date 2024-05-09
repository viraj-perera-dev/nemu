import { Fragment, useEffect, useState } from 'react';
import { Dialog, Switch, Transition } from '@headlessui/react';
import Includi from './Includi';
import Escludi from './Escludi';
import AllergeniComponent from './Allergeni';


function AdvancedFilter({ total, close, menu, includeFilterMenu }) {
  const [open, setOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState('Includi');
  const [options, setOptions] = useState([
    { name: 'Includi', value: true },
    { name: 'Escludi', value: true },
    { name: 'Allergeni', value: true },
  ]);

    const handleUpdateMenu = (updatedMenu) => {
        includeFilterMenu(updatedMenu);
    };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog className="relative z-10" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="sm:flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div className="mt-3 text-center sm:mt-5">
                  <div className="ml-4 flex flex-shrink-0 justify-between">
                    <p className="font-semibold">Filtri</p>
                    <div className="ml-4 flex flex-shrink-0 justify-end">
                      <div className="ml-4">
                        <p className="text-base font-bold leading-6 me-2" style={{ color: '#46b979' }}>
                          Totale piatti
                        </p>
                      </div>
                      <div className="px-3 flex items-center justify-center rounded-full text-white" style={{ backgroundColor: '#46b979' }}>
                        <span>{total}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 flex justify-between border p-1 rounded-full bg-nemu">
                    {options.map((option, index) => (
                      <button
                        key={option.name}
                        className={`switch-option z-10 text-neutral-50 font-semibold ${selectedOption === option.name && 'selected'}`}
                        onClick={() => setSelectedOption(option.name)}
                      >
                        {option.name}
                      </button>
                    ))}
                  </div>
                </div>
                {selectedOption === 'Includi' && (   
                  <div className="mt-5">
                    <Includi menu={menu} onUpdateMenu={handleUpdateMenu}/>
                  </div>
                )}    

                {selectedOption === 'Escludi' && (
                  <div className="mt-5">
                    <Escludi menu={menu}/>
                  </div>
                )}

                {selectedOption === 'Allergeni' && (
                  <div className="mt-5">
                    <AllergeniComponent menu={menu}/>
                  </div>
                )}

                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-nemu px-3 py-2 text-sm font-semibold text-white shadow-sm opacity-90 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={close}
                  >
                    Procedi
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default AdvancedFilter;
