import React from 'react';
import { Todo } from '../../types/Todo';
import { handleError } from '../../utils/utils';
import classNames from 'classnames';
import { ErrorMessage } from '../../types/ErrorMessage';

type Props = {
  todos: Todo[];
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  setError: (error: string) => void;
  setIsErrorVisible: (isVisible: boolean) => void;
  addTodo: (todo: Omit<Todo, 'id' | 'userId'>) => Promise<void>;
  updateTodo: (updateTodo: Todo) => Promise<void>;
  handleToggleAll: () => Promise<void>;
  headerInputRef: React.RefObject<HTMLInputElement>;
  isAdding?: boolean;
};

export const TodoHeader: React.FC<Props> = React.memo(
  ({
    todos,
    searchQuery,
    setSearchQuery,
    setError,
    setIsErrorVisible,
    addTodo,
    handleToggleAll,
    headerInputRef,
    isAdding = false,
  }) => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const trimmedQuery = searchQuery.trim();

      if (trimmedQuery === '') {
        handleError('Title should not be empty', setError, setIsErrorVisible);

        return;
      }

      try {
        await addTodo({
          title: trimmedQuery,
          completed: false,
        });
        setSearchQuery('');
      } catch (error) {
        handleError(
          (error as Error).message as ErrorMessage,
          setError,
          setIsErrorVisible,
        );
      }
    };

    const handleSearchQueryChange = (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const enteredValue = event.target.value;

      setSearchQuery(enteredValue);
    };

    return (
      <header className="todoapp__header">
        {/* this button should have `active` class only if all todos are completed */}
        {!!todos.length && (
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: todos.every(todo => todo.completed),
            })}
            data-cy="ToggleAllButton"
            onClick={handleToggleAll}
          />
        )}
        {/* Add a todo on form submit */}
        <form onSubmit={handleSubmit}>
          <input
            data-cy="NewTodoField"
            type="text"
            ref={headerInputRef}
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            disabled={isAdding}
          />
        </form>
      </header>
    );
  },
);

TodoHeader.displayName = 'TodoHeader';
