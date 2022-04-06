export const BookSchema = {
    name: 'Book',
    properties: {
        title: 'string',
        pages: 'string',
        author: 'Author?'
    }
};

export const AuthorSchema = {
    name: 'Author',
    embedded: true,
    properties: {
        firstName: 'string',
        lastName: 'string'
    }
};