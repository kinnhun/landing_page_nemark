import React from 'react'
import UserLayout from '../../layouts/UserLayout'
import type { ReactElement } from 'react'
import type { NextPageWithLayout } from '../_app'
import HomeBanner from './banner/HomeBanner'
import About from './sections/About'
import Stats from './sections/Stats'
import Services from './sections/Services'
import CallToAction from './sections/CallToAction'
import Portfolio from './sections/Portfolio'
import Pricing from './sections/Pricing'
import Team from './sections/Team'
import Contact from './sections/Contact'

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <HomeBanner />
      <About />
      <Stats />
      <Services />
      <CallToAction />
      <Portfolio />
      <Pricing />
      <Team />
      <Contact />
    </>
  )
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>
}

export default HomePage