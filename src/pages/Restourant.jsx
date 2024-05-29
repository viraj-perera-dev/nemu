import React, { useState, useCallback, useRef } from 'react';
import { GiPositionMarker } from "react-icons/gi";
import Logo from "../assets/logo/logo-positivo-png/Nemù_Logo_01_S+C.png";
import Filter from "../components/Filter";
import IconNemu from '../assets/logo/iconeSvg/Nemù_Icon_01_S+C.svg';


import {
  LoadScript,
  StandaloneSearchBox,
} from '@react-google-maps/api';
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';

const libraries = ['places'];

const center = {
  lat: 45.4383659,
  lng: 10.9917136,
};

function Restourant() {
  const [searchBox, setSearchBox] = useState(null);
  const [tempPosition, setTempPosition] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [sliderValue, setSliderValue] = useState(500); 
  const inputRef = useRef(null);

  const onLoad = useCallback((ref) => {
    setSearchBox(ref);
  }, []);

  const onPlacesChanged = () => {
    const places = searchBox.getPlaces();
    if (places.length > 0) {
      const place = places[0].geometry.location;
      setTempPosition({
        lat: place.lat(),
        lng: place.lng(),
      });
    }
  };

  const confirmPosition = () => {
    fetchRestaurants(tempPosition.lat, tempPosition.lng);
  };

  const findCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setTempPosition({ lat: latitude, lng: longitude });

        const geocoder = new window.google.maps.Geocoder();
        const latlng = { lat: latitude, lng: longitude };

        geocoder.geocode({ location: latlng }, (results, status) => {
          if (status === 'OK') {
            if (results[0]) {
              const address = results[0].formatted_address;
              inputRef.current.value = address;
            }
          }
        });
      });
    }
  };

  const fetchRestaurants = (lat, lng) => {
    const radius = 500; // radius in meters
    const page = 1;
    const limit = 10; // adjust the limit as needed
    const url = `https://www.nemuapp.it/api/owners/nearby?lng=${lng}&lat=${lat}&radius=${sliderValue}&page=${page}&limit=${limit}`;
  
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data) { // Check if data.data exists
          setRestaurants(data.data); // Update with data.data
        }
      })
      .catch((error) => {
        console.error('Error fetching restaurants:', error);
      });
  };
  
  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };
console.log(restaurants)

  return (
    <>
    <div className="flex justify-center mt-8">
      <img src={Logo} alt="logo" className="h-auto w-4/5 md:w-1/5" />
    </div>
      <div className='text-center mb-4 mt-10 flex justify-center'>
        <LoadScript googleMapsApiKey="AIzaSyDAMd9UupXz3WQwYHYzROElcbvIlFMBIlo" libraries={libraries}>
          <button
            onClick={findCurrentPosition}
            className='bg-green-500 text-white px-4 rounded'
          >
            <GiPositionMarker />
          </button>
          <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Trova i restoranti in zona..."
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
              }}
            />
          </StandaloneSearchBox>
          <button
            onClick={confirmPosition}
            className=' bg-blue-500 text-white px-4 rounded'
          >
            Cerca
          </button>
        </LoadScript>
      </div>
      <div className="mb-10 md:mx-96 flex align-center justify-center">
        <input
          type="range"
          min="0"
          max="1000"
          value={sliderValue}
          onChange={handleSliderChange}
          className="slider"
          style={{ width: '70%' }}
        />
        <span className="ml-4 text-white">{sliderValue} KM</span>
      </div>
      <Filter/>
      {restaurants.map((restaurant) => (
          <button key={restaurant._id} className='w-72 md:w-96 mb-10'>
            <div className={`border-b px-4 py-3 sm:px-6 rounded`} style={{ 'border':'1px solid #46b979'}}>
              <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                <div className="ml-4 mt-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className={`h-12 w-12 bg-cover`}
                        src={IconNemu}
                        alt="menu"
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-base font-bold leading-6" style={{color:"#46b979"}}>{restaurant.name}</h3>
                      <p className="text-sm text-gray-500">{restaurant.name}</p>
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

    </>
  );
}

export default Restourant;
