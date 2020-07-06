import React, { useCallback, useRef } from 'react';

import {
    Image,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import * as Yup from 'yup';

import getValidationsErrors from '../../utils/getValidationsErrors';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import Icon from 'react-native-vector-icons/Feather';

import {
    Container,
    Title,
    ForgotPassword,
    ForgotPasswordText,
    CreateAccountButton,
    CreateAccountButtonText,
} from './styles';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const navigation = useNavigation();

    const formRef = useRef<FormHandles>(null);
    const passwordInputRef = useRef<TextInput>(null);

    const handleSignIn = useCallback(async (data: SignInFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string().required('Senha obrigatória'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            // await signIn({
            //     email: data.email,
            //     password: data.password,
            // });

            // history.push('/dashboard');
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationsErrors(err);

                formRef.current?.setErrors(errors);

                return;
            }

            Alert.alert(
                'Erro na autenticação',
                'Ocorreu um erro ao fazer login, cheque as credenciais.',
            );
        }
    }, []);

    return (
        <>
            <KeyboardAvoidingView
                enabled
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flex: 1 }}
                >
                    <Container>
                        <Image source={logoImg} />

                        <View>
                            <Title>Faça seu logon</Title>
                        </View>

                        <Form ref={formRef} onSubmit={handleSignIn}>
                            <Input
                                autoCapitalize="none"
                                autoCorrect={false}
                                icon="mail"
                                keyboardType="email-address"
                                name="email"
                                onSubmitEditing={() => {
                                    passwordInputRef.current?.focus();
                                }}
                                placeholder="E-mail"
                                returnKeyType="next"
                            />
                            <Input
                                icon="lock"
                                name="password"
                                onSubmitEditing={() => {
                                    formRef.current?.submitForm();
                                }}
                                ref={passwordInputRef}
                                placeholder="Senha"
                                returnKeyType="send"
                                secureTextEntry
                            />
                        </Form>

                        <Button
                            onPress={() => {
                                formRef.current?.submitForm();
                            }}
                        >
                            Entrar
                        </Button>

                        <ForgotPassword
                            onPress={() => {
                                console.log('Esqueci minha senha');
                            }}
                        >
                            <ForgotPasswordText>
                                Esqueci minha senha
                            </ForgotPasswordText>
                        </ForgotPassword>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>

            <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
                <Icon name="log-in" size={20} color="#ff9000" />
                <CreateAccountButtonText>
                    Criar uma conta
                </CreateAccountButtonText>
            </CreateAccountButton>
        </>
    );
};

export default SignIn;
