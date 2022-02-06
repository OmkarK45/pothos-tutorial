import path from 'path'
import fs from 'fs'
import { printSchema, lexicographicSortSchema } from 'graphql'

import { builder } from './builder'
import './todoResolver'

export const schema = builder.toSchema({})

const schemaAsString = printSchema(lexicographicSortSchema(schema))

if (process.env.NODE_ENV !== 'production') {
	fs.writeFileSync(path.join(process.cwd(), './schema.gql'), schemaAsString)
}
