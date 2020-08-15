import React, { useCallback, useRef, ChangeEvent } from 'react';
import {
  FiArrowLeft, FiMail, FiLock, FiUser, FiCamera,
} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import {
  Container, Content, AvatarInput,
} from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
    name: string;
    email: string;
    oldPassword: string;
    password: string;
    passwordConfirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const { user, updateUser } = useAuth();

  const handleSubmit = useCallback(async (data: ProfileFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string().required('Email é obrigatório').email('Digite um email válido'),
        oldPassword: Yup.string(),
        password: Yup.string().when('oldPassword', {
          is: (val) => !!val.length,
          then: Yup.string().required('Campo obrigatório'),
          otherwise: Yup.string(),
        }),
        passwordConfirmation: Yup.string()
          .when('password', {
            is: (val) => !!val.length,
            then: Yup.string().required().min(6, 'A senha deve ter no mínimo 6 dígitos!'),
            otherwise: Yup.string(),
          })
          .oneOf([Yup.ref('password')], 'Confirmação incorreta'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const formData = {
        name: data.name,
        email: data.email,
        ...(data.oldPassword ? {
          oldPassword: data.oldPassword,
          password: data.password,
          passwordConfirmation: data.passwordConfirmation,
        } : {}),
      };

      await api.put('/profile', formData).then((response) => {
        updateUser(response.data);
      });

      history.push('/dashboard');

      addToast({
        type: 'success',
        title: 'Perfil atualizado!',
        description: 'Suas informações do perfil foram atualizadas com sucesso!',
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

            formRef.current?.setErrors(errors);

            return;
      }

      addToast({
        type: 'error',
        title: 'Erro na atualização',
        description: 'Ocorreu um erro ao fazer a atualização, tente novamente.',
      });
    }
  }, [addToast, history, updateUser]);

  const handleAvatarChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const data = new FormData();

      data.append('avatar', e.target.files[0]);

      api.patch('/users/avatar', data).then((response) => {
        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'Avatar atualizado!',
        });
      });
    }
  }, [addToast, updateUser]);

  return (
    <Container>

      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={{
            name: user.name,
            email: user.email,
          }}
        >
          <AvatarInput>
            <img src={user.avatarUrl} alt={user.name} />

            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>

          </AvatarInput>

          <h1>Meu perfil</h1>

          <Input name="name" icon={FiUser} type="text" placeholder="Nome" />
          <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />

          <Input containerStyle={{ marginTop: 24 }} name="oldPassword" icon={FiLock} type="password" placeholder="Senha atual" />
          <Input name="password" icon={FiLock} type="password" placeholder="Nova senha" />
          <Input name="passwordConfirmation" icon={FiLock} type="password" placeholder="Confirmar senha" />

          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>

    </Container>
  );
};

export default Profile;
