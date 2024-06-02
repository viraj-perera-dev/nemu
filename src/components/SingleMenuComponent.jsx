import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IconNemu from '../assets/logo/logo-positivo-png/Nemù_Logo_04_S+B.png';
import CategoryMenu from '../components/CategoryMenuComponent';
import { useMenuContext } from '../MenuContext';

function SingleMenuComponent({data}) {
  const { menuCategories, setMenuCategories } = useMenuContext();
  const [showMenu, setShowMenu] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [menuName, setMenuName] = useState('');
  const [executed, setExecuted] = useState(false);
  const defaultLanguage = 'it';
  const [apiData, setApiData] = useState({});
  const [selectedLanguages, setSelectedLanguages] = useState('it');
  const [menuCategoriesLeng, setMenuCategoriesLeng] = useState([]);
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

  useEffect(() => {
      setMenuCategories(data.menu.menuCategory);
      setMenuName(data.menu.name);

    let menuLang;
    
    if (data && data.menu && data.menu.translations) {
      menuLang = [defaultLanguage, ...data.menu.translations.map(item => item.language)].join(', ');
    } else if (apiData && apiData.menu && apiData.menu.translations) {
      menuLang = [defaultLanguage, ...apiData.menu.translations.map(item => item.language)].join(', ');
    } else {
      menuLang = defaultLanguage;
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
      {menuCategories.map((cat) => {
          const translate = menuCategoriesLeng.find(oneCat => oneCat.id === cat._id);
        return (
          <React.Fragment key={cat._id}>
            <button onClick={() => handleMenuClick(cat._id)} className='w-full md:w-96'>
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

    </>
  );
}

export default SingleMenuComponent;
