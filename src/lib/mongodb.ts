import mongoose from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var mongooseConn: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
}

// MongoDB URI — obligatoirement issu de l'environnement (.env.local)
const mongoUri = process.env.MONGODB_URI as string;

if (!mongoUri) {
  throw new Error(
    'MONGODB_URI manquant : créez un fichier .env.local avec vos identifiants (voir .env.example). ' +
    'Aucun identifiant n\'est codé en dur dans le code source.'
  );
}

console.log('Using MongoDB URI:', mongoUri ? 'Set' : 'Not set');

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (!global.mongooseConn) {
    global.mongooseConn = { conn: null, promise: null };
  }

  if (global.mongooseConn.conn) {
    return global.mongooseConn.conn;
  }

  if (!global.mongooseConn.promise) {
    const dbName = process.env.MONGODB_DB || 'ensaoffline';
    console.log('Connecting to database:', dbName);
    global.mongooseConn.promise = mongoose.connect(mongoUri, {
      dbName: dbName,
    });
  }

  global.mongooseConn.conn = await global.mongooseConn.promise;
  return global.mongooseConn.conn;
}


