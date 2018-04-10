import React from 'react'

import Images from './Overview/Images'
import Information from './Overview/Information'
import PriceRange from './Overview/PriceRange'


const Overview = ({ venue }) =>
  <div className="venue-overview">
    <div className="content color-white limit-width phm ptl pbm">
      <h1 className="text-center">{venue.venue_name}</h1>
      <div className="flex-row flex-col-mobile">
        <Information venue={venue} />
        <PriceRange highPrice={venue.highprice} lowPrice={venue.lowprice} />
      </div>
      <div className="search-area-buffer" />
    </div>

    <Images images={venue.images} />
  </div>


Overview.propTypes = {
  venue: React.PropTypes.object.isRequired
}


export default Overview
