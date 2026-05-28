@echo off
if defined npm_node_execpath (
  set "NODE_EXE=%npm_node_execpath%"
  set "NODE_EXE=%NODE_EXE:"=%"
  "%NODE_EXE%" %*
) else (
  node %*
)
