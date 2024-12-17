export function handleAuthError(error: any): string {
  if (error.message.includes('Email not confirmed')) {
    return 'Por favor, confirme seu email antes de fazer login';
  }
  if (error.message.includes('Invalid login credentials')) {
    return 'Email ou senha incorretos';
  }
  if (error.message.includes('User already registered')) {
    return 'Este email já está cadastrado';
  }
  return 'Ocorreu um erro. Tente novamente.';
}