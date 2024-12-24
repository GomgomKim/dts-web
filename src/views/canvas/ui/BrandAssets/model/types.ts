export interface SearchBrandAssetsReqData {
  assetType: string
}

export interface SearchBrandAssetsResData {
  code: number
  content: {
    assetId: string
    assetUrl: string
    assetType: string
    createdAt: string
    updatedAt: string
  }[]
}

export interface UploadBrandAssetResData {
  code: number
  content: {
    assetId: string
    assetUrl: string
    assetType: string
    createdAt: string
    updatedAt: string
  }
}
