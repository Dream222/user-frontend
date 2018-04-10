import React from 'react'
import Navigation from '../../../containers/Navigation'
import Header from '../containers/HeaderContainer'
import ProfileNavigation from '../containers/ProfileNavigationContainer'
import Content from '../containers/ContentContainer'

const ProfileView = () =>
  <div className="flex color-bg-light-blue">
    <Navigation />

    <main className="pal pam-mobile">
      <Header />
      <ProfileNavigation />
      <Content />
    </main>
  </div>


export default ProfileView
