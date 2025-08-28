import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { Plus } from 'lucide-react';
import { ToDoItem } from './ToDoItem';
import type { Task } from './TaskAPI';
import { TaskAPI } from './TaskAPI';

export function App() {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState<Task[]>([]);

  // Busca tarefas na inicialização
  useEffect(() => {
    TaskAPI.getAll()
      .then(setTodos)
      .catch(console.error);
  }, []);

  // Adiciona nova tarefa
  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;
    const created = await TaskAPI.create(newTodo);
    setTodos(prev => [...prev, created]);
    setNewTodo('');
  };

  // Alterna completo/incompleto
  const handleToggleTodo = async (id: string) => {
    const updated = await TaskAPI.toggle(id);
    setTodos(prev => prev.map(t => (t.id === id ? updated : t)));
  };

  // Exclui tarefa
  const handleDeleteTodo = async (id: string) => {
    await TaskAPI.remove(id);
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  // Edita texto da tarefa
  const handleUpdateTodo = async (id: string, newText: string) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, text: newText } : todo))
    );
    await TaskAPI.update(id, newText);
  };

  const completedTodos = todos.filter(t => t.completed).length;
  const totalTodos = todos.length;

  return (
    <div className="page">
      <div className="container">
        {/* Cabeçalho */}
        <header className="header">
          <h1 className="title">Minhas Tarefas</h1>
          <p className="subtitle">Organize-se e seja produtivo</p>
          <div className="stats-pill">
            <span>{completedTodos} de {totalTodos} completa{totalTodos !== 1 ? 's' : ''}</span>
          </div>
        </header>

        {/* Campo de adicionar nova tarefa */}
        <div className="add-wrapper">
          <input
            value={newTodo}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value)}
            placeholder="Adicione uma nova tarefa..."
            className="input"
          />
          <button onClick={handleAddTodo} className="add-btn" aria-label="Adiciona tarefa">
            <Plus size={20} />
          </button>
        </div>

        {/* Lista de tarefas */}
        <div className="list">
          {todos.map(todo => (
            <ToDoItem
              key={todo.id}
              todo={{ ...todo, createdAt: new Date(todo.createdAt) }}
              onToggleTodo={handleToggleTodo}
              onDeleteTodo={handleDeleteTodo}
              onUpdateTodo={handleUpdateTodo}
            />
          ))}

          {todos.length === 0 && (
            <div className="empty">
              <p>Nenhuma tarefa ainda. Adicione uma!</p>
            </div>
          )}
        </div>

        {/* Rodapé */}
        {todos.length > 0 && (
          <footer className="footer">
            <p className="footer-text">
              {completedTodos === totalTodos
                ? '🎉 Todas as tarefas concluídas! Excelente trabalho!'
                : `${totalTodos - completedTodos} tarefa${totalTodos - completedTodos !== 1 ? 's' : ''} restante${totalTodos - completedTodos !== 1 ? 's' : ''}`}
            </p>
          </footer>
        )}
      </div>
    </div>
  );
}

export default App;