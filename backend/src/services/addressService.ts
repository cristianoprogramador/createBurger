import { Pool, RowDataPacket } from "mysql2/promise";
import pool from "../db";

export interface AddressData {
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
}

export async function createOrUpdateAddress(
  email: string,
  data: AddressData
): Promise<number> {
  const poolConect: Pool = pool;
  const existingAddress = await getAddressByEmail(email);
  if (existingAddress) {
    await updateAddress(email, data, poolConect);
    return existingAddress.id;
  } else {
    return await createAddress(email, data, poolConect);
  }
}

export async function createAddress(
  email: string,
  data: AddressData,
  pool: Pool
): Promise<number> {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      "INSERT INTO address (email, cep, rua, numero, bairro, cidade, uf) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        email,
        data.cep,
        data.rua,
        data.numero,
        data.bairro,
        data.cidade,
        data.uf,
      ]
    );
    return (result as any).insertId;
  } finally {
    connection.release();
  }
}

export async function updateAddress(
  email: string,
  data: AddressData,
  pool: Pool
): Promise<void> {
  const connection = await pool.getConnection();
  try {
    await connection.query(
      "UPDATE address SET cep = ?, rua = ?, numero = ?, bairro = ?, cidade = ?, uf = ? WHERE email = ?",
      [
        data.cep,
        data.rua,
        data.numero,
        data.bairro,
        data.cidade,
        data.uf,
        email,
      ]
    );
  } finally {
    connection.release();
  }
}

export async function getAddressByEmail(email: string): Promise<any | null> {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      "SELECT * FROM address WHERE email = ?",
      [email]
    );
    if (Array.isArray(rows) && rows.length > 0) {
      const address = rows[0] as RowDataPacket;
      return {
        id: address.id,
        email: address.email,
        data: {
          cep: address.cep,
          rua: address.rua,
          numero: address.numero,
          bairro: address.bairro,
          cidade: address.cidade,
          uf: address.uf,
        },
      };
    } else {
      return null;
    }
  } finally {
    connection.release();
  }
}
