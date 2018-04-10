import React from 'react'


const Information = ({venue}) =>
  <div className="information flex color-white mvm">
    <div className="flex-row mvs">
      <i className="icon-map t3 mrs" />
      <div>
        { venue.street },
        <br />
        { venue.zip } { venue.city }
      </div>
    </div>

    <div className="flex-row mvs">
      <i className="icon-phone t3 mrs" />
      <a href="">{ venue.phone_number }</a>
    </div>

    <div className="flex-row mvs">
      <i className="icon-site t3 mrs" />
      <a href={`https://"${venue.website}`}>
        { venue.website }
      </a>
    </div>

    <div className="flex-row mvs">
      <i className="icon-parking t3 mrs" />
      <a href="">
        { venue.parking_info }
      </a>
    </div>

    <div className="flex-row mvs">
      <i className="icon-transport t3 mrs" />
      <a href="">{ venue.transit_info }</a>
    </div>
  </div>

Information.propTypes = {
  venue: React.PropTypes.shape({
    city: React.PropTypes.string,
    parking_info: React.PropTypes.string,
    phone_number: React.PropTypes.string,
    street: React.PropTypes.string,
    transit_info: React.PropTypes.string,
    website: React.PropTypes.string,
    zip: React.PropTypes.string
  }).isRequired
}


export default Information
