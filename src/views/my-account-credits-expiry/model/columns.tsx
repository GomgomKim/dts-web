'use client'

import { ColumnDef } from '@tanstack/react-table'

import { UI_TEXT } from './constants'

// TODO: 인터페이스 나오면 수정 및 선언 위치 이동
export type CreditExpiry = {
  id: string
  purchasedOn: Date
  description: string
  status: 'EXPIRED' | 'ACTIVE'
  credits: number
  expiresOn: Date
}

export const columns: ColumnDef<CreditExpiry>[] = [
  {
    accessorKey: 'purchasedOn',
    header: () => <span>{UI_TEXT.PURCHASED_ON}</span>,
    cell: ({ row }) => {
      const date = row.getValue('purchasedOn') as Date
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
      const status = row.getValue('status') as 'EXPIRED' | 'ACTIVE'
      return <span>{status}</span>
    }
  },
  {
    accessorKey: 'credits',
    header: () => <span>{UI_TEXT.CREDITS}</span>,
    cell: ({ row }) => {
      const credits = parseFloat(row.getValue('credits'))

      return <span>+{credits}</span>
    }
  },
  {
    accessorKey: 'expiresOn',
    header: () => <span>{UI_TEXT.EXPIRES_ON}</span>,
    cell: ({ row }) => {
      const date = row.getValue('expiresOn') as Date
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
  }
]
