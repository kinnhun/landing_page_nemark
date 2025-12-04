import React from 'react'
import HomeBanner from './banner/HomeBanner'
import About from './sections/About'
import Stats from './sections/Stats'
import Services from './sections/Services'
import CallToAction from './sections/CallToAction'
import Portfolio from './sections/Portfolio'
import Pricing from './sections/Pricing'
import Team from './sections/Team'
import Contact from './sections/Contact'

const HomePage = () => {
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

export default HomePage