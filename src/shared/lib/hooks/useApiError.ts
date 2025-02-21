import { useCallback } from 'react'

// import { useAuthStore } from '@/entities/UserProfile/store'
import axios from 'axios'

interface ErrorResponse {
  code: number
  message: string
  content?: object | null
}

interface StatusHandlers {
  [key: number]: (msg?: string, errorCode?: number) => void
  default: () => void
}

const useApiError = () => {
  // const logOut = useAuthStore((state) => state.logOut)

  const handleError = useCallback((error: unknown) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const errorResponse = error.response?.data as ErrorResponse

        const { message: httpMessage, code: httpErrorCode } = errorResponse

        const httpStatus = error.response?.status

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
      console.error('400')
    },
    401: (msg, errorCode) => {
      console.error(
        '로그인에 문제가 생겼습니다. 다시 로그인 해주세요.',
        errorCode,
        msg
      )
    },
    404: () => console.error('404 요청하신 페이지를 찾을 수 없습니다.'),
    409: (msg, errorCode) => {
      if (errorCode === 5007) {
        console.error(msg) // 이미지 생성 제한을 초과했습니다
        return
      }

      if (errorCode === 5004) {
        console.error(msg) // 배경 제거에 이슈가 발생했습니다. 다시 시도해주세요.
        return
      }

      console.error(msg)
    },
    500: () => console.error('서버 오류가 발생했습니다.'),
    default: () => console.error('서버에서 알 수 없는 오류가 발생했습니다.')
  }

  return { handleError }
}

export default useApiError
