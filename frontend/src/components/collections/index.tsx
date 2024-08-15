import React from 'react'
import HeaderOne from '@/layouts/headers/HeaderOne'
import Breadcrumb from '../common/Breadcrumb'
import Divider from '../common/Divider'
import FooterOne from '@/layouts/footers/FooterOne'
import CollectionsArea from './CollectionsArea'

const Collections = () => {
  return (
    <>
      <HeaderOne />
      <Breadcrumb title="Truck & Container" subtitle="Truck & Container" />
      <Divider />
      <CollectionsArea />
      <Divider />
      <FooterOne />
    </>
  )
}

export default Collections
