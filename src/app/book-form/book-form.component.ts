import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { BookFormErrorMessages } from './book-form-error-messages';
import {BookFactory} from "../shared/book-factory";
import {BookStoreService} from "../shared/book-store.service";
import {Book, Image, Author} from "../shared/book";

@Component({
    selector: 'bs-book-form',
    templateUrl: './book-form.component.html'
})

export class BookFormComponent implements OnInit {
    bookForm: FormGroup;
    book = BookFactory.empty();
    errors: { [key: string]: string } = {};
    isUpdatingBook = false;
    images: FormArray;
    authors: FormArray;

    constructor(private fb: FormBuilder, private bs: BookStoreService,
                private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        const isbn = this.route.snapshot.params['isbn'];
        if (isbn) {
            this.isUpdatingBook = true;
            this.bs.getSingle(isbn).subscribe(book => {
                this.book = book;
                this.initBook();
            });
        }
        this.initBook();
    }

    initBook() {
        this.buildThumbnailsArray();
        this.buildAuthorThumbnailsArray();


        this.bookForm = this.fb.group({
            id: this.book.id,
            title: [this.book.title, Validators.required],
            subtitle: this.book.subtitle,
            isbn: [this.book.isbn, [
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(13)
            ]],
            price: this.book.price,
            description: this.book.description,
            rating: [this.book.rating,[
                Validators.min(0),
                Validators.max(10)
            ]],
            authors: this.authors,
            images: this.images,
            published: new Date(this.book.published)
        });
        this.bookForm.statusChanges.subscribe(() => this.updateErrorMessages());
    }

    buildThumbnailsArray() {
        console.log(this.book.images);
        if(this.book.images.length == 0){ //if new book had no images -> but no in edit mode
            this.book.images.push(new Image(0,'',''))
        }

        //für jedes der bilder gibt es kleines subformular
        this.images = this.fb.array(
            this.book.images.map(
                t => this.fb.group({
                    id: this.fb.control(t.id),
                    url: this.fb.control(t.url),
                    title: this.fb.control(t.title)
                })
            )
        );
        console.log(this.images);
    }

    buildAuthorThumbnailsArray(){
        console.log(this.book.authors);
        if(this.book.authors.length == 0){ //if new book had no images -> but no in edit mode
            this.book.authors.push(new Author(0,'',''))
        }

        //für jedes der bilder gibt es kleines subformular
        this.authors = this.fb.array(
            this.book.authors.map(
                t => this.fb.group({
                    id: this.fb.control(t.id),
                    firstName: this.fb.control(t.firstName),
                    lastName: this.fb.control(t.lastName)
                })
            )
        );
        console.log(this.authors);
    }

    addThumbnailControl() {
        this.images.push(this.fb.group({ url: null, title: null }));
    }

    addThumbnailControlAuthors() {
        this.authors.push(this.fb.group({ firstName: null, lastName: null }));
    }

    submitForm() {
      //wir bauen im hintergrund daten zusammen
        //haben events die feuern wenn man was schreibt
        //validieren das in echtzeit
        //dann aus daten von Formular ein Buchobjekt basteln
        //das nutzt dann service methoden für speichern und updaten

        // filter empty values
        this.bookForm.value.images = this.bookForm.value.images.filter(thumbnail => thumbnail.url);

        // filter empty values
        this.bookForm.value.authors = this.bookForm.value.authors.filter(thumbnail => thumbnail.firstName);

        //aus Datenstruktur von Formular Buchobjekt machen
        const book: Book = BookFactory.fromObject(this.bookForm.value);
        //deep copy  - did not work without?? - checkt er nicht automatisch
        //nochmal zuweisen
        book.images = this.bookForm.value.images;


        //just copy the authors
        book.authors = this.bookForm.value.authors;
        console.log(book);
        //entweder buch updaten
        if (this.isUpdatingBook) {
            this.bs.update(book).subscribe(res => {
                this.router.navigate(['../../books', book.isbn], { relativeTo: this.route });
            });
        } else {
          //soll später die id des eingeloggten users sein
            book.user_id = 1;// jsut for testing
            console.log(book);
            //formular zurücksetzen
            this.bs.create(book).subscribe(res => {
                this.book = BookFactory.empty();
                this.bookForm.reset(BookFactory.empty());
                this.router.navigate(['../books'], { relativeTo: this.route });
            });
        }
    }

    updateErrorMessages() {
        this.errors = {};
        for (const message of BookFormErrorMessages) {
            const control = this.bookForm.get(message.forControl);
            if (control &&
                control.dirty &&
                control.invalid &&
                control.errors[message.forValidator] &&
                !this.errors[message.forControl]) {
                this.errors[message.forControl] = message.text;
            }
        }
    }
}