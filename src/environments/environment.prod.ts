export const environment = {
  production: true,
  webServices: {
    base: 'https://f0znmhbp6l.execute-api.us-west-2.amazonaws.com/dev/api/v1/',
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
