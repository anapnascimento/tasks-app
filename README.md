# 📝 Tasks App — React + TypeScript + Node.js

Uma aplicação de tarefas (ToDo) fullstack com frontend em React + TypeScript e backend Node.js + Express. 
A aplicação permite:

- ✅ Adicionar tarefas
- ✅ Marcar tarefas como concluídas
- ✅ Editar tarefas com salvamento no backend
- ✅ Excluir tarefas
- ✅ Visualizar data formatada ("Hoje", "Ontem", etc.)
- ✅ Interface elegante com ícones `lucide-react`

## 🚀 Como rodar o projeto localmente
### 1. Clone o repositório

```bash
git clone https://github.com/anapnascimento/tasks-app.git
cd tasks-app
````

---

### 2. Instale e rode o **backend**

```bash
cd backend
npm install
npm run dev
```
A API estará disponível em: [http://localhost:4000](http://localhost:4000)

---

### 3. Instale e rode o **frontend**

Em outra aba do terminal:

```bash
cd frontend
npm install
npm run dev
```
A aplicação abrirá em: [http://localhost:5173](http://localhost:5173)

---

## 🔧 Funcionalidades

| Recurso                 | Implementado   |
| ----------------------- | ------------  |
| Adicionar task          | ✅            |
| Excluir task            | ✅            |
| Concluir task           | ✅            |
| Editar task             | ✅            |
| API integrada           | ✅            |
| Ícones (UI) - Lucide    | ✅            |
| Data amigável           | ✅            |

---

## 🧠 Tecnologias Utilizadas

### 🔹 Frontend

* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Vite](https://vitejs.dev/)
* [Lucide React](https://lucide.dev/)
* `axios`

### 🔹 Backend

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [cors\`](https://www.npmjs.com/package/cors)
* `nanoid` (para gerar IDs únicos)

---

## 📦 API Endpoints

| Método | Rota                | Descrição                |
| ------ | ------------------- | ------------------------ |
| GET    | `/tasks`            | Lista todas as tarefas   |
| POST   | `/tasks`            | Cria uma nova tarefa     |
| PUT    | `/tasks/:id/toggle` | Alterna para "completa"  |
| PUT    | `/tasks/:id`        | Atualiza texto da tarefa |
| DELETE | `/tasks/:id`        | Remove a tarefa          |

---

## ✨ Melhorias futuras

- [ ]Persistência com banco de dados (MongoDB, PostgreSQL, etc)
- [ ]Filtro de tarefas (ativas, concluídas)
- [ ]Deploy (Vercel ou outros)
