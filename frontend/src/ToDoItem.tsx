import { Calendar, Check, Edit3, X } from "lucide-react";
import { useState } from "react";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
};

interface TodoProps {
  todo: Todo;
  onDeleteTodo: (id: string) => void;
  onToggleTodo: (id: string) => void;
  onUpdateTodo?: (id: string, newText: string) => void;
}

function formatDate(date: Date) {
  const today = new Date();
  const todoDate = new Date(date);

  if (today.toDateString() === todoDate.toDateString()) return "Hoje";

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (yesterday.toDateString() === todoDate.toDateString()) return "Ontem";

  return todoDate.toLocaleDateString("pt-BR", { month: "short", day: "numeric" });
}

export function ToDoItem({ todo, onDeleteTodo, onToggleTodo, onUpdateTodo }: TodoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSaveEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      onUpdateTodo?.(todo.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <div className={`todo-card ${todo.completed ? "is-completed" : ""}`}>
      <div className="row">
        {/* Checkbox */}
        <button
          onClick={() => onToggleTodo(todo.id)}
          className={`checkbox ${todo.completed ? "is-checked" : ""}`}
          aria-pressed={todo.completed}
          aria-label={todo.completed ? "Incompleta" : "Completa"}
        >
          {todo.completed && <Check size={14} className="check-icon" />}
        </button>

        {/* Todo Content */}
        <div className="content">
          {isEditing ? (
            <input
              type="text"
              className="edit-input"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveEdit();
                if (e.key === "Escape") handleCancelEdit();
              }}
              autoFocus
            />
          ) : (
            <div className="text-wrapper">
              <p className={`text ${todo.completed ? "text-completed" : ""}`}>
                {todo.text}
              </p>
              <div className="meta">
                <Calendar size={12} />
                <span>{formatDate(todo.createdAt)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className={`actions ${isEditing ? "show" : ""}`}>
          {isEditing ? (
            <>
              <button className="icon-btn success" onClick={handleSaveEdit} aria-label="Sava edit">
                <Check size={16} />
              </button>
              <button className="icon-btn danger" onClick={handleCancelEdit} aria-label="Cancela edit">
                <X size={16} />
              </button>
            </>
          ) : (
            <>
              <button
                className="icon-btn"
                onClick={() => setIsEditing(true)}
                aria-label="Edita todo"
              >
                <Edit3 size={16} />
              </button>
              <button
                className="icon-btn danger"
                onClick={() => onDeleteTodo(todo.id)}
                aria-label="Deleta todo"
              >
                <X size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}