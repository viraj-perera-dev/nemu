import React, { useState, useCallback, useRef } from 'react';
import { GiPositionMarker } from "react-icons/gi";
import Logo from "../assets/logo/logo-positivo-png/Nemù_Logo_01_S+C.png";
import Filter from "../components/Filter";


import {
  LoadScript,
  StandaloneSearchBox,
} from '@react-google-maps/api';
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';
import RestourantComponent from '../components/RestourantComponent';

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
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
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
          setLoading(false);
        });
      }, (error) => {
        console.error('Error fetching current position:', error);
        setLoading(false);
      });
    }
  };

  const fetchRestaurants = (lat, lng) => {
    const page = 1;
    const limit = 10; 
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
              placeholder={loading ? "Loading..." : "Trova i restoranti in zona..."}
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
      <div className="mb-10 xl:mx-96 flex align-center justify-center">
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
      <div className='flex flex-col items-center justify-start h-dvh mt-10'>
          <RestourantComponent allRestaurants={restaurants} />
      </div>

    </>
  );
}

export default Restourant;
