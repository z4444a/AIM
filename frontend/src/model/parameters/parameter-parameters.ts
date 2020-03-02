import { ParameterModifier } from '../parameter-modifier';

export interface ParameterParameters {
  typeId: number;
  modifier?: ParameterModifier;
  isOwner?: boolean;
}
