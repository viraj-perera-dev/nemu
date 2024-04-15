import React from 'react';

function GoldPrice() {
  return (
    <div>
      <iframe
        src="https://goldbroker.com/widget/historical/XAU?height=500&currency=EUR"
        scrolling="no"
        frameBorder="0"
        width="100%"
        height="500"
        style={{ border: '0', overflow: 'hidden' }}
      ></iframe>
    </div>
  );
}

export default GoldPrice;
