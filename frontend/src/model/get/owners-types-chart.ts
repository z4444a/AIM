export interface AmmountOfResourceType {
  id: number;
  name: string;
  amount: number;
}

export interface OwnersAmountResourceType {
  id: number;
  name: string;
  amountTypes: AmmountOfResourceType[];
}
