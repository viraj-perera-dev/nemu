import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import IconNemu from '../assets/logo/logo-positivo-png/Nemù_Logo_04_S+B.png';
import { ArrowRightCircleIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import GoBack from '../components/GoBack';
import CategoryMenu from '../components/CategoryMenu';

function SingleMenu() {
  const { menuType, menuId } = useParams();
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const [menuCategories, setMenuCategories] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [menuName, setMenuName] = useState('');
  const [executed, setExecuted] = useState(false);

  // Access the passed data from the state object
  const { data } = location.state || { data: { menu: { menuCategory: [] } } };

  // if refresh or open direct on this page
  const fetchMenuData = async () => {
    try {
      const response = await fetch(`https://www.nemuapp.it/api/owners/${menuType}/menus`);
      if (!response.ok) {
        throw new Error('Failed to fetch menu data');
      }
      const data = await response.json();
      const menu = data.activeMenus.find(menu => menu.menuId === menuId);
      const singleMenu = menu.menu.menuCategory;
      setMenuCategories(singleMenu);
      setMenuName(menu.menu.name);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!executed && data.menu.menuCategory.length === 0) {
      fetchMenuData();
      setExecuted(true);
      return;
    }

    // Only set state if the condition is false, to avoid infinite loop
    if (!executed) {
      setMenuCategories(data.menu.menuCategory);
      setMenuName(data.menu.name);
    }
  }, [data, executed, menuCategories, menuName]);

  const handleMenuClick = (categoryId) => {
    setSelectedMenu(menuCategories.find(menu => menu._id === categoryId));
    setSelectedId(categoryId);
    if(selectedId !== categoryId){
      setShowMenu(true);
      return;
    }
    if(selectedId === categoryId){
      setShowMenu(!showMenu);
      return;
    }
  };

  return (
    <>
        <GoBack/>
      <div className="flex flex-col items-center justify-center my-10">
        <h1 className="text-2xl font-bold" style={{ color: "#46b979" }}>{menuName}</h1>
      </div>
      <div className="flex flex-col items-center w-full">
        {menuCategories.map((cat) => (
          <>
            <button key={cat._id} onClick={() => handleMenuClick(cat._id)} className='w-full px-4 sm:w-75 md:w-96 mb-5'>
              <div className={`border-b px-4 py-3 sm:px-6 rounded ${cat.color === '' && 'bg-nemu'}`} style={{ backgroundColor: cat.color, 'border': '1px solid #46b979' }}>
                <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                  <div className="ml-4 mt-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          className={`w-20 bg-auto ${cat.image === '' ? '' : 'rounded'}`}
                          src={cat.image === '' ? IconNemu : 'https://www.nemuapp.it/api/download/' + cat.image}
                          alt="menu"
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-base font-bold leading-6 text-slate-50">{cat.description}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 mt-4 flex flex-shrink-0">
                      <div className="h-8 w-8 flex items-center justify-center rounded-full text-neutral-800 font-semibold" style={{ backgroundColor: "#ffffffcc" }}>
                          <span>{cat.menuItems.length}</span>
                      </div>
                  </div>
                </div>
              </div>
            </button>
            {showMenu && selectedId === cat._id && <CategoryMenu state={selectedMenu} />}
          </>
        ))}
      </div>
    </>
  );
}

export default SingleMenu;
