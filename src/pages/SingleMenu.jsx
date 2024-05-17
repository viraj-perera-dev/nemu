import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import IconNemu from '../assets/logo/logo-positivo-png/Nemù_Logo_04_S+B.png';
import { ArrowRightCircleIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import GoBack from '../components/GoBack';
import CategoryMenu from '../components/CategoryMenu';
import Languages from '../components/Languages';
import Filter from '../components/Filter';
import { a } from 'react-spring';
import { useMenuContext } from '../MenuContext';

function SingleMenu() {
  const { menuCategories, setMenuCategories } = useMenuContext();
  const { originalMenu, setOriginalMenu } = useMenuContext();
  const { menuType, menuId } = useParams();
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const [showMenu, setShowMenu] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [menuName, setMenuName] = useState('');
  const [executed, setExecuted] = useState(false);
  const defaultLanguage = 'it';
  const [menuLang, setMenuLang] = useState('');
  const [apiData, setApiData] = useState({});
  const [selectedLanguages, setSelectedLanguages] = useState('it');
  const [menuCategoriesLeng, setMenuCategoriesLeng] = useState([]);
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
  const [storedFilters, setStoredFilters] = useState([]);


  // const [filters, setFilters] = useState({ isFish: true, isMeat: true, isVegetarian: true });

  // Access the passed data from the state object
  const { data } = location.state || { data: { menu: { menuCategory: [] } } };

  // if refresh or open direct on this page
  const fetchMenuData = async () => {
    try {
      const response = await fetch(`${apiEndpoint}/owners/${menuType}/menus`);
      if (!response.ok) {
        throw new Error('Failed to fetch menu data');
      }
      const data = await response.json();
      const menu = data.activeMenus.find(menu => menu.menuId === menuId);
      setApiData(menu);
      const singleMenu = menu.menu.menuCategory;
      setMenuCategories(singleMenu);
      setOriginalMenu(singleMenu);
      setStoredFilters(singleMenu);
      setMenuName(menu.menu.name);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (menuCategories.length === 0) {
      fetchMenuData();
      setExecuted(true);
      return;
    }

    // Only set state if the condition is false, to avoid infinite loop
    if (!executed) {
      setMenuCategories(data.menu.menuCategory);
      setOriginalMenu(data.menu.menuCategory);
      setStoredFilters(data.menu.menuCategory);
      setMenuName(data.menu.name);
    }

    let menuLang;
    
    if (data && data.menu && data.menu.translations) {
      menuLang = [defaultLanguage, ...data.menu.translations.map(item => item.language)].join(', ');
    } else if (apiData && apiData.menu && apiData.menu.translations) {
      menuLang = [defaultLanguage, ...apiData.menu.translations.map(item => item.language)].join(', ');
    } else {
      menuLang = defaultLanguage;
    }   

    setMenuLang(menuLang);

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
  
  // Define handleLanguageChange function
  const handleLanguageChange = (lng) => {  
    console.log(lng, ' ', apiData)
  if(Object.keys(apiData).length > 0){
    setSelectedLanguages(lng);
      if(lng !== 'it'){
        const menuLang = apiData.menu.translations.find((menu) => menu.language === lng);
        const singleMenuLang = menuLang.translatedMenu.translatedMenuCategory;
        setMenuCategoriesLeng(singleMenuLang)
        const translatedMenuName = menuLang.translatedMenu.translatedName;
        setMenuName(translatedMenuName);
      }
    } else {
      setSelectedLanguages(lng);
      if(lng !== 'it'){
        const menuLang = data.menu.translations.find((menu) => menu.language === lng);
        const singleMenuLang = menuLang.translatedMenu.translatedMenuCategory;
        setMenuCategoriesLeng(singleMenuLang)
        const translatedMenuName = menuLang.translatedMenu.translatedName;
        setMenuName(translatedMenuName);
      }
    }
  }; 

  // const handelFilter = (newFilters) => {
  //   const filteredCategories = originalMenu.map(category => {
  //     const filteredItems = category.menuItems.filter(item => {
  //       return (
  //         (newFilters.isMeat || !item.isMeat) &&
  //         (newFilters.isFish || !item.isFish) &&
  //         (newFilters.isVegetarian || !item.isVegetarian)
  //       );
  //     });
  //     return { ...category, menuItems: filteredItems };
  //   });
  //   setMenuCategories(filteredCategories);
  //   setStoredFilters(filteredCategories);
  // };
  

  // const handleFiltersChange = (newFilters) => {
  //   if(newFilters === 0){
  //     setMenuCategories(originalMenu);
  //     return;
  //   }
  //   if (Array.isArray(newFilters)) {
  //     setMenuCategories(newFilters);
  //   } else {
  //     setFilters(newFilters);
  //     handelFilter(newFilters);
  //   }

  // };
  
  
  return (
    <>
        {/* <GoBack/> */}
        <Languages selectedFlags={menuLang} onLanguageChange={handleLanguageChange}/>
      <div className="flex flex-col items-center justify-center my-10">
        <h1 className="text-2xl font-bold" style={{ color: "#46b979" }}>{menuName}</h1>
      </div>

      <div className="flex flex-col items-center w-full">
      <Filter/>

      {menuCategories.map((cat) => {
          const translate = menuCategoriesLeng.find(oneCat => oneCat.id === cat._id);
        return (
          <React.Fragment key={cat._id}>
            <button onClick={() => handleMenuClick(cat._id)} className='w-full px-4 sm:w-75 md:w-96 mb-5'>
              <div className={`border-b px-4 py-3 sm:px-6 rounded ${cat.color === '' && 'bg-nemu'}`} style={{ backgroundColor: cat.color, 'border': '1px solid #46b979' }}>
                <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                  <div className="ml-4 mt-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          className={`w-20 bg-auto ${cat.image === '' ? '' : 'rounded'}`}
                          src={cat.image === '' ? IconNemu : `${apiEndpoint}/download/` + cat.image}
                          alt="menu"
                        />
                      </div>
                      <div className="ml-4">         
                          <h3 className="text-base font-bold leading-6 text-slate-50">{selectedLanguages === 'it' ? cat.name : translate.translatedName}</h3>
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
            {showMenu && selectedId === cat._id && <CategoryMenu state={selectedMenu} translate={translate !== undefined ? translate.translatedMenuItems : ''} selectedLang={selectedLanguages} />}
          </React.Fragment>
        );
      })}

      </div>
    </>
  );
}

export default SingleMenu;
