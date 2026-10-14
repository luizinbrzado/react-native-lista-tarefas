import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTasks } from '../src/hooks/useTasks';
import { TaskItem } from '../src/components/TaskItem';
import { FilterBar } from '../src/components/FilterBar';
import { EmptyState } from '../src/components/EmptyState';

export default function HomeScreen() {
  const router = useRouter();
  const {
    tasks,
    filter,
    loading,
    setFilter,
    toggleTask,
    removeTask,
    allTasksCount,
    pendingCount,
    completedCount,
  } = useTasks();

  return (
    <View className="flex-1">
      <FilterBar
        filter={filter}
        onChange={setFilter}
        counts={{
          all: allTasksCount,
          pending: pendingCount,
          completed: completedCount,
        }}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#4f46e5" className="mt-10" />
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <TaskItem task={item} onToggle={toggleTask} onDelete={removeTask} />
          )}
          ListEmptyComponent={<EmptyState filter={filter} />}
          contentContainerClassName="px-4 pb-24 flex-grow"
        />
      )}

      <TouchableOpacity
        onPress={() => router.push('/form')}
        className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-indigo-600 items-center justify-center shadow-lg"
      >
        <Text className="text-white text-3xl">+</Text>
      </TouchableOpacity>
    </View>
  );
}
