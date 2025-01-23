import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  deleteTodo: (todoId: number) => Promise<void>;
  updateTodo: (updateTodo: Todo) => Promise<void>;
  tempTodo?: Todo | null;
  isAdding?: boolean;
  deletingTodos?: Record<number, boolean>;
  updatingTodos?: Record<number, boolean>;
};

export const TodoList: React.FC<Props> = React.memo(
  ({
    todos,
    deleteTodo,
    updateTodo,
    tempTodo = null,
    isAdding = false,
    deletingTodos = {},
    updatingTodos = {},
  }) => {
    return (
      <section className="todoapp__main" data-cy="TodoList">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
            isLoading={deletingTodos[todo.id] || updatingTodos[todo.id]}
          />
        ))}
        {tempTodo && <TodoItem todo={tempTodo} isLoading={isAdding} />}
      </section>
    );
  },
);

TodoList.displayName = 'TodoList';
