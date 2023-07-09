export const generateUniqueCode = () => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
  
    while (code.length < 6) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      const randomChar = chars[randomIndex];
      code += randomChar;
    }
  
    return code;
}