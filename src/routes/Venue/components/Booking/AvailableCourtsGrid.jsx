import _ from 'lodash'
import moment from 'moment'
import React, { Component, PropTypes } from 'react'
import Slider from 'react-slick'
import PropTypeShapes from '../../../../components/PropTypes'

import AvailableCourtsColumn from './AvailableCourtsColumn'

class AvailableCourtsGrid extends Component {
  getslot_time(time) {
    return moment(time, 'YYYY-MM-DD HH:mm:ss').format('HH:mm')
  }

  addCourtToCourtData(courtData, slot, court, taken) {
    if (!courtData.courts.hasOwnProperty(court.id)) {
      courtData.courts[court.id] = {
        courts: [],
        slotStartingAt30: false,
        slotStartingAt60: false
      }
    }
    courtData.courts[court.id].name = court.name
    courtData.courts[court.id].courts.push({
      court,
      slot_time: slot.slot_time,
      taken
    })

    if (_.includes(slot.slot_time, ':30:')) {
      courtData.courts[court.id].slotStartingAt30 = true
    } else {
      courtData.courts[court.id].slotStartingAt60 = true
    }
  }

  addStartPolicy(courtData) {
    let slotStartingAt30 = false
    let slotStartingAt60 = false

    Object.values(courtData.courts).forEach(court => {
      if (court.slotStartingAt30 && court.slotStartingAt60) {
        slotStartingAt30 = true
        court.hourly = false
      } else {
        slotStartingAt60 = true
        court.hourly = true
      }
    })

    courtData.hourly = !(slotStartingAt30 && slotStartingAt60)
  }

  getSlotsByCourt(slots) {
    const courtData = { courts: {} }

    slots.forEach(slot => {
      slot.taken_courts.forEach(court => {
        this.addCourtToCourtData(courtData, slot, court, true)
      })

      slot.available_courts.forEach(court => {
        this.addCourtToCourtData(courtData, slot, court, false)
      })
    })

    this.addStartPolicy(courtData)

    return courtData
  }

  haveIntersection(courts) {
    return courts.some(court =>
      courts.some(anotherCourt =>
        moment(court.slot_time, 'YYYY-MM-DD HH:mm:ss')
        .isBefore(moment(anotherCourt.slot_time, 'YYYY-MM-DD HH:mm:ss')) &&
        moment(court.slot_time, 'YYYY-MM-DD HH:mm:ss').add(court.court.duration, 'minutes')
        .isAfter(moment(anotherCourt.slot_time, 'YYYY-MM-DD HH:mm:ss'))
      )
    )
  }

  render() {
    const { selectedCourts, slots } = this.props
    const courtData = this.getSlotsByCourt(slots)
    const earliestTimeSlot = slots[0].slot_time
    const numberOfCourts = Object.keys(courtData.courts).length
    const slidesToShow = numberOfCourts > 10 ? 10 : numberOfCourts
    const flexibleSliderSettings = {
      arrows: true,
      infinite: false,
      speed: 500,
      slidesToShow,
      slidesToScroll: slidesToShow,
      responsive: [
        {
          breakpoint: 300,
          settings: {
            slidesToShow: slidesToShow > 1 ? 1 : slidesToShow
          }
        },
        {
          breakpoint: 400,
          settings: {
            slidesToShow: slidesToShow > 2 ? 2 : slidesToShow
          }
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: slidesToShow > 3 ? 3 : slidesToShow
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: slidesToShow > 4 ? 4 : slidesToShow
          }
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: slidesToShow > 5 ? 5 : slidesToShow
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: slidesToShow > 6 ? 6 : slidesToShow
          }
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: slidesToShow > 7 ? 7 : slidesToShow
          }
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: slidesToShow > 8 ? 8 : slidesToShow
          }
        }
      ]
    }

    const areAllHourSlots = Object.keys(courtData.courts).every(id =>
      courtData.courts[id].courts.every(court => court.court.duration === 60))
    const hasHalfHourGrid = slots.some(slot => moment(slot.slot_time, 'YYYY-MM-DD HH:mm:ss').minutes() === 30)
    const areSlotsIntersecting = Object.keys(courtData.courts).some(id =>
      this.haveIntersection(courtData.courts[id].courts))
    const period = hasHalfHourGrid && areAllHourSlots && !areSlotsIntersecting ? 30 : 60

    return (
      <div className="available-courts-grid flex-row pbm prs">
        <div className="grid-times mhs t6 text-center">
          { slots.map((slot, index) =>
            <div className="grid-time" key={index} style={{ height: `${3.875 * period / 60}rem` }}>
              {this.getslot_time(slot.slot_time)}
            </div>
          )}
        </div>

        <div className="flex">
          <Slider {...flexibleSliderSettings}>
            { Object.keys(courtData.courts).map((id, index) =>
              <div className="flex" key={index}>
                <AvailableCourtsColumn
                  courts={courtData.courts[id].courts}
                  duration={courtData.duration}
                  earliestTimeSlot={earliestTimeSlot}
                  hourlyColumn={courtData.courts[id].hourly}
                  hourlyGrid={courtData.hourly}
                  name={courtData.courts[id].name}
                  selectedCourts={selectedCourts} />
              </div>
            )}
          </Slider>
        </div>
      </div>
    )
  }
}

AvailableCourtsGrid.propTypes = {
  selectedCourts: PropTypes.arrayOf(PropTypeShapes.court).isRequired,
  slots: PropTypes.arrayOf(PropTypes.shape).isRequired
}


export default AvailableCourtsGrid
