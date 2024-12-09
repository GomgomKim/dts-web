import { useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'

interface FilterParams<
  TLabel extends string,
  TValue extends string,
  TType extends string
> {
  searchParamKey: string
  options: { label: TLabel; value: TValue }[]
  optionsType: {
    typeMap: Record<TValue, TType>
    revertTypeMap: Record<TType, TValue>
  }
  onChangeValue: (value: string) => void
}

export const useFilter = <
  TLabel extends string,
  TValue extends string,
  TType extends string
>(
  params: FilterParams<TLabel, TValue, TType>
) => {
  const searchParams = useSearchParams()
  const filterType = (searchParams.get(params.searchParamKey) ||
    Object.values(params.optionsType.typeMap)[0]) as TType

  // tabs로 searchParams가 변경될 때를 위한 로직
  // tabs 플로우(필터링 옵션 그대로인지 초기화인지)에 따라 수정 예정
  useEffect(() => {
    setValue(params.optionsType.revertTypeMap[filterType])
  }, [filterType])

  const [value, setValue] = useState<string>(
    () => params.optionsType.revertTypeMap[filterType]
  )

  const handleChangeValue = (value: string) => {
    setValue(value)
    params.onChangeValue(value)
  }

  return { value, handleChangeValue }
}
