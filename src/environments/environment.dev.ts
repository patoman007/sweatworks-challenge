export const environment = {
  production: false,
  webServices: {
    base: 'http://localhost:3000/api/v1/',
    endpoints: {
      publications: {
        create: 'publications/new',
        read: 'publications',
        update: 'publications/edit',
        delete: 'publications/remove'
      },
      authors: {
        create: 'authors/new',
        read: 'authors',
        update: 'authors/edit',
        delete: 'authors/remove'
      }
    }
  }
};

