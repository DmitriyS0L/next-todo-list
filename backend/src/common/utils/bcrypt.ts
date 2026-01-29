import * as bcrypt from 'bcrypt';

export const hashPassword = async (rawPassword: string) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(rawPassword, salt);
};

export const comparePassword = async (
  rawPaswword: string,
  comparePassword: string
): Promise<boolean> => {
  return await bcrypt.compare(rawPaswword, comparePassword);
};
