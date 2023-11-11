import { useEffect } from 'react';
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';

function LoginGoogle({ setErr, navigation }) {
	useEffect(()=>{
        GoogleSignin.configure({
            webClientId: '416637401596-babo0cnot3u9pam1eam5l5huh01pnj35.apps.googleusercontent.com', 
        })  
    },[])
// use the client id in the google-services.json file under the "oauth_client" (clinet_type : 3)
	return (
		<View style={[styles.btn, styles.btnGoogle]}>
			<Text onPress={signin}>{t('Sign in with')}</Text>
			<Image source={googleLogo} style={styles.logoGoogle} />
		</View>
	);
}

export default LoginGoogle;