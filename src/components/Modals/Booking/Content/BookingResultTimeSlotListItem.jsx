import React from 'react'
import PriceBubble from './PriceBubble'

const BookingResultTimeSlotListItem = ({ classes, court, selected, removable, duration, onCourtSelect, start_time, showTime = false }) => {
  let removeClass = removable ? 'modal-booking__court-cross' : '';

  if (court) {
    return (
      <div className={classes + ' booking-court'} onClick={() => onCourtSelect(court)}>
        <div className={removeClass} />

        <div className='flex'>
          <div className='em-high'>
            {court.name}
          </div>

          <div className='booking-court__duration'>
            {showTime && `${court.start_time} ${'\u2022'}`} {displayDuration(+duration)}
          </div>
        </div>

        <PriceBubble currency='€' amount={court.price}/>
      </div>
    );
  }
  return (
    <div />
  );
}

const displayDuration = minutes => {
  if (minutes > 60) {
    return minutes / 60  + ' hours';
  } else {
    return minutes + ' mins'
  }
}

export default BookingResultTimeSlotListItem;
