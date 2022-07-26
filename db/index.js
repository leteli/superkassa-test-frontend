import pgPromise from 'pg-promise';
const pgp = pgPromise({});

const db = pgp('postgres://admin:dbpassword1@localhost:5432/users_database');

export default db;
