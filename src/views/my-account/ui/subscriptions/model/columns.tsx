'use client'

import { ColumnDef } from '@tanstack/react-table'

import { UI_TEXT } from './constants'

// TODO: 인터페이스 나오면 수정 및 선언 위치 이동
export type Invoice = {
  id: string
  date: Date
  description: string
  status: 'PAID' | 'REFUND'
  amount: number
  // invoice: null
}

export const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: 'date',
    header: () => <span>{UI_TEXT.DATE}</span>,
    cell: ({ row }) => {
      const date = row.getValue('date') as Date
      const formattedDate = date
        .toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
        .replace(/\./g, '. ') // 모든 "." 뒤에 공백 추가
        .trim()
        .replace(/\.$/, '') // 마지막 "." 제거

      return <span>{formattedDate}</span>
    }
  },
  {
    accessorKey: 'description',
    header: () => <span>{UI_TEXT.DESCRIPTION}</span>
  },
  {
    accessorKey: 'status',
    header: () => <span>{UI_TEXT.STATUS}</span>,
    cell: ({ row }) => {
      const status = row.getValue('status') as 'PAID' | 'REFUND'
      return <span>{status}</span>
    }
  },
  {
    accessorKey: 'amount',
    header: () => <span>{UI_TEXT.AMOUNT}</span>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0, // 소수점 최소 자릿수
        maximumFractionDigits: 0 // 소수점 최대 자릿수
      }).format(amount)

      return <span>{formatted}</span>
    }
  },
  {
    accessorKey: 'invoice',
    header: () => <span>{UI_TEXT.INVOICE}</span>
  }
]
