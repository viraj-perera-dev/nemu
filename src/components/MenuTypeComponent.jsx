import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowRightCircleIcon } from '@heroicons/react/20/solid';
import IconNemu from '../assets/logo/iconeSvg/Nemù_Icon_04_S+B.svg';
import { useNavigate } from 'react-router-dom';
import SingleMenuComponent from './SingleMenuComponent';


function MenuTypeComponent({id, onMenuCategoryLength}) {
  const { menuType } = useParams();// Get the menuId parameter from the URL
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;



  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch(`${apiEndpoint}/owners/${id}/menus`);
        if (!response.ok) {
          throw new Error('Failed to fetch menu data');
        }
        const data = await response.json();

        setMenus(data.activeMenus);
        setIsLoading(false);
        console.log(`Length of menu categories: ${data.activeMenus[0].menu.menuCategory.length}`);
  
      } catch (error) {

        setError(error.message);
        setIsLoading(false);

      }
    };

    fetchMenuData();

    return () => {

    };
  }, [id]); 

  useEffect(() => {
    if (menus && menus.length > 0) {
      const menuCategoryLength = menus[0].menu.menuCategory.length;
      onMenuCategoryLength(menuCategoryLength); // Call the callback with the length
    }else{
        onMenuCategoryLength(0);
    }
  }, [menus, onMenuCategoryLength]);

  // Render loading state while fetching data
  if (isLoading) {
    return <div>Loading...</div>;
  }


  return (
    <>
      {menus.map((menu) => (
        <>
        {/* <button key={menu.menuId} className='w-full md:w-96'>
          <div className={`border-b px-4 py-3 sm:px-6 rounded`} style={{backgroundColor:menu.menu.color+'e7', backgroundColor:'#46b979'}}>
            <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
              <div className="ml-4 mt-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className={`h-12 w-12 bg-cover ${menu.menu.image === '' ? '' : 'rounded'}`}
                      src={menu.menu.image === '' ? IconNemu : `${apiEndpoint}/download/`+menu.menu.image}
                      alt="menu"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base font-bold leading-6 text-white">{menu.menu.description}</h3>
                  </div>
                </div>
              </div>
              <div className="ml-4 mt-4 flex flex-shrink-0">
                  <ArrowRightCircleIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-white" aria-hidden="true" />
              </div>
            </div>
          </div>
        </button> */}
        <div className={``}>
            <SingleMenuComponent data={menu} />
        </div>
        </>
      ))}
      </>
  );
  
}

export default MenuTypeComponent;
