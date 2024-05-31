import React, { useState, useEffect } from 'react';
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import IconNemu from '../assets/logo/iconeSvg/Nemù_Icon_01_S+C.svg';
import axios from 'axios';
import MenuTypeComponent from './MenuTypeComponent';

function RestourantComponent({ allRestaurants }) {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
  const [menusLengths, setMenusLengths] = useState({}); // State to store the length of menu categories for each restaurant
  const [fetchedMenus, setFetchedMenus] = useState({}); // State to store whether menu data has been fetched for each restaurant

  const handleRestaurantClick = (restaurantId) => {
    setSelectedRestaurantId(selectedRestaurantId === restaurantId ? null : restaurantId);
  };

  const handleMenuCategoryLength = (restaurantId, length) => {
    if (menusLengths[restaurantId] !== length) {
      setMenusLengths((prevLengths) => ({
        ...prevLengths,
        [restaurantId]: length,
      }));
    }
  };
  
  useEffect(() => {
    const fetchMenuData = async (restaurantId) => {
      if (!fetchedMenus[restaurantId]) {
        try {
          const response = await axios.get(`${apiEndpoint}/owners/${restaurantId}/menus`);
          if (!response.ok) {
            throw new Error('Failed to fetch menu data');
          }
          const data = response.data;
          setFetchedMenus((prevFetchedMenus) => ({
            ...prevFetchedMenus,
            [restaurantId]: true,
          }));
          setMenusLengths((prevLengths) => ({
            ...prevLengths,
            [restaurantId]: data.activeMenus[0].menu.menuCategory.length,
          }));
        } catch (error) {
          console.error('Error fetching menu data:', error);
        }
      }
    };
  
    if (selectedRestaurantId) {
      fetchMenuData(selectedRestaurantId);
    }
  }, [selectedRestaurantId, fetchedMenus, apiEndpoint]);
  
  return (
    <>
      {allRestaurants.map((restaurant, index) => (
        <div key={restaurant._id} className='w-full md:w-96 mb-10'>
          <button 
            onClick={() => handleRestaurantClick(restaurant._id)} 
            className='w-full'
          >
            <div className={`border-b px-4 py-3 sm:px-6 rounded`} style={{ 'border':'1px solid #46b979'}}>
              <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                <div className="ml-4 mt-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className={`h-12 w-12 bg-cover`}
                        src={restaurant.avatar !== '' ? `${apiEndpoint}/download/${restaurant.avatar}` : IconNemu}
                        alt="menu"
                      />
                    </div>
                    <div className="ml-4 text-start">
                      <h3 className="text-base font-bold leading-6" style={{color:"#46b979"}}>{restaurant.name}</h3>
                      <p className="text-sm text-gray-500">{restaurant.name}</p>
                    </div>
                  </div>
                </div>
                <div className="ml-4 mt-4 flex flex-shrink-0">
                  <div className="h-8 w-8 flex items-center justify-center rounded-full text-neutral-800 font-semibold" style={{ backgroundColor: "#ffffffcc" }}>
                    <span>{menusLengths[restaurant._id] || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </button>
          <div className={`${selectedRestaurantId !== restaurant._id && 'hidden'}`}>
            <MenuTypeComponent id={restaurant._id} onMenuCategoryLength={(length) => handleMenuCategoryLength(restaurant._id, length)} />
          </div>
        </div>
      ))}
    </>
  );
}

export default RestourantComponent;
