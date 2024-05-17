import React, { useEffect, useState } from "react";
import { useMenuContext } from '../MenuContext';

function Includi() {
    const { menuCategories, setMenuCategories, originalMenu, removeFilters, setRemoveFilters, includiMenu, setIncludiMenu } = useMenuContext();
    const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm') || '');
    const [filteredIngredients, setFilteredIngredients] = useState([]);
    const [removedIngredients, setRemovedIngredients] = useState(JSON.parse(localStorage.getItem('removedIngredients')) || []);

    useEffect(() => {
        // Save state to local storage whenever it changes
        localStorage.setItem('removedIngredients', JSON.stringify(removedIngredients));
        localStorage.setItem('filteredIngredients', JSON.stringify(filteredIngredients));
        localStorage.setItem('searchTerm', searchTerm);
    }, [removedIngredients, filteredIngredients, searchTerm]);

    useEffect(() => {
            setIncludiMenu(originalMenu);
            const updatedMenu = originalMenu.map(category => ({
                ...category,
                menuItems: category.menuItems.filter(menuItem => {
                    const menuItemIngredients = menuItem.translatedIngredients.map(ingredient => ingredient.translatedName);
                    return menuItemIngredients.some(ingredient => removedIngredients.includes(ingredient));
                })
            }));

            // Update the filteredIngredients state based on searchTerm
            const filteredItems = originalMenu.flatMap(category =>
                category.menuItems.flatMap(menuItem =>
                    menuItem.translatedIngredients.map((ingredient) => ingredient.translatedName)
                )
            ).filter(ingredient => ingredient.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 5);
            setFilteredIngredients(filteredItems);
            setRemoveFilters(true);
            if(menuCategories.length > 0){
                setMenuCategories(updatedMenu);
                return;
            }
    }, [ removedIngredients, searchTerm]);
    

    const handleAddIngredient = (ingredient) => {
        setRemovedIngredients(prevIngredients => [...prevIngredients, ingredient]);
        setFilteredIngredients(prevIngredients => prevIngredients.filter(item => item !== ingredient));
    };

    const handleRemoveIngredient = (ingredient) => {
        setFilteredIngredients(prevIngredients => [...prevIngredients, ingredient]);
        setRemovedIngredients(prevIngredients => prevIngredients.filter(item => item !== ingredient));
    };

    return (
        <>
            <div className="mb-4">
                <ul className="flex flex-wrap justify-center">
                    {removedIngredients.map((ingredient, index) => (
                        <li key={index} className="cursor-pointer text-neutral-50 bg-neutral-700 px-3 py-2 m-1 rounded-full" onClick={() => handleRemoveIngredient(ingredient)}>{ingredient}</li>
                    ))}
                </ul>
            </div>
            <input
                id="search-bar"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Cerca..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="mt-4">
                <ul className="flex flex-wrap justify-center">
                    {filteredIngredients.map((ingredient, index) => (
                        <li key={index} className="cursor-pointer text-black bg-neutral-300 px-3 py-2 m-1 rounded-full" onClick={() => handleAddIngredient(ingredient)}>{ingredient}</li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Includi;
