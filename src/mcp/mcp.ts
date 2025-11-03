import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import pkg from "../../package.json" with { type: "json" }
import { convertInputShape, convertOutputShape } from "../zod/convert.ts"
import { uuidInputShape, uuidOutputShape } from "../zod/uuid.ts"
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
		inputSchema: convertInputShape,
		outputSchema: convertOutputShape,
	},
	convert,
)

mcp.registerTool<typeof uuidInputShape, typeof uuidOutputShape>(
	"uuid",
	{
		title: "UUID",
		description:
			"Generate a UUID in a different base with a different space than normal UUIDs",
		inputSchema: uuidInputShape,
		outputSchema: uuidOutputShape,
	},
	uuid,
)
