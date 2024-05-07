import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import IconNemu from '../assets/logo/iconeSvg/Nemù_Icon_01_S+C.svg';
import GoBack from '../components/GoBack';

function CategoryMenu() {
  const { menuType, menuId, categoryId } = useParams();
  const location = useLocation();
  const [menus, setMenus] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [clickedMenu, setClickedMenu] = useState(null); // State to store the clicked menu


  const { data } = location.state || {};

  useEffect(() => {
    if (data) {
      setMenus(data.menuItems);
    }
  }, [data]);

  const handleMenuClick = (menu) => {
    setSelectedMeal(menu);
    setClickedMenu(menu); 
  };

  return (
    <>
    {/* <GoBack/> */}
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold my-8" style={{ color: "#46b979" }}>{data ? data.name : ''}</h1>
      </div>
      <div className="flex flex-col items-center justify-center h-screen">
        {menus.map((menu) => (
          <div key={menu._id} className='mb-5'>
            <button onClick={() => handleMenuClick(menu)} className={`border-b px-4 py-3 sm:px-6 w-80 md:w-96 cursor-pointer ${clickedMenu && clickedMenu._id === menu._id ? 'rounded-t' : 'rounded'}`} style={{ backgroundColor: menu.color, 'border': '1px solid #46b979' }}>
              <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                <div className="ml-4 mt-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className={`h-12 w-12 ${menu.image === '' ? '' : 'rounded-full'}`}
                        src={menu.image === '' ? IconNemu : 'https://www.nemuapp.it/' + menu.image}
                        alt="menu"
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-base font-bold leading-6" style={{ color: "#46b979" }}>{menu.name}</h3>
                    </div>
                  </div>
                </div>
                <div className="ml-4 mt-4 flex flex-shrink-0">
                    <div className="px-3 flex items-center justify-center rounded-full text-white" style={{ backgroundColor: "#46b979" }}>
                        <span>{menu.price}€</span>
                    </div>
                </div>
              </div>
            </button>
            {selectedMeal && selectedMeal._id === menu._id && (
              <div className="border bg-slate-50 border-gray-200 text-start rounded-b">
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
                  {/* Add more details as needed */}
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
