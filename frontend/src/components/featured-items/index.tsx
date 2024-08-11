import React from 'react'
import Divider from '../common/Divider'
import Breadcrumb from '../common/Breadcrumb'
import HeaderOne from '@/layouts/headers/HeaderOne'
import FooterOne from '@/layouts/footers/FooterOne'
import FeaturedItemsArea from './FeaturedItemsArea'

const FeaturedItems = () => {
  return (
    <>
      <HeaderOne />
      <Breadcrumb title="Phương Tiện" subtitle="Phương Tiện" />
      <Divider />
      <FeaturedItemsArea />
      <Divider />
      <FooterOne />
    </>
  )
}

export default FeaturedItems
