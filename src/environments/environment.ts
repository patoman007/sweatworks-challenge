export const environment = {
  production: true,
  webServices: {
    base: 'http://localhost:4200/assets/api/v1/',
    endpoints: {
      publications: {
        create: 'publications/new',
        read: 'publications.json',
        update: 'publications/edit',
        delete: 'publications/remove'
      },
      authors: {
        create: 'authors/new',
        read: 'authors.json',
        update: 'authors/edit',
        delete: 'authors/remove'
      }
    }
  }
};
