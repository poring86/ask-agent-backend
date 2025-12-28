import postgres from 'postgres'

const sql = postgres("postgresql://postgres:123456@localhost:5432/agents?search_path=public")

async function reset() {
  try {
    console.log('Enabling pgvector extension...')
    await sql`CREATE EXTENSION IF NOT EXISTS vector`
    
    console.log('Dropping tables...')
    await sql`DROP TABLE IF EXISTS audio_chunks CASCADE`
    await sql`DROP TABLE IF EXISTS questions CASCADE`
    await sql`DROP TABLE IF EXISTS rooms CASCADE`
    await sql`DROP TABLE IF EXISTS __drizzle_migrations CASCADE`
    await sql`DROP SCHEMA IF EXISTS drizzle CASCADE`
    
    console.log('Database reset successful!')
    process.exit(0)
  } catch (err) {
    console.error('Error resetting database:', err)
    process.exit(1)
  }
}

reset()
