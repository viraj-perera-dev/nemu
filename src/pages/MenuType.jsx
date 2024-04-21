import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowRightCircleIcon } from '@heroicons/react/20/solid';
import IconNemu from '../assets/logo/iconeSvg/Nemù_Icon_01_S+C.svg';
import { useNavigate } from 'react-router-dom';


function MenuType() {
  const { menuType } = useParams();// Get the menuId parameter from the URL
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch(`https://www.nemuapp.it/api/owners/${menuType}/menus`);
        if (!response.ok) {
          throw new Error('Failed to fetch menu data');
        }
        const data = await response.json();

        setMenus(data.activeMenus);
        setIsLoading(false);

      } catch (error) {

        setError(error.message);
        setIsLoading(false);

      }
    };

    fetchMenuData();

    return () => {

    };
  }, [menuType]); 

  // Render loading state while fetching data
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render error message if an error occurred
  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleMenuClick = (menuId) => {
    const selectedMenu = menus.find(menu => menu.menuId === menuId);

    if (selectedMenu) {
      navigate(`/menu/${menuType}/${menuId}`, { state: { data: selectedMenu } });
    }  
  };

  return (
    <div className="flex flex-col items-center justify-center h-dvh">
      {menus.map((menu) => (
        <button key={menu.menuId} onClick={() => handleMenuClick(menu.menuId)} className='w-72 md:w-96 mb-10'>
          <div className={`border-b px-4 py-3 sm:px-6 rounded`} style={{backgroundColor:menu.menu.color+'e7', 'border':'1px solid #46b979'}}>
            <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
              <div className="ml-4 mt-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className={`h-12 w-12 bg-cover ${menu.menu.image === '' ? '' : 'rounded'}`}
                      src={menu.menu.image === '' ? IconNemu : 'https://www.nemuapp.it/api/download/'+menu.menu.image}
                      alt="menu"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base font-bold leading-6" style={{color:"#46b979"}}>{menu.menu.description}</h3>
                  </div>
                </div>
              </div>
              <div className="ml-4 mt-4 flex flex-shrink-0">
                  <ArrowRightCircleIcon className="-ml-0.5 mr-1.5 h-5 w-5" style={{color:"#46b979"}} aria-hidden="true" />
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
  
}

export default MenuType;
