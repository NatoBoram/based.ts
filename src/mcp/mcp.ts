import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import pkg from "../../package.json" with { type: "json" }
import { convertInputSchema, convertOutputSchema } from "../zod/convert.ts"
import { uuidInputSchema, uuidOutputSchema } from "../zod/uuid.ts"
import { convert } from "./convert.ts"
import { uuid } from "./uuid.ts"

const { name, version, homepage, bin } = pkg
const exe = Object.keys(bin).find(Boolean)
if (!exe)
	throw new Error("No executable name found in package.json", { cause: pkg })

export const mcp: McpServer = new McpServer({
	name: exe,
	title: name,
	version,
	websiteUrl: homepage,
})

mcp.registerTool(
	"convert",
	{
		title: "Convert",
		description:
			"Convert a number from a base in a space to another base in another space",
		inputSchema: convertInputSchema.shape,
		outputSchema: convertOutputSchema.shape,
	},
	convert,
)

mcp.registerTool(
	"uuid",
	{
		title: "UUID",
		description:
			"Generate a UUID in a different base with a different space than normal UUIDs",
		inputSchema: uuidInputSchema.shape,
		outputSchema: uuidOutputSchema.shape,
	},
	uuid,
)
