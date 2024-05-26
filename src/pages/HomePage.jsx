import React, { useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { GiPositionMarker } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import Logo from "../assets/logo/logo-positivo-png/Nemù_Logo_01_S+C.png";

import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  height: '80vh',
  width: '100%',
};
const center = {
  lat: 45.4383659,
  lng: 10.9917136,
};

function HomePage() {
  const [position, setPosition] = useState(center);
  const [searchBox, setSearchBox] = useState(null);
  const [tempPosition, setTempPosition] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

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
    setPosition(tempPosition);
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
    const url = `https://www.nemuapp.it/api/owners/nearby?lng=${lng}&lat=${lat}&radius=${radius}&page=${page}&limit=${limit}`;
  
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
      <div className="h-screen md:mx-96">
        <LoadScript googleMapsApiKey="AIzaSyDAMd9UupXz3WQwYHYzROElcbvIlFMBIlo" libraries={libraries}>
          <GoogleMap mapContainerStyle={mapContainerStyle} center={position} zoom={10}>
            {position && <Marker position={position} />}
            {tempPosition && <Marker position={tempPosition} />}
            {restaurants.map((restaurant, index) => (
              <Marker
                key={index}
                position={{
                  lat: restaurant.address.coordinates[1], // Access lat from address.coordinates
                  lng: restaurant.address.coordinates[0], // Access lng from address.coordinates
                }}
                icon={{
                  url: `https://www.nemuapp.it/api/download/${restaurant.avatar}`,
                  scaledSize: new window.google.maps.Size(32, 32),
                }}
                onClick={() => navigate(`/menu/${restaurant._id}/`)}
                />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  );
}

export default HomePage;
