import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

function SingleMenu() {
  const { menuType, menuId } = useParams();
  const location = useLocation();

  // Access the passed data from the state object
  const { data } = location.state;
  
  useEffect(() => {
    console.log(data); // Log the passed data
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold my-8" style={{color:"#46b979"}}>{data.menu.name}</h1>
    </div>
  );
}

export default SingleMenu;
