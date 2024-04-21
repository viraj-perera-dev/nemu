import React, { useEffect, useState } from 'react';
import IconNemu from '../assets/logo/iconeSvg/Nemù_Icon_01_S+C.svg';
import GoBack from '../components/GoBack';
import { InformationCircleIcon } from '@heroicons/react/20/solid';

function CategoryMenu({state}) {
  const [menus, setMenus] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [clickedMenu, setClickedMenu] = useState(null); // State to store the clicked menu
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    if (state) {
      setMenus(state.menuItems);
    }
  }, [state]);

  const handleMenuClick = (menu) => {
    setSelectedMeal(menu);
    setClickedMenu(menu); 
    if(selectedMeal === menu){
      setToggleMenu(!toggleMenu)
      return;
    }
    setToggleMenu(true)
  };

  return (
    <>
    <GoBack/>
      <div className="flex flex-col items-center justify-center w-full px-4 sm:w-75 md:w-96">
        {menus.map((menu) => (
          <div key={menu._id} className='mb-5 x-4 w-full'>
            <button
              onClick={() => handleMenuClick(menu)}
              className={`border-b py-3 w-full px-4 cursor-pointer ${clickedMenu && clickedMenu._id === menu._id ? 'rounded-t' : 'rounded'}`}
              style={{ backgroundColor: menu.color, border: '1px solid #46b979' }}
            >
              <div className="-ml-4 -mt-4 flex items-center justify-between sm:flex-nowrap">
                <div className="ml-4 mt-4 flex-shrink-0">
                  <img
                    className={`h-12 w-12 bg-auto ${menu.image === '' ? '' : 'rounded'}`}
                    src={menu.image === '' ? IconNemu : 'https://www.nemuapp.it/api/download/' + menu.image}
                    alt="menu"
                  />
                </div>
                <div className="ml-4 mt-4 flex-grow">
                  <h3 className="text-base text-start font-bold leading-6" style={{ color: "#46b979" }}>{menu.name}</h3>
                </div>
                <div className="ml-4 mt-4 flex flex-shrink-0">
                  <InformationCircleIcon className="-ml-0.5 mr-1.5 h-5 w-5 my-auto text-neutral-300" aria-hidden="true" />
                  <div className="px-3 flex items-center justify-center rounded-full text-white font-semibold" style={{ backgroundColor: "#46b979" }}>
                    <span>{menu.price}€</span>
                  </div>
                </div>
              </div>
            </button>
            {toggleMenu && selectedMeal._id === menu._id && (
              <div className="border bg-neutral-300 border-gray-200 text-start rounded-b">
                <div className="px-4 py-3">
                    <p className="text-sm font-medium mb-2 text-gray-900"><b>Tipo: </b> 
                        {selectedMeal.isFish && 'Pesce'}
                        {selectedMeal.isFish && (selectedMeal.isMeat || selectedMeal.isVegan || selectedMeal.isVegetarian) && ', '}
                        {selectedMeal.isMeat && 'Carne'}
                        {selectedMeal.isMeat && (selectedMeal.isVegan || selectedMeal.isVegetarian) && ', '}
                        {selectedMeal.isVegan && 'Vegano'}
                        {selectedMeal.isVegan && (selectedMeal.isVegetarian) && ', '}
                        {selectedMeal.isVegetarian && 'Vegetariano'}
                    </p>
                  <p className="text-sm font-medium mb-2 text-gray-900"><b>Allergeni: </b> {selectedMeal.allergens}</p>
                  <p className="text-sm font-medium mb-2 text-gray-900"><b>Ingredienti: </b> {selectedMeal.ingredients}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default CategoryMenu;
