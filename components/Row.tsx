import {View, Text, StyleSheet, Pressable } from 'react-native';
import { Task } from '../types/Task';

interface TodoRowProps {
    item: Task;
    onToggle: () => void;
}



export default function Row({ item, onToggle }: TodoRowProps) {
    return (
        <View style={styles.todoRow}>
            <Pressable onPress={onToggle}>
            <Text style={[styles.todoText, item.completed === 1 ? styles.completed : styles.normal ]}>{item.text}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({ 
    todoRow: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        padding: 4,
        margin: 4,
        borderColor: '#c1c0c0',
        borderWidth: 8,
        borderRadius: 8,
        marginBottom: 8,
        alignItems: 'center',


    },
    todoText: {
        flex: 1,
        color: '#000'
    },
    completed: {
        textDecorationLine: 'line-through',
        textDecorationColor: 'red',
        color: 'rgb(151, 0, 0)'
    },
    normal: {
        textDecorationLine: 'none'
    }
});