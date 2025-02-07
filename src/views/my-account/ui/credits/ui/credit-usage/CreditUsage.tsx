import { DataTable } from '@/entities/data-table'

import { Invoice, columns } from '../../model/columns'
import { UI_TEXT } from '../../model/constants'

const data: Invoice[] = [
  {
    id: '728ed52f',
    date: new Date(),
    description: 'Credit Expiration (Unused)',
    status: 'EXPIRED',
    credits: 10
  },
  {
    id: '728ed52f',
    date: new Date(),
    description: 'Image Generation',
    status: 'USED',
    credits: 1
  },
  {
    id: '728ed52f',
    date: new Date(),
    description: 'Image Generation',
    status: 'USED',
    credits: 1
  },
  {
    id: '728ed52f',
    date: new Date(),
    description: 'Download Image (Medium, 1080px)',
    status: 'USED',
    credits: 1
  },
  {
    id: '728ed52f',
    date: new Date(),
    description: 'Download Image (Large, 1920px)',
    status: 'USED',
    credits: 2
  },
  {
    id: '728ed52f',
    date: new Date(),
    description: 'Credit Top-up (Valid until 2025. 12. 16)',
    status: 'PURCHASED',
    credits: 100
  }
]

export const CreditUsage = () => {
  return (
    <div className="mt-16">
      <h3 className="mb-3 text-[1.125rem] font-semibold">
        {UI_TEXT.CREDIT_USAGE}
      </h3>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
