export interface PaginatorInterface {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  disable: boolean;
  previousPage: () => void;
  nextPage: () => void;
  navigateToPageNumber: (pageNumber: number) => void;
}

export class PaginatorModel implements PaginatorInterface {

  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  disable: boolean;
  previousPage: () => void;
  nextPage: () => void;
  navigateToPageNumber: (pageNumber: number) => void;

  static From(totalItems: number, previousPage: () => void, nextPage: () => void,
              navigateToPageNumber: (pageNumber: number) => void,
              itemsPerPage: number = 5, currentPage: number = 1,
              navPages: number = 3, disable: boolean = false): PaginatorModel {
    const paginator: PaginatorInterface = {
      totalItems, itemsPerPage, currentPage, disable,
      previousPage, nextPage, navigateToPageNumber
    };
    return new PaginatorModel(paginator);
  }

  constructor(paginator: PaginatorInterface) {
    this.totalItems = paginator.totalItems;
    this.currentPage = paginator.currentPage;
    this.itemsPerPage = paginator.itemsPerPage;
    this.disable = paginator.disable;
    this.previousPage = paginator.previousPage;
    this.nextPage = paginator.nextPage;
    this.navigateToPageNumber = paginator.navigateToPageNumber;
  }

  get offset(): number {
    return this.itemsPerPage * (this.currentPage - 1);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage) || 0;
  }

  get pagesInfo(): string {
    return `Page ${ this.currentPage }/${ this.totalPages }`;
  }

  get itemsInfo(): string {
    return `Total items: ${ this.totalItems }`;
  }

  get itemsAndPagesInfo(): string {
    return `${ this.pagesInfo } - ${ this.itemsInfo }`;
  }

  incrementCurrentPage() {
    this.setCurrentPage(this.currentPage + 1);
  }

  decrementCurrentPage() {
    this.setCurrentPage(this.currentPage - 1);
  }

  setCurrentPage(pageNumber: number) {
    if (pageNumber <= 0 || pageNumber > this.totalPages) { return; }
    this.currentPage = pageNumber;
  }

}
