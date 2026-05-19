#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.cojoign.mongodb.net/local_library?retryWrites=true&w=majority&appName=Cluster0"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Book = require("./models/book");
const Author = require("./models/author");
const Genre = require("./models/genre");
const BookInstance = require("./models/bookinstance");

const genres = [];
const authors = [];
const books = [];
const bookinstances = [];

const mongoose = require("mongoose");

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createGenres();
  await createAuthors();
  await createBooks();
  await createBookInstances();
  console.log("Debug: Closing mongoose");
  await mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function genreCreate(index, name) {
  const genre = new Genre({ name: name });
  await genre.save();
  genres[index] = genre;
  console.log(`Added genre: ${name}`);
}

async function authorCreate(index, first_name, family_name, d_birth, d_death) {
  const authordetail = { first_name: first_name, family_name: family_name };
  if (d_birth != false) authordetail.date_of_birth = d_birth;
  if (d_death != false) authordetail.date_of_death = d_death;
  // sample additional fields for IFEsporte
  authordetail.matricula = `IFC-${index + 1000}`;
  authordetail.serie = `Série ${Math.ceil(Math.random()*3)}`;
  authordetail.sexo = index % 2 === 0 ? 'M' : 'F';
  authordetail.altura_cm = 170 + index; // sample
  authordetail.peso_kg = 60 + index; // sample
  authordetail.email = `${first_name.toLowerCase()}.${family_name.toLowerCase()}@ifc.edu.br`;
  authordetail.telefone = `48-9${1000 + index}`;

  const author = new Author(authordetail);

  await author.save();
  authors[index] = author;
  console.log(`Added aluno: ${first_name} ${family_name}`);
}

async function bookCreate(index, title, summary, isbn, author, genre) {
  const bookdetail = {
    title,
    summary,
    author,
    isbn,
  };
  // sample sport-specific defaults
  bookdetail.type = index % 2 === 0 ? 'Individual' : 'Equipe';
  bookdetail.participants_count = Math.floor(Math.random()*20) + 5;
  if (genre != false) bookdetail.genre = genre;

  const book = new Book(bookdetail);
  await book.save();
  books[index] = book;
  console.log(`Added book: ${title}`);
}

async function bookInstanceCreate(index, book, imprint, due_back, status) {
  const bookinstancedetail = {
    book,
    imprint,
  };
  // map to IFEsporte fields
  if (due_back != false) {
    bookinstancedetail.due_back = due_back;
    bookinstancedetail.event_date = due_back;
  }
  if (status != false) bookinstancedetail.status = status;
  bookinstancedetail.location = imprint;

  const bookinstance = new BookInstance(bookinstancedetail);
  await bookinstance.save();
  bookinstances[index] = bookinstance;
  console.log(`Added cronograma: ${imprint}`);
}

async function createGenres() {
  console.log("Adding genres");
  await Promise.all([
    genreCreate(0, "Atletismo"),
    genreCreate(1, "Basquete"),
    genreCreate(2, "Futsal"),
  ]);
}

async function createAuthors() {
  console.log("Adding authors");
  await Promise.all([
    authorCreate(0, "João", "Silva", "2005-03-10", false),
    authorCreate(1, "Maria", "Oliveira", "2006-07-22", false),
    authorCreate(2, "Carlos", "Santos", "2004-01-15", false),
    authorCreate(3, "Ana", "Pereira", false, false),
    authorCreate(4, "Lucas", "Almeida", "2005-12-02", false),
  ]);
}

async function createBooks() {
  console.log("Adding Books");
  await Promise.all([
    bookCreate(0, 'Atletismo - 100m Rasos', 'Provas de velocidade curtas na pista', 'AT100', authors[0], [genres[0]]),
    bookCreate(1, 'Basquete - Treino Técnico', 'Treino de fundamentos e tática', 'BSK01', authors[1], [genres[1]]),
    bookCreate(2, 'Futsal - Treino de Finalização', 'Exercícios de finalização e posicionamento', 'FTS01', authors[2], [genres[2]]),
  ]);
}

async function createBookInstances() {
  console.log("Adding authors");
  await Promise.all([
    bookInstanceCreate(0, books[0], 'Pista Municipal', '2026-06-01', 'Scheduled'),
    bookInstanceCreate(1, books[0], 'Pista Municipal', '2026-06-03', 'Scheduled'),
    bookInstanceCreate(2, books[1], 'Ginásio A', '2026-06-02', 'Scheduled'),
    bookInstanceCreate(3, books[2], 'Quadra Escola', '2026-06-04', 'Scheduled'),
  ]);
}
