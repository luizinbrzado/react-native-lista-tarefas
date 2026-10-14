import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number, completed: number) => void;
  onDelete: (id: number) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const router = useRouter();
  const done = task.completed === 1;

  const confirmDelete = () => {
    Alert.alert('Excluir tarefa', `Deseja excluir "${task.title}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => onDelete(task.id) },
    ]);
  };

  return (
    <View className="flex-row items-center bg-white rounded-xl p-4 mb-3 shadow-sm">
      <TouchableOpacity
        onPress={() => onToggle(task.id, task.completed)}
        className={`w-7 h-7 rounded-full border-2 items-center justify-center mr-3 ${
          done ? 'bg-green-500 border-green-500' : 'border-gray-300'
        }`}
      >
        {done && <Text className="text-white font-bold">✓</Text>}
      </TouchableOpacity>

      <View className="flex-1">
        <Text
          className={`text-base font-semibold ${
            done ? 'text-gray-400 line-through' : 'text-gray-800'
          }`}
        >
          {task.title}
        </Text>
        {task.description ? (
          <Text className="text-sm text-gray-500 mt-1">{task.description}</Text>
        ) : null}
        <Text className="text-xs text-gray-400 mt-1">
          {new Date(task.createdAt).toLocaleDateString('pt-BR')}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.push({ pathname: '/form', params: { id: task.id } })}
        className="p-2"
      >
        <Text className="text-lg">✏️</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={confirmDelete} className="p-2">
        <Text className="text-lg">🗑️</Text>
      </TouchableOpacity>
    </View>
  );
}
