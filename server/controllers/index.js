const Book = require('../../db/models/Book.js');
const NewBook = require('../../db/models/NewBooks.js');
const Event = require('../../db/models/Events.js');
const Venue = require('../../db/models/Venues.js');

const selectAll = (callback) => {
  NewBook.find({})
    .sort({
      _id: -1,
    })
    .limit(20).exec((err, items) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, items);
      }
    });
};

const grabVenues = (callback) => {
 Event.find({}, (err, docs) => {
   if (err) {
     callback(err, null);
   } else {
     let output = [];
     for (let i = 0; i < docs.length; i++) {
        output.push(docs[i].venue_id);
     }
     callback(null, output);
   }
 })
}

const save = (data) => {
  let title = new Book({
    title: String,
    author: Array,
    description: String,
    averageRating: Number,
    ratingsCount: Number,
    image: String,
  });
  for (let i = 0; i < data.length; i++) {
    Book.create({
      rank: data[i].rank,
      weeks_on_list: data[i].weeks_on_list,
      isbn: data[i].primary_isbn13,
      description: data[i].description,
      title: data[i].title,
      author: data[i].author,
      image: data[i].book_image,
    }, (err, title) => {
      if (err) {
        return handleError(err);
      }
    });
  }
};

const saveNewBook = (data) => {
  for (let i = 0; i < data.length; i++) {
    if (typeof data[i].volumeInfo.imageLinks !== "undefined") {
      let book = new NewBook({
        title: data[i].volumeInfo.title,
        author: data[i].volumeInfo.authors[0],
        description: data[i].volumeInfo.description,
        image: data[i].volumeInfo.imageLinks.smallThumbnail,
      });
      NewBook.create({
        title: data[i].volumeInfo.title,
        author: data[i].volumeInfo.authors[0],
        description: data[i].volumeInfo.description,
        image: data[i].volumeInfo.imageLinks.smallThumbnail,
       }, (err, book) => {
         if (err) {
           return handleError(err);
         }
       });
    } else {
      continue;
    }
  }
};

const saveEvent = (data) => {
  for (let i = 0; i < data.length; i++) {
    let event = new Event({
      name: data[i].name.text,
      description: data[i].description.text,
      venue_id: Number(data[i].venue_id),
      start: data[i].start.local,
      end: data[i].end.local,
    });
    Event.create({
      name: data[i].name.text,
      description: data[i].description.text,
      venue_id: Number(data[i].venue_id),
      start: data[i].start.local,
      end: data[i].end.local,
    }, (err, event) => {
      if (err) {
        return handleError(err);
      }
    })
  }
}

const saveVenue = (venues) => {
  for (let i = 0; i < venues.length; i++) {
    let venue = new Venue({
      name: venues[i].data.name,
      latitude: Number(venues[i].data.latitude),
      longitude: Number(venues[i].data.longitude),
    });
    Venue.create({
      name: venues[i].data.name,
      latitude: Number(venues[i].data.latitude),
      longitude: Number(venues[i].data.longitude),
    }, (err, venue) => {
      if (err) {
        return handleError(err);
      }
    })
  }
}



module.exports = {
  selectAll,
  save,
  saveNewBook,
  saveEvent,
  grabVenues,
  saveVenue,
};
