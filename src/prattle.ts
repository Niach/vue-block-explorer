export interface PostEvent extends PrattleEvent {
  post: string,
  timestamp: number
}

export interface PrattleEvent {
  address: string;
  type: 'post' | 'transferOwnership'
}
