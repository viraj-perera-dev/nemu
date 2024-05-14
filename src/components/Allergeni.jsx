import React, { useEffect, useState } from "react";
import { Switch } from '@headlessui/react';

function Allergeni({ menu, onUpdateMenu }) {
    const [allergeni, setAllergeni] = useState([]);

    useEffect(() => {
        // Extract all allergens from the menu object
        const extractedAllergens = menu.flatMap(category =>
            category.menuItems.flatMap(menuItem =>
                menuItem.allergens
            )
        );

        // Remove duplicate allergens
        const uniqueAllergens = Array.from(new Set(extractedAllergens));

        // Create an array of objects with name and value properties for each allergen
        const allergenObjects = uniqueAllergens.map(allergen => ({ name: allergen, value: true }));
        console.log(allergenObjects)
        // Set the state with the extracted allergens
        setAllergeni(allergenObjects);
        onUpdateMenu(menu);
    }, [menu]);

    const handleToggle = (index) => {
        const updatedOptions = [...allergeni];
        updatedOptions[index] = { ...updatedOptions[index], value: !updatedOptions[index].value };
        setAllergeni(updatedOptions);

        // Filter the menu items based on the selected allergens
        const updatedMenu = menu.map(category => ({
            ...category,
            menuItems: category.menuItems.filter(menuItem => {
                const hasFalseAllergen = menuItem.allergens.some(allergen => {
                    const selectedAllergen = updatedOptions.find(option => option.name === allergen);
                    return selectedAllergen && !selectedAllergen.value;
                });
                return !hasFalseAllergen;
            })
        }));

        // Update the menu state with the filtered menu
        onUpdateMenu(updatedMenu);
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
