import React, { useRef, useCallback } from 'react';

import {
    Image,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TextInput,
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
    BackToSignInButton,
    BackToSignInButtonText,
} from './styles';
const SignUp: React.FC = () => {
    const navigation = useNavigation();

    const formRef = useRef<FormHandles>(null);
    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);

    const handleSignUp = useCallback(async (data: SignInFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string().min(6, 'No mínimo 6 dígitos'),
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
                            <Title>Crie sua conta</Title>
                        </View>

                        <Form ref={formRef} onSubmit={handleSignUp}>
                            <Input
                                name="name"
                                icon="user"
                                placeholder="Nome"
                                returnKeyType="next"
                                autoCapitalize="words"
                                onSubmitEditing={() =>
                                    emailInputRef.current?.focus()
                                }
                            />
                            <Input
                                icon="mail"
                                name="email"
                                autoCorrect={false}
                                ref={emailInputRef}
                                placeholder="E-mail"
                                returnKeyType="next"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                onSubmitEditing={() =>
                                    passwordInputRef.current?.focus()
                                }
                            />
                            <Input
                                icon="lock"
                                name="password"
                                secureTextEntry
                                placeholder="Senha"
                                returnKeyType="send"
                                ref={passwordInputRef}
                                textContentType="newPassword"
                                onSubmitEditing={() =>
                                    formRef.current?.submitForm()
                                }
                            />
                        </Form>

                        <Button onPress={() => formRef.current?.submitForm()}>
                            Entrar
                        </Button>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>

            <BackToSignInButton
                onPress={() => {
                    navigation.goBack();
                }}
            >
                <Icon name="arrow-left" size={20} color="#ffffff" />
                <BackToSignInButtonText>
                    Voltar para logon
                </BackToSignInButtonText>
            </BackToSignInButton>
        </>
    );
};

export default SignUp;
