export interface SearchBarInterface {
  label: string;
  placeholder: string;
  searchTerm: (value: string) => void;
  debounceTime: number;
}

export class SearchBarManager {

  static From(searchTerm: (value: string) => void,
              placeholder: string = '', label: string = '',
              debounceTime: number = 300): SearchBarInterface {
    return { label, placeholder, searchTerm, debounceTime };
  }

}
