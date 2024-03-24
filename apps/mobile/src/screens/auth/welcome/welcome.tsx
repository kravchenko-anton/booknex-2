import { useAction } from '@/hooks';
import { useAuthorize } from '@/screens/auth/useAuthorize';
import { Button, Icon, Layout, Title } from '@/ui';
import { errorToast } from '@/utils/toast';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Color } from 'global/colors';
import { Google, Mail } from 'icons';
import { Welcome as WelcomeIllustration } from 'illustrations';
import { useLayoutEffect, type FC } from 'react';
import { View } from 'react-native';

const Welcome: FC = () => {
  const { googleLogin } = useAction();
  const { isLoading: authLoading, onMainButtonPress } = useAuthorize();

  useLayoutEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
      webClientId: '390949311214-hqfqvic7p47pt3elpne00es58k99nonh.apps.googleusercontent.com'
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (!userInfo.idToken) return errorToast('Something went wrong');
      googleLogin({
        socialId: userInfo.idToken
      });
    } catch {
      errorToast('Something went wrong');
    }
  };

  return (
    <Layout className='justify-end'>
      <View className='h-4/5 justify-between'>
        <View>
          <WelcomeIllustration width={230} height={230} className='ml-auto w-full p-0' />
          <Title center numberOfLines={2} weight={'bold'} size={'xxl'} className='text-left'>
            Dive into the world of unique{' '}
            <Title weight={'bold'} size='xxl' color={Color.primary}>
              stories
            </Title>
          </Title>
          <Title center size={'md'} weight='light' className='text-left' color={Color.gray}>
            Enter your credentials to continue
          </Title>
        </View>

        <View className='mb-2 w-full flex-row items-center justify-between'>
          <Button
            size='md'
            isLoading={authLoading}
            className='mr-2 h-full flex-1'
            icon={Google}
            onPress={signIn}
          >
            Sign in with Google
          </Button>
          <Icon size='md' variant='foreground' icon={Mail} onPress={onMainButtonPress} />
        </View>
      </View>
    </Layout>
  );
};

export default Welcome;
