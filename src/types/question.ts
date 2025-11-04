export type TResponseType = "Rating" | "Comment";

export interface IQuestion {
  description: string;
  responseType: TResponseType;
  isRequired: boolean;
}