import { BigInt, Address } from "@graphprotocol/graph-ts"
import {
  YourContract,
  SetBlog
} from "../generated/YourContract/YourContract"
import { Blog } from "../generated/schema"

export function handleSetBlog(event: SetBlog): void {
  let blog = new Blog(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  blog.address = event.params.sender
  blog.title = event.params.title
  blog.content = event.params.content
  blog.createdAt = event.block.timestamp
  blog.save()
}