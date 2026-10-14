import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import * as TaskRepository from '../src/database/taskRepository';

export default function FormScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const isEditing = !!id;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    TaskRepository.getTaskById(Number(id)).then((task) => {
      if (task) {
        setTitle(task.title);
        setDescription(task.description ?? '');
      }
    });
  }, [id]);

  const handleSave = async () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      Alert.alert('Atenção', 'O título é obrigatório.');
      return;
    }
    const trimmedDescription = description.trim() || null;
    setSaving(true);
    try {
      if (isEditing) {
        await TaskRepository.updateTask({
          id: Number(id),
          title: trimmedTitle,
          description: trimmedDescription,
        });
      } else {
        await TaskRepository.createTask({
          title: trimmedTitle,
          description: trimmedDescription,
        });
      }
      router.back();
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
      Alert.alert('Erro', 'Não foi possível salvar a tarefa.');
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Stack.Screen
        options={{ title: isEditing ? 'Editar Tarefa' : 'Nova Tarefa' }}
      />
      <ScrollView contentContainerClassName="p-4" keyboardShouldPersistTaps="handled">
        <Text className="text-sm font-semibold text-gray-600 mb-1">Título *</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Ex: Estudar React Native"
          className="bg-white border border-gray-200 rounded-lg px-3 py-3 mb-4"
        />

        <Text className="text-sm font-semibold text-gray-600 mb-1">Descrição</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Detalhes (opcional)"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          className="bg-white border border-gray-200 rounded-lg px-3 py-3 mb-6 h-28"
        />

        <TouchableOpacity
          onPress={handleSave}
          disabled={saving}
          className="bg-indigo-600 rounded-lg py-3 items-center"
        >
          <Text className="text-white font-bold text-base">
            {isEditing ? 'Salvar alterações' : 'Adicionar tarefa'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
