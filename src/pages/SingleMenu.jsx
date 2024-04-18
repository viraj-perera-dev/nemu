import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import IconNemu from '../assets/logo/iconeSvg/Nemù_Icon_01_S+C.svg';
import { ArrowRightCircleIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import GoBack from '../components/GoBack';

function SingleMenu() {
  const { menuType, menuId } = useParams();
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const [menuCategories, setMenuCategories] = useState([]);

  // Access the passed data from the state object
  const { data } = location.state || { data: { menu: { menuCategory: [] } } };

  useEffect(() => {
    setMenuCategories(data.menu.menuCategory);
  }, [data]);

  const handleMenuClick = (categoryId) => {
    const selectedMenu = menuCategories.find(menu => menu._id === categoryId);
    if (selectedMenu) {
      navigate(`/menu/${menuType}/${menuId}/${categoryId}`, { state: { data: selectedMenu } });
    }  
  };

  return (
    <>
        <GoBack/>
      <div className="flex flex-col items-center justify-center my-10">
        <h1 className="text-2xl font-bold" style={{ color: "#46b979" }}>{data.menu.name}</h1>
      </div>
      <div className="flex flex-col items-center justify-center h-screen">
        {menuCategories.map((cat) => (
          <button key={cat._id} onClick={() => handleMenuClick(cat._id)} className='w-72 md:w-96 mb-5'>
            <div className={`border-b px-4 py-3 sm:px-6 rounded`} style={{ backgroundColor: cat.color, 'border': '1px solid #46b979' }}>
              <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                <div className="ml-4 mt-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className={`h-12 w-12 ${cat.image === '' ? '' : 'rounded-full'}`}
                        src={cat.image === '' ? IconNemu : 'https://www.nemuapp.it/'+cat.image}
                        alt="menu"
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-base font-bold leading-6" style={{ color: "#46b979" }}>{cat.description}</h3>
                    </div>
                  </div>
                </div>
                <div className="ml-4 mt-4 flex flex-shrink-0">
                    <div className="h-8 w-8 flex items-center justify-center rounded-full text-white" style={{ backgroundColor: "#46b979" }}>
                        <span>{cat.menuItems.length}</span>
                    </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}

export default SingleMenu;
