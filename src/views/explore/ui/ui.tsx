'use client'

import { Suspense } from 'react'
import { Banner } from '@/features/explore/Banner'
import { CardList } from '@/features/explore/CardList'
import { Category } from '@/features/category'
import { TAG_TYPES } from '../constant'

function Explore() {
  return (
    <>
      <Banner />
<<<<<<< HEAD
      <Category tagTypeList={TAG_TYPES} />
=======
      <Catergory categoryList={TAG_TYPES} />
>>>>>>> 74da821 (refactor: rename Catergory component props (tagTypeList-> categoryList ))
      <Suspense fallback={<div>Loading...</div>}>
        <CardList />
      </Suspense>
    </>
  )
}
export default Explore
