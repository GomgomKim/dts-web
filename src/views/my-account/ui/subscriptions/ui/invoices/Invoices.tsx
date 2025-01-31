import { DataTable } from '@/entities/data-table'

import { Invoice, columns } from '../../model/columns'
import { UI_TEXT } from '../../model/constants'

const data: Invoice[] = [
  {
    id: '728ed52f',
    date: new Date(),
    description: 'Subscription (Upgrade to 5 Models)',
    status: 'PAID',
    amount: 460
  },
  {
    id: '728ed52f',
    date: new Date(),
    description: 'Subscription (1 Model)',
    status: 'REFUND',
    amount: 100
  },
  {
    id: '728ed52f',
    date: new Date(),
    description: 'Subscription (1 Model)',
    status: 'PAID',
    amount: 100
  }
]

export const Invoices = () => {
  return (
    <div className="mt-16">
      <h3 className="mb-3 text-[1.125rem] font-semibold">{UI_TEXT.INVOICES}</h3>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
