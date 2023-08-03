import bcrypt from 'bcrypt';

export const hasher = async (password: string) => await bcrypt.hash(password, 10);
export const comparer = async (password: string, hash: string) => await bcrypt.compare(password, hash);
