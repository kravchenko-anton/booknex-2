'use client';
import { Button, Field } from '@/components/ui';
import { useAction } from '@/hooks';
import { loginRoute } from '@/providers/secure-route';
import { zodResolver } from '@hookform/resolvers/zod';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { AuthDto, type AuthDtoType } from 'global/dto/auth/auth.dto';
import { Mail, Password } from 'icons';
import { useForm } from 'react-hook-form';

const Page = () => {
  const { mailLogin, googleLogin } = useAction();
  const { handleSubmit, control } = useForm<AuthDtoType>({
    mode: 'onSubmit',
    resolver: zodResolver(AuthDto)
  });
  const onSubmit = (data: AuthDtoType) => {
    mailLogin(data);
  };

  const onGoogleLoginSuccess = async (tokenResponse: CredentialResponse) => {
    if (!tokenResponse.credential) return;
    googleLogin({
      socialId: tokenResponse.credential
    });
  };

  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div className='bg-foreground  w-[390px] items-center justify-center rounded p-8'>
        <h1 className='mb-4 text-center text-3xl text-white'>Sign in</h1>
        <Field
          icon={Mail}
          variant='muted'
          name='email'
          control={control}
          type='email'
          placeholder='Enter your email'
        />
        <Field
          icon={Password}
          variant='muted'
          control={control}
          className='my-3'
          name='password'
          type='password'
          placeholder='Enter your password'
        />
        <div className='flex h-full w-full items-center justify-center gap-2'>
          <Button fullWidth size='sm' variant='primary' onClick={handleSubmit(onSubmit)}>
            Login
          </Button>
          <GoogleLogin
            useOneTap
            size='medium'
            shape={'rectangular'}
            theme='outline'
            onSuccess={onGoogleLoginSuccess}
          />
        </div>
      </div>
    </div>
  );
};

export default loginRoute(Page);
