import React, { useEffect, useState } from "react";
import { Switch } from '@headlessui/react';
import { useMenuContext } from '../MenuContext';

function Allergeni() {
    const { menuCategories, setMenuCategories } = useMenuContext();
    const { allerginesMenu, setAllerginesMenu } = useMenuContext();
    const { removeFilters, setRemoveFilters } = useMenuContext();
    const { originalMenu } = useMenuContext();
    const [allergeni, setAllergeni] = useState([]);

    useEffect(() => {
        const savedAllergeni = JSON.parse(localStorage.getItem('allergeni')) || [];
        if (savedAllergeni.length > 0) {
            setAllergeni(savedAllergeni);
            filterMenu(savedAllergeni, menuCategories);
            const allTrue = savedAllergeni.every(option => option.value);
            if (!allTrue) {
                setRemoveFilters(true);
            }else{
                setRemoveFilters(false);
            }
        } else {
            const initialAllergeni = extractAllergeniFromMenu(originalMenu);
            setAllergeni(initialAllergeni);
            filterMenu(initialAllergeni, menuCategories);
            const allTrue = initialAllergeni.every(option => option.value);
            if (!allTrue) {
                setRemoveFilters(true);
            }else{
                setRemoveFilters(false);
            }
        }
    }, [originalMenu]);

    useEffect(() => {
        if (allergeni.length > 0) {
            localStorage.setItem('allergeni', JSON.stringify(allergeni));
        }
    }, [allergeni]);

    const handleToggle = (index) => {
        if(allerginesMenu.length > 0){
            const updatedOptions = [...allergeni];
            updatedOptions[index] = { ...updatedOptions[index], value: !updatedOptions[index].value };
            setAllergeni(updatedOptions);
            filterMenu(updatedOptions, allerginesMenu);
            const allTrue = updatedOptions.every(option => option.value);
            if (!allTrue) {
                setRemoveFilters(true);
            }else{
                setRemoveFilters(false);
            }
            return;
        }
        const updatedOptions = [...allergeni];
        updatedOptions[index] = { ...updatedOptions[index], value: !updatedOptions[index].value };
        setAllergeni(updatedOptions);
        filterMenu(updatedOptions, menuCategories);
        setAllerginesMenu(menuCategories);
        const allTrue = updatedOptions.every(option => option.value);
        if (!allTrue) {
            setRemoveFilters(true);
        }else{
            setRemoveFilters(false);
        }

    };

    const filterMenu = (allergenOptions, menuToFilter) => {
        const updatedMenu = menuToFilter.map(category => ({
            ...category,
            menuItems: category.menuItems.filter(menuItem => {
                const hasFalseAllergen = menuItem.allergens.some(allergen => {
                    const selectedAllergen = allergenOptions.find(option => option.name === allergen);
                    return selectedAllergen && !selectedAllergen.value;
                });
                return !hasFalseAllergen;
            })
        }));
        setMenuCategories(updatedMenu);

    };

    const extractAllergeniFromMenu = (menuCategories) => {
        const extractedAllergens = menuCategories.flatMap(category =>
            category.menuItems.flatMap(menuItem =>
                menuItem.allergens
            )
        );
        const uniqueAllergens = Array.from(new Set(extractedAllergens));
        return uniqueAllergens.map(allergen => ({ name: allergen, value: true }));
    };

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    return (
        <div className="mb-4 h-64 overflow-y-auto">
            <ul className='me-2'>
                {allergeni.map((option, index) => (
                    <li key={option.name} className="flex justify-between items-center py-2">
                        <span className="text-gray-700">{option.name}</span>
                        <Switch
                            checked={option.value}
                            onChange={() => handleToggle(index)}
                            className={classNames(
                                option.value ? 'bg-nemu' : 'bg-gray-200',
                                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                            )}
                        >
                            <span className="sr-only">Use setting</span>
                            <span
                                aria-hidden="true"
                                className={classNames(
                                    option.value ? 'translate-x-5' : 'translate-x-0',
                                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                )}
                            />
                        </Switch>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Allergeni;
