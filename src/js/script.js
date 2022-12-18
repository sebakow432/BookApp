{
  'use strict';

  const select = {
    templateOf: {
      menuBooks: '#template-book',
    },

    class: {
      booksList: '.books-list',
      bookImage: '.book__image',
      filtersCheckbox: '.filters label input'
    },

    classAtrribute: {
      favorite: 'favorite',
    }
  };

  const templates = {
    menuBooks: Handlebars.compile(document.querySelector(select.templateOf.menuBooks).innerHTML),
  };

  const app = {
    initBook: function(){
      for(const dataBook of dataSource.books){
        new Book(dataBook, this.booksArray);
      }
      //new Filter(dataSource.books);
    },

    initData: function(){
      this.data = dataSource.books;
      this.booksArray = [];
    },
      
    init: function(){
      console.log('*** App starting ***');
      console.log('thisApp:', this);
      console.log('select:', select);
      console.log('templates:', templates);

      this.initData();
      this.initBook();
    },
  };

  class Book{
    constructor(data, booksArray){
      this.data = data;
      this.favoriteBooks = booksArray;
      this.filters = [];
      this.renderBooks();
      this.getElements();
      this.initAction();
      //console.log('new book:', this);
    }

    determineRatingBgc(){
      const booksData = this.data;
      let rating;
      console.log(booksData.rating);
      if(booksData.rating <= 6){
        rating = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
      } else if(booksData.rating > 6 && booksData.rating <= 8){
        rating = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      } else if(booksData.rating > 8 && booksData.rating <= 9){
        rating = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      } else{
        rating = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
      }
      return rating;
    }
  
    renderBooks(){
      this.data.ratingBgc = this.determineRatingBgc();
      this.data.ratingWidth = this.data.rating * 10;
      console.log(this.data.ratingBgc);
      const generatedHTML = templates.menuBooks(this.data);
      this.element = utils.createDOMFromHTML(generatedHTML);
      this.menuContainer = document.querySelector(select.class.booksList);
      this.menuContainer.appendChild(this.element);
    }

    getElements(){
      this.book = this.element.querySelector(select.class.bookImage);
      this.filtersCheckbox = document.querySelectorAll(select.class.filtersCheckbox);
    }

    filterBooks(filters){
      const book = this.book;
      const booksData = this.data;
      let shouldBeHidden = false;
      for(const filter of filters){
        console.log(booksData.details[filter]);
        if(!booksData.details[filter]){
          shouldBeHidden = true;
          break;
        }
  
      }
      if(shouldBeHidden){
        book.classList.add('hidden');
      }else{
        book.classList.remove('hidden');
      }
    }
  
    initAction(){
      const book = this.book;
      const favoriteBooks = this.favoriteBooks;
      book.addEventListener('dblclick', function(event){
        event.preventDefault();
        const bookId = book.getAttribute('data-id');
        if(!favoriteBooks.includes(bookId)){
          favoriteBooks.push(bookId);
          book.classList.add(select.classAtrribute.favorite);
        }else{
          favoriteBooks.splice(favoriteBooks.indexOf(bookId), 1);
          book.classList.remove(select.classAtrribute.favorite);
        }
        console.log('array', favoriteBooks);

      });
      book.addEventListener('click', function(event){
        event.preventDefault();
      });

      const thisCheckbox = this;
      const filters = this.filters;
      const filtersCheckbox = this.filtersCheckbox;
      for(const filterCheckbox of filtersCheckbox){
        filterCheckbox.addEventListener('change', function(event){
          event.preventDefault();
          const value = filterCheckbox.getAttribute('value');
          if(filterCheckbox.checked){
            filters.push(value);
          }else{
            filters.splice(filters.indexOf(value), 1);
          }
          thisCheckbox.filterBooks(filters);
          console.log('filters', filters);
        });
      }
    }
  }
  app.init();
}

