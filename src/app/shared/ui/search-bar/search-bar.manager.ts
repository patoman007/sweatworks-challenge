export interface SearchBarInterface {
  label: string;
  placeholder: string;
  searchTerm: (value: string) => void;
  shouldShowClearButton: boolean;
  debounceTime: number;
}

export class SearchBarManager {

  static From(searchTerm: (value: string) => void,
              placeholder: string = '', label: string = '',
              shouldShowClearButton: boolean = false, debounceTime: number = 300): SearchBarInterface {
    return { label, placeholder, searchTerm, shouldShowClearButton, debounceTime };
  }

}
