import React, { useEffect } from 'react';
import logo from '../assets/logo/careisgold1.webp'

function GoogleMap() {
  useEffect(() => {
    const map = new window.google.maps.Map(
      document.getElementById('map'),
      {
        mapId: "26a4c07079ff402c",
        center: { lat: 45.393285, lng: 10.900937 },
        zoom: 5.2,
        clickableIcons: true,
      }
    );
    const marker = new window.google.maps.Marker({
      position: { lat: 45.393285, lng: 10.900937 },
      map: map,
      icon: logo,
      title: "Careisgold S.p.A",
      animation: window.google.maps.Animation.DROP
    });
    
    const infoWindow = new window.google.maps.InfoWindow({
      content: 
      `
      <a className="text-decoration-none" target="_blank" href="https://goo.gl/maps/Vd15wfzxnCfXp58j7">
      <p className="nomeG fw-bold m-0 text-center text-dark">Careisgold S.p.A</p>
      <p className="m-0 text-dark text-center">Via Monte Baldo, 14/D</p>
      <p className="m-0 text-link fw-bold text-center">ottieni indicazioni</p>
      </a>
      `
    });
    marker.addListener('click', () => {
      infoWindow.open(map,marker);
    })
  }, []);




  return <div id="map" className="rounded" style={{ width: '100%', height: '300px' }} />;
}

export default GoogleMap