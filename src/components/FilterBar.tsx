import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TaskFilter } from '../types/task';

interface FilterBarProps {
  filter: TaskFilter;
  onChange: (filter: TaskFilter) => void;
  counts: Record<TaskFilter, number>;
}

const OPTIONS: { key: TaskFilter; label: string }[] = [
  { key: 'all', label: 'Todas' },
  { key: 'pending', label: 'Pendentes' },
  { key: 'completed', label: 'Concluídas' },
];

export function FilterBar({ filter, onChange, counts }: FilterBarProps) {
  return (
    <View className="flex-row px-4 py-3 gap-2">
      {OPTIONS.map(({ key, label }) => {
        const active = filter === key;
        return (
          <TouchableOpacity
            key={key}
            onPress={() => onChange(key)}
            className={`flex-1 items-center py-2 rounded-full ${
              active ? 'bg-indigo-600' : 'bg-gray-200'
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                active ? 'text-white' : 'text-gray-600'
              }`}
            >
              {label} ({counts[key]})
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
