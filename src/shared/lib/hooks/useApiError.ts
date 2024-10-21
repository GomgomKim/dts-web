import { useCallback } from 'react'

import { useAuthStore } from '@/entities/UserProfile/store'

import axios from 'axios'

interface ErrorResponse {
  code: number
  message: string
  content?: object | null
}

interface StatusHandlers {
  [key: number]: (msg?: string, errorCode?: number) => void
  default: (msg?: string) => void
}

const useApiError = () => {
  const logOut = useAuthStore((state) => state.logOut)

  const handleError = useCallback((error: unknown) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const errorResponse = error.response?.data as ErrorResponse

        const { message: httpMessage, code: httpErrorCode } = errorResponse

        const httpStatus = error.response?.status

        // 에러 핸들러를 실행하기 전에 httpStatus가 유효한지 확인
        const handle = httpStatus
          ? statusHandlers[httpStatus]
          : statusHandlers.default

        handle(httpMessage, httpErrorCode)

        return
      } else {
        console.log('no response! 서버 연결이 원활하지 않습니다.')
        return
      }
    } else {
      console.log('네트워크 연결 오류 또는 기타 오류가 발생했습니다.')
      return
    }
  }, [])

  const statusHandlers: StatusHandlers = {
    400: () => {
      console.log('400')

      // if (errorCode === 5007) {
      //   alert('ai 이미지 생성 횟수 초과입니다.')
      //   return
      // }

      // if (errorCode === 5004) {
      //   alert('배경 제거에 이슈가 발생했습니다. 다시 시도해주세요.')
      //   return
      // }
    },
    401: () => {
      // if (errorCode === 3005) {
      //   logOut(null)
      //   console.log('로그인 세션이 만료가 되었습니다. 다시 로그인 해주세요.')
      //   return
      // }

      // if (errorCode === 9003) {
      //   // logOut(null)
      //   console.log('로그인에 문제가 생겼습니다. 다시 로그인 해주세요.')
      // return

      if (confirm('로그인에 문제가 생겼습니다. 다시 로그인 해주세요.')) {
        logOut(null)
      }
      // }
    },
    500: () => console.log('서버 오류가 발생했습니다.'),
    default: () => console.log('서버에서 알 수 없는 오류가 발생했습니다.')
  }

  return { handleError }
}

export default useApiError
