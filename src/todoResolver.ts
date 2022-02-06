import { builder } from './builder'

interface Todo {
	id: number
	title: string
	completed: boolean
}

const TODOS = [
	{
		id: 1,
		title: 'Buy groceries',
		completed: false,
	},
	{
		id: 2,
		title: 'Do laundry',
		completed: false,
	},
	{
		id: 3,
		title: 'Clean room',
		completed: false,
	},
	{
		id: 4,
		title: 'Write a blog',
		completed: false,
	},
]

const Todo = builder.simpleObject('Todo', {
	description: 'This is a Todo object with ID, title and completed boolean!',
	fields: (t) => ({
		id: t.int(),
		title: t.string(),
		completed: t.boolean(),
	}),
})

builder.mutationField('createTodo', (t) =>
	t.field({
		type: [Todo],
		args: {
			title: t.arg.string({ required: true }),
			completed: t.arg.boolean({ required: true }),
		},
		resolve: (_parent, args, _context) => {
			TODOS.push({
				id: TODOS.length + 1,
				title: args.title,
				completed: args.completed,
			})

			return TODOS
		},
	})
)

builder.queryField('getTodo', (t) =>
	t.field({
		type: Todo,
		nullable: true,
		args: { id: t.arg.int() },
		resolve: (_parent, args, _ctx) => {
			return TODOS.find((x) => x.id === args.id)
		},
	})
)

builder.queryField('getTodos', (t) =>
	t.field({
		type: [Todo],
		resolve: () => {
			return TODOS
		},
	})
)

builder.mutationField('toggleCompleted', (t) =>
	t.field({
		type: Todo,
		nullable: true,
		args: { id: t.arg.int({ required: true }) },
		resolve: (_parent, args, _ctx) => {
			const todo = TODOS.find((x) => x.id === args.id)
			if (!todo) return null
			todo.completed = !todo.completed
			return todo
		},
	})
)
