import { Book } from './book';

export class BookFactory {

    static empty(): Book {
        return new Book(null, '', '', new Date(),0,0,0,[], '', 0, [{id: 0, url: '', title: ''}], '');
    }

    static fromObject(rawBook: any): Book {
        return new Book(
            rawBook.id,
            rawBook.isbn,
            rawBook.title,
            typeof(rawBook.published) === 'string' ?
                new Date(rawBook.published) : rawBook.published,
            rawBook.user_id,
            rawBook.price,
            rawBook.count,
            rawBook.authors,
            rawBook.subtitle,
            rawBook.rating,
            rawBook.images,
            rawBook.description,
        );
    }
}