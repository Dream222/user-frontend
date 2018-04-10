import React from 'react'
import Navigation from '../../../containers/Navigation'

import SearchGrid from '../../../containers/Searchgrid/SearchGrid'

import MainJumbotron from './MainJumbotron'
import VenueCarousel from '../containers/VenueCarouselContainer'
import Header from './Header'

export const HomeView = () =>
  <div id="home-view">

    <header className="home-header">
      <Navigation theme="navigation-transparent" />
      <Header />
    </header>

    <main>
      <div className="pht mbm">
        <SearchGrid />
      </div>
      <MainJumbotron />
      <VenueCarousel />
    </main>
  </div>


export default HomeView
