// TODO: api 인터페이스 나오면 수정
// server api & url query parameter
export type OrderType = 'NEWEST' | 'OLDEST' | 'UPDATED' | 'CREATED' | 'NAME'
// client state
export type OrderTypeValue =
  | 'newest'
  | 'oldest'
  | 'updated'
  | 'created'
  | 'name'
// client rendering label
export type OrderTypeLabel =
  | 'Newest first'
  | 'Oldest first'
  | 'Date updated'
  | 'Date created'
  | 'Name'
