import { useState } from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { SignUpForm } from '../components/auth/SignUpForm';
import { Container } from '../components/layout/Container';
import { Logo } from '../components/layout/Logo';

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Container>
      <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Logo />
        
        {isLogin ? <LoginForm /> : <SignUpForm />}
        
        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          {isLogin ? 'Ainda não tem uma conta?' : 'Já tem uma conta?'}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-blue-500 hover:text-blue-600 font-medium"
          >
            {isLogin ? 'Criar conta' : 'Entrar'}
          </button>
        </p>
      </div>
    </Container>
  );
}