#!/usr/bin/env python3
"""Build the standalone deploy page from the artifact-form source.

index.html in this folder is written for the Artifact viewer, which adds the doctype, charset and
viewport itself. Hosts such as GitHub Pages and Cloudflare do not, so this wraps the same content in a
complete HTML document. Usage: python3 build_deploy.py OUTPUT_PATH
"""
import sys
src = open('SOURCE_PATH', encoding='utf-8').read()
marker = '</style>\n'
i = src.index(marker) + len(marker)
head, body = src[:i], src[i:]
head = head.replace('<meta name="claude:viewport-fit-sides" content="cover">\n', '')
doc = ('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
       '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
       '<meta name="theme-color" content="#08162E">\n' + head +
       '<style>[hidden]{display:none!important}</style>\n</head>\n<body>\n' + body + '</body>\n</html>\n')
open(sys.argv[1], 'w', encoding='utf-8').write(doc)
print('wrote', sys.argv[1], len(doc), 'bytes')
