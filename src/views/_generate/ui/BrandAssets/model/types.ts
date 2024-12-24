export interface SearchBrandAssetsReqData {
  assetType: string
}

export interface SearchBrandAssetsResData {
  code: number
  content: {
    assets: Asset[]
  }
}

export interface Asset {
  // API 응답의 asset 객체 타입 정의
  // 실제 응답에 맞게 수정 필요
}

export interface UploadBrandAssetResData {
  code: number
  content: {
    assetId: string
    assetUrl: string
  }
}
