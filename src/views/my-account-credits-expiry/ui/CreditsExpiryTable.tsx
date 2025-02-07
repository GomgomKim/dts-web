import { DataTable } from '@/entities/data-table'

import { CreditExpiry, columns } from '../model/columns'

const data: CreditExpiry[] = [
  {
    id: '728ed52f',
    purchasedOn: new Date(),
    description: 'Credit Expiration (Unused)',
    status: 'ACTIVE',
    credits: 10,
    expiresOn: new Date()
  },
  {
    id: '728ed52f',
    purchasedOn: new Date(),
    description: 'Credit Expiration (Unused)',
    status: 'ACTIVE',
    credits: 10,
    expiresOn: new Date()
  },
  {
    id: '728ed52f',
    purchasedOn: new Date(),
    description: 'Credit Expiration (Unused)',
    status: 'ACTIVE',
    credits: 10,
    expiresOn: new Date()
  },
  {
    id: '728ed52f',
    purchasedOn: new Date(),
    description: 'Credit Expiration (Unused)',
    status: 'ACTIVE',
    credits: 10,
    expiresOn: new Date()
  },
  {
    id: '728ed52f',
    purchasedOn: new Date(),
    description: 'Credit Expiration (Unused)',
    status: 'ACTIVE',
    credits: 10,
    expiresOn: new Date()
  },
  {
    id: '728ed52f',
    purchasedOn: new Date(),
    description: 'Credit Expiration (Unused)',
    status: 'ACTIVE',
    credits: 10,
    expiresOn: new Date()
  }
]

export const CreditsExpiryTable = () => {
  return (
    <div className="mt-16">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
