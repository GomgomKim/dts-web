'use client'

import { ColumnDef } from '@tanstack/react-table'

import { UI_TEXT } from './constants'

// TODO: 인터페이스 나오면 수정 및 선언 위치 이동
export type Invoice = {
  id: string
  date: Date
  description: string
  status: 'EXPIRED' | 'USED' | 'PURCHASED'
  credits: number
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
      const status = row.getValue('status') as 'EXPIRED' | 'USED' | 'PURCHASED'
      return <span>{status}</span>
    }
  },
  {
    accessorKey: 'credits',
    header: () => <span>{UI_TEXT.CREDITS.toLocaleUpperCase()}</span>,
    cell: ({ row }) => {
      const status = row.getValue('status') as 'EXPIRED' | 'USED' | 'PURCHASED'
      const credits = parseFloat(row.getValue('credits'))
      let signs = ''

      if (status === 'EXPIRED' || status === 'USED') signs = '-'
      if (status === 'PURCHASED') signs = '+'

      return (
        <span>
          {signs}
          {credits}
        </span>
      )
    }
  }
]
