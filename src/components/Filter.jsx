import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDrumstickBite, faFilter, faFish, faSeedling, faX, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { Switch } from '@headlessui/react'
import AdvancedFilter from './AdvancedFilter';
import { useMenuContext } from '../MenuContext';

function Filter({menus}) {
const { menuCategories, setMenuCategories } = useMenuContext();
const { originalMenu, setOriginalMenu } = useMenuContext();
const { allerginesMenu, setAllerginesMenu } = useMenuContext();
const { removeFilters, setRemoveFilters } = useMenuContext();
const [carneEnabled, setCarneEnabled] = useState(true);
const [pesceEnabled, setPesceEnabled] = useState(true);
const [vegetarianoEnabled, setVegetarianoEnabled] = useState(true);
const [open, setOpen] = useState(false);
const [filters, setFilters] = useState({ isFish: true, isMeat: true, isVegetarian: true });
const [total, setTotal] = useState(0);

useEffect(()=>{
  const totalMenuItems = menuCategories.reduce((total, menu) => {
    return total + menu.menuItems.length;
  }, 0);
  setTotal(totalMenuItems);
}, [menuCategories]); 


const handelFilter = (newFilters) => {
  const filteredCategories = originalMenu.map(category => {
    const filteredItems = category.menuItems.filter(item => {
      return (
        (newFilters.isMeat || !item.isMeat) &&
        (newFilters.isFish || !item.isFish) &&
        (newFilters.isVegetarian || !item.isVegetarian)
      );
    });
    return { ...category, menuItems: filteredItems };
  });
  setMenuCategories(filteredCategories);
};


const handleFiltersChange = (newFilters) => {
  if (Array.isArray(newFilters)) {
    setMenuCategories(newFilters);
    console.log(newFilters);
  } else {
    setFilters(newFilters);
    handelFilter(newFilters);
  }

};

const handleToggle = (filter) => {
  let filtersState = {
    isFish: pesceEnabled,
    isMeat: carneEnabled,
    isVegetarian: vegetarianoEnabled
  };
  switch (filter) {
    case 'carne':
      setCarneEnabled(!carneEnabled);
      filtersState.isMeat = !carneEnabled;
      if(carneEnabled){
        setRemoveFilters(true);
      }
      break;
    case 'pesce':
      setPesceEnabled(!pesceEnabled);
      filtersState.isFish = !pesceEnabled;
      if(pesceEnabled){
        setRemoveFilters(true);
      }
      break;
    case 'vegetariano':
      setVegetarianoEnabled(!vegetarianoEnabled);
      filtersState.isVegetarian = !vegetarianoEnabled;
      if(vegetarianoEnabled){
        setRemoveFilters(true);
      }
      break;
    default:
      break;
  }
  const hasFalseValue = Object.values(filtersState).some(value => value === false);
  handleFiltersChange(filtersState);
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const handleAllFilters = () => {
  setOpen(true);
}

const handlemodalClose = () => {
  setOpen(false);
}

const handleRemoveFilters = () => {
  localStorage.clear(); 
  setRemoveFilters(false);
  setMenuCategories(originalMenu);
  setAllerginesMenu([]);
  setCarneEnabled(true);
  setPesceEnabled(true);
  setVegetarianoEnabled(true);
}

  return (
    <div className='mb-5'>
      <button  className={`border-b px-4 py-2 sm:px-6 w-full md:w-96 cursor-pointer rounded`} style={{ 'border': '1px solid #46b979' }}>
        <div className="-ml-4 flex flex-wrap items-center justify-between sm:flex-nowrap my-3">
          <div className="ml-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FontAwesomeIcon icon={faDrumstickBite} className='text-neutral-50' />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-bold leading-6" style={{ color: "#46b979" }}>Carne</h3>
              </div>
            </div>
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <Switch
              checked={carneEnabled}
              onChange={() => handleToggle('carne')}
              className={classNames(
                carneEnabled ? 'bg-nemu' : 'bg-gray-200',
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
              )}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={classNames(
                  carneEnabled ? 'translate-x-5' : 'translate-x-0',
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                )}
              />
            </Switch>
          </div>
        </div>
        <div className="-ml-4 flex flex-wrap items-center justify-between sm:flex-nowrap my-3">
          <div className="ml-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FontAwesomeIcon icon={faFish} className='text-neutral-50' />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-bold leading-6" style={{ color: "#46b979" }}>Pesce</h3>
              </div>
            </div>
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <Switch
                checked={pesceEnabled}
                onChange={() => handleToggle('pesce')}
              className={classNames(
                pesceEnabled ? 'bg-nemu' : 'bg-gray-200',
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
              )}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={classNames(
                  pesceEnabled ? 'translate-x-5' : 'translate-x-0',
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                )}
              />
            </Switch>
          </div>
        </div>
        <div className="-ml-4 flex flex-wrap items-center justify-between sm:flex-nowrap my-3">
          <div className="ml-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FontAwesomeIcon icon={faSeedling} className='text-neutral-50' />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-bold leading-6" style={{ color: "#46b979" }}>Vegetariano</h3>
              </div>
            </div>
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <Switch
              checked={vegetarianoEnabled}
              onChange={() => handleToggle('vegetariano')}
              className={classNames(
                vegetarianoEnabled ? 'bg-nemu' : 'bg-gray-200',
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
              )}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={classNames(
                  vegetarianoEnabled ? 'translate-x-5' : 'translate-x-0',
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                )}
              />
            </Switch>
          </div>
        </div>
        <div className="-ml-4 flex flex-wrap items-center justify-between sm:flex-nowrap mt-5 mb-3">
          <div className="ml-4">
            <button onClick={handleAllFilters} className="flex items-center px-2 py-1 rounded" style={{border: '1px solid #46b979'}}>
              <div className="flex-shrink-0">
                <FontAwesomeIcon icon={faFilter} className='text-neutral-50' />
              </div>
              <div className="ml-4">
                <h3 className="text-sm leading-6 text-neutral-50">Tutti i Filtri</h3>
              </div>
            </button>
          </div>
          <div className="ml-4 flex flex-shrink-0">
              <div className="ml-4">
                <p className="text-base font-bold leading-6 me-2" style={{ color: "#46b979" }}>Totale piatti</p>
              </div>
              <div className="px-3 flex items-center justify-center rounded-full text-white" style={{ backgroundColor: "#46b979" }}>
                  <span>{total}</span>
              </div>
          </div>
        </div>
        {removeFilters && 
          <div className="-ml-4 flex flex-wrap items-center justify-start sm:flex-nowrap">
            <button className='text-rose-700 mt-1 ms-5' onClick={handleRemoveFilters}><FontAwesomeIcon icon={faXmarkCircle} className='me-2' /> rimuovi filtri</button>
          </div>
        }
      </button>
      {open && 
        <AdvancedFilter total={total} close={handlemodalClose}/>    
      }
    </div>
  );
}

export default Filter;
