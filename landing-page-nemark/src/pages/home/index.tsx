import React from 'react'
import UserLayout from '../../layouts/UserLayout'
import type { ReactElement } from 'react'
import type { NextPageWithLayout } from '../_app'

const HomePage: NextPageWithLayout = () => {
  return <div>index</div>
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>
}

export default HomePage