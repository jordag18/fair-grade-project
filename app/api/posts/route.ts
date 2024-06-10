import { NextResponse } from 'next/server';
import createPool from '@/lib/db';
import { ResultSetHeader } from 'mysql2';

const poolPromise = createPool();

export async function GET() {
  const pool = await poolPromise;
  try {
    const [rows] = await pool.query('SELECT * FROM posts');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const pool = await poolPromise;
  const { title, content } = await req.json();
  try {
    const [result] = await pool.query<ResultSetHeader>('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content]);
    return NextResponse.json({ id: result.insertId, title, content }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}

